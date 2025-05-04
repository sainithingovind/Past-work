#!/usr/bin/env python
# coding: utf-8

# In[103]:


import pandas as pd
import numpy as np
import itertools
import json


# In[104]:


ORDER_SIZE = 5000
CHUNK = 10


# In[105]:


class Venue:
    def __init__(self, ask, ask_size, fee=0.0, rebate=0.0):
        self.ask = ask
        self.ask_size = ask_size
        self.fee = fee
        self.rebate = rebate


# In[106]:


def compute_cost(split, venues, order_size, lambda_over, lambda_under, theta_queue):
    executed = 0
    cash_spent = 0
    for i, qty in enumerate(split):
        exe = min(qty, venues[i].ask_size)
        executed += exe
        cash_spent += exe * (venues[i].ask + venues[i].fee)
        cash_spent -= max(qty - exe, 0) * venues[i].rebate
    underfill = max(order_size - executed, 0)
    overfill = max(executed - order_size, 0)
    risk_pen = theta_queue * (underfill + overfill)
    cost_pen = lambda_under * underfill + lambda_over * overfill
    return cash_spent + risk_pen + cost_pen


# In[107]:


def allocate(order_size, venues, lambda_over, lambda_under, theta_queue):
    splits = [[]]
    for v in range(len(venues)):
        new_splits = []
        for alloc in splits:
            used = sum(alloc)
            max_v = min(order_size - used, venues[v].ask_size)
            for q in range(0, max_v + 1, CHUNK):
                new_splits.append(alloc + [q])
        splits = new_splits

    best_cost = float('inf')
    best_split = []
    for alloc in splits:
        if sum(alloc) < order_size:
            continue  # allow underfill; skip only overallocations
            continue
        cost = compute_cost(alloc, venues, order_size, lambda_over, lambda_under, theta_queue)
        if cost < best_cost:
            best_cost = cost
            best_split = alloc

    return best_split, best_cost


# In[108]:


# Load and prepare snapshots globally so other functions can access them
print("Preparing snapshots...")
df = pd.read_csv('l1_day.csv')
df = df.sort_values('ts_event')
df = df.drop_duplicates(subset=['ts_event', 'publisher_id'], keep='first')

grouped = df.groupby('ts_event')
snapshots = []
for ts, group in grouped:
    venues = {}
    for _, row in group.iterrows():
        venues[row['publisher_id']] = Venue(
            ask=row['ask_px_00'],
            ask_size=row['ask_sz_00'],
            fee=0.001,
            rebate=0.0005
        )
    snapshots.append((ts, venues))

# Global best result (filled in during run_backtest)
best_result = None


# In[109]:


def baseline_best_ask():
    remaining = ORDER_SIZE
    total_cost = 0
    for _, venue_dict in snapshots:
        sorted_venues = sorted(venue_dict.values(), key=lambda v: v.ask)
        for v in sorted_venues:
            fill = min(v.ask_size, remaining)
            total_cost += fill * (v.ask + v.fee)
            remaining -= fill
            if remaining <= 0:
                break
        if remaining <= 0:
            break
    return total_cost, total_cost / ORDER_SIZE


# In[110]:


def baseline_twap():
    interval = 60
    bucket_size = ORDER_SIZE // max(1, (len(snapshots) // interval))
    total_cost = 0
    remaining = ORDER_SIZE
    for i in range(0, len(snapshots), interval):
        chunk = snapshots[i]
        venues = chunk[1].values()
        sorted_venues = sorted(venues, key=lambda v: v.ask)
        qty = min(bucket_size, remaining)
        for v in sorted_venues:
            fill = min(qty, v.ask_size)
            total_cost += fill * (v.ask + v.fee)
            qty -= fill
            remaining -= fill
            if qty <= 0 or remaining <= 0:
                break
        if remaining <= 0:
            break
    return total_cost, total_cost / ORDER_SIZE


# In[111]:


def baseline_vwap():
    remaining = ORDER_SIZE
    total_cost = 0
    for _, venue_dict in snapshots:
        venues = venue_dict.values()
        weights = [(v.ask_size, v.ask) for v in venues if v.ask_size > 0]
        total_weight = sum(w for w, _ in weights)
        for v in venues:
            if v.ask_size == 0:
                continue
            alloc = int((v.ask_size / total_weight) * remaining)
            fill = min(alloc, v.ask_size, remaining)
            total_cost += fill * (v.ask + v.fee)
            remaining -= fill
            if remaining <= 0:
                break
        if remaining <= 0:
            break
    return total_cost, total_cost / ORDER_SIZE


# In[112]:


def run_backtest():
    global best_result
    param_grid = list(itertools.product([0.001, 0.01, 0.1, 0.5, 1.0], repeat=3))

    for lambda_over, lambda_under, theta_queue in param_grid:
        remaining = ORDER_SIZE
        total_cost = 0
        i = 0
        while remaining > 0 and i < len(snapshots):
            _, venue_dict = snapshots[i]
            venues = list(venue_dict.values())
            alloc, _ = allocate(min(remaining, ORDER_SIZE), venues, lambda_over, lambda_under, theta_queue)
            if len(alloc) != len(venues):
                i += 1
                continue

            for j, (venue_id, venue) in enumerate(venue_dict.items()):
                fill = min(alloc[j], venue.ask_size)
                total_cost += fill * (venue.ask + venue.fee)
                remaining -= fill
            i += 1

        if best_result is None or total_cost < best_result['cost']:
            best_result = {
                'params': {
                    'lambda_over': lambda_over,
                    'lambda_under': lambda_under,
                    'theta_queue': theta_queue
                },
                'cost': total_cost,
                'avg_price': total_cost / ORDER_SIZE
            }

    if best_result is None:
        print("Warning: No parameter set completed full 5000-share fill.")
        return

    ba_cost, ba_avg = baseline_best_ask()
    twap_cost, twap_avg = baseline_twap()
    vwap_cost, vwap_avg = baseline_vwap()

    result = {
        'best_parameters': best_result['params'],
        'smart_router': {
            'total_cash': round(best_result['cost'], 2),
            'avg_price': round(best_result['avg_price'], 4)
        },
        'best_ask': {
            'total_cash': round(ba_cost, 2),
            'avg_price': round(ba_avg, 4)
        },
        'twap': {
            'total_cash': round(twap_cost, 2),
            'avg_price': round(twap_avg, 4)
        },
        'vwap': {
            'total_cash': round(vwap_cost, 2),
            'avg_price': round(vwap_avg, 4)
        },
        'savings_vs_best_ask_bps': round((ba_avg - best_result['avg_price']) / ba_avg * 10000, 2),
        'savings_vs_twap_bps': round((twap_avg - best_result['avg_price']) / twap_avg * 10000, 2),
        'savings_vs_vwap_bps': round((vwap_avg - best_result['avg_price']) / vwap_avg * 10000, 2)
    }

    print(json.dumps(result, indent=2))


# In[113]:


if __name__ == "__main__":
    run_backtest()


# In[114]:


import matplotlib.pyplot as plt

# Load and prepare the data
df = df.sort_values('ts_event')
df = df.drop_duplicates(subset=['ts_event', 'publisher_id'], keep='first')

ORDER_SIZE = 5000
remaining = ORDER_SIZE
cumulative_cost = []
timestamps = []
cost_so_far = 0

# Group by timestamps and simulate Best Ask execution
grouped = df.groupby('ts_event')

for ts, group in grouped:
    if remaining <= 0:
        break
    venues = group[['ask_px_00', 'ask_sz_00']]
    venues = venues.sort_values('ask_px_00')
    for _, row in venues.iterrows():
        fill = min(row['ask_sz_00'], remaining)
        cost_so_far += fill * row['ask_px_00']
        remaining -= fill
        if fill > 0:
            timestamps.append(ts)
            cumulative_cost.append(cost_so_far)
        if remaining <= 0:
            break

# Plot and save
plt.figure(figsize=(10, 6))
plt.plot(timestamps, cumulative_cost, label='Best Ask Cumulative Cost')
plt.xlabel('Timestamp')
plt.ylabel('Cumulative Cost')
plt.title('Cumulative Execution Cost Over Time (Best Ask Baseline)')
plt.xticks(rotation=45)
plt.tight_layout()
plt.legend()
plt.grid(True)
plt.savefig('results.png')  
plt.show()

