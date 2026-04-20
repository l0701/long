import { useState, useEffect } from 'react'
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
    explanation: '在pandas中，使用pd.DataFrame()函数来创建DataFrame对象。'
  },
  {
    id: 2,
    question: '下列哪个函数用于查看DataFrame的前几行数据？',
    options: ['df.view()', 'df.head()', 'df.first()', 'df.top()'],
    correctAnswer: 1,
    explanation: 'df.head()函数用于查看DataFrame的前几行数据，默认显示前5行。'
  },
  {
    id: 3,
    question: 'pandas中用于处理缺失值的函数是？',
    options: ['df.removeNaN()', 'df.dropna()', 'df.deleteNaN()', 'df.clean()'],
    correctAnswer: 1,
    explanation: 'df.dropna()函数用于删除包含缺失值的行或列。'
  },
  {
    id: 4,
    question: '下列哪个函数用于按列分组并聚合数据？',
    options: ['df.group()', 'df.aggregate()', 'df.groupby()', 'df.groupandagg()'],
    correctAnswer: 2,
    explanation: 'df.groupby()函数用于按指定列对数据进行分组，然后可以应用聚合函数。'
  },
  {
    id: 5,
    question: 'pandas中用于合并两个DataFrame的函数是？',
    options: ['pd.merge()', 'pd.join()', 'pd.concat()', 'pd.combine()'],
    correctAnswer: 0,
    explanation: 'pd.merge()函数用于根据一个或多个键合并两个DataFrame。'
  },
  {
    id: 6,
    question: '下列哪个函数用于创建时间序列数据？',
    options: ['pd.date_range()', 'pd.time_series()', 'pd.datetime_range()', 'pd.create_dates()'],
    correctAnswer: 0,
    explanation: 'pd.date_range()函数用于创建固定频率的日期时间索引。'
  },
  {
    id: 7,
    question: 'pandas中用于计算DataFrame描述性统计信息的函数是？',
    options: ['df.stats()', 'df.describe()', 'df.summary()', 'df.analyze()'],
    correctAnswer: 1,
    explanation: 'df.describe()函数用于生成DataFrame的描述性统计信息，包括均值、标准差、最小值、最大值等。'
  },
  {
    id: 8,
    question: '下列哪个函数用于将DataFrame转换为CSV文件？',
    options: ['df.to_csv()', 'df.save_csv()', 'df.export_csv()', 'df.write_csv()'],
    correctAnswer: 0,
    explanation: 'df.to_csv()函数用于将DataFrame导出为CSV文件。'
  }
]

const QuizPage = () => {
  const [currentQuestion, setCurrentQuestion] = useState(0)
  const [selectedAnswer, setSelectedAnswer] = useState<number | null>(null)
  const [showResult, setShowResult] = useState(false)
  const [score, setScore] = useState(0)
  const [answers, setAnswers] = useState<number[]>([])

  useEffect(() => {
    // 重置状态
    setCurrentQuestion(0)
    setSelectedAnswer(null)
    setShowResult(false)
    setScore(0)
    setAnswers([])
  }, [])

  const handleAnswerSelect = (index: number) => {
    setSelectedAnswer(index)
  }

  const handleNextQuestion = () => {
    if (selectedAnswer !== null) {
      // 检查答案是否正确
      if (selectedAnswer === questions[currentQuestion].correctAnswer) {
        setScore(prev => prev + 1)
      }
      
      // 保存答案
      setAnswers(prev => [...prev, selectedAnswer])
      
      // 进入下一题或显示结果
      if (currentQuestion < questions.length - 1) {
        setCurrentQuestion(prev => prev + 1)
        setSelectedAnswer(null)
      } else {
        setShowResult(true)
      }
    }
  }

  const handleRestartQuiz = () => {
    setCurrentQuestion(0)
    setSelectedAnswer(null)
    setShowResult(false)
    setScore(0)
    setAnswers([])
  }

  return (
    <div className="container mx-auto px-4 py-8">
      {/* Page Header */}
      <div className="bg-white rounded-lg shadow-md p-8 mb-8 fade-in">
        <h1 className="text-3xl font-bold text-center text-primary mb-4">pandas 知识测试</h1>
        <p className="text-center text-gray-600">
          测试你对pandas库的理解，共有8道题目，每题1分。
        </p>
      </div>

      {!showResult ? (
        <div className="bg-white rounded-lg shadow-md p-8 mb-8 question-card fade-in">
          {/* Question Progress */}
          <div className="flex justify-between items-center mb-6">
            <span className="text-sm text-gray-500">
              问题 {currentQuestion + 1} / {questions.length}
            </span>
            <span className="text-sm font-medium text-primary">
              得分: {score}
            </span>
          </div>

          {/* Question */}
          <h2 className="text-xl font-bold mb-6">
            {questions[currentQuestion].question}
          </h2>

          {/* Options */}
          <div className="space-y-4 mb-8">
            {questions[currentQuestion].options.map((option, index) => (
              <div
                key={index}
                className={`option p-4 border rounded-lg ${selectedAnswer === index ? 'selected' : ''} ${showResult && selectedAnswer === index && selectedAnswer === questions[currentQuestion].correctAnswer ? 'correct' : ''} ${showResult && selectedAnswer === index && selectedAnswer !== questions[currentQuestion].correctAnswer ? 'incorrect' : ''}`}
                onClick={() => !selectedAnswer && handleAnswerSelect(index)}
              >
                <div className="flex items-center">
                  <div className={`w-6 h-6 rounded-full border flex items-center justify-center mr-3 ${selectedAnswer === index ? 'bg-primary text-white' : 'border-gray-300'}`}>
                    {selectedAnswer === index ? (
                      <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                      </svg>
                    ) : (
                      <span>{String.fromCharCode(65 + index)}</span>
                    )}
                  </div>
                  <span>{option}</span>
                </div>
              </div>
            ))}
          </div>

          {/* Explanation (shown after answering) */}
          {selectedAnswer !== null && (
            <div className="p-4 bg-blue-50 rounded-lg mb-6">
              <h3 className="font-medium text-primary mb-2">解析：</h3>
              <p className="text-gray-700">
                {questions[currentQuestion].explanation}
              </p>
            </div>
          )}

          {/* Navigation Button */}
          <div className="flex justify-end">
            <button
              onClick={handleNextQuestion}
              disabled={selectedAnswer === null}
          className={`btn-primary px-6 py-3 rounded-md font-medium transition-colors ${selectedAnswer === null ? 'bg-gray-400 text-white cursor-not-allowed' : 'bg-primary text-white hover:bg-blue-700'}`}
            >
              {currentQuestion < questions.length - 1 ? '下一题' : '查看结果'}
            </button>
          </div>
        </div>
      ) : (
        <div className="bg-white rounded-lg shadow-md p-8 mb-8 fade-in">
          {/* Result */}
          <div className="text-center mb-8">
            <div className="inline-block p-4 rounded-full bg-green-100 text-green-600 mb-4">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-16 w-16" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
            </div>
            <h2 className="text-2xl font-bold mb-2">测试完成！</h2>
            <p className="text-gray-600 mb-4">
              你答对了 <span className="font-bold text-primary">{score}</span> 题，共 {questions.length} 题。
            </p>
            <div className="w-full bg-gray-200 rounded-full h-4 mb-6">
              <div 
                className="bg-primary h-4 rounded-full" 
                style={{ width: `${(score / questions.length) * 100}%` }}
              ></div>
            </div>
            <p className="text-lg font-medium">
              {score >= 6 ? '很棒！你对pandas有很好的理解。' : score >= 4 ? '不错！继续学习可以提高你的pandas技能。' : '需要加强对pandas的学习。'}
            </p>
          </div>

          {/* Answers Review */}
          <div className="mb-8">
            <h3 className="text-xl font-bold mb-4">答案回顾</h3>
            <div className="space-y-4">
              {questions.map((question, index) => (
                <div key={question.id} className="p-4 border rounded-lg">
                  <div className="flex justify-between items-start mb-2">
                    <h4 className="font-medium">{index + 1}. {question.question}</h4>
                    <span className={`px-2 py-1 rounded text-xs font-medium ${answers[index] === question.correctAnswer ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'}`}>
                      {answers[index] === question.correctAnswer ? '正确' : '错误'}
                    </span>
                  </div>
                  <p className="text-sm text-gray-600 mb-2">
                    正确答案: {String.fromCharCode(65 + question.correctAnswer)}. {question.options[question.correctAnswer]}
                  </p>
                  <p className="text-sm text-gray-600">
                    {question.explanation}
                  </p>
                </div>
              ))}
            </div>
          </div>

          {/* Action Buttons */}
          <div className="flex space-x-4 justify-center">
            <button
              onClick={handleRestartQuiz}
              className="px-6 py-3 rounded-md font-medium bg-primary text-white hover:bg-blue-700 transition-colors btn-primary"
            >
              重新测试
            </button>
            <Link 
              to="/"
              className="px-6 py-3 rounded-md font-medium bg-gray-200 text-dark hover:bg-gray-300 transition-colors"
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