
export default function Question(props)
{
    const answersElements = props.anwsers.map((oneAnswer, index)=>{

        // Determine styles based on the current state. Pretty complicated logic for styling, could be better
        const activeStyle = props.active === index ? "bg-button_bg " : "bg-background "
        const wasRightStyle = props.isOver && props.active === index ?
            (oneAnswer === props.rightAnwser? "bg-right border-right opacity-100 " :
                "bg-wrong border-wrong opacity-50 "): ""
        const isOverStyle = props.isOver ? "opacity-50 " : ""
        const markRightStyle = props.isOver && oneAnswer === props.rightAnwser && props.active !== index ? "bg-right border-right opacity-100 " : ""

        // Rendering each answer button with styles and behavior
        return(
            <button className={"text-primary border-1 border-button_bg rounded-2xl px-4 py-1 m-2 hover:cursor-pointer " +
                "hover:bg-button_bg hover:border-button transition-colors " + isOverStyle + activeStyle + wasRightStyle + markRightStyle}
                    onClick={()=>props.toggleButton(oneAnswer)}
                    key={oneAnswer}
                    disabled={props.isOver}
             >
                {oneAnswer}
            </button>
        )
    })

    // Rendering the question and its answers
    return(<div className="mb-3">
        <h2 className="font-semibold text-lg mb-2">{props.question}</h2>
        {answersElements}
        <hr className="mt-3 border-t-button_bg"/>
    </div>)
}