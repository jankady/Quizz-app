import React from 'react'
import Question from "./Question.jsx";

function App() {

    // States, Game screens: 0 - Main Menu, 1 - Quiz, 2 - Anwser Screen
    const [gameScreen, setGameScreen] = React.useState(0)
    const [questions, setQuestions] = React.useState([])

    // Check if the game is over
    const isOver = gameScreen === 2

    // Function to shuffle right anwser among incorrect ones
    function shuffleAnwsers(correct_answer, incorrect_answers) {
        const random = Math.floor(Math.random() * (incorrect_answers.length + 1))
        const result = incorrect_answers.toSpliced(random, 0, correct_answer)
        return result.map((oneAnws) => (decodeURIComponent(oneAnws)))
    }

    // Function to toggle selected anwser button
    function toggleButton(id, selectedAnwser) {
        if (!isOver) setQuestions(prevQuestions => {
            return prevQuestions.map((question) => {
                if (question.id === id) {
                    for (let i = 0; i < 4; i++) {
                        if (selectedAnwser === question.anwsers[i]) {
                            return {
                                ...question, active: i
                            }
                        }
                    }
                    return {
                        ...question, active: -1
                    }
                }
                return question
            })
        })
    }

    // Function to start the quiz by fetching questions from API
    async function startQuiz() {
        try {
            const response = await fetch("https://opentdb.com/api.php?amount=5&type=multiple&encode=url3986")
            const data = await response.json()
            setQuestions(data.results.map((questionData, index) => {
                const anwsers = shuffleAnwsers(questionData.correct_answer, questionData.incorrect_answers)
                return {
                    id: index,
                    question: decodeURIComponent(questionData.question),
                    correct_answer: decodeURIComponent(questionData.correct_answer),
                    incorrect_answers: questionData.incorrect_answers.map((answ) => decodeURIComponent(answ)),
                    anwsers: anwsers,
                    active: -1,
                }
            }))
            setGameScreen(1)
        } catch (error) {
            console.error("Error fetching questions:", error)
        }
    }

    // Function to check if all questions are answered before showing results
    function checkAnwsers() {
        const allAnswered = questions.every((question) => question.active !== -1)
        if (!allAnswered) {
            alert("Please answer all questions before checking answers.")
            return
        }
        setGameScreen(2)
    }

    // Mapping questions to Question components
    const quizQuestions = questions.map((questionData) => {
        return (<Question
            key={questionData.id}
            question={questionData.question}
            anwsers={questionData.anwsers}
            rightAnwser={questionData.correct_answer}
            active={questionData.active}
            toggleButton={(selectedAnwser) => toggleButton(questionData.id, selectedAnwser)}
            isOver={isOver}
        />)
    })

    // Calculating total correct answers
    const totalAnwsersRight = questions.reduce((total, question) => {
        if (question.anwsers[question.active] === question.correct_answer) {
            return total + 1
        } else {
            return total
        }
    }, 0)

    return (<main
        className="text-center  text-primary flex flex-col justify-start pt-30 items-center min-h-screen px-4 gap-2 text-lg">
        {/*Main Menu*/}
        {gameScreen === 0 ? <h1 className="font-bold text-2xl">Quizzical</h1> : null}
        {gameScreen === 0 ? <p className="text-m font-light">Test how smart you are</p> : null}
        {gameScreen === 0 ? <button onClick={startQuiz} className="bg-button mt-3 rounded-lg
              text-background px-6 py-2 hover:cursor-pointer  hover:text-primary">Start quiz</button> : null}

        {/*Quiz Screen*/}
        {gameScreen === 1 && quizQuestions}
        {gameScreen === 1 && <button
            onClick={checkAnwsers} className="bg-button mt-3 rounded-lg
              text-background px-6 py-2 hover:cursor-pointer hover:text-primary">
            Check answers
        </button>}

        {/*Anwser Screen*/}
        {gameScreen === 2 && quizQuestions}
        {gameScreen === 2 && <div className="flex items-center align-middle gap-3 my-2">
            <p className="text-primary font-bold tracking-wider">You scored {totalAnwsersRight}/5 correct answers</p>
            <button
                onClick={startQuiz} className="bg-button rounded-lg
              text-background px-6 py-2 hover:cursor-pointer hover:text-primary text-nowrap">
                Play again
            </button>
        </div>
        }
    </main>)
}

export default App
