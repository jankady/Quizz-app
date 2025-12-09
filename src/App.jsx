import React from 'react'

function App() {

    const [gameScreen, setGameScreen] = React.useState(0)

    function startQuiz() {
        console.log("Quiz started")
    }

    return(
        <main className="text-center  text-primary flex flex-col justify-start pt-30 items-center min-h-screen px-4 gap-2 text-lg">
            <h1 className="font-bold text-2xl">Quizzical</h1>
            <p className="text-m font-light">Some description if needed</p>
            <button onClick={startQuiz} className="bg-button mt-3 rounded-lg  text-background px-6 py-2 hover:cursor-pointer">Start quiz</button>
        </main>
    )
}

export default App
