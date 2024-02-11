import React, {Component} from "react";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import ReactGA, {OutboundLink} from "react-ga";
import OverlayTrigger from 'react-bootstrap/OverlayTrigger';
import Tooltip from 'react-bootstrap/Tooltip';
import {CopyToClipboard} from "react-copy-to-clipboard";

import Project from "../components/Project.jsx";
import ProjectModal from "../components/ProjectModal.jsx";

import {
	RESUME_LINK,
	GITHUB_LINK,
	LINKEDIN_LINK,
	TWITTER_LINK,
	MEDIUM_LINK,
	YOUTUBE_LINK,
	EMAIL,
} from "../config";

export default class Home extends Component {
	constructor(props) {
		super(props);

		this.state = {
			interestsOrder: [
				"coding",
				"meditation",
				"food",
				"travelling",
				"finance",
				"reading",
				"skiing",
				"tennis",
				"tea",
				"biking",
				"politics",
				"taylor swift",
			],
			interests: {
				coding: {
					icon: ["fal", "code"],
					color: "#4d5063",
				},
				tennis: {
					icon: ["fal", "tennis-ball"],
					color: "#CFD736",
				},
				food: {
					icon: ["fal", "utensils"],
					color: "#5C8A29",
				},
				finance: {
					icon: ["fal", "usd-circle"],
					color: "#798A6A",
				},
				economics: {
					icon: ["fal", "elephant"],
					color: "#E2110A",
				},
				reading: {
					icon: ["fal", "book-open"],
					color: "#3C3E3D",
				},
				skiing: {
					icon: ["fal", "mountain"],
					color: "gray",
				},
				tea: {
					icon: ["fal", "coffee"],
					color: "#881517",
				},
				biking: {
					icon: ["fal", "bicycle"],
					color: "#F77E4A",
				},
				politics: {
					icon: ["fal", "podium"],
					color: "#D81920",
				},
				travelling: {
					icon: ["fal", "map-marked"],
					color: "#4A7AAA",
				},
				"taylor swift": {
					icon: ["fal", "female"],
					color: "pink",
				},
				meditation: {
					icon: ["fal", "head-side-brain"],
					color: "#e8774b",
				},
				"nothing to see here": {
					color: "white",
				},
			},
			activeInterest: "nothing to see here",
			projectsOrder: ["Jouncer", "How Long to Read", "Terabyte Tundra"],
			projects: {
				Jouncer: {
					backgroundColor: "#2a2c3f",
					logo:
						"https://firebasestorage.googleapis.com/v0/b/harry-74f87.appspot.com/o/jouncer-logo.png?alt=media&token=7b962405-b56a-441b-ad95-0adb11eccf3f",
					description:
						"I was the lead frontend developer and one of the members of the cofounding team of Jouncer. Our goal is to bring together creators so they could form teams and work on amazing projects. Jouncer is backed by YCombinator and was part of its summer 2019 batch.\n\nOur vision for Jouncer emerged from the desire to connect motivated people who wanted to work on amazing projects together. As the platform evolved, it became a place to share ideas and projects in addition to helping people form teams.\n\nJouncer has a React frontend. The backend is Django with a Postgres database.",
					link: "https://jouncer.com/",
					hideDesc: true,
					textStyles: {color: "#fff"},
				},
				"Terabyte Tundra": {
					backgroundColor: "#334668",
					logo:
						"https://firebasestorage.googleapis.com/v0/b/harry-74f87.appspot.com/o/tt-logo-old.svg?alt=media&token=51beecf4-0b5d-4056-b454-526ec0b7142c",
					description:
						"I created Terabyte Tundra, along with its primary sales website BoostUpvotes, with a high school friend of mine. We provide products to help individuals and small businesses market themselves on Reddit.\n\nTerabyte Tundra is written in PHP with a MySQL database. The sales websites supporting it use native HTML + CSS + JS and WordPress. The sites are also integrated with PayPal and Stripe.",
					link: "https://terabytetundra.com",
					textStyles: {color: "#fff"},
				},
				"How Long to Read": {
					backgroundColor: "#c34b30",
					logo:
						"https://firebasestorage.googleapis.com/v0/b/harry-74f87.appspot.com/o/hltr-logo.svg?alt=media&token=042febef-5378-4f73-a511-a9930e408ddd",
					logoStyles: {width: "40%"},
					textStyles: {
						color: "#f5e2bf",
						fontFamily: "Averta, Muli, sans-serif",
						fontWeight: 600,
						fontSize: "1.6rem",
					},
					description:
						"I developed How Long to Read, a site where you can search reading times for over twelve million books. How Long to Read was featured in the New York Times, LifeHacker, The Independent, Yahoo News, and more. Over a million people have visited the site since 2014.\n\nBy putting together pieces of information from different sources, such as word count and audiobook length, How Long to Read can estimate reading times for books. Users can read a passage to calculate their own personalized reading speed to be used when performing reading time calculations. With this info, I hope that I can help readers understand and manage their time just a little bit better.\n\nHow Long to Read is written in Node JS with a React + Redux frontend. The site uses a MySQL database. It was originally written in PHP with an HTML, CSS, and JavaScript frontend.",
					link: "http://howlongtoread.com",
				},
			},
			activeProject: undefined,
			dock: [
				{
					name: "Résumé",
					link: RESUME_LINK,
					analyticsLabel: "resume",
					icon: ["fal", "file-alt"],
				},
				{
					name: "YouTube",
					link: YOUTUBE_LINK,
					analyticsLabel: "youtube",
					icon: ["fab", "youtube"],
				},
				{
					name: "LinkedIn",
					link: LINKEDIN_LINK,
					analyticsLabel: "linkedin",
					icon: ["fab", "linkedin"],
				},
				{
					name: "GitHub",
					link: GITHUB_LINK,
					analyticsLabel: "github",
					icon: ["fab", "github"],
				},

				{
					name: "Twitter",
					link: TWITTER_LINK,
					analyticsLabel: "twitter",
					icon: ["fab", "twitter"],
				},
				{
					name: "Medium",
					link: MEDIUM_LINK,
					analyticsLabel: "medium",
					icon: ["fab", "medium"],
				},
				{
					name: "Email",
					analyticsLabel: "email",
					icon: ["fal", "envelope"],
				},
			],
			copied: false,
		};

		this.hover = this.hover.bind(this);
		this.reset = this.reset.bind(this);
		this.setActiveProject = this.setActiveProject.bind(this);
		this.closeModal = this.closeModal.bind(this);
		this.renderDock = this.renderDock.bind(this);
	}

	hover(event) {
		let interest =			event.target.id || event.target.parentNode.id || "nothing to see here";
		this.setState({activeInterest: interest});
	}
	reset() {
		this.setState({activeInterest: "nothing to see here"});
	}
	setActiveProject(name) {
		ReactGA.event({
			category: "Navigation",
			action: `Clicked on project ${name}`,
		});
		this.setState({activeProject: name});
	}
	closeModal() {
		this.setState({activeProject: undefined});
	}
	componentDidMount() {
		ReactGA.pageview(window.location.pathname + window.location.search);
	}
	renderTooltip = (props) => (
		<Tooltip id="button-tooltip" target="mailLink"
		className="icon-tooltip" {...props}>
		  {this.state.copied ? "Copied!" : "Copy email"}
		</Tooltip>
	);
	renderDock(d) {
		if (d.link) {
			return (
				<OutboundLink
					key={d.analyticsLabel}
					className="link"
					eventLabel={d.analyticsLabel}
					to={d.link}
					target="_blank"
					rel="noopener noreferrer"
				>
					<FontAwesomeIcon icon={d.icon} size="2x" />
					<p className="link-desc">{d.name}</p>
				</OutboundLink>
			);
		}
		return (
			<div id="mailLink">
				<OverlayTrigger
					placement="top"
					overlay={this.renderTooltip}
				>
					<CopyToClipboard
						className="link"
						text={EMAIL}
						onCopy={() => this.setState({copied: true})}
					>
						<span>
							<FontAwesomeIcon icon={d.icon} size="2x" />
							<p className="link-desc">{d.name}</p>
						</span>
					</CopyToClipboard>
				</OverlayTrigger>
			</div>
		);
	}

	render() {
		let icons = this.state.interestsOrder.map(name => {
			let i = this.state.interests[name];
			return (
				<span key={name}>
					<FontAwesomeIcon
						id={name}
						className="interest-icon"
						icon={i.icon}
						onMouseEnter={this.hover}
						onMouseLeave={this.reset}
					/>
				</span>
			);
		});

		return (
			<div className="content">
				<section id="landing">
					<div>
						<div id="window-container" className="mx-auto">
							<div id="window-inner-container">
								<div id="window"></div>
							</div>
						</div>

						<h1>Hi! I&apos;m Harry</h1>
						<p className="m-0 desc">
							I work as a software engineer. <br />
							I love &nbsp;
							<span className="interest-icon-span">{icons}</span>
						</p>

						<p
							className={
								"active-interest"
								+ (this.state.activeInterest === "nothing to see here"
									? " invisible"
									: "")
							}
							style={{
								color: this.state.interests[this.state.activeInterest].color,
							}}
						>
							{this.state.activeInterest}
						</p>

						<div className="links-container row d-flex justify-content-center">
							<div className="links-dock d-flex animated slideInUp">
								{this.state.dock.map(this.renderDock)}
							</div>
						</div>
					</div>
				</section>

				<section id="projects">
					<div className="row justify-content-center">
						{this.state.projectsOrder.map(name => (
							<Project
								{...this.state.projects[name]}
								key={name}
								name={name}
								onClick={this.setActiveProject}
							/>
						))}
					</div>
				</section>
				<ProjectModal
					activeProject={this.state.activeProject}
					close={this.closeModal}
					{...this.state.projects[this.state.activeProject]}
				/>
			</div>
		);
	}
}
