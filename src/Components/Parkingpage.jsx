import React, { Component } from 'react'
import Sidebar from './Sidebar'
import "../styles/Parkingpage.css"
import {BsSearch} from "react-icons/bs"
import {Col, Row, Spinner} from "react-bootstrap"

export class Parkingpage extends Component {
    constructor(props) {
        super(props)
    
        this.state = {
             parkingLots:null,
             filteredLots:null,
             lotName:""
        }
    }
    
    componentDidMount=async()=> {
        this.setState({accessToken:localStorage.getItem("accessToken")})
        setTimeout(async()=>{

           let response = await fetch("/spnew/parkinglots",{
                method: "GET",
                headers:new Headers({
                    "Authorization":`Bearer ${this.state.accessToken}`
                })
            })
            let parsedResponse = await response.json()
            this.setState({parkingLots:parsedResponse.data.parking_lots,filteredLots:parsedResponse.data.parking_lots})
        },500)
    }
    slotInfo=(info)=>{
        this.props.history.push(`/parking_lot/${info.parkinglot_uuid}/${info.global_zone_uuid}`)
    }
    filterLots=(e)=>{
    this.setState({lotName:e.currentTarget.value})
    if(this.state.lotName.length>0){

        let filteredLots = this.state.parkingLots.filter(parkingLot =>parkingLot.name.toLowerCase().includes(e.currentTarget.value.toLowerCase()))
        this.setState({filteredLots})
    }else{
        this.setState({filteredLots:this.state.parkingLots})
    }
    }
    render() {
        return (
            <div id="parkingpage">
             <Sidebar></Sidebar> 
             <div id="parking_lots">
                 <div id="heading">
                 <h5>All Available Parking Lots</h5>
                 <div className="searchBar">
                    <BsSearch/>
                     <input type="text" onChange={(e)=>this.filterLots(e)} placeholder="Search here"/>
                 </div>
                 </div>
                 {this.state.filteredLots === null ?  <Spinner animation="border" variant="primary" />:
                 <>
                 <Row className="row row cols-xs-2 row-cols-md-4 row cols-lg-5">
                 {this.state.filteredLots.map((parkingLot,key)=>{
                     return(
                    <Col>
                     <div onClick={()=>this.slotInfo(parkingLot)} id="lotInfo">
                         
                         <p>{parkingLot.name}</p>
                     </div>
                     </Col>
                     )
                    })}
                    </Row>
                    </>
                 }
             </div>
            </div>
        )
    }
}

export default Parkingpage
