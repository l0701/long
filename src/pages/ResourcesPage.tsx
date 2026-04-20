import { useState } from 'react'
import { Link } from 'react-router-dom'

const ResourcesPage = () => {
  const [activeTab, setActiveTab] = useState<string>('basics')

  return (
    <div className="container mx-auto px-4 py-8">
      {/* Page Header */}
      <div className="bg-white rounded-lg shadow-md p-6 mb-6">
        <h1 className="text-2xl font-bold text-dark mb-4">学习资源</h1>
        <p className="text-gray-600">
          这里提供了数据分析的基础知识和pandas API参考，帮助你更好地理解和使用pandas进行数据分析。
        </p>
      </div>

      {/* Tabs */}
      <div className="mb-6 border-b">
        <div className="flex space-x-4">
          <button
            className={`px-4 py-2 font-medium transition-colors border-b-2 ${activeTab === 'basics' ? 'border-primary text-primary' : 'border-transparent text-gray-500 hover:text-gray-700'}`}
            onClick={() => setActiveTab('basics')}
          >
            基础知识
          </button>
          <button
            className={`px-4 py-2 font-medium transition-colors border-b-2 ${activeTab === 'api' ? 'border-primary text-primary' : 'border-transparent text-gray-500 hover:text-gray-700'}`}
            onClick={() => setActiveTab('api')}
          >
            pandas API参考
          </button>
        </div>
      </div>

      {/* Tab Content */}
      <div className="bg-white rounded-lg shadow-md p-6">
        {activeTab === 'basics' && (
          <div className="space-y-8">
            <section>
              <h2 className="text-xl font-bold mb-4">数据分析基本概念</h2>
              <div className="space-y-4">
                <div>
                  <h3 className="text-lg font-semibold mb-2">什么是数据分析？</h3>
                  <p className="text-gray-600">
                    数据分析是指使用统计方法和工具对数据进行收集、处理、分析和解释，以发现有价值的信息和 insights。
                    数据分析可以帮助企业做出更明智的决策，识别趋势和模式，以及解决复杂的问题。
                  </p>
                </div>
                <div>
                  <h3 className="text-lg font-semibold mb-2">数据分析的步骤</h3>
                  <ol className="list-decimal list-inside text-gray-600 space-y-2">
                    <li>定义问题和目标</li>
                    <li>收集数据</li>
                    <li>数据清洗和预处理</li>
                    <li>探索性数据分析</li>
                    <li>数据建模和分析</li>
                    <li>结果解释和可视化</li>
                    <li>报告和决策</li>
                  </ol>
                </div>
                <div>
                  <h3 className="text-lg font-semibold mb-2">数据分析工具</h3>
                  <p className="text-gray-600 mb-2">
                    常用的数据分析工具包括：
                  </p>
                  <ul className="list-disc list-inside text-gray-600 space-y-1">
                    <li>Python (pandas, NumPy, matplotlib, scikit-learn)</li>
                    <li>R</li>
                    <li>Excel</li>
                    <li>SQL</li>
                    <li>Tableau, Power BI 等可视化工具</li>
                  </ul>
                </div>
              </div>
            </section>

            <section>
              <h2 className="text-xl font-bold mb-4">pandas 库简介</h2>
              <div className="space-y-4">
                <div>
                  <h3 className="text-lg font-semibold mb-2">什么是 pandas？</h3>
                  <p className="text-gray-600">
                    pandas 是一个开源的 Python 库，专为数据分析和处理而设计。它提供了高性能、易于使用的数据结构和数据分析工具，
                    是数据科学和机器学习领域的重要工具之一。
                  </p>
                </div>
                <div>
                  <h3 className="text-lg font-semibold mb-2">pandas 的核心数据结构</h3>
                  <ul className="list-disc list-inside text-gray-600 space-y-2">
                    <li>
                      <strong>Series</strong>：一维标记数组，可保存任何数据类型
                    </li>
                    <li>
                      <strong>DataFrame</strong>：二维表格数据结构，由 Series 组成
                    </li>
                    <li>
                      <strong>Index</strong>：轴标签
                    </li>
                  </ul>
                </div>
                <div>
                  <h3 className="text-lg font-semibold mb-2">pandas 的主要功能</h3>
                  <ul className="list-disc list-inside text-gray-600 space-y-1">
                    <li>数据读取和写入（支持多种格式：CSV、Excel、JSON、SQL等）</li>
                    <li>数据清洗和预处理</li>
                    <li>数据索引和选择</li>
                    <li>数据分组和聚合</li>
                    <li>数据合并和连接</li>
                    <li>时间序列分析</li>
                    <li>数据可视化</li>
                  </ul>
                </div>
              </div>
            </section>

            <section>
              <h2 className="text-xl font-bold mb-4">Python 基础</h2>
              <div className="space-y-4">
                <div>
                  <h3 className="text-lg font-semibold mb-2">Python 简介</h3>
                  <p className="text-gray-600">
                    Python 是一种高级、通用、解释型编程语言，以其简洁的语法和强大的生态系统而闻名。
                    它是数据科学、机器学习、Web 开发等领域的热门选择。
                  </p>
                </div>
                <div>
                  <h3 className="text-lg font-semibold mb-2">Python 基础语法</h3>
                  <pre className="bg-gray-100 p-4 rounded-md overflow-x-auto text-sm">
                    <code>
{`# 变量赋值
x = 10
y = "Hello"

# 列表
my_list = [1, 2, 3, 4, 5]

# 字典
my_dict = {"name": "Alice", "age": 25}

# 条件语句
if x > 5:
    print("x is greater than 5")
else:
    print("x is less than or equal to 5")

# 循环
for i in range(5):
    print(i)

# 函数
def add(a, b):
    return a + b
`}
                    </code>
                  </pre>
                </div>
              </div>
            </section>
          </div>
        )}

        {activeTab === 'api' && (
          <div className="space-y-8">
            <section>
              <h2 className="text-xl font-bold mb-4">pandas 常用 API</h2>
              <div className="space-y-6">
                <div>
                  <h3 className="text-lg font-semibold mb-3">数据读取与写入</h3>
                  <div className="space-y-3">
                    <div>
                      <code className="bg-gray-100 px-2 py-1 rounded text-sm font-medium">pd.read_csv()</code>
                      <p className="text-gray-600 mt-1">从 CSV 文件读取数据</p>
                    </div>
                    <div>
                      <code className="bg-gray-100 px-2 py-1 rounded text-sm font-medium">pd.read_excel()</code>
                      <p className="text-gray-600 mt-1">从 Excel 文件读取数据</p>
                    </div>
                    <div>
                      <code className="bg-gray-100 px-2 py-1 rounded text-sm font-medium">pd.read_json()</code>
                      <p className="text-gray-600 mt-1">从 JSON 文件读取数据</p>
                    </div>
                    <div>
                      <code className="bg-gray-100 px-2 py-1 rounded text-sm font-medium">df.to_csv()</code>
                      <p className="text-gray-600 mt-1">将数据写入 CSV 文件</p>
                    </div>
                    <div>
                      <code className="bg-gray-100 px-2 py-1 rounded text-sm font-medium">df.to_excel()</code>
                      <p className="text-gray-600 mt-1">将数据写入 Excel 文件</p>
                    </div>
                  </div>
                </div>

                <div>
                  <h3 className="text-lg font-semibold mb-3">数据查看与选择</h3>
                  <div className="space-y-3">
                    <div>
                      <code className="bg-gray-100 px-2 py-1 rounded text-sm font-medium">df.head()</code>
                      <p className="text-gray-600 mt-1">查看数据前几行</p>
                    </div>
                    <div>
                      <code className="bg-gray-100 px-2 py-1 rounded text-sm font-medium">df.tail()</code>
                      <p className="text-gray-600 mt-1">查看数据后几行</p>
                    </div>
                    <div>
                      <code className="bg-gray-100 px-2 py-1 rounded text-sm font-medium">df.info()</code>
                      <p className="text-gray-600 mt-1">查看数据基本信息</p>
                    </div>
                    <div>
                      <code className="bg-gray-100 px-2 py-1 rounded text-sm font-medium">df.describe()</code>
                      <p className="text-gray-600 mt-1">查看数据统计信息</p>
                    </div>
                    <div>
                      <code className="bg-gray-100 px-2 py-1 rounded text-sm font-medium">df.loc[]</code>
                      <p className="text-gray-600 mt-1">按标签选择行和列</p>
                    </div>
                    <div>
                      <code className="bg-gray-100 px-2 py-1 rounded text-sm font-medium">df.iloc[]</code>
                      <p className="text-gray-600 mt-1">按位置选择行和列</p>
                    </div>
                  </div>
                </div>

                <div>
                  <h3 className="text-lg font-semibold mb-3">数据清洗与预处理</h3>
                  <div className="space-y-3">
                    <div>
                      <code className="bg-gray-100 px-2 py-1 rounded text-sm font-medium">df.isnull()</code>
                      <p className="text-gray-600 mt-1">检查缺失值</p>
                    </div>
                    <div>
                      <code className="bg-gray-100 px-2 py-1 rounded text-sm font-medium">df.fillna()</code>
                      <p className="text-gray-600 mt-1">填充缺失值</p>
                    </div>
                    <div>
                      <code className="bg-gray-100 px-2 py-1 rounded text-sm font-medium">df.dropna()</code>
                      <p className="text-gray-600 mt-1">删除缺失值</p>
                    </div>
                    <div>
                      <code className="bg-gray-100 px-2 py-1 rounded text-sm font-medium">df.drop_duplicates()</code>
                      <p className="text-gray-600 mt-1">删除重复值</p>
                    </div>
                    <div>
                      <code className="bg-gray-100 px-2 py-1 rounded text-sm font-medium">df.astype()</code>
                      <p className="text-gray-600 mt-1">数据类型转换</p>
                    </div>
                  </div>
                </div>

                <div>
                  <h3 className="text-lg font-semibold mb-3">数据分组与聚合</h3>
                  <div className="space-y-3">
                    <div>
                      <code className="bg-gray-100 px-2 py-1 rounded text-sm font-medium">df.groupby()</code>
                      <p className="text-gray-600 mt-1">按列分组</p>
                    </div>
                    <div>
                      <code className="bg-gray-100 px-2 py-1 rounded text-sm font-medium">df.agg()</code>
                      <p className="text-gray-600 mt-1">聚合函数</p>
                    </div>
                    <div>
                      <code className="bg-gray-100 px-2 py-1 rounded text-sm font-medium">df.transform()</code>
                      <p className="text-gray-600 mt-1">转换函数</p>
                    </div>
                    <div>
                      <code className="bg-gray-100 px-2 py-1 rounded text-sm font-medium">df.filter()</code>
                      <p className="text-gray-600 mt-1">过滤数据</p>
                    </div>
                  </div>
                </div>

                <div>
                  <h3 className="text-lg font-semibold mb-3">数据合并与连接</h3>
                  <div className="space-y-3">
                    <div>
                      <code className="bg-gray-100 px-2 py-1 rounded text-sm font-medium">pd.merge()</code>
                      <p className="text-gray-600 mt-1">合并两个 DataFrame</p>
                    </div>
                    <div>
                      <code className="bg-gray-100 px-2 py-1 rounded text-sm font-medium">df.join()</code>
                      <p className="text-gray-600 mt-1">连接两个 DataFrame</p>
                    </div>
                    <div>
                      <code className="bg-gray-100 px-2 py-1 rounded text-sm font-medium">pd.concat()</code>
                      <p className="text-gray-600 mt-1"> concatenate DataFrames</p>
                    </div>
                  </div>
                </div>

                <div>
                  <h3 className="text-lg font-semibold mb-3">时间序列分析</h3>
                  <div className="space-y-3">
                    <div>
                      <code className="bg-gray-100 px-2 py-1 rounded text-sm font-medium">pd.date_range()</code>
                      <p className="text-gray-600 mt-1">创建日期范围</p>
                    </div>
                    <div>
                      <code className="bg-gray-100 px-2 py-1 rounded text-sm font-medium">df.resample()</code>
                      <p className="text-gray-600 mt-1">重采样时间序列数据</p>
                    </div>
                    <div>
                      <code className="bg-gray-100 px-2 py-1 rounded text-sm font-medium">df.rolling()</code>
                      <p className="text-gray-600 mt-1">滚动窗口计算</p>
                    </div>
                    <div>
                      <code className="bg-gray-100 px-2 py-1 rounded text-sm font-medium">df.diff()</code>
                      <p className="text-gray-600 mt-1">计算差分</p>
                    </div>
                  </div>
                </div>
              </div>
            </section>

            <section>
              <h2 className="text-xl font-bold mb-4">更多资源</h2>
              <ul className="list-disc list-inside text-gray-600 space-y-2">
                <li>
                  <a href="https://pandas.pydata.org/docs/" target="_blank" rel="noopener noreferrer" className="text-primary hover:underline">
                    pandas 官方文档
                  </a>
                </li>
                <li>
                  <a href="https://numpy.org/doc/stable/" target="_blank" rel="noopener noreferrer" className="text-primary hover:underline">
                    NumPy 官方文档
                  </a>
                </li>
                <li>
                  <a href="https://matplotlib.org/stable/contents.html" target="_blank" rel="noopener noreferrer" className="text-primary hover:underline">
                    Matplotlib 官方文档
                  </a>
                </li>
                <li>
                  <a href="https://plotly.com/python/" target="_blank" rel="noopener noreferrer" className="text-primary hover:underline">
                    Plotly 官方文档
                  </a>
                </li>
                <li>
                  <a href="https://www.python.org/doc/" target="_blank" rel="noopener noreferrer" className="text-primary hover:underline">
                    Python 官方文档
                  </a>
                </li>
              </ul>
            </section>
          </div>
        )}
      </div>

      {/* Back to Home */}
      <div className="mt-8 flex justify-center">
        <Link to="/" className="bg-primary text-white px-4 py-2 rounded-md font-medium hover:bg-blue-700 transition-colors">
          返回首页
        </Link>
      </div>
    </div>
  )
}

export default ResourcesPage