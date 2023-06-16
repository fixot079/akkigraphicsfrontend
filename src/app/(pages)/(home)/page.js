"use client"
import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation'
import Link from 'next/link';
import Image from 'next/image';
import Imagecomp from '../../(components)/(classic)/(image)/imagecomp';
import Spinner from '../../(components)/(classic)/(spinner)/spinner';
import './home.css';

export default function Home() {
  // Router
  const router = useRouter()

  // Address
  const frontendaddress = process.env.NEXT_PUBLIC_FRONTEND_ADDRESS
  const backendaddress = process.env.NEXT_PUBLIC_BACKEND_ADDRESS

  // States
  const [coverLogofolio, setCoverLogofolio] = useState([])
  const [coverThumbnails, setCoverThumbnails] = useState([])
  const [coverAlbumCovers, setCoverAlbumCovers] = useState([])
  const [loading1, setLoading1] = useState(true)
  const [loading2, setLoading2] = useState(true)
  const [loading3, setLoading3] = useState(true)
  const [textObject, setTextObject] = useState({})

  // Fetch functions
  function fetchHome() {
    fetch(`${backendaddress}/getimages/coverlogofolio`)
      .then(r => r.json())
      .then(data => {
        const images = data.images;
        setCoverLogofolio(images)
        setLoading1(false)

        fetch(`${backendaddress}/getimages/coverthumbnails`)
          .then(r => r.json())
          .then(data => {
            const images = data.images;
            setCoverThumbnails(images)
            setLoading2(false)

            fetch(`${backendaddress}/getimages/coveralbumcovers`)
              .then(r => r.json())
              .then(data => {
                const images = data.images;
                setCoverAlbumCovers(images)
                setLoading3(false)
              })
          })
      })
  }

  useEffect(() => {
    // Fetch images for home page
    fetchHome()

    // Fetch text content for home page
    fetch(`${backendaddress}/home/get`)
      .then((response) => response.json())
      .then((response) => {
        setTextObject(response);
      })
  }, [])

  // Send function

  const sendTo = (location) => {
    router.push(`/${location}`)
  }

  return (
    <>
      <section className="hero-section">
          <div className="hero-section-text-content">
                <h1 className="hero-section-main-heading ppins">{textObject.h1}</h1>
                <p className="hero-section-paragraph inter">{textObject.p1}</p>
                <div className="icon-area">
                    <div className="image-icon">
                        <i className="fa-solid fa-medal icon icon1"></i>
                        <p className="image-desc inter">{textObject.p2}</p>
                    </div>
                    <div className="image-icon">
                        <i className="fa-regular fa-photo-film-music icon icon2"></i>
                        <p className="image-desc inter">{textObject.p3}</p>
                    </div>
                </div>
          </div>
          <div className="hero-section-images">
            {!loading1 && <Imagecomp source={`${backendaddress}/images/coverlogofolio/` + coverLogofolio[0]} classes="herosectionimg" id="image1" click={() => { sendTo('logofolio') }} />}
            {!loading2 && <Imagecomp source={`${backendaddress}/images/coverthumbnails/` + coverThumbnails[0]} classes="herosectionimg" click={() => { sendTo('thumbnails') }} />}
            {!loading3 && <Imagecomp source={`${backendaddress}/images/coveralbumcovers/` + coverAlbumCovers[0]} classes="herosectionimg" click={() => { sendTo('albumcovers') }} />}
            {loading1 || loading2 || loading3 ? <Spinner /> : ""}
          </div>
      </section>
    </>
  );
}
