import React from 'react'
import './spinner.css'
const Spinner = (props) => {
    const styles = {
        borderColor:props.color,
        borderTopColor:'transparent'
    }
    return (
        <>
           <center><div className="spinner" style={styles}></div></center>
        </>
    )
}

export default Spinner
