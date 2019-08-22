import React, { Component } from 'react';
import {PieChart, Pie, Legend, Tooltip} from 'recharts';
import axios from 'axios';



class Piechart extends Component {
    constructor() {
        super();
        this.state = {
            
            componentData:''
            
        };
        
        // axios.get('http://solutionengineering-devops.us.oracle.com:8090/usage/kpi')
        //     .then(res => {
            // const data = [{name: 'Page A', uv: 590, pv: 800, amt: 1400},
            // {name: 'Page B', uv: 868, pv: 967, amt: 1506},
            // {name: 'Page C', uv: 1397, pv: 1098, amt: 989},
            // {name: 'Page D', uv: 1480, pv: 1200, amt: 1228},
            // {name: 'Page E', uv: 1520, pv: 1108, amt: 1100},
            // {name: 'Page F', uv: 1400, pv: 680, amt: 1700}];
               
                // this.setState({
                //     componentData: data
                // })
              
          
           // })
      }
      componentDidMount() {

        
    }
  render() {
    const data02 = [{'name': 'ADWCworkshops', 'value': 0.75}, {'name': 'NxpCompartment', 'value': 4.23}, {'name': 'DemoCompartment1', 'value': 16.03}, {'name': 'DemoCompartment3', 'value': 75.8}, {'name': 'IndiaTeam', 'value': 168.49}, {'name': 'DemoCompartment4', 'value': 164.08}, {'name': 'executive', 'value': 572.02}, {'name': 'DIPCCompartment', 'value': 1813.54}, {'name': 'GeneralADWCTesting', 'value': 5379.53}, {'name': 'oraclebigdatapursuit(root)', 'value': 6952.24}, {'name': 'DemoCompartment2', 'value': 10103.72}, {'name': 'HUB', 'value': 13821.51}, { 'name': 'EastTeam', 'value': 15268.92}, {'name': 'PoVaaS', 'value': 15367.6}, {'name': 'WestCentralTeam', 'value': 29769.68}]
   // alert(this.state.componentData);
    return (
        <PieChart width={800} height={400} left={120}>
        <Pie isAnimationActive={false} data={data02} cx={200} cy={200} outerRadius={80} fill="#8884d8" label/>
        <Tooltip/>
       </PieChart>
        
    );
  }
}
export default Piechart;