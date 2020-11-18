import React, { Component } from 'react'
import Chart from 'chart.js';
import "../styles/ParkingLot.css"
import Sidebar from './Sidebar';
import {Spinner} from "react-bootstrap"
import LoginExpired from './LoginExpired';

export class ParkingLot extends Component {
    constructor(props) {
        super(props)
    
        this.state = {
            lot_id:this.props.match.params.lot_uuid,
            zone_id:this.props.match.params.zone_uuid,
            occupancyMetrics:null,
            label:["0","1","2","3","4","5","6","7","8","9","10","11","12","13","14","15","16","17","18","19","20","21","22","23"],
            value:null,
            topLots:null,
            loading:true,
            showLoginExpired:false
       }
       this.chartRef = React.createRef();
    }
    componentDidMount=async()=> {
        this.setState({accessToken:localStorage.getItem("accessToken")})
        setTimeout(async()=>{

            let response = await fetch(`/spnew/parkinglot/${this.state.lot_id}/zone/${this.state.zone_id}/current-state`,{
                method:"GET",
                headers:new Headers({
                    "Authorization":`Bearer ${this.state.accessToken}`
                })
            })
            let avgOccupancy = await fetch(`/spnew/parkinglot/${this.state.lot_id}/zone/${this.state.zone_id}/average-occupation`,{
                method:"GET",
                headers:new Headers({
                    "Authorization":`Bearer ${this.state.accessToken}`
                })
            })
            let topLotsResponse = await fetch(`/spnew/parkinglots/benchmark/occupation?top=5`,{
                method:"GET",
                headers:new Headers({
                    "Authorization":`Bearer ${this.state.accessToken}`
                })
            })
            let parsedResponse = await response.json()
            let parsedTopLotsResponse = await topLotsResponse.json()
            let parsedAvgOccupancy = await avgOccupancy.json()
            if(parsedResponse.data){

                let hourlyValues= parsedAvgOccupancy.data.average_occupation.filter(element=>element.timestamp %4===0)
                let value = hourlyValues.map(hourValue => hourValue.value)
                this.setState({occupancyMetrics:parsedResponse.data,value,topLots:parsedTopLotsResponse.data.benchmark,loading:false})
            
                const avgCtx = document.getElementById("averageChart")
                const ctx = document.getElementById("pieChart");          
               new Chart(ctx, {
                 type: 'pie',
                 data : {
                     labels: [
                         'Available',
                         'Occupied',
                     ],
                   datasets: [{
                       data: [this.state.occupancyMetrics.capacity,this.state.occupancyMetrics.current],
                       backgroundColor:[
                        "green","red"
                       ]
                   }],
               },
               options: {
                responsive: true,
                legend: {
                    labels: {
                        fontColor: 'white'
                    }
                },
            }
               });
            new Chart(avgCtx, {
                type: 'line',
                data : {
                   labels:[...this.state.label],
                  datasets: [{
                      data: [...this.state.value],
                      backgroundColor:"#999ca1",
                      color:"rgb(255, 255, 255)",
                      label:["occupied lots"],
                  }],
              },
              options: {
                responsive: true,
                legend: {
                    labels: {
                        fontColor: 'white'
                    }
                },
                scales:{
                    xAxes:[{
                        gridLines: {
                            color: "white",
                        },
                        ticks:{
                            fontColor: 'white'
                        },
                        scaleLabel:{
                            display:true,
                            labelString:"Time (24hr format)",
                            fontColor:"white"
                        }
                        
                     }],
                     yAxes:[{
                        gridLines: {
                            color: "white",
                        },
                        ticks:{
                            fontColor: 'white'
                        },
                        scaleLabel:{
                            display:true,
                            labelString:"Occupied Lots",
                            fontColor:"white"
                        }
                     }],
                }
            }
              });
            }
        },500)
        //
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
    
    render() {
        return (
            <div id="wrapper">
            <Sidebar/>
            {this.state.loading === true?(this.state.showLoginExpired === false ?<Spinner  animation="border" variant="primary" />:<LoginExpired/>)
             :
            <>
            <div id="metrics">
            <div id="charts">

                <div id="lotsAvailableInfo">
                    <h5>Parking Lots Availability</h5>
                    <canvas id="pieChart" width="150px" height="150px"></canvas>
                    <p>Available:{this.state.occupancyMetrics.capacity-this.state.occupancyMetrics.current}</p>
                    <p>Occupied: {this.state.occupancyMetrics.current}</p>
                </div>
                <div id="topLots">
                    <h5>Top 5 parking lots</h5>  
                    <div className="listElementsHeading">
                    <p>S.No</p>    
                    <p>Name</p>    
                    <p>Capacity</p>    
                    <p>Occupied</p>    
                    </div>         
                    {this.state.topLots!== null?
                    this.state.topLots.map((lot,key)=>{
                        return(
                        <div className="listElements">
                        <p>{key+1}</p>
                        <p>{lot.parkinglot_name}</p>
                        <p>{lot.capacity}</p>
                        <p>{lot.current_occupation}</p>
                        </div>
                        )
                    })
                    :null}              
                </div>
            </div>
            {this.state.value.length >0? 
            <>
            <div id="averageOccupancy">
                <h5>Average occupancy of this lot</h5>
                <canvas id="averageChart" width="500px" height="200px"></canvas>
            </div>
            </>
             :null
           
            }
            </div>
            </>
            }
            </div>
        )
    }
}

export default ParkingLot
