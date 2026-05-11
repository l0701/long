import { useState, useEffect, useCallback } from 'react'
import { Link } from 'react-router-dom'

interface Question {
  id: number
  question: string
  options: string[]
  correctAnswer: number
  explanation: string
}

const questions: Question[] = [
  {
    id: 1,
    question: 'pandas中用于创建DataFrame的函数是？',
    options: ['pd.createDataFrame()', 'pd.DataFrame()', 'pd.makeDataFrame()', 'pd.newDataFrame()'],
    correctAnswer: 1,
    explanation: '在pandas中，使用pd.DataFrame()函数来创建DataFrame对象。DataFrame是pandas的核心数据结构，用于存储表格数据。'
  },
  {
    id: 2,
    question: '下列哪个函数用于查看DataFrame的前几行数据？',
    options: ['df.view()', 'df.head()', 'df.first()', 'df.top()'],
    correctAnswer: 1,
    explanation: 'df.head()函数用于查看DataFrame的前几行数据，默认显示前5行。类似的，df.tail()用于查看最后几行数据。'
  },
  {
    id: 3,
    question: 'pandas中用于删除包含缺失值行的函数是？',
    options: ['df.removeNaN()', 'df.dropna()', 'df.deleteNaN()', 'df.clean()'],
    correctAnswer: 1,
    explanation: 'df.dropna()函数用于删除包含缺失值（NaN）的行或列。可以通过axis参数控制删除行还是列。'
  },
  {
    id: 4,
    question: '下列哪个函数用于按列分组并聚合数据？',
    options: ['df.group()', 'df.aggregate()', 'df.groupby()', 'df.groupandagg()'],
    correctAnswer: 2,
    explanation: 'df.groupby()函数用于按指定列对数据进行分组，然后可以应用各种聚合函数如sum()、mean()、count()等。'
  },
  {
    id: 5,
    question: 'pandas中用于根据键合并两个DataFrame的函数是？',
    options: ['pd.merge()', 'pd.join()', 'pd.concat()', 'pd.combine()'],
    correctAnswer: 0,
    explanation: 'pd.merge()函数用于根据一个或多个键合并两个DataFrame，类似于SQL中的JOIN操作。支持内连接、左连接、右连接和外连接。'
  },
  {
    id: 6,
    question: '下列哪个函数用于创建固定频率的日期时间索引？',
    options: ['pd.date_range()', 'pd.time_series()', 'pd.datetime_range()', 'pd.create_dates()'],
    correctAnswer: 0,
    explanation: 'pd.date_range()函数用于创建固定频率的日期时间索引，是时间序列分析的基础。可以通过freq参数指定频率。'
  },
  {
    id: 7,
    question: 'pandas中用于计算DataFrame描述性统计信息的函数是？',
    options: ['df.stats()', 'df.describe()', 'df.summary()', 'df.analyze()'],
    correctAnswer: 1,
    explanation: 'df.describe()函数用于生成DataFrame的描述性统计信息，包括计数、均值、标准差、最小值、25%分位数、中位数、75%分位数和最大值。'
  },
  {
    id: 8,
    question: '下列哪个函数用于将DataFrame导出为CSV文件？',
    options: ['df.to_csv()', 'df.save_csv()', 'df.export_csv()', 'df.write_csv()'],
    correctAnswer: 0,
    explanation: 'df.to_csv()函数用于将DataFrame导出为CSV文件，是数据持久化的常用方法。类似的还有to_excel()导出为Excel文件。'
  },
  {
    id: 9,
    question: 'pandas中用于填充缺失值的函数是？',
    options: ['df.fill()', 'df.fillna()', 'df.replaceNaN()', 'df.impute()'],
    correctAnswer: 1,
    explanation: 'df.fillna()函数用于填充缺失值，可以使用指定值、平均值、中位数等。也可以使用method参数使用前向或后向填充。'
  },
  {
    id: 10,
    question: '下列哪个属性用于查看DataFrame的列名？',
    options: ['df.columns', 'df.names', 'df.cols', 'df.headers'],
    correctAnswer: 0,
    explanation: 'df.columns属性用于查看DataFrame的所有列名，返回一个Index对象。可以通过直接赋值来重命名列。'
  }
]

const QuizPage = () => {
  const [currentQuestion, setCurrentQuestion] = useState(0)
  const [selectedAnswer, setSelectedAnswer] = useState<number | null>(null)
  const [hasAnswered, setHasAnswered] = useState(false)
  const [score, setScore] = useState(0)
  const [answers, setAnswers] = useState<number[]>([])
  const [startTime, setStartTime] = useState<number>(Date.now())
  const [endTime, setEndTime] = useState<number | null>(null)
  const [timeRemaining, setTimeRemaining] = useState<number>(600) // 10分钟

  useEffect(() => {
    setStartTime(Date.now())
    setTimeRemaining(600) // 10分钟倒计时
  }, [])

  useEffect(() => {
    if (timeRemaining > 0 && !endTime) {
      const timer = setTimeout(() => {
        setTimeRemaining(prev => prev - 1)
      }, 1000)
      return () => clearTimeout(timer)
    } else if (timeRemaining === 0 && !endTime) {
      handleSubmitQuiz()
    }
  }, [timeRemaining, endTime])

  const handleAnswerSelect = (index: number) => {
    if (hasAnswered) return
    
    setSelectedAnswer(index)
    setHasAnswered(true)
    
    const isCorrect = index === questions[currentQuestion].correctAnswer
    if (isCorrect) {
      setScore(prev => prev + 1)
    }
    
    setAnswers(prev => [...prev, index])
  }

  const handleNextQuestion = () => {
    if (currentQuestion < questions.length - 1) {
      setCurrentQuestion(prev => prev + 1)
      setSelectedAnswer(null)
      setHasAnswered(false)
    } else {
      handleSubmitQuiz()
    }
  }

  const handleSubmitQuiz = () => {
    setEndTime(Date.now())
  }

  const handleRestartQuiz = () => {
    setCurrentQuestion(0)
    setSelectedAnswer(null)
    setHasAnswered(false)
    setScore(0)
    setAnswers([])
    setStartTime(Date.now())
    setEndTime(null)
    setTimeRemaining(600)
  }

  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60)
    const secs = seconds % 60
    return `${mins.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`
  }

  const getGrade = (score: number) => {
    const percentage = (score / questions.length) * 100
    if (percentage >= 90) return { grade: 'A', text: '优秀！', color: 'text-green-600' }
    if (percentage >= 80) return { grade: 'B', text: '良好', color: 'text-blue-600' }
    if (percentage >= 70) return { grade: 'C', text: '中等', color: 'text-yellow-600' }
    if (percentage >= 60) return { grade: 'D', text: '及格', color: 'text-orange-600' }
    return { grade: 'F', text: '不及格', color: 'text-red-600' }
  }

  const gradeInfo = getGrade(score)

  return (
    <div className="container mx-auto px-4 py-8 max-w-4xl">
      {/* Page Header */}
      <div className="bg-white rounded-xl shadow-lg p-8 mb-8 fade-in">
        <h1 className="text-3xl font-bold text-center text-primary mb-4">pandas 知识测试</h1>
        <div className="flex justify-between items-center text-sm text-gray-600">
          <span>共 {questions.length} 道题，限时 10 分钟</span>
          <span className={`font-mono text-lg font-bold ${timeRemaining < 60 ? 'text-red-600' : 'text-gray-700'}`}>
            剩余时间: {formatTime(timeRemaining)}
          </span>
        </div>
      </div>

      {!endTime ? (
        <div className="bg-white rounded-xl shadow-lg p-8 mb-8 question-card fade-in">
          {/* Question Progress */}
          <div className="flex justify-between items-center mb-6">
            <span className="text-sm text-gray-500">
              第 {currentQuestion + 1} 题 / 共 {questions.length} 题
            </span>
            <span className="text-sm font-medium text-primary">
              当前得分: {score} 分
            </span>
          </div>

          {/* Progress Bar */}
          <div className="w-full bg-gray-200 rounded-full h-2 mb-6">
            <div 
              className="bg-primary h-2 rounded-full transition-all duration-300" 
              style={{ width: `${((currentQuestion + 1) / questions.length) * 100}%` }}
            ></div>
          </div>

          {/* Question */}
          <h2 className="text-xl font-bold mb-6 text-gray-800">
            {questions[currentQuestion].question}
          </h2>

          {/* Options */}
          <div className="space-y-4 mb-8">
            {questions[currentQuestion].options.map((option, index) => {
              const isSelected = selectedAnswer === index
              const isCorrect = index === questions[currentQuestion].correctAnswer
              const showCorrect = hasAnswered && isCorrect
              const showIncorrect = hasAnswered && isSelected && !isCorrect
              
              return (
                <div
                  key={index}
                  className={`option p-4 border-2 rounded-lg cursor-pointer transition-all ${
                    showCorrect 
                      ? 'border-green-500 bg-green-50' 
                      : showIncorrect 
                        ? 'border-red-500 bg-red-50' 
                        : isSelected 
                          ? 'border-primary bg-blue-50' 
                          : 'border-gray-200 hover:border-primary hover:bg-blue-50'
                  }`}
                  onClick={() => handleAnswerSelect(index)}
                >
                  <div className="flex items-center">
                    <div className={`w-8 h-8 rounded-full border-2 flex items-center justify-center mr-4 font-bold ${
                      showCorrect 
                        ? 'bg-green-500 text-white border-green-500' 
                        : showIncorrect 
                          ? 'bg-red-500 text-white border-red-500' 
                          : isSelected 
                            ? 'bg-primary text-white border-primary' 
                            : 'border-gray-300 text-gray-600'
                    }`}>
                      {showCorrect ? (
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                        </svg>
                      ) : showIncorrect ? (
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                        </svg>
                      ) : (
                        String.fromCharCode(65 + index)
                      )}
                    </div>
                    <span className="text-lg">{option}</span>
                  </div>
                </div>
              )
            })}
          </div>

          {/* Explanation (shown after answering) */}
          {hasAnswered && (
            <div className={`p-4 rounded-lg mb-6 ${
              selectedAnswer === questions[currentQuestion].correctAnswer 
                ? 'bg-green-50 border border-green-200' 
                : 'bg-amber-50 border border-amber-200'
            }`}>
              <div className="flex items-center mb-2">
                {selectedAnswer === questions[currentQuestion].correctAnswer ? (
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 mr-2 text-green-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                ) : (
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 mr-2 text-amber-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                )}
                <h3 className={`font-bold ${selectedAnswer === questions[currentQuestion].correctAnswer ? 'text-green-700' : 'text-amber-700'}`}>
                  {selectedAnswer === questions[currentQuestion].correctAnswer ? '回答正确！' : '回答错误'}
                </h3>
              </div>
              <p className="text-gray-700">
                <span className="font-bold">解析：</span>{questions[currentQuestion].explanation}
              </p>
            </div>
          )}

          {/* Navigation Button */}
          <div className="flex justify-between items-center">
            <button
              onClick={handleSubmitQuiz}
              className="px-6 py-3 rounded-md font-medium bg-gray-200 text-gray-700 hover:bg-gray-300 transition-colors"
            >
              提前交卷
            </button>
            <button
              onClick={handleNextQuestion}
              disabled={!hasAnswered}
              className={`btn-primary px-6 py-3 rounded-md font-medium transition-colors ${!hasAnswered ? 'bg-gray-400 text-white cursor-not-allowed' : 'bg-primary text-white hover:bg-blue-700'}`}
            >
              {currentQuestion < questions.length - 1 ? '下一题 →' : '完成测试'}
            </button>
          </div>
        </div>
      ) : (
        <div className="bg-white rounded-xl shadow-lg p-8 mb-8 fade-in">
          {/* Result */}
          <div className="text-center mb-8">
            <div className={`inline-block p-6 rounded-full bg-gradient-to-br ${
              (score / questions.length) >= 0.85 
                ? 'from-green-100 to-green-200 text-green-600' 
                : (score / questions.length) >= 0.7 
                  ? 'from-blue-100 to-blue-200 text-blue-600'
                  : 'from-gray-100 to-gray-200 text-gray-600'
            } mb-4`}>
              <span className="text-5xl font-bold">{gradeInfo.grade}</span>
            </div>
            <h2 className="text-2xl font-bold mb-2">测试完成！</h2>
            <p className={`text-lg mb-4 ${gradeInfo.color}`}>{gradeInfo.text}</p>
            <p className="text-gray-600 mb-2">
              你的得分：<span className="font-bold text-3xl text-primary">{score}</span> / {questions.length} 分
            </p>
            <div className="w-full bg-gray-200 rounded-full h-4 mb-6 max-w-md mx-auto">
              <div 
                className={`h-4 rounded-full transition-all duration-500 ${
                  (score / questions.length) >= 0.85 
                    ? 'bg-green-500' 
                    : (score / questions.length) >= 0.7 
                      ? 'bg-blue-500'
                      : 'bg-orange-500'
                }`} 
                style={{ width: `${(score / questions.length) * 100}%` }}
              ></div>
            </div>
            <p className="text-sm text-gray-500">
              用时：{Math.round((Date.now() - startTime) / 1000)} 秒
            </p>
          </div>

          {/* Answers Review */}
          <div className="mb-8">
            <h3 className="text-xl font-bold mb-4 text-center">答案回顾</h3>
            <div className="space-y-4">
              {questions.map((question, index) => {
                const userAnswer = answers[index]
                const isCorrect = userAnswer === question.correctAnswer
                
                return (
                  <div 
                    key={question.id} 
                    className={`p-4 border-2 rounded-lg ${
                      isCorrect ? 'border-green-200 bg-green-50' : 'border-red-200 bg-red-50'
                    }`}
                  >
                    <div className="flex justify-between items-start mb-2">
                      <h4 className="font-medium flex-1">
                        <span className="text-gray-500 mr-2">({index + 1})</span>
                        {question.question}
                      </h4>
                      <span className={`px-3 py-1 rounded-full text-xs font-bold ${
                        isCorrect ? 'bg-green-500 text-white' : 'bg-red-500 text-white'
                      }`}>
                        {isCorrect ? '✓ 正确' : '✗ 错误'}
                      </span>
                    </div>
                    <p className="text-sm text-gray-600 mb-2">
                      <span className="font-bold">你的答案：</span>
                      {userAnswer !== undefined ? `${String.fromCharCode(65 + userAnswer)}. ${question.options[userAnswer]}` : '未作答'}
                    </p>
                    {!isCorrect && (
                      <p className="text-sm text-green-600 mb-2">
                        <span className="font-bold">正确答案：</span>
                        {String.fromCharCode(65 + question.correctAnswer)}. {question.options[question.correctAnswer]}
                      </p>
                    )}
                    <p className="text-sm text-gray-700 italic">
                      {question.explanation}
                    </p>
                  </div>
                )
              })}
            </div>
          </div>

          {/* Action Buttons */}
          <div className="flex flex-col sm:flex-row space-y-4 sm:space-y-0 sm:space-x-4 justify-center">
            <button
              onClick={handleRestartQuiz}
              className="px-8 py-3 rounded-lg font-bold bg-gradient-to-r from-primary to-blue-600 text-white hover:from-blue-600 hover:to-primary transition-all shadow-lg btn-primary"
            >
              重新测试
            </button>
            <Link 
              to="/"
              className="px-8 py-3 rounded-lg font-bold bg-gray-200 text-gray-700 hover:bg-gray-300 transition-colors text-center shadow-lg"
            >
              返回首页
            </Link>
          </div>
        </div>
      )}
    </div>
  )
}

export default QuizPage
