import pandas as pd
import plotly.express as px
from preswald import connect, get_df, query, text, table, plotly, slider

# Initialize connection to Preswald data sources
connect()
text("# 🛍️ Amazon Product Insights Dashboard")

# SECTION 1: SQL Preview - Display top 5 products using a safe SQL query
sql_preview = "SELECT product_name, rating, category FROM amazonn_csv LIMIT 5;"
text("## 🔍 SQL: Top 5 Products")
preview_df = query(sql_preview, "amazonn_csv")
table(preview_df)

# SECTION 2: Load and clean the dataset using pandas
df = get_df("amazonn_csv")
df["rating"] = pd.to_numeric(df["rating"], errors="coerce")
df["rating_count"] = pd.to_numeric(df["rating_count"].str.replace(",", ""), errors="coerce")
df = df.dropna(subset=["rating"])

# SECTION 3: Interactive rating filter slider
min_rating = slider("⭐ Minimum Rating", min_val=1.0, max_val=5.0, default=4.0, step=0.1)
filtered_df = df[df["rating"] >= min_rating]

# SECTION 4: Display filtered product list
title_text = f"## 📋 Products with Rating ≥ {min_rating}"
text(title_text)
table(filtered_df)

# SECTION 5: Bar chart of top 10 filtered products by rating
if not filtered_df.empty:
    top_rated = filtered_df.sort_values(by="rating", ascending=False).head(10)
    fig = px.bar(
        top_rated,
        x="product_name",
        y="rating",
        color="category",
        title="Top Rated Products (Filtered by Rating)",
        labels={"rating": "Rating"},
    )
    plotly(fig)
else:
    text("⚠️ No products matched the selected rating filter.")

# SECTION 6: Bar chart of average rating per category (global view)
avg_df = df.groupby("category")["rating"].mean().reset_index().round(2)
avg_df = avg_df.sort_values("rating", ascending=False).head(10)

text("## 📊 Global Analysis: Average Rating by Category")
fig2 = px.bar(
    avg_df,
    x="category",
    y="rating",
    title="Top Categories by Average Rating",
    labels={"rating": "Avg. Rating"}
)
plotly(fig2)

# SECTION 7: SQL - Top 10 most reviewed products
text("## 🧮 SQL: Top 10 Most Reviewed Products")
query1 = """
SELECT 
  product_name, 
  rating_count 
FROM amazonn_csv 
WHERE rating_count IS NOT NULL 
ORDER BY CAST(REPLACE(rating_count, ',', '') AS INT) DESC 
LIMIT 10;
"""
most_reviewed = query(query1, "amazonn_csv")
table(most_reviewed)

# SECTION 8: SQL - Product count by category
text("## 📦 SQL: Product Count by Category")
query2 = """
SELECT 
  category, 
  COUNT(*) AS product_count 
FROM amazonn_csv 
WHERE category IS NOT NULL 
GROUP BY category 
ORDER BY product_count DESC 
LIMIT 10;
"""
count_by_category = query(query2, "amazonn_csv")
table(count_by_category)

# SECTION 9: Visualize category count as a bar chart
if not count_by_category.empty:
    fig3 = px.bar(
        count_by_category,
        x="category",
        y="product_count",
        title="Top Categories by Product Count",
        labels={"product_count": "Number of Products"}
    )
    plotly(fig3)
else:
    text("⚠️ Could not generate category count chart.")
