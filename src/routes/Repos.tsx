import { useEffect, useState } from "react"
import { Link, useParams } from "react-router-dom"

type reposType = {
    name: string,
    stargazers_count: number,
    html_url: string,
    id: number,
    description: string,
    forks_count: number,
    open_issues_count: number
}

import classes from "../styles/Repos.module.css"

const Repos = () => {

    const { userLogin } = useParams() 

    const [userRes, setUserRes] = useState<reposType[] | null>(null)
    const [loading, setLoading] = useState(false)

    useEffect(() => {
        const fetchUserRepos = async () => {

            setLoading(true)

            try {
                const response = await fetch(`https://api.github.com/users/${userLogin}/repos`)
                const data = await response.json()
                setUserRes(data)
            } catch (e) {
                console.error(e)

                return (
                    <div className={classes.info}>
                        <p>Erro ao procurar</p>
                    </div>
                )
            } finally {
                setLoading(false)
            }
        }

        fetchUserRepos()
    }, [userLogin])

    if (loading) {
        return (
            <div className={classes.info}>
                <p>A carregar dados...</p>
            </div>
        )
    }

    if (!userRes || userRes.length < 1) {
        return (
            <div className={classes.info}>
                <p>Sem dados</p>
            </div>
        )
    }

    console.log(userRes[0])

    return (
        <div className={classes.container}>
            {
                userRes.map((repo) => {
                    return (
                        <div key={repo.id} className={classes.repo}>
                            <Link to={repo.html_url} className={classes.link}>{repo.name}</Link>
                            <div className={classes.desc_container} hidden={repo.description ? false : true}>
                                <p className={classes.desc}>{repo.description}</p>
                            </div>
                            <div className={classes.repo_stats}>
                                <div>
                                    <p>Stars</p>
                                    <p>{repo.stargazers_count}</p>
                                </div>
                                <div>
                                    <p>Forks</p>
                                    <p>{repo.forks_count}</p>
                                </div>
                                <div>
                                    <p>Issues</p>
                                    <p>{repo.open_issues_count}</p>
                                </div>
                            </div>
                        </div>
                    )
                })
            }
        </div>
    )
}

export default Repos