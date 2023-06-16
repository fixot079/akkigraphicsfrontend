import React, {useState, useEffect} from 'react'
import Imagecomp from '../(image)/imagecomp';

const Footer = () => {
    const  backendaddress = "https://akkigraphicsbackend.onrender.com"
    const [footerLogo, setFooterLogo] = useState([])
    const [footerLogoIsLoading, setFooterLogoIsLoading] = useState(true)
    const [footerClass, setFooterClass] = useState("")
    const [footerStyle, setFooterStyle] = useState({})
    useEffect(()=>{
      fetch(`${backendaddress}/getimages/footerlogo`)
      .then(response => response.json())
      .then(data => {
        // Process the received image names
        const images = data.images;
        setFooterLogo(images)
        setFooterLogoIsLoading(false)
      })
      .catch(error => {
        console.error(error);
        // Handle any errors that occur during the fetch request
      });
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
