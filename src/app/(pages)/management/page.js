"use client"
import React, {useState, useEffect} from 'react'
import './management.css'

const Management = () => {
  // Address
  const backendaddress = "https://akkigraphicsbackend.onrender.com"

  // States
    const [textObject, setTextObject] = useState({})

  // Use Effect
    useEffect(()=>{
        fetch(`${backendaddress}/management/get`)
        .then((r) => r.json())
        .then((r) => {
          setTextObject(r);
      })
    },[])
    return (
        <>
            <div className="managementsection">
            <h1 className="ppins mtxt1">{textObject.h1}</h1><br />
                <p className="inter mtxt2">{textObject.p1}
                <br /><br /> 
                {textObject.p2} 
                <br /><br /> 
                {textObject.p3} 
                <br /><br />
                {textObject.p4}
                </p>
            </div>
        </>
    )
}

export default Management

