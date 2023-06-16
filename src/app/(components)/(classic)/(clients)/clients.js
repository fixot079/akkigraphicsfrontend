import React, {useState, useEffect} from 'react'
import { removeExtensionsFromName } from '../../(admin)/(dashboard)/dashboard'
import Imagecomp from '../(image)/imagecomp'
import Spinner from '../(spinner)/spinner'
import '../../../(pages)/overview/overview.css'

const Clients = () => {
  // Address
    const backendaddress = "https://akkigraphicsbackend.onrender.com"

  // States
    const [isLoading, setIsLoading] = useState(true)
    const [imgArray, setImgArray] = useState([])

  // Use Effect
    useEffect(()=>{
        fetch(`${backendaddress}/getimages/clients`)
        .then(response => response.json())
        .then(data => {
          const imageNames = data.images;
  
          setImgArray(imageNames);
          setIsLoading(false)
        })
    },[])

    return (
        <>
        {isLoading && <Spinner />}
         {
          imgArray.map((imagesource)=>{
            return <div className="container" key={Date.now()+Math.random()*9999}><Imagecomp source={`${backendaddress}/images/clients/` + imagesource} classes="client-image" key={Date.now() + imagesource}/>
            <p className="client-name inter">{removeExtensionsFromName(imagesource)}</p></div>
          })
         }
        </>
    )
}

export default Clients

