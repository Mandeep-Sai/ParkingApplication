import React, { Component } from 'react'
import Chart from 'chart.js';
import "../styles/ParkingLot.css"
import Sidebar from './Sidebar';
import {Table} from "react-bootstrap"

export class ParkingLot extends Component {
    constructor(props) {
        super(props)
    
        this.state = {
            lot_id:this.props.match.params.lot_uuid,
            zone_id:this.props.match.params.zone_uuid,
            accessToken:"",
            occupancyMetrics:null,
            label:["0","1","2","3","4","5","6","7","8","9","10","11","12","13","14","15","16","17","18","19","20","21","22","23"],
            value:null,
            topLots:null
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
            let parsedResponse = await response.json()
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
            let parsedTopLotsResponse = await topLotsResponse.json()
            let parsedAvgOccupancy = await avgOccupancy.json()
           let hourlyValues= parsedAvgOccupancy.data.average_occupation.filter(element=>element.timestamp %4===0)
           let value = hourlyValues.map(hourValue => hourValue.value)
           this.setState({occupancyMetrics:parsedResponse.data,value,topLots:parsedTopLotsResponse.data.benchmark})
           console.log(this.state.topLots);
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
               }
               });
            new Chart(avgCtx, {
                type: 'line',
                data : {
                   labels:[...this.state.label],
                  datasets: [{
                      data: [...this.state.value],
                      backgroundColor:[
                       "white"
                      ]
                  }],
              },
              });
        },500)
        //
    }
    
    render() {
        return (
            <>
            <Sidebar/>
            <div id="metrics">
            {this.state.occupancyMetrics === null?null :
            <>
            <div id="charts">

            <div id="lotsAvailableInfo">
                 <canvas id="pieChart" width="150px" height="150px"></canvas>
                 <p>Available:{this.state.occupancyMetrics.capacity-this.state.occupancyMetrics.current}</p>
                 <p>Occupied: {this.state.occupancyMetrics.current}</p>
            </div>
            <div id="topLots">
            <Table striped bordered hover size="sm">
            <thead>
                <tr>
                <th>S.No</th>
                <th>Name</th>
                <th>Capacity</th>
                <th>Current</th>
                </tr>
            </thead>
            <tbody>
                {this.state.topLots!== null?
                this.state.topLots.map((lot,key)=>{
                    return(
                    <tr>
                    <td>{key+1}</td>
                    <td>{lot.parkinglot_name}</td>
                    <td>{lot.capacity}</td>
                    <td>{lot.current_occupation}</td>
                    </tr>
                    )
                })
                :null}
               
            </tbody>
</Table>
            </div>
            </div>
            <div id="averageOccupancy">
            <canvas id="averageChart" width="500px" height="200px"></canvas>
            </div>
            </>
            }
            </div>
            </>
        )
    }
}

export default ParkingLot
