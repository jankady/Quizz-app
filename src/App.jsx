import React from 'react'

function App() {

    function startQuiz() {
        console.log("Quiz started")
    }

    return(
        <main className="text-center align-middle text-primary flex flex-col justify-center items-center min-h-screen px-4">
            <h1 className="font-bold text-2xl ">Quizzical</h1>
            <p>Some description if needed</p>
            <button onClick={startQuiz} className="mt-2 p-2 hover:cursor-pointer">Start quiz</button>
        </main>
    )
}

export default App
