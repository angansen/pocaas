import React from 'react';
import {
    BrowserRouter as Router,
    Route,
    Link,
    Redirect,
    withRouter
} from "react-router-dom";
import Nav from "./nav";
import axios from 'axios';
class loginScreen extends React.Component {
        constructor(props) {
            super(props);
            this.state = {
                LoginSuccess: '',
                LoginName: '',
                LoginPwd: ''

            };
        }
        componentDidMount() {

            var userName = sessionStorage.getItem("username");
            if (userName != undefined) {
                sessionStorage.setItem("user_name", userName);
                this.setState({
                    LoginSuccess: true
                });

            }

           var inputPwd = document.getElementById("LoginPwd");
           var inputUser= document.getElementById("LoginName");
            // Execute a function when the user releases a key on the keyboard
            inputPwd.addEventListener("keyup", function(event) {
                // Number 13 is the "Enter" key on the keyboard          
                    if (event.keyCode === 13) {
                        if(inputPwd.value!="" && inputUser.value!="" ){
                        // Cancel the default action, if needed
                        event.preventDefault();
                        // Trigger the button element with a click
                        document.getElementById("submit").click();
                    }else{
                        alert('Please enter Username and Password both.');
                        return false;
                    }
                }
                
                });
           
        }

        handleChange = (e) => {
            // console.log(e);
            this.setState({
                [e.target.name]: e.target.value
            })
        }
       

        onSubmit = (e) => {
            e.preventDefault();
            //alert(this.state.LoginPwd);
            const form = {
                TF_VAR_user_name: this.state.LoginName,
                TF_VAR_password: this.state.LoginPwd

            }


            if (form.TF_VAR_user_name != '' && form.TF_VAR_password != '') {
                axios.post(global.baseDomain + '/user/login/', JSON.stringify(form))
                    .then(response => {
                        var json = response.data;

                        if (json[0]) {

                            if (typeof(Storage) !== "undefined") {
                                if (userName != undefined) {} else {
                                    var userName = sessionStorage.setItem("username", form.TF_VAR_user_name);
                                    //  var password= localStorage.setItem("password", document.getElementById('psw').value); 
                                    sessionStorage.setItem("user_name", form.TF_VAR_user_name);
                                    sessionStorage.setItem("user_namenew", json[0].USERNAME);
                                    sessionStorage.setItem("user_role", json[0].USER_ROLE);
                                    sessionStorage.setItem("user_id", json[0].USER_ID);
                                    sessionStorage.setItem("COMPANY_ID", json[0].COMPANY_ID);
                                    sessionStorage.setItem("COMPANY_NAME", json[0].COMPANY_NAME);
                                    sessionStorage.setItem("USER_PHONE", json[0].USER_PHONE);
                                    sessionStorage.setItem("EMAIL", json[0].EMAIL);

                                }
                            }
                            this.setState({
                                LoginSuccess: true
                            });
                        } else {
                            alert('You are not authorized user, Please contact your administrator.');
                            return false;
                        }
                     }).catch((error) => {
                        alert(error.message);
                        return false;
                    })
                this.setState({
                    LoginName: '',
                    LoginPwd: ''
                })
            } else {

                alert('Please check either UserName or Password is empty');
                return false;
            }

        }
     
   
    render() {
        if(this.state.LoginSuccess){
            return <Redirect push to="/" />; 
        }
       return (
        <div class="container loginScreen ">
        {/* Login Form */}
            <div  class="loginDiv">
            <label for="uname"><b>Username</b></label>
            <input type="text" placeholder="Enter Username" id="LoginName"  name='LoginName'
                value={this.state.LoginName}
                onChange={e => this.handleChange(e)} />
            <label for="psw"><b>Password</b></label>
            <input type="password" placeholder="Enter Password" name="LoginPwd" id="LoginPwd"  value={this.state.LoginPwd}
                onChange={e => this.handleChange(e)}/>
            <button type="submit" id="submit" onClick={(e) => this.onSubmit(e)} >Login</button>
            </div>
       </div>
        );
    }
}
export default loginScreen;