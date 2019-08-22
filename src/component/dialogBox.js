import React, { Component, Fragment } from 'react';
import '../App.css';
import axios from 'axios';
import Parent from './parent';

import {
    BrowserRouter as Router,
    Route,
    Link,
    Redirect,
    withRouter
} from "react-router-dom";

export default class App extends React.Component {
    constructor() {
        super();
        this.state = {
            componentData: '',
            shapeData: '',
            redirect: '',
            redirectADWC: '',
            redirectToDAsh: '',
            componentDataPopulate: '',
            tablePopulate: ''
        };
    }
   

    handleOnClickHadoob = () => {

        //else{
        if (document.getElementById('PovaasId').value == "2") {
            var TF_Var_Instance_Title_Hadoob = document.getElementById("TF_Var_Instance_Title_Hadoob").value;
            var masterShape = document.getElementById("TF_Var_MASTER_Shape").value;
            var Master_instance = document.getElementById("TF_Var_Master_instance").value;
            var TF_Var_BASTON_Shape = document.getElementById("TF_Var_BASTON_Shape").value;
            var TF_Var_BASTON_Instance = document.getElementById("TF_Var_BASTON_Instance").innerHTML;
            var TF_Var_UTILITY_Shape = document.getElementById("TF_Var_UTILITY_Shape").innerHTML;
            var TF_Var_UTILITY_Instance = document.getElementById("TF_Var_UTILITY_Instance").innerHTML;
            var TF_Var_WORKER_Shape = document.getElementById("TF_Var_WORKER_Shape").value;
            var TF_Var_WORKER_Instance = document.getElementById("TF_Var_WORKER_Instance").value;

            var count = parseInt(document.getElementById("TF_Var_WORKER_Instance").value) + parseInt(document.getElementById("TF_Var_Master_instance").value) + 2;

            if (TF_Var_Instance_Title_Hadoob == '') {
                alert('Please Enter Title');
                document.getElementById("TF_Var_Instance_Title_Hadoob").focus();
                return false;
            } else if (TF_Var_Instance_Title_Hadoob.indexOf(' ') !== -1) {
                alert("Spaces in the Inastance name is not allowed");
                document.getElementById("TF_VAR_InstanceTitle").focus();
                return false;
            } else if (masterShape == 0) {
                alert('Please Select Master Shape');
                document.getElementById("TF_Var_MASTER_Shape").focus();
                return false;
            } else if (Master_instance == 0) {
                alert('Please Select Master Instance');
                document.getElementById("TF_Var_Master_instance").focus();
                return false;
            } else if (TF_Var_BASTON_Shape == 0) {
                alert('Please Select BASTION Shape');
                document.getElementById("TF_Var_BASTON_Shape").focus();
                return false;
            } else if (TF_Var_WORKER_Shape == 0) {
                alert('Please Select Worker Shape');
                document.getElementById("TF_Var_WORKER_Shape").focus();
                return false;
            } else if (TF_Var_WORKER_Instance == 0) {
                alert('Please Select Worker Instance');
                document.getElementById("TF_Var_WORKER_Instance").focus();
                return false;
            } else {
                var reqdata = {
                    TF_VAR_tenancy_ocid: "ocidv1:tenancy:oc1:phx:1458169512456:aaaaaaaaqftfib54gijpqwckj3uvudp234",
                    TF_VAR_user_ocid: "ocid1.user.oc1..aaaaaaaarzwt3kq7z7cjs4yr3hwlgeqf2c6lcfzq2ai2un2zsfcjbnlm2knq",
                    TF_VAR_fingerprint: "73:06:26:e3:c9:eb:fd:aa:e0:ba:62:86:e2:8d:7c:57",
                    TF_VAR_private_key_path: "/home/opc/Key/oci_api_key.pem",
                    TF_VAR_region: "us-phoenix-1",
                    TF_VAR_compartment_ocid: "ocid1.compartment.oc1..aaaaaaaa7el6uxvuyatge6nnsbox6ufirjeyecxvrlgflxmm4no5is55o6ua",
                    TF_VAR_ssh_public_key: "/home/opc/Key/BDDS_Key.pub",
                    TF_VAR_ssh_private_key: "/home/opc/Key/BDDS_Key",
                    TF_VAR_image_ocid: "ocid1.image.oc1.phx.aaaaaaaazs4djfpanpbh7zwqjqe4enku3juqo6dntkj66u2vjx4p2k2oj5cq",
                    TF_VAR_AD: "2",
                    TF_VAR_InstanceTitle: document.getElementById("TF_Var_Instance_Title_Hadoob").value,
                    TF_VAR_UserName: sessionStorage.getItem("user_name"),
                    TF_VAR_MasterInstanceShape: document.getElementById("TF_Var_MASTER_Shape").value,
                    TF_VAR_BastionInstanceShape: document.getElementById("TF_Var_BASTON_Shape").value,
                    TF_VAR_WorkerInstanceShape: document.getElementById("TF_Var_WORKER_Shape").value,
                    TF_VAR_MasterNodeCount: document.getElementById("TF_Var_Master_instance").value,
                    TF_VAR_nodecount: document.getElementById("TF_Var_WORKER_Instance").value,
                    TF_Var_SolutionID: document.getElementById('PovaasId').value,
                    TF_Var_InstanceCount: count + "",
                    TF_Var_CreatedBy: sessionStorage.getItem("user_id"),
                    TF_Var_CompanyId: sessionStorage.getItem("COMPANY_ID"),
                    TF_VAR_username: sessionStorage.getItem("user_name")



                };
                //console.log(JSON.stringify(reqdata));
                axios.post(global.baseDomain+'/cloudera/create/',JSON.stringify(reqdata))
                .then(res => {


                }).catch((error) => {
                    if (error.response) {
                       // console.log(error.response.status);
                        if(error.response.status==401){
                            sessionStorage.clear();
                             window.location.href='/login';
                        }
            
                      }
                  });
                // axios({
                //     method: 'post',
                //     url: global.baseDomain + '/createclouderadev/',
                //     data: JSON.stringify(reqdata)

                // });
            }
        } else if (document.getElementById('PovaasId').value == "3") {
            var TF_Var_Instance_Title_Hadoob = document.getElementById("TF_Var_Instance_Title_Hadoob").value;
            var masterShape = document.getElementById("TF_Var_MASTER_Shape").value;
            var Master_instance = document.getElementById("TF_Var_Master_instance").value;
            var TF_Var_BASTON_Shape = document.getElementById("TF_Var_BASTON_Shape").value;
            var TF_Var_BASTON_Instance = document.getElementById("TF_Var_BASTON_Instance").innerHTML;
            var TF_Var_UTILITY_Shape = document.getElementById("TF_Var_UTILITY_Shape").innerHTML;
            var TF_Var_UTILITY_Instance = document.getElementById("TF_Var_UTILITY_Instance").innerHTML;
            var TF_Var_WORKER_Shape = document.getElementById("TF_Var_WORKER_Shape").value;
            var TF_Var_WORKER_Instance = document.getElementById("TF_Var_WORKER_Instance").value;

            var count = parseInt(document.getElementById("TF_Var_WORKER_Instance").value) + parseInt(document.getElementById("TF_Var_Master_instance").value) + 2;

            if (TF_Var_Instance_Title_Hadoob == '') {
                alert('Please Enter Title');
                document.getElementById("TF_Var_Instance_Title_Hadoob").focus();
                return false;
            } else if (TF_Var_Instance_Title_Hadoob.indexOf(' ') !== -1) {
                alert("Spaces in the Inastance name is not allowed");
                document.getElementById("TF_VAR_InstanceTitle").focus();
                return false;
            } else if (masterShape == 0) {
                alert('Please Select Master Shape');
                document.getElementById("TF_Var_MASTER_Shape").focus();
                return false;
            } else if (Master_instance == 0) {
                alert('Please Select Master Instance');
                document.getElementById("TF_Var_Master_instance").focus();
                return false;
            } else if (TF_Var_BASTON_Shape == 0) {
                alert('Please Select BASTION Shape');
                document.getElementById("TF_Var_BASTON_Shape").focus();
                return false;
            } else if (TF_Var_WORKER_Shape == 0) {
                alert('Please Select Worker Shape');
                document.getElementById("TF_Var_WORKER_Shape").focus();
                return false;
            } else if (TF_Var_WORKER_Instance == 0) {
                alert('Please Select Worker Instance');
                document.getElementById("TF_Var_WORKER_Instance").focus();
                return false;
            } else {
                var reqdata = {
                    TF_VAR_tenancy_ocid: "ocidv1:tenancy:oc1:phx:1458169512456:aaaaaaaaqftfib54gijpqwckj3uvudp234",
                    TF_VAR_user_ocid: "ocid1.user.oc1..aaaaaaaarzwt3kq7z7cjs4yr3hwlgeqf2c6lcfzq2ai2un2zsfcjbnlm2knq",
                    TF_VAR_fingerprint: "73:06:26:e3:c9:eb:fd:aa:e0:ba:62:86:e2:8d:7c:57",
                    TF_VAR_private_key_path: "/home/opc/Key/oci_api_key.pem",
                    TF_VAR_region: "us-phoenix-1",
                    TF_VAR_compartment_ocid: "ocid1.compartment.oc1..aaaaaaaa7el6uxvuyatge6nnsbox6ufirjeyecxvrlgflxmm4no5is55o6ua",
                    TF_VAR_ssh_public_key: "/home/opc/.ssh/id_rsa.pub",
                    TF_VAR_ssh_private_key: "/home/opc/.ssh/id_rsa",
                    TF_VAR_image_ocid: "ocid1.image.oc1.phx.aaaaaaaazs4djfpanpbh7zwqjqe4enku3juqo6dntkj66u2vjx4p2k2oj5cq",
                    TF_VAR_AD: "2",
                    TF_VAR_InstanceTitle: document.getElementById("TF_Var_Instance_Title_Hadoob").value,
                    TF_VAR_UserName: sessionStorage.getItem("user_name"),
                    TF_VAR_MasterInstanceShape: document.getElementById("TF_Var_MASTER_Shape").value,
                    TF_VAR_BastionInstanceShape: document.getElementById("TF_Var_BASTON_Shape").value,
                    TF_VAR_WorkerInstanceShape: document.getElementById("TF_Var_WORKER_Shape").value,
                    TF_VAR_MasterNodeCount: "2",
                    TF_VAR_nodecount: document.getElementById("TF_Var_WORKER_Instance").value,
                    TF_Var_SolutionID: document.getElementById('PovaasId').value,
                    TF_Var_InstanceCount: count + "",
                    TF_Var_CreatedBy: sessionStorage.getItem("user_id"),
                    TF_Var_CompanyId: sessionStorage.getItem("COMPANY_ID"),
                    TF_VAR_username: sessionStorage.getItem("user_name")



                };
                //console.log(JSON.stringify(reqdata));
                // axios({
                //     method: 'post',
                //     url: global.baseDomain + '/create_hortonworksDP_dev/',
                //     data: JSON.stringify(reqdata)

                // });
                axios.post(global.baseDomain+'/customer_churn/create/',JSON.stringify(reqdata))
                .then(res => {


                }).catch((error) => {
                    if (error.response) {
                       // console.log(error.response.status);
                        if(error.response.status==401){
                            sessionStorage.clear();
                             window.location.href='/login';
                        }
            
                      }
                  });
            }
        } else if (document.getElementById('PovaasId').value == "4") {
            var TF_Var_Instance_Title_Hadoob = document.getElementById("TF_Var_Instance_Title_Hadoob").value;
            var masterShape = document.getElementById("TF_Var_MASTER_Shape").value;
            var Master_instance = document.getElementById("TF_Var_Master_instance").value;
            var TF_Var_BASTON_Shape = document.getElementById("TF_Var_BASTON_Shape").value;
            var TF_Var_BASTON_Instance = document.getElementById("TF_Var_BASTON_Instance").innerHTML;
            var TF_Var_UTILITY_Shape = document.getElementById("TF_Var_UTILITY_Shape").innerHTML;
            var TF_Var_UTILITY_Instance = document.getElementById("TF_Var_UTILITY_Instance").innerHTML;

            var count = parseInt(document.getElementById("TF_Var_Master_instance").value) + 2;

            if (TF_Var_Instance_Title_Hadoob == '') {
                alert('Please Enter Title');
                document.getElementById("TF_Var_Instance_Title_Hadoob").focus();
                return false;
            } else if (TF_Var_Instance_Title_Hadoob.indexOf(' ') !== -1) {
                alert("Spaces in the Inastance name is not allowed");
                document.getElementById("TF_VAR_InstanceTitle").focus();
                return false;
            } else if (masterShape == 0) {
                alert('Please Select Master Shape');
                document.getElementById("TF_Var_MASTER_Shape").focus();
                return false;
            } else if (Master_instance == 0) {
                alert('Please Select Master Instance');
                document.getElementById("TF_Var_Master_instance").focus();
                return false;
            } else if (TF_Var_BASTON_Shape == 0) {
                alert('Please Select BASTION Shape');
                document.getElementById("TF_Var_BASTON_Shape").focus();
                return false;
            } else {
                var reqdata = {
                    TF_VAR_tenancy_ocid: "ocidv1:tenancy:oc1:phx:1458169512456:aaaaaaaaqftfib54gijpqwckj3uvudp234",
                    TF_VAR_user_ocid: "ocid1.user.oc1..aaaaaaaarzwt3kq7z7cjs4yr3hwlgeqf2c6lcfzq2ai2un2zsfcjbnlm2knq",
                    TF_VAR_fingerprint: "73:06:26:e3:c9:eb:fd:aa:e0:ba:62:86:e2:8d:7c:57",
                    TF_VAR_private_key_path: "/home/opc/Key/oci_api_key.pem",
                    TF_VAR_region: "us-phoenix-1",
                    TF_VAR_compartment_ocid: "ocid1.compartment.oc1..aaaaaaaa7el6uxvuyatge6nnsbox6ufirjeyecxvrlgflxmm4no5is55o6ua",
                    TF_VAR_ssh_public_key: "/home/opc/.ssh/id_rsa.pub",
                    TF_VAR_ssh_private_key: "/home/opc/.ssh/id_rsa",
                    TF_VAR_image_ocid: "ocid1.image.oc1.phx.aaaaaaaazs4djfpanpbh7zwqjqe4enku3juqo6dntkj66u2vjx4p2k2oj5cq",
                    TF_VAR_AD: "2",
                    TF_VAR_InstanceTitle: document.getElementById("TF_Var_Instance_Title_Hadoob").value,
                    TF_VAR_UserName: sessionStorage.getItem("user_name"),
                    TF_VAR_MasterInstanceShape: document.getElementById("TF_Var_MASTER_Shape").value,
                    TF_VAR_BastionInstanceShape: document.getElementById("TF_Var_BASTON_Shape").value,
                    //  TF_VAR_WorkerInstanceShape:document.getElementById("TF_Var_WORKER_Shape").value,
                    TF_VAR_WorkerInstanceShape: "VM.Standard2.4",
                    TF_VAR_MasterNodeCount: "3",
                    TF_VAR_nodecount: count + "",
                    TF_Var_SolutionID: document.getElementById('PovaasId').value,
                    TF_Var_InstanceCount: count + "",
                    TF_Var_CreatedBy: sessionStorage.getItem("user_id"),
                    TF_Var_CompanyId: sessionStorage.getItem("COMPANY_ID"),
                    TF_VAR_username: sessionStorage.getItem("user_name")



                };
                //console.log(JSON.stringify(reqdata));
                // axios({
                //     method: 'post',
                //     url: global.baseDomain + '/create_hortonworksDF_dev/',
                //     data: JSON.stringify(reqdata)

                // });
                axios.post(global.baseDomain+'/hortonworks/create/',JSON.stringify(reqdata))
                .then(res => {


                }).catch((error) => {
                    if (error.response) {
                       // console.log(error.response.status);
                        if(error.response.status==401){
                            sessionStorage.clear();
                             window.location.href='/login';
                        }
            
                      }
                  });
            }
        }

        this.setState({
            redirect: true
        });
        //  }

    }

    handleOnSwitch = () => {
        var masterSahpeValue = document.getElementById("TF_Var_MASTER_Shape").value;
        var TF_Var_UTILITY_ShapeValue = document.getElementById('TF_Var_UTILITY_Shape').innerHTML = masterSahpeValue;
        document.getElementById('TF_Var_UTILITY_Instance').innerHTML = 1;
    }
    tagStatusChange = (event) => {

        
        if(event.target.value=='No'){
            if(window.confirm('Are you sure you want to disbale this Record')){
                document.getElementById("stop_time").value="00:00:00"; 
                 return false;
            }
            
        }
    }
    handleOnClickTag = () => {
        var tag_value_Pick = document.getElementById("tag_value").value;
        var stop_time_Pick = document.getElementById("stop_time").value;
        var time_zone_Pick= document.getElementById("time_zone").value;
        var instance_Pick= document.getElementById("instance").value;
        var Status_Tag_Pick= document.getElementById("Status_Tag").value;
        
        if (tag_value_Pick == '') {
            alert('please enter Tag Name');
            document.getElementById("tag_value").focus();
            return false;
        }else if(time_zone_Pick==""){
            alert('please select Time zone');
            document.getElementById("time_zone").focus();
            return false;
        }else if(stop_time_Pick == ''){
            alert('please enter Stop Time');
            document.getElementById("stop_time").focus();
            return false;
        } else{
            var Reqdata = {
                tag_value:tag_value_Pick,
                stop_time:stop_time_Pick,
                created_by:sessionStorage.getItem("user_id"),
                time_zone:time_zone_Pick,
                "INSTANCE_ACTIVE":Status_Tag_Pick,
                type:instance_Pick
             }
             axios.post(global.baseDomain + '/tag_action/', JSON.stringify(Reqdata))
            .then(res => {
                alert('Updated successFully');
                window.location.href='/TagManagement';

            }).catch((error) => {
                if (error.response) {
                   // console.log(error.response.status);
                    if(error.response.status==401){
                        sessionStorage.clear();
                         window.location.href='/login';
                    }
        
                  }
              });

        }
    }
    handleOnClickCompany = () => {
        var companyname = document.getElementById("companyName").value;
        if (companyname == '') {
            alert('please enter Company Name');
            document.getElementById("companyName").focus();
            return false;
        }
        var companyata = {
            TF_Company_Name: companyname
        }
        //  axios({
        //     method: 'post',
        //     url: 'http://129.146.98.101:8086/company_validation/',
        //     data: JSON.stringify(companyata)

        // });
        axios.post(global.baseDomain + '/company/validation/', JSON.stringify(companyata))
            .then(res => {
                console.log(res.data["Oracle-Error-Message"]);

                if (res.data["Oracle-Error-Message"] == "FAILURE") {
                    alert('Already existed');
                    document.getElementById('SignUpCompanyProfile').classList.add('hide');
                    document.getElementById("myModal").style.display = 'none';
                } else {
                    alert('created successfully');
                    document.getElementById('SignUpCompanyProfile').classList.add('hide');
                    document.getElementById("myModal").style.display = 'none';
                }


            }).catch((error) => {
                if (error.response==401) {
                    sessionStorage.clear();
                    window.location.href='/';
                  } else {
                    console.log('Error', error.message);
                  }
            })


    }
    handleOnClickUserP = () => {
        var usrnm = document.getElementById("usrnm").value;
        var usremail = document.getElementById("usremail").value;
        var usrpassword = document.getElementById("usrpassword").value;
        if (usrnm == '') {
            alert('Please Enter UserName');
            document.getElementById("usrnm").value();
            return false;
        }
        if (usremail == '') {
            alert('Please Enter Email');
            document.getElementById("usremail").value();
            return false;
        } else if (usremail != '') {
            if (/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(usremail)) {

            } else {
                alert('Please Enter Valid EmailId');
                document.getElementById('UserEmail').focus();
                return false;
            }
        }
        if (usrpassword == '') {
            alert('Please Enter Password');
            document.getElementById("usrpassword").value();
            return false;
        }
        var UserCreation = {
            TF_User: usrnm,
            TF_Email: usremail,
            TF_usrpassword: usrpassword,
            TF_user_company: '',
            TF_user_role: ''

        }
        // axios({
        //     method: 'post',
        //     url: global.baseDomain + '/save_profile/',
        //     data: JSON.stringify(UserCreation)

        // });
        axios.post(global.baseDomain+'/user/save/',JSON.stringify(UserCreation))
                .then(res => {


                }).catch((error) => {
                    if (error.response) {
                       // console.log(error.response.status);
                        if(error.response.status==401){
                            sessionStorage.clear();
                             window.location.href='/login';
                        }
            
                      }
                  });



    }

    handleOnUserProfileEditClick = () => {
        if (document.getElementById('TF_VAR_edit_Name').value == '') {
            alert("Please enter Name");
            document.getElementById('TF_VAR_edit_Name').focus();
            return false;
        } else if (document.getElementById('usr_profile_edit_Email').value == "") {
            alert("Please enter Email");
            document.getElementById('usr_profile_edit_Email').focus();
            return false;
        } else if (document.getElementById('usr_profile_edit_Password').value == "") {
            alert("Please enter Password");
            document.getElementById('usr_profile_edit_Password').focus();
            return false;
        } else if (document.getElementById('usr_profile_edit_CPassword').value == "") {
            alert("Please enter confirm Password");
            document.getElementById('usr_profile_edit_CPassword').focus();
            return false;
        } else if (document.getElementById('usr_profile_edit_Password').value != document.getElementById('usr_profile_edit_CPassword').value) {
            alert("Password is not matching");
            document.getElementById('usr_profile_edit_CPassword').focus();
            return false;
        } else {
            var UserprofileMap = {
                TF_User_Id: document.getElementById("usr_profile_edit_ID").value,
                TF_User: document.getElementById('TF_VAR_edit_Name').value,
                TF_Email: document.getElementById('usr_profile_edit_Email').value,
                TF_usrpassword: document.getElementById('usr_profile_edit_Password').value,
                TF_Status: 'Edit'
            }
            axios.post(global.baseDomain + '/user/save/', JSON.stringify(UserprofileMap))
                .then(res => {
                    if (res.data['Oracle-Error-Message'] == 'SUCCESS') {
                        alert('Updated successfully');
                        document.getElementById('CreateProfile').classList.add('hide');
                        document.getElementById("myModal").style.display = 'none';
                        // alert(document.getElementById('usr_profile_edit_Prop').value);
                        if (document.getElementById('usr_profile_edit_Prop').value == "") {
                            //alert('1');
                            sessionStorage.setItem("user_name", document.getElementById('TF_VAR_edit_Name').value);
                            window.location.href = '/viewProfile';
                        } else {
                            //alert(document.getElementById('usr_profile_edit_ProfileStatus').value);
                            if (document.getElementById('usr_profile_edit_ProfileStatus').value == "Same") {
                                sessionStorage.setItem("user_name", document.getElementById('TF_VAR_edit_Name').value);
                                window.location.href = '/Profile';
                            } else {
                                window.location.href = '/Profile';
                            }
                        }
                    } else {
                        alert('Already existed');
                        document.getElementById('CreateProfile').classList.add('hide');
                        document.getElementById("myModal").style.display = 'none';
                    }




                }).catch((error) => {
                    if (error.response==401) {
                        sessionStorage.clear();
                        window.location.href='/';
                      } else {
                        console.log('Error', error.message);
                      }
                })
        }




    }




    handleOnUserProfileClick = () => {
        if (document.getElementById('TF_VAR_Name').value == '') {
            alert("Please enter Name");
            document.getElementById('TF_VAR_Name').focus();
            return false;
        } else if (document.getElementById('usr_profile_Email').value == "") {
            alert("Please enter Email");
            document.getElementById('usr_profile_Email').focus();
            return false;
        } else if (document.getElementById('usr_profile_Password').value == "") {
            alert("Please enter Password");
            document.getElementById('usr_profile_Password').focus();
            return false;
        } else if (document.getElementById('usr_profile_Company').value == "") {
            alert("Please select Company");
            document.getElementById('usr_profile_Company').focus();
            return false;
        } else if (document.getElementById('usr_profile_Role').value == "") {
            alert("Please select Role");
            document.getElementById('usr_profile_Role').focus();
            return false;
        } else if (document.getElementById('TF_VAR_usr_Phone').value == "") {
            alert("Please select Phone");
            document.getElementById('TF_VAR_usr_Phone').focus();
            return false;
        } else if (document.getElementById('TF_VAR_Idle_Time').value == "") {
            alert("Please select Idle Time");
            document.getElementById('TF_VAR_Idle_Time').focus();
            return false;
        } else {
            var UserprofileMap = {
                TF_User: document.getElementById('TF_VAR_Name').value,
                TF_Email: document.getElementById('usr_profile_Email').value,
                TF_usrpassword: document.getElementById('usr_profile_Password').value,
                TF_user_company: document.getElementById('usr_profile_Company').value,
                TF_user_role: document.getElementById('usr_profile_Role').value,
                TF_user_Phone: document.getElementById('TF_VAR_usr_Phone').value,
                TF_VAR_Idle_Time: document.getElementById('TF_VAR_Idle_Time').value,
                TF_Status: 'New',
                TF_created_By: sessionStorage.getItem("user_id")
            }
            axios.post(global.baseDomain + '/user/save/', JSON.stringify(UserprofileMap))
                .then(res => {


                    if (res.data['Oracle-Error-Message'] == 'SUCCESS') {
                        alert('created successfully');
                        document.getElementById('CreateProfile').classList.add('hide');
                        document.getElementById("myModal").style.display = 'none';
                        window.location.href = '/Profile';
                    } else {
                        alert('Already existed');
                        document.getElementById('CreateProfile').classList.add('hide');
                        document.getElementById("myModal").style.display = 'none';
                    }




                }).catch((error) => {
                    if (error.response==401) {
                        sessionStorage.clear();
                        window.location.href='/';
                      } else {
                        console.log('Error', error.message);
                      }
                })
        }




    }
    handleOnClickAdwc = () => {
        //alert();
        var TF_VAR_ADWC_InstanceTitle = document.getElementById('TF_VAR_ADWC_InstanceTitle').value;
        var TF_VAR_ADWC_DatabaseName = document.getElementById('TF_VAR_ADWC_DatabaseName').value;
        var TF_VAR_ADWC_CPU = document.getElementById('TF_VAR_ADWC_CPU').value;
        var TF_VAR_ADWC_STORAGE = document.getElementById('TF_VAR_ADWC_STORAGE').value;
        var TF_VAR_ADWC_PASSWORD = document.getElementById('TF_VAR_ADWC_PASSWORD').value;
        var TF_VAR_ADWC_CPASSWORD = document.getElementById('TF_VAR_ADWC_CPASSWORD').value;
        var TF_VAR_ADWC_CPASSWORD = document.getElementById('TF_VAR_ADWC_CPASSWORD').value;
        var TF_VAR_ADWC_OCID_TENANCY_NAME = document.getElementById('TF_VAR_ADWC_OCID_TENANCY_NAME').value;
        var TF_VAR_ADWC_USER_OCID = document.getElementById('TF_VAR_ADWC_USER_OCID').value;
        var TF_VAR_ADWC_USER_FingerPrint = document.getElementById('TF_VAR_ADWC_USER_FingerPrint').value;
        var TF_VAR_ADWC_Region_Name = document.getElementById('TF_VAR_ADWC_Region_Name').value;
        var TF_VAR_ADWC_Compartment_OCID = document.getElementById('TF_VAR_ADWC_Compartment_OCID').value;
        if (TF_VAR_ADWC_InstanceTitle == "") {
            alert("Please enter title");
            document.getElementById('TF_VAR_ADWC_InstanceTitle').focus();
            return false;
        } else if (TF_VAR_ADWC_DatabaseName == "") {
            alert("Please enter DatabaseName");
            document.getElementById('TF_VAR_ADWC_DatabaseName').focus();
            return false;
        } else if (TF_VAR_ADWC_CPU == "") {
            alert("Please enter CPU");
            document.getElementById('TF_VAR_ADWC_CPU').focus();
            return false;
        } else if (TF_VAR_ADWC_STORAGE == "") {
            alert("Please enter Storage");
            document.getElementById('TF_VAR_ADWC_STORAGE').focus();
            return false;
        } else if (TF_VAR_ADWC_PASSWORD == "") {
            alert("Please enter Password");
            document.getElementById('TF_VAR_ADWC_PASSWORD').focus();
            return false;
        } else if (TF_VAR_ADWC_PASSWORD != "") {
            var regex = /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?!.*\s).{12,30}$/;
            if (regex.test(TF_VAR_ADWC_PASSWORD)) {
                //alert('matched');
            } else {
                alert('Not matched');
                document.getElementById('TF_VAR_ADWC_PASSWORD').focus();
                return false;
            }
            if (TF_VAR_ADWC_CPASSWORD == "") {
                alert("Please enter  confirm Password");
                document.getElementById('TF_VAR_ADWC_CPASSWORD').focus();
                return false;
            } else if (TF_VAR_ADWC_PASSWORD != TF_VAR_ADWC_CPASSWORD) {
                alert("Password is not matching");
                document.getElementById('TF_VAR_ADWC_CPASSWORD').focus();
                return false;
            } else if (TF_VAR_ADWC_OCID_TENANCY_NAME == "") {
                alert("Please enter  OCID Tenancy Name");
                document.getElementById('TF_VAR_ADWC_OCID_TENANCY_NAME').focus();
                return false;
            } else if (TF_VAR_ADWC_Compartment_OCID == "") {
                alert("Please enter ADWC Compartment OCID");
                document.getElementById('TF_VAR_ADWC_Compartment_OCID').focus();
                return false;
            } else if (TF_VAR_ADWC_USER_OCID == "") {
                alert("Please enter  User OCID");
                document.getElementById('TF_VAR_ADWC_USER_OCID').focus();
                return false;
            } else if (TF_VAR_ADWC_USER_FingerPrint == "") {
                alert("Please enter  FingerPrint");
                document.getElementById('TF_VAR_ADWC_USER_FingerPrint').focus();
                return false;
            } else if (TF_VAR_ADWC_Region_Name == "") {
                alert("Please enter ADWC region name");
                document.getElementById('TF_VAR_ADWC_Region_Name').focus();
                return false;
            } else {
                var reqdata = {
                    TF_VAR_InstanceTitle: TF_VAR_ADWC_InstanceTitle,
                    TF_VAR_DatabaseName: TF_VAR_ADWC_DatabaseName,
                    TF_VAR_CPU: TF_VAR_ADWC_CPU,
                    TF_VAR_STORAGE: TF_VAR_ADWC_STORAGE,
                    TF_VAR_PASSWORD: TF_VAR_ADWC_PASSWORD,
                    TF_VAR_CPASSWORD: TF_VAR_ADWC_CPASSWORD,
                    "TF_VAR_UserName": sessionStorage.getItem("user_name"),
                    "TF_VAR_AD": "2",

                    "TF_VAR_tenancy_ocid": TF_VAR_ADWC_OCID_TENANCY_NAME,
                    "TF_VAR_user_ocid": TF_VAR_ADWC_USER_OCID,
                    "TF_VAR_fingerprint": TF_VAR_ADWC_USER_FingerPrint,
                    "TF_VAR_region": TF_VAR_ADWC_Region_Name,
                    "TF_VAR_compartment_ocid": TF_VAR_ADWC_Compartment_OCID,
                    "TF_Var_SolutionID": document.getElementById('PovaasId').value,
                    TF_Var_InstanceCount: "1",
                    TF_Var_CreatedBy: sessionStorage.getItem("user_id"),
                    TF_Var_CompanyId: sessionStorage.getItem("COMPANY_ID")
                };

                // console.log(JSON.stringify(reqdata));
                // axios({
                //     method: 'post',
                //     url: global.baseDomain + '/create_adwc/',
                //     data: JSON.stringify(reqdata)

                // });

                axios.post(global.baseDomain+'/adwc/create/',JSON.stringify(reqdata))
                .then(res => {


                }).catch((error) => {
                    if (error.response) {
                       // console.log(error.response.status);
                        if(error.response.status==401){
                            sessionStorage.clear();
                             window.location.href='/login';
                        }
            
                      }
                  });
                // this.setState({ redirectADWC: true });
                this.setState({
                    redirect: true
                });
            }
        }




    }
    handleUploadFile = () => {
        //alert('upload');
        const url = global.baseDomain + '/adwc/upload_object/';
        var formData = new FormData();
        var imagefile = document.querySelector('#upload');
        formData.append("myfile", imagefile.files[0]);
        formData.append('reqVar', {
            TF_VAR_InstanceTitle: 'TF_VAR_ADWC_InstanceTitle',
            TF_VAR_DatabaseName: 'TF_VAR_ADWC_DatabaseName'
        })

        axios.post(url, formData, {
            headers: {
                'Content-Type': 'multipart/form-data'
            }
        })
    }




    handleOsbStatus = () => {
        var OsbStatus = document.getElementById("OsbStatus").value;
        //  alert(OsbStatus);
        if (OsbStatus == 'existing') {
            //alert('1');
            var compartment_id = document.getElementById("compartment_id").value;
            if (compartment_id != "") {
                var userVariable = {
                    compartment_id: compartment_id
                }
                axios.post(global.baseDomain + '/adwc/object_store_list/', JSON.stringify(userVariable))
                    .then(res => {
                        var myObj = res.data;
                        var j, x = '',
                            y = '',
                            k;
                        //console.log(myObj.length);
                        x = '<option value="">Select</option>';
                        for (j = 0; j < myObj.length; j++) {
                            if (myObj[j].etag) {
                                //<img src='https://cloud.oracle.com/opc/iaas/images/Jenkins-Logo-185x103.jpg'/>
                                x += '<option value="' + myObj[j].etag + 'Name' + myObj[j].name + '">' + myObj[j].name + '</option>';
                            }
                        }

                        document.getElementById("Osbpath").innerHTML = x;

                    }).catch((error) => {
                        if (error.response==401) {
                            sessionStorage.clear();
                            window.location.href='/';
                          } else {
                            console.log('Error', error.message);
                          }
                    })
            } else {
                alert('Please enter your compartmentId');
                document.getElementById("compartment_id").focus();
                return false;
            }
            document.getElementById("existingBucket").classList.remove('hide');
            document.getElementById("Newbucketname").classList.add('hide');
        } else if (OsbStatus == 'new') {
            document.getElementById("existingBucket").classList.add('hide');
            document.getElementById("Newbucketname").classList.remove('hide');
        } else {
            document.getElementById("existingBucket").classList.add('hide');
            document.getElementById("Newbucketname").classList.remove('hide');
        }
    }
    tableView = () => {
        // alert('1');
        if (document.getElementById('table').value != "0") {
            document.getElementById('loader').classList.remove('hide');
            var userVariable = {
                table_name: document.getElementById('table').value,
                created_by: sessionStorage.getItem("user_id"),
                povaas_request_id: document.getElementById('hiddenData').value
            }
            axios.post(global.baseDomain + '/get_adwc_table_details/', userVariable)
                .then(res => {
                    var myObj = res.data;
                    var j = "",
                        m = '',
                        y = '',
                        k;
                    k = "Data for (<strong>" + document.getElementById('table').value + ' </strong>) table';
                    //alert(myObj[1].QUANTITY);
                    // j+= "<tr><th>Country</th><th>Invoice No</th><th>quantity</th><th>stockCode</th><th>Description</th></tr>";

                    for (m = 0; m < myObj.length; m++) {
                        j += "<tr><th>" + myObj[m].COUNTRY + "</th><th>" + myObj[m].INVOICENO + "</th><th>" + myObj[m].CUSTOMERID + "</th><th>" + myObj[m].QUANTITY + "</th><th>" + myObj[m].STOCKCODE + "</th><th>" + myObj[m].DESCRIPTION + "</th></tr>";
                    }
                    // alert(j);
                    document.getElementById('loader').classList.add('hide');
                    this.setState({
                        componentDataPopulate: j,
                        tablePopulate: k

                    })
                }).catch((error) => {
                    if (error.response==401) {
                        sessionStorage.clear();
                        window.location.href='/';
                      } else {
                        console.log('Error', error.message);
                      }
                });
        } else {
            alert('You have to select table name from the list');
            return false;
        }
    }
    handleOnClickADWCForm = () => {
        var tableType = document.getElementById("table_type").value;

        var OsbStatus = document.getElementById("OsbStatus").value;
        var Osbpath = document.getElementById("Osbpath").value;
        var OsbName = document.getElementById("OsbpathName").value;
        var public_access_type = document.getElementById("public_access_type").value;
        var storage_tier = document.getElementById("storage_tier").value;
        var compartment_id = document.getElementById("compartment_id").value;
        var namespace = document.getElementById("namespace").value;
        var file_delim = document.getElementById("file_delim").value;

        var table_name = document.getElementById("tab_name").value;
        var tenancy_id = document.getElementById("tenancy_id").value;

        var imagefile = document.querySelector('#upload');
        //var myfileUpload=document.getElementById("upload").value;

        // alert('1'+tableType);
        var radios = document.getElementsByName("table_type");
        var formValid = false;

        var i = 0;
        while (!formValid && i < radios.length) {
            if (radios[i].checked) formValid = true;
            i++;
        }

        if (!formValid) {
            alert("Must check some option for Table Type!");
            return formValid;
        } else if (tenancy_id == "") {
            alert("Please enter tenancy Id");
            document.getElementById('tenancy_id').focus();
            return false;

        } else if (compartment_id == "") {
            alert("Please enter compartment Id");
            document.getElementById('compartment_id').focus();
            return false;

        } else if (namespace == "") {
            alert("Please enter namespace");
            document.getElementById('namespace').focus();
            return false;

        } else if (OsbStatus == "") {
            alert("Please select bucket");
            document.getElementById('OsbStatus').focus();
            return false;
        } else if (OsbStatus == 'existing') {



            if (Osbpath == "") {
                alert("Please select bucket name");
                document.getElementById('Osbpath').focus();

                return false;
            } else {

                var path = Osbpath.split('Name');
                var etag = path[0];
                var BucketName = path[1];
                // var BucketName=OsbName;
                var accessType = "";
                var storageTier = "";
            }
        } else if (OsbStatus == 'new') {
            if (OsbName == "") {
                alert("Please select bucket name");
                document.getElementById('OsbpathName').focus();
                return false;
            } else if (public_access_type == "") {
                alert("Please select public access type");
                document.getElementById('public_access_type').focus();
                return false;

            } else if (storage_tier == "") {
                alert("Please enter storage Tier");
                document.getElementById('storage_tier').focus();
                return false;

            } else {
                var etag = "";
                var BucketName = OsbName;
                var accessType = public_access_type;
                var storageTier = storage_tier;
            }
        }


        //alert(imagefile.value);
        else if (imagefile.value == "") {
            alert("Please select File to upload");
            document.getElementById('upload').focus();
            return false;
        }


        var radios = document.getElementsByName("file_delim");
        var formValid = false;

        var i = 0;
        while (!formValid && i < radios.length) {
            if (radios[i].checked) formValid = true;
            i++;
        }
        if (!formValid) {
            alert("Must check some option for file delimeter!");
            return formValid;
        } else if (file_delim == "") {
            alert("Please select delimeter");
            document.getElementById('file_delim').focus();
            return false;
        } else if (table_name == "") {
            alert("Please select table Name");
            document.getElementById('tab_name').focus();
            return false;
        }
        //  var file = document.getElementById("upload").files[0];
        //  alert(file);
        //  var form = new FormData();
        //  form.append("myfile", file);




        //  const config = {
        //     headers: {
        //        'content-type': 'multipart/form-data'
        //       //  'Content-Type': 'application/x-www-form-urlencoded'
        //     }
        // }
        //  var settings = {
        //    "async": true,
        //    "crossDomain": true,
        //    "url": "http://localhost/clicportaltest/rest/clicadmin/uploadExcel",
        //    "method": "POST",
        //    "processData": false,
        //    "contentType": false,
        //    "mimeType": "multipart/form-data",
        //    "data": form
        //  };
        //alert(table_type_val);
        document.getElementById('loaderTable').classList.remove('hide');
        var reqdata = {
            TF_VAR_tableType: document.querySelector('input[name="table_type"]:checked').value,
            TF_VAR_OsbStatus: OsbStatus,
            TF_VAR_etag: etag,
            TF_VAR_BucketName: BucketName,
            TF_VAR_file_delim: document.querySelector('input[name="file_delim"]:checked').value,
            TF_VAR_table_name: table_name,
            TF_VAR_accessType: accessType,
            TF_VAR_storageTier: storageTier,
            TF_VAR_CompartmentId: compartment_id,
            TF_VAR_Namespace: namespace,
            created_by: sessionStorage.getItem("user_id"),
            povaas_request_id: document.getElementById('hiddenData').value,
            object_name: imagefile.files[0].name,
            TF_VAR_tenancy_ocid: tenancy_id,
            povaas_solution_id: document.getElementById('PovaasId').value
        };
        const url =global.baseDomain + '/adwc/upload_object/';
        var formData = new FormData();
        var imagefile = document.querySelector('#upload');
        // console.log(imagefile.files[0].name);
        formData.append("myfile", imagefile.files[0]);
        formData.append('reqVar', JSON.stringify(reqdata))

        axios.post(url, formData, {
            headers: {
                'Content-Type': 'multipart/form-data'
            }
        })
        // setTimeout(function(){ 
        var reqdata = {
            "created_by": sessionStorage.getItem("user_id"),
            "povaas_request_id": document.getElementById('hiddenData').value
        };
        axios.post(global.baseDomain + '/get_adwc_details/', JSON.stringify(reqdata))
            .then(response => {
                // console.log(response);
                var myObj = response.data;

                var j, x = '',
                    y = '',
                    k;
                //console.log(myObj.length);
                // x='<option value="">Select</option>';
                // function test(){
                //     alert('2');
                // }
                x += '<option class="tableClick"  value="0">Select Table</option>';
                for (j = 0; j < myObj.length; j++) {
                    //<img src='https://cloud.oracle.com/opc/iaas/images/Jenkins-Logo-185x103.jpg'/>
                    x += '<option class="tableClick"  value="' + myObj[j].TABLE_NAME + '">' + myObj[j].TABLE_NAME + '</option>';
                    //}
                }

                document.getElementById("table").innerHTML = x;

            }).catch((error) => {
                if (error.response) {
                   // console.log(error.response.status);
                    if(error.response.status==401){
                        sessionStorage.clear();
                         window.location.href='/login';
                    }
        
                  }
              });
        setTimeout(function() {
            document.getElementById('loaderTable').classList.add('hide');
            document.getElementById("View").classList.remove("hide");
            document.getElementById("Upload").classList.add("hide");
            document.getElementById("viewTab").classList.add("active");
            document.getElementById("uploadTab").classList.remove("active");
        }, 3000);



        // document.getElementById("View").classList.remove("hide");

        // document.getElementById("uploadTab").classList.remove("active");
        // document.getElementById("upload").classList.add("hide");

        // document.getElementById("viewTab").classList.add("active");
        //  }, 3000);


        // this.setState({ redirectADWC: true });

    }
    handleOnClickauthenticity = () => {

        // var Email=   document.getElementById("email_id").value;
        // var Psw=   document.getElementById("Authenticitypw").value;
        // var service=   document.getElementById("service").value;
        var token = document.getElementById("token").value;
        // if(Email==""){
        //     alert('Please Enter emailId');
        //     document.getElementById("email_id").focus();
        //     return false;
        // }else if(Psw==""){
        //     alert('Please Enter password');
        //     document.getElementById("Authenticitypw").focus();
        //     return false;
        // }else if(service==""){
        //     alert('Please Enter service');
        //     document.getElementById("service").focus();
        //     return false;
        // }else

        if (token == "") {
            alert('Please Enter token');
            document.getElementById("token").focus();
            return false;

        } else {
            document.getElementById('loaderToken').classList.remove('hide');


            var reqdata = {

                "token": token,
                "created_by": sessionStorage.getItem("user_id"),
                "povaas_request_id": document.getElementById('hiddenData').value
                // ,
                // "povaas_solution_id":document.getElementById('PovaasId').value,

            };
            axios.post(global.baseDomain + '/set_adwc_details/', JSON.stringify(reqdata))
                .then(response => {
                    setTimeout(function() {
                        window.location.href = "";
                    }, 3000);


                    // document.getElementById("AuthenticationScreen").classList.add('hide');
                    // document.getElementById("2ndTab").classList.remove('hide');
                    // document.getElementById("Upload").classList.remove('hide');

                }).catch((error) => {
                    if (error.response) {
                       // console.log(error.response.status);
                        if(error.response.status==401){
                            sessionStorage.clear();
                             window.location.href='/login';
                        }
            
                      }
                  });


        }
    }
    handleOnClickView = () => {
        var reqdata = {

            "created_by": sessionStorage.getItem("user_id"),
            "povaas_request_id": document.getElementById('hiddenData').value
            // ,
            // "povaas_solution_id":document.getElementById('PovaasId').value,

        };
        axios.post(global.baseDomain + '/adwc/details/', JSON.stringify(reqdata))
            .then(response => {
                console.log(response.data);

                var myObj = response.data;
                var j, x = '',
                    y = '',
                    k;
                //console.log(myObj.length);
                //   function test(){
                //     alert('2');
                // }
                x += '<option class="tableClick"  value="0">Select Table</option>';

                for (j = 0; j < myObj.length; j++) {
                    //<img src='https://cloud.oracle.com/opc/iaas/images/Jenkins-Logo-185x103.jpg'/>
                    x += '<option class="tableClick"  value="' + myObj[j].TABLE_NAME + '">' + myObj[j].TABLE_NAME + '</option>';
                    //}
                }

                document.getElementById("table").innerHTML = x;

                //  document.getElementById("table").innerHTML =x;

            }).catch((error) => {
                if (error.response) {
                   // console.log(error.response.status);
                    if(error.response.status==401){
                        sessionStorage.clear();
                         window.location.href='/login';
                    }
        
                  }
              });
        //alert('1');
        document.getElementById("View").classList.remove("hide");
        document.getElementById("Upload").classList.add("hide");
        document.getElementById("viewTab").classList.add("active");
        document.getElementById("uploadTab").classList.remove("active");
    }
    handleOnClickUpload = () => {
        document.getElementById("View").classList.add("hide");
        document.getElementById("viewTab").classList.remove("active");
        document.getElementById("uploadTab").classList.add("active");
        document.getElementById("Upload").classList.remove("hide");
    }
    handleOnClickdeleteAttr = () => {

        var delete_Region_Name = document.getElementById("delete_Region_Name").value;
        var CompartmentId = document.getElementById("delete_compartment_id").value;
        var tenancyId = document.getElementById("delete_tenancy_id").value;
        var reqDeldata = document.getElementById("hiddenData").value;

        var delete_UserFingerprint = document.getElementById("delete_UserFingerprint").value;
        var delete_UserOCID = document.getElementById("delete_UserOCID").value;


        if (tenancyId == "") {
            alert('Please fill tenancy Id');
            document.getElementById("delete_tenancy_id").focus();
            return false;
        } else if (CompartmentId == "") {
            alert('Please fill Compartment Id');
            document.getElementById("delete_compartment_id").focus();
            return false;
        } else if (delete_UserOCID == "") {
            alert('Please fill User OCID');
            document.getElementById("delete_UserOCID").focus();
            return false;
        } else if (delete_UserFingerprint == "") {
            alert('Please fill Finger Print');
            document.getElementById("delete_UserFingerprint").focus();
            return false;
        } else if (delete_Region_Name == "") {
            alert('Please fill Region Name');
            document.getElementById("delete_Region_Name").focus();
            return false;
        } else {
            if (document.getElementById('SparkhiddenId').value == "8") {

                //  alert('3');
                var deleteUrl = global.baseDomain + '/adwc/delete/';
                var reqdataDeleteId = {
                    TF_VAR_id: reqDeldata,
                    TF_VAR_CompartmentId: CompartmentId,
                    TF_VAR_TenancyId: tenancyId,
                    TF_Var_Region_Name: delete_Region_Name,
                    TF_Var_UserFingerprint: delete_UserFingerprint,
                    TF_Var_userOCID: delete_UserOCID
                }

                axios.post(deleteUrl, JSON.stringify(reqdataDeleteId))
                    .then(response => {
                        var json = response.data;
                        if (json.Delete_Status == '1') {

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
                document.getElementById("deleteAttr").classList.add("hide");
                document.getElementById("myModal").style.display = 'none';
                document.getElementById("content_form").classList.remove("hide");
                document.getElementById("ConfirmBox").classList.add("hide");
            }

        }

    }
    handleOnClick = () => {
        // some action...
        // then redirect
        var InstanceTitle = document.getElementById("TF_VAR_InstanceTitle").value;
        // var InstanceShape = document.getElementById("TF_VAR_MasterInstanceShape").value;
        if (InstanceTitle == '') {
            alert('Please enter POVaas Title');
            document.getElementById("TF_VAR_InstanceTitle").focus();
            return false;
        } else if (InstanceTitle.indexOf(' ') !== -1) {
            alert("Spaces in the Inastance name is not allowed");
            document.getElementById("TF_VAR_InstanceTitle").focus();
            return false;
        } else if (InstanceTitle != '') {

            var reqdata = {
                TF_VAR_tenancy_ocid: "ocidv1:tenancy:oc1:phx:1458169512456:aaaaaaaaqftfib54gijpqwckj3uvudp234",
                TF_VAR_user_ocid: "ocid1.user.oc1..aaaaaaaarzwt3kq7z7cjs4yr3hwlgeqf2c6lcfzq2ai2un2zsfcjbnlm2knq",
                TF_VAR_fingerprint: "73:06:26:e3:c9:eb:fd:aa:e0:ba:62:86:e2:8d:7c:57",
                TF_VAR_private_key_path: "/opt/myproject/Key/oci_api_key.pem",//"/home/opc/Key/oci_api_key.pem",
                TF_VAR_region: "us-phoenix-1",
                TF_VAR_compartment_ocid: "ocid1.compartment.oc1..aaaaaaaa7el6uxvuyatge6nnsbox6ufirjeyecxvrlgflxmm4no5is55o6ua",
                TF_VAR_ssh_public_key: "/opt/myproject/Key/BDDS_Key.pub",//"/home/opc/Key/BDDS_Key.pub",
                TF_VAR_ssh_private_key: "/opt/myproject/Key/BDDS_Key",//"/home/opc/Key/BDDS_Key",
                TF_VAR_image_ocid: "ocid1.image.oc1.phx.aaaaaaaazs4djfpanpbh7zwqjqe4enku3juqo6dntkj66u2vjx4p2k2oj5cq",
                TF_VAR_AD: "2",
                TF_VAR_MasterInstanceShape: document.getElementById("TF_VAR_MasterInstanceShape").value,
                TF_VAR_InstanceTitle: document.getElementById("TF_VAR_InstanceTitle").value,
                TF_VAR_UserName: sessionStorage.getItem("username"),
                TF_Var_SolutionID: document.getElementById('PovaasId').value,
                TF_Var_InstanceCount: "1",
                TF_Var_CreatedBy: sessionStorage.getItem("user_id"),
                TF_Var_CompanyId: sessionStorage.getItem("COMPANY_ID")

            };
            // console.log(JSON.stringify(reqdata));
            // axios({
            //     method: 'post',
            //     url: global.baseDomain + '/createspark/',
            //     data: JSON.stringify(reqdata)

            // });
            axios.post(global.baseDomain + '/spark/create/', JSON.stringify(reqdata))
            .then(response => {
                var json = response.data;
                if (json.Delete_Status == '1') {

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
            
            this.setState({
                redirect: true
            });
            //}
            // });


        }

    }
    render() {

      
        
        if(this.state.delete){
            return <Redirect push to="/" />; 
        }
        if (this.state.redirectToDAsh) {
            return <Redirect push to="/dash" />;
        }
        if (this.state.redirect) {
            //  return <Redirect push to="/Thanks" />;
            document.getElementById("ConfirmBox").classList.add("hide");
            document.getElementById("content_form").classList.add("hide");
            document.getElementById("adwc_form").classList.add("hide");
            
            document.getElementById("StatusPage").classList.remove("hide");
            document.getElementById("CreateProfile").classList.add("hide");
            document.getElementById("haddob_form").classList.add("hide");
            document.getElementById("close").classList.add("hide");
            document.getElementById("SignUpProfile").classList.add("hide");
            document.getElementById("SignUpCompanyProfile").classList.add("hide");
            if (this.state.position != 1) {
                setTimeout(function () {
                    document.getElementById("StatusPage").innerHTML = '<div class="loadingimg text-center">Instance creation will take more time. We are redirecting you to the Dashboard <br/><br/><img src="https://wgli.org/wp-content/plugins/fundlycrm/assets/images/npe-redirecting.gif" />';

                }, 7000);
                setTimeout(
                    function () {
                        this.setState({ position: 1 });
                    }.bind(this),
                    12000
                );

            }
        }
        if (this.state.position == 1) {
            return <Redirect push to="/dash" />;
        }
        if (this.state.redirectADWC == true) {
            return <Redirect push to="/dash" />;
        }
        function closePop() {
            document.getElementById("myModal").style.display = 'none';
            document.getElementById("content_form").classList.remove("hide");
            document.getElementById("StatusPage").classList.add("hide");
            document.getElementById("SignUpProfile").classList.add("hide");
            document.getElementById("SignUpCompanyProfile").classList.add("hide");
            document.getElementById("EditProfile").classList.add("hide");
            document.getElementById("CreateProfile").classList.add("hide");
            document.getElementById("ConfirmBox").classList.add("hide");
            document.getElementById("adwc_form").classList.add("hide");
            document.getElementById("haddob_form").classList.add("hide");
            document.getElementById("ADWC_LAunch_form").classList.add("hide");

            document.getElementById("View").classList.add("hide");
            document.getElementById("viewTab").classList.remove("active");
       document.getElementById("uploadTab").classList.add("active");
      //  document.getElementById("Upload").classList.remove("hide");
        }
        function YesPop() {
            // alert('api integration is pending')
           // alert(document.getElementById('SparkhiddenId').value);

               
            if (document.getElementById('SparkhiddenId').value == "1") {
               // alert('1');
                var reqDeldata = document.getElementById("hiddenData").value;
           // alert(reqDeldata);
            var reqdataDeleteId = {TF_VAR_id: reqDeldata}
                // alert('1');
                  var deleteUrl = global.baseDomain + '/spark/delete/';
                  axios.post(deleteUrl,JSON.stringify(reqdataDeleteId))
                  .then(response => {
                      var json = response.data;
                      if(json.Delete_Status=='1'){
      
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
                  document.getElementById("myModal").style.display = 'none';
                  document.getElementById("content_form").classList.add("hide");
                  document.getElementById("adwc_form").classList.add("hide");
                  document.getElementById("StatusPage").classList.add("hide");
                  document.getElementById("ConfirmBox").classList.add("hide");
                  document.getElementById("CreateProfile").classList.add("hide");
                  document.getElementById("SignUpProfile").classList.add("hide");
                  document.getElementById("SignUpCompanyProfile").classList.add("hide");
                  document.getElementById("deleteAttr").classList.add("hide");
          
              } else if (document.getElementById('SparkhiddenId').value == "2") {
              //  alert('2');
                var reqDeldata = document.getElementById("hiddenData").value;
                // alert(reqDeldata);
                 var reqdataDeleteId = {TF_VAR_id: reqDeldata}
               //   alert('2');
                  var deleteUrl = global.baseDomain + '/cloudera/delete/';
                  axios.post(deleteUrl,JSON.stringify(reqdataDeleteId))
                  .then(response => {
                      var json = response.data;
                      if(json.Delete_Status=='1'){
      
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
                  document.getElementById("myModal").style.display = 'none';
                  document.getElementById("content_form").classList.add("hide");
                  document.getElementById("adwc_form").classList.add("hide");
                  document.getElementById("StatusPage").classList.add("hide");
                  document.getElementById("ConfirmBox").classList.add("hide");
                  document.getElementById("CreateProfile").classList.add("hide");
                  document.getElementById("SignUpProfile").classList.add("hide");
                  document.getElementById("SignUpCompanyProfile").classList.add("hide");
                  document.getElementById("deleteAttr").classList.add("hide");
              } 
              else if (document.getElementById('SparkhiddenId').value == "3") {
                //  alert('2');
                  var reqDeldata = document.getElementById("hiddenData").value;
                  // alert(reqDeldata);
                   var reqdataDeleteId = {TF_VAR_id: reqDeldata}
                 //   alert('2');
                    var deleteUrl = global.baseDomain + '/customer_churn/delete/';
                    axios.post(deleteUrl,JSON.stringify(reqdataDeleteId))
                    .then(response => {
                        var json = response.data;
                        if(json.Delete_Status=='1'){
        
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
                    document.getElementById("myModal").style.display = 'none';
                    document.getElementById("content_form").classList.add("hide");
                    document.getElementById("adwc_form").classList.add("hide");
                    document.getElementById("StatusPage").classList.add("hide");
                    document.getElementById("ConfirmBox").classList.add("hide");
                    document.getElementById("CreateProfile").classList.add("hide");
                    document.getElementById("SignUpProfile").classList.add("hide");
                    document.getElementById("SignUpCompanyProfile").classList.add("hide");
                    document.getElementById("deleteAttr").classList.add("hide");
                }
                else if (document.getElementById('SparkhiddenId').value == "4") {
                    //  alert('2');
                      var reqDeldata = document.getElementById("hiddenData").value;
                      // alert(reqDeldata);
                       var reqdataDeleteId = {TF_VAR_id: reqDeldata}
                     //   alert('2');
                        var deleteUrl = global.baseDomain + '/hortonworks/delete/';
                        axios.post(deleteUrl,JSON.stringify(reqdataDeleteId))
                        .then(response => {
                            var json = response.data;
                            if(json.Delete_Status=='1'){
            
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
                        document.getElementById("myModal").style.display = 'none';
                        document.getElementById("content_form").classList.add("hide");
                        document.getElementById("adwc_form").classList.add("hide");
                        document.getElementById("StatusPage").classList.add("hide");
                        document.getElementById("ConfirmBox").classList.add("hide");
                        document.getElementById("CreateProfile").classList.add("hide");
                        document.getElementById("SignUpProfile").classList.add("hide");
                        document.getElementById("SignUpCompanyProfile").classList.add("hide");
                        document.getElementById("deleteAttr").classList.add("hide");
                    }
              else if (document.getElementById('SparkhiddenId').value == "8") {
                 // alert('3');
                var reqDeldata = document.getElementById("hiddenData").value;
                // alert(reqDeldata);
                 var reqdataDeleteId = {TF_VAR_id: reqDeldata}
                      var reqDeldata = document.getElementById("hiddenData").value;
                      document.getElementById("myModal").style.display = 'block';
                      document.getElementById("content_form").classList.add("hide");
                      document.getElementById("adwc_form").classList.add("hide");
                      document.getElementById("StatusPage").classList.add("hide");
                      document.getElementById("ConfirmBox").classList.add("hide");
                      document.getElementById("CreateProfile").classList.add("hide");
                      document.getElementById("SignUpProfile").classList.add("hide");
                      document.getElementById("SignUpCompanyProfile").classList.add("hide");
                      document.getElementById("deleteAttr").classList.remove("hide");
              }
           // alert(document.getElementById('PovaasId').value);
           
              //var reqdataDeleteId = {TF_VAR_id: reqDeldata}
               
             
        }
        function handleKeyPress(e) {
            e.preventDefault();
            var a = e.target.value;
            if(a!=""){
                if(a<=0 || a>=129){
                    alert('Value should be greater than 0 and less than 129');
                    e.target.value=1;
                    return false;
                }
            }
           
        }
        

        return (

            <div>
   <div id="myModal" class="modal">
                    <div class="modal-content" id="_modal-content">
         <span class="close" id="close" onClick={closePop}>&times;</span>
         <div id="StatusPage" class="hide text-center">
            <img src="./static/loading-please-wait-gif.gif" />
         </div>
         <div id="SignUpProfile" class="hide text-center mt20">
            <div class="input-container">
               <input class="input-field" type="text" placeholder="Username" id ="usrnm" name="usrnm"/>
            </div>
            <div class="input-container">
               <input class="input-field" type="text" placeholder="Email" id ="usremail" name="email"/>
            </div>
            <div class="input-container">
               <input class="input-field" type="password" id ="usrpassword"  placeholder="Password" name="psw"/>
            </div>
            <input type="button" className="submitBtn signBtn" value="Submit" onClick={this.handleOnClickUserP}/>
         </div>
         <div id="SignUpCompanyProfile" class="hide text-center mt20">
            <div class="input-container">
               <input class="input-field" type="text" id="companyName" placeholder="Company Name" name="companyName"/>
               <input type="button" className="submitBtn signBtn" value="Submit" onClick={this.handleOnClickCompany}/>
            </div>
         </div>
         <div id="create_tag_profile" class="hide text-center mt20">
            <div class="input-container">
                <input class="input-field" readonly type="text" id="tag_Key" placeholder="Tag Key" name="TagKey" value="PoVaaS"/>
            </div>
           
            <div class="input-container">
            <input class="input-field" type="text" id="tag_value" readonly placeholder="Tag Value" name="TagValue"/>
            </div>
           
            <div class="input-container">
            <select id="time_zone" >
               <option value="">Select TimeZone</option>
                     <option value="Asia/Kolkata">Asia/Kolkata</option>
                     <option value="US/Pacific">US/Pacific</option>
                     <option value="US/Central">US/Central</option>
                     <option value="EST">EST</option>
                </select>
            </div>
            <div class="input-container">
            <select id="Status_Tag" onChange={this.tagStatusChange}>
                 <option value="Yes">Enable</option>
                     <option value="No">Disable</option>
                </select>
            </div>
            <div class="input-container stopTime">
              Stop Time: <input class="input-field"   id="stop_time" name="stop_time" type="time" step="1" />
 
            </div>
            
            <input type="hidden" name="tagContent" value="" id="tagContent"/>
            <input type="hidden" id="instance" name="instance" value=""/>
           
            <div class="input-container">
            <input type="button" className="submitBtn signBtn" value="Submit" onClick={this.handleOnClickTag}/>
               
            </div>
         </div>
         <div id="EditProfile" class="hide text-center mt20">
            <div class="row">
               <div class="col-25">
                  <label  >Name <sub>*</sub></label>
               </div>
               <div class="col-75">
                  <input type="text"  id="TF_VAR_edit_Name" name="TF_VAR_edit_Name"   />
               </div>
            </div>
            <div class="row">
               <div class="col-25">
                  <label>Email <sub>*</sub></label>
               </div>
               <div class="col-75">
                  <input type="text"  id="usr_profile_edit_Email"  name="usr_profile_edit_Email" readOnly />
               </div>
            </div>
            <div class="row">
               <div class="col-25">
                  <label>Password <sub>*</sub></label>
               </div>
               <div class="col-75">
                  <input type="password"  id="usr_profile_edit_Password"  name="TF_VAR_edit_Password"  />
               </div>
               <input type="hidden" name="usr_profile_edit_Prop" id="usr_profile_edit_Prop"/>
               <input type="hidden" name="usr_profile_edit_ID" id="usr_profile_edit_ID"/>
               <input type="hidden" name="usr_profile_edit_ProfileStatus" id="usr_profile_edit_ProfileStatus"/>
            </div>
            <div class="row">
               <div class="col-25">
                  <label>Confirm Password <sub>*</sub></label>
               </div>
               <div class="col-75">
                  <input type="password"  id="usr_profile_edit_CPassword"  name="TF_VAR_edit_CPassword"  />
               </div>
            </div>
            <div class="row mt20">
               <input type="button" className="submitBtn" value="Update" onClick={this.handleOnUserProfileEditClick} />
            </div>
         </div>
         <div id="CreateProfile" class="hide text-center mt20">
            <div class="row">
               <div class="col-25">
                  <label  >Name <sub>*</sub></label>
               </div>
               <div class="col-75">
                  <input type="text"  id="TF_VAR_Name" name="TF_VAR_Name"  required />
               </div>
            </div>
            <div class="row">
               <div class="col-25">
                  <label>Email <sub>*</sub></label>
               </div>
               <div class="col-75">
                  <input type="text"  id="usr_profile_Email"  name="TF_VAR_Email" required />
               </div>
            </div>
            <div class="row">
               <div class="col-25">
                  <label for="TF_VAR_usr_Phone">Phone Number<sub>*</sub></label>
               </div>
               <div class="col-75">
                  <input type="text"  id="TF_VAR_usr_Phone"  name="TF_VAR_usr_Phone" required />
               </div>
            </div>
            <div class="row">
               <div class="col-25">
                  <label>Password <sub>*</sub></label>
               </div>
               <div class="col-75">
                  <input type="password"  id="usr_profile_Password"  name="TF_VAR_Password"  required />
               </div>
            </div>
            <div class="row">
               <div class="col-25">
                  <label>Select Company <sub>*</sub></label>
               </div>
               <div class="col-75">
                  <select id="usr_profile_Company">
                     {/* 
                     <option value="1">Oracle</option>
                     <option value="2">Oracle Cloud</option>
                     */}
                  </select>
               </div>
            </div>
            <div class="row">
               <div class="col-25">
                  <label >Select Role <sub>*</sub></label>
               </div>
               <div class="col-75">
                  <select id="usr_profile_Role">
                  </select>             
               </div>
            </div>
            <div class="row">
               <div class="col-25">
                  <label for="TF_VAR_Idle_Time">Idle Time<sub>*</sub></label>
               </div>
               <div class="col-75">
                  <select id="TF_VAR_Idle_Time">
                     <option value="1hr">1hr</option>
                     <option value="2hr">2hr</option>
                  </select>
               </div>
            </div>
            <div class="row mt20">
               <input type="button" className="submitBtn" value="Submit" onClick={this.handleOnUserProfileClick} />
            </div>
         </div>
         <div id="ConfirmBox" class="hide text-center">
            Are you sure you want to delete?<br /><br />
            <button class="inprogress Yes" onClick={YesPop}> Yes </button> &nbsp;&nbsp; <button class="inprogress No" onClick={closePop}> No </button>
            <textarea id="hiddenData" class="hide"></textarea>
            <textarea id="SparkhiddenId" class="hide"></textarea>
         </div>
         <form id="content_form"  class="hide">
            <div class="row">
               <div class="col-25">
                  <label for="TF_VAR_InstanceTitle">Instance Title <sub>*</sub></label>
               </div>
               <div class="col-75">
                  <input type="text" id="TF_VAR_InstanceTitle" name="TF_VAR_InstanceTitle" placeholder="PoVaaSRecommendation"/>
               </div>
            </div>
            <div class="row">
               <div class="col-25">
                  <label for="TF_VAR_MasterInstanceShape">Master Instance Shape <sub>*</sub></label>
               </div>
               <div class="col-75">
                  <select id="TF_VAR_MasterInstanceShape">
                     <option value="VM.Standard2.1">VM.Standard2.1</option>
                     <option value="VM.Standard2.4">VM.Standard2.4</option>
                     {/* <input type="text" id="TF_VAR_MasterInstanceShape"   name="TF_VAR_MasterInstanceShape" placeholder="VM.Standard2.4" required /> */}
                  </select>
               </div>
            </div>
            <div class="row mt20">
               <input type="button" className="submitBtn" value="Submit" onClick={this.handleOnClick} />
            </div>
         </form>
         <form id="adwc_form"  class="hide">
            <div class="tupple">
               <div class="row">
                  <div class="col-25">
                     <label for="TF_VAR_InstanceTitle">ADWC Instance Title <sub>*</sub></label>
                  </div>
                  <div class="col-75">
                     <input type="text" id="TF_VAR_ADWC_InstanceTitle" placeholder="ADWC Instance Title" name="TF_VAR_ADWC_InstanceTitle"/>
                  </div>
               </div>
               <div class="col-50">
                  <div class="col-25">
                     <label for="TF_VAR_DatabaseName">Database Name <sub>*</sub></label>
                  </div>
                  <div class="col-75">
                     <input type="text" id="TF_VAR_ADWC_DatabaseName" name="TF_VAR_ADWC_DatabaseName"  maxlength ="14"/>
                     <p><small>The name must contains only letters and numbers, starting with a letter. 14 characters max</small></p>
                  </div>
               </div>
            </div>
            <div class="tupple">
               <div class="col-50">
                  <div class="col-25">
                     <label for="TF_VAR_CPU_Core_ Count">CPU Core Count <sub>*</sub></label>
                  </div>
                  <div class="col-75">
                     <input type="number" id="TF_VAR_ADWC_CPU"  name="TF_VAR_ADWC_CPU" onKeyUp={(event) => {
                     handleKeyPress(event);
                     }}  min="1" max="128"/>
                     <p><small>The number of CPU cores to enable Maximum Cores per database. 128. Available cores are subject to your tenancy's service limit</small></p>
                  </div>
               </div>
               <div class="row">
                  <div class="col-25">
                     <label for="TF_VAR_STORAGE">STORAGE (TB)<sub>*</sub></label>
                  </div>
                  <div class="col-75">
                     <input type="number" id="TF_VAR_ADWC_STORAGE"  name="TF_VAR_ADWC_STORAGE" min="1" max="128" onKeyUp={(event) => {
                     handleKeyPress(event);
                     }}/>
                     <p><small>The Available storage, upto 128 TB</small></p>
                  </div>
               </div>
            </div>
            <div class="tupple">
               <div class="col-25">
                  <label for="TF_VAR_PASSWORD">PASSWORD<sub>*</sub></label>
               </div>
               <div class="col-25">
                  <input type="password" id="TF_VAR_ADWC_PASSWORD" name="TF_VAR_ADWC_PASSWORD"/>
                  <p><small>Password expresion that requires one lower case letter, one upper case letter, one digit, 12-30 length, and no spaces.</small></p>
               </div>
               <div class="col-25">
                  <label for="TF_VAR_PASSWORD">CONFIRM PASSWORD<sub>*</sub></label>
               </div>
               <div class="col-25">
                  <input type="password" id="TF_VAR_ADWC_CPASSWORD" name="TF_VAR_ADWC_CPASSWORD"/>
               </div>
            </div>
            <div class="row">
               <div class="col-25">
                  <label for="TF_VAR_OCID_TENANCY_NAME">OCID Tenancy Name<sub>*</sub></label>
               </div>
               <div class="col-75">
                  <input type="text" id="TF_VAR_ADWC_OCID_TENANCY_NAME" name="TF_VAR_ADWC_OCID_TENANCY_NAME"/>
               </div>
            </div>
            <div class="row">
               <div class="col-25">
                  <label for="TF_VAR_ADWC_Compartment_OCID">Compartment OCID<sub>*</sub></label>
               </div>
               <div class="col-75">
                  <input type="text" id="TF_VAR_ADWC_Compartment_OCID" name="TF_VAR_ADWC_Compartment_OCID"/>
               </div>
            </div>
            <div class="row">
               <div class="col-25">
                  <label for="TF_VAR_ADWC_USER_OCID">User OCID<sub>*</sub></label>
               </div>
               <div class="col-75">
                  <input type="text" id="TF_VAR_ADWC_USER_OCID" name="TF_VAR_ADWC_USER_OCID"/>
               </div>
            </div>
            <div class="row">
               <div class="col-25">
                  <label for="TF_VAR_ADWC_USER_FingerPrint">User FingerPrint<sub>*</sub></label>
               </div>
               <div class="col-75">
                  <input type="text" id="TF_VAR_ADWC_USER_FingerPrint" name="TF_VAR_ADWC_USER_FingerPrint"/>
               </div>
            </div>
            <div class="row">
               <div class="col-25">
                  <label for="TF_VAR_ADWC_Region_Name">Region Name<sub>*</sub></label>
               </div>
               <div class="col-75">
                  <input type="text" id="TF_VAR_ADWC_Region_Name" name="TF_VAR_ADWC_Region_Name"/>
               </div>
            </div>
            <div class="row mt20">
               <input type="button" className="submitBtn" value="Submit" onClick={this.handleOnClickAdwc} />
            </div>
         </form>
         <div id="graph_section" className="hide">
            <p class="alert text-center">Visual Representation For <strong>Cost Estimation</strong></p>
            <p class="alert  info">All values are in <strong>USD Mn</strong></p>
            <Parent/>
            <br/><br/>
            {/* 
            <p class="alert  info">All values are in <strong>USD Mn</strong></p>
            <StackedGraph/>
            <br/><br/>
            <p class="alert  info">All values are in <strong>USD Mn</strong></p>
            <PieChart/>
            */}
         </div>
         <form id="haddob_form" class="hide">
            <div class="clusterBox">
               <input class="filterSearch" id="TF_Var_Instance_Title_Hadoob" name="TF_Var_Instance_Title_Hadoob" type="text" placeholder="PoVaaS Title"/>
               <div class="tupple">
                  <p>MASTER</p>
                  <select name="TF_Var_MASTER_Shape" id="TF_Var_MASTER_Shape" onChange={this.handleOnSwitch}>
                     <option value="0">Select Shape</option>
                     <option value="VM.Standard2.8">VM.Standard2.8</option>
                     <option value="VM.Standard2.16">VM.Standard2.16</option>
                  </select>
                  <select name="TF_Var_Master_instance" id="TF_Var_Master_instance">
                     <option value="0">Select Instance</option>
                     <option value="1">1</option>
                     <option value="2">2</option>
                     <option value="3">3</option>
                  </select>
               </div>
               <div class="tupple">
                  <p>BASTION</p>
                  <select name="TF_Var_BASTON_Shape" id="TF_Var_BASTON_Shape">
                     <option value="0">Select Shape</option>
                     <option value="VM.Standard2.4">VM.Standard2.4</option>
                     <option value="VM.Standard2.8">VM.Standard2.8</option>
                     <option value="VM.Standard2.16">VM.Standard2.16</option>
                  </select>
                  <span  class="utility" readoly title="disabled" name="TF_Var_BASTON_Instance" id="TF_Var_BASTON_Instance">1</span>
               </div>
               <div class="tupple">
                  <p>UTILITY</p>
                  <span  class="utility" readoly title="disabled" name="TF_Var_UTILITY_Shape" id="TF_Var_UTILITY_Shape">Select Shape</span>
                  <span  class="utility" readoly title="disabled" name="TF_Var_UTILITY_Instance" id="TF_Var_UTILITY_Instance">Select Instance</span>
               </div>
               <div class="tupple" id="worker">
                  <p>WORKER</p>
                  <select name="TF_Var_WORKER_Shape" id="TF_Var_WORKER_Shape">
                     <option value="0">Select Shape</option>
                     <option value="BM.DenseIO2.52">BM.DenseIO2.52</option>
                     <option value="VM.Standard2.4">VM.Standard2.4</option>
                  </select>
                  <select name="TF_Var_WORKER_Instance" id="TF_Var_WORKER_Instance">
                     <option value="0">Select Instance</option>
                     <option value="1">1</option>
                     <option value="2">2</option>
                     <option value="3">3</option>
                     <option value="4">4</option>
                     <option value="5">5</option>
                  </select>
               </div>
               <div class="row mt20">
                  <input type="button" className="submitBtn submitHadoop" value="Submit" onClick={this.handleOnClickHadoob} />
               </div>
               <input type="hidden" id="PovaasId" value=""/>
            </div>
         </form>
         <div id="deleteAttr" class="hide">
            <div class="adwc_upload">
               <div class="">
                  <label for="fname">Tenancy Id </label>
               </div>
               <br/>
               <div class="">
                  {/* <input type="file" id="file_upload" name="file_upload"/> */}
                  <div class="upload-btn-wrapper">
                     <input id="delete_tenancy_id" type="text" name="delete_tenancy_id"/>
                  </div>
               </div>
            </div>
            <div class="adwc_upload">
               <div class="">
                  <label for="fname">Compartment Id </label>
               </div>
               <br/>
               <div class="">
                  {/* <input type="delete_namespace delete_compartment_id delete_tenancy_id" id="file_upload" name="file_upload"/> */}
                  <div class="upload-btn-wrapper">
                     <input id="delete_compartment_id" type="text" name="delete_compartment_id"/>
                  </div>
               </div>
            </div>
            <div class="adwc_upload">
               <div class="">
                  <label for="fname">UserOCID </label>
               </div>
               <br/>
               <div class="">
                  {/* <input type="file" id="file_upload" name="file_upload"/> */}
                  <div class="upload-btn-wrapper">
                     <input id="delete_UserOCID" type="text" name="delete_UserOCID"/>
                  </div>
               </div>
            </div>
            <div class="adwc_upload">
               <div class="">
                  <label for="fname">User FingerPrint </label>
               </div>
               <br/>
               <div class="">
                  {/* <input type="file" id="file_upload" name="file_upload"/> */}
                  <div class="upload-btn-wrapper">
                     <input id="delete_UserFingerprint" type="text" name="delete_UserFingerprint"/>
                  </div>
               </div>
            </div>
            <div class="adwc_upload">
               <div class="">
                  <label for="fname">Region Name </label>
               </div>
               <br/>
               <div class="">
                  {/* <input type="file" id="file_upload" name="file_upload"/> */}
                  <div class="upload-btn-wrapper">
                     <input id="delete_Region_Name" type="text" name="delete_Region_Name"/>
                  </div>
               </div>
            </div>
            <div class="row mt20">
               <input type="button" className="submitBtn" value="Submit" onClick={this.handleOnClickdeleteAttr} />
            </div>
         </div>
         <div id="ADWC_LAunch_form" class="hide">
            <div class="tab hide" id="2ndTab">
               <div class="sub_heading">File Upload and Table Creation in ADWC</div>
               <button class="tablinks active" id="uploadTab" onClick={this.handleOnClickUpload}>Upload</button>
               <button class="tablinks" id="viewTab" onClick={this.handleOnClickView} >View</button>
            </div>
            <div id="AuthenticationScreen" class="tabcontent ">
               <div class="sub_heading">Token For Connecting To Object Store</div>
               <div class="adwc_upload">
                  {/* 
                  <div class="">
                     <label for="fname">UserName</label>
                  </div>
                  <div class="">
                     <input id="user_name" readonly="true" type="text" value="admin" name="user_name"/>
                  </div>
                  <div class="">
                     <label for="email_id">EmailId</label>
                  </div>
                  <div class="">
                     <input id="email_id" type="text" name="email_id"/>
                  </div>
                  <div class="">
                     <label for="email_id">Password</label>
                  </div>
                  */}
                  <div class="">
                     {/* <input id="Authenticitypw" type="password" name="Authenticitypw"/>
                     <div class="">
                        <label for="service">service</label>
                     </div>
                     <div class="">
                        <input id="service" type="text" name="service"/>
                     </div>
                     */}
                     <div class="">
                        <label for="token">Token: </label>
                     </div>
                     <div class="">
                        <input id="token" type="text" name="token"/>
                        <input type="button" className="submitBtn" value="Submit" onClick={this.handleOnClickauthenticity} />
                        <span id="loaderToken"  className="text-success hide mt10">
                        <img  src="./static/EmptyDeliriousBluefish-small.gif"/> Credential updation work in progress..
                        </span>
                     </div>
                  </div>
               </div>
            </div>
            <div id="Upload" class="tabcontent hide">
               <div class="adwc_upload">
                  <div class="">
                     <label for="fname">Table Type</label>
                  </div>
                  <div class="">
                     <span class="radioset"><input type="radio" id="table_type" name="table_type" value="internal"/>Internal</span>
                     <span class="radioset"><input type="radio" id="table_type" name="table_type" value="external"/>External </span>
                  </div>
               </div>
               <div class="adwc_upload">
                  <div class="">
                     <label for="fname">Tenancy Id </label>
                  </div>
                  <br/>
                  <div class="">
                     {/* <input type="file" id="file_upload" name="file_upload"/> */}
                     <div class="upload-btn-wrapper">
                        <input id="tenancy_id" type="text" name="tenancy_id"/>
                     </div>
                  </div>
               </div>
               <div class="adwc_upload">
                  <div class="">
                     <label for="fname">Compartment Id </label>
                  </div>
                  <br/>
                  <div class="">
                     {/* <input type="file" id="file_upload" name="file_upload"/> */}
                     <div class="upload-btn-wrapper">
                        <input id="compartment_id" type="text" name="compartment_id"/>
                     </div>
                  </div>
               </div>
               <div class="adwc_upload">
                  <div class="">
                     <label for="fname">Namespace </label>
                  </div>
                  <br/>
                  <div class="">
                     {/* <input type="file" id="file_upload" name="file_upload"/> */}
                     <div class="upload-btn-wrapper">
                        <input id="namespace" type="text" name="namespace"/>
                     </div>
                  </div>
               </div>
               <div class="adwc_upload">
                  <div>
                     <label for="OsbStatus">Bucket Selection</label>
                  </div>
                  <select id="OsbStatus" name="OsbStatus" onChange={this.handleOsbStatus}>
                     <option value="">Select</option>
                     <option value="existing" >Select bucket from List</option>
                     <option value="new">Create New bucket</option>
                  </select>
               </div>
               <div class="adwc_upload hide" id="existingBucket">
                  <label for="Osbpath">Bucket Name: </label>
                  <select id="Osbpath" name="Osbpath">
                  </select>
               </div>
               <div id="Newbucketname" class="adwc_upload hide">
                  <label for="Osbpath">Bucket Name</label>
                  <input id="OsbpathName" type="text" name="OsbpathName"/>
                  <label for="Osbpath">Public Acess Type</label>
                  {/* <input id="public_access_type" type="text" name="public_access_type"/> */}
                  <select id="public_access_type" name="public_access_type">
                     <option value="">Select</option>
                     <option value="NoPublicAccess">NoPublicAccess</option>
                     <option value="ObjectRead">ObjectRead</option>
                  </select>
                  <label for="Osbpath">Storage Type</label>
                  <input id="storage_tier" type="text" name="storage_tier"/>
               </div>
               <div class="adwc_upload">
                  <div class="">
                     <label for="fname">File Upload: </label>
                  </div>
                  <br/>
                  <div class="">
                     {/* <input type="file" id="file_upload" name="file_upload"/> */}
                     <div class="upload-btn-wrapper">
                        <input type="file" id="upload" name="myfile" />
                     </div>
                  </div>
               </div>
               <div class="adwc_upload">
                  <div class="">
                     <label for="fname">File Delimeter: </label>
                  </div>
                  <div class="">
                     <span class="radioset"><input type="radio" id="file_delim" name="file_delim" value="-"/>Hyphen ( - )</span>
                     <span class="radioset"> <input type="radio" id="file_delim" name="file_delim" value=","/>Comma ( , )</span>
                     <span class="radioset"> <input type="radio" id="file_delim" name="file_delim" value=";"/>Semicolon ( ; )</span>
                     <span class="radioset">  <input type="radio" id="file_delim" name="file_delim" value="|"/>Pipe ( | )</span>
                  </div>
               </div>
               <div class="adwc_upload">
                  <div class="">
                     <label for="fname">Table Name: </label>
                  </div>
                  <div class="">
                     <input id="tab_name" type="text" name="tab_name"/>
                  </div>
               </div>
               <div class="adwc_upload">
                  <input type="submit" className="submitBtn" value="Submit" onClick={this.handleOnClickADWCForm}/>
                  <br/>
                  <span id="loaderTable"  className="text-success hide mt10">
                  <img  src="./static/EmptyDeliriousBluefish-small.gif"/> table creation in progress..
                  </span>
               </div>
            </div>
            <div id="View" class="tabcontent hide">
               <div class="tab">
                  {/* <button class="tablinks active" >Query Data</button>
                  <button class="tablinks" >Visualize Data</button> */}
                  <div>
                     <div>
                        <select id="table" name="adwc_table" onChange={this.tableView} >
                        </select>
                        <span id="loader"  className="text-success hide mt10">
                        <img  src="./static/EmptyDeliriousBluefish-small.gif"/> fetching data in progress..
                        </span>
                     </div>
                     <div>
                        <div class="table-heading" dangerouslySetInnerHTML={ { __html:  this.state.tablePopulate } }>
                     </div>
                     <table dangerouslySetInnerHTML={ { __html:  this.state.componentDataPopulate } }></table>
                     {/* 
                     <textarea id="querydata" placeholder="SQL Editor..."></textarea>
                     */}
                  </div>
               </div>
               <div class="grid-container">
                  <div></div>
               </div>
            </div>
         </div>
      </div>
   </div>
</div>
</div>
        );
    }
}