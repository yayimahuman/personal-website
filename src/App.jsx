import React, { Component } from 'react';
import {BrowserRouter as Router, Route, Switch} from "react-router-dom";
import ReactGA from 'react-ga';

// https://www.npmjs.com/package/@fortawesome/react-fontawesome
import { library } from '@fortawesome/fontawesome-svg-core';
import {
    faBicycle,
    faBookOpen,
    faCode,
    faCoffee,
    faElephant,
    faEnvelope,
    faFemale,
    faFileAlt,
    faMapMarked,
    faMountain,
    faPodium,
    faTennisBall,
    faUsdCircle,
    faUtensils,
} from "@fortawesome/pro-light-svg-icons";
import {
    faTimes,
} from "@fortawesome/pro-regular-svg-icons";
import {
    faBrowser,
} from "@fortawesome/pro-solid-svg-icons";
import {
    faGithub,
    faLinkedin,
} from "@fortawesome/free-brands-svg-icons"

import Home from "./pages/Home.jsx";
import './css/App.css';

ReactGA.initialize('G-5E883PXSWC', {debug:true});

library.add(
    faBicycle,
    faBookOpen,
    faBrowser,
    faCode,
    faCoffee,
    faElephant,
    faEnvelope,
    faFemale,
    faFileAlt,
    faGithub,
    faLinkedin,
    faMapMarked,
    faMountain,
    faPodium,
    faTennisBall,
    faTimes,
    faUsdCircle,
    faUtensils,
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
