import React, {useState, useEffect} from 'react'
import Imagecomp from '../(image)/imagecomp'
import Spinner from '../(spinner)/spinner'
import { removeExtensionsFromName } from '../../(admin)/(dashboard)/dashboard'
import '../../../(pages)/overview/overview.css'
const Clients = () => {
  const  backendaddress = "https://akkigraphicsbackend.onrender.com"
    const [isLoading, setIsLoading] = useState(true)
    const [imgArray, setImgArray] = useState([])

    useEffect(()=>{
        fetch(`${backendaddress}/getimages/clients`)
        .then(response => response.json())
        .then(data => {
          // Access the array of image names
          const imageNames = data.images;
  
          // Process the image names as needed
          setImgArray(imageNames);
          setIsLoading(false)
        })
        .catch(error => {
          console.error('Request failed:', error);
        });
    },[])
    return (
        <>
        {/* {isLoading && <Spinner />} */}
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
