import { useState, useEffect, useRef } from 'react'
import { useParams, Link } from 'react-router-dom'
import Editor from '@monaco-editor/react'
import { projects } from '../data/projects'

const ProjectPage = () => {
  const { id } = useParams<{ id: string }>()
  const [project, setProject] = useState<any>(null)
  const [code, setCode] = useState('')
  const [output, setOutput] = useState('')
  const [isLoading, setIsLoading] = useState(false)
  const [pyodide, setPyodide] = useState<any>(null)
  const outputRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    if (id) {
      const foundProject = projects.find(p => p.id === id)
      if (foundProject) {
        setProject(foundProject)
        setCode(foundProject.code)
      }
    }
  }, [id])

  useEffect(() => {
    // 加载Pyodide
    const loadPyodide = async () => {
      try {
        const pyodideModule = await import('pyodide')
        const pyodideInstance = await pyodideModule.loadPyodide({
          indexURL: "https://cdn.jsdelivr.net/pyodide/v0.25.1/full/"
        })
        setPyodide(pyodideInstance)
        
        // 安装pandas和其他必要的包
        await pyodideInstance.loadPackage(['pandas', 'numpy', 'matplotlib'])
      } catch (error) {
        console.error('Failed to load Pyodide:', error)
        setOutput('加载Pyodide失败，请刷新页面重试。')
      }
    }

    loadPyodide()
  }, [])

  const runCode = async () => {
    if (!pyodide) {
      setOutput('Pyodide还未加载完成，请稍候。')
      return
    }

    setIsLoading(true)
    setOutput('')

    try {
      // 重定向stdout到输出
      pyodide.globals.set('console', {
        log: (...args: any[]) => {
          setOutput(prev => prev + args.map(arg => String(arg)).join(' ') + '\n')
        }
      })

      // 执行代码
      await pyodide.runPythonAsync(code)
    } catch (error) {
      setOutput(prev => prev + `错误: ${String(error)}\n`)
    } finally {
      setIsLoading(false)
      // 滚动到输出底部
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
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
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
      </div>

      {/* Code Editor and Output */}
      <div className="bg-white rounded-xl shadow-md p-8 mb-8 fade-in" style={{ animationDelay: '0.3s' }}>
        <div className="flex flex-wrap justify-between items-center mb-6">
          <h2 className="text-xl font-bold text-dark">代码编辑器</h2>
          <button
            onClick={runCode}
            disabled={isLoading || !pyodide}
            className={`btn-primary px-6 py-3 rounded-md font-medium transition-colors ${isLoading || !pyodide ? 'bg-gray-400 text-white cursor-not-allowed' : 'bg-primary text-white hover:bg-blue-700'}`}
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
              <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-2 text-gray-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
              </svg>
              <h3 className="font-medium text-gray-700">运行结果</h3>
            </div>
            <div 
              ref={outputRef}
              className="flex-1 p-4 overflow-auto bg-gray-50 font-mono text-sm"
              style={{ height: '552px' }}
            >
              {output || (
                <div className="text-gray-400 italic">运行代码查看结果...</div>
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