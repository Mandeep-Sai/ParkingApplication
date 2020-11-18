import React from 'react'
import NavBar from './NavBar'
import "../styles/Homepage.css"

import { useHistory } from 'react-router-dom';

function Homepage() {
    const history = useHistory()
    return (
        <div id="mainJumbotron">
           <div id="content">
               <p>PARK HAPPY</p>
               <h2>Search and Book</h2>
               <h4>All Available Parking.</h4>
               <p>Avoid the hassle of parking.
                   Pre-purchase the perfect spot
                   and have a guaranteed spae waiting for you...</p>
                   <div>
                       <button>DISCOVER</button>
                       <button onClick={()=>history.push("/signin")}>Sign In</button>
                   </div>
           </div>
           <img src="https://www.kindpng.com/picc/m/316-3168502_parking-lot-clipart-rent-hd-png-download.png" alt=""/>
        </div>
    )
}
export default (Homepage)