import React, {useState, useEffect, useContext} from 'react'
import { useRouter } from 'next/navigation'
import Spinner from '../(spinner)/spinner';
import Imagecomp from '../(image)/imagecomp';

import { changeToLight } from '../../../layout';
import { changeToDark } from '../../../layout';

import { Contexts } from '../../../layout';

const Navbar = () => {
    const contexts = useContext(Contexts)
    const {isLoggedIn, setIsLoggedIn} = contexts
    const [themeBtnMessage, setThemeBtnMessage] = useState("")
    const [menuIconClass, setMenuIconClass] = useState("navbar-menu-icon")
    const [ulClassList, setUlClassList] = useState("inter hiddenformobile")
    const [bar1ClassList, setBar1ClassList] = useState("bar")
    const [bar2ClassList, setBar2ClassList] = useState("bar")
    const [bar3ClassList, setBar3ClassList] = useState("bar")
    const [navbarOverlayClass, setNavbarOverlayClass] = useState('navbar-overlay navbar-dnone')
    const [isClicked, setIsClicked] = useState(false)

    const frontendaddress = process.env.NEXT_PUBLIC_FRONTEND_ADDRESS
    const backendaddress = process.env.NEXT_PUBLIC_BACKEND_ADDRESS
    const [mainLogo, setMainLogo] = useState([])
    const [mainLogoIsLoading, setMainLogoIsLoading] = useState(true)

   useEffect(()=>{
    fetch(`${backendaddress}/getimages/mainlogo`)
    .then(response => response.json())
    .then(data => {
      // Process the received image names
      const images = data.images;
      setMainLogo(images)
      setMainLogoIsLoading(false)
    })

    if(localStorage.getItem("theme")=="light"){
        setThemeBtnMessage("Dark theme")
    } 
    else if(localStorage.getItem("theme")=="dark"){
        setThemeBtnMessage("Light theme")
    } else {
        setThemeBtnMessage("Dark theme")
    }

   }, [])

   
    const router = useRouter()
    const handleLogoClick = () => {
      router.push('/');
    }

   

    const handleMenuClick = () => {
        if(ulClassList.includes("hiddenformobile")){
          setUlClassList("inter")
        }
        
      
        if (!isClicked) {
          setBar1ClassList("bar bar1rotate")
          setBar2ClassList("bar hiddenformobile")
          setBar3ClassList("bar bar3rotate")
          setUlClassList("inter slideleft")
          setIsClicked(true)
          setMenuIconClass("navbar-menu-icon-cross")
          setNavbarOverlayClass("navbar-overlay navbar-fadein")
        } 
        
        else {
          setBar1ClassList("bar bar1rotateback")
          setBar2ClassList("bar")
          setBar3ClassList("bar bar3rotateback")
          setUlClassList("inter slideRight")
          setIsClicked(false)
          setMenuIconClass("navbar-menu-icon")
          setNavbarOverlayClass("navbar-overlay navbar-fadeout")
          setTimeout(()=>{
            setNavbarOverlayClass("navbar-overlay navbar-dnone")
          },500)
        }
      }
      
        const handleThemeClick = (event) => {
          event.preventDefault();
          if(localStorage.getItem("theme")=="light"){
            changeToDark()
            setThemeBtnMessage("Light theme")
          }
          else if(localStorage.getItem("theme")=="dark"){
            changeToLight()
            setThemeBtnMessage("Dark theme")
          }
        }
      
        const handleLogout = (e) => {
          localStorage.removeItem("authtoken")
          setIsLoggedIn(false)
        }
      
    return (
        <>
      <div className="navbar">
      <div className="navbar-mains" style={{overflow:'hidden'}}>
      {!mainLogoIsLoading && <Imagecomp source={`${backendaddress}/images/mainLogo/`+mainLogo[0]} id="navbar-logo" click={handleLogoClick}/>}
        
        <div className="navbtns">
       { window.matchMedia("(max-width: 768px)").matches?localStorage.getItem("theme")=="dark"?<i className="fa-sharp fa-light fa-moon-over-sun" style={{ transform:'scale(1.5)', background: 'rgb(28 48 84)',padding:'0.3rem', borderRadius: '2rem',color: 'rgb(173 244 255)'}} onClick={handleThemeClick}></i>:<i className="fa-sharp fa-light fa-moon" style={{color:'var(--black)', transform:'scale(1.5)', color:' #005aff', background: '#f6f6ff', borderRadius: '50%', padding: '0.3rem 0.4rem'}} onClick={handleThemeClick}></i>:""}
        <div className={menuIconClass} onClick={handleMenuClick}>
          <div className={bar1ClassList} id="bar1"></div>
          <div className={bar2ClassList} id="bar2"></div>
          <div className={bar3ClassList} id="bar3"></div>
        </div>
      </div>
        </div>
      <ul className={ulClassList} style={isLoggedIn ? { overflow: 'visible', flexWrap: 'wrap' } : null}>
        <li className="main-nav-li"><a href="/"><i className="fa-duotone fa-camera-retro nico"></i>Portfolio</a></li>
        <li className="main-nav-li"><a href="/overview"><i className="fa-sharp fa-solid fa-file-magnifying-glass nico"></i>Overview</a></li>
        <li className="main-nav-li"><a href="/management"><i className="fa-solid fa-list-check nico"></i>Management</a></li>
        <li className="main-nav-li"><a href="/contact"><i className="fa-solid fa-address-book nico"></i>Contact</a></li>
        {isLoggedIn?<><li className="main-nav-li adminli" style={{background:'var(--themecolor)', overflow:'hidden'}}><a href="/$admin" style={{overflow:'visible'}}><i className="fa-solid fa-wrench" style={{transform:'scale(2)', color:'white'}}></i></a></li></>:""}
        {isLoggedIn?<><li className="main-nav-li"><a href="#" onClick={handleLogout}><i className="fa-sharp fa-solid fa-arrow-right-from-bracket nico"></i>Logout</a></li></>:""} 
        {window.matchMedia("(min-width: 768px)").matches? localStorage.getItem("theme")=="dark"?<li className="theme-li"><i className="fa-sharp fa-light fa-moon-over-sun" style={{ transform:'scale(1.5)',background: 'rgb(28 48 84)',padding:'0.3rem', borderRadius: '2rem',color: 'rgb(173 244 255)'}} onClick={handleThemeClick}></i></li>:<li className="theme-li"><i className="fa-sharp fa-light fa-moon" style={{color:'var(--black)', transform:'scale(1.5)', color:' #005aff', background: '#f6f6ff', borderRadius: '50%', padding: '0.3rem 0.4rem'}} onClick={handleThemeClick}></i></li>:""}
      </ul>
    </div>
    <div className={navbarOverlayClass}></div>
        </>
    )
}

export default Navbar
