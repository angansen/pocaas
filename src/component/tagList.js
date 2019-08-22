import React, {
    Component
  } from 'react';
import {
    BrowserRouter as Router,
    Route,
    Link,
    Redirect,
    withRouter
} from "react-router-dom";  
import axios from 'axios';
  class ShowList extends Component { 
    constructor() {
        super();
        this.state = {
            componentData: '',
            componentDataAdwc:'',
            componentDataAtp:''
        }; 
    }
   
    componentDidMount() {
      document.getElementById("showList").classList.remove("hide");
      document.getElementById("logout").classList.remove("hide");
      var n, m = '';
      
      axios.post(global.baseDomain+'/instance_tag_list/')
      .then(res => {
          var myObj = JSON.parse(res.data);
          var n, m = '', t='',atp='';
         
         // console.log(myObj.instance.length);
         var valSelected=window.location.href;
         var errormsg=valSelected.split("msg=");
         var msgerror="";
         if(errormsg!=""){
            if(errormsg[1]==1){
                msgerror+="<strong className='error'>Company activated successfully<strong>";
             }else if(errormsg[1]==0){
                msgerror+="<strong className='error'>Company de-activated successfully<strong>";
             }
         }
         else{
            msgerror+=""; 
         }
          m += "<tr><th>Tag Key</th><th>Tag value</th><th>Time Zone</th><th>Stop Time</th><th>Action</th></tr>";
          for(n=0;n<myObj.instance.length;n++){
           //   alert(myObj.instance[n].PoVaaS)
            //   if(myObj[n].COMPANY_STATUS==1){
            //       var Companyclass="checked";
            //   }else{
            //     var Companyclass="";  
            //   }
            if(myObj.instance[n].TIME_ZONE!=null){
                var timeZone=myObj.instance[n].TIME_ZONE;
            }else{
                var timeZone='-';
            }
            if(myObj.instance[n].STOP_TIME!=null){
                var stopTime=myObj.instance[n].STOP_TIME;
            }else{
                var stopTime='-';
            }

            m += '<tr><td>PoVaaS</td><td>'+myObj.instance[n].TAG_VALUE+'</td><td className="text-center">'+timeZone+'</td><td className="text-center">'+stopTime+'</td><td name="User" class="edit-tag " data_tag_value="'+myObj.instance[n].TAG_VALUE+'" data_time_zone="'+timeZone+'" data_status="'+myObj.instance[n].INSTANCE_ACTIVE+'" data_stop_time="'+stopTime+'" data_instanceType="'+myObj.instance[n].TYPE+'" title="Edit Company"> &#x270D; </td></tr>';
            //t += '<tr><td>'+myObj.adwc[n].PoVaaS+'</td><td> <label class="switchcompanyStatus switch" ><input type="checkbox"><span class="slider round"></span></label></td><td name="User1" class="edit-company-profile hide"  title="Edit Company"> &#x270D; </td></tr>';

        }
        t+="<tr><th>Tag Key</th><th>Tag value</th><th>Time Zone</th><th>Stop Time</th><th>Action</th></tr>";
        for(n=0;n<myObj.adwc.length;n++){
            //   alert(myObj.instance[n].PoVaaS)
             //   if(myObj[n].COMPANY_STATUS==1){
             //       var Companyclass="checked";
             //   }else{
             //     var Companyclass="";  
             //   }
             if(myObj.adwc[n].TIME_ZONE!=null){
                var timeZone=myObj.adwc[n].TIME_ZONE;
            }else{
                var timeZone='-';
            }
            if(myObj.adwc[n].STOP_TIME!=null){
                var stopTime=myObj.adwc[n].STOP_TIME;
            }else{
                var stopTime='-';
            }
             t += '<tr><td>PoVaaS</td><td>'+myObj.adwc[n].TAG_VALUE+'</td><td className="text-center">'+timeZone+'</td><td className="text-center">'+stopTime+'</td><td name="User" class="edit-tag " data_tag_value="'+myObj.adwc[n].TAG_VALUE+'" data_time_zone="'+timeZone+'" data_status="'+myObj.adwc[n].INSTANCE_ACTIVE+'" data_stop_time="'+stopTime+'" data_instanceType="'+myObj.adwc[n].TYPE+'" title="Edit Company"> &#x270D; </td></tr>';
             //t += '<tr><td>'+myObj.adwc[n].PoVaaS+'</td><td> <label class="switchcompanyStatus switch" ><input type="checkbox"><span class="slider round"></span></label></td><td name="User1" class="edit-company-profile hide"  title="Edit Company"> &#x270D; </td></tr>';
 
         }
         atp+="<tr><th>Tag Key</th><th>Tag value</th><th>Time Zone</th><th>Stop Time</th><th>Action</th></tr>";

         for(n=0;n<myObj.atp.length;n++){
            //   alert(myObj.instance[n].PoVaaS)
             //   if(myObj[n].COMPANY_STATUS==1){
             //       var Companyclass="checked";
             //   }else{
             //     var Companyclass="";  
             //   }
             if(myObj.atp[n].TIME_ZONE!=null){
                var timeZone=myObj.atp[n].TIME_ZONE;
            }else{
                var timeZone='-';
            }
            if(myObj.atp[n].STOP_TIME!=null){
                var stopTime=myObj.atp[n].STOP_TIME;
            }else{
                var stopTime='-';
            }
             atp += '<tr><td>PoVaaS</td><td>'+myObj.atp[n].TAG_VALUE+'</td><td className="text-center">'+timeZone+'</td><td className="text-center">'+stopTime+'</td><td name="User" class="edit-tag " data_tag_value="'+myObj.atp[n].TAG_VALUE+'" data_time_zone="'+timeZone+'" data_status="'+myObj.atp[n].INSTANCE_ACTIVE+'" data_stop_time="'+stopTime+'" data_instanceType="'+myObj.atp[n].TYPE+'" title="Edit Company"> &#x270D; </td></tr></tr>';
             //t += '<tr><td>'+myObj.adwc[n].PoVaaS+'</td><td> <label class="switchcompanyStatus switch" ><input type="checkbox"><span class="slider round"></span></label></td><td name="User1" class="edit-company-profile hide"  title="Edit Company"> &#x270D; </td></tr>';
 
         }
         // alert(m);
        //   m += '<td> <label class="switchcompanyStatus"><input type="checkbox"><span class="slider round"></span></label></td><tr><td>User1</td><td><button name="User1" class="delete-profile "> &times; </button></td></tr>';
        //   m += '<tr><td>User2</td><td><button name="User1" class="delete-profile "> &times; </button></td></tr>';
        //   m += '<tr><td>User3</td><td><button name="User1" class="delete-profile "> &times; </button></td></tr>';
         
          this.setState({
              componentData: m,
              errormsg: msgerror,
              componentDataAdwc: t,
              componentDataAtp:atp
          })

        })
        
        .catch((error) => {
            if (error.response) {
               // console.log(error.response.status);
                if(error.response.status==401){
                    sessionStorage.clear();
                     window.location.href='/login';
                }
    
              }
          });
    }
    // signUpTagCick(){
    //     //alert('1');
       

    // }
    render() {
        setTimeout(function() {
            var classname = document.getElementsByClassName("switchcompanyStatus");
            var switchCompanyStatus = function() {
                var Id = this.getAttribute("type");
                var status = this.getAttribute("alt");
                var reqstatus;
                if(status==1){
                    reqstatus=0;
                }else{
                    reqstatus=1;
                }
               var reqdata = {
                   TF_VAR_ID:Id,
                    TF_VAR_Status: reqstatus,
               }

            axios.post(global.baseDomain+'/company/edit/', JSON.stringify(reqdata))
            .then(res => {
            if(res.data['Oracle-Error-Message']=='SUCCESS'){
                if(reqstatus==1){
                    // alert('Company enabled successfully');
                     window.location.href='/Company?msg=1';
 
                 }else{
                    // alert('Company disabled successfully');
                     window.location.href='/Company?msg=0';
                 }
                  
                    
                }
             })
                
            };

            for (var i = 0; i < classname.length; i++) {
                classname[i].addEventListener('click', switchCompanyStatus, false);
            }
        }, 2000);
        setTimeout(function() {
            var classname = document.getElementsByClassName("edit-tag");
            var signUpTagCick = function() {
                var data_tag_value = this.getAttribute("data_tag_value");
             //  alert(data_stop_time);
             var time_zone_pick  = this.getAttribute("data_time_zone");
             var stop_time_pick  = this.getAttribute("data_stop_time");
             var data_stop_time;
             var data_time_zone;
               if(stop_time_pick=="-" ){
                 data_stop_time  = '';
              //  var data_time_zone  = '';
               }else{
                 data_stop_time  = this.getAttribute("data_stop_time");
               // var data_time_zone  = this.getAttribute("data_time_zone");
               }
//alert(data_time_zone);
               if(time_zone_pick=="-" ){
              //  var data_stop_time  = '';
                 data_time_zone  = '';
                
               }else{
               // var data_stop_time  = this.getAttribute("data_stop_time");
                 data_time_zone  = this.getAttribute("data_time_zone");
               }
             //  alert(data_time_zone);

                var data_status=this.getAttribute("data_status");
                var data_instanceType=this.getAttribute("data_instanceType");
                
                document.getElementById("myModal").style.display = 'block';
                document.getElementById("CreateProfile").classList.add("hide");
                document.getElementById("content_form").classList.add("hide");
                document.getElementById("StatusPage").classList.add("hide");
                document.getElementById("close").classList.remove("hide");
                document.getElementById("ConfirmBox").classList.add("hide");
                document.getElementById("SignUpProfile").classList.add("hide");
                document.getElementById("tagContent").value="new";
                document.getElementById("create_tag_profile").classList.remove("hide");
                document.getElementById("tag_value").value=data_tag_value;
                document.getElementById("Status_Tag").value=data_status;
                document.getElementById("stop_time").value=data_stop_time;
                document.getElementById("time_zone").value=data_time_zone;
                document.getElementById("instance").value=data_instanceType;
                
                

            }

            for (var i = 0; i < classname.length; i++) {
                classname[i].addEventListener('click', signUpTagCick, false);
            }
        }, 2000);


        // setTimeout(function() {
        //     var classname = document.getElementsByClassName("edit-company-profile");
        //     var EditCompanyProfile = function() {
        //       //  alert('test');
        //         var Id = this.getAttribute("type");
        //         var status = this.getAttribute("alt");
        //         var Name = this.getAttribute("name");
        //         document.getElementById("TF_VAR_Name").value =Name;
        //         document.getElementById("myModal").style.display = 'block';
        //         document.getElementById("CreateProfile").classList.add("hide");
        //         document.getElementById("content_form").classList.add("hide");
        //         document.getElementById("StatusPage").classList.add("hide");
        //         document.getElementById("close").classList.remove("hide");
        //         document.getElementById("ConfirmBox").classList.add("hide");
        //         document.getElementById("SignUpProfile").classList.add("hide");
        //         document.getElementById("SignUpCompanyProfile").classList.remove("hide");
                
        //     };

        //     for (var i = 0; i < classname.length; i++) {
        //         classname[i].addEventListener('click', EditCompanyProfile, false);
        //     }
        // }, 2000);
        //  setTimeout(function() {
        //       var classname = document.getElementsByClassName("deleteYes");
        //       var myFunction = function() {
        //           var attribute = this.getAttribute("type");
        //          // if(attribute==='column red'){
        //            // var el = document.getElementById('content-box').getElementsByTagName('button');
        //             document.getElementById("myModal").style.display = 'block';
        //             document.getElementById("hiddenData").value =attribute;
        //             document.getElementById("ConfirmBox").classList.remove("hide");
        //             document.getElementById("content_form").classList.add("hide");
        //             document.getElementById("StatusPage").classList.add("hide");
        //             document.getElementById("close").classList.remove("hide");
        //          // }
                  
        //       };

        //       for (var i = 0; i < classname.length; i++) {
        //           classname[i].addEventListener('click', myFunction, false);
        //       }
        //   }, 2000);
          setTimeout(function() {
            var classname = document.getElementsByClassName("edit-profile");
            

            var createProfilePop = function() {
              // alert('create Profile');
              var Name = this.getAttribute("name");
                document.getElementById("TF_VAR_Name").value =Name;
                document.getElementById("myModal").style.display = 'block';
                document.getElementById("create_tag_profile").classList.remove("hide");
                document.getElementById("content_form").classList.add("hide");
                document.getElementById("StatusPage").classList.add("hide");
                document.getElementById("close").classList.remove("hide");
                document.getElementById("ConfirmBox").classList.add("hide");
               
                
            };

            for (var i = 0; i < classname.length; i++) {
                classname[i].addEventListener('click', createProfilePop, false);
            }
        }, 2000);
        

        
            
             return (
                <div>
                    <div className="userProfilestruc" >
                    <div dangerouslySetInnerHTML={ { __html:  this.state.errormsg } } className="text-center error"></div>
                    {/* <span  onClick={signUpTagCick}>
                       Manage Tags
                    </span> &nbsp; */}
                    
                    </div>
                    <div className="listingContent tagTable">
                        <h2>Instances</h2>
                        <table dangerouslySetInnerHTML={ { __html:  this.state.componentData } }></table>
                        <h2>ADWC</h2>
                        <table dangerouslySetInnerHTML={ { __html:  this.state.componentDataAdwc } }></table>
                        <h2>ATP</h2>
                        <table dangerouslySetInnerHTML={ { __html:  this.state.componentDataAtp } }></table>
                    </div>
                 </div>
               
            );
            }
            
        }
        
export default ShowList;
  

  