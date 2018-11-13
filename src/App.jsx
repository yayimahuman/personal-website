import React, { Component } from 'react';
import {BrowserRouter as Router, Route, Switch} from "react-router-dom";

// https://www.npmjs.com/package/@fortawesome/react-fontawesome
import { library } from '@fortawesome/fontawesome-svg-core'
import {
    faCode,
    faTennisBall,
    faUtensils,
    faUsdCircle,
    faElephant,
    faBookOpen,
    faMountain,
    faCoffee,
    faPodium,
    faMapMarked,
    faFemale,
    faFileAlt,
    faEnvelope,
    // faTimes,
} from "@fortawesome/pro-light-svg-icons"
import {
    faTimes,
} from "@fortawesome/pro-regular-svg-icons"
// import { fas } from "@fortawesome/pro-solid-svg-icons"
import {
    faGithub,
    faLinkedin,
} from "@fortawesome/free-brands-svg-icons"

import Home from "./pages/Home.jsx";
import './css/App.css';
// import logo from './logo.svg';
// import config from './config';

library.add(
    faCode,
    faTennisBall,
    faUtensils,
    faUsdCircle,
    faElephant,
    faBookOpen,
    faMountain,
    faCoffee,
    faPodium,
    faMapMarked,
    faFemale,
    faFileAlt,
    faEnvelope,
    faTimes,
    faGithub,
    faLinkedin,
);

class App extends Component {
    render(){
        return (
            <Router id="App">
                <Switch>
                    <Route exact path="/home" component={Home}/>
                    <Route exact path="/" component={Home}/>
                </Switch>
            </Router>
        );
    }
}

export default App;
