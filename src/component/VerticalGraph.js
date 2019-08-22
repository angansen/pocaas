import React, { Component } from 'react';
import {ComposedChart, Line, Area, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend} from 'recharts';
import axios from 'axios';



class VerticalChart extends Component {
    constructor() {
        super();
        this.state = {
            
            componentData:''
            
        };
        var dropdownCreated;
        var reqdata ={"compartment_id":"All","from_date":"09-01-2019","to_date":"24-01-2019"}
        axios.post(global.baseDomain + '/cost_estimation/get/',JSON.stringify(reqdata))
            .then(res => {
               
                this.setState({
                    componentData: res.data
                })
                dropdownCreated+='<option value="All">All</option>';

                for(var i=0;i<=res.data.length-1;i++){
                    dropdownCreated+='<option value="'+res.data[i]['COMPARTMENTID']+'">'+res.data[i]['CCOMPNAME']+'</option>';
                }
                localStorage.setItem('dropdownData',dropdownCreated);
            //  console.log(res.data)
          
           })
      }
      componentDidMount() {

        
    }
  render() {
    let { graphData } = this.props;
        let Quaterlydata =this.state.componentData;
        !graphData ? graphData = this.state.componentData : '';
    return (
        <ComposedChart layout="vertical" width={800} height={700} data={graphData}
        margin={{top: 20, right: 20, bottom: 30, left: 120}}>
      <CartesianGrid stroke='#f5f5f5'/>
      <XAxis type="number"/>
      <YAxis dataKey="CCOMPNAME" type="category"/>
      <Tooltip/>
      <Legend/>
      <Bar dataKey='PAY_CREDIT' barSize={80} fill='#98d9f9'/>
      <Line dataKey='MFLEX_CREDIT' stroke='#ff7300'/>
     </ComposedChart>
        
    );
  }
}
export default VerticalChart;