import React, { useState, createContext, useEffect } from 'react'
import Dashboard from '../(dashboard)/dashboard'
import './adminmain.css'

// Admin Context
export const AmContexts = createContext()
const Adminmain = () => {
  // States
  const [isAt, setIsAt] = useState("")
  const [dashboardOption, setDashboardOption] = useState('');
  const [screenType, setScreenType] = useState("unset")
  const [thumbnailOption, setThumbnailOption] = useState("")
  const [thumbnailIsAt, setThumbnailIsAt] = useState("")
  const [messengerTarget, setMessengerTarget] = useState("")
  const [messagesIsAt, setMessagesIsAt] = useState("")

  // Thumbnail Navigation Function
  const thumbnailGoTo = (place, placelocation) => {
    localStorage.setItem("thumbnailIsAt", place)
    setThumbnailIsAt(place)
    if (place == "thumbnails") {
      setThumbnailOption(placelocation)
      localStorage.setItem("thumbnailOption", placelocation)
      setDashboardOption(placelocation)
    } else {
      localStorage.removeItem("thumbnailOption")
    }
  }

  // Handle Select Option
  const handleSelectOption = (event) => {
    setDashboardOption(event.target.value);
    localStorage.setItem("isAt", "dashboard")
    localStorage.setItem("dashboardOption", event.target.value)
  };

  // Use Effect
  useEffect(() => {
    const thumbnailIsAtInLocalStorage = localStorage.getItem("thumbnailIsAt")
    if (!thumbnailIsAtInLocalStorage) {
      localStorage.setItem("thumbnailIsAt", "options")
      setThumbnailIsAt("options")
    } else {
      setThumbnailIsAt(thumbnailIsAtInLocalStorage)
    }

    const thumbnailOptionInLocalStorage = localStorage.getItem("thumbnailOption")
    if (thumbnailOptionInLocalStorage) {
      setThumbnailOption(thumbnailOptionInLocalStorage)
    }

    const isAtLocation = localStorage.getItem("isAt")
    if (!isAtLocation) {
      localStorage.setItem("isAt", "screen")
      setIsAt("screen")
    } else {
      setIsAt(isAtLocation)
    }

    const screenTypeLocation = localStorage.getItem("screenType")
    if (!screenTypeLocation) {
      localStorage.setItem("screenType", "unset")
    } else {
      setScreenType(screenTypeLocation)
    }

    const dashboardLocation = localStorage.getItem("dashboardOption")
    if (!dashboardLocation) {
      localStorage.setItem("dashboardOption", "unset")
      setDashboardOption("unset")
    } else {
      setDashboardOption(dashboardLocation)
    }
  })

  const handleHomeReturn = () => {
    setIsAt("screen")
    setScreenType("unset")
    localStorage.setItem('isAt', 'screen');
    localStorage.setItem("screenType", "unset")
  };

  const handleSubmit = (event) => {
    event.preventDefault();
  };

  const handleGalleryVisit = () => {
    localStorage.setItem("screenType", "gallery")
    setScreenType("gallery")
    if (dashboardOption == "unset") {
      setIsAt("options")
      localStorage.setItem("isAt", "options")
    } else {
      setIsAt("dashboard")
      localStorage.setItem("isAt", "dashboard")
    }
  }

  const handleTextVisit = () => {
    localStorage.setItem("screenType", "text")
    setScreenType("text")
    setDashboardOption("unset")
    if (dashboardOption == "logofolio" || dashboardOption == "thumbnails" || dashboardOption == "albumcovers" || dashboardOption == "clients" || dashboardOption == "organisations" || dashboardOption == "coverlogofolio" || dashboardOption == "coverthumbnails" || dashboardOption == "coveralbumcovers" || dashboardOption == "mainlogo" || dashboardOption == "footerlogo" || dashboardOption == "coverlivestreamthumbnails" || dashboardOption == "covermanipulatedthumbnails" || dashboardOption == "coverrealisticthumbnails" || dashboardOption == "covermrbeasttypethumbnails" || dashboardOption == "unset") {
      setIsAt("options")
      localStorage.setItem("isAt", "options")
    } else {
      setIsAt("dashboard")
      localStorage.setItem("isAt", "dashboard")
    }
  }

  const handleMessagesVisit = () => {
    localStorage.setItem("screenType", "messages")
    setScreenType("messages")
    setIsAt("dashboard")
    localStorage.setItem("isAt", "dashboard")
  }

  const handleOptionReturn = () => {
    setIsAt('options')
    localStorage.setItem("isAt", "options")
  }

  const messagesGoTo = (place) => {
    localStorage.setItem("messagesIsAt", place)
    setMessagesIsAt(place)
  }

  return (
    <>
      <AmContexts.Provider value={{ isAt, setIsAt, dashboardOption, setDashboardOption, thumbnailOption, setThumbnailOption, thumbnailIsAt, setThumbnailIsAt, thumbnailGoTo, messengerTarget, setMessengerTarget, messagesIsAt, setMessagesIsAt, messagesGoTo }}>
        <div className="dspath">
          <h1
            className="homeicon"
            style={{ color: 'var(--themecolor)' }}
          >
            <i className="fa-solid fa-house" onClick={handleHomeReturn}></i>
          </h1>
          
            {
              screenType !== "unset" ? (
                <>
                <p className="dspathtxt">
                 { 
                 screenType !== "messages" ? (
                    <span onClick={handleOptionReturn}>{`/ ${screenType}`}</span>
                    ) : (
                <>
                  <span onClick={() => { messagesGoTo("messengers") }}>{`/ ${screenType}`}</span>
                  {messagesIsAt === "messages" ? ` / ${messengerTarget}` : null}
                </>
                )}

                  {screenType!=="messages"?localStorage.getItem("isAt") !== "options" ? (
                    dashboardOption !== "unset" ? (
                      dashboardOption !== "thumbnails" || !localStorage.getItem("thumbnailOption") ? (
                       screenType!=="messages"? (<span>{` / ${dashboardOption}`}</span>):null
                      ) : (
                        <>
                          <span onClick={() => { thumbnailGoTo("options") }}>{` / ${dashboardOption}`}</span>
                          <span>{` / ${localStorage.getItem("thumbnailOption")}`}</span>
                        </>
                      )
                    ) : null
                  ) : null :null}
                    </p>
                </>
              ) : null
            }

        
        </div>
        <div className="am-container">
          {isAt == "screen" &&
            <>
            <div className="optionitemcontainer">
              <div className="optionitem" onClick={handleGalleryVisit}>
                  <i className="fa-solid fa-image galleryicon"></i>
                  <p className="optiontxt">Gallery</p>
                </div>
                <div className="optionitem" onClick={handleTextVisit}>
                  <i className="fa-regular fa-file-magnifying-glass"></i>
                  <p className="optiontxt">Text</p>
                </div>
                <div className="optionitem" onClick={handleMessagesVisit}>
                  <i className="fa-solid fa-message-dots"></i>
                  <p className="optiontxt">Messages</p>
                </div>
            </div>
            </>
          }

          {isAt == "options" && <>
            <form onSubmit={handleSubmit} className="am-form">
              <label htmlFor="dropdown" className="amtxt">Select from:</label>
              <select id="dropdown" value={dashboardOption} onInput={handleSelectOption} className="am-select" defaultValue={() => { localStorage.getItem("dashboardOption") }}>
                {<>
                  {screenType == "gallery" ? <>
                    <option value="logofolio" className='am-option' selected={localStorage.getItem("dashboardOption") == "logofolio"}>Logofolio</option>
                    <option value="thumbnails" className='am-option' selected={localStorage.getItem("dashboardOption") == "thumbnails"}>Thumbnails</option>
                    <option value="albumcovers" className='am-option' selected={localStorage.getItem("dashboardOption") == "albumcovers"}>Album Covers</option>
                    <option value="clients" className='am-option' selected={localStorage.getItem("dashboardOption") == "clients" || localStorage.getItem("dashboardOption") == "organisations"}>Clients</option>
                    <option value="coverlogofolio" className='am-option' selected={localStorage.getItem("dashboardOption") == "coverlogofolio"}>Cover for Logofolio</option>
                    <option value="coverthumbnails" className='am-option' selected={localStorage.getItem("dashboardOption") == "coverthumbnails"}>Cover for Thumbnails</option>
                    <option value="coveralbumcovers" className='am-option' selected={localStorage.getItem("dashboardOption") == "coveralbumcovers"}>Cover for Albumcovers</option>
                    <option value="coverlivestreamthumbnails" className='am-option' selected={localStorage.getItem("dashboardOption") == "coverlivestreamthumbnails"}>Cover for Live Stream Thumbnails</option>
                    <option value="covermanipulatedthumbnails" className='am-option' selected={localStorage.getItem("dashboardOption") == "covermanipulatedthumbnails"}>Cover for Manipulated Thumbnails</option>
                    <option value="coverrealisticthumbnails" className='am-option' selected={localStorage.getItem("dashboardOption") == "coverrealisticthumbnails"}>Cover for Realistic Thumbnails</option>
                    <option value="covermrbeasttypethumbnails" className='am-option' selected={localStorage.getItem("dashboardOption") == "covermrbeasttypethumbnails"}>Cover for MrBeast Type Thumbnails</option>
                    <option value="coveralbumcovers" className='am-option' selected={localStorage.getItem("dashboardOption") == "coveralbumcovers"}>Cover for Albumcovers</option>
                    <option value="mainlogo" className='am-option' selected={localStorage.getItem("dashboardOption") == "mainlogo"}>Main Logo</option>
                    <option value="footerlogo" className='am-option' selected={localStorage.getItem("dashboardOption") == "footerlogo"}>Footer Logo</option></>
                    : <>
                      <option value="home" className='am-option' selected={localStorage.getItem("dashboardOption") == "home"}>Home page</option>
                      <option value="overview" className='am-option' selected={localStorage.getItem("dashboardOption") == "overview"}>Overview page</option>
                      <option value="management" className='am-option' selected={localStorage.getItem("dashboardOption") == "management"}>Management page</option>
                    </>}
                </>}
              </select>
            </form></>}
        </div>
        {isAt == "dashboard" && <Dashboard type={dashboardOption} />}
      </AmContexts.Provider>
    </>
  )
}

export default Adminmain

