import React, { Component } from 'react'
import {  RiParkingBoxFill} from "react-icons/ri"
import {  FaUserCircle} from "react-icons/fa"
import {  FiLogOut} from "react-icons/fi"
import "../styles/Sidebar.css"
import {withRouter} from "react-router-dom"

export class SideBar extends Component {
    constructor(props) {
        super(props)
        this.state={
            selectedMenu:this.props.match.path==="/parking" ? "smart":"account"
        }
    }
    
    logOut = () =>{
        localStorage.removeItem("accessToken");
        this.props.history.push("/")
    }
    selectMenu=(keyword)=>{
        this.setState({selectedMenu:keyword})
    }
    render() {
        return (
            <>
            <div id="sidebar">
                <div onClick={()=>this.props.history.push("/parking")} id="logo">
                <RiParkingBoxFill/>
                <p>Parking</p>
                </div>
                <p>Menu</p>
                <hr style={{borderTop: '1px solid ',margin:"5px 0px 0px 10px"}}/>
                <p className={this.state.selectedMenu === "smart" ? "active":null}
                 onClick={()=>{this.props.history.push("/parking");this.selectMenu("smart")}} 
                                >Smart Parking</p>
                <p className={this.state.selectedMenu === "account" ? "active":null}
                onClick={()=>{this.props.history.push("/inprogress");this.selectMenu("account")}}
                 >My Account</p>
                <button onClick={()=>this.logOut()}>Logout</button>
            </div>
            <div id="mobileSidebar">
                <p className="active" onClick={()=>this.props.history.push("/parking")} >Smart Parking</p>
                <div></div>
                <p><FaUserCircle/></p>
                <div></div>
                <p onClick={()=>this.logOut()} ><FiLogOut/></p>
            </div>
            </>
        )
    }
}

export default withRouter(SideBar)
