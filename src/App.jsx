import React from 'react'
import Question from "./Question.jsx";

function App() {

    const [gameScreen, setGameScreen] = React.useState(0)
    const [questions, setQuestions] = React.useState([])

    function shuffleAnwsers(correct_answer, incorrect_answers){
        const random = Math.floor(Math.random() * (incorrect_answers.length + 1))
        const result =  incorrect_answers.toSpliced(random,0,correct_answer)
        return result.map((oneAnws) => {
            return decodeURIComponent(oneAnws)
        })
    }

   async function startQuiz() {
        console.log("Quiz started")

        try {
            const response = await fetch("https://opentdb.com/api.php?amount=5&encode=url3986")
            const data = await response.json()
            setQuestions(()=>{
                return data.results.map((questionData, index) =>{

                   const anwsers = shuffleAnwsers(questionData.correct_answer, questionData.incorrect_answers)
                    // const anwsers =
                    console.log(questionData)
                    return (<Question
                        key={index}
                        question={decodeURIComponent(questionData.question)}
                        anwsers={anwsers}
                        rightAnwser={decodeURIComponent(questionData.correct_answer)}
                        active={false}
                    />)
                })
            })
            setGameScreen(1)
        }
        catch (error) {
            console.error("Error fetching questions:", error)
        }

    }

    return(
        <main className="text-center  text-primary flex flex-col justify-start pt-30 items-center min-h-screen px-4 gap-2 text-lg">
            {/*Main Menu*/}
            {gameScreen === 0 ? <h1 className="font-bold text-2xl">Quizzical</h1> : null}
            {gameScreen === 0 ? <p className="text-m font-light">Some description if needed</p> : null}
            {gameScreen === 0 ? <button onClick={startQuiz} className="bg-button mt-3 rounded-lg
              text-background px-6 py-2 hover:cursor-pointer">Start quiz</button> : null}

            {/*Quiz Screen*/}
            { gameScreen === 1 && questions}

            {/*Anwser Screen*/}

        </main>
    )
}

export default App
