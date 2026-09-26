import { useEffect, useState } from 'react'
import './LearningHub.css'

const learningModules = [
  {
    id: 1,
    icon: '🏛️',
    title: 'Indian Monuments',
    category: 'Monument',
    description:
      'Learn about important monuments of India, their architecture, historical background, location and cultural importance.',

    materialTitle: 'Indian Monuments - Study Material',

    materialIntroduction:
      'Indian monuments reflect the architectural, historical and cultural development of different periods of Indian history.',

    heritageEntries: [
      {
        name: 'Taj Mahal',
        location: 'Agra, Uttar Pradesh',
        timePeriod: '1632–1648 CE',
        description:
          'The Taj Mahal was built by Mughal Emperor Shah Jahan in memory of his wife Mumtaz Mahal. UNESCO describes it as an important achievement of Indo-Islamic architecture.',
        sourceName: 'UNESCO World Heritage Centre',
        sourceUrl: 'https://whc.unesco.org/en/list/252'
      },
      {
        name: 'Red Fort Complex',
        location: 'Delhi',
        timePeriod: '17th century CE',
        description:
          'The Red Fort was developed under Shah Jahan and represents an important phase of Mughal architectural planning, combining Islamic, Persian, Timurid and Indian traditions.',
        sourceName: 'UNESCO World Heritage Centre',
        sourceUrl: 'https://whc.unesco.org/en/list/231'
      },
      {
        name: 'Buddhist Monuments at Sanchi',
        location: 'Sanchi, Madhya Pradesh',
        timePeriod: '3rd century BCE – 12th century CE',
        description:
          'Sanchi is a major Buddhist heritage site containing stupas, temples and monasteries. Its monuments document the development of Buddhist art and architecture over many centuries.',
        sourceName: 'UNESCO World Heritage Centre',
        sourceUrl: 'https://whc.unesco.org/en/list/524'
      }
    ],

    keyPoints: [
      'Taj Mahal is located in Agra, Uttar Pradesh.',
      'The Red Fort Complex is located in Delhi.',
      'Sanchi is an important Buddhist heritage site in Madhya Pradesh.',
      'Indian monuments represent different architectural traditions and historical periods.'
    ],

    questions: [
      {
        question: 'Which monument is located in Agra, Uttar Pradesh?',
        options: [
          'Taj Mahal',
          'Konark Temple',
          'Gateway of India',
          'Sanchi Stupa'
        ],
        answer: 'Taj Mahal'
      },
      {
        question: 'Which city is famous for the Red Fort?',
        options: ['Delhi', 'Jaipur', 'Kolkata', 'Chennai'],
        answer: 'Delhi'
      },
      {
        question: 'Sanchi is strongly associated with which religion?',
        options: [
          'Buddhism',
          'Jainism',
          'Sikhism',
          'Zoroastrianism'
        ],
        answer: 'Buddhism'
      }
    ]
  },

  {
    id: 2,
    icon: '🎉',
    title: 'Indian Festivals',
    category: 'Festival',
    description:
      'Explore major Indian festivals, their traditions, cultural significance, regional associations and community celebrations.',

    materialTitle: 'Indian Festivals - Study Material',

    materialIntroduction:
      "Indian festivals are celebrated in different regions and communities and form an important part of the country's cultural heritage.",

    heritageEntries: [
      {
        name: 'Diwali',
        location: 'Celebrated across India',
        timePeriod: 'Annual festival',
        description:
          'Diwali is widely known as the festival of lights and is celebrated by different communities and regions of India with varied traditions and practices.',
        sourceName: 'Ministry of Culture, Government of India',
        sourceUrl:
          'https://www.indiaculture.gov.in/festivals-india-archive'
      },
      {
        name: 'Holi',
        location: 'Celebrated across India',
        timePeriod: 'Annual festival',
        description:
          'Holi is popularly associated with colours and is celebrated in many parts of India through community gatherings and regional cultural practices.',
        sourceName: 'Ministry of Culture, Government of India',
        sourceUrl:
          'https://www.indiaculture.gov.in/festivals-india-archive'
      },
      {
        name: 'Durga Puja',
        location: 'West Bengal and other regions',
        timePeriod: 'Annual festival',
        description:
          'Durga Puja is an important cultural and religious festival, particularly associated with West Bengal. It includes rituals, artistic decoration, music and community participation.',
        sourceName: 'Ministry of Culture, Government of India',
        sourceUrl:
          'https://www.indiaculture.gov.in/sites/default/files/annual-reports/Final_English_Annual_Report_23-24_for_Net_29082024.pdf'
      }
    ],

    keyPoints: [
      'Diwali is widely known as the festival of lights.',
      'Holi is popularly known as the festival of colours.',
      'Durga Puja is especially associated with West Bengal.',
      'Festivals often include rituals, music, food, art and community participation.'
    ],

    questions: [
      {
        question: 'Diwali is widely known as the festival of what?',
        options: ['Lights', 'Harvest', 'Colours', 'Music'],
        answer: 'Lights'
      },
      {
        question: 'Holi is popularly known as the festival of what?',
        options: ['Colours', 'Books', 'Flowers', 'Food'],
        answer: 'Colours'
      },
      {
        question: 'Durga Puja is especially associated with which Indian state?',
        options: [
          'West Bengal',
          'Punjab',
          'Goa',
          'Rajasthan'
        ],
        answer: 'West Bengal'
      }
    ]
  },

  {
    id: 3,
    icon: '🪔',
    title: 'Indian Traditions',
    category: 'Tradition',
    description:
      'Discover traditional practices, rituals, arts and cultural customs that form an important part of Indian heritage.',

    materialTitle: 'Indian Traditions - Study Material',

    materialIntroduction:
      "Indian traditions include diverse practices, rituals, performing arts, crafts and customs that have developed across different communities and regions.",

    heritageEntries: [
      {
        name: 'Yoga',
        location: 'India',
        timePeriod: 'Ancient tradition',
        description:
          'Yoga is an ancient Indian practice connected with physical, mental and spiritual disciplines. Its history and cultural importance have developed over a long period.',
        sourceName: 'Ministry of Culture, Government of India',
        sourceUrl:
          'https://www.indiaculture.gov.in/invitation-celebration-international-day-yoga'
      },
      {
        name: 'Classical Indian Dance',
        location: 'Different regions of India',
        timePeriod: 'Developed over centuries',
        description:
          "Indian classical dance traditions form an important part of India's performing arts heritage and include different regional forms and artistic traditions.",
        sourceName: 'Ministry of Culture, Government of India',
        sourceUrl:
          'https://www.indiaculture.gov.in/sites/default/files/Annual_Reports_Organizations/AnnualReportEZCC_2015-2016_05.05.2017.pdf'
      },
      {
        name: 'Traditional Handicrafts',
        location: 'Different regions of India',
        timePeriod: 'Regional traditions developed over generations',
        description:
          "Traditional handicrafts preserve regional artistic knowledge, techniques and cultural expressions and are an important part of India's living heritage.",
        sourceName: 'Ministry of Culture, Government of India',
        sourceUrl: 'https://www.indiaculture.gov.in/'
      }
    ],

    keyPoints: [
      'Yoga is an ancient Indian tradition and practice.',
      'Classical Indian dance forms are an important part of cultural heritage.',
      'Traditional handicrafts represent regional artistic knowledge.',
      'Cultural traditions can vary significantly between regions and communities.'
    ],

    questions: [
      {
        question: 'Yoga is historically associated with which country?',
        options: ['India', 'Greece', 'Egypt', 'China'],
        answer: 'India'
      },
      {
        question:
          'Classical Indian dance is an important part of Indian what?',
        options: [
          'Cultural heritage',
          'Transportation',
          'Industry',
          'Geography'
        ],
        answer: 'Cultural heritage'
      },
      {
        question:
          'Traditional handicrafts are mainly connected with which area?',
        options: [
          'Art and culture',
          'Space science',
          'Banking',
          'Sports'
        ],
        answer: 'Art and culture'
      }
    ]
  },

  {
    id: 4,
    icon: '📜',
    title: 'Historical Events',
    category: 'Historical Event',
    description:
      'Learn about important events and historical developments that shaped the cultural and political history of India.',

    materialTitle: 'Historical Events - Study Material',

    materialIntroduction:
      "Important historical events have shaped India's political, social and cultural development over time.",

    heritageEntries: [
      {
        name: 'Indian Independence',
        location: 'India',
        timePeriod: '1947',
        description:
          'India became independent from British colonial rule in 1947. Independence Day is observed annually on 15 August.',
        sourceName: 'Government of India',
        sourceUrl: 'https://knowindia.india.gov.in/'
      },
      {
        name: 'Constitution of India',
        location: 'India',
        timePeriod: '26 January 1950',
        description:
          'The Constitution of India came into effect on 26 January 1950. Republic Day is observed annually on this date.',
        sourceName: 'Government of India',
        sourceUrl: 'https://knowindia.india.gov.in/'
      },
      {
        name: 'Quit India Movement',
        location: 'India',
        timePeriod: '1942',
        description:
          'The Quit India Movement was launched in 1942 as part of the Indian independence movement against British rule.',
        sourceName: 'Government of India',
        sourceUrl: 'https://knowindia.india.gov.in/'
      }
    ],

    keyPoints: [
      'India became independent from British rule in 1947.',
      'The Constitution of India came into effect on 26 January 1950.',
      'The Quit India Movement was launched in 1942.',
      'Historical events help learners understand the development of modern India.'
    ],

    questions: [
      {
        question:
          'India became independent from British rule in which year?',
        options: ['1947', '1950', '1942', '1935'],
        answer: '1947'
      },
      {
        question:
          'The Constitution of India came into effect in which year?',
        options: ['1950', '1947', '1948', '1952'],
        answer: '1950'
      },
      {
        question:
          'The Quit India Movement was launched in which year?',
        options: ['1942', '1930', '1947', '1919'],
        answer: '1942'
      }
    ]
  }
]

const teacherResources = [
  {
    id: 1,
    icon: '📘',
    title: 'Lesson Planning Guide',
    description:
      'A simple guide to help teachers structure a heritage learning session with objectives, activities and assessment.',
    format: 'Teaching Guide'
  },
  {
    id: 2,
    icon: '💬',
    title: 'Classroom Discussion Questions',
    description:
      'Ready-to-use discussion questions for encouraging students to explore monuments, festivals, traditions and historical events.',
    format: 'Discussion Resource'
  },
  {
    id: 3,
    icon: '📝',
    title: 'Assessment Guidance',
    description:
      'Guidance for using learning modules and quiz results to review student understanding and learning progress.',
    format: 'Assessment Resource'
  },
  {
    id: 4,
    icon: '🔎',
    title: 'Heritage Source Verification Checklist',
    description:
      'A checklist for teachers to help students identify reliable, official and educational sources when researching heritage topics.',
    format: 'Research Resource'
  }
]

function LearningHub() {
  const [selectedModule, setSelectedModule] = useState(null)
  const [selectedMaterial, setSelectedMaterial] = useState(null)
  const [currentQuestion, setCurrentQuestion] = useState(0)
  const [selectedAnswer, setSelectedAnswer] = useState('')
  const [score, setScore] = useState(0)
  const [quizCompleted, setQuizCompleted] = useState(false)
  const [learningProgress, setLearningProgress] = useState({})

  let currentUser = null

  try {
    currentUser = JSON.parse(
      localStorage.getItem('heritageCurrentUser') || 'null'
    )
  } catch {
    currentUser = null
  }

  const progressStorageKey = currentUser?.email
    ? `heritageLearningProgress_${currentUser.email}`
    : 'heritageLearningProgress_guest'

  useEffect(() => {
    let savedProgress = {}

    try {
      savedProgress = JSON.parse(
        localStorage.getItem(progressStorageKey) || '{}'
      )
    } catch {
      savedProgress = {}
    }

    setLearningProgress(savedProgress)
  }, [progressStorageKey])

  function startModule(module) {
    setSelectedMaterial(null)
    setSelectedModule(module)
    setCurrentQuestion(0)
    setSelectedAnswer('')
    setScore(0)
    setQuizCompleted(false)
  }

  function openMaterial(module) {
    setSelectedModule(null)
    setQuizCompleted(false)
    setSelectedMaterial(module)
  }

  function closeMaterial() {
    setSelectedMaterial(null)
  }

  function downloadMaterial(module) {
    const heritageDetails = module.heritageEntries
      .map(
        (entry, index) =>
          `${index + 1}. ${entry.name}
Location: ${entry.location}
Time Period: ${entry.timePeriod}
Description: ${entry.description}
Source: ${entry.sourceName}
Source Link: ${entry.sourceUrl}`
      )
      .join('\n\n')

    const content = `${module.materialTitle}

Category: ${module.category}

Introduction:
${module.materialIntroduction}

Heritage Details:
${heritageDetails}

Key Points:
${module.keyPoints
  .map((point, index) => `${index + 1}. ${point}`)
  .join('\n')}

This study material is provided as part of the Heritage Learning Hub project.

Learners should refer to reliable educational and official heritage sources for further study.
`

    const blob = new Blob([content], {
      type: 'text/plain;charset=utf-8'
    })

    const url = URL.createObjectURL(blob)
    const link = document.createElement('a')

    link.href = url

    link.download = `${module.title
      .replace(/\s+/g, '-')
      .toLowerCase()}-study-material.txt`

    document.body.appendChild(link)
    link.click()
    document.body.removeChild(link)

    setTimeout(() => {
      URL.revokeObjectURL(url)
    }, 1000)

    alert('Study material downloaded successfully.')
  }

  function downloadTeacherResource(resource) {
    const content = `${resource.title}

Heritage Learning Hub
Teacher Resource

Resource Type:
${resource.format}

Description:
${resource.description}

Suggested Use:
This resource can be used by teachers to support heritage-related classroom learning, discussion, research and assessment.

Important Note:
Teachers should adapt the resource according to the age group, curriculum requirements and classroom context.

Heritage Learning Hub
`

    const blob = new Blob([content], {
      type: 'text/plain;charset=utf-8'
    })

    const url = URL.createObjectURL(blob)
    const link = document.createElement('a')

    link.href = url

    link.download = `${resource.title
      .replace(/\s+/g, '-')
      .toLowerCase()}.txt`

    document.body.appendChild(link)
    link.click()
    document.body.removeChild(link)

    setTimeout(() => {
      URL.revokeObjectURL(url)
    }, 1000)

    alert('Teacher resource downloaded successfully.')
  }

  function handleAnswer(answer) {
    setSelectedAnswer(answer)
  }

  function submitAnswer() {
    if (!selectedAnswer) {
      alert('Please select an answer before continuing.')
      return
    }

    const question = selectedModule.questions[currentQuestion]

    const updatedScore =
      selectedAnswer === question.answer
        ? score + 1
        : score

    setScore(updatedScore)

    const isLastQuestion =
      currentQuestion === selectedModule.questions.length - 1

    if (isLastQuestion) {
      const completedProgress = {
        ...learningProgress,
        [selectedModule.id]: {
          moduleId: selectedModule.id,
          title: selectedModule.title,
          category: selectedModule.category,
          score: updatedScore,
          totalQuestions: selectedModule.questions.length,
          completed: true,
          completedAt: new Date().toISOString()
        }
      }

      setLearningProgress(completedProgress)

      localStorage.setItem(
        progressStorageKey,
        JSON.stringify(completedProgress)
      )

      setQuizCompleted(true)
      return
    }

    setCurrentQuestion(currentQuestion + 1)
    setSelectedAnswer('')
  }

  function restartQuiz() {
    if (!selectedModule) {
      return
    }

    startModule(selectedModule)
  }

  function closeModule() {
    setSelectedModule(null)
    setSelectedMaterial(null)
    setCurrentQuestion(0)
    setSelectedAnswer('')
    setScore(0)
    setQuizCompleted(false)
  }

  const completedModules = Object.values(learningProgress).filter(
    (item) => item.completed
  )

  const completedCount = completedModules.length

  const progressPercentage =
    (completedCount / learningModules.length) * 100

  const isTeacherOrAdmin =
    currentUser?.role === 'Teacher' ||
    currentUser?.role === 'Admin'

  return (
    <section className="learning-page">
      <div className="learning-header">
        <p>LEARN • EXPLORE • DISCOVER</p>

        <h1>Heritage Learning Hub</h1>

        <span>
          Explore India&apos;s cultural heritage through structured learning
          modules and interactive quizzes.
        </span>
      </div>

      {!selectedModule && !selectedMaterial && (
        <>
          <div className="learning-progress-section">
            <div className="learning-progress-header">
              <div>
                <p>YOUR LEARNING PROGRESS</p>

                <h2>
                  {completedCount} / {learningModules.length} Modules Completed
                </h2>
              </div>

              <strong>
                {Math.round(progressPercentage)}%
              </strong>
            </div>

            <div className="progress-bar">
              <div
                className="progress-bar-fill"
                style={{
                  width: `${progressPercentage}%`
                }}
              ></div>
            </div>

            <p className="progress-message">
              {completedCount === 0 &&
                'Start your first learning module to begin your progress.'}

              {completedCount > 0 &&
                completedCount < learningModules.length &&
                `You have completed ${completedCount} learning module${
                  completedCount > 1 ? 's' : ''
                }. Keep learning to complete all modules.`}

              {completedCount === learningModules.length &&
                'Congratulations! You have completed all learning modules.'}
            </p>
          </div>

          {completedModules.length > 0 && (
            <div className="completed-modules-section">
              <div className="completed-modules-header">
                <h2>📊 Completed Modules</h2>

                <span>Your saved quiz results</span>
              </div>

              <div className="completed-modules-grid">
                {completedModules.map((item) => (
                  <div
                    className="completed-module-card"
                    key={item.moduleId}
                  >
                    <div className="completed-module-top">
                      <span>{item.category}</span>

                      <strong>✓ Completed</strong>
                    </div>

                    <h3>{item.title}</h3>

                    <p>
                      Score: <strong>{item.score}</strong> /{' '}
                      {item.totalQuestions}
                    </p>
                  </div>
                ))}
              </div>
            </div>
          )}

          {isTeacherOrAdmin && (
            <div className="teacher-resources-section">
              <div className="teacher-resources-header">
                <div>
                  <p>TEACHER SUPPORT</p>
                  <h2>👩‍🏫 Teacher Resources</h2>
                </div>

                <span>
                  Resources to support heritage education
                </span>
              </div>

              <div className="teacher-resources-grid">
                {teacherResources.map((resource) => (
                  <div
                    className="teacher-resource-card"
                    key={resource.id}
                  >
                    <div className="teacher-resource-icon">
                      {resource.icon}
                    </div>

                    <span className="teacher-resource-type">
                      {resource.format}
                    </span>

                    <h3>{resource.title}</h3>

                    <p>{resource.description}</p>

                    <button
                      onClick={() =>
                        downloadTeacherResource(resource)
                      }
                    >
                      📥 Download Resource
                    </button>
                  </div>
                ))}
              </div>
            </div>
          )}

          <div className="learning-intro">
            <h2>Choose a Learning Module</h2>

            <p>
              Select a topic to study heritage material or attempt its
              interactive quiz.
            </p>
          </div>

          <div className="learning-grid">
            {learningModules.map((module) => (
              <div
                className="learning-card"
                key={module.id}
              >
                <div className="learning-icon">
                  {module.icon}
                </div>

                <span className="learning-category">
                  {module.category}
                </span>

                <h2>{module.title}</h2>

                <p>{module.description}</p>

                <div className="learning-card-footer">
                  <span>
                    📝 {module.questions.length} Quiz Questions
                  </span>

                  <button
                    onClick={() => openMaterial(module)}
                  >
                    📖 Study Material
                  </button>

                  {learningProgress[module.id]?.completed ? (
                    <button
                      onClick={() => startModule(module)}
                    >
                      Retake Quiz
                    </button>
                  ) : (
                    <button
                      onClick={() => startModule(module)}
                    >
                      Start Learning
                    </button>
                  )}
                </div>
              </div>
            ))}
          </div>

          <div className="learning-note">
            <h2>📚 Learning & Assessment</h2>

            <p>
              Study the learning material and attempt the quiz to check your
              understanding. Your quiz score and completion status are saved
              for your account.
            </p>
          </div>
        </>
      )}

      {selectedMaterial && (
        <div className="material-section">
          <button
            className="back-learning-button"
            onClick={closeMaterial}
          >
            ← Back to Learning Modules
          </button>

          <div className="material-card">
            <div className="material-icon">
              {selectedMaterial.icon}
            </div>

            <span className="learning-category">
              {selectedMaterial.category}
            </span>

            <h2>{selectedMaterial.materialTitle}</h2>

            <p className="material-introduction">
              {selectedMaterial.materialIntroduction}
            </p>

            <div className="material-points">
              <h3>🏛️ Heritage Details</h3>

              {selectedMaterial.heritageEntries.map((entry) => (
                <div
                  key={entry.name}
                  style={{
                    marginBottom: '20px',
                    paddingBottom: '20px',
                    borderBottom: '1px solid #ead8c8'
                  }}
                >
                  <h4
                    style={{
                      margin: '0 0 8px',
                      color: '#4b2415',
                      fontSize: '19px'
                    }}
                  >
                    {entry.name}
                  </h4>

                  <p
                    style={{
                      margin: '6px 0',
                      color: '#765f52'
                    }}
                  >
                    📍 <strong>Location:</strong> {entry.location}
                  </p>

                  <p
                    style={{
                      margin: '6px 0',
                      color: '#765f52'
                    }}
                  >
                    🕐 <strong>Time Period:</strong> {entry.timePeriod}
                  </p>

                  <p
                    style={{
                      margin: '8px 0',
                      color: '#765f52',
                      lineHeight: '1.7'
                    }}
                  >
                    {entry.description}
                  </p>

                  <p
                    style={{
                      margin: '8px 0 0',
                      color: '#765f52'
                    }}
                  >
                    📚 <strong>Source:</strong>{' '}
                    <a
                      href={entry.sourceUrl}
                      target="_blank"
                      rel="noreferrer"
                    >
                      {entry.sourceName}
                    </a>
                  </p>
                </div>
              ))}
            </div>

            <div className="material-points">
              <h3>📌 Key Learning Points</h3>

              <ul>
                {selectedMaterial.keyPoints.map((point, index) => (
                  <li key={`${selectedMaterial.id}-${index}`}>
                    {point}
                  </li>
                ))}
              </ul>
            </div>

            <div className="material-actions">
              <button
                onClick={() =>
                  downloadMaterial(selectedMaterial)
                }
              >
                📥 Download Material
              </button>

              <button
                className="secondary-result-button"
                onClick={() => startModule(selectedMaterial)}
              >
                📝 Attempt Quiz
              </button>
            </div>
          </div>
        </div>
      )}

      {selectedModule && !quizCompleted && (
        <div className="quiz-section">
          <button
            className="back-learning-button"
            onClick={closeModule}
          >
            ← Back to Learning Modules
          </button>

          <div className="quiz-header">
            <div className="quiz-icon">
              {selectedModule.icon}
            </div>

            <span>{selectedModule.category}</span>

            <h2>{selectedModule.title} Quiz</h2>

            <p>
              Question {currentQuestion + 1} of{' '}
              {selectedModule.questions.length}
            </p>
          </div>

          <div className="quiz-card">
            <h3>
              {selectedModule.questions[currentQuestion].question}
            </h3>

            <div className="quiz-options">
              {selectedModule.questions[
                currentQuestion
              ].options.map((option) => (
                <button
                  key={option}
                  className={
                    selectedAnswer === option
                      ? 'quiz-option selected'
                      : 'quiz-option'
                  }
                  onClick={() => handleAnswer(option)}
                >
                  {option}
                </button>
              ))}
            </div>

            <button
              className="quiz-submit-button"
              onClick={submitAnswer}
            >
              {currentQuestion ===
              selectedModule.questions.length - 1
                ? 'Finish Quiz'
                : 'Next Question'}
            </button>
          </div>
        </div>
      )}

      {selectedModule && quizCompleted && (
        <div className="quiz-result">
          <div className="result-icon">🎓</div>

          <p>QUIZ COMPLETED</p>

          <h2>Well Done!</h2>

          <div className="score-box">
            <span>Your Score</span>

            <strong>
              {score} / {selectedModule.questions.length}
            </strong>
          </div>

          <p>
            You have completed the {selectedModule.title} learning
            module.
          </p>

          <div className="result-actions">
            <button onClick={restartQuiz}>
              Try Again
            </button>

            <button
              className="secondary-result-button"
              onClick={closeModule}
            >
              Back to Learning
            </button>
          </div>
        </div>
      )}
    </section>
  )
}

export default LearningHub