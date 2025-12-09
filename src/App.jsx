import React from 'react'

function App() {

    const [gameScreen, setGameScreen] = React.useState(0)

    function startQuiz() {
        console.log("Quiz started")

        fetch("https://opentdb.com/api.php?amount=5&encode=url3986").then(res => res.json())
            .then(data => console.log(decodeURI(data.results[0].question)))
        // console.log(data.results)
        setGameScreen(1)
    }

    return(
        <main className="text-center  text-primary flex flex-col justify-start pt-30 items-center min-h-screen px-4 gap-2 text-lg">
            {/*Main Menu*/}
            {gameScreen === 0 ? <h1 className="font-bold text-2xl">Quizzical</h1> : null}
            {gameScreen === 0 ? <p className="text-m font-light">Some description if needed</p> : null}
            {gameScreen === 0 ? <button onClick={startQuiz} className="bg-button mt-3 rounded-lg
              text-background px-6 py-2 hover:cursor-pointer">Start quiz</button> : null}

            {/*Quiz Screen*/}

            {/*Anwser Screen*/}

        </main>
    )
}

export default App
