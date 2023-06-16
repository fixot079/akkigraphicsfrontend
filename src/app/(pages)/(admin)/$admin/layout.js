'use client'
import React, {useState, useEffect, useContext, createContext} from 'react'
import { Contexts } from '../../../layout'
import Loginboard from '../../../(components)/(admin)/(loginboard)/loginboard'
import Spinner from '../../../(components)/(classic)/(spinner)/spinner'
import './admin.css'
import Script from 'next/script'
import Adminmain from '../../../(components)/(admin)/(adminmain)/adminmain'

export const LoadingContext = createContext()

const AdminLayout = () => {
    const contexts = useContext(Contexts)
    const {isLoggedIn, setIsLoggedIn} = contexts
    const [infoFetched, setInfoFetched] = useState(false)
    const [info, setInfo] = useState("")
    const frontendaddress = process.env.NEXT_PUBLIC_FRONTEND_ADDRESS
    const backendaddress = process.env.NEXT_PUBLIC_BACKEND_ADDRESS
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
