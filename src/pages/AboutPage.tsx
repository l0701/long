import { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import { projects } from '../data/projects'

const AboutPage = () => {
  const [isVisible, setIsVisible] = useState(false)

  useEffect(() => {
    setIsVisible(true)
  }, [])

  return (
    <div className="container mx-auto px-4 py-8">
      {/* Hero Section */}
      <div className={`bg-gradient-to-r from-blue-600 to-purple-700 text-white rounded-2xl p-12 mb-12 shadow-xl fade-in ${isVisible ? 'opacity-100' : 'opacity-0'}`} style={{ animationDelay: '0.1s' }}>
        <div className="max-w-4xl mx-auto text-center">
          <h1 className="text-4xl md:text-5xl font-bold mb-4">龙奕羽</h1>
          <p className="text-xl opacity-90 mb-6">
            广东科学技术职业学院商学院<br/>
            商务数据分析与应用专业
          </p>
          <div className="flex flex-wrap gap-4 justify-center">
            <Link to="/#courses" className="bg-white text-blue-600 px-6 py-3 rounded-md font-medium hover:bg-blue-50 transition-colors shadow-lg">
              浏览课程
            </Link>
            <Link to="/#about" className="bg-transparent border-2 border-white text-white px-6 py-3 rounded-md font-medium hover:bg-white hover:text-blue-600 transition-colors shadow-lg">
              了解更多
            </Link>
            <Link to="/" className="bg-white/20 backdrop-blur-sm text-white border border-white/30 px-6 py-3 rounded-md font-medium hover:bg-white/30 transition-colors shadow-lg">
              开始学习
            </Link>
          </div>
        </div>
      </div>

      {/* Courses Section */}
      <div id="courses" className="mb-12">
        <h2 className="text-3xl font-bold mb-8 text-center">我的学习课程</h2>
        <p className="text-center text-gray-600 mb-8">探索我在商务数据分析与应用专业的学习内容，掌握现代数据分析技能</p>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          <div className="bg-white rounded-xl p-6 shadow-md card-hover fade-in" style={{ animationDelay: '0.2s' }}>
            <div className="text-4xl mb-4">🐍</div>
            <h3 className="text-xl font-bold mb-2">Python基础</h3>
            <p className="text-gray-600 mb-4">学习Python编程语言的基础知识，包括语法、数据类型、函数、模块等。</p>
            <Link to="/project/1" className="text-blue-600 hover:text-blue-700 font-medium">
              查看详情 →
            </Link>
          </div>

          <div className="bg-white rounded-xl p-6 shadow-md card-hover fade-in" style={{ animationDelay: '0.3s' }}>
            <div className="text-4xl mb-4">📊</div>
            <h3 className="text-xl font-bold mb-2">数据分析技术</h3>
            <p className="text-gray-600 mb-4">掌握数据分析的基本方法和工具，包括数据可视化、统计分析等。</p>
            <Link to="/project/3" className="text-blue-600 hover:text-blue-700 font-medium">
              查看详情 →
            </Link>
          </div>

          <div className="bg-white rounded-xl p-6 shadow-md card-hover fade-in" style={{ animationDelay: '0.4s' }}>
            <div className="text-4xl mb-4">🔍</div>
            <h3 className="text-xl font-bold mb-2">数据采集与处理</h3>
            <p className="text-gray-600 mb-4">学习如何从各种来源采集数据，并进行清洗、转换和预处理。</p>
            <Link to="/project/2" className="text-blue-600 hover:text-blue-700 font-medium">
              查看详情 →
            </Link>
          </div>

          <div className="bg-white rounded-xl p-6 shadow-md card-hover fade-in" style={{ animationDelay: '0.5s' }}>
            <div className="text-4xl mb-4">📦</div>
            <h3 className="text-xl font-bold mb-2">供应链数据分析</h3>
            <p className="text-gray-600 mb-4">应用数据分析技术解决供应链管理中的问题，优化供应链流程。</p>
            <Link to="/project/10" className="text-blue-600 hover:text-blue-700 font-medium">
              查看详情 →
            </Link>
          </div>

          <div className="bg-white rounded-xl p-6 shadow-md card-hover fade-in" style={{ animationDelay: '0.6s' }}>
            <div className="text-4xl mb-4">💾</div>
            <h3 className="text-xl font-bold mb-2">数据库原理与应用</h3>
            <p className="text-gray-600 mb-4">了解数据库的基本原理，掌握SQL语言和数据库设计方法。</p>
            <Link to="/project/5" className="text-blue-600 hover:text-blue-700 font-medium">
              查看详情 →
            </Link>
          </div>

          <div className="bg-white rounded-xl p-6 shadow-md card-hover fade-in" style={{ animationDelay: '0.7s' }}>
            <div className="text-4xl mb-4">📈</div>
            <h3 className="text-xl font-bold mb-2">数据可视化</h3>
            <p className="text-gray-600 mb-4">学习使用图表和可视化工具展示数据分析结果，让数据说话。</p>
            <Link to="/project/7" className="text-blue-600 hover:text-blue-700 font-medium">
              查看详情 →
            </Link>
          </div>
        </div>
      </div>

      {/* About Section */}
      <div id="about" className="bg-white rounded-xl shadow-md p-8 mb-12 fade-in" style={{ animationDelay: '0.8s' }}>
        <h2 className="text-3xl font-bold mb-8 text-center">关于我</h2>
        <p className="text-center text-gray-600 mb-8">了解我的专业背景和技能，探索我的学习 journey</p>
        
        {/* Personal Introduction */}
        <div className="mb-8">
          <h3 className="text-2xl font-bold mb-4 text-blue-600">个人简介</h3>
          <div className="bg-blue-50 rounded-lg p-6">
            <p className="text-gray-700 leading-relaxed mb-4">
              我是广东科学技术职业学院商学院商务数据分析与应用专业的学生龙奕羽。我对数据分析和商业智能充满热情，致力于通过数据驱动的方法解决实际商业问题。
            </p>
            <p className="text-gray-700 leading-relaxed mb-4">
              在校期间，我系统学习了数据分析相关课程，掌握了多种数据分析工具和技术，包括Python编程、数据可视化、数据库管理等。我希望通过不断学习和实践，提升自己的数据分析能力，为未来的职业发展打下坚实基础。
            </p>
          </div>
        </div>

        {/* Skills */}
        <div className="mb-8">
          <h3 className="text-2xl font-bold mb-4 text-blue-600">专业技能</h3>
          <div className="space-y-4">
            <div>
              <div className="flex justify-between mb-1">
                <span className="font-medium">Python编程</span>
                <span className="text-blue-600 font-bold">85%</span>
              </div>
              <div className="w-full bg-gray-200 rounded-full h-3">
                <div className="bg-blue-600 h-3 rounded-full" style={{ width: '85%' }}></div>
              </div>
            </div>

            <div>
              <div className="flex justify-between mb-1">
                <span className="font-medium">数据分析</span>
                <span className="text-blue-600 font-bold">80%</span>
              </div>
              <div className="w-full bg-gray-200 rounded-full h-3">
                <div className="bg-blue-600 h-3 rounded-full" style={{ width: '80%' }}></div>
              </div>
            </div>

            <div>
              <div className="flex justify-between mb-1">
                <span className="font-medium">数据可视化</span>
                <span className="text-blue-600 font-bold">75%</span>
              </div>
              <div className="w-full bg-gray-200 rounded-full h-3">
                <div className="bg-blue-600 h-3 rounded-full" style={{ width: '75%' }}></div>
              </div>
            </div>

            <div>
              <div className="flex justify-between mb-1">
                <span className="font-medium">SQL数据库</span>
                <span className="text-blue-600 font-bold">70%</span>
              </div>
              <div className="w-full bg-gray-200 rounded-full h-3">
                <div className="bg-blue-600 h-3 rounded-full" style={{ width: '70%' }}></div>
              </div>
            </div>
          </div>
        </div>

        {/* Education Background */}
        <div>
          <h3 className="text-2xl font-bold mb-4 text-blue-600">教育背景</h3>
          <div className="space-y-6">
            <div className="flex items-start">
              <div className="bg-blue-600 text-white rounded-full w-12 h-12 flex items-center justify-center font-bold mr-4 flex-shrink-0">
                2024
              </div>
              <div className="flex-1">
                <h4 className="font-bold text-lg">广东科学技术职业学院</h4>
                <p className="text-gray-600">商务数据分析与应用专业 · 专科在读</p>
              </div>
            </div>

            <div className="flex items-start">
              <div className="bg-green-600 text-white rounded-full w-12 h-12 flex items-center justify-center font-bold mr-4 flex-shrink-0">
                2027
              </div>
              <div className="flex-1">
                <h4 className="font-bold text-lg">预期毕业</h4>
                <p className="text-gray-600">商务数据分析与应用专业 · 专科毕业证书</p>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Learning Platform CTA */}
      <div className="bg-gradient-to-r from-blue-600 to-purple-700 rounded-2xl p-10 text-white shadow-xl fade-in" style={{ animationDelay: '0.9s' }}>
        <div className="max-w-3xl mx-auto text-center">
          <h2 className="text-3xl font-bold mb-4">开始我的数据分析学习之旅</h2>
          <p className="text-lg mb-8 opacity-90">
            通过这个Pandas数据分析训练平台，我将系统学习数据分析技能，从入门到进阶，掌握核心技能。
          </p>
          <div className="flex flex-wrap gap-4 justify-center">
            <Link to="/" className="bg-white text-blue-600 px-8 py-3 rounded-md font-bold hover:bg-blue-50 transition-colors shadow-lg">
              浏览所有项目
            </Link>
            <Link to="/quiz" className="bg-transparent border-2 border-white text-white px-8 py-3 rounded-md font-bold hover:bg-white hover:text-blue-600 transition-colors shadow-lg">
              开始测试
            </Link>
          </div>
        </div>
      </div>

      {/* Footer */}
      <div className="mt-8 text-center text-gray-500">
        <p className="font-medium">龙奕羽的个人学习页面</p>
        <p className="text-sm">广东科学技术职业学院商学院 · 商务数据分析与应用专业</p>
      </div>
    </div>
  )
}

export default AboutPage
