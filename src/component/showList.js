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
        document.getElementById("showList").classList.remove("hide");
        document.getElementById("logout").classList.remove("hide");
        var povVariable = {
            TF_user_id: sessionStorage.getItem("user_id"),
            TF_user_role: sessionStorage.getItem("user_role"),
            TF_company_ID: sessionStorage.getItem("COMPANY_ID")

        }
        axios.post(global.baseDomain + '/pages/dashboard/', JSON.stringify(povVariable))
            .then(res => {
              //  console.log(res.data)

                var myObj = res.data;
                var n, m = '';
               // console.log(myObj);
                if (myObj.length > 0) {
                    m = "<tr><th>Instance Title</th><th>Solution Name</th><th>Instance IP</th><th>Instance Count</th><th>Status</th><th>Action</th></tr>";
                    for (var n = 0; n <= myObj.length - 1; n++) {
                        if (myObj[n].TF_VAR_Ip != '') {
                            if (myObj[n].TF_VAR_StatusMsg == 'RUNNING') {
                                if(myObj[n].instance_status=='0'){
                                    var  btnStartStopInstance = '<button class="deletebtn StartBtn" data-status="'+myObj[n].instance_status+'" type="' + myObj[n].TF_VAR_id + '" alt="' + myObj[n].TF_Var_SolutionID + '"> Start </button>&nbsp;&nbsp;';
                                  }else{
                                      var  btnStartStopInstance = '<button class="deletebtn StartBtn" data-status="'+myObj[n].instance_status+'" type="' + myObj[n].TF_VAR_id + '" alt="' + myObj[n].TF_Var_SolutionID + '"> Stop </button>&nbsp;&nbsp;';
                                  }
                                if (myObj[n].TF_Var_SolutionID == "8") {
                                   
                                  var actionBtn = '<button  class="launchbtnADWC " alt="' + myObj[n].TF_Var_SolutionID + '" data-field="' + myObj[n].login_status + '" type="' + myObj[n].TF_VAR_id + '"> Launch </button>&nbsp;&nbsp;'+btnStartStopInstance+'<button class="deletebtn No deleteYes" type="' + myObj[n].TF_VAR_id + '" alt="' + myObj[n].TF_Var_SolutionID + '"> Delete </button>';
                                } else {
                                    var actionBtn = '<a href="' + myObj[n].TF_VAR_HTTPPath + '" target="_blank"><button  class="launchbtn "> Launch </button></a>&nbsp;&nbsp;'+btnStartStopInstance+'<button class="deletebtn No deleteYes" type="' + myObj[n].TF_VAR_id + '" alt="' + myObj[n].TF_Var_SolutionID + '"> Delete </button>';
                                }

                            } else {
                                if (myObj[n].TF_Var_SolutionID == "1") {
                                    var actionBtn = '<button class="inprogress" title="disabled"> Launch </button>&nbsp;&nbsp;<button class="deletebtn  No deleteYes"  type="' + myObj[n].TF_VAR_id + '" alt="' + myObj[n].TF_Var_SolutionID + '"> Delete </button><br/><small>Jupiter notebook is not ready yet</small>';
                                } else {
                                    var actionBtn = '<button class="inprogress" title="disabled"> Launch </button>&nbsp;&nbsp;<button class="deletebtn  No deleteYes"  type="' + myObj[n].TF_VAR_id + '" alt="' + myObj[n].TF_Var_SolutionID + '"> Delete </button><br/>';

                                }
                            }
                        } else if (myObj[n].TF_VAR_Ip === '') {
                            var actionBtn = '<button class="inprogress" title="disabled"> Launch </button>&nbsp;&nbsp;<button class="deletebtn " title="disabled" type="' + myObj[n].TF_VAR_id + '" alt="' + myObj[n].TF_Var_SolutionID + '"> Delete </button>';

                        } else {
                            // if(myObj[n].TF_VAR_StatusMsg=='TERMINATING'){
                            var actionBtn = '<button class="inprogress" title="disabled"> Launch </button>&nbsp;&nbsp;<button class="deletebtn " title="disabled" type="' + myObj[n].TF_VAR_id + '" alt="' + myObj[n].TF_Var_SolutionID + '"> Delete </button>';
                            //      }
                        }
                        var Count = "";
                        //alert(myObj[n].TF_Var_InstanceCount);
                        if (myObj[n].TF_Var_InstanceCount == undefined) {
                            Count = 0;
                        } else {
                            Count = myObj[n].TF_Var_InstanceCount;

                        }
                        var SolutionName = myObj[n].TF_VAR_Solution;
                        if (myObj[n].TF_VAR_SSH_Ip != undefined && myObj[n].TF_VAR_SSH_Ip != '') {
                            if (myObj[n].TF_VAR_Ip != '') {
                                var Ip = '<small>Master IP: </small>' + myObj[n].TF_VAR_Ip + '<br/><small>SSH IP: </small>' + myObj[n].TF_VAR_SSH_Ip;
                            } else {
                                var Ip = '<small>SSH IP: </small>' + myObj[n].TF_VAR_SSH_Ip;
                            }
                        } else if (myObj[n].TF_VAR_Ip != undefined && myObj[n].TF_VAR_Ip != '') {
                            var Ip = '<small>Master IP: </small>' + myObj[n].TF_VAR_Ip;
                        } else {
                            var Ip = '-';
                        }
                        var statusInstance;
                        if(myObj[n].instance_status=='0'){
                            statusInstance="STOPPED";
                        }else{
                            statusInstance="RUNNING";
                        }
                        m += '<tr><td class="word-wrap">' + myObj[n].TF_VAR_InstanceTitle + '</td><td>' + SolutionName + '</td><td>' + Ip + '</td><td class="text-center">' + Count + '</td><td>'+statusInstance+'</td><td>' + actionBtn + '</td></tr>';

                    }

                } else {
                    m += '<tr><td class="word-wrap text-center">No Instance created yet.</td></tr>';
                }
                this.setState({
                    componentData: m
                })
            }).catch((error) => {
              //  console.log(error.response.status);
                if (error.response.status=="401") {
                    sessionStorage.clear();
                    window.location.href='/';
                  } else {
                    console.log('Error', error.message);
                  }
            })


    }
    render() {

            setTimeout(function() {
                if (sessionStorage.getItem("user_role") == 0) {
                    
                    document.getElementById('tagManagement').classList.remove('hide');
                    document.getElementById('companyList').classList.remove('hide');
                    document.getElementById('userList').classList.remove('hide');
                } else if (sessionStorage.getItem("user_role") == 1) {
                    // document.getElementById('companyList').classList.remove('hide');
                    document.getElementById('userList').classList.remove('hide');
                } else {
                    document.getElementById('companyList').classList.add('hide');
                    document.getElementById('userList').classList.add('hide');
                    document.getElementById('tagManagement').classList.add('hide');
                }
            }, 500);
            setTimeout(function() {

                var classname = document.getElementsByClassName("deleteYes");
                var myFunction = function() {
                    var attribute = this.getAttribute("type");
                    var ClouteraAttribute = this.getAttribute("alt");
                    // if(attribute==='column red'){
                    // var el = document.getElementById('content-box').getElementsByTagName('button');
                    document.getElementById("myModal").style.display = 'block';
                    document.getElementById("hiddenData").value = attribute;
                    document.getElementById("SparkhiddenId").value = ClouteraAttribute;
                    document.getElementById("ConfirmBox").classList.remove("hide");
                    document.getElementById("content_form").classList.add("hide");
                    document.getElementById("StatusPage").classList.add("hide");
                    document.getElementById("close").classList.remove("hide");
                    // }

                };

                for (var i = 0; i < classname.length; i++) {
                    classname[i].addEventListener('click', myFunction, false);
                }
            }, 400);
            setTimeout(function() {
                var classname = document.getElementsByClassName("launchbtnADWC");

                var launchbtnADWC = function() {
                    document.getElementById("myModal").style.display = 'block';

                    var ClouteraAttribute = this.getAttribute("alt");
                    var attribute = this.getAttribute("type");
                    var dataField = this.getAttribute("data-Field");
                    //alert(dataField);
                    document.getElementById("ADWC_LAunch_form").classList.remove("hide");
                    if (dataField == "1") {
                        //alert('1');
                        document.getElementById("AuthenticationScreen").classList.add('hide');
                        document.getElementById("2ndTab").classList.remove('hide');
                        document.getElementById("Upload").classList.remove('hide');
                    } else if (dataField = "0") {
                        // alert('2');
                        document.getElementById("AuthenticationScreen").classList.remove('hide');
                        document.getElementById("2ndTab").classList.add('hide');
                        document.getElementById("Upload").classList.add('hide');
                    }

                    document.getElementById("PovaasId").value = ClouteraAttribute;
                    document.getElementById("hiddenData").value = attribute;

                    document.getElementById("ConfirmBox").classList.add("hide");
                    document.getElementById("content_form").classList.add("hide");
                    document.getElementById("StatusPage").classList.add("hide");
                    document.getElementById("close").classList.remove("hide");

                };

                for (var i = 0; i < classname.length; i++) {
                    classname[i].addEventListener('click', launchbtnADWC, false);
                }
            }, 400);

            setTimeout(function() {
                var classname = document.getElementsByClassName("StartBtn");

                var StartInstancePop = function() {
                   // document.getElementById("myModal").style.display = 'block';
                    
                    var ClouteraAttribute = this.getAttribute("alt");
                    var attribute = this.getAttribute("type");
                    var dataField = this.getAttribute("data-Field");
                    var Status= this.getAttribute("data-status");
                    if(Status=="0"){
                        var actstatus="Activate";
                    }else{
                        var actstatus="De-Activate";
                    }
                    var povVariable = {
                        created_by: sessionStorage.getItem("user_id"),
                        povaas_request_id: attribute,
                        instance_status:Status
            
                    }
                    if(window.confirm('Are you sure you want to Change the Status to '+ actstatus )){
                        axios.post(global.baseDomain + '/start_stop_instance/', JSON.stringify(povVariable))
                        .then(res => {
                            window.location.href = "/dash";
                            // if(Status=='1'){
                            //     document.getElementsById("stopBtn").classList.remove('hide');
    
                            // }
                            
                        });
                    }
                   

                };

                for (var i = 0; i < classname.length; i++) {
                    classname[i].addEventListener('click', StartInstancePop, false);
                }
            }, 200);

            var handleRefresh = function() {
                window.location.href = "";
            }

             return (
                 <div>
                      <div className="userProfilestruc" >
                            <Link  to="/TagManagement" className="hide" id="tagManagement">
                               Tag Management
                            </Link>
                            <Link  to="/Company" className="hide" id="companyList">
                                Company List
                            </Link>
                            
                            <Link  to="/Profile" className="hide" id="userList">
                                 User List
                            </Link>
                           <Link  to="/dash" name="refresh" onClick={handleRefresh}>Refresh</Link>
                           
                            
                        </div>
                        <div className="listingContent">
                            <table dangerouslySetInnerHTML={ { __html:  this.state.componentData } }></table>
                        </div>
                </div>
               
            );
            }
            
        }
        
export default ShowList;
  

  