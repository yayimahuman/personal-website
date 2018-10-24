import React, { Component } from 'react';
import {BrowserRouter as Router, Route, Switch} from "react-router-dom";

// https://www.npmjs.com/package/@fortawesome/react-fontawesome
import { library } from '@fortawesome/fontawesome-svg-core'
import { fal } from "@fortawesome/pro-light-svg-icons"
import { far } from "@fortawesome/pro-regular-svg-icons"
import { fas } from "@fortawesome/pro-solid-svg-icons"
import { fab } from "@fortawesome/free-brands-svg-icons"

import Home from "./pages/Home.jsx";
import './css/App.css';
// import logo from './logo.svg';
// import config from './config';

library.add(fal, far, fas, fab)

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
