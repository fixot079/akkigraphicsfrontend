import React, {useState, useEffect} from 'react'
import { removeCaptionFromFileName } from '../../(admin)/(dashboard)/dashboard'
import { removeExtensionsFromName } from '../../(admin)/(dashboard)/dashboard'
import { getCaptionFromFileName } from '../../(admin)/(dashboard)/dashboard'
import Spinner from '../(spinner)/spinner'
import Imagecomp from '../(image)/imagecomp'

const Organisations = () => {
  // Address
  const backendaddress = "https://akkigraphicsbackend.onrender.com"

  // States
    const [orgArray, setOrgArray] = useState([])
    const [orgIsLoading, setOrgIsLoading] = useState(true)

  // Use Effect
    useEffect(() => {
        fetch(`${backendaddress}/getimages/organisations`)
        .then((response) => response.json())
        .then((data) => {
          const imageNames = data.images;
    
          setOrgArray(imageNames);
          setOrgIsLoading(false)
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

