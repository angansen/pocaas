// MyBarChart.js
import React from 'react';
import { Link } from "react-router-dom";
import VerticalChart from './VerticalGraph';
import DropDownContract from './dropdown';
import TabContarct from "./tabContract";
import axios from 'axios';
class Parent extends React.Component {
    constructor(props) {
        super(props);
        this.state = { componentMange:'',graphData:''};
      }
      
    dropdownChange = (data)  => {
   // alert(data);
    
      let res = data.split("FilterDropdown");
      let StartDate;
      let EndDate;
      let to;
       // alert(res[0]);
        if(res[0]!=""){
            let tabValue;
        let time_value;
        // let selectedF= res[0].toString();
        // alert(res[0]);
        let strPopulate=res[0].split('TO');
       // alert(strPopulate)
       if(strPopulate[0]!="" && strPopulate[1]!=""){
        to=strPopulate[1];
        let newFrom=strPopulate[0].split('-');
        let newto=strPopulate[1].split('-');
         StartDate=newFrom[2]+'-'+newFrom[1]+'-'+newFrom[0];
         EndDate=newto[2]+'-'+newto[1]+'-'+newto[0];
       }else{
           alert('You have to select both Start and End date');
           return false;
       }
        
        }else{
            alert('You have to select both Start and End date');
            return false;
        }
        
    //   if(selectedF == 10) {
    //             tabValue = 'week';
    //             time_value='7';
    //            }else if(selectedF == 11) {
    //             tabValue = 'month';
    //             time_value='30';
    //            }else if(selectedF == 12) {
    //             tabValue = 'quater';
    //             time_value='90';
    //            }
    //            else if(selectedF == 13) {
    //             tabValue = 'year';
    //             time_value='365';
    //            }
          //  alert(global.selectedDropdownContract + tabValue);

            var reqdata = {
              "compartment_id": res[1],
              "from_date": StartDate,
              "to_date": EndDate
    
    
          }
          axios.post(global.baseDomain + '/cost_estimation/get/',JSON.stringify(reqdata))
              .then(res => {
                 
                  this.setState({
                    graphData: res.data
                  })
                
            
             })
    }
    tabChange = (data)  => {
        //alert(data);
    //alert('1'+ data);
    var strPopulate=data.split('TO');
    if(strPopulate[0]!="" && strPopulate[1]!=""){
        var from=strPopulate[0];
        var to=strPopulate[1];
        var newFrom=from.split('-');
        var newto=to.split('-');
        var StartDate=newFrom[2]+'-'+newFrom[1]+'-'+newFrom[0];
        var EndDate=newto[2]+'-'+newto[1]+'-'+newto[0];
        // let tabValue;
        // let time_value;
          
              //  alert(global.selectedDropdownContract + tabValue);
    
                var reqdata = {
                  "compartment_id": global.selectedDropdownContract,
                  "from_date": StartDate,
                  "to_date": EndDate
        
        
              }
              axios.post(global.baseDomain + '/cost_estimation/get/',JSON.stringify(reqdata))
                  .then(res => {
                     
                      this.setState({
                        graphData: res.data
                      })
                    
                
                 })
    }else{
        alert('You have to Select both From and To date');
        return false;
    }
    //console.log(strPopulate[0]);
   
   }
    // graphLobChange = (data)  => {
    //     setTimeout(() => {

            
    //     // console.log(this);
    //     // console.log(global.selectedDropdownContract);
    //     // console.log(global.filterSelectedVal);
    //     // console.log(data[data.length-1].name);
    //     var month=data[0].name;
    //     var type; var dataVal; 
    //     if(global.filterSelectedVal==11){
    //       type='month';
    //       dataVal='Month: '+month;
    //     }else if(global.filterSelectedVal==10){
    //       type='week';
    //       dataVal='Week: '+month;
    //     }
    //     else if(global.filterSelectedVal==12){
    //       type='quater';
    //       dataVal='Quarter: '+month;
    //     }
    //     else if(global.filterSelectedVal==13){
    //         type='year';
    //         dataVal='Year: '+month;
    //       }
        
    //    alert(type);
    //     // axios.get("http://solutionengineering-devops.us.oracle.com:8090/contract/kpi?contractType="+global.selectedDropdownContract+"&periodType="+type+"&periodValue="+month)
    //     //     .then((response) => {
    //     //           this.setState({ dataLOB: response.data, dataLOBSelected: dataVal});
    //     //          // console.log("test"+JSON.stringify(response));
    //     //      })
    //     //     .catch((err) => {
    //     //           //this.setState({ data: err, isLoading: false });
    //     //           //console.log(err)
    //     //      });

          
    //     }, 1000);
        
       
    // }

    // tabChange = (data)  => {
    //    alert('1');
    //     let monthlist =[];
    //     let tabValue='';
    //     if(data == 10) {
    //         tabValue = 'week';
    //        }else if(data == 11) {
    //         tabValue = 'month';
    //        }else if(data == 12) {
    //         tabValue = 'quater';
    //        }
    //        else if(data == 13) {
    //         tabValue = 'year';
    //        }
    //     // if(global.selectedDropdownContract=='All'){ 
    //     //     // for(var i=0;i<global.data[tabValue][global.selectedDropdownContract+""].length;i++){
    //     //     // var LobVal= global.data[tabValue][global.selectedDropdownContract+""][i].value/1000000;
    //     //     // // alert(parseFloat((LobVal).toFixed(2)));
    //     //     //     monthlist.push({
    //     //     //     name:global.data[tabValue][global.selectedDropdownContract+""][i].name,
    //     //     //     Consumption:parseFloat((LobVal).toFixed(2)),
    //     //     //     Target:0
    //     //     //     })                            
    //     //     }
    //     // this.setState({
    //     //     graphData : monthlist
    //     // });
    //     // this.graphLobChange(monthlist);
    // }

    graphClick = (data) => {
     
        // var type; var dataVal;
        // if(global.filterSelectedVal==11){
        //   type='month';
        //   dataVal='Month: '+data;
        // }else if(global.filterSelectedVal==10){
        //   type='week';
        //   dataVal='Week: '+data;
        // }
        // else if(global.filterSelectedVal==12){
        //   type='quater';
        //   dataVal='Quater: '+data;
        // }else if(global.filterSelectedVal==13){
        //     type='year';
        //     dataVal='Year: '+data;
        // }
    
        // axios.get("http://solutionengineering-devops.us.oracle.com:8090/contract/kpi?contractType="+global.selectedDropdownContract+"&periodType="+type+"&periodValue="+data)
        //     .then((response) => {
        //           this.setState({ dataLOB: response.data,dataLOBSelected: dataVal});
        //          // console.log("test"+JSON.stringify(response));
        //      })
        //     .catch((err) => {
        //           //this.setState({ data: err, isLoading: false });
        //           console.log(err)
        //      });
    }
   
    render() {
    // alert(global.selectedDropdownContract+'1');
    // alert(global.filterSelectedVal+'tewst');
    // let tabValue;
    // let time_value;
    // let data= global.filterSelectedVal;
    //   if(data == 10) {
    //             tabValue = 'week';
    //             time_value='7';
    //            }else if(data == 11) {
    //             tabValue = 'month';
    //             time_value='30';
    //            }else if(data == 12) {
    //             tabValue = 'quater';
    //             time_value='90';
    //            }
    //            else if(data == 13) {
    //             tabValue = 'year';
    //             time_value='365';
    //            }
    //       //  alert(global.selectedDropdownContract + tabValue);

    //         var reqdata = {
    //           "compartment_id": global.selectedDropdownContract,
    //           "year": "2018",
    //           "time_name": tabValue,
    //           "time_value": time_value
    
    
    //       }
    //       axios.post(global.baseDomain + '/get_povaas_cost/',JSON.stringify(reqdata))
    //           .then(res => {
                 
    //               this.setState({
    //                 graphData: res.data
    //               })
                
            
    //          })

     // let {graphData} = this.state;
     

        return (
            <div>
                <DropDownContract onChange={this.dropdownChange.bind(this)}/>
                <TabContarct tabChange={this.tabChange.bind(this)}/>
                    <div className="graphContainer">
                    <VerticalChart graphData={this.state.graphData}/>
                    </div>   
            </div>
        );
    }
}
export default Parent;