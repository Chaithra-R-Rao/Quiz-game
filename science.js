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
        question: 'What is the PH of H2O?',
        choice1: '6',
        choice2: '7',
        choice3: '8',
        choice4: '9',
        answer: 2,
    },
    {
        question: 'What is the other name of Newtons first law of motion?',
        choice1: 'Action-reaction',
        choice2: 'Change in momentum',
        choice3: 'Law of inertia',
        choice4: 'Constant momentum',
        answer: 3,
    },
    {
        question: 'Which of the following compound is mainly used in hand sanitizer?',
        choice1: 'Aldehyde',
        choice2: 'Acetic acid',
        choice3: 'Alcohol',
        choice4: 'Ketone',
        answer: 3,
    }
    ,
    {
        question: 'Name the part of the eye on which image is formed?',
        choice1: 'Retina',
        choice2: 'Lens',
        choice3: 'Optical nerves',
        choice4: 'Brain',
        answer: 1,
    },
    {
        question: 'Name the non-metals which have high melting and boiling point?',
        choice1: 'Gallium',
        choice2: 'Diamond',
        choice3: 'Cesium',
        choice4: 'Lead',
        answer: 2,
    },
    {   question: "What is not a primary color of light?",  
        choice1: "Red",   
        choice2: "Yellow",  
        choice3: "Blue",  
        choice4: "Green",   
        answer: 2 ,
    }, 
    { 
        question: "Which of the following elements is the most abundant in the Earth's atmosphere?",   
        choice1: "Nitrogen",   
        choice2: "Oxygen",   
        choice3: "Carbon",  
        choice4: "Hydrogen", 
        answer: 1 
    }, 
    {   
        question: "What is the smallest unit of matter?",  
        choice1: "Atom",   
        choice2: "Molecule",   
        choice3: "Cell",   
        choice4: "Neuron",  
        answer: 1
    }, 
    {  
        question: "What is the process by which plants make their own food called?",  
        choice1: "Photosynthesis",   
        choice2: "Respiration",   
        choice3: "Fermentation", 
        choice4: "Transpiration",   
        answer: 1, 
    }, 
    {
        question: "Which planet in our solar system is known as the 'Red Planet'?",    
        choice1: "Venus",    
        choice2: "Mars",  
        choice3: "Jupiter",   
        choice4: "Saturn",  
        answer: 2 , 
    }, 
    {  
        question: "Which organ in the human body produces insulin?",  
        choice1: "Liver",   
        choice2: "Pancreas", 
        choice3: "Stomach",  
        choice4: "Kidney",   
        answer: 2 ,
    }, 
    {
        question: "What is the force that holds atoms together in a molecule called?", 
        choice1: "Gravity",   
        choice2: "Magnetism",    
        choice3: "Electromagnetism",  
        choice4: "Chemical bond",  
        answer: 4 ,
    }, 
    { 
        question: "Which of the following is not a type of renewable energy?",    
        choice1: "Solar",   
        choice2: "Wind",  
        choice3: "Nuclear",   
        choice4: "Hydroelectric",   
        answer: 3, 
    }, 
    {  
        question: "What is the largest organ in the human body?",  
        choice1: "Liver",   
        choice2: "Heart",    
        choice3: "Skin",    
        choice4: "Brain",  
        answer: 3 ,
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