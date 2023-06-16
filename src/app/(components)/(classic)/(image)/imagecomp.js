import React from 'react'

const Imagecomp = (props) => {
    return (
        <>
           <img src={props.source} className={props.classes} id={props.id} onClick={props.click}/> 
        </>
    )
}

export default Imagecomp
