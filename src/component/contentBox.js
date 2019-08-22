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
class ContentBox extends Component {

  constructor() {
      super();
      this.state = {
          componentData: '',
          loggedinStatus:'',
          redirectImpaas: false
      };

  }

  componentDidMount() {
      var cred={
        credentials: 'include'
      }
axios.post(global.baseDomain + '/pages/home/',cred)
  .then(res => {
      var myObj = res.data;
      var j, x = '';
      for (j in myObj) {
          var sessionName = sessionStorage.getItem("user_name");
          var img = "";
          if (myObj[j].IMAGE_PATH == null) {
              img = "deafult-images.png";
          } else {
              img = myObj[j].IMAGE_PATH;
          }
          if (((JSON.stringify(sessionName)) != "null")) {

              if (myObj[j].IMPLEMENTED === 0) {
                  var cl = "column blue";
                  var msg = '<b class=" gray-light">Coming Soon.....</b>';
                  var btn = "" + msg + "";
              } else {
                  var cl = "column red";
                  var msg = "";
                  var btn = msg;


              }
              x += '<div class="' + cl + '" type="' + myObj[j].ID + '" >' +
                  "<div class='inline imagebox'><img src='./static/" + img + "'/></div><div class='inline'><h3>" + myObj[j].NAME + "</h3>" +
                  "<p class='gray-light'>" + myObj[j].DESCRIPTION + "</p>" + btn + "</div></div>";

          } else {
              if (myObj[j].ID == '9') {
                  cl = "column red";
                  var msg = "";
                  var btn = "";
                  x += '<div class="' + cl + '" type="' + myObj[j].ID + '" >' +
                      "<div class='inline imagebox'><img src='./static/" + img + "'/></div><div class='inline'><h3>" + myObj[j].NAME + "</h3>" +
                      "<p class='gray-light'>" + myObj[j].DESCRIPTION + "</p>" + btn + "</div></div>";
              } else {

                  cl = "logincolumn red";
                  var msg = "<a href='/login'><b class='bord-cl  loginbtn'>Login &rarr;</b></a>";
                  var btn = "<p class='btn-align'>" + msg + "</p>";

                     x += '<div class="' + cl + '" type="' + myObj[j].ID + '" >' +
                      "<div class='inline imagebox'><img src='./static/" + img + "'/></div><div class='inline'><h3>" + myObj[j].NAME + "</h3>" +
                      "<p class='gray-light'>" + myObj[j].DESCRIPTION + "</p>" + btn + "</div></div>";
                 }

          }


      }

      this.setState({
          componentData: x
      })
  })
}

render() {

      setTimeout(function() {
          var classname = document.getElementsByClassName("column");
          var openDialogBoxUi = function() {
              var attribute = this.getAttribute("class");
              var Id = this.getAttribute("type");

              // alert(Id);
              if (attribute === 'column red') {
                  var el = document.getElementById('content-box').getElementsByTagName('button');
                  if (Id == "11"){
                      window.location.href ="/impaas_landing";
                  }else{
                      document.getElementById("myModal").style.display = 'block';
                      document.getElementById('PovaasId').value = Id;
                  }
                 
                  // alert(Id)
                  //setTimeout(function(){ alert("Hello"); }, 3000);

                  if (Id == "1") {
                      // alert(Id);
                      document.getElementById("content_form").classList.remove("hide");
                      document.getElementById("haddob_form").classList.add("hide");
                      document.getElementById("adwc_form").classList.add("hide");
                      document.getElementById("worker").classList.remove("hide");
                      document.getElementById("graph_section").classList.add("hide");
                  }

                  if (Id == "3") {
                      document.getElementById("content_form").classList.add("hide");
                      document.getElementById("haddob_form").classList.remove("hide");
                      document.getElementById("adwc_form").classList.add("hide");
                      document.getElementById("worker").classList.remove("hide");
                      document.getElementById("graph_section").classList.add("hide");
                  }
                  if (Id == "2") {
                      document.getElementById("content_form").classList.add("hide");
                      document.getElementById("haddob_form").classList.remove("hide");
                      document.getElementById("adwc_form").classList.add("hide");
                      document.getElementById("worker").classList.remove("hide");
                      document.getElementById("graph_section").classList.add("hide");
                  } else if (Id == "8") {
                      document.getElementById("content_form").classList.add("hide");
                      document.getElementById("haddob_form").classList.add("hide");
                      document.getElementById("adwc_form").classList.remove("hide");
                      document.getElementById("worker").classList.remove("hide");
                      document.getElementById("graph_section").classList.add("hide");

                  } else if (Id == "4") {
                      document.getElementById("content_form").classList.add("hide");
                      document.getElementById("haddob_form").classList.remove("hide");
                      document.getElementById("adwc_form").classList.add("hide");
                      document.getElementById("worker").classList.add("hide");
                      document.getElementById("graph_section").classList.add("hide");

                  } else if (Id == "9") {
                      document.getElementById("content_form").classList.add("hide");
                      document.getElementById("haddob_form").classList.add("hide");
                      document.getElementById("adwc_form").classList.add("hide");
                      document.getElementById("worker").classList.add("hide");
                      document.getElementById("graph_section").classList.remove("hide");

                  }
                  else if (Id == "10") {
                    document.getElementById("myModal").style.display = 'none';
                    document.getElementById("myForm").style.display = "block";
                }
              }

          };

          for (var i = 0; i < classname.length; i++) {
              classname[i].addEventListener('click', openDialogBoxUi, false);
          }
      }, 3000);
     return (
        <div id="content-box">
             {/* <Link to="/impaas"><button>impaas</button></Link> */}
            <div id="searchContent" class="searchContent" dangerouslySetInnerHTML={ { __html:  this.state.componentData } }></div>
        </div>
          
        
      );
    }
  }
  
  export default ContentBox;
  

  