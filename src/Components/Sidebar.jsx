import React, { Component } from 'react'
import {  RiParkingBoxFill} from "react-icons/ri"
import {  FaUserCircle} from "react-icons/fa"
import "../styles/Sidebar.css"
import {withRouter} from "react-router-dom"

export class SideBar extends Component {
    constructor(props) {
        super(props)
    }
    
    logOut = () =>{
        localStorage.removeItem("accessToken");
        this.props.history.push("/")
    }
    render() {
        return (
            <>
            <div id="sidebar">
                <div id="logo">
                <RiParkingBoxFill/>
                <p>Parking</p>
                </div>
                <p>Menu</p>
                <hr style={{borderTop: '1px solid ',margin:"5px 0px 0px 10px"}}/>
                <p className="active">Smart Parking</p>
                <p>My Account</p>
                <button onClick={()=>this.logOut()}>Logout</button>
            </div>
            <div id="mobileSidebar">
                <p className="active">Smart Parking</p>
                <div></div>
                <p><FaUserCircle/></p>
            </div>
            </>
        )
    }
}

export default withRouter(SideBar)
