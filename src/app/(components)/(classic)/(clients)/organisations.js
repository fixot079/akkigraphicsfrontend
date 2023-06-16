import React, {useState, useEffect} from 'react'
import Spinner from '../(spinner)/spinner'
import Imagecomp from '../(image)/imagecomp'
import { removeCaptionFromFileName } from '../../(admin)/(dashboard)/dashboard'
import { removeExtensionsFromName } from '../../(admin)/(dashboard)/dashboard'
import { getCaptionFromFileName } from '../../(admin)/(dashboard)/dashboard'

const Organisations = () => {
  const  backendaddress = "https://akkigraphicsbackend.onrender.com"
    const [orgArray, setOrgArray] = useState([])
    const [orgIsLoading, setOrgIsLoading] = useState(true)
    useEffect(() => {
        fetch(`${backendaddress}/getimages/organisations`)
        .then((response) => response.json())
        .then((data) => {
          // Access the array of image names
          const imageNames = data.images;
    
          // Process the image names as needed
          setOrgArray(imageNames);
          setOrgIsLoading(false)
          
        })
        .catch((error) => {
          console.error('Request failed:', error);
        })
    }, [])
    return (
        <>
               {orgIsLoading &&  <Spinner key={Date.now()+Math.random()*9999}/>}
               {orgArray.length!==0 && orgArray.map((imagesource)=>{
                  return <div className="org-profile" key={Date.now()+Math.random()*9999}><Imagecomp source={`${backendaddress}/images/organisations/`+imagesource} classes="client-image org-img" key={Date.now()+imagesource}/>
                  <p className="client-name inter org-client-name">{removeCaptionFromFileName(removeExtensionsFromName(imagesource))}</p>
                  <p className="client-name inter org-client-txt">{removeCaptionFromFileName(removeExtensionsFromName(imagesource))!==getCaptionFromFileName(removeExtensionsFromName(imagesource))?getCaptionFromFileName(removeExtensionsFromName(imagesource)):""}</p>
                  </div>
               })}
        </>
    )
}

export default Organisations
