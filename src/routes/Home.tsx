import Search from "../components/Search"
import User from "../components/User"
import Error from "../components/Error"

import { useState } from "react"
import { UserProps } from "../types/user"

const Home = () => {

    const [user, setUser] = useState<UserProps | null>(null)
    const [error, setError] = useState(false)
    const [cooldown, setCooldown] = useState<number | null>(null)

    const loadUser = async (username: string) => {

        if (cooldown) return

        const res = await fetch(`https://api.github.com/users/${username}`)

        const data = await res.json()

        if (res.status === 404) {
            setError(true)
            setUser(null)
            return
        } else {
            setError(false)
        }

        const {
            avatar_url,
            login,
            location,
            followers,
            following
        } = data

        const userData: UserProps = {
            avatar_url,
            login,
            location,
            followers,
            following
        }

        setUser(userData)
        setCooldown(Date.now())

        setTimeout(() => {
            setCooldown(null)
        }, 5000)
    }

    let cooldownProps: {
        time: number | null
    } = {
        time: null
    }

    if (cooldown) {

        const time = Date.now() - cooldown
        
        cooldownProps = {
            time: time <= 0 ? null : time
        }
    }

    return (
        <div>
            <Search loadUser={loadUser} cooldown={cooldownProps.time}/>
            {user && <User {...user}/>}
            {error && <Error />}
        </div>
    )
}

export default Home