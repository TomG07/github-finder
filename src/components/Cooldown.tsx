const Cooldown = (props: {time: number | null}) => {
    return (
        <div>
            {props.time && 
                <p>Aguarde {props.time}s</p>
            }
        </div>
    )
}

export default Cooldown