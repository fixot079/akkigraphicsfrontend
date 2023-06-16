"use client"
import React, {useState, useContext, useEffect} from 'react'
import { Contexts } from '../../../layout'
import './loginboard.css'

const Loginboard = () => {

    // State
    const [text, setText] = useState('Welcome to admin page');
    const [piClass, setPiClass] = useState("password-input")
    const [pError, setPError] = useState(false)
    const [methodType, setMethodType] = useState("button")
    const [password, setPassword] = useState("")
    const [emClass, setEmClass] = useState("loginerrtxt ppins vhidden")

    // Context
    const contexts = useContext(Contexts); 
    const {isLoggedIn, setIsLoggedIn} = contexts

   // Handle password change
    const handlePiChange = (e) => {
        setPassword(e.target.value)
        if(!pError){
        setPiClass("password-input-changed")
        setTimeout(()=>{
            setPiClass("password-input") 
        },500)   
        }
    }

    // Address
    const backendaddress = "https://akkigraphicsbackend.onrender.com"

    // Log the user in
    const handleLoginFormSubmit = (event) => {
        event.preventDefault()
        fetch(`${backendaddress}/login`,{
            method:'POST',
            headers:{
                'Content-Type':'application/json'
            },
            body:JSON.stringify({password})
        }).then((response)=>{
            return response.json()
        }).then((response)=>{
            if(response.success){
                setIsLoggedIn(true)
                localStorage.setItem("authtoken", response.token)
                setPiClass('password-input')
                setPError(false)
                setEmClass("loginerrtxt ppins vhidden")
            } else {
                setPiClass('password-input-error')
                setPError(true)
                setEmClass("loginerrtxt ppins")
            }
        })
    }

    const handleKeyPress = (event) => {
        setMethodType("key")
        if (event.key === 'Enter') {
          handleLoginFormSubmit(event);
        }
    };

    return (
        <>
        <div className="admin-container">
            <center>
                <h1 className='ppins admintxt'>
                    {text}
                </h1>
            </center>
            <form className="login-form" onSubmit={handleLoginFormSubmit}>
                <p className={emClass}>Incorrect Password</p>
                <input type="password" 
                    className={piClass} 
                    required onChange={handlePiChange} 
                    onKeyPress={handleKeyPress}
                />
                <br />
                <div className="btn-container">
                    <input type="submit" 
                        value="Login" 
                        className='login-btn'
                    />
                </div>
            </form>
        </div>
        </>
    )
}

export default Loginboard
