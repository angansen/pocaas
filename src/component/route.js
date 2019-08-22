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
 import LoginScreen from './loginScreen';
import Nav from './nav';
import SearchBox from './searchBox';
import ContentBox from './contentBox';
import Dialog from './dialogBox';

import ShowListing from './showList';
import ProfileListing from './profileList';
import CurrentProfileList from './currentProfile';
import CompanyListing from './companyList';
import TagListing from './tagList';
// import ChatBot from './Chatbot';
import Logout from './logout';
import LogoHeader from './logoHeader';
import Impaas from './Impaas';
import ImpaasLanding from './ImpaasLanding';

const RouterApp = () => (
  <Router>
   
      <div>
      <Route exact path="/" component={Home} />
      <Route  path="/dash" component={Dash} />
      <Route  path="/profile" component={Profile} />
      <Route  path="/company" component={Company} />
      <Route  path="/login" component={Loginbox} />
      <Route  path="/viewProfile" component={viewProfilebox} />
      <Route  path="/#/administrator" component={Dash} />
      <Route path="/TagManagement" component={TagSection} />
      <Route path="/impaas/:jobId" component={_impaas} />
      {/* <Route path="/impaas" component={_impaas} /> */}
      <Route path="/impaas_landing" component={_impaas_landing} />
      

      </div>
   
  </Router>
);

const Home = () => (
  <div>
  <header class="App-header">
  <LogoHeader/>
     <Nav/>
    </header>
  <div>
  {/* <p className="text-center note">Note: This portal doesn't work with Oracle VPN</p> */}
    {/* <LoginBox/> */}
    <div id="searchPanel">
        <SearchBox title="" placeholder="Please type here to search" /> 
        <Dialog/> 
        <ContentBox />  
        {/* <ChatBot/> */}
    </div> 
  </div>
  </div>
);


const Dash = ({ match }) => (
  <div>
  <header class="App-header">
  <LogoHeader/>
     <Nav/>
    </header>
  <div>
     <ShowListing/>
     <Dialog/> 
     {/* <ChatBot/> */}
  </div>
  </div>
);

const _impaas = () => (
  <div>
    <header class="App-header">
      <LogoHeader />
      <Nav />
    </header>
    <div>
      <Impaas />
    </div>
  </div>
);

const _impaas_landing = () => (
  <div>
    <header class="App-header">
      <LogoHeader />
      <Nav />
    </header>
    <div>
      <ImpaasLanding />
    </div>
  </div>
);

const viewProfilebox = ({ match }) => (
  <div>
  <header class="App-header">
  <LogoHeader/>
     <Nav/>
    </header>
  <div>
     <CurrentProfileList/>
     <Dialog/> 
     {/* <ChatBot/> */}
  </div>
  </div>
);


const Loginbox = ({ match }) => (
  <div>
  <header class="App-header">
      <div class="LogoHeader">
            <Link to="/"><span>POCaaS</span></Link>
      </div> 
  </header>
  <div>
     <LoginScreen/>
     <Dialog/> 
  </div>
  </div>
);
const Profile = ({ match }) => (
  <div>
  <header class="App-header">
  <LogoHeader/>
     <Nav/>
    </header>
  <div>
     <ProfileListing/>
     <Dialog/> 
     {/* <ChatBot/> */}
  </div>
  </div>
);
const Company = ({ match }) => (
  <div>
  <header class="App-header">
  <LogoHeader/>
     <Nav/>
    </header>
  <div>
     <CompanyListing/>
     <Dialog/> 
     {/* <ChatBot/> */}
  </div>
  </div>
);
const TagSection = ({ match }) => (
  <div>
  <header class="App-header">
  <LogoHeader/>
     <Nav/>
    </header>
  <div>
     <TagListing/>
     <Dialog/> 
     {/* <ChatBot/> */}
  </div>
  </div>
);

export default RouterApp;