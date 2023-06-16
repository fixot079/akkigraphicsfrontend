"use client"
import React, {useState, useEffect} from 'react'
import './contact.css'

const Contact = () => {
    // Address
    const frontendaddress = process.env.NEXT_PUBLIC_FRONTEND_ADDRESS
    const backendaddress = process.env.NEXT_PUBLIC_BACKEND_ADDRESS

    // States
    const [name, setName] = useState("")
    const [email, setEmail] = useState("")
    const [message, setMessage] = useState("")
    const [cs, setCs] = useState(false)
    const [ccClass, setCcClass] = useState("contactpopcontainer dnone")
    const [enmClass, setEnmClass] = useState("errormessage dnone")
    const [eemClass, setEemClass] = useState("errormessage dnone")
    const [eem2Class, setEem2Class] = useState("errormessage dnone")
    const [emmClass, setEmmClass] = useState("errormessage dnone")

    // Update state function
    const updateState = (stateSetter, event) => {
        stateSetter(event.target.value);
      };

    // Show/hide CC
    const showCC = (boolean) => {
        if(boolean){
            setCs(true)
        } else {
            setCs(false)
        }
        setCcClass("contactpopcontainer fadein")
    }

    const hideCC = () => {
        setCcClass("contactpopcontainer fadeout")
        setTimeout(()=>{
            setCcClass("contactpopcontainer dnone")
        },500)
    }

    // Contact function
    const handleContact = (e) => {
        e.preventDefault()

        function isValidEmail(email) {
            // Regular expression pattern for email validation
            const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
          
            // Test the email against the pattern
            return emailPattern.test(email);
          }

        if(name.length==0 || email.length==0 || !isValidEmail(email) || message.length==0 ){
        if(name.length==0){
            setEnmClass("errormessage")
        } else {
            setEnmClass("errormessage dnone")
        }
          
        if(email.length==0 || !isValidEmail(email)){
            if(email.length==0){
                setEemClass("errormessage")
                setEem2Class("errormessage dnone")
            } else {
                setEem2Class("errormessage")
                setEemClass("errormessage dnone")
            }
        } else {
            setEemClass("errormessage dnone")
            setEem2Class("errormessage dnone")
        }
        if(message.length==0){
            setEmmClass("errormessage")
        } else {
            setEmmClass("errormessage dnone")
        }
    }
        else {
            setEnmClass("errormessage dnone")
            setEemClass("errormessage dnone")
            setEmmClass("errormessage dnone")
            setEem2Class("errormessage dnone")
            fetch(`${backendaddress}/sendmessage`, {
                method:'POST',
                headers:{
                    'Content-Type':'application/json'
                },
                body:JSON.stringify({name,email,message})
            }).then((r)=>{
                return r.json()
            }).then((r)=>{
                if(r.success){
                    showCC(true) 
                    setName("")
                    setEmail("")
                    setMessage("")
                } else {
                    showCC(false) 
                }
            })
        }
      
    }

    return (
        <>
             <div className="all">
                <div className="hero-section">
                    <h1 className="ppins txt1">Let's work together!</h1>
                    <a className="main-anchor" href="https://www.instagram.com/akki.graphics/" target="_blank">
                        <h1 className="inter txt2">@akki.graphics</h1>
                    </a>
                    <p className="inter txt3">Message me directly on instagram or fill out the form below.</p>
                </div>
                <center>
                    <div className="form-container">
                    <form method="post" onSubmit={handleContact}>
                        <h3 className="ppins contact-caption">Contact me</h3>
                        <div className="input-fields">
                            <p className={enmClass}>This field is required.</p>                        
                            <input type="text" 
                              name="name" 
                              placeholder="Your name" 
                              id="nameinput" 
                              size="40" 
                              className="form-input" 
                              onChange={(event) => updateState(setName, event)} 
                              value={name}
                            />
                           <p className={eemClass}>This field is required.</p>
                           <p className={eem2Class}>Invalid email.</p>
                           <input type="text" 
                              name="email" 
                              placeholder="E-mail" 
                              id="mailinput" 
                              size="40" 
                              className="form-input" 
                              onChange={(event) => updateState(setEmail, event)} 
                              value={email}
                            />
                            <p className={emmClass}>This field is required.</p>                       
                            <textarea name="message" 
                              id="msginput" 
                              cols="43" 
                              rows="10" 
                              placeholder="Your message" 
                              className="form-input" 
                              onChange={(event) => updateState(setMessage, event)} 
                              value={message}
                            ></textarea>
                            <input type="hidden" 
                              name="theme" 
                              id="contactpagetheme" 
                              value=""
                            />
                            <input type="submit" 
                              value="Submit" 
                              id="submitbtn" 
                            />
                    </div>
                    </form>
        </div>
        </center>
            <section className="contact-section-tables inter">
                <div className="contact-section-table">
                    <h2>More Works</h2>
                    <div className="container">
                        <img src="./gallery/icons/instagram.png" className="socialimg" />
                        <p className="sitename"><a href="https://www.instagram.com/akki.graphics/" className="contact-anchor" target="_blank">Instagram</a></p>
                    </div>
                </div>
                <div className="contact-section-table">
                    <h2>Social</h2>
                    <div className="container">
                        <img src="./gallery/icons/linkedin.png" className="socialimg" />
                        <p className="sitename"><a href="https://www.linkedin.com/in/akki-graphics-2129ba217" className="contact-anchor" target="_blank">LinkedIn</a></p>
                    </div>
                    <div className="container">
                        <img src="./gallery/icons/twitter.png" className="socialimg" />
                        <p className="sitename"><a href="https://twitter.com/akki_Graphics?s=09" className="contact-anchor" target="_blank">Twitter</a></p>
                    </div>
                    <div className="container">
                        <img src="./gallery/icons/youtube.png" className="socialimg" />
                        <p className="sitename"><a href="https://www.youtube.com/@akkiGraphics" className="contact-anchor" target="_blank">Youtube</a></p>
                    </div>
                </div>
                <div className="contact-section-table">
                    <h2>Contact</h2>
                    <div className="container">
                        <img src="./gallery/icons/mail.png" className="socialimg" />
                        <p className="sitename">akkigraphics.business@gmail.com</p>
                    </div>
                </div>
            </section>
        </div>
        <div className={ccClass}>
            <div className="contactpopupbox">
                <div className="ccolumn">
                    <div className="ccont">
                        <img src={cs?`${backendaddress}/gallery/alert.png`:`${backendaddress}/gallery/alert2.png`} className="cimg"/>
                       <div className="ctext">
                        <h4 className="ch2">{cs?"Thank you!":"Oops!"}</h4>
                        <p className="ctxt">{cs?"Your message has been received.":"Your message could not be sent due to an error."}</p>
                       </div>
                    </div>
                    <button className="cbtn" onClick={hideCC}>Close</button>
                </div>
            </div>
        </div>
        </>
    )
}

export default Contact
