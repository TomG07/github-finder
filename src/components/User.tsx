import { Link } from "react-router-dom";
import { UserProps } from "../types/user";

import { MdLocationPin } from "react-icons/md";

import classes from "../styles/User.module.css"

const User = ({ login, avatar_url, followers, location, following}: UserProps) => {

    return (
        <div className={classes.user}>
            <img src={avatar_url} alt={login} />

            <Link to={`https://github.com/${login}`} className={classes.linkLogin}>
                <h2>{login}</h2>
            </Link>

            {location && 
                <p className={classes.location}>
                    <MdLocationPin />
                    <span>{location}</span>
                </p>
            }

            <div className={classes.stats}>
                <div>
                    <p>Seguidores:</p>
                    <p className={classes.number}>{followers}</p>
                </div>

                <div>
                    <p>A seguir:</p>
                    <p className={classes.number}>{following}</p>
                </div>
            </div>

            <Link to={`/repos/${login}`} className={classes.repos}>Ver repositórios</Link>
        </div>
    )
}

export default User