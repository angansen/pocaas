import React, { Component } from 'react';
import {ComposedChart, Line, Area, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend} from 'recharts';
import axios from 'axios';



class VerticalChart extends Component {
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
     const data= [{'MFLEX_CREDIT': 0.5, 'CCOMPNAME': 'ADWCworkshops', 'PAY_CREDIT': 0.75}, {'MFLEX_CREDIT': 2.82, 'CCOMPNAME': 'NxpCompartment', 'PAY_CREDIT': 4.23}, {'MFLEX_CREDIT': 16.03, 'CCOMPNAME': 'DemoCompartment1', 'PAY_CREDIT': 16.03}, {'MFLEX_CREDIT': 75.8, 'CCOMPNAME': 'DemoCompartment3', 'PAY_CREDIT': 75.8}, {'MFLEX_CREDIT': 149.14, 'CCOMPNAME': 'IndiaTeam', 'PAY_CREDIT': 168.49}, {'MFLEX_CREDIT': 164.08, 'CCOMPNAME': 'DemoCompartment4', 'PAY_CREDIT': 164.08}, {'MFLEX_CREDIT': 381.34, 'CCOMPNAME': 'executive', 'PAY_CREDIT': 572.02}, {'MFLEX_CREDIT': 1209.02, 'CCOMPNAME': 'DIPCCompartment', 'PAY_CREDIT': 1813.54}, {'MFLEX_CREDIT': 3586.35, 'CCOMPNAME': 'GeneralADWCTesting', 'PAY_CREDIT': 5379.53}, {'MFLEX_CREDIT': 4685.46, 'CCOMPNAME': 'oraclebigdatapursuit(root)', 'PAY_CREDIT': 6952.24}, {'MFLEX_CREDIT': 6735.71, 'CCOMPNAME': 'DemoCompartment2', 'PAY_CREDIT': 10103.72}, {'MFLEX_CREDIT': 9695.36, 'CCOMPNAME': 'HUB', 'PAY_CREDIT': 13821.51}, {'MFLEX_CREDIT': 10268.17, 'CCOMPNAME': 'EastTeam', 'PAY_CREDIT': 15268.92}, {'MFLEX_CREDIT': 14518.61, 'CCOMPNAME': 'PoVaaS', 'PAY_CREDIT': 15367.6}, {'MFLEX_CREDIT': 21511.53, 'CCOMPNAME': 'WestCentralTeam', 'PAY_CREDIT': 29769.68}];
//[{'MFLEX_CREDIT': 0.5, 'CCOMPNAME': 'ADWCworkshops', 'PAY_CREDIT': 0.75}, {'MFLEX_CREDIT': 2.82, 'CCOMPNAME': 'NxpCompartment', 'PAY_CREDIT': 4.23}, {'MFLEX_CREDIT': 16.03, 'CCOMPNAME': 'DemoCompartment1', 'PAY_CREDIT': 16.03}, {'MFLEX_CREDIT': 75.8, 'CCOMPNAME': 'DemoCompartment3', 'PAY_CREDIT': 75.8}, {'MFLEX_CREDIT': 149.14, 'CCOMPNAME': 'IndiaTeam', 'PAY_CREDIT': 168.49}, {'MFLEX_CREDIT': 164.08, 'CCOMPNAME': 'DemoCompartment4', 'PAY_CREDIT': 164.08}, {'MFLEX_CREDIT': 381.34, 'CCOMPNAME': 'executive', 'PAY_CREDIT': 572.02}, {'MFLEX_CREDIT': 1209.02, 'CCOMPNAME': 'DIPCCompartment', 'PAY_CREDIT': 1813.54}, {'MFLEX_CREDIT': 3586.35, 'CCOMPNAME': 'GeneralADWCTesting', 'PAY_CREDIT': 5379.53}, {'MFLEX_CREDIT': 4685.46, 'CCOMPNAME': 'oraclebigdatapursuit(root)', 'PAY_CREDIT': 6952.24}, {'MFLEX_CREDIT': 6735.71, 'CCOMPNAME': 'DemoCompartment2', 'PAY_CREDIT': 10103.72}, {'MFLEX_CREDIT': 9695.36, 'CCOMPNAME': 'HUB', 'PAY_CREDIT': 13821.51}, {'MFLEX_CREDIT': 10268.17, 'CCOMPNAME': 'EastTeam', 'PAY_CREDIT': 15268.92}, {'MFLEX_CREDIT': 14518.61, 'CCOMPNAME': 'PoVaaS', 'PAY_CREDIT': 15367.6}, {'MFLEX_CREDIT': 21511.53, 'CCOMPNAME': 'WestCentralTeam', 'PAY_CREDIT': 29769.68}]
   // alert(this.state.componentData);
    return (
        <ComposedChart width={600} height={400} data={data}
            margin={{top: 20, right: 80, bottom: 20, left: 20}}>
          <XAxis dataKey="CCOMPNAME"/>
          <YAxis label=""/>
          <Tooltip/>
          <Legend/>
          <CartesianGrid stroke='#f5f5f5'/>
          <Bar dataKey='PAY_CREDIT' barSize={20} fill='#413ea0'/>
          <Line type='monotone' dataKey='MFLEX_CREDIT' stroke='#ff7300'/>
       </ComposedChart>
    );
  }
}
export default VerticalChart;