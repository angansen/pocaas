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
       


    }
    render() {
       

        var openChatPop = function() {
            document.getElementById("myForm").style.display = "block";
            speak('Welcome to Pocaas Help Centre. Please Let us know How we can help you?');
 
// say a message
function speak(text, callback) {
    var u = new SpeechSynthesisUtterance();
    u.text = text;
    u.lang = 'en-US';
 
    u.onend = function () {
        if (callback) {
            callback();
        }
    };
 
    u.onerror = function (e) {
        if (callback) {
            callback(e);
        }
    };
 
    speechSynthesis.speak(u);
}

         }
         var closeChatPop = function() {
            document.getElementById("myForm").style.display = "none";

         }
             return (
                 <div>
                     <button class="open-button" onClick={openChatPop}>Contact Us</button>
                     <div class="chat-popup form-container" id="myForm">
                         <h2>POCaaS Help Center</h2>

                            <label for="msg"><b>How can we help you?</b></label>
                            {/* <textarea placeholder="Type message.." name="msg" required></textarea> */}
                            {/* <img src="./img/mute.png" id="start-record-btn-pop" onClick={(event) => {
                            StartFetchRecordOnSpeech(event);}}/>
                            <p id="recording-instructions-pop">Press the speaker image  and allow access for Voice based search.</p> */}
                            <div id="error" className="mt20"></div>
                            <input type="text" name="query" placeHolder="Write your query" id="query"/><br/>
                            <button type="button" class="btn cancel mt20" onClick={closeChatPop}>Close</button>
                        </div>
                </div>
               
            );
            }
            
        }
        
export default ShowList;
  

  