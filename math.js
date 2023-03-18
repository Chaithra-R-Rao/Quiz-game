const question = document.querySelector('#question');
const choices = Array.from(document.querySelectorAll('.choice-text'));
const progressText = document.querySelector('#progressText');
const scoreText = document.querySelector('#score');
const progressBarFull = document.querySelector('#progressBarFull');

let currentQuestion = {} ;
let acceptingAnswers = true;
let score = 0;
let questionsCounter = 0;
let availableQuestions = {};

let questions = [
    {
        question:'What is 121 times 11??',
        choice1: '1331',
        choice2: '1313',
        choice3: '1133',
        choice4: '3131',
        answer: 1,
    },
    {
        question: 'What is 7% equal to?',
        choice1: '0.007',
        choice2: '0.07',
        choice3: '0.7',
        choice4: '7',
        answer: 2,
    },
    {
        question: 'what is three fifth of 100?',
        choice1: '3',
        choice2: '5',
        choice3: '20',
        choice4: '60',
        answer: 4,
    },
    {
        question: 'If ‘+’ means ‘×’, ‘-‘ means ‘+’, ‘×’ means ‘÷’ and ‘÷’ means ‘-‘ then find the value of 6 – 9 + 8 × 3 ÷ 20 = ……. .',
        choice1: '6',
        choice2: '-2',
        choice3: '10',
        choice4: '12',
        answer: 3,
    },
    {
        question: 'What is the value of pi (π) to two decimal places?',
        choice1: '3.15',
        choice2: '3.14',
        choice3: '3.16',
        choice4: '3.13',
        answer: 2
      },
      {
        question: 'Which of the following is a prime number?',
        choice1: '10',
        choice2: '13',
        choice3: '15',
        choice4: '20',
        answer: 2
      },
      {
        question: 'What is the square root of 81?',
        choice1: '6',
        choice2: '8',
        choice3: '9',
        choice4: '10',
        answer: 3
      },
      {
        question: 'What is the equation of a straight line with a slope of 2 and a y-intercept of 3?',
        choice1: 'y = 2x + 3',
        choice2: 'y = 3x + 2',
        choice3: 'x = 2y + 3',
        choice4: 'x = 3y + 2',
        answer: 1
      },
      {
        question: 'What is the result of 5 + 7 × 3?',
        choice1: '36',
        choice2: '26',
        choice3: '56',
        choice4: '20',
        answer: 2
      },
      {
        question: 'What is the value of sin(30°)?',
        choice1: '1/2',
        choice2: '1',
        choice3: '2',
        choice4: '0',
        answer: 1
      },
      {
        question: 'What is the value of log10(100)?',
        choice1: '1',
        choice2: '2',
        choice3: '0',
        choice4: '-1',
        answer: 2
      },
      {
        question: 'What is the value of 2 to the power of 5?',
        choice1: '10',
        choice2: '16',
        choice3: '32',
        choice4: '64',
        answer: 3
      },
      {
        question: 'What is the value of cos(60°)?',
        choice1: '1/2',
        choice2: '1',
        choice3: '2',
        choice4: '0',
        answer: 1
      },
      {
        question: 'What is the result of  4 + 5 × 6?',
        choice1: '34',
        choice2: '37',
        choice3: '54',
        choice4: '30',
        answer: 1
      },
      {
        question: 'What is the square root of 169?',
        choice1: '11',
        choice2: '12',
        choice3: '13',
        choice4: '14',
        answer: 3
      }           
]

const SCORE_POINTS = 100
const MAX_QUESTIONS = 5

startGame = () => {
    questionsCounter = 0
    score = 0
    availableQuestions = [...questions]
    getNewQuestion()
}

getNewQuestion = () => {
    if(availableQuestions.length === 0 || questionsCounter > MAX_QUESTIONS-1){
        localStorage.setItem('mostRecentScore',score)

        return window.location.assign('end.html')
    }

    questionsCounter++
    progressText.innerText = `Question ${questionsCounter} of ${MAX_QUESTIONS}`
    progressBarFull.style.width = `${(questionsCounter/MAX_QUESTIONS) * 100}% `

    const questionsIndex = Math.floor(Math.random() * availableQuestions.length)
    currentQuestion = availableQuestions[questionsIndex]
    question.innerText = currentQuestion.question

    choices.forEach(choice =>{
        const number = choice.dataset['number']
        choice.innerText = currentQuestion['choice' + number]
    })

    availableQuestions.splice(questionsIndex,1)

    acceptingAnswers = true
}

choices.forEach(choice => {
    choice.addEventListener('click',e =>{
        if(!acceptingAnswers) return

        acceptingAnswers = false
        const selectedChoice = e.target
        const selectedAnswer = selectedChoice.dataset['number']

        let classToApply = selectedAnswer == currentQuestion.answer ? 'correct' : 'incorrect'

        if(classToApply ==='correct') {
            incrementScore(SCORE_POINTS)   /*increments if selected answer is correct*/
        }

        selectedChoice.parentElement.classList.add(classToApply)
        
        setTimeout(() =>{
            selectedChoice.parentElement.classList.remove(classToApply)
            getNewQuestion()
        }, 1000)
    })
})

incrementScore = num => {
    score += num
    scoreText.innerText = score
}

startGame()