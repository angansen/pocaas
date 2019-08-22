// MyBarChart.js
import React from 'react';
import { Link } from "react-router-dom";
import axios from 'axios';
//import MyBarChart from "./barChart";
class Dropdown extends React.Component {
    constructor() {
        super();
        this.state = {
            
            filterdropdown:'',

            
        };
      }
      
     
    //   handlefilter = (value) => {
       

    //   }
      componentDidMount() {
          
        var authKey= sessionStorage.getItem("authKey");
        var url;
        var reqdata = {
            "compartment_id":"All","from_date":"09-01-2019","to_date":"24-01-2019"
  
  
        }
                var i; var dropdownCreated="";
                dropdownCreated+=localStorage.getItem('dropdownData');
               if( global.filterdropdown!=''){
                this.setState({
                    filterdropdown: global.filterdropdown
                })
               }else{
                this.setState({
                    filterdropdown: dropdownCreated
                }) 
               }
                
               global.selectedDropdownContract='All';
          
            // })

            
    }
    render() {
        let dropdownChange = this.props.onChange;
        var strUser;
                 global.filterdropdown=this.state.filterdropdown;
                 function selectBox(){
                    var e = document.getElementById("selectBox");
                    strUser = e.options[e.selectedIndex].value;
                    global.selectedDropdownContract=strUser;
                    if(strUser==undefined){
                        strUser="All";
                        global.selectedDropdownContract=strUser;
                    }else{
                        global.selectedDropdownContract=strUser;
                    }
                    dropdownChange(global.filterSelectedVal+'FilterDropdown'+global.selectedDropdownContract );
                       // console.log(strUser);
                
                    }
                
                
        return (
            <div class="dropDown_panel">
                <select id="selectBox" dangerouslySetInnerHTML={ { __html:  global.filterdropdown } }  onChange={selectBox}>
                </select>
            </div>
        );
    }
}
export default Dropdown;