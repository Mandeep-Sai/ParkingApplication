import React from 'react'
import "../styles/LoginExpired.css"
import {useHistory} from "react-router-dom"

export default function LoginExpired() {
    const history = useHistory()
    return (
        <div id="loginExpired">
            <h3>Login Expired!!</h3>
            <h5>Please Login again</h5>
            <button onClick={()=>history.push("/signin")}>SIGN IN</button>
        </div>
    )
}
