import React, {Component} from "react";
import {BrowserRouter as Router, Routes, Route} from "react-router-dom";
import ReactGA from "react-ga";

// https://www.npmjs.com/package/@fortawesome/react-fontawesome
import {library} from "@fortawesome/fontawesome-svg-core";
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
	faHeadSideBrain,
} from "@fortawesome/pro-light-svg-icons";
import {faTimes} from "@fortawesome/pro-regular-svg-icons";
import {faBrowser} from "@fortawesome/pro-solid-svg-icons";
import {
	faGithub,
	faLinkedin,
	faMedium,
	faTwitter,
	faYoutube,
} from "@fortawesome/free-brands-svg-icons";

import Home from "./pages/Home.jsx";
import "./scss/App.scss";

ReactGA.initialize("UA-149491515-1");

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
	faMedium,
	faMountain,
	faPodium,
	faTennisBall,
	faTimes,
	faTwitter,
	faUsdCircle,
	faUtensils,
	faYoutube,
	faHeadSideBrain,
);

class App extends Component {
	render() {
		return (
			<Router id="App">
				<Routes>
					<Route path="/home" element={<Home />} />
					<Route path="/" element={<Home />} />
				</Routes>
			</Router>
		);
	}
}

export default App;
