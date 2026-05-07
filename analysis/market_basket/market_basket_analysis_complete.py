"""
================================================================================
购物车分析完整流程 (Market Basket Analysis)
严格按照标准步骤执行，确保可还原性
================================================================================
"""

import pandas as pd
import numpy as np
from mlxtend.frequent_patterns import apriori, association_rules
from mlxtend.preprocessing import TransactionEncoder
import matplotlib.pyplot as plt
import seaborn as sns
from collections import Counter
import warnings
warnings.filterwarnings('ignore')

# 设置中文字体和样式
plt.rcParams['font.sans-serif'] = ['SimHei', 'DejaVu Sans', 'Arial Unicode MS']
plt.rcParams['axes.unicode_minus'] = False
sns.set_style("whitegrid")

# 创建输出目录
import os
output_dir = '/workspace/analysis_output'
os.makedirs(output_dir, exist_ok=True)

print("="*80)
print("购物车分析完整流程")
print("Market Basket Analysis - Complete Workflow")
print("="*80)

# ================================================================================
# 步骤1: 数据加载与探索 (Data Loading & Exploration)
# ================================================================================
print("\n" + "="*80)
print("步骤1: 数据加载与探索 (Data Loading & Exploration)")
print("="*80)

# 1.1 加载数据
df = pd.read_csv('/workspace/.uploads/8cfa583d-4bea-41f7-8b8c-2d0e9770e112_market_basket.csv')

print(f"\n【数据基本信息】")
print(f"数据集形状: {df.shape[0]} 行 × {df.shape[1]} 列")
print(f"列名: {list(df.columns)}")

print(f"\n【数据类型】")
print(df.dtypes)

print(f"\n【前5行数据预览】")
print(df.head())

print(f"\n【数据质量检查】")
print(f"缺失值统计:")
print(df.isnull().sum())
print(f"\n重复行数: {df.duplicated().sum()}")

print(f"\n【数值列统计】")
print(df.describe())

# 1.2 检查UnitPrice列的问题
print(f"\n【UnitPrice列检查】")
print(f"UnitPrice唯一值样本: {df['UnitPrice'].unique()[:20]}")
print(f"UnitPrice数据类型: {df['UnitPrice'].dtype}")

# ================================================================================
# 步骤2: 数据清洗 (Data Cleaning)
# ================================================================================
print("\n" + "="*80)
print("步骤2: 数据清洗 (Data Cleaning)")
print("="*80)

# 2.1 处理UnitPrice列 - 转换为数值类型
print("\n【2.1 数据类型转换】")
df['UnitPrice'] = pd.to_numeric(df['UnitPrice'], errors='coerce')
print(f"UnitPrice转换为数值类型")
print(f"转换后缺失值数量: {df['UnitPrice'].isnull().sum()}")

# 2.2 删除缺失值
print("\n【2.2 缺失值处理】")
df_clean = df.dropna()
print(f"删除缺失值前: {len(df)} 行")
print(f"删除缺失值后: {len(df_clean)} 行")
print(f"删除行数: {len(df) - len(df_clean)}")

# 2.3 删除重复值
print("\n【2.3 重复值处理】")
duplicates_before = df_clean.duplicated().sum()
df_clean = df_clean.drop_duplicates()
print(f"删除重复值前: {len(df_clean) + duplicates_before} 行")
print(f"删除重复值后: {len(df_clean)} 行")
print(f"删除重复行数: {duplicates_before}")

# 2.4 删除退货记录（InvoiceNo以C开头的）
print("\n【2.4 退货记录处理】")
returns = df_clean['InvoiceNo'].astype(str).str.startswith('C').sum()
df_clean = df_clean[~df_clean['InvoiceNo'].astype(str).str.startswith('C')]
print(f"退货记录数量: {returns}")
print(f"删除退货后数据量: {len(df_clean)} 行")

# 2.5 过滤异常值
print("\n【2.5 异常值处理】")
print(f"Quantity ≤ 0 的记录: {(df_clean['Quantity'] <= 0).sum()}")
print(f"UnitPrice ≤ 0 的记录: {(df_clean['UnitPrice'] <= 0).sum()}")
df_clean = df_clean[df_clean['Quantity'] > 0]
df_clean = df_clean[df_clean['UnitPrice'] > 0]
print(f"过滤异常值后数据量: {len(df_clean)} 行")

# 2.6 过滤掉描述过短的商品（可能是编码错误）
print("\n【2.6 商品描述清洗】")
short_desc = (df_clean['Description'].str.len() <= 2).sum()
df_clean = df_clean[df_clean['Description'].str.len() > 2]
print(f"短描述商品数量(≤2字符): {short_desc}")
print(f"过滤后数据量: {len(df_clean)} 行")

# 2.7 数据清洗结果汇总
print("\n【2.7 数据清洗结果汇总】")
print(f"原始数据量: {len(df):,} 行")
print(f"清洗后数据量: {len(df_clean):,} 行")
print(f"数据保留率: {len(df_clean)/len(df)*100:.2f}%")
print(f"\n清洗后唯一商品数: {df_clean['Description'].nunique()}")
print(f"清洗后唯一订单数: {df_clean['InvoiceNo'].nunique()}")
print(f"清洗后唯一客户数: {df_clean['CustomerID'].nunique()}")

# ================================================================================
# 步骤3: 购物篮数据构建 (Basket Construction)
# ================================================================================
print("\n" + "="*80)
print("步骤3: 购物篮数据构建 (Basket Construction)")
print("="*80)

# 3.1 按订单分组，获取每个订单的商品列表
print("\n【3.1 购物篮构建】")
basket = df_clean.groupby('InvoiceNo')['Description'].apply(list).reset_index()
basket['item_count'] = basket['Description'].apply(len)

print(f"总订单数: {len(basket)}")
print(f"平均每单商品数: {basket['item_count'].mean():.2f}")
print(f"最大商品数: {basket['item_count'].max()}")
print(f"最小商品数: {basket['item_count'].min()}")
print(f"\n订单商品数分布:")
print(basket['item_count'].value_counts().sort_index())

# 3.2 过滤掉只有一个商品的订单
print("\n【3.2 过滤单商品订单】")
basket_multi = basket[basket['item_count'] > 1]
print(f"包含多个商品的订单数: {len(basket_multi)}")
print(f"过滤掉的单商品订单: {len(basket) - len(basket_multi)}")

# 3.3 准备事务列表
print("\n【3.3 事务列表示例】")
transactions = basket_multi['Description'].tolist()
for i, trans in enumerate(transactions[:5]):
    print(f"订单 {i+1} ({len(trans)}件商品): {trans}")

# ================================================================================
# 步骤4: 数据编码 (Data Encoding)
# ================================================================================
print("\n" + "="*80)
print("步骤4: 数据编码 (Data Encoding)")
print("="*80)

print("\n【4.1 One-Hot编码】")
te = TransactionEncoder()
te_ary = te.fit(transactions).transform(transactions)
df_encoded = pd.DataFrame(te_ary, columns=te.columns_)

print(f"编码后数据形状: {df_encoded.shape}")
print(f"商品总数: {len(te.columns_)}")
print(f"事务总数: {len(df_encoded)}")

# 显示编码后的数据样本
print(f"\n编码后数据样本(前5行, 前10列):")
print(df_encoded.iloc[:5, :10])

# ================================================================================
# 步骤5: 频繁项集挖掘 (Frequent Itemset Mining)
# ================================================================================
print("\n" + "="*80)
print("步骤5: 频繁项集挖掘 (Frequent Itemset Mining)")
print("="*80)

# 5.1 设置最小支持度
min_support = 0.005  # 0.5%
print(f"\n【5.1 Apriori算法参数】")
print(f"最小支持度阈值: {min_support} (0.5%)")

# 5.2 运行Apriori算法
print("\n【5.2 频繁项集挖掘结果】")
frequent_itemsets = apriori(df_encoded, min_support=min_support, use_colnames=True)
frequent_itemsets['length'] = frequent_itemsets['itemsets'].apply(lambda x: len(x))
frequent_itemsets = frequent_itemsets.sort_values('support', ascending=False)

print(f"频繁项集总数: {len(frequent_itemsets)}")

# 5.3 按项集长度分类
print(f"\n【5.3 项集长度分布】")
length_dist = frequent_itemsets['length'].value_counts().sort_index()
for length, count in length_dist.items():
    print(f"  {length}-项集: {count}个")

# 5.4 显示Top频繁项集
print(f"\n【5.4 Top 15 频繁项集】")
for idx, row in frequent_itemsets.head(15).iterrows():
    items = ', '.join(list(row['itemsets']))
    print(f"  支持度 {row['support']:.4f}: {items}")

# ================================================================================
# 步骤6: 关联规则生成 (Association Rules Generation)
# ================================================================================
print("\n" + "="*80)
print("步骤6: 关联规则生成 (Association Rules Generation)")
print("="*80)

# 6.1 设置最小置信度
min_confidence = 0.1  # 10%
print(f"\n【6.1 关联规则参数】")
print(f"最小置信度阈值: {min_confidence} (10%)")

# 6.2 生成关联规则
rules = association_rules(frequent_itemsets, metric="confidence", min_threshold=min_confidence)
rules = rules.sort_values('lift', ascending=False)

print(f"\n【6.2 关联规则结果】")
print(f"生成的关联规则总数: {len(rules)}")

if len(rules) > 0:
    print(f"\n【6.3 Top 关联规则】")
    for idx, row in rules.head(10).iterrows():
        antecedent = ', '.join(list(row['antecedents']))
        consequent = ', '.join(list(row['consequents']))
        print(f"\n规则: {antecedent} → {consequent}")
        print(f"  支持度: {row['support']:.4f}")
        print(f"  置信度: {row['confidence']:.4f}")
        print(f"  提升度: {row['lift']:.4f}")
else:
    print("\n未生成满足置信度阈值的关联规则")
    print("\n原因分析:")
    print("  - 数据集中平均每单商品数较少(2.64件)")
    print("  - 商品种类分散(187种商品分布在1620个订单中)")
    print("  - 缺乏明显的商品组合购买模式")

# ================================================================================
# 步骤7: 可视化分析 (Visualization)
# ================================================================================
print("\n" + "="*80)
print("步骤7: 可视化分析 (Visualization)")
print("="*80)

# 7.1 热销商品分析图
print("\n【7.1 生成热销商品图】")
fig, ax = plt.subplots(figsize=(12, 8))
top_20_products = df_clean['Description'].value_counts().head(20)
colors = plt.cm.Set3(np.linspace(0, 1, 20))
bars = ax.barh(range(len(top_20_products)), top_20_products.values, color=colors)
ax.set_yticks(range(len(top_20_products)))
ax.set_yticklabels([p[:45] for p in top_20_products.index], fontsize=10)
ax.set_xlabel('Sales Count', fontsize=12, fontweight='bold')
ax.set_title('Top 20 Best-Selling Products', fontsize=14, fontweight='bold', pad=20)
ax.invert_yaxis()
# 添加数值标签
for i, (bar, value) in enumerate(zip(bars, top_20_products.values)):
    ax.text(value + 0.5, i, str(value), va='center', fontsize=9)
plt.tight_layout()
plt.savefig(f'{output_dir}/01_top_products.png', dpi=150, bbox_inches='tight')
plt.close()
print(f"  已保存: 01_top_products.png")

# 7.2 频繁项集支持度分布
print("\n【7.2 生成频繁项集图】")
fig, ax = plt.subplots(figsize=(12, 10))
top_itemsets = frequent_itemsets.head(15).copy()
top_itemsets['itemsets_str'] = top_itemsets['itemsets'].apply(lambda x: ', '.join(list(x))[:50])
colors = plt.cm.Spectral(np.linspace(0.2, 0.8, 15))
bars = ax.barh(range(len(top_itemsets)), top_itemsets['support'], color=colors)
ax.set_yticks(range(len(top_itemsets)))
ax.set_yticklabels(top_itemsets['itemsets_str'], fontsize=10)
ax.set_xlabel('Support', fontsize=12, fontweight='bold')
ax.set_title('Top 15 Frequent Itemsets by Support', fontsize=14, fontweight='bold', pad=20)
ax.invert_yaxis()
# 添加数值标签
for i, (bar, value) in enumerate(zip(bars, top_itemsets['support'])):
    ax.text(value + 0.0005, i, f'{value:.3f}', va='center', fontsize=9)
plt.tight_layout()
plt.savefig(f'{output_dir}/02_frequent_itemsets.png', dpi=150, bbox_inches='tight')
plt.close()
print(f"  已保存: 02_frequent_itemsets.png")

# 7.3 支持度分布直方图
print("\n【7.3 生成支持度分布图】")
fig, axes = plt.subplots(1, 2, figsize=(14, 5))

# 支持度分布
axes[0].hist(frequent_itemsets['support'], bins=30, edgecolor='black', 
             alpha=0.7, color='steelblue', linewidth=1.2)
axes[0].set_xlabel('Support', fontsize=11, fontweight='bold')
axes[0].set_ylabel('Frequency', fontsize=11, fontweight='bold')
axes[0].set_title('Distribution of Support Values', fontsize=12, fontweight='bold')
axes[0].grid(True, alpha=0.3)

# 订单商品数分布
basket['item_count'].hist(bins=range(1, basket['item_count'].max()+2), 
                          ax=axes[1], edgecolor='black', alpha=0.7, color='coral')
axes[1].set_xlabel('Items per Order', fontsize=11, fontweight='bold')
axes[1].set_ylabel('Number of Orders', fontsize=11, fontweight='bold')
axes[1].set_title('Distribution of Items per Order', fontsize=12, fontweight='bold')
axes[1].grid(True, alpha=0.3)

plt.tight_layout()
plt.savefig(f'{output_dir}/03_distributions.png', dpi=150, bbox_inches='tight')
plt.close()
print(f"  已保存: 03_distributions.png")

# 7.4 关联规则散点图（如果有规则）
if len(rules) > 0:
    print("\n【7.4 生成关联规则散点图】")
    fig, ax = plt.subplots(figsize=(10, 7))
    scatter = ax.scatter(rules['support'], rules['confidence'], 
                        alpha=0.6, c=rules['lift'], cmap='viridis', 
                        s=100, edgecolors='black', linewidth=0.5)
    cbar = plt.colorbar(scatter, ax=ax)
    cbar.set_label('Lift', fontsize=11, fontweight='bold')
    ax.set_xlabel('Support', fontsize=12, fontweight='bold')
    ax.set_ylabel('Confidence', fontsize=12, fontweight='bold')
    ax.set_title('Association Rules: Support vs Confidence\n(Color indicates Lift)', 
                 fontsize=13, fontweight='bold', pad=15)
    ax.grid(True, alpha=0.3)
    plt.tight_layout()
    plt.savefig(f'{output_dir}/04_association_rules.png', dpi=150, bbox_inches='tight')
    plt.close()
    print(f"  已保存: 04_association_rules.png")
else:
    print("\n【7.4 跳过关联规则图】（无规则生成）")

# 7.5 商品类别分析（基于商品名称关键词）
print("\n【7.5 生成商品类别分析图】")

# 定义商品类别关键词
categories = {
    'Coffee & Tea': ['COFFEE', 'TEA', 'MUG', 'CUP'],
    'Christmas Items': ['CHRISTMAS', 'XMAS'],
    'Lunch & Food': ['LUNCH', 'FOOD', 'CAKE'],
    'Office Supplies': ['PAPER', 'TAPE', 'PRINTER', 'OFFICE'],
    'Home Decor': ['FRAME', 'LANTERN', 'GARLAND'],
    'Electronics': ['BLUETOOTH', 'CHARGER', 'SPEAKER', 'VACUUM'],
    'Storage': ['BOX', 'BAG', 'TIN'],
}

# 分类商品
category_counts = {}
for cat, keywords in categories.items():
    count = 0
    for desc in df_clean['Description']:
        if any(kw in desc.upper() for kw in keywords):
            count += 1
    category_counts[cat] = count

# 绘制饼图
fig, ax = plt.subplots(figsize=(10, 8))
colors = plt.cm.Set3(np.linspace(0, 1, len(category_counts)))
wedges, texts, autotexts = ax.pie(category_counts.values(), labels=category_counts.keys(), 
                                   autopct='%1.1f%%', startangle=90, colors=colors,
                                   textprops={'fontsize': 10})
for autotext in autotexts:
    autotext.set_color('white')
    autotext.set_fontweight('bold')
ax.set_title('Product Category Distribution\n(Based on Keywords)', 
             fontsize=14, fontweight='bold', pad=20)
plt.tight_layout()
plt.savefig(f'{output_dir}/05_category_distribution.png', dpi=150, bbox_inches='tight')
plt.close()
print(f"  已保存: 05_category_distribution.png")

# ================================================================================
# 步骤8: 保存分析结果 (Save Results)
# ================================================================================
print("\n" + "="*80)
print("步骤8: 保存分析结果 (Save Results)")
print("="*80)

# 8.1 保存频繁项集
frequent_itemsets_export = frequent_itemsets.copy()
frequent_itemsets_export['itemsets'] = frequent_itemsets_export['itemsets'].apply(lambda x: ', '.join(list(x)))
frequent_itemsets_export.to_csv(f'{output_dir}/frequent_itemsets.csv', index=False)
print(f"\n【8.1 频繁项集】已保存: frequent_itemsets.csv")

# 8.2 保存关联规则
if len(rules) > 0:
    rules_export = rules[['antecedents', 'consequents', 'antecedent support', 
                          'consequent support', 'support', 'confidence', 'lift', 
                          'leverage', 'conviction']].copy()
    rules_export['antecedents'] = rules_export['antecedents'].apply(lambda x: ', '.join(list(x)))
    rules_export['consequents'] = rules_export['consequents'].apply(lambda x: ', '.join(list(x)))
    rules_export.to_csv(f'{output_dir}/association_rules.csv', index=False)
    print(f"【8.2 关联规则】已保存: association_rules.csv")
else:
    print(f"【8.2 关联规则】未生成规则，跳过保存")

# 8.3 保存数据清洗记录
cleaning_log = {
    '原始数据量': len(df),
    '缺失值删除': len(df) - len(df.dropna()),
    '重复值删除': duplicates_before,
    '退货记录删除': returns,
    '异常值删除': len(df.dropna()) - duplicates_before - len(df_clean) - returns,
    '短描述删除': short_desc,
    '清洗后数据量': len(df_clean),
    '数据保留率': f"{len(df_clean)/len(df)*100:.2f}%"
}
cleaning_df = pd.DataFrame([cleaning_log])
cleaning_df.to_csv(f'{output_dir}/data_cleaning_log.csv', index=False)
print(f"【8.3 清洗记录】已保存: data_cleaning_log.csv")

# 8.4 保存热销商品
top_products = df_clean['Description'].value_counts().head(50)
top_products_df = pd.DataFrame({
    'Product': top_products.index,
    'Sales_Count': top_products.values
})
top_products_df.to_csv(f'{output_dir}/top_products.csv', index=False)
print(f"【8.4 热销商品】已保存: top_products.csv")

# ================================================================================
# 步骤9: 分析总结 (Summary)
# ================================================================================
print("\n" + "="*80)
print("步骤9: 分析总结 (Analysis Summary)")
print("="*80)

avg_confidence = rules['confidence'].mean() if len(rules) > 0 else 0
avg_lift = rules['lift'].mean() if len(rules) > 0 else 0
max_lift = rules['lift'].max() if len(rules) > 0 else 0

print(f"""
【数据集统计】
  ├─ 原始数据量: {len(df):,} 条
  ├─ 清洗后数据量: {len(df_clean):,} 条
  ├─ 数据保留率: {len(df_clean)/len(df)*100:.2f}%
  ├─ 有效订单数: {len(basket_multi):,} 个
  ├─ 唯一商品数: {df_clean['Description'].nunique():,} 个
  └─ 唯一客户数: {df_clean['CustomerID'].nunique()}

【购物篮统计】
  ├─ 平均每单商品数: {basket['item_count'].mean():.2f} 件
  ├─ 最大订单商品数: {basket['item_count'].max()} 件
  └─ 多商品订单数: {len(basket_multi)} 个

【关联规则挖掘结果】
  ├─ 频繁项集数量: {len(frequent_itemsets):,} 个
  ├─ 关联规则数量: {len(rules):,} 条
  ├─ 平均支持度: {frequent_itemsets['support'].mean():.4f}
  ├─ 平均置信度: {avg_confidence:.4f}
  └─ 平均提升度: {avg_lift:.4f}

【输出文件列表】
  ├─ 01_top_products.png (热销商品图)
  ├─ 02_frequent_itemsets.png (频繁项集图)
  ├─ 03_distributions.png (分布图)
  ├─ 04_association_rules.png (关联规则图, 如生成)
  ├─ 05_category_distribution.png (商品类别分布图)
  ├─ frequent_itemsets.csv (频繁项集数据)
  ├─ association_rules.csv (关联规则数据, 如生成)
  ├─ data_cleaning_log.csv (数据清洗记录)
  └─ top_products.csv (热销商品数据)
""")

print("="*80)
print("分析完成！所有结果已保存至:", output_dir)
print("="*80)
