import Button from '@material-ui/core/Button'
import React from 'react'
import { auth, provider } from './firebas'
import './Login.css'
import { actionTypes } from './reducer'
import { useStateValue } from './StateProvider'

function Login() {
    const [{},dispatch] = useStateValue();
    const Signin=()=>{
        auth.signInWithPopup(provider)
        .then((result)=>{
            dispatch({
                type:actionTypes.SET_USER,
                user:result.user,   
            })
        }
        ).catch((error)=>alert(error.message))
    }
    return (
        <div className="login">
            <div className="login__container">
                <img src="https://upload.wikimedia.org/wikipedia/commons/thumb/6/6b/WhatsApp.svg/598px-WhatsApp.svg.png"/>
                <div className="login__ContainerText">
                    <h1>Sign in to Whatsapp</h1>
                    <Button onClick={Signin}>Sign in with Google</Button>
                </div>
            </div>
            
        </div>
    )
}

export default Login
