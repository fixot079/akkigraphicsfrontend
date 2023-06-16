"use client"
import React, { useState, useEffect, useContext } from 'react';
import './dashboard.css';
import Imagecomp from '../../(classic)/(image)/imagecomp';
import { AmContexts } from '../(adminmain)/adminmain';
import { useRouter } from 'next/navigation';
import { LoadingContext } from '../../../(pages)/(admin)/$admin/layout';
import Spinner from '../../(classic)/(spinner)/spinner';

export const removeExtensionsFromName = (filename) => {
  var index = filename.lastIndexOf('.');
  if (index !== -1) {
    return filename.substring(0, index);
  }
  return filename;
};

export function getCaptionFromFileName(fileName) {
  const parts = fileName.split('^');
  const caption = parts.pop();
  return caption;
}

export function removeCaptionFromFileName(fileName) {
  const parts = fileName.split('^');
  if (parts.length === 1) {
    return fileName;
  }
  parts.pop();
  return parts.join('^');
}

function getFileExtension(fileName) {
  const parts = fileName.split('.');
  const extension = parts[parts.length - 1];
  return extension.toLowerCase();
}


const Dashboard = (props) => {

  // Hooks
  const router = useRouter();
  const amcontext = useContext(AmContexts);
  const loadingcontext = useContext(LoadingContext)

  const {
    dsIsVisible,
    setDsIsVisible,
    optionsAreVisible,
    setOptionsAreVisible,
    dashboardOption,
    setDashboardOption,
    thumbnailOption,
    setThumbnailOption,
    thumbnailIsAt,
    setThumbnailIsAt,
    thumbnailGoTo,
    messengerTarget,
    setMessengerTarget,
    messagesIsAt, 
    setMessagesIsAt,
    messagesGoTo
  } = amcontext;

  const { infoFetched, setInfoFetched } = loadingcontext

  const dstype = props.type;

  // Address
  const frontendaddress = process.env.NEXT_PUBLIC_FRONTEND_ADDRESS
  const backendaddress = process.env.NEXT_PUBLIC_BACKEND_ADDRESS

  // States
  const [imgArray, setImgArray] = useState([]);
  const [dsureClass, setDsureClass] = useState('dsurecontainer dnone');
  const [dsureIsVisible, setDsureIsVisible] = useState(false);
  const [rcClass, setRcClass] = useState('renamecontainer dnone');
  const [rcIsVisible, setRcIsVisible] = useState(false);
  const [deleteTarget, setDeleteTarget] = useState('');
  const [renameTarget, setRenameTarget] = useState('');
  const [renameValue, setRenameValue] = useState('');
  const [selectedFiles, setSelectedFiles] = useState([]);
  const [hoveredImg, setHoveredImg] = useState(null);
  const [isOnOrg, setIsOnOrg] = useState(false)
  const [captionTarget, setCaptionTarget] = useState("")
  const [captionClass, setCaptionClass] = useState("captioncontainer dnone")
  const [captionIsVisible, setCaptionIsVisible] = useState(false)
  const [captionValue, setCaptionValue] = useState("")
  const [textObject, setTextObject] = useState({})
  const [tcClass, setTcClass] = useState("textchange-container dnone")
  const [tcIsVisible, setTcIsVisible] = useState(false)
  const [textChangeTarget, setTextChangeTarget] = useState("")
  const [textChangeValue, setTextChangeValue] = useState("")
  const [textChangeContent, setTextChangeContent] = useState("")
  const [isLoading1, setIsLoading1] = useState(true)
  const [isLoading2, setIsLoading2] = useState(true)
  const [isLoading3, setIsLoading3] = useState(true)
  const [isLoading4, setIsLoading4] = useState(true)
  const [liveStreamThumbnailCover, setLiveStreamThumbnailCover] = useState([])
  const [manipulatedThumbnailCover, setManipulatedThumbnailCover] = useState([])
  const [realisticThumbnailCover, setRealisticThumbnailCover] = useState([])
  const [mrBeastTypeThumbnailCover, setMrBeastTypeThumbnailCover] = useState([])
  const [messengers, setMessengers] = useState([])
  const [messageArray, setMessageArray] = useState([])
  const [messengerName, setMessengerName] = useState([])


  const makeMessengerTarget = (messenger) => {
    setMessengerTarget(messenger)
    localStorage.setItem("messengerTarget", messenger)
  }

  const getMessagesOf = (messenger) => {
    fetch(`${backendaddress}/getmessagedetails/${messenger}`).then((res=>{return res.json()})).then((res)=>{
      setMessageArray(res)
      localStorage.setItem("messageArray", JSON.stringify(res))
      setMessengerName(res[0].name)
    })
  }
  if(localStorage.getItem("messagesIsAt")=="messages"){
    getMessagesOf(localStorage.getItem("messengerTarget"))
  }




  // Toggle Functions
  const toggleTc = () => {
    if (!tcIsVisible) {
      setTcClass("textchange-container fadein")
      setTcIsVisible(true)
    } else {
      setTcClass("textchange-container fadeout")
      setTimeout(() => {
        setTcClass("textchange-container dnone")
      }, 500)
      setTcIsVisible(false)
    }
  }

  const toggleDsure = () => {
    if (!dsureIsVisible) {
      setDsureClass('dsurecontainer fadein');
      setDsureIsVisible(true);
    } else {
      setDsureClass('dsurecontainer fadeout');
      setTimeout(() => {
        setDsureClass('dsurecontainer fadeout dnone');
      }, 1000);
      setDsureIsVisible(false);
    }
  };

  const toggleRc = () => {
    if (!rcIsVisible) {
      setRcClass('renamecontainer fadein');
      setRcIsVisible(true);
    } else {
      setRcClass('renamecontainer fadeout');
      setTimeout(() => {
        setRcClass('renamecontainer fadeout dnone');
      }, 1000);
      setRcIsVisible(false);
    }
  };

  const toggleCaption = () => {
    if (!captionIsVisible) {
      setCaptionClass('captioncontainer fadein');
      setCaptionIsVisible(true);
    } else {
      setCaptionClass('captioncontainer fadeout');
      setTimeout(() => {
        setCaptionClass('captioncontainer fadeout dnone');
      }, 1000);
      setCaptionIsVisible(false);
    }
  };

  const handleTextChange = () => {
    const data = {
      [textChangeTarget]: textChangeValue
    };

    fetch(`${backendaddress}/${dstype}/change`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(data)
    }).then(() => {
      const updatedTextObject = { ...textObject, [textChangeTarget]: textChangeValue };
      setTextObject(updatedTextObject);
      toggleTc();
    })
  }

  const handleTextChangeInitialization = (value, key) => {
    setTextChangeValue(value)
    setTextChangeTarget(key)
    toggleTc()
  }

  const handleText2Change = (e) => {
    setTextChangeValue(e.target.value)
  }

  const handleKeyPressT = (e) => {
    if (e.key === 'Enter') {
      handleTextChange();
    }
  }

  const handleDeleteInitialization = (dtarget) => {
    toggleDsure();
    setDeleteTarget(dtarget);
  };

  const handleRenameInitialization = (rtarget) => {
    toggleRc();
    setRenameTarget(rtarget);
  };

  const handleCaptionInitialization = (ctarget) => {
    toggleCaption();
    setCaptionValue(removeExtensionsFromName(getCaptionFromFileName(removeExtensionsFromName(ctarget))) !== removeExtensionsFromName(ctarget) ? removeExtensionsFromName(getCaptionFromFileName(removeExtensionsFromName(ctarget))) : "");
    setCaptionTarget(ctarget);
  };

  const handleDeletion = () => {
    setSelectedFiles([]);
    const fileId = deleteTarget; // Replace with the actual file ID
    if(dstype!=="thumbnails"){   
      fetch(`${backendaddress}/${dstype}/delete/${fileId}`, {
          method: 'DELETE',
        })
          .then((response) => response.json())
          .then((response) => {
            if (response.success) {
              setImgArray((prevArray) =>
                prevArray.filter((image) => image !== deleteTarget)
              );
            }
          })
    } else {
      fetch(`${backendaddress}/${thumbnailOption}/delete/${fileId}`, {
        method: 'DELETE',
      })
        .then((response) => response.json())
        .then((response) => {
          if (response.success) {
            setImgArray((prevArray) =>
              prevArray.filter((image) => image !== deleteTarget)
            );
          }
        })
    }
    toggleDsure();
  };

  const handleRename = () => {
    toggleRc();

    const fileId = renameTarget;
    const newFilename = renameValue;
    fetch(`${backendaddress}/${dstype}/rename/${fileId}?with=${newFilename}`, {
      method: 'POST',
    }).then(() => {
      window.location.reload();
    });
  };

  const handleCaption = () => {
    toggleCaption()
    const fileId = captionTarget;
    const newFilename = removeCaptionFromFileName(removeExtensionsFromName(captionTarget)) + "^" + captionValue
    fetch(`${backendaddress}/${dstype}/rename/${fileId}?with=${newFilename}`, {
      method: 'POST',
    }).then(() => {
      window.location.reload();
    });
  }

  const handleKeyPress = (e) => {
    if (e.key === 'Enter') {
      handleRename();
    }
  };

  const handleKeyPressc = (e) => {
    if (e.key === 'Enter') {
      handleCaption();
    }
  };

  const handleFileChange = (e) => {
    const fileList = e.target.files;
    const fileNames = Array.from(fileList).map((file) => file.name);
    setSelectedFiles(fileNames);
  };

  const handleRinpChange = (e) => {
    setRenameValue(e.target.value);
  };

  const handleCinpChange = (e) => {
    setCaptionValue(e.target.value);
  };

  const handleMouseEnter = (imageName) => {
    setHoveredImg(imageName);
  };

  const handleMouseLeave = () => {
    setHoveredImg(null);
  };

  const handleClientSwitch = () => {
      setInfoFetched(false)
      if (!isOnOrg) {
        localStorage.setItem('dashboardOption', 'organisations')
        setDashboardOption('organisations')
        setIsOnOrg(true)
        setInfoFetched(true)
      } else {
        localStorage.setItem('dashboardOption', 'clients')
        setDashboardOption('clients')
        setIsOnOrg(false)
        setInfoFetched(true)
      }
  }

  if (localStorage.getItem("screenType") == "gallery") {

    if (dstype == "home" || dstype == "overview") {
      localStorage.setItem("dashboardOption", "logofolio")
      setDashboardOption("logofolio")
    }

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

      dstype=="thumbnails" && (()=>{
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
        })
      })()

    })

    useEffect(() => {
      if(dstype!=="thumbnails"){
      fetch(`${backendaddress}/getimages/${dstype}`)
        .then((response) => response.json())
        .then((data) => {
          const imageNames = data.images;
          setImgArray(imageNames);
        })
      } else {
        fetch(`${backendaddress}/getimages/${thumbnailOption}`)
        .then((response) => response.json())
        .then((data) => {
          const imageNames = data.images;
          setImgArray(imageNames);
        }) 
      }
    }, [dashboardOption]);
  }

  else if (localStorage.getItem("screenType") == "text") {
    if (dstype == "home" || dstype == "overview") {
      if (dstype == "home") {
        localStorage.setItem("dashboardOption", "home")
        setDashboardOption("home")
      }
      else if (dstype == "overview") {
        localStorage.setItem("dashboardOption", "overview")
        setDashboardOption("overview")
      }
    }

    useEffect(()=>{
      fetch(`${backendaddress}/${dstype}/get`)
      .then((response) => response.json())
      .then((response) => {
        setTextObject(response);
      })
    },[dashboardOption])
  }

  else if(localStorage.getItem("screenType") == "messages"){
   useEffect(()=>{
      fetch(`${backendaddress}/getmessenger`).then((res)=>{
        return res.json()
      }).then((res)=>{
        setMessengers(res)
      })

    const messagesplace = localStorage.getItem("messagesIsAt")
    if(!messagesplace){
      setMessagesIsAt("messengers")
      localStorage.setItem("messagesIsAt", "messengers")
    } else {
      setMessagesIsAt(messagesplace)
    }

    const messengerTargetInLocalStorage = localStorage.getItem("messengerTarget")
    if(messengerTargetInLocalStorage){
      setMessengerTarget(messengerTargetInLocalStorage)
    }

    const messageArrayInLocalStorage = localStorage.getItem("messageArray")
    if(messageArrayInLocalStorage){
      setMessageArray(JSON.parse(messageArrayInLocalStorage))
    }
   }, [])
  }

  return (
    <>
      {
        localStorage.getItem("screenType") == "gallery" ?
          <>
            {(dstype !== "thumbnails" || thumbnailIsAt == "thumbnails") &&
              <>
                <h1 className="ppins linktxt"
                  style={{ color: 'var(--themecolor)' }}
                >
                  <i className="fa-solid fa-link"></i>:{' '}
                  <a href={
                        dstype == "coverlivestreamthumbnails" ||
                        dstype == "covermanipulatedthumbnails" ||
                        dstype == "coverrealisticthumbnails" ||
                        dstype == "covermrbeasttypethumbnails" ?
                        `/thumbnails`:
                        dstype !== "clients" &&
                        dstype !== "organisations" ?
                        dstype !== "coverlogofolio" &&
                        dstype !== "coverthumbnails" &&
                        dstype !== "coverlivestreamthumbnails" &&
                        dstype !== "covermanipulatedthumbnails" &&
                        dstype !== "coverrealisticthumbnails" &&
                        dstype !== "covermrbeasttypethumbnails" &&
                        dstype !== "coveralbumcovers" ?
                        `/${dstype}` : `/` : `/overview`
                  }
                    target="_blank"
                  >
                    {
                          dstype == "coverlivestreamthumbnails" ||
                          dstype == "covermanipulatedthumbnails" ||
                          dstype == "coverrealisticthumbnails" ||
                          dstype == "covermrbeasttypethumbnails" ?
                          `https://www.akkigraphics.netlify.app/thumbnails` :
                          dstype !== "clients" &&
                          dstype !== "organisations" ?
                          dstype !== "coverlogofolio" &&
                          dstype !== "coverthumbnails" &&
                          dstype !== "coveralbumcovers" &&
                          dstype !== "mainlogo" &&
                          dstype !== "footerlogo" ?
                          `https://www.akkigraphics.netlify.app/${dstype}` : `https://www.akkigraphics.netlify.app` :
                          `https://www.akkigraphics.netlify.app/overview`
                    }
                  </a>
                </h1>

                {
                  (dstype == "clients" || dstype == "organisations") &&
                  <h1 className="chdctxt" onClick={handleClientSwitch}>
                    <i className="fa-solid fa-right-left aicon"></i>
                    {
                      dstype == "clients" ? "Personalities" : "Organisations"
                    }
                  </h1>
                }

                <div className="dspcontainer">
                  {imgArray.length === 0 ?
                    (
                      <h1 className="inter"
                        style={{ color: 'var(--themecolor)' }}
                      >
                        (Empty)
                      </h1>
                    ) :
                    (
                      imgArray.map((imagesrc) => {
                        const showImgTxt = hoveredImg === imagesrc ? 'imgtxthovered' : 'imgtxt';
                        return (
                          <>
                            <div className="dscontainer"
                              key={Date.now() + imagesrc}
                              onMouseEnter={() => handleMouseEnter(imagesrc)}
                              onMouseLeave={handleMouseLeave}
                            >
                              <div className="amimg">
                                <Imagecomp source={dstype!=="thumbnails"?(`${backendaddress}/images/${dstype}/` + imagesrc):(`${backendaddress}/images/${thumbnailOption}/` + imagesrc)}
                                  classes={
                                    dstype !== 'thumbnails'
                                      ? 'admin-images amimg'
                                      : 'admin-images-thumbnail amimg'
                                  }
                                  key={Date.now() + imagesrc}
                                />
                                <span className={showImgTxt}
                                  style={dstype == "clients" ||
                                    dstype == "organisations" ? { padding: '0px' } : null}
                                >
                                  {
                                    (
                                      dstype !== "clients" &&
                                      dstype !== "organisations"
                                    ) ? imagesrc.length > 18 ? imagesrc : imagesrc.slice(0, 18) : ""
                                  }
                                </span>
                                <center>
                                  {
                                    (dstype === 'clients' || dstype == "organisations") && (
                                      <p className="dsclienttxt">
                                        {
                                          removeCaptionFromFileName(removeExtensionsFromName(imagesrc)).length < 20
                                            ? removeCaptionFromFileName(removeExtensionsFromName(imagesrc))
                                            : removeCaptionFromFileName(removeExtensionsFromName(imagesrc)).slice(0, 14) + '...'
                                        }
                                      </p>
                                    )
                                  }
                                </center>
                              </div>
                              <div className="icoc">
                                {
                                  dstype == "organisations" &&
                                  <i className="fa-solid fa-closed-captioning picon"
                                    onClick={() => { handleCaptionInitialization(imagesrc) }}
                                  ></i>
                                }
                                {
                                  (dstype == "clients" || dstype == "organisations") &&
                                  <i className="fa-solid fa-pen-to-square picon"
                                    onClick={() => { handleRenameInitialization(imagesrc) }}
                                  ></i>
                                }
                                {
                                  dstype !== "coverlogofolio" &&
                                  dstype !== "coverthumbnails" &&
                                  dstype !== "coveralbumcovers" &&
                                  dstype !== "mainlogo" &&
                                  dstype !== "footerlogo" &&
                                  dstype !== "coverlivestreamthumbnails" && 
                                  dstype !== "covermanipulatedthumbnails" && 
                                  dstype !== "covermrbeasttypethumbnails" && 
                                  dstype !== "coverrealisticthumbnails" &&
                                  <i
                                    className="fa-solid fa-trash-can ficon"
                                    onClick={() => {
                                      handleDeleteInitialization(imagesrc);
                                    }}
                                  ></i>
                                }
                              </div>
                            </div>
                          </>
                        );
                      })
                    )}

                </div> </>}

            {/* Popups */}

            {/* Delete Confirmation */}
            <div className={dsureClass}>
              <div className="dsurebox ppins">
                <p className="dtxt">
                  Delete "{(removeCaptionFromFileName(deleteTarget).includes(getFileExtension(deleteTarget)) ? removeCaptionFromFileName(deleteTarget) : removeCaptionFromFileName(deleteTarget) + getFileExtension(deleteTarget)).length < 30 ? (removeCaptionFromFileName(deleteTarget).includes(getFileExtension(deleteTarget)) ? removeCaptionFromFileName(deleteTarget) : removeCaptionFromFileName(deleteTarget) + getFileExtension(deleteTarget)) : (removeCaptionFromFileName(deleteTarget).includes(getFileExtension(deleteTarget)) ? removeCaptionFromFileName(deleteTarget) : removeCaptionFromFileName(deleteTarget) + getFileExtension(deleteTarget)).slice(0, 30) + "..." + getFileExtension(deleteTarget)}" from website?
                </p>
                <div className="dbtncontainer">
                  <button className="dcancelbtn ppins dbtns" onClick={toggleDsure}>
                    Cancel
                  </button>
                  <button className="ddeletebtn ppins dbtns" onClick={handleDeletion}>
                    Delete
                  </button>
                </div>
              </div>
            </div>

            {/* Rename Confirmation */}
            <div className={rcClass}>
              <div className="renamebox">
                <p className="renametxt ">Rename "{(removeCaptionFromFileName(removeExtensionsFromName(renameTarget))).length < 30 ? (removeCaptionFromFileName(removeExtensionsFromName(renameTarget))) : (removeCaptionFromFileName(removeExtensionsFromName(renameTarget))).slice(0, 30) + "..."}"</p>
                <form className="renameform">
                  <input type="text" required className='renameinp' onChange={handleRinpChange} onKeyDown={handleKeyPress} />
                  <div className="renamebtncontainer">
                    <span className="rbtns" onClick={toggleRc}>Cancel</span>
                    <span className="rbtns rbtnwa" onClick={renameValue !== "" ? handleRename : ""}>Rename</span>
                  </div>
                </form>
              </div>
            </div>

            {/* Caption Edit */}
            <div className={captionClass}>
              <div className="renamebox">
                <p className="renametxt ">Set captions for "{(removeCaptionFromFileName(removeExtensionsFromName(captionTarget))).length < 30 ? (removeCaptionFromFileName(removeExtensionsFromName(captionTarget))) : (removeCaptionFromFileName(removeExtensionsFromName(captionTarget))).slice(0, 30) + "..."}"</p>
                <form className="renameform">
                  <input type="text" required className='captioninp' onChange={handleCinpChange} onKeyDown={handleKeyPressc} value={captionValue} />
                  <div className="renamebtncontainer">
                    <span className="rbtns" onClick={toggleCaption}>Cancel</span>
                    <span className="rbtns rbtnwa" onClick={captionValue !== "" ? handleCaption : ""}>OK</span>
                  </div>
                </form>
              </div>
            </div>

            {dstype !== "thumbnails" || thumbnailIsAt == "thumbnails" ? <>
              <form
                action={dstype!=="thumbnails"?`${backendaddress}/${dstype}/upload`:`${backendaddress}/${thumbnailOption}/upload`}
                method="POST"
                encType="multipart/form-data"
                className="dsform"
              >
                <div className="img-uploader">
                  <span className="ppins dsselecttxt">
                    {
                      selectedFiles.length > 0
                        ? `Selected Images: ${selectedFiles.join(', ')}`
                        : 'No images chosen'
                    }
                  </span>
                  <label htmlFor="file" className="file-input-label ppins dsplusicon">
                    {
                        dstype !== "coverlogofolio" &&
                        dstype !== "coverthumbnails" &&
                        dstype !== "coveralbumcovers" &&
                        dstype !== "mainlogo" &&
                        dstype !== "footerlogo" &&
                        dstype !== "coverlivestreamthumbnails" && 
                        dstype !== "covermanipulatedthumbnails" && 
                        dstype !== "covermrbeasttypethumbnails" && 
                        dstype !== "coverrealisticthumbnails" ? "+" :
                        <i className="fa-solid fa-pen-to-square"
                          style={{ transform: 'scale(0.8)' }}
                        ></i>
                    }
                  </label>
                  <input
                    type="file"
                    name="file"
                    id="file"
                    className="file-input"
                    required
                    multiple={dstype !== "coverlogofolio" && dstype !== "coverthumbnails" && dstype !== "coveralbumcovers" && dstype !== "mainlogo" && dstype !== "footerlogo" && dstype !== "coverlivestreamthumbnails" && dstype !== "covermanipulatedthumbnails" && dstype !== "covermrbeasttypethumbnails" && dstype !== "coverrealisticthumbnails"}
                    onChange={handleFileChange}
                  />

                  <input type="submit"
                    value={
                      selectedFiles.length > 0
                        ? `Upload ${selectedFiles.length} ${selectedFiles.length === 1 ? 'Image' : 'Images'
                        }`
                        : 'Upload'
                    }
                    disabled={selectedFiles.length === 0}
                    className="dsuploadbtn"
                  />
                </div>
              </form> </> : <>
              {isLoading1 || isLoading2 || isLoading3 || isLoading3? <Spinner /> : <>
                <div className="optionimgcontainer">
                  {!isLoading1 && <Imagecomp source={`${backendaddress}/images/coverlivestreamthumbnails/` + liveStreamThumbnailCover[0]} classes="optionimg" click={()=>{thumbnailGoTo("thumbnails", "livestreamthumbnails")}} />}
                  {!isLoading2 && <Imagecomp source={`${backendaddress}/images/covermanipulatedthumbnails/` + manipulatedThumbnailCover[0]} classes="optionimg" click={()=>{thumbnailGoTo("thumbnails", "manipulatedthumbnails")}} />}
                  {!isLoading3 && <Imagecomp source={`${backendaddress}/images/coverrealisticthumbnails/` + realisticThumbnailCover[0]} classes="optionimg" click={()=>{thumbnailGoTo("thumbnails", "realisticthumbnails")}} />}
                  {!isLoading4 && <Imagecomp source={`${backendaddress}/images/covermrbeasttypethumbnails/` + mrBeastTypeThumbnailCover[0]} classes="optionimg" click={()=>{thumbnailGoTo("thumbnails", "mrbeasttypethumbnails")}} />}
              </div>
            </>}
            </>}

          </>
          : localStorage.getItem("screenType") == "text"?
          <>

            {/* <-----------------  Text editor ---------------------> */}

            <h1 className="ppins linktxt"
              style={{ color: 'var(--themecolor)' }}
            >
              <i className="fa-solid fa-link"></i>:{' '}
              <a href={dstype !== "home" ? `/${dstype}` : '/'}
                target="_blank"
              >
                {
                  dstype !== "home" ?
                    `https://www.akkigraphics.netlify.app/${dstype}` :
                    `https://www.akkigraphics.netlify.app`
                }
              </a>
            </h1>

            {
              textObject.length !== 0 ?
                (
                  Object.entries(textObject).map(([key, value]) => (
                    <div className="text-container"
                      key={key}
                    >
                      <p className="text-content">
                        {value}
                      </p>
                      <i className="fa-solid fa-pen-to-square picon picon2"
                        onClick={() => { handleTextChangeInitialization(value, key); }}
                      ></i>
                    </div>
                  ))
                ) : (
                  <Spinner />
                )
            }

            <div className={tcClass}>
              <div className="textchange-box">
                <input type="text" onChange={handleText2Change} value={textChangeValue} className="tcinp" onKeyPress={handleKeyPressT} />
                <div className="tcbtncontainer">
                  <button className="tccancelbtn tcbtn" onClick={toggleTc}>Cancel</button>
                  <button className="tcsavebtn tcbtn" onClick={handleTextChange}>Save</button>
                </div>
              </div>
            </div>

          </>:
          <>
    {messagesIsAt=="messengers"?<>
    {messengers.length==0?<p className='dgtxt5'>No messsages</p>:messengers.map((messenger)=>{
            return <div className="messengerbox" key={Date.now()+messenger}>
                     <i className="fa-solid fa-user usericon"></i>
                     <p className="messenger" onClick={()=>{makeMessengerTarget(messenger); getMessagesOf(messenger); messagesGoTo("messages"); }}>{messenger}</p>
                   </div>
          })}
    </>:<>
    <div className="messagebox">
      <div className="messageboxtop">
        <i className="fa-solid fa-user-large usericon usericon2"></i>
        <p>{messengerName}</p>
      </div>  
      {messageArray.map((messageobject)=>{
        return  <p className="messagetxt">{messageobject.message} <span className="messagetimetxt">{messageobject.time}</span></p>
      })}
     
    </div>
 

    </>}


          </>
      }
    </>
  );
};

export default Dashboard;