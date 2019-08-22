import React, {
    Component
} from 'react';
import axios from 'axios';
class SearchBox extends Component {
    constructor() {
        super();
        this.state = {
            noRecord: '',
            VpnMsg:'text-center note'
        };

    }
    componentDidMount() {
        //prem's
        const host_name = window.location.hostname
        const host_name_parts = host_name.split(".")
        host_name_parts.map(element => {
            if(isNaN(element)) {    
                this.setState({
                    VpnMsg: "hide text-center note"
                })
                return;
            }
            
        })
        // var str =window.location.hostname;
        // var numArray = [];
        // for (var i = 0, len = str.length; i < len; i++) {
        //     var character = str[i];
        //     if(isNumeric(character)){
        //         numArray.push(character);
        //     }
        // }
        // if(numArray.length>0){
        //     this.setState({
        //         VpnMsg: "hide text-center note"
        //     })

        // }else{
        //     this.setState({
        //         VpnMsg: "text-center note"
        //     })
        // }
        //     function isNumeric(n) {
        //     return !isNaN(parseFloat(n)) && isFinite(n)
        // }
    }
    render() {
        function VoiceBasedSearch(val) {
            var a = "";
            var newVal = val.trim()
            var filter = newVal.toUpperCase();
            alert('You are Searching for ' + newVal + ' Card');
            var div = document.getElementById("searchContent");
            var h4 = div.getElementsByTagName("h3");

            for (var i = 0; i < h4.length; i++) {
                a = h4[i];
                if (a.innerHTML.toUpperCase().indexOf(filter) > -1) {
                    h4[i].parentElement.parentElement.classList.remove("hide");
                } else {
                    h4[i].parentElement.parentElement.classList.add("hide");

                }


            }
            let parent1 = document.querySelector("#searchContent");
            if (parent1.children.length === parent1.querySelectorAll(".hide").length) {
                var isMobileVersion = document.getElementsByClassName('noRecord');
                if (isMobileVersion.length <= 0) {
                    var node = document.createElement("b");
                    node.id = "noRecord";
                    node.className = "noRecord";
                    var textnode = document.createTextNode("No Record Found");
                    node.appendChild(textnode);
                    document.getElementById("error").appendChild(node);
                }

            } else {
                var isMobileVersion = document.getElementsByClassName('noRecord');
                if (isMobileVersion.length > 0) {
                    var parent = document.getElementById("error");
                    var child = document.getElementById("noRecord");
                    parent.removeChild(child);
                }
            }


        }

        function handleKeyPress(e) {
            e.preventDefault();
            var a = e.target.value;

            var filter = e.target.value.toUpperCase();
            var div = document.getElementById("searchContent");
            var h4 = div.getElementsByTagName("h3");

            for (var i = 0; i < h4.length; i++) {
                a = h4[i];
                if (a.innerHTML.toUpperCase().indexOf(filter) > -1) {
                    h4[i].parentElement.parentElement.classList.remove("hide");
                } else {
                    h4[i].parentElement.parentElement.classList.add("hide");

                }


            }
            let parent1 = document.querySelector("#searchContent");
            if (parent1.children.length === parent1.querySelectorAll(".hide").length) {
                var isMobileVersion = document.getElementsByClassName('noRecord');
                if (isMobileVersion.length <= 0) {
                    var node = document.createElement("b");
                    node.id = "noRecord";
                    node.className = "noRecord";
                    var textnode = document.createTextNode("No Record Found");
                    node.appendChild(textnode);
                    document.getElementById("error").appendChild(node);
                }

            } else {
                var isMobileVersion = document.getElementsByClassName('noRecord');
                if (isMobileVersion.length > 0) {
                    var parent = document.getElementById("error");
                    var child = document.getElementById("noRecord");
                    parent.removeChild(child);
                }
            }

        }

        function StartRecord(e) {
            try {
                var SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;
                var recognition = new SpeechRecognition();
            } catch (e) {
                console.error(e);

            }

            if (window.hasOwnProperty('webkitSpeechRecognition')) {
                //  media.webspeech.recognition.enable;

                var noteContent = '';
                var instructions = "";
                // recognition.continuous = true;

                recognition.onresult = function(event) {
                    var current = event.resultIndex;
                    var transcript = event.results[current][0].transcript;
                    var mobileRepeatBug = (current == 1 && transcript == event.results[0][0].transcript);

                    if (!mobileRepeatBug) {
                        //  alert(transcript);
                        noteContent += transcript;
                        //alert(noteContent);
                        document.getElementById('search').value = noteContent.toLowerCase();
                        VoiceBasedSearch(noteContent);
                        current = 1;
                        transcript = "";
                        noteContent = "";
                        recognition.stop();


                        // noteTextarea.value=noteContent;
                    }
                };

                recognition.onstart = function() {
                    document.getElementById('start-record-btn').src = "https://cdn4.iconfinder.com/data/icons/healthy-life-line-live-long-and-prosper/512/Music_therapy-512.png";
                    document.getElementById('recording-instructions').innerHTML = 'Voice recognition activated. Try speaking into the microphone. We are listening..';
                }

                recognition.onspeechend = function() {
                    document.getElementById('start-record-btn').src = "./img/mute.png";
                    document.getElementById('recording-instructions').innerHTML = 'Press the speaker image  and allow access for Voice based search.';
                }

                recognition.onerror = function(event) {
                    if (event.error == 'no-speech') {
                        document.getElementById('start-record-btn').src = "./img/mute.png";
                        document.getElementById('recording-instructions').innerHTML = 'No speech was detected. Try again.';
                    };
                }
                document.getElementById('search').value = "";

                noteContent += ' ';
                recognition.start();
            }

        }

        function readOutLoud(message) {
            var speech = new SpeechSynthesisUtterance();
            speech.text = message;
            speech.volume = 1;
            speech.rate = 1;
            speech.pitch = 1;

            window.speechSynthesis.speak(speech);
        }
              
        return (
            <div className="Search text-center">
             <p className={this.state.VpnMsg}>Note: This portal doesn't work with Oracle VPN</p>
                <input type="text" id="search" name="search" placeholder={this.props.placeholder}  onKeyUp={(event) => {
                handleKeyPress(event);
                }}/> 
                {/* <img src="./img/mute.png" id="start-record-btn" onClick={(event) => { */}
                {/* StartRecord(event);}}/> */}
                {/* <p id="recording-instructions">Press the speaker image  and allow access for Voice based search.</p> */}
                <div id="error" className="mt20"></div>
             </div>)}
        }
        
export default SearchBox;
  

  