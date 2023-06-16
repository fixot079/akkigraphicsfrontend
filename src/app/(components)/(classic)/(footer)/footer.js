import React, {useState, useEffect} from 'react'
import Imagecomp from '../(image)/imagecomp';
import './footer.css'
const Footer = () => {

    // Address
    const backendaddress = "https://akkigraphicsbackend.onrender.com"

    // States
    const [footerLogo, setFooterLogo] = useState([])
    const [footerLogoIsLoading, setFooterLogoIsLoading] = useState(true)
    const [footerClass, setFooterClass] = useState("")
    const [footerStyle, setFooterStyle] = useState({})

    // Use Effect
    useEffect(()=>{
      fetch(`${backendaddress}/getimages/footerlogo`)
      .then(response => response.json())
      .then(data => {
        const images = data.images;
        setFooterLogo(images)
        setFooterLogoIsLoading(false)
      })
    },[])
 
    return (
        <>
          <footer id="footer" className={footerClass} style={footerStyle}>
              {!footerLogoIsLoading && <Imagecomp source={`${backendaddress}/images/footerLogo/`+footerLogo[0]} id="footer-logo"/>}
              <p className="inter footertext">&copy; Akki Graphics</p>
          </footer>  
        </>
    )
}

export default Footer

