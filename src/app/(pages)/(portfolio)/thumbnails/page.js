"use client"
import React, {useEffect, useState} from 'react'
import { imageZoomLayout } from '../layout'
import Imagecomp from '../../../(components)/(classic)/(image)/imagecomp'
import Spinner from '../../../(components)/(classic)/(spinner)/spinner'
import './thumbnails.css'

const Thumbnails = () => {

  // States
  const [imgArray, setImgArray] = useState([])
  const [isLoading, setIsLoading] = useState(true)
  const [count, setCount] = useState(0)
  const [isAt, setIsAt] = useState("")
  const [thumbnailOption, setThumbnailOption] = useState("")
  const [isLoading1, setIsLoading1] = useState(true)
  const [isLoading2, setIsLoading2] = useState(true)
  const [isLoading3, setIsLoading3] = useState(true)
  const [isLoading4, setIsLoading4] = useState(true)
  const [liveStreamThumbnailCover, setLiveStreamThumbnailCover] = useState([])
  const [manipulatedThumbnailCover, setManipulatedThumbnailCover] = useState([])
  const [realisticThumbnailCover, setRealisticThumbnailCover] = useState([])
  const [mrBeastTypeThumbnailCover, setMrBeastTypeThumbnailCover] = useState([])

  // Address
  const frontendaddress = process.env.NEXT_PUBLIC_FRONTEND_ADDRESS
  const backendaddress = process.env.NEXT_PUBLIC_BACKEND_ADDRESS

  // Use Effect
  useEffect(() => {
  // Thumbnail place handling

    const thumbnailIsAtInLocalStorage = localStorage.getItem("thumbnailIsAt")
    if (!thumbnailIsAtInLocalStorage) {
      localStorage.setItem("thumbnailIsAt", "options")
      setIsAt("options")
    } else {
      setIsAt(thumbnailIsAtInLocalStorage)
    }

    const thumbnailOptionInLocalStorage = localStorage.getItem("thumbnailOption")
    if (thumbnailOptionInLocalStorage) {
      setThumbnailOption(thumbnailOptionInLocalStorage)
    }
    
      fetch(`${backendaddress}/getimages/coverlivestreamthumbnails`)
      .then(r => r.json())
      .then(data => {
        const images = data.images;
        setLiveStreamThumbnailCover(images)
        setIsLoading1(false)
      })

      fetch(`${backendaddress}/getimages/covermanipulatedthumbnails`)
      .then(r => r.json())
      .then(data => {
        const images = data.images;
        setManipulatedThumbnailCover(images)
        setIsLoading2(false)
      })

      fetch(`${backendaddress}/getimages/coverrealisticthumbnails`)
      .then(r => r.json())
      .then(data => {
        const images = data.images;
        setRealisticThumbnailCover(images)
        setIsLoading3(false)
      })

      fetch(`${backendaddress}/getimages/covermrbeasttypethumbnails`)
      .then(r => r.json())
      .then(data => {
        const images = data.images;
        setMrBeastTypeThumbnailCover(images)
        setIsLoading4(false)
        console.log(liveStreamThumbnailCover,manipulatedThumbnailCover,realisticThumbnailCover,mrBeastTypeThumbnailCover)
      })
    
      
  
  }, []); 

  useEffect(()=>{
        // Fetch Thumbnails
        fetch(`${backendaddress}/getimages/${thumbnailOption}`)
        .then(r => r.json())
        .then(data => {
          const imageNames = data.images;
  
          setImgArray(imageNames);
          setIsLoading(false)
        })
  },[thumbnailOption])

  useEffect(()=>{
    imageZoomLayout()
  })

    // Thumbnail go to function
    const thumbnailGoTo = (place, placelocation) => {
      localStorage.setItem("thumbnailIsAt", place)
      setIsAt(place)
      if(place=="thumbnails"){
        setThumbnailOption(placelocation)
        localStorage.setItem("thumbnailOption", placelocation)
      } else {
        localStorage.removeItem("thumbnailOption")
      }
    }

    return (
        <>
          {isAt == "options" && 
          <>
            {isLoading1 || isLoading2 || isLoading3 || isLoading3? <Spinner /> : <>
            <div className="optionimgcontainer">
            {!isLoading1 && <Imagecomp source={`${backendaddress}/images/coverlivestreamthumbnails/` + liveStreamThumbnailCover[0]} classes="optionimg" click={()=>{thumbnailGoTo("thumbnails", "livestreamthumbnails")}} />}
            {!isLoading2 && <Imagecomp source={`${backendaddress}/images/covermanipulatedthumbnails/` + manipulatedThumbnailCover[0]} classes="optionimg" click={()=>{thumbnailGoTo("thumbnails", "manipulatedthumbnails")}} />}
            {!isLoading3 && <Imagecomp source={`${backendaddress}/images/coverrealisticthumbnails/` + realisticThumbnailCover[0]} classes="optionimg" click={()=>{thumbnailGoTo("thumbnails", "realisticthumbnails")}} />}
            {!isLoading4 && <Imagecomp source={`${backendaddress}/images/covermrbeasttypethumbnails/` + mrBeastTypeThumbnailCover[0]} classes="optionimg" click={()=>{thumbnailGoTo("thumbnails", "mrbeasttypethumbnails")}} />}
           </div>
            </>}
           
          </>
          }

          {isAt == "thumbnails" && <div className="image-container">
          {isLoading ? (
              <Spinner />
                        ) : (
              <>
                {imgArray.map((imagesource, index) => {
                 if (index % 2 === 0) {
                    return (
                      <div className="image-pair" key={index}>
                          <Imagecomp source={`${backendaddress}/images/${thumbnailOption}/` + imagesource} 
                          classes="images" 
                          />
                          {index + 1 < imgArray.length && (
                          <Imagecomp source={`${backendaddress}/images/${thumbnailOption}/` + imgArray[index + 1]}
                              classes="images"
                          />
                          )}
                      </div>
                    );
          }
            return null;
          })}
              </>
          )}
              <div className="tocontainer">
                <i className="fa-solid fa-left tarrowicon" onClick={()=>{thumbnailGoTo("options")}}></i>
              </div>
          </div>
          }
        </>
    )
}

export default Thumbnails
