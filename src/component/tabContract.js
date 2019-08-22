// MyBarChart.js
import React from 'react';
import { Link } from "react-router-dom";
import axios from 'axios';
class TabContarct extends React.Component {
    constructor(props) {
        super(props);
        this.state = { filerTargertnewStatus:'',btn_nav:7,filterdropdown:''};
      }
      
      handlefilter = () => {
        //  alert('test'+value)
        var value="";
        if(document.getElementById("start_day_date").value!="" && document.getElementById("end_day_date").value!=""){
            value+= document.getElementById("start_day_date").value;
            value+="TO";
            value+=document.getElementById("end_day_date").value;
            // document.getElementById("week").classList.add("hide");
           // alert(value);
            this.setState({ filerTargertnewStatus: value});
        }
    //    else{
    //        alert('Please select From and To date');
    //        return false;
    //    }
        //alert(value);
            // if(value==11){
            //     document.getElementById("week").classList.add("hide");
            //     document.getElementById("quater").classList.add("hide");
            //     document.getElementById("month").classList.remove("hide");
                
            // }else if(value==10){
            //     document.getElementById("week").classList.remove("hide");
            //     document.getElementById("quater").classList.add("hide");
            //     document.getElementById("month").classList.add("hide");
                
            // }
            // else if(value==12){
            //     document.getElementById("week").classList.add("hide");
            //     document.getElementById("quater").classList.remove("hide");
            //     document.getElementById("month").classList.add("hide");
                
            // }
            //document.getElementById("lobContract").classList.add("hide");
        //     if(global.selectedTab===2){
        //         var url;
        //         url='http://www.mocky.io/v2/5ba348aa2f000049009685a8';
               
        //         axios.get(url)
        //             .then(res => {
        //                 var myObj = res;
        //                 var i; var dropdownCreated="<select>";
        //         if(global.selectedTab===2 && global.filterSelectedVal===11){
        //             alert(JSON.stringify(myObj.data.month));
        //             for(i=0;i<=myObj.data.month.length-1;i++){
        //                 dropdownCreated+='<option value="'+JSON.stringify(myObj.data.month[i])+'">'+JSON.stringify(myObj.data.month[i])+'</option>';
        //             }

                    

        //         }else if(global.selectedTab===2 && global.filterSelectedVal===10){
        //             alert(JSON.stringify(myObj.data.week));
        //             for(i=0;i<=myObj.data.week.length-1;i++){
        //                 dropdownCreated+='<option value="'+JSON.stringify(myObj.data.week[i])+'">'+JSON.stringify(myObj.data.week[i])+'</option>';
        //             }

        //         }else if(global.selectedTab===2 && global.filterSelectedVal===12){
        //             for(i=0;i<=myObj.data.quater.length-1;i++){
        //                 dropdownCreated+='<option value="'+JSON.stringify(myObj.data.quater[i])+'">'+JSON.stringify(myObj.data.quater[i])+'</option>';
        //             }

        //     }
        //     this.setState({
        //         filterdropdown: dropdownCreated
        //       })
        // });
        // }

      }
   
    render() {
        // if(global.status==''){
        //     return <Redirect push to="/" />;
        // }
        let {tabChange} = this.props;
        global.filterdropdown=this.state.filterdropdown;
        global.filterSelectedVal = this.state.filerTargertnewStatus;
        var valSelected=window.location.href;
        var filterTarget=valSelected.split("/");
        var filerTargertnew=filterTarget[filterTarget.length-1];
        // alert(filerTargertnew);
        //  alert(this.state.filter);
       //alert(this.state.btn_nav);
        return (
        //     <div className="btn-group text-right" id="navDesc" role="group" aria-label="">
        //         <div className="pos-relative">
        //         <Link to="/weekly"> <button type="button" className={filerTargertnew=="weekly" ? "btn btn-sm btn-default btn-tab active" : "btn btn-sm btn-default btn-tab "}  >Weekly</button></Link>
        //         <Link to="/"><button type="button"  className={filerTargertnew=="" ||filerTargertnew=="overview" || filerTargertnew=="product"  || filerTargertnew=="lob" || filerTargertnew=="autonomous" || filerTargertnew=="contractype"   ? "btn btn-sm btn-default btn-tab active" : "btn btn-sm btn-default btn-tab "} >Monthly</button></Link>
        //         <Link to="/quaterly">   <button type="button" className={filerTargertnew=="quaterly" ? "btn btn-sm btn-default btn-tab btn-last active" : "btn btn-sm btn-default btn-tab btn-last"}   >Quarterly</button></Link>
        //         </div>
        //    </div>
        <div className="btn-group text-right" id="navDesc" role="group" aria-label="">
        <div className="pos-relative">
        <span className="calender"> Start:<input type="date"  id="start_day_date" name="start_day_date"/></span><span className="calender">End:<input type="date"  id="end_day_date"  name="end_day_date"/></span>
        {/* <button type="button" onClick={() => {this.handlefilter(10);tabChange(10)}} className={this.state.filerTargertnewStatus==10 ? "btn btn-sm btn-default btn-tab active" : "btn btn-sm btn-default btn-tab "}  ><label class="hidden-xs">Weekly</label></button> */}
        {/* <button type="button" onClick={() => {this.handlefilter(11);tabChange(11)}} className={this.state.filerTargertnewStatus==11 ?"btn btn-sm btn-default btn-tab active" : "btn btn-sm btn-default btn-tab "} ><label >30 days</label></button>
        <button type="button" onClick={() => {this.handlefilter(12);tabChange(12)}} className={this.state.filerTargertnewStatus==12 ? "btn btn-sm btn-default btn-tab btn-last active" : "btn btn-sm btn-default btn-tab btn-last"}   ><label>90 days</label></button>
        <button type="button" onClick={() => {this.handlefilter(13);tabChange(13)}} className={this.state.filerTargertnewStatus==13  ? "btn btn-sm btn-default btn-tab btn-last active" : "btn btn-sm btn-default btn-tab btn-last"}   ><label>365 days</label></button> */}
        <img src="./static/1.png" onClick={() => {this.handlefilter(document.getElementById("start_day_date").value+"TO"+ document.getElementById("end_day_date").value);tabChange(document.getElementById("start_day_date").value+"TO"+ document.getElementById("end_day_date").value)}} name="Populate" value="Populate"/>
        {/* <input type="button" onClick={() => {this.handlefilter(document.getElementById("start_day_date").value+"TO"+ document.getElementById("end_day_date").value);tabChange(document.getElementById("start_day_date").value+"TO"+ document.getElementById("end_day_date").value)}} name="Populate" value="Populate" /> */}
   </div>
      </div>
        );
    }
}
export default TabContarct;