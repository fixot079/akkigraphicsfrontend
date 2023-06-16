"use client"
import { useEffect, useState, createContext } from 'react'
import { useRouter } from 'next/navigation';
import Spinner from './(components)/(classic)/(spinner)/spinner';
import Imagecomp from './(components)/(classic)/(image)/imagecomp';
import Navbar from './(components)/(classic)/(navbar)/navbar';
import Footer from './(components)/(classic)/(footer)/footer';
import './globals.css'


export const Contexts = createContext()



// Theme functions 
export function changeToDark(){
  document.documentElement.style.setProperty("--black","white")
  document.documentElement.style.setProperty("--white","#08021e")
  document.documentElement.style.setProperty("--darkbluecolor","rgb(212, 212, 212)")
  document.documentElement.style.setProperty("--dspathbg","#182840")
  document.documentElement.style.setProperty("--admininpshadow","grey")
  document.documentElement.style.setProperty("--pichanged","var(--themecolor)")
  document.documentElement.style.setProperty("--lbshadow","rgb(0 114 255)")
  document.documentElement.style.setProperty("--lbshadowhover","black")
  document.documentElement.style.setProperty("--amoptbg","var(--themecolor)")
  document.documentElement.style.setProperty("--navoverlaybg","rgb(0 0 0 / 87%)")
  document.documentElement.style.setProperty("--footercolor","rgb(11 19 74)")
  document.documentElement.style.setProperty("--hico1bg","rgb(7, 13, 61)")
  document.documentElement.style.setProperty("--hico2bg","rgb(30 5 34)")
  document.documentElement.style.setProperty("--overviewbg","rgb(0 19 60)")
  document.documentElement.style.setProperty("--placeholdercolor","rgb(0 162 255 / 69%)")
  document.documentElement.style.setProperty("--cpbg","rgb(0 16 36)")
  document.documentElement.style.setProperty("--cpbuttonbg","rgb(0 31 64)")
  
  localStorage.setItem("theme","dark")
} 

export function changeToLight(){
  document.documentElement.style.setProperty("--black","#08021e")
  document.documentElement.style.setProperty("--white","white")
  document.documentElement.style.setProperty("--darkbluecolor","rgb(29, 35, 121)")
  document.documentElement.style.setProperty("--dspathbg","#cadfff")
  document.documentElement.style.setProperty("--admininpshadow","white")
  document.documentElement.style.setProperty("--pichanged","white")
  document.documentElement.style.setProperty("--lbshadow","white")
  document.documentElement.style.setProperty("--lbshadowhover","white")
  document.documentElement.style.setProperty("--amoptbg","rgb(230, 241, 250)")
  document.documentElement.style.setProperty("--navoverlaybg","rgb(76 77 114 / 42%)")
  document.documentElement.style.setProperty("--footercolor","rgb(88 194 255)")
  document.documentElement.style.setProperty("--hico1bg","rgb(234 237 255)")
  document.documentElement.style.setProperty("--hico2bg","rgb(252 232 255)")
  document.documentElement.style.setProperty("--overviewbg","rgb(228 245 255)")
  document.documentElement.style.setProperty("--placeholdercolor","#0000007a")
  document.documentElement.style.setProperty("--cpbg","white")
  document.documentElement.style.setProperty("--cpbuttonnbg","rgb(217 235 255)")

  localStorage.setItem("theme","light")
}

export default function RootLayout({ children }) {
  // Router 
  const router = useRouter()

  // States
  const [pageIsLoading, setPageIsLoading] = useState(true)
  const [isLoggedIn, setIsLoggedIn] = useState(false)

  // Address
  const backendaddress = "https://akkigraphicsbackend.onrender.com"

  useEffect(()=>{
      window.addEventListener('error', function(event) {
        if (event.message === 'net::ERR_INSUFFICIENT_RESOURCES') {
          location.reload();
        }
      });
      
      let theme = localStorage.getItem("theme")
      if(theme==null){
        localStorage.setItem("theme","light")
      }
      theme = localStorage.getItem("theme")
      if(theme=="dark"){
      changeToDark()
      }
      else if(theme=="light"){
      changeToLight()
      }

      fetch(`${backendaddress}/verify`, {
        method: 'POST',
        headers: {
          'authtoken': localStorage.getItem('authtoken')
        }
      }).then((response)=>{
          return response.json()
      }).then((response)=>{
      if(response.success){
        setIsLoggedIn(true)
      } else {
        setIsLoggedIn(false)
      }
      })
      setPageIsLoading(false);
  },[])

  return (

    <Contexts.Provider value={{isLoggedIn, setIsLoggedIn}}>
    <html lang="en">
      <head>
      <link rel="stylesheet" href="https://site-assets.fontawesome.com/releases/v6.4.0/css/all.css" />
      <link rel="stylesheet" href="https://site-assets.fontawesome.com/releases/v6.4.0/css/sharp-light.css" />
      <link rel="stylesheet" href="https://site-assets.fontawesome.com/releases/v6.4.0/css/sharp-regular.css" />
      </head>
      <body>
        {pageIsLoading ? <div className="loading-container"><Spinner color="white"/></div> : <>
              <section id="main">
                <Navbar />
                  {children}
              </section>
              <Footer />
        </>}
    </body>
    </html>  
    </Contexts.Provider>
  )
}
