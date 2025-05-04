# Cont & Kukanov Smart Order Router 

## Overview

This project implements a Smart Order Router based on the static cost model introduced by Cont & Kukanov. The router aims to minimize trading costs when executing large orders across multiple venues, accounting for execution risk, queue dynamics, and market fragmentation. It simulates the execution of a 5,000-share buy order using real Level-1 market data and compares its performance to industry-standard baselines.

## Files Included

* `backtest.py`: Main Python script for data processing, order allocation, execution simulation, and baseline benchmarking.
* `l1_day.csv`: Historical L1 market data feed with 60,000 records over a 9-minute window.
* `results.pdf`: A cumulative-cost plot based on the Best Ask execution strategy.
* `README.md`: This documentation file summarizing the project, methodology, and changes.

## How to Run

Execute the script with:

```bash
python backtest.py
```

The script will print a well-formatted JSON object to `stdout` with the following:

* Best parameters found (`lambda_over`, `lambda_under`, `theta_queue`)
* Total cash spent and average fill price for the optimal strategy
* Baseline results for Best Ask, TWAP, and VWAP
* Savings in basis points (bps) versus each baseline

## Parameter Grid Search

Searched across the following combinations:

```
lambda_over  ∈ [0.001, 0.01, 0.1, 0.5, 1.0]
lambda_under ∈ [0.001, 0.01, 0.1, 0.5, 1.0]
theta_queue ∈ [0.001, 0.01, 0.1, 0.5, 1.0]
```

Each of the 125 combinations is evaluated using the allocator defined in the pseudocode and simulated against the market data to select the cost-minimizing parameter set.

## Baselines Compared

1. **Best Ask** – Always takes from the best visible ask across venues.
2. **TWAP (Time-Weighted Average Price)** – Splits the total order evenly over 60-second time buckets.
3. **VWAP (Volume-Weighted Average Price)** – Allocates shares in proportion to venue-visible sizes.

## Key Modifications Made

* **Expanded the parameter grid** from 27 to 125 combinations.
* **Reduced CHUNK size** to 10 to enable finer-grained allocations and better matching.
* **Relaxed allocator constraint**: Underfill allocations are now allowed; we skip only overallocation cases.
* **Guarded against index errors** when allocator returns fewer splits than venue count.
* **Baselines corrected** to prevent overallocations (especially in VWAP).
* **Added cumulative cost plot** saved as `results.pdf` for visual inspection of execution cost over time.

## Results Summary

* The Smart Order Router beat both Best Ask and VWAP by \~3.6 basis points.
* TWAP showed better performance in some runs due to favorable market dips.
* Best parameters: `lambda_over=0.001`, `lambda_under=0.001`, `theta_queue=0.001`

## Suggested Improvement – Fill Realism

To improve simulation realism:

* **Incorporate Queue Position Modeling**: Estimate fill probabilities based on queue depth, time-priority effects, and arrival intensity. Instead of assuming full access to posted size, this would better represent the uncertainty of passive limit order fills.
* **Include Slippage Modeling**: Account for temporary price impact when large marketable orders consume multiple levels of the book.

## Runtime

The script completes within 2 minutes on a standard laptop using only `pandas`, `numpy`, and the standard library. It adheres to all outlined constraints and submission expectations.

---

Author: Sai Nithin Bharadwaj Govind

