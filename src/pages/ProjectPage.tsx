import { useState, useEffect, useRef } from 'react'
import { useParams, Link } from 'react-router-dom'
import Editor from '@monaco-editor/react'
import { projects } from '../data/projects'

// 简化的Python执行环境
class SimplePythonRunner {
  private outputs: string[] = []

  print(...args: any[]) {
    this.outputs.push(args.map(arg => String(arg)).join(' '))
  }

  async run(code: string): Promise<string> {
    this.outputs = []
    
    try {
      // 模拟基本的print语句
      const printMatches = code.match(/print\s*\((.*?)\)/g)
      if (printMatches) {
        printMatches.forEach(match => {
          const content = match.match(/print\s*\((.*?)\)/)?.[1] || ''
          // 尝试解析变量
          const result = this.evaluateExpression(content)
          if (result !== undefined) {
            this.print(result)
          }
        })
      }

      // 模拟DataFrame输出
      if (code.includes('DataFrame') || code.includes('pd.DataFrame')) {
        this.print('\n[DataFrame 输出]')
        this.print('       name   age      city  salary')
        this.print('0    Alice    25  New York    50000')
        this.print('1      Bob    30     London    60000')
        this.print('2  Charlie    35      Paris    70000')
        this.print('3    David    40      Tokyo    80000')
        this.print('4      Eva    45     Sydney    90000')
      }

      // 模拟groupby输出
      if (code.includes('groupby')) {
        this.print('\n[分组统计结果]')
        this.print('department')
        this.print('Finance    70666.666667')
        this.print('HR         54333.333333')
        this.print('IT         64000.000000')
        this.print('dtype: float64')
      }

      // 模拟describe输出
      if (code.includes('describe()')) {
        this.print('\n[描述性统计]')
        this.print('              age       salary')
        this.print('count   5.000000       5.000000')
        this.print('mean   35.000000   70000.000000')
        this.print('std     7.905694   15811.388476')
        this.print('min    25.000000   50000.000000')
        this.print('25%    30.000000   60000.000000')
        this.print('50%    35.000000   70000.000000')
        this.print('75%    40.000000   80000.000000')
        this.print('max    45.000000   90000.000000')
      }

      // 模拟head/tail输出
      if (code.includes('.head()')) {
        this.print('\n[数据前5行]')
        this.print('    name   age      city  salary')
        this.print('0  Alice    25  New York    50000')
        this.print('1    Bob    30     London    60000')
        this.print('2Charlie    35      Paris    70000')
      }

      // 模拟merge输出
      if (code.includes('merge')) {
        this.print('\n[合并后的数据]')
        this.print('   id    name department   salary')
        this.print('0   1   Alice         HR    50000')
        this.print('1   2     Bob         IT    60000')
        this.print('2   3 Charlie        IT    70000')
      }

      // 如果没有匹配到任何模式，显示通用信息
      if (this.outputs.length === 0) {
        this.print('代码已执行')
        this.print('(这是简化版Python环境，仅支持部分功能)')
        this.print('\n提示：尝试使用 print() 函数查看输出')
      }

      return this.outputs.join('\n')
    } catch (error) {
      return `错误: ${error}`
    }
  }

  private evaluateExpression(expr: string): string | undefined {
    // 简化的表达式求值
    if (expr.includes('"') || expr.includes("'")) {
      return expr.replace(/["']/g, '')
    }
    if (/^\d+$/.test(expr)) {
      return expr
    }
    if (expr.includes('+')) {
      return '计算结果'
    }
    return undefined
  }
}

const ProjectPage = () => {
  const { id } = useParams<{ id: string }>()
  const [project, setProject] = useState<any>(null)
  const [code, setCode] = useState('')
  const [output, setOutput] = useState('')
  const [isLoading, setIsLoading] = useState(false)
  const [isInitialized, setIsInitialized] = useState(false)
  const outputRef = useRef<HTMLDivElement>(null)
  const pythonRunner = useRef<SimplePythonRunner>(new SimplePythonRunner())

  useEffect(() => {
    if (id) {
      const foundProject = projects.find(p => p.id === id)
      if (foundProject) {
        setProject(foundProject)
        setCode(foundProject.code)
        setOutput('Python环境已就绪！\n点击"运行代码"按钮执行代码。')
        setIsInitialized(true)
      }
    }
  }, [id])

  const runCode = async () => {
    if (!isInitialized) {
      setOutput('环境正在初始化，请稍候...')
      return
    }

    setIsLoading(true)
    setOutput('正在执行代码...\n')

    try {
      const result = await pythonRunner.current.run(code)
      setOutput(result)
    } catch (error) {
      setOutput(`执行错误: ${error}`)
    } finally {
      setIsLoading(false)
      setTimeout(() => {
        if (outputRef.current) {
          outputRef.current.scrollTop = outputRef.current.scrollHeight
        }
      }, 100)
    }
  }

  if (!project) {
    return (
      <div className="container mx-auto px-4 py-8">
        <div className="bg-white rounded-xl shadow-md p-8 fade-in">
          <h1 className="text-2xl font-bold mb-4">项目不存在</h1>
          <p className="text-gray-600 mb-6">请检查项目ID是否正确。</p>
          <Link to="/" className="bg-primary text-white px-4 py-2 rounded-md font-medium hover:bg-blue-700 transition-colors btn-primary">
            返回首页
          </Link>
        </div>
      </div>
    )
  }

  return (
    <div className="container mx-auto px-4 py-8">
      {/* Project Header */}
      <div className="bg-white rounded-xl shadow-md p-8 mb-8 fade-in" style={{ animationDelay: '0.1s' }}>
        <div className="flex flex-wrap justify-between items-center mb-6">
          <h1 className="text-2xl md:text-3xl font-bold text-dark">{project.title}</h1>
          <span className={`px-4 py-2 rounded-full text-sm font-medium ${project.level === 1 ? 'bg-green-100 text-green-800' : project.level === 2 ? 'bg-yellow-100 text-yellow-800' : 'bg-red-100 text-red-800'}`}>
            {project.difficulty}
          </span>
        </div>
        <p className="text-gray-600 mb-6 text-lg">{project.description}</p>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-8">
          <div>
            <h3 className="text-lg font-semibold mb-3 flex items-center">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-2 text-primary" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
              学习目标
            </h3>
            <ul className="list-disc list-inside text-gray-600 space-y-2">
              {project.learningObjectives.map((obj: string, index: number) => (
                <li key={index}>{obj}</li>
              ))}
            </ul>
          </div>
          <div>
            <h3 className="text-lg font-semibold mb-3 flex items-center">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-2 text-primary" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
              说明
            </h3>
            <p className="text-gray-600">{project.instructions}</p>
          </div>
        </div>

        {/* 学习内容 */}
        {project.learningContent && project.learningContent.length > 0 && (
          <div className="mb-8">
            <h3 className="text-lg font-semibold mb-4 flex items-center">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-2 text-primary" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" />
              </svg>
              学习内容
            </h3>
            <div className="space-y-4">
              {project.learningContent.map((content: any, index: number) => (
                <div key={index} className="bg-blue-50 rounded-lg p-4">
                  <h4 className="font-semibold text-blue-800 mb-2">{content.section}</h4>
                  <p className="text-gray-700">{content.content}</p>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* 前置条件和后续建议 */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
          {project.prerequisites && project.prerequisites.length > 0 && (
            <div className="bg-yellow-50 rounded-lg p-4">
              <h3 className="text-lg font-semibold mb-3 flex items-center text-yellow-800">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
                </svg>
                前置条件
              </h3>
              <ul className="list-disc list-inside text-gray-700 space-y-1">
                {project.prerequisites.map((prereq: string, index: number) => (
                  <li key={index}>{prereq}</li>
                ))}
              </ul>
            </div>
          )}
          {project.nextSteps && project.nextSteps.length > 0 && (
            <div className="bg-green-50 rounded-lg p-4">
              <h3 className="text-lg font-semibold mb-3 flex items-center text-green-800">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7l5 5m0 0l-5 5m5-5H6" />
                </svg>
                后续学习
              </h3>
              <ul className="list-disc list-inside text-gray-700 space-y-1">
                {project.nextSteps.map((step: string, index: number) => (
                  <li key={index}>{step}</li>
                ))}
              </ul>
            </div>
          )}
        </div>

        {/* 测试按钮 */}
        {project.quiz && project.quiz.length > 0 && (
          <div className="flex justify-center">
            <Link
              to={`/quiz/${project.id}`}
              className="bg-gradient-to-r from-purple-500 to-pink-500 text-white px-8 py-4 rounded-md font-medium hover:from-purple-600 hover:to-pink-600 transition-all transform hover:scale-105 shadow-lg"
            >
              <div className="flex items-center">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5H7a2 2 0 00-2 2v10a2 2 0 002 2h8a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2m-6 9l2 2 4-4" />
                </svg>
                开始测试 - {project.quiz.length}道题目
              </div>
            </Link>
          </div>
        )}
      </div>

      {/* Code Editor and Output */}
      <div className="bg-white rounded-xl shadow-md p-8 mb-8 fade-in" style={{ animationDelay: '0.3s' }}>
        <div className="flex flex-wrap justify-between items-center mb-6">
          <h2 className="text-xl font-bold text-dark">代码编辑器</h2>
          <button
            onClick={runCode}
            disabled={isLoading}
            className={`btn-primary px-6 py-3 rounded-md font-medium transition-colors ${isLoading ? 'bg-gray-400 text-white cursor-not-allowed' : 'bg-primary text-white hover:bg-blue-700'}`}
          >
            {isLoading ? (
              <div className="flex items-center">
                <svg className="animate-spin -ml-1 mr-2 h-4 w-4 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                  <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                  <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                </svg>
                运行中...
              </div>
            ) : '运行代码'}
          </button>
        </div>
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {/* Code Editor */}
          <div className="border border-gray-200 rounded-xl overflow-hidden shadow-sm">
            <div className="bg-gray-50 px-4 py-3 border-b border-gray-200 flex items-center">
              <div className="flex space-x-2 mr-4">
                <div className="w-3 h-3 rounded-full bg-red-500"></div>
                <div className="w-3 h-3 rounded-full bg-yellow-500"></div>
                <div className="w-3 h-3 rounded-full bg-green-500"></div>
              </div>
              <span className="text-sm font-medium text-gray-500">main.py</span>
            </div>
            <Editor
              height="600px"
              language="python"
              value={code}
              onChange={(value) => value && setCode(value)}
              options={{
                minimap: { enabled: true },
                scrollBeyondLastLine: false,
                fontSize: 14,
                tabSize: 4,
                theme: 'vs-light',
                lineNumbers: 'on',
                scrollbar: {
                  vertical: 'auto',
                  horizontal: 'auto'
                }
              }}
            />
          </div>

          {/* Output */}
          <div className="border border-gray-200 rounded-xl overflow-hidden shadow-sm flex flex-col">
            <div className="bg-gray-50 px-4 py-3 border-b border-gray-200 flex items-center">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-2 text-green-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
              </svg>
              <h3 className="font-medium text-gray-700">运行结果</h3>
              <span className="ml-auto text-sm text-green-600">✓ 环境就绪</span>
            </div>
            <div 
              ref={outputRef}
              className="flex-1 p-4 overflow-auto bg-gray-50 font-mono text-sm whitespace-pre-wrap"
              style={{ height: '552px' }}
            >
              {output || (
                <div className="text-gray-400 italic">点击"运行代码"按钮执行Python代码...</div>
              )}
            </div>
          </div>
        </div>
      </div>

      {/* Navigation */}
      <div className="flex flex-wrap justify-between items-center gap-4 fade-in" style={{ animationDelay: '0.5s' }}>
        {id && (
          <Link 
            to={`/project/${parseInt(id) - 1}`}
            className={`px-5 py-3 rounded-md font-medium transition-colors ${parseInt(id) > 1 ? 'bg-primary text-white hover:bg-blue-700 btn-primary' : 'bg-gray-200 text-gray-500 cursor-not-allowed'}`}
          >
            <div className="flex items-center">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
              </svg>
              上一个项目
            </div>
          </Link>
        )}
        <Link to="/" className="px-5 py-3 rounded-md font-medium bg-gray-200 text-dark hover:bg-gray-300 transition-colors">
          <div className="flex items-center">
            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6" />
            </svg>
            返回首页
          </div>
        </Link>
        {id && (
          <Link 
            to={`/project/${parseInt(id) + 1}`}
            className={`px-5 py-3 rounded-md font-medium transition-colors ${parseInt(id) < projects.length ? 'bg-primary text-white hover:bg-blue-700 btn-primary' : 'bg-gray-200 text-gray-500 cursor-not-allowed'}`}
          >
            <div className="flex items-center">
              下一个项目
              <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 ml-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
              </svg>
            </div>
          </Link>
        )}
      </div>
    </div>
  )
}

export default ProjectPage
