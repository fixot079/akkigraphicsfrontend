"use client"
import React, { useState, useEffect } from 'react'
import { getCaptionFromFileName, removeExtensionsFromName } from '../../(components)/(admin)/(dashboard)/dashboard'
import { removeCaptionFromFileName } from '../../(components)/(admin)/(dashboard)/dashboard'
import Imagecomp from '../../(components)/(classic)/(image)/imagecomp'
import Spinner from '../../(components)/(classic)/(spinner)/spinner'
import Clients from '../../(components)/(classic)/(clients)/clients'
import Organisations from '../../(components)/(classic)/(clients)/organisations'
import './overview.css'

const Overview = () => {
  // Address
  const  backendaddress = "https://akkigraphicsbackend.onrender.com"

  // States
  const [coverLogofolio, setCoverLogofolio] = useState([])
  const [coverThumbnails, setCoverThumbnails] = useState([])
  const [coverAlbumCovers, setCoverAlbumCovers] = useState([])
  const [loading1, setLoading1] = useState(true)
  const [loading2, setLoading2] = useState(true)
  const [loading3, setLoading3] = useState(true)
  const [textObject, setTextObject] = useState({})

  // Use Effect
  useEffect(() => {
    fetch(`${backendaddress}/getimages/coverlogofolio`)
      .then(r => r.json())
      .then(data => {
        const images = data.images;
        setCoverLogofolio(images)
        setLoading1(false)
    })

    fetch(`${backendaddress}/getimages/coverthumbnails`)
      .then(r => r.json())
      .then(data => {
        const images = data.images;
        setCoverThumbnails(images)
        setLoading2(false)
    })

    fetch(`${backendaddress}/getimages/coveralbumcovers`)
      .then(r => r.json())
      .then(data => {
        const images = data.images;
        setCoverAlbumCovers(images)
        setLoading3(false)
    })

    fetch(`${backendaddress}/overview/get`)
      .then((r) => r.json())
      .then((r) => {
        setTextObject(r);
    })

  }, []);

  return (
    <>
      <section className="overview-section">
        <div className="overview-section-text-content">
          <h3 className="ppins heading-primary" id="hp2">{textObject.h1}</h3><br /><br />  <p className="ppins heading-primary subheading" id="hp3">{textObject.p1}</p> <h3 className="ppins heading-primary" id="hp4"> {textObject.h2}</h3>
          <div className="overview-section-table">
            <div className="overview-section-table-data">
              <p className="int ppins">{textObject.p2}</p>
              <p className="int-caption inter">{textObject.p3}</p>
            </div>
            <div className="overview-section-table-data">
              <p className="int ppins">{textObject.p4}</p>
              <p className="int-caption inter">{textObject.p5}</p>
            </div>
          </div>
          <p className="inter txt1"> <span className="ppins oh1">{textObject.p6}</span><br />{textObject.p7}
          <br /><br />  <span className="ppins oh1">{textObject.p8}</span><br />
          {textObject.p9}
          </p>
          <h2 className="inter heading-secondary">{textObject.p10}</h2>
        </div>
        <div className="overview-section-client-gallery">
          <Clients />
        </div>
        <div className="org-working-section">
          <center>
            <h3 className="client-name inter org-text">{textObject.p11}</h3>
            <div style={{ display: 'flex', flexWrap: 'wrap', justifyContent: 'center', alignItems: 'center' }}>
              <Organisations />
            </div>
          </center>
        </div>
        <div className="overview-section-lc">
          <h3 className="overview-section-lc-text inter lctxt">{textObject.p12}</h3>
          <div className="overview-section-lc-images">
            <center style={{ overflow: 'hidden' }}>
              <a href="/logofolio" className="anchor-animation-disabled">
                {!loading1 && <Imagecomp source={`${backendaddress}/images/coverlogofolio/` + coverLogofolio[0]} classes="lcimg" id="image1" key={Date.now() + coverLogofolio[0]} />}
              </a>
              <a href="/thumbnails" className="anchor-animation-disabled">
                {!loading2 && <Imagecomp source={`${backendaddress}/images/coverthumbnails/` + coverThumbnails[0]} classes="lcimg" key={Date.now() + coverThumbnails[0]} />}
              </a>
              <a href="/albumcovers" className="anchor-animation-disabled">
                {!loading3 && <Imagecomp source={`${backendaddress}/images/coveralbumcovers/` + coverAlbumCovers[0]} classes="lcimg" key={Date.now() + coverAlbumCovers[0]} />}
              </a>
              {loading1 || loading2 || loading3 ? <Spinner key={Date.now() + Math.random() * 9999} /> : ""}
            </center>
          </div>
        </div>
      </section>
    </>
  )
}

export default Overview
