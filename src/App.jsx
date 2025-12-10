import React from 'react'
import Question from "./Question.jsx";

function App() {

    const [gameScreen, setGameScreen] = React.useState(0)
    const [questions, setQuestions] = React.useState([])


    function shuffleAnwsers(correct_answer, incorrect_answers) {
        const random = Math.floor(Math.random() * (incorrect_answers.length + 1))
        const result = incorrect_answers.toSpliced(random, 0, correct_answer)
        return result.map((oneAnws) => (decodeURIComponent(oneAnws)))
    }

    function toggleButton(id, selectedAnwser) {
        setQuestions(prevQuestions =>{
            return prevQuestions.map((question) => {
                if(question.id === id){
                    for (let i = 0; i < 4; i++) {
                        if (selectedAnwser === question.anwsers[i]) {
                            return {
                                ...question,
                                active: i
                            }
                        }
                    }
                    return{
                        ...question,
                        active: -1
                    }
                }
                return question
            })
        })
    }

    async function startQuiz() {
        console.log("Quiz started")

        try {
            const response = await fetch("https://opentdb.com/api.php?amount=5&type=multiple&encode=url3986")
            const data = await response.json()
            setQuestions(
                data.results.map((questionData, index) => {
                    const anwsers = shuffleAnwsers(questionData.correct_answer, questionData.incorrect_answers)
                        return {
                            id: index,
                            question: decodeURIComponent(questionData.question),
                            correct_answer: decodeURIComponent(questionData.correct_answer),
                            incorrect_answers: questionData.incorrect_answers.map((answ) => decodeURIComponent(answ)),
                            anwsers: anwsers,
                            active: -1,
                        }
                    }
                ))

            setGameScreen(1)
        } catch (error) {
            console.error("Error fetching questions:", error)
        }

    }

    function checkAnwsers() {

    }

    const quizQuestions = questions.map((questionData) => {
        return (<Question
            key={questionData.id}
            question={questionData.question}
            anwsers={questionData.anwsers}
            rightAnwser={questionData.correct_answer}
            active={questionData.active}
            toggleButton={(selectedAnwser)=> toggleButton(questionData.id,selectedAnwser)}
        />)
    })

    return (
        <main
            className="text-center  text-primary flex flex-col justify-start pt-30 items-center min-h-screen px-4 gap-2 text-lg">
            {/*Main Menu*/}
            {gameScreen === 0 ? <h1 className="font-bold text-2xl">Quizzical</h1> : null}
            {gameScreen === 0 ? <p className="text-m font-light">Some description if needed</p> : null}
            {gameScreen === 0 ? <button onClick={startQuiz} className="bg-button mt-3 rounded-lg
              text-background px-6 py-2 hover:cursor-pointer">Start quiz</button> : null}

            {/*Quiz Screen*/}
            {gameScreen === 1 && quizQuestions}
            {gameScreen === 1 && <button
                onClick={checkAnwsers} className="bg-button mt-3 rounded-lg
              text-background px-6 py-2 hover:cursor-pointer"
            >
                Check answers
            </button>}

            {/*Anwser Screen*/}

        </main>
    )
}

export default App
