'use client'
import React, {useState, useEffect, useContext, createContext} from 'react'
import Script from 'next/script'
import { Contexts } from '../../../layout'
import Loginboard from '../../../(components)/(admin)/(loginboard)/loginboard'
import Spinner from '../../../(components)/(classic)/(spinner)/spinner'
import Adminmain from '../../../(components)/(admin)/(adminmain)/adminmain'
import './admin.css'

export const LoadingContext = createContext()

const AdminLayout = () => {

  // Context
    const contexts = useContext(Contexts)
    const {isLoggedIn, setIsLoggedIn} = contexts

  // States
    const [infoFetched, setInfoFetched] = useState(false)
    const [info, setInfo] = useState("")

  // Address
   const backendaddress = "https://akkigraphicsbackend.onrender.com"

  // Use Effect
      useEffect(()=>{
        fetch(`${backendaddress}/verify`, {
            method: 'POST',
            headers: {
              'authtoken': localStorage.getItem('authtoken')
            }
          }).then((response)=>{
              return response.json()
          }).then((response)=>{
            setInfoFetched(true)
           if(response.success){
            setIsLoggedIn(true)
           } else {
            setIsLoggedIn(false)
           }
          })
      })

    return (
        
        <>
        <LoadingContext.Provider value={{infoFetched, setInfoFetched}}>
          <div className="admin-container">
            {!infoFetched && <Spinner />}
            {infoFetched && isLoggedIn && <Adminmain />}
            {infoFetched && !isLoggedIn && <Loginboard />}
          </div>
        </LoadingContext.Provider>
        </>
    )
}

export default AdminLayout
