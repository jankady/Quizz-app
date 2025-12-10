

export default function Question(props)
{
    const styles = props.active ? "bg-button_bg text-primary border-1 border-button_bg rounded-2xl px-4 py-1 mx-2 hover:cursor-pointer " +
        "hover:bg-button_bg hover:border-button_bg transition-colors "
        : "bg-background text-primary border-1 border-button rounded-2xl px-4 py-1 mx-2 hover:cursor-pointer " +
        "hover:bg-button_bg hover:border-button_bg transition-colors "

    const answersElements = props.anwsers.map((oneAnswer)=>{
        return(
            <button className={styles}
             >
                {oneAnswer}
            </button>
        )
    })

    return(<div className="">
        <h2 className="font-semibold text-lg mb-2">{props.question}</h2>
        {answersElements}
        <br/>
    </div>)
}