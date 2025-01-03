import { BsSearch } from "react-icons/bs"
import { SearchProps } from "../types/searchProps"
import { useState } from "react"

import classes from "../styles/Search.module.css"
import Cooldown from "./Cooldown"

const Search = ({ loadUser, cooldown }: SearchProps) => {

    const [username, setUsername] = useState("")

    return (
        <div className={classes.search}>
            <h2>Procure um usuário:</h2>
            <div className={classes.container}>
                <input 
                    type="text" 
                    placeholder="Nome do usuário" 
                    onChange={(e) => setUsername(e.target.value)}
                    onKeyDown={(e) => { if (e.key === "Enter") {loadUser(username)}}}
                />
                <button onClick={() => loadUser(username)}>
                    <BsSearch />
                </button>
            </div>
            {cooldown && <Cooldown time={cooldown}/>}
        </div>
    )
}

export default Search