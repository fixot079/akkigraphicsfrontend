import React from 'react'
import './pnav.css'

const Portfolionavigation = (props) => {
    const styles = props.styles
    return (
        <>
            <div className="portfolio-navigation" style={styles}>
                <ol className="ppins">
                <li className="portfolio-navigation-li pnlmain"><a href="/logofolio">Logofolio</a></li>
                <li className="portfolio-navigation-li"><a href="/thumbnails">Thumbnails</a></li>
                <li className="portfolio-navigation-li"><a href="/albumcovers">Album Covers</a></li>
                </ol>
            </div>
            <div className="lc">
                <h1 className="ppins txt1">Let's work together!</h1>
                <a className="main-anchor" href="https://www.instagram.com/akki.graphics/" target="_blank">
                <h1 className="inter txt2">@akki.graphics</h1>
                </a>
            </div>
        </> 
    )
}

export default Portfolionavigation

