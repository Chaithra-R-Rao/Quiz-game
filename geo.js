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
        question: 'On which continent is the Sahara Desert located?',
        choice1: 'Asia',
        choice2: 'South America',
        choice3: 'Africa',
        choice4: 'Europe',
        answer: 3,
    },
    {
        question: 'What is the capital of Italy?',
        choice1: 'Venice',
        choice2: 'Florence',
        choice3: 'Naples',
        choice4: 'Rome',
        answer: 4,
    },
    {
        question: 'Which of the following hills connect Eastern and Western Ghats?',
        choice1: 'Satpura',
        choice2: 'Nilgiri',
        choice3: 'Aravali',
        choice4: 'Vindhya',
        answer: 2,
    },
    {
        question: 'How many countries are there in the world?',
        choice1: '105',
        choice2: '145',
        choice3: '195',
        choice4: '245',
        answer: 3,
    }
    ,
    {
        question: 'How many countries does China share a border with?',
        choice1: '14',
        choice2: '19',
        choice3: '10',
        choice4: '7',
        answer: 1,
    },
    {
        question: 'What is the capital city of Brazil?',
        choice1: 'Santiago',
        choice2: 'Buenos Aires',
        choice3: 'Brasília',
        choice4: 'Rio de Janeiro',
        answer: 3
    },
    {
        question: 'What is the largest country in the world by land area?',
        choice1: 'Canada',
        choice2: 'Russia',
        choice3: 'Australia',
        choice4: 'China',
        answer: 2
      },
      {
        question: 'What is the longest river in Africa?',
        choice1: 'Nile River',
        choice2: 'Congo River',
        choice3: 'Zambezi River',
        choice4: 'Niger River',
        answer: 1
      },
      {
        question: 'What is the smallest continent by land area?',
        choice1: 'Europe',
        choice2: 'Australia',
        choice3: 'Antarctica',
        choice4: 'South America',
        answer: 2
      },
      {
        question: 'What is the capital city of Canada?',
        choice1: 'Toronto',
        choice2: 'Ottawa',
        choice3: 'Montreal',
        choice4: 'Vancouver',
        answer: 2
      },
      {
        question: 'What is the highest mountain in Africa?',
        choice1: 'Mount Kilimanjaro',
        choice2: 'Mount Kenya',
        choice3: 'Mount Meru',
        choice4: 'Mount Elgon',
        answer: 1
      },
      {
        question: 'What is the largest island in the world?',
        choice1: 'Greenland',
        choice2: 'Madagascar',
        choice3: 'Borneo',
        choice4: 'Australia',
        answer: 1
      },
      {
        question: 'What is the capital city of India?',
        choice1: 'Mumbai',
        choice2: 'Kolkata',
        choice3: 'New Delhi',
        choice4: 'Chennai',
        answer: 3
      },
      {
        question: 'What is the largest ocean in the world?',
        choice1: 'Atlantic Ocean',
        choice2: 'Indian Ocean',
        choice3: 'Arctic Ocean',
        choice4: 'Pacific Ocean',
        answer: 4
      },
      {
        question: 'What is the capital city of Spain?',
        choice1: 'Barcelona',
        choice2: 'Madrid',
        choice3: 'Seville',
        choice4: 'Valencia',
        answer: 2
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