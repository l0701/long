import { useState } from 'react'
import { Link } from 'react-router-dom'

const Navbar = () => {
  const [isScrolled, setIsScrolled] = useState(false)

  // 监听滚动事件
  useState(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 10)
    }
    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  })

  return (
    <nav className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${isScrolled ? 'bg-primary/95 backdrop-blur-sm shadow-lg py-2' : 'bg-primary py-3'}`}>
      <div className="container mx-auto px-4 flex justify-between items-center">
        <Link to="/" className="text-xl font-bold text-white flex items-center space-x-2">
          <span className="w-8 h-8 bg-white rounded-full flex items-center justify-center text-primary font-bold">P</span>
          <span>Pandas数据分析训练</span>
        </Link>
        <div className="hidden md:flex space-x-6">
          <Link to="/" className="text-white hover:text-blue-100 transition-colors relative group">
            首页
            <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-white transition-all duration-300 group-hover:w-full"></span>
          </Link>
          <Link to="/resources" className="text-white hover:text-blue-100 transition-colors relative group">
            学习资源
            <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-white transition-all duration-300 group-hover:w-full"></span>
          </Link>
          <Link to="/quiz" className="text-white hover:text-blue-100 transition-colors relative group">
            知识测试
            <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-white transition-all duration-300 group-hover:w-full"></span>
          </Link>
        </div>
        <div className="md:hidden">
          <button className="text-white focus:outline-none">
            <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
            </svg>
          </button>
        </div>
      </div>
    </nav>
  )
}

export default Navbar