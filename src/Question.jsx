

export default function Question(props)
{
    const answersElements = props.anwsers.map((oneAnswer, index)=>{

        const activeStyle = props.active === index ? "bg-button_bg " : "bg-background "
        const wasRightStyle = props.isOver && props.active === index ?
            (oneAnswer === props.rightAnwser? "bg-right border-right opacity-100 " :
                "bg-wrong border-wrong opacity-50 "): ""
        const isOverStyle = props.isOver ? "opacity-50 " : ""
        const markRightStyle = props.isOver && oneAnswer === props.rightAnwser && props.active !== index ? "bg-right border-right opacity-100 " : ""

        return(
            <button className={"text-primary border-1 border-button_bg rounded-2xl px-4 py-1 mx-2 hover:cursor-pointer " +
                "hover:bg-button_bg hover:border-button transition-colors " + isOverStyle + activeStyle + wasRightStyle + markRightStyle}
                    onClick={()=>props.toggleButton(oneAnswer)}
                    key={oneAnswer}
                    disabled={props.isOver}
             >
                {oneAnswer}

            </button>
        )
    })

    return(<div className="mb-3">
        <h2 className="font-semibold text-lg mb-2">{props.question}</h2>
        {answersElements}
        <hr className="mt-3 border-t-button_bg"/>
    </div>)
}