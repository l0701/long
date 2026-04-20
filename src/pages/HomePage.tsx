import { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import { projects } from '../data/projects'

const HomePage = () => {
  const [activeLevel, setActiveLevel] = useState<string>('all')
  const [isVisible, setIsVisible] = useState(false)

  useEffect(() => {
    setIsVisible(true)
  }, [])

  const filteredProjects = activeLevel === 'all' 
    ? projects 
    : projects.filter(project => 
        (activeLevel === 'beginner' && project.level === 1) ||
        (activeLevel === 'intermediate' && project.level === 2) ||
        (activeLevel === 'advanced' && project.level === 3)
      )

  return (
    <div className="container mx-auto px-4 py-8">
      {/* Hero Section */}
      <div className={`bg-gradient-to-r from-primary to-blue-700 text-white rounded-2xl p-12 mb-12 shadow-xl fade-in ${isVisible ? 'opacity-100' : 'opacity-0'}`} style={{ animationDelay: '0.1s' }}>
        <div className="max-w-3xl mx-auto text-center">
          <h1 className="text-4xl md:text-5xl font-bold mb-6">Pandas数据分析训练项目</h1>
          <p className="text-xl mb-8 opacity-90">
            从入门到进阶的10个精选实战项目，完全在浏览器中运行代码，让人从零开始掌握数据分析核心技能。
          </p>
          <div className="flex flex-wrap gap-4 justify-center">
            <Link to="/project/1" className="btn-primary bg-white text-primary px-6 py-3 rounded-md font-medium hover:bg-blue-50 transition-colors shadow-lg">
              开始学习
            </Link>
            <Link to="/resources" className="bg-transparent border-2 border-white text-white px-6 py-3 rounded-md font-medium hover:bg-white hover:text-primary transition-colors shadow-lg">
              学习资源
            </Link>
            <Link to="/quiz" className="bg-white/20 backdrop-blur-sm text-white border border-white/30 px-6 py-3 rounded-md font-medium hover:bg-white/30 transition-colors shadow-lg">
              知识测试
            </Link>
          </div>
        </div>
      </div>

      {/* Features Section */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-12">
        <div className="bg-white rounded-xl p-6 shadow-md card-hover fade-in" style={{ animationDelay: '0.3s' }}>
          <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center mb-4">
            <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8 text-primary" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 3v2m6-2v2M9 19v2m6-2v2M5 9H3m2 6H3m18-6h-2m2 6h-2M7 19h10a2 2 0 002-2V7a2 2 0 00-2-2H7a2 2 0 00-2 2v10a2 2 0 002 2zM9 9h6v6H9V9z" />
            </svg>
          </div>
          <h3 className="text-xl font-bold mb-3">完全在浏览器中运行</h3>
          <p className="text-gray-600">无需安装Python环境，直接在浏览器中编写和执行pandas代码，随时随地学习。</p>
        </div>
        <div className="bg-white rounded-xl p-6 shadow-md card-hover fade-in" style={{ animationDelay: '0.4s' }}>
          <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center mb-4">
            <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8 text-primary" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2" />
            </svg>
          </div>
          <h3 className="text-xl font-bold mb-3">10个精选实战项目</h3>
          <p className="text-gray-600">从入门到进阶，覆盖数据分析的核心概念和技术，循序渐进地提升你的技能。</p>
        </div>
        <div className="bg-white rounded-xl p-6 shadow-md card-hover fade-in" style={{ animationDelay: '0.5s' }}>
          <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center mb-4">
            <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8 text-primary" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
            </svg>
          </div>
          <h3 className="text-xl font-bold mb-3">交互式学习体验</h3>
          <p className="text-gray-600">内置代码编辑器，支持实时运行和查看结果，提供即时反馈，增强学习效果。</p>
        </div>
      </div>

      {/* Filter Tabs */}
      <div className="mb-8 fade-in" style={{ animationDelay: '0.6s' }}>
        <h2 className="text-2xl font-bold mb-4">实战项目</h2>
        <div className="flex flex-wrap gap-3">
          <button
            className={`px-5 py-2 rounded-full font-medium transition-colors ${activeLevel === 'all' ? 'bg-primary text-white shadow-md' : 'bg-white text-dark hover:bg-blue-50 shadow-sm'}`}
            onClick={() => setActiveLevel('all')}
          >
            全部
          </button>
          <button
            className={`px-5 py-2 rounded-full font-medium transition-colors ${activeLevel === 'beginner' ? 'bg-primary text-white shadow-md' : 'bg-white text-dark hover:bg-blue-50 shadow-sm'}`}
            onClick={() => setActiveLevel('beginner')}
          >
            入门
          </button>
          <button
            className={`px-5 py-2 rounded-full font-medium transition-colors ${activeLevel === 'intermediate' ? 'bg-primary text-white shadow-md' : 'bg-white text-dark hover:bg-blue-50 shadow-sm'}`}
            onClick={() => setActiveLevel('intermediate')}
          >
            中级
          </button>
          <button
            className={`px-5 py-2 rounded-full font-medium transition-colors ${activeLevel === 'advanced' ? 'bg-primary text-white shadow-md' : 'bg-white text-dark hover:bg-blue-50 shadow-sm'}`}
            onClick={() => setActiveLevel('advanced')}
          >
            高级
          </button>
        </div>
      </div>

      {/* Project Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {filteredProjects.map((project, index) => (
          <div 
            key={project.id} 
            className="bg-white rounded-xl shadow-md overflow-hidden card-hover fade-in" 
            style={{ animationDelay: `${0.7 + index * 0.1}s` }}
          >
            <div className="h-2 bg-gradient-to-r from-primary to-blue-600"></div>
            <div className="p-6">
              <div className="flex justify-between items-center mb-4">
                <h3 className="text-xl font-bold text-dark">{project.title}</h3>
                <span className={`px-3 py-1 rounded-full text-xs font-medium ${project.level === 1 ? 'bg-green-100 text-green-800' : project.level === 2 ? 'bg-yellow-100 text-yellow-800' : 'bg-red-100 text-red-800'}`}>
                  {project.difficulty}
                </span>
              </div>
              <p className="text-gray-600 mb-6">{project.description}</p>
              <div className="flex justify-between items-center">
                <div className="flex items-center text-sm text-gray-500">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 mr-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6V4m0 2a2 2 0 100 4m0-4a2 2 0 110 4m-6 8a2 2 0 100-4m0 4a2 2 0 110-4m0 4v2m0-6V4m6 6v10m6-2a2 2 0 100-4m0 4a2 2 0 110-4m0 4v2m0-6V4" />
                  </svg>
                  {project.learningObjectives.length} 个学习目标
                </div>
                <Link to={`/project/${project.id}`} className="btn-primary bg-primary text-white px-4 py-2 rounded-md font-medium hover:bg-blue-700 transition-colors">
                  开始项目
                </Link>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* CTA Section */}
      <div className="mt-16 bg-gradient-to-r from-blue-600 to-blue-800 rounded-2xl p-10 text-white shadow-xl fade-in" style={{ animationDelay: '1s' }}>
        <div className="max-w-3xl mx-auto text-center">
          <h2 className="text-3xl font-bold mb-4">准备好开始你的数据分析之旅了吗？</h2>
          <p className="text-lg mb-8 opacity-90">
            通过实践项目学习pandas，掌握数据分析的核心技能，开启你的数据科学之路。
          </p>
          <Link to="/project/1" className="inline-block btn-primary bg-white text-primary px-8 py-3 rounded-md font-medium hover:bg-blue-50 transition-colors shadow-lg">
            立即开始
          </Link>
        </div>
      </div>
    </div>
  )
}

export default HomePage