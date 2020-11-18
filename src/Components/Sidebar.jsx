import React, { Component } from 'react'
import {  RiParkingBoxFill} from "react-icons/ri"
import "../styles/Sidebar.css"

export class Sidebar extends Component {
    render() {
        return (
            <div id="sidebar">
                <div id="logo">
                <RiParkingBoxFill/>
                <p>Parking</p>
                </div>
                <p>Menu</p>
                <hr style={{borderTop: '1px solid ',margin:"5px 0px 0px 10px"}}/>
                <p className="active">Smart Parking</p>
                <p>My Account</p>
            </div>
        )
    }
}

export default Sidebar
