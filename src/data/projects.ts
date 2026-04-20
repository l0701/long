export interface Project {
  id: string
  title: string
  description: string
  difficulty: string
  level: number
  code: string
  dataset: any
  instructions: string
  learningObjectives: string[]
}

export const projects: Project[] = [
  {
    id: '1',
    title: '数据读取与基本操作',
    description: '学习如何使用pandas读取不同格式的数据文件，并进行基本的数据操作。',
    difficulty: '入门',
    level: 1,
    code: `import pandas as pd

# 创建示例数据
data = {
    'name': ['Alice', 'Bob', 'Charlie', 'David', 'Eva'],
    'age': [25, 30, 35, 40, 45],
    'city': ['New York', 'London', 'Paris', 'Tokyo', 'Sydney'],
    'salary': [50000, 60000, 70000, 80000, 90000]
}

# 创建DataFrame
df = pd.DataFrame(data)

# 查看数据前5行
print("数据前5行:")
print(df.head())

# 查看数据基本信息
print("\n数据基本信息:")
print(df.info())

# 查看数据统计信息
print("\n数据统计信息:")
print(df.describe())

# 选择列
print("\n选择name列:")
print(df['name'])

# 选择多列
print("\n选择name和salary列:")
print(df[['name', 'salary']])

# 选择行
print("\n选择前3行:")
print(df[:3])

# 使用loc选择行和列
print("\n使用loc选择行和列:")
print(df.loc[1:3, ['name', 'age']])

# 使用iloc选择行和列
print("\n使用iloc选择行和列:")
print(df.iloc[0:2, 0:3])`,
    dataset: {
      name: ['Alice', 'Bob', 'Charlie', 'David', 'Eva'],
      age: [25, 30, 35, 40, 45],
      city: ['New York', 'London', 'Paris', 'Tokyo', 'Sydney'],
      salary: [50000, 60000, 70000, 80000, 90000]
    },
    instructions: '运行代码，观察输出结果，理解pandas的基本操作。',
    learningObjectives: [
      '了解pandas DataFrame的基本结构',
      '学习如何创建DataFrame',
      '掌握基本的数据查看方法',
      '学习如何选择数据的行和列'
    ]
  },
  {
    id: '2',
    title: '数据清洗与预处理',
    description: '学习如何处理缺失值、重复值和异常值，以及数据类型转换。',
    difficulty: '入门',
    level: 1,
    code: `import pandas as pd
import numpy as np

# 创建包含缺失值和重复值的数据
data = {
    'name': ['Alice', 'Bob', 'Charlie', 'David', 'Eva', 'Bob'],
    'age': [25, np.nan, 35, 40, 45, 30],
    'city': ['New York', 'London', np.nan, 'Tokyo', 'Sydney', 'London'],
    'salary': [50000, 60000, 70000, np.nan, 90000, 60000]
}

df = pd.DataFrame(data)

print("原始数据:")
print(df)

# 检查缺失值
print("\n缺失值检查:")
print(df.isnull())

# 计算每列缺失值数量
print("\n每列缺失值数量:")
print(df.isnull().sum())

# 填充缺失值
print("\n填充缺失值:")
df_filled = df.copy()
df_filled['age'] = df_filled['age'].fillna(df_filled['age'].mean())
df_filled['city'] = df_filled['city'].fillna('Unknown')
df_filled['salary'] = df_filled['salary'].fillna(df_filled['salary'].median())
print(df_filled)

# 删除重复值
print("\n删除重复值:")
df_unique = df_filled.drop_duplicates()
print(df_unique)

# 数据类型转换
print("\n数据类型转换:")
df_unique['salary'] = df_unique['salary'].astype(int)
print(df_unique.dtypes)
print(df_unique)

# 异常值检测（使用IQR方法）
print("\n异常值检测:")
Q1 = df_unique['salary'].quantile(0.25)
Q3 = df_unique['salary'].quantile(0.75)
IQR = Q3 - Q1
lower_bound = Q1 - 1.5 * IQR
upper_bound = Q3 + 1.5 * IQR
print(f"Q1: {Q1}, Q3: {Q3}, IQR: {IQR}")
print(f"异常值边界: {lower_bound} - {upper_bound}")
print("异常值:")
print(df_unique[(df_unique['salary'] < lower_bound) | (df_unique['salary'] > upper_bound)])`,
    dataset: {
      name: ['Alice', 'Bob', 'Charlie', 'David', 'Eva', 'Bob'],
      age: [25, null, 35, 40, 45, 30],
      city: ['New York', 'London', null, 'Tokyo', 'Sydney', 'London'],
      salary: [50000, 60000, 70000, null, 90000, 60000]
    },
    instructions: '运行代码，观察数据清洗的过程和结果。',
    learningObjectives: [
      '学习如何检测和处理缺失值',
      '掌握删除重复值的方法',
      '学习数据类型转换',
      '了解异常值检测的基本方法'
    ]
  },
  {
    id: '3',
    title: '数据统计与描述性分析',
    description: '学习如何使用pandas进行数据统计和描述性分析。',
    difficulty: '入门',
    level: 1,
    code: `import pandas as pd
import numpy as np

# 创建销售数据
data = {
    'product': ['A', 'B', 'C', 'A', 'B', 'C', 'A', 'B', 'C'],
    'sales': [100, 200, 150, 120, 210, 160, 110, 190, 140],
    'price': [10, 20, 15, 10, 20, 15, 10, 20, 15],
    'date': pd.date_range('2023-01-01', periods=9, freq='D')
}

df = pd.DataFrame(data)

print("原始数据:")
print(df)

# 基本统计信息
print("\n基本统计信息:")
print(df.describe())

# 按产品分组统计
print("\n按产品分组统计:")
print(df.groupby('product').agg({
    'sales': ['sum', 'mean', 'std'],
    'price': 'mean'
}))

# 计算总销售额
print("\n总销售额:")
df['total_sales'] = df['sales'] * df['price']
print(df)
print(f"总销售额: {df['total_sales'].sum()}")

# 计算每日销售额
print("\n每日销售额:")
daily_sales = df.groupby('date')['total_sales'].sum()
print(daily_sales)

# 计算产品销售占比
print("\n产品销售占比:")
product_sales = df.groupby('product')['total_sales'].sum()
product_share = product_sales / product_sales.sum() * 100
print(product_share)

# 计算销售数据的偏度和峰度
print("\n销售数据的偏度和峰度:")
print(f"销售额偏度: {df['sales'].skew()}")
print(f"销售额峰度: {df['sales'].kurt()}")
print(f"价格偏度: {df['price'].skew()}")
print(f"价格峰度: {df['price'].kurt()}")`,
    dataset: {
      product: ['A', 'B', 'C', 'A', 'B', 'C', 'A', 'B', 'C'],
      sales: [100, 200, 150, 120, 210, 160, 110, 190, 140],
      price: [10, 20, 15, 10, 20, 15, 10, 20, 15],
      date: ['2023-01-01', '2023-01-02', '2023-01-03', '2023-01-04', '2023-01-05', '2023-01-06', '2023-01-07', '2023-01-08', '2023-01-09']
    },
    instructions: '运行代码，观察数据统计和描述性分析的结果。',
    learningObjectives: [
      '学习基本的描述性统计方法',
      '掌握分组统计的使用',
      '了解如何计算销售数据的各种指标',
      '学习偏度和峰度等统计概念'
    ]
  },
  {
    id: '4',
    title: '数据分组与聚合',
    description: '学习如何使用pandas进行数据分组和聚合操作。',
    difficulty: '中级',
    level: 2,
    code: `import pandas as pd
import numpy as np

# 创建员工数据
data = {
    'department': ['HR', 'IT', 'IT', 'HR', 'Finance', 'Finance', 'IT', 'HR', 'Finance'],
    'employee': ['Alice', 'Bob', 'Charlie', 'David', 'Eva', 'Frank', 'Grace', 'Henry', 'Ivy'],
    'salary': [50000, 60000, 70000, 55000, 65000, 75000, 62000, 58000, 72000],
    'age': [25, 30, 35, 40, 45, 50, 32, 38, 42],
    'performance': [85, 90, 95, 80, 88, 92, 87, 82, 89]
}

df = pd.DataFrame(data)

print("原始数据:")
print(df)

# 按部门分组计算平均工资和绩效
print("\n按部门分组计算平均工资和绩效:")
dep_stats = df.groupby('department').agg({
    'salary': 'mean',
    'performance': 'mean',
    'employee': 'count'
}).rename(columns={'employee': 'count'})
print(dep_stats)

# 多列分组
print("\n按部门和年龄段分组:")
df['age_group'] = pd.cut(df['age'], bins=[20, 30, 40, 50, 60], labels=['20-30', '30-40', '40-50', '50+'])
age_group_stats = df.groupby(['department', 'age_group']).agg({
    'salary': ['mean', 'std'],
    'performance': 'mean'
})
print(age_group_stats)

# 使用transform方法
print("\n使用transform计算部门平均工资:")
df['dept_avg_salary'] = df.groupby('department')['salary'].transform('mean')
df['salary_diff'] = df['salary'] - df['dept_avg_salary']
print(df[['department', 'employee', 'salary', 'dept_avg_salary', 'salary_diff']])

# 使用filter方法
print("\n使用filter筛选平均绩效大于85的部门:")
high_perf_depts = df.groupby('department').filter(lambda x: x['performance'].mean() > 85)
print(high_perf_depts)

# 使用agg方法自定义聚合函数
print("\n使用自定义聚合函数:")
def range_func(x):
    return x.max() - x.min()

custom_agg = df.groupby('department').agg({
    'salary': ['mean', 'max', 'min', range_func],
    'performance': ['mean', 'std']
})
print(custom_agg)`,
    dataset: {
      department: ['HR', 'IT', 'IT', 'HR', 'Finance', 'Finance', 'IT', 'HR', 'Finance'],
      employee: ['Alice', 'Bob', 'Charlie', 'David', 'Eva', 'Frank', 'Grace', 'Henry', 'Ivy'],
      salary: [50000, 60000, 70000, 55000, 65000, 75000, 62000, 58000, 72000],
      age: [25, 30, 35, 40, 45, 50, 32, 38, 42],
      performance: [85, 90, 95, 80, 88, 92, 87, 82, 89]
    },
    instructions: '运行代码，观察数据分组和聚合的结果。',
    learningObjectives: [
      '掌握groupby的基本使用方法',
      '学习多列分组和多级索引',
      '了解transform和filter方法的使用',
      '学习自定义聚合函数'
    ]
  },
  {
    id: '5',
    title: '数据合并与连接',
    description: '学习如何使用pandas合并和连接不同的数据集。',
    difficulty: '中级',
    level: 2,
    code: `import pandas as pd

# 创建员工基本信息数据
employees = pd.DataFrame({
    'id': [1, 2, 3, 4, 5],
    'name': ['Alice', 'Bob', 'Charlie', 'David', 'Eva'],
    'department': ['HR', 'IT', 'IT', 'HR', 'Finance']
})

# 创建员工薪资数据
salaries = pd.DataFrame({
    'id': [1, 2, 3, 4, 6],
    'salary': [50000, 60000, 70000, 55000, 65000],
    'bonus': [5000, 6000, 7000, 5500, 6500]
})

# 创建部门信息数据
departments = pd.DataFrame({
    'department': ['HR', 'IT', 'Finance'],
    'manager': ['John', 'Mike', 'Sarah'],
    'location': ['New York', 'London', 'Paris']
})

print("员工基本信息:")
print(employees)
print("\n员工薪资数据:")
print(salaries)
print("\n部门信息数据:")
print(departments)

# 内连接
print("\n内连接 (inner join):")
inner_join = pd.merge(employees, salaries, on='id', how='inner')
print(inner_join)

# 左连接
print("\n左连接 (left join):")
left_join = pd.merge(employees, salaries, on='id', how='left')
print(left_join)

# 右连接
print("\n右连接 (right join):")
right_join = pd.merge(employees, salaries, on='id', how='right')
print(right_join)

# 外连接
print("\n外连接 (outer join):")
outer_join = pd.merge(employees, salaries, on='id', how='outer')
print(outer_join)

# 多表连接
print("\n多表连接:")
merged_data = pd.merge(inner_join, departments, on='department', how='left')
print(merged_data)

# 使用join方法
print("\n使用join方法:")
employees.set_index('id', inplace=True)
salaries.set_index('id', inplace=True)
join_result = employees.join(salaries, how='inner')
print(join_result)

# 重置索引
join_result.reset_index(inplace=True)
print("\n重置索引后:")
print(join_result)`,
    dataset: {
      employees: {
        id: [1, 2, 3, 4, 5],
        name: ['Alice', 'Bob', 'Charlie', 'David', 'Eva'],
        department: ['HR', 'IT', 'IT', 'HR', 'Finance']
      },
      salaries: {
        id: [1, 2, 3, 4, 6],
        salary: [50000, 60000, 70000, 55000, 65000],
        bonus: [5000, 6000, 7000, 5500, 6500]
      },
      departments: {
        department: ['HR', 'IT', 'Finance'],
        manager: ['John', 'Mike', 'Sarah'],
        location: ['New York', 'London', 'Paris']
      }
    },
    instructions: '运行代码，观察不同类型的数据合并和连接结果。',
    learningObjectives: [
      '掌握merge函数的基本使用',
      '学习不同类型的连接方式（内连接、左连接、右连接、外连接）',
      '了解多表连接的方法',
      '学习使用join方法进行连接'
    ]
  },
  {
    id: '6',
    title: '时间序列分析',
    description: '学习如何使用pandas进行时间序列数据的处理和分析。',
    difficulty: '中级',
    level: 2,
    code: `import pandas as pd
import numpy as np

# 创建时间序列数据
date_range = pd.date_range('2023-01-01', periods=365, freq='D')
values = np.random.randn(365) * 10 + 50
values[::7] += np.random.randn(52) * 20  # 添加周末效应

# 创建DataFrame
df = pd.DataFrame({
    'date': date_range,
    'value': values
})

print("原始数据:")
print(df.head())

# 设置日期为索引
df.set_index('date', inplace=True)
print("\n设置日期为索引:")
print(df.head())

# 时间序列基本操作
print("\n时间序列基本操作:")
print(f"数据开始日期: {df.index.min()}")
print(f"数据结束日期: {df.index.max()}")
print(f"数据总天数: {len(df)}")

# 按月份汇总
print("\n按月份汇总:")
monthly_data = df.resample('M').agg(['mean', 'std', 'sum'])
print(monthly_data)

# 按季度汇总
print("\n按季度汇总:")
quarterly_data = df.resample('Q').agg(['mean', 'std', 'sum'])
print(quarterly_data)

# 移动平均
print("\n7天移动平均:")
df['7d_ma'] = df['value'].rolling(window=7).mean()
print(df.head(10))

# 移动标准差
print("\n7天移动标准差:")
df['7d_std'] = df['value'].rolling(window=7).std()
print(df.head(10))

# 时间序列差分
print("\n时间序列差分:")
df['diff'] = df['value'].diff()
print(df.head(10))

# 季节性分析
print("\n按月统计平均值:")
monthly_avg = df.groupby(df.index.month)['value'].mean()
print(monthly_avg)

print("\n按周统计平均值:")
weekly_avg = df.groupby(df.index.dayofweek)['value'].mean()
print(weekly_avg)`,
    dataset: {
      date: '2023-01-01 到 2023-12-31 的日期范围',
      value: '随机生成的数值，带有周末效应'
    },
    instructions: '运行代码，观察时间序列数据的处理和分析结果。',
    learningObjectives: [
      '了解时间序列数据的基本结构',
      '掌握时间序列的重采样方法',
      '学习移动平均和移动标准差的计算',
      '了解时间序列差分和季节性分析'
    ]
  },
  {
    id: '7',
    title: '数据可视化基础',
    description: '学习如何使用pandas和plotly进行数据可视化。',
    difficulty: '中级',
    level: 2,
    code: `import pandas as pd
import numpy as np
import plotly.express as px
import plotly.graph_objects as go

# 创建销售数据
dates = pd.date_range('2023-01-01', periods=12, freq='M')
products = ['A', 'B', 'C']
data = []

for date in dates:
    for product in products:
        sales = np.random.randint(100, 1000)
        data.append({'date': date, 'product': product, 'sales': sales})

df = pd.DataFrame(data)

print("原始数据:")
print(df.head())

# 折线图
print("\n创建折线图...")
fig1 = px.line(df, x='date', y='sales', color='product', title='产品销售趋势')
fig1.show()

# 柱状图
print("\n创建柱状图...")
fig2 = px.bar(df, x='date', y='sales', color='product', barmode='group', title='产品销售对比')
fig2.show()

# 饼图
print("\n创建饼图...")
total_sales = df.groupby('product')['sales'].sum().reset_index()
fig3 = px.pie(total_sales, values='sales', names='product', title='产品销售占比')
fig3.show()

# 散点图
print("\n创建散点图...")
# 添加随机价格数据
df['price'] = np.random.randint(10, 100, len(df))
fig4 = px.scatter(df, x='price', y='sales', color='product', title='价格与销售额关系')
fig4.show()

# 箱线图
print("\n创建箱线图...")
fig5 = px.box(df, x='product', y='sales', title='产品销售分布')
fig5.show()

# 热力图
print("\n创建热力图...")
pivot_df = df.pivot(index='product', columns=df['date'].dt.month, values='sales')
fig6 = px.imshow(pivot_df, title='产品销售热力图')
fig6.show()

# 多子图
print("\n创建多子图...")
fig = go.Figure()

for product in products:
    product_data = df[df['product'] == product]
    fig.add_trace(go.Scatter(
        x=product_data['date'],
        y=product_data['sales'],
        name=product
    ))

fig.update_layout(
    title='产品销售趋势',
    xaxis_title='日期',
    yaxis_title='销售额',
    legend_title='产品'
)

fig.show()`,
    dataset: {
      date: '2023-01 到 2023-12 的月份',
      product: ['A', 'B', 'C'],
      sales: '随机生成的销售数据'
    },
    instructions: '运行代码，观察各种数据可视化图表的效果。',
    learningObjectives: [
      '学习使用plotly创建折线图、柱状图、饼图等基本图表',
      '掌握数据可视化的基本技巧',
      '了解如何创建多子图和复杂图表',
      '学习如何美化图表效果'
    ]
  },
  {
    id: '8',
    title: '复杂数据处理与转换',
    description: '学习如何使用pandas进行复杂的数据处理和转换操作。',
    difficulty: '高级',
    level: 3,
    code: `import pandas as pd
import numpy as np

# 创建复杂数据集
data = {
    'user_id': [1, 1, 2, 2, 3, 3, 4, 4],
    'session_id': [101, 102, 103, 104, 105, 106, 107, 108],
    'timestamp': pd.date_range('2023-01-01 10:00:00', periods=8, freq='H'),
    'action': ['page_view', 'purchase', 'page_view', 'add_to_cart', 'page_view', 'purchase', 'page_view', 'add_to_cart'],
    'product_id': [1001, 1001, 1002, 1002, 1003, 1003, 1004, 1004],
    'quantity': [1, 1, 1, 2, 1, 1, 1, 3],
    'price': [100, 100, 200, 200, 150, 150, 120, 120]
}

df = pd.DataFrame(data)

print("原始数据:")
print(df)

# 计算每个用户的总购买金额
print("\n每个用户的总购买金额:")
purchase_data = df[df['action'] == 'purchase']
user_total = purchase_data.groupby('user_id').agg({
    'price': lambda x: (x * df.loc[x.index, 'quantity']).sum()
}).rename(columns={'price': 'total_spent'})
print(user_total)

# 创建用户行为序列
print("\n用户行为序列:")
user_actions = df.groupby('user_id')['action'].apply(list).reset_index()
user_actions.columns = ['user_id', 'action_sequence']
print(user_actions)

# 计算会话持续时间
print("\n会话持续时间:")
session_duration = df.groupby('session_id').agg({
    'timestamp': ['min', 'max']
})
session_duration['duration'] = session_duration[('timestamp', 'max')] - session_duration[('timestamp', 'min')]
session_duration = session_duration.reset_index()
session_duration.columns = ['session_id', 'start_time', 'end_time', 'duration']
print(session_duration)

# 透视表分析
print("\n透视表分析:")
pivot_table = pd.pivot_table(df, values='quantity', index='user_id', columns='action', aggfunc='sum', fill_value=0)
print(pivot_table)

# 滚动窗口分析
print("\n滚动窗口分析:")
df = df.sort_values('timestamp')
df.set_index('timestamp', inplace=True)
rolling_sales = df[df['action'] == 'purchase']['price'].rolling(window='2H').sum()
print(rolling_sales)

# 时间序列重采样和聚合
print("\n时间序列重采样和聚合:")
hourly_data = df.resample('H').agg({
    'user_id': 'nunique',
    'session_id': 'nunique',
    'quantity': 'sum',
    'price': 'sum'
}).rename(columns={
    'user_id': 'unique_users',
    'session_id': 'unique_sessions',
    'price': 'total_revenue'
})
print(hourly_data)

# 复杂条件过滤
print("\n复杂条件过滤:")
# 查找购买了超过1件商品的用户
multi_purchase_users = df[(df['action'] == 'purchase') & (df['quantity'] > 1)]['user_id'].unique()
print(f"购买了超过1件商品的用户: {multi_purchase_users}")

# 查找在同一会话中既有浏览又有购买行为的会话
print("\n在同一会话中既有浏览又有购买行为的会话:")
session_actions = df.groupby('session_id')['action'].unique()
purchase_sessions = session_actions[session_actions.apply(lambda x: 'purchase' in x and 'page_view' in x)].index
print(f"既有浏览又有购买行为的会话: {purchase_sessions.tolist()}")`,
    dataset: {
      user_id: [1, 1, 2, 2, 3, 3, 4, 4],
      session_id: [101, 102, 103, 104, 105, 106, 107, 108],
      timestamp: ['2023-01-01 10:00:00', '2023-01-01 11:00:00', '2023-01-01 12:00:00', '2023-01-01 13:00:00', '2023-01-01 14:00:00', '2023-01-01 15:00:00', '2023-01-01 16:00:00', '2023-01-01 17:00:00'],
      action: ['page_view', 'purchase', 'page_view', 'add_to_cart', 'page_view', 'purchase', 'page_view', 'add_to_cart'],
      product_id: [1001, 1001, 1002, 1002, 1003, 1003, 1004, 1004],
      quantity: [1, 1, 1, 2, 1, 1, 1, 3],
      price: [100, 100, 200, 200, 150, 150, 120, 120]
    },
    instructions: '运行代码，观察复杂数据处理和转换的结果。',
    learningObjectives: [
      '掌握复杂的分组和聚合操作',
      '学习创建和分析用户行为序列',
      '了解滚动窗口分析的使用',
      '掌握时间序列重采样和聚合',
      '学习复杂条件过滤和数据提取'
    ]
  },
  {
    id: '9',
    title: '高级数据可视化',
    description: '学习如何使用plotly创建高级数据可视化图表。',
    difficulty: '高级',
    level: 3,
    code: `import pandas as pd
import numpy as np
import plotly.express as px
import plotly.graph_objects as go
from plotly.subplots import make_subplots

# 创建复杂数据集
np.random.seed(42)
dates = pd.date_range('2023-01-01', periods=12, freq='M')
regions = ['North', 'South', 'East', 'West']
products = ['A', 'B', 'C', 'D']

data = []
for date in dates:
    for region in regions:
        for product in products:
            sales = np.random.randint(100, 1000) + np.random.randn() * 50
            profit = sales * (0.1 + np.random.randn() * 0.05)
            data.append({
                'date': date,
                'region': region,
                'product': product,
                'sales': sales,
                'profit': profit
            })

df = pd.DataFrame(data)

print("原始数据:")
print(df.head())

# 1. 多子图仪表盘
print("\n创建多子图仪表盘...")
fig = make_subplots(rows=2, cols=2, subplot_titles=('销售趋势', '地区销售分布', '产品销售占比', '销售与利润关系'))

# 销售趋势
for product in products:
    product_data = df[df['product'] == product]
    monthly_sales = product_data.groupby('date')['sales'].sum().reset_index()
    fig.add_trace(
        go.Scatter(x=monthly_sales['date'], y=monthly_sales['sales'], name=product),
        row=1, col=1
    )

# 地区销售分布
region_sales = df.groupby('region')['sales'].sum().reset_index()
fig.add_trace(
    go.Bar(x=region_sales['region'], y=region_sales['sales'], name='地区销售'),
    row=1, col=2
)

# 产品销售占比
product_sales = df.groupby('product')['sales'].sum().reset_index()
fig.add_trace(
    go.Pie(labels=product_sales['product'], values=product_sales['sales'], name='产品销售'),
    row=2, col=1
)

# 销售与利润关系
fig.add_trace(
    go.Scatter(x=df['sales'], y=df['profit'], mode='markers', marker=dict(size=8, opacity=0.6), name='销售与利润'),
    row=2, col=2
)

fig.update_layout(height=800, width=1000, title_text="销售数据仪表盘")
fig.show()

# 2. 热力图
print("\n创建销售热力图...")
pivot_df = df.pivot_table(values='sales', index='region', columns=df['date'].dt.month, aggfunc='sum')
fig = px.imshow(pivot_df, 
                labels=dict(x="月份", y="地区", color="销售额"),
                x=[f"{i}月" for i in range(1, 13)],
                title="地区销售热力图")
fig.show()

# 3. 3D散点图
print("\n创建3D散点图...")
fig = px.scatter_3d(df, x='sales', y='profit', z=df['date'].dt.month,
                    color='region', size='sales', hover_data=['product'],
                    title="销售、利润与月份关系")
fig.show()

# 4. 瀑布图
print("\n创建瀑布图...")
monthly_profit = df.groupby('date')['profit'].sum().reset_index()
monthly_profit['change'] = monthly_profit['profit'].diff()
monthly_profit.loc[0, 'change'] = monthly_profit.loc[0, 'profit']

fig = go.Figure(go.Waterfall(
    x=monthly_profit['date'].dt.strftime('%Y-%m'),
    y=monthly_profit['change'],
    name="利润变化",
    orientation="v",
    measure=["absolute" if i == 0 else "relative" for i in range(len(monthly_profit))],
    textposition="outside",
    text=[f"{val:.2f}" for val in monthly_profit['change']],
    connector={{"line": {{"color": "rgb(63, 63, 63)"}}}}
))

fig.update_layout(title="月度利润变化瀑布图", showlegend=True)
fig.show()

# 5. 箱线图与小提琴图
print("\n创建箱线图与小提琴图...")
fig = make_subplots(rows=1, cols=2, subplot_titles=('产品销售箱线图', '产品销售小提琴图'))

fig.add_trace(
    go.Box(y=df[df['product'] == 'A']['sales'], name='A'),
    row=1, col=1
)
fig.add_trace(
    go.Box(y=df[df['product'] == 'B']['sales'], name='B'),
    row=1, col=1
)
fig.add_trace(
    go.Box(y=df[df['product'] == 'C']['sales'], name='C'),
    row=1, col=1
)
fig.add_trace(
    go.Box(y=df[df['product'] == 'D']['sales'], name='D'),
    row=1, col=1
)

fig.add_trace(
    go.Violin(y=df[df['product'] == 'A']['sales'], name='A', box_visible=True, meanline_visible=True),
    row=1, col=2
)
fig.add_trace(
    go.Violin(y=df[df['product'] == 'B']['sales'], name='B', box_visible=True, meanline_visible=True),
    row=1, col=2
)
fig.add_trace(
    go.Violin(y=df[df['product'] == 'C']['sales'], name='C', box_visible=True, meanline_visible=True),
    row=1, col=2
)
fig.add_trace(
    go.Violin(y=df[df['product'] == 'D']['sales'], name='D', box_visible=True, meanline_visible=True),
    row=1, col=2
)

fig.update_layout(height=500, width=1000, title_text="产品销售分布")
fig.show()`,
    dataset: {
      date: '2023-01 到 2023-12 的月份',
      region: ['North', 'South', 'East', 'West'],
      product: ['A', 'B', 'C', 'D'],
      sales: '随机生成的销售数据',
      profit: '基于销售额计算的利润数据'
    },
    instructions: '运行代码，观察高级数据可视化图表的效果。',
    learningObjectives: [
      '学习创建多子图仪表盘',
      '掌握热力图的使用方法',
      '了解3D散点图的创建',
      '学习瀑布图和小提琴图的使用',
      '掌握复杂图表的布局和美化技巧'
    ]
  },
  {
    id: '10',
    title: '综合数据分析项目',
    description: '使用pandas进行综合数据分析，包括数据清洗、探索性分析、可视化和结论生成。',
    difficulty: '高级',
    level: 3,
    code: `import pandas as pd
import numpy as np
import plotly.express as px
import plotly.graph_objects as go
from plotly.subplots import make_subplots

# 创建综合数据集
np.random.seed(42)

# 生成日期范围
dates = pd.date_range('2023-01-01', periods=365, freq='D')

# 生成产品数据
products = ['Product A', 'Product B', 'Product C', 'Product D', 'Product E']

# 生成地区数据
regions = ['North', 'South', 'East', 'West', 'Central']

# 生成销售数据
data = []
for date in dates:
    for product in products:
        for region in regions:
            # 基础销售额
            base_sales = np.random.randint(100, 1000)
            
            # 添加季节性因素
            month = date.month
            seasonal_factor = 1.0
            if month in [12, 1, 2]:  # 冬季
                seasonal_factor = 1.2
            elif month in [6, 7, 8]:  # 夏季
                seasonal_factor = 0.8
            
            # 添加产品因素
            product_factor = 1.0
            if product == 'Product A':
                product_factor = 1.5
            elif product == 'Product E':
                product_factor = 0.8
            
            # 添加地区因素
            region_factor = 1.0
            if region == 'North':
                region_factor = 1.3
            elif region == 'South':
                region_factor = 0.9
            
            # 计算最终销售额
            sales = int(base_sales * seasonal_factor * product_factor * region_factor)
            
            # 计算利润（销售额的15-25%）
            profit_margin = np.random.uniform(0.15, 0.25)
            profit = sales * profit_margin
            
            # 生成客户数量
            customers = max(1, int(sales / np.random.randint(50, 200)))
            
            data.append({
                'date': date,
                'product': product,
                'region': region,
                'sales': sales,
                'profit': profit,
                'customers': customers
            })

df = pd.DataFrame(data)

print("原始数据:")
print(df.head())

# 1. 数据概览
print("\n数据概览:")
print(df.info())
print("\n基本统计信息:")
print(df.describe())

# 2. 时间趋势分析
print("\n时间趋势分析...")
monthly_data = df.groupby(pd.Grouper(key='date', freq='M')).agg({
    'sales': 'sum',
    'profit': 'sum',
    'customers': 'sum'
}).reset_index()

fig1 = make_subplots(rows=3, cols=1, subplot_titles=('月度销售额', '月度利润', '月度客户数'))

fig1.add_trace(
    go.Scatter(x=monthly_data['date'], y=monthly_data['sales'], name='销售额'),
    row=1, col=1
)

fig1.add_trace(
    go.Scatter(x=monthly_data['date'], y=monthly_data['profit'], name='利润'),
    row=2, col=1
)

fig1.add_trace(
    go.Scatter(x=monthly_data['date'], y=monthly_data['customers'], name='客户数'),
    row=3, col=1
)

fig1.update_layout(height=800, width=1000, title_text="时间趋势分析")
fig1.show()

# 3. 产品分析
print("\n产品分析...")
product_data = df.groupby('product').agg({
    'sales': 'sum',
    'profit': 'sum',
    'customers': 'sum'
}).reset_index()

fig2 = make_subplots(rows=1, cols=2, subplot_titles=('产品销售额', '产品利润'))

fig2.add_trace(
    go.Bar(x=product_data['product'], y=product_data['sales'], name='销售额'),
    row=1, col=1
)

fig2.add_trace(
    go.Bar(x=product_data['product'], y=product_data['profit'], name='利润'),
    row=1, col=2
)

fig2.update_layout(height=500, width=1000, title_text="产品分析")
fig2.show()

# 4. 地区分析
print("\n地区分析...")
region_data = df.groupby('region').agg({
    'sales': 'sum',
    'profit': 'sum',
    'customers': 'sum'
}).reset_index()

fig3 = px.pie(region_data, values='sales', names='region', title='地区销售占比')
fig3.show()

# 5. 销售漏斗分析
print("\n销售漏斗分析...")
# 计算每个产品的平均客单价
product_avg_order = df.groupby('product').agg({
    'sales': 'sum',
    'customers': 'sum'
}).reset_index()
product_avg_order['avg_order_value'] = product_avg_order['sales'] / product_avg_order['customers']

fig4 = px.bar(product_avg_order, x='product', y='avg_order_value', title='产品平均客单价')
fig4.show()

# 6. 相关性分析
print("\n相关性分析...")
corr_matrix = df[['sales', 'profit', 'customers']].corr()
print("相关性矩阵:")
print(corr_matrix)

fig5 = px.imshow(corr_matrix, title='变量相关性热力图')
fig5.show()

# 7. 结论生成
print("\n分析结论:")
print("1. 销售趋势: 销售额在冬季（12-2月）达到高峰，夏季（6-8月）相对较低。")
print("2. 产品表现: Product A是销售额最高的产品，贡献了大部分收入。")
print("3. 地区表现: North地区的销售额最高，是公司的主要市场。")
print("4. 客户分析: 平均客单价最高的产品是Product A，说明该产品的客户购买力较强。")
print("5. 相关性: 销售额与利润呈强正相关，说明公司的成本控制良好。")
print("6. 建议: 可以考虑在夏季推出促销活动，提高Product E的销售额，开拓South地区的市场。")`,
    dataset: {
      date: '2023-01-01 到 2023-12-31 的日期',
      product: ['Product A', 'Product B', 'Product C', 'Product D', 'Product E'],
      region: ['North', 'South', 'East', 'West', 'Central'],
      sales: '带有季节性、产品和地区因素的销售数据',
      profit: '基于销售额计算的利润数据',
      customers: '生成的客户数量数据'
    },
    instructions: '运行代码，观察综合数据分析的结果和可视化图表。',
    learningObjectives: [
      '掌握综合数据分析的完整流程',
      '学习如何从多角度分析数据',
      '了解如何生成有价值的分析结论',
      '掌握复杂数据可视化的技巧',
      '学习如何将分析结果转化为业务建议'
    ]
  }
]