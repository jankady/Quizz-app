

export default function Question(props)
{

    console.log(props.active)
    const answersElements = props.anwsers.map((oneAnswer, index)=>{

        const styles = props.active === index ? "bg-button_bg text-primary border-1 border-button_bg rounded-2xl px-4 py-1 mx-2 hover:cursor-pointer " +
            "hover:bg-button_bg hover:border-button transition-colors "
            : "bg-background text-primary border-1 border-button rounded-2xl px-4 py-1 mx-2 hover:cursor-pointer " +
            "hover:bg-button_bg hover:border-button transition-colors "

        return(
            <button className={styles}
                    onClick={()=>props.toggleButton(oneAnswer)}
                    key={oneAnswer}
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