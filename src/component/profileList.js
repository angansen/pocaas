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
            componentData: ''
        }; 
    }
   
    componentDidMount() {
        setTimeout(function() {
            
            var classname = document.getElementsByClassName("EditCP");
            var myFunction = function() {
                var propID=this.getAttribute("data-num");
                
               var userName = this.getAttribute("type");
               var ProfileStatus = this.getAttribute("data-type");
               var password = this.getAttribute("data-title");
               var Email = this.getAttribute("data-id");
              //   var ClouteraAttribute = this.getAttribute("alt");
                 document.getElementById("myModal").style.display = 'block';
                 document.getElementById("content_form").classList.add("hide");
                 document.getElementById("CreateProfile").classList.add("hide");
                document.getElementById("EditProfile").classList.remove('hide');
                
                document.getElementById("TF_VAR_edit_Name").value=userName;
                document.getElementById("usr_profile_edit_Email").value=Email;
                document.getElementById("usr_profile_edit_Prop").value='All';
                document.getElementById("usr_profile_edit_ID").value=propID;
                document.getElementById("usr_profile_edit_ProfileStatus").value=ProfileStatus;
                document.getElementById("usr_profile_edit_Password").value=password;
                document.getElementById("usr_profile_edit_CPassword").value=password;
                document.getElementById("close").classList.remove("hide");
              
            };

            for (var i = 0; i < classname.length; i++) {
                classname[i].addEventListener('click', myFunction, false);
            }
        }, 2000);
      document.getElementById("showList").classList.remove("hide");
      document.getElementById("logout").classList.remove("hide");
      var n, m = '';
       var povVariable={
        TF_user_id:sessionStorage.getItem("user_id"),
        TF_user_role:sessionStorage.getItem("user_role"),
        TF_company_ID:sessionStorage.getItem("COMPANY_ID"),
        TF_user_listby:"All"
       
     }
          axios.post(global.baseDomain+'/user/list/',JSON.stringify(povVariable))
          .then(res => {
              var myObj = res.data;
              var n, m = '<tr><th>Name</th><th>EmailId</th><th>Company Name</th><th>Phone no</th><th>Role</th><th>Action</th></tr>';
             
              for(n=0;n<myObj.length;n++){
                  if(myObj[n].POVAAS_USER_ACTIVESTATUS==1){
                      var Userclass="checked";
                  }else{
                    var Userclass="";  
                  }
                  var role="";
                  if(myObj[n].USER_ROLE==0){
                    role="super Admin";
                }
                  if(myObj[n].USER_ROLE==1){
                      role="Admin";
                  }
                  else if(myObj[n].USER_ROLE==2){
                    role="User";
                  }
                  if(myObj[n].USERNAME == sessionStorage.getItem("user_name")){
                    var status="Same";
                }else{
                    var status="notSame";
                }
                var valSelected=window.location.href;
                var errormsg=valSelected.split("msg=");
                var msgerror="";
                if(errormsg!=""){
                   if(errormsg[1]==1){
                       msgerror+="<strong className='error'>User profile activated successfully<strong>";
                    }else if(errormsg[1]==0){
                       msgerror+="<strong className='error'>User profile de-activated successfully<strong>";
                    }
                }
                else{
                   msgerror+=""; 
                }
                m += '<tr><td>'+myObj[n].USERNAME+'</td><td>'+myObj[n].EMAIL+'</td><td>'+myObj[n].COMPANY_NAME+'</td><td>'+myObj[n].USER_PHONE+'</td><td>'+role+'</td><td> <label class="switchcompanyStatus switch" type="'+myObj[n].USER_ID+'" alt="'+myObj[n].POVAAS_USER_ACTIVESTATUS+'"><input type="checkbox" '+Userclass+'><span class="slider round"></span></label></td><td class="EditCP" data-id="'+myObj[n].EMAIL+'" data-title="'+myObj[n].PASSWORD+'" type="'+myObj[n].USERNAME+'" data-type="'+status+'" data-num="'+myObj[n].USER_ID+'" title="Edit profile">&#x270D;</td></tr>';
              }
              this.setState({
                  componentData: m,
                  errormsg:msgerror
              })
    
            }).catch((error) => {
                if (error.response) {
                   // console.log(error.response.status);
                    if(error.response.status==401){
                        sessionStorage.clear();
                         window.location.href='/login';
                    }
        
                  }
              });
        
          this.setState({
              componentData: m
          })
    //   })


    }
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
            //    axios({
            //     method: 'post',
            //     url: global.baseDomain+'/edit_user_status/',
            //     data: JSON.stringify(reqdata)
    
            // });

            axios.post(global.baseDomain+'/user/edit/', JSON.stringify(reqdata))
            .then(res => {
            if(res.data['Oracle-Error-Message']=='SUCCESS'){
                if(reqstatus==1){
                   // alert('Company enabled successfully');
                    window.location.href='/Profile?msg=1';

                }else{
                   // alert('Company disabled successfully');
                    window.location.href='/Profile?msg=0';
                }

                }
             }).catch((error) => {
                if (error.response) {
                   // console.log(error.response.status);
                    if(error.response.status==401){
                        sessionStorage.clear();
                         window.location.href='/login';
                    }
        
                  }
              });
                
            };

            for (var i = 0; i < classname.length; i++) {
                classname[i].addEventListener('click', switchCompanyStatus, false);
            }
        }, 5000);
        // if (this.state.position != 1) {
        //     setTimeout(
        //         function () {
        //             this.setState({ position: 2 });
        //         }
        //             .bind(this),
        //         120000
        //     );
        //     setTimeout(
        //         function () {
        //             this.setState({ position: 3 });
        //         }
        //             .bind(this),
        //         120000
        //     );

        // }
    
        // if (this.state.position == 2) {
        //     return <Redirect push to="/dash" />;
        // }
         setTimeout(function() {
              var classname = document.getElementsByClassName("deleteYes");
              var myFunction = function() {
                  var attribute = this.getAttribute("type");
                 // if(attribute==='column red'){
                   // var el = document.getElementById('content-box').getElementsByTagName('button');
                    document.getElementById("myModal").style.display = 'block';
                    document.getElementById("hiddenData").value =attribute;
                    document.getElementById("ConfirmBox").classList.remove("hide");
                    document.getElementById("content_form").classList.add("hide");
                    document.getElementById("StatusPage").classList.add("hide");
                    document.getElementById("close").classList.remove("hide");
                 // }
                  
              };

              for (var i = 0; i < classname.length; i++) {
                  classname[i].addEventListener('click', myFunction, false);
              }
          }, 2000);
          setTimeout(function() {
            var classname = document.getElementsByClassName("edit-profile");
            

            var createProfilePop = function() {
              // alert('create Profile');
              var Name = this.getAttribute("name");
                document.getElementById("TF_VAR_Name").value =Name;
                document.getElementById("myModal").style.display = 'block';
                document.getElementById("CreateProfile").classList.remove("hide");
                document.getElementById("content_form").classList.add("hide");
                document.getElementById("StatusPage").classList.add("hide");
                document.getElementById("close").classList.remove("hide");
                document.getElementById("ConfirmBox").classList.add("hide");
            };

            for (var i = 0; i < classname.length; i++) {
                classname[i].addEventListener('click', createProfilePop, false);
            }
        }, 2000);

        function signUpCick(){
            //alert('1');
            // document.getElementById("TF_VAR_Name").value =Name;usr_profile_Company

            axios.post(global.baseDomain+'/company/list/')
            .then(res => {
                var myObj = res.data;
                var j, x = '',y='',k;
               //console.log(myObj.length);
                for (j=0;j< myObj.length-1; j++) {
                   if(myObj[j].COMPANY_STATUS!=0 &&  sessionStorage.getItem("user_role")==0){
                    //<img src='https://cloud.oracle.com/opc/iaas/images/Jenkins-Logo-185x103.jpg'/>
                    x += '<option value="'+myObj[j].COMPANY_ID+'">'+myObj[j].COMPANY_NAME+'</option>';
                   }else if(myObj[j].COMPANY_STATUS!=0 &&  sessionStorage.getItem("user_role")==1){
                    x += '<option value="'+ sessionStorage.getItem("COMPANY_ID")+'">'+sessionStorage.getItem("COMPANY_NAME")+'</option>';
                   break;
                 }
                }
                if(sessionStorage.getItem("user_role")==0){
                        y+='<option value="0">SuperAdmin</option><option value="1">Admin</option><option value="2">User</option>';
                   
                  
                }else if(sessionStorage.getItem("user_role")==1){
                    y+='<option value="2">User</option>';

                }
                document.getElementById("usr_profile_Company").innerHTML =x;
                document.getElementById("usr_profile_Role").innerHTML =y;
            }).catch((error) => {
                if (error.response) {
                   // console.log(error.response.status);
                    if(error.response.status==401){
                        sessionStorage.clear();
                         window.location.href='/login';
                    }
        
                  }
              });
            document.getElementById("myModal").style.display = 'block';
            document.getElementById("CreateProfile").classList.remove("hide");
            document.getElementById("content_form").classList.add("hide");
            document.getElementById("StatusPage").classList.add("hide");
            document.getElementById("close").classList.remove("hide");
            document.getElementById("ConfirmBox").classList.add("hide");

        }
        function signUpCompanyCick(){
            //alert('1');
            document.getElementById("myModal").style.display = 'block';
            document.getElementById("CreateProfile").classList.add("hide");
            document.getElementById("content_form").classList.add("hide");
            document.getElementById("StatusPage").classList.add("hide");
            document.getElementById("close").classList.remove("hide");
            document.getElementById("ConfirmBox").classList.add("hide");
            document.getElementById("SignUpProfile").classList.add("hide");
            document.getElementById("SignUpCompanyProfile").classList.remove("hide");

        }
             return (
                <div>
                    <div className="userProfilestruc" >
                    <div dangerouslySetInnerHTML={ { __html:  this.state.errormsg } } className="text-center error"></div>
                    <span  onClick={signUpCick}>
                        Create User
                    </span>
                    </div>
                    <div className="listingContent">
                        <table dangerouslySetInnerHTML={ { __html:  this.state.componentData } }>
                        
                        
                        </table>
                    </div>
                 </div>
               
            );
            }
            
        }
        
export default ShowList;
  

  