import React, { Component } from 'react'
import {  RiParkingBoxFill} from "react-icons/ri"
import "../styles/Sidebar.css"

export class Sidebar extends Component {
    render() {
        return (
            <div id="sidebar">
                <div>
                <RiParkingBoxFill/>
                <p>Parking</p>
                </div>
                <p>Smart Parking</p>
                <p>My Account</p>
            </div>
        )
    }
}

export default Sidebar
