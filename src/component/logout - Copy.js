import React, {
    Component
} from 'react';

import axios from 'axios';
class Logout extends Component {
    constructor() {
        super();
        
    }
    
    logout(){
        this.setState({redirectHome: true});
        axios.post(global.baseDomain+'/user/logout/')
                .then(res => {
                   // console.log(res.status=="200");
                   if(res.status>="200" && res.status<="206" ){
                    sessionStorage.clear();
                         window.location.href='/';
                   }
               

             });
        
      }
    render() {
             return (
                <span id="logout" className="logout" onClick={this.logout.bind(this)}>Logout</span>
            );
            }
        }
        
export default Logout;
  

  