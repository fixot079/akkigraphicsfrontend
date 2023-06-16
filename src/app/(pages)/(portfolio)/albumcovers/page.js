"use client"
import React, {useEffect, useState} from 'react'
import { imageZoomLayout } from '../layout'
import Imagecomp from '../../../(components)/(classic)/(image)/imagecomp'
import Spinner from '../../../(components)/(classic)/(spinner)/spinner'
import './albumcovers.css'

const Albumcovers = () => {
  // States
  const [imgArray, setImgArray] = useState([])
  const [isLoading, setIsLoading] = useState(true)

  // Address 
  const backendaddress = "https://akkigraphicsbackend.onrender.com"

  // Use Effect
  useEffect(() => {
    // Fetch album covers
    fetch(`${backendaddress}/getimages/albumcovers`)
      .then(r => r.json())
      .then(data => {
        const imageNames = data.images;

        setImgArray(imageNames);
        setIsLoading(false)
      })
  }, []); 
  
  useEffect(()=>{
    imageZoomLayout()
  })

    return (
        <>
          <div class="image-container">
              {isLoading && <Spinner />}
              {!isLoading && 
              imgArray.map((imagesource)=>{
                return <Imagecomp source={`${backendaddress}/images/albumcovers/` + imagesource} classes="images" />
              })
              }
          </div>
        </>
    )
}

export default Albumcovers

