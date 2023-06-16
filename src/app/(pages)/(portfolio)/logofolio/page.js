"use client"
import React, {useState, useEffect} from 'react'
import { imageZoomLayout } from '../layout'
import Imagecomp from '../../../(components)/(classic)/(image)/imagecomp'
import Spinner from '../../../(components)/(classic)/(spinner)/spinner'
import Portfolionavigation from '../../../(components)/(classic)/(portfolionav)/pnav'
import './logofolio.css'

const Logofolio = () => {
  // State
  const [imgArray, setImgArray] = useState([])
  const [isLoading, setIsLoading] = useState(true)

  // Address
  const frontendaddress = process.env.NEXT_PUBLIC_FRONTEND_ADDRESS
  const  backendaddress = process.env.NEXT_PUBLIC_BACKEND_ADDRESS

  // Use Effect
  useEffect(() => {
    // Fetch logos
    fetch(`${backendaddress}/getimages/logofolio`)
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
          <div className="image-container">
              {isLoading && <Spinner />}
              {!isLoading && 
              imgArray.map((imagesource)=>{
                return <Imagecomp source={`${backendaddress}/images/logofolio/` + imagesource} classes="images" />
              })
              }
          </div>
        </>
    )
}

export default Logofolio
