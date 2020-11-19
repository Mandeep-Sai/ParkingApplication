import React, { Component } from 'react'
import SideBar from './SideBar'
import "../styles/Parkingpage.css"
import {BsSearch} from "react-icons/bs"
import {Col, Row, Spinner} from "react-bootstrap"
import LoginExpired from './LoginExpired'
import Pagination from "react-js-pagination";


export class ParkingPage extends Component {
    constructor(props) {
        super(props)
    
        this.state = {
             parkingLots:null,
             filteredLots:null,
             lotName:"",
             loading:true,
             showLoginExpired:false,
             currentPage:0,
             lotsPerPage:10,
             pageCount:0
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
            if(parsedResponse.data){
                this.setState({parkingLots:parsedResponse.data.parking_lots,filteredLots:parsedResponse.data.parking_lots.slice(0,10),loading:false})
            }
        
        },500)
    }
    componentDidUpdate =(prevState) =>{
        if(prevState.loading !== this.state.loading){
            if(this.state.loading === true){
                setTimeout(()=>{
                    if(this.state.loading === true){
                        this.setState({showLoginExpired:true})
                    }
                },10000)
            }
        }
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
    handlePageClick =(pageNumber)=>{
        console.log(pageNumber);
        this.setState({currentPage:pageNumber})
        const offset = (pageNumber - 1) * this.state.lotsPerPage;
        let filteredLots = this.state.parkingLots.slice(offset,offset+this.state.lotsPerPage)
        const pageCount = Math.ceil(this.state.parkingLots/this.state.lotsPerPage)
        this.setState({filteredLots,pageCount})
    }
    render() {
        return (
            <>
            <div id="parkingpage">
             <SideBar></SideBar> 
             <div id="parking_lots">
                 <div id="heading">
                 <h5>All Available Parking Lots</h5>
                 <div className="searchBar">
                    <BsSearch/>
                     <input type="text" onChange={(e)=>this.filterLots(e)} placeholder="Search here"/>
                 </div>
                 </div>
                 {this.state.loading === true ? (this.state.showLoginExpired === false ?<Spinner  animation="border" variant="primary" />:<LoginExpired/>)
                  :
                 <>

                 {this.state.filteredLots.map((parkingLot,key)=>{
                     return(
                    
                     <div onClick={()=>this.slotInfo(parkingLot)} id="lotInfo">
                         
                         <p>{parkingLot.name}</p>
                     </div>

                     )
                    })}
                    </>
                 }
             </div>
           
            </div>
            {this.state.loading === false ? 
            <div id="paginationWrapper">
            <Pagination
          activePage={this.state.currentPage}
          itemsCountPerPage={this.state.lotsPerPage}
          totalItemsCount={this.state.parkingLots.length}
          pageRangeDisplayed={5}
          onChange={this.handlePageClick.bind(this)}
          itemClass="page-item"
            linkClass="page-link"
        />
        </div>
            :null}
            </>
        )
    }
}

export default ParkingPage
