import React, { Component } from 'react';
// import {Link} from "react-router-dom";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import moment from "moment";

import Project from "../components/Project.jsx";
import ProjectModal from "../components/ProjectModal.jsx";

import {RESUME_LINK, GITHUB_LINK, LINKEDIN_LINK, EMAIL_LINK} from '../config';

export default class Home extends Component {
    constructor(props){
        super(props);

        this.state = {
            age: moment().diff(moment(936612000000), "years"),
            interestsOrder:[
                "coding",
                "tennis",
                "food",
                "economics",
                "reading",
                "skiing",
                "tea",
                "biking",
                "politics",
                "finance",
                "travelling",
                "taylor swift",
            ],
            interests: {
                "coding": {
                    icon: ['fal', 'code'],
                    color: "#313340"
                },
                "tennis": {
                    icon: ['fal', 'tennis-ball'],
                    color: "#CFD736"
                },
                "food": {
                    icon: ['fal', 'utensils'],
                    color: "#5C8A29"
                },
                "finance": {
                    icon: ['fal', 'usd-circle'],
                    color: "#798A6A"
                },
                "economics": {
                    icon: ['fal', 'elephant'],
                    color: "#E2110A"
                },
                "reading": {
                    icon: ['fal', 'book-open'],
                    color: "#3C3E3D"
                },
                "skiing": {
                    icon: ['fal', 'mountain'],
                    color: "gray"
                },
                "tea": {
                    icon: ['fal', 'coffee'],
                    color: "#881517"
                },
                "biking": {
                    icon: ['fal', 'bicycle'],
                    color: "#F77E4A"
                },
                "politics": {
                    icon: ['fal', 'podium'],
                    color: "#D81920"
                },
                "travelling": {
                    icon: ['fal', 'map-marked'],
                    color: "#4A7AAA"
                },
                "taylor swift": {
                    icon: ['fal', 'female'],
                    color: "pink"
                },
                "nothing to see here": {
                    color: "white"
                },
            },
            activeInterest: "nothing to see here",
            projectsOrder: [
                "Jouncer",
                "How Long to Read",
                "Terabyte Tundra",
                "DataEarth"
            ],
            projects: {
                "Jouncer": {
                    color: "#fff",
                    backgroundColor: "#2a2c3f",
                    logo: "https://firebasestorage.googleapis.com/v0/b/harry-74f87.appspot.com/o/jouncer-logo.png?alt=media&token=7b962405-b56a-441b-ad95-0adb11eccf3f",
                    description: "I was the lead frontend developer and one of the members of the cofounding team of Jouncer. Our goal is to bring together creators so they could form teams and work on amazing projects. Jouncer is backed by YCombinator and was part of its summer 2019 batch.\n\nOur vision for Jouncer emerged from the desire help motivated, capable individuals to meet other similar people to work on amazing projects together. As the platform evolved, it became a place to share ideas and projects in addition to the teams feature.\n\nJouncer has a React frontend. The backend is Django with a Postgres database.",
                    link: "https://jouncer.com/",
                    hideDesc: true,
                },
                "Terabyte Tundra": {
                    color: "#fff",
                    backgroundColor: "#334668",
                    logo: "https://firebasestorage.googleapis.com/v0/b/harry-74f87.appspot.com/o/tt-logo.svg?alt=media&token=736950ef-7b0a-4d26-9ce7-552a4ae15245",
                    description: "I created Terabyte Tundra, along with its primary sales website BoostUpvotes, with a high school friend of mine. We focus on products that help individuals and small businesses market on Reddit.\n\nTerabyte Tundra is written in PHP with a MySQL database. The sales websites supporting it use various technologies, such as native HTML + CSS + JS and WordPress. The sites have numerous integrations with PayPal and Stripe.",
                    link: "https://terabytetundra.com"
                },
                "How Long to Read": {
                    color: "#000",
                    backgroundColor: "#6aadcc",
                    logo: "https://firebasestorage.googleapis.com/v0/b/harry-74f87.appspot.com/o/hltr-logo.png?alt=media&token=c983416d-999b-4514-9789-6a4d2086af12",
                    description: "I developed How Long to Read, a site where you can search reading times for over twelve million books. We were featured in the New York Times, LifeHacker, The Independent, Yahoo News, and more. Over a million people from over a hundred countries have used our site since our launch in 2014.\n\nReading is clearly rewarding, but also very time-consuming. We envisioned How Long to Read as tool to help readers find out how long it would take them to read a book they wanted to or needed to read. By putting together pieces of information from different sources, such as word count and audiobook length, we can estimate a reading time for each book we display on our site. Users can read a passage from the book or an equivalent passage which we factor in to create a personalized reading time calculation. With this data, we hope to help readers around the world to allocate their time better.\n\nHow Long to Read is written in PHP with an HTML, CSS, and native JavaScript frontend. The site uses a MySQL database.",
                    link: "https://howlongtoreadthis.com"
                },
                "DataEarth": {
                    color: "#fff",
                    backgroundColor: "#23a8e9",
                    logo: "https://firebasestorage.googleapis.com/v0/b/harry-74f87.appspot.com/o/de-logo.png?alt=media&token=43d4a8d6-43cb-4c22-999c-8ace3f23580c",
                    description: "I was one of the two people who developed DataEarth under contract. DataEarth helps researchers visualize biological relationships within an ecosystem.",
                    hideDesc: true,
                    link: "https://dataearth.com/demo.php"
                },

            },
            activeProject: undefined
        };

        this.hover = this.hover.bind(this);
        this.reset = this.reset.bind(this);
        this.setActiveProject = this.setActiveProject.bind(this);
        this.closeModal = this.closeModal.bind(this);
    }

    hover(event){
        let interest = event.target.id || event.target.parentNode.id || "nothing to see here";
        // event.target.tooltip({placement: "top"});
        this.setState({activeInterest: interest});
    }
    reset(){
        this.setState({activeInterest: "nothing to see here"});
    }
    setActiveProject(name){
        this.setState({activeProject: name});
    }
    closeModal(){
        this.setState({activeProject: undefined});
    }
    // componentDidMount(){
    //     $('[data-toggle="tooltip"]').tooltip()
    // }

    render(){
        let icons = this.state.interestsOrder.map(name => {
            let i = this.state.interests[name];
            return (
                <span>
                    <FontAwesomeIcon id={name} className="interest-icon" icon={i.icon} key={name} onMouseEnter={this.hover} onMouseLeave={this.reset} />
                </span>

            );
        });

        return (
            <div className="content">
                <section id="landing">
                    <div>
                        <div id="window-container" className="mx-auto"><div id="window-inner-container"><div id="window"></div></div></div>

                        <h1>Hi! I'm Harry</h1>
                        <p className="m-0 desc">{/*I'm a {this.state.age} year old guy from Toronto. */}I study software engineering at the University of Waterloo. <br />I love &nbsp;
                            <span className="interest-icon-span">
                                {icons}
                            </span></p>

                        <p className={'active-interest' + (this.state.activeInterest === "nothing to see here" ? " invisible" : "")} style={{color: this.state.interests[this.state.activeInterest].color}}>{this.state.activeInterest}</p>

                        <div className="links-container row d-flex justify-content-center">
                            <div className="links-dock d-flex animated slideInUp">
                                <a className="link" href={RESUME_LINK} target="_blank" rel="noopener noreferrer">
                                    <FontAwesomeIcon icon={["fal", "file-alt"]} size="2x" />
                                    <p className="link-desc">Résumé</p>
                                </a>
                                <a className="link" href={GITHUB_LINK} target="_blank" rel="noopener noreferrer">
                                    <FontAwesomeIcon icon={["fab", "github"]} size="2x" />
                                    <p className="link-desc">GitHub</p>
                                </a>
                                <a className="link" href={LINKEDIN_LINK} target="_blank" rel="noopener noreferrer">
                                    <FontAwesomeIcon icon={["fab", "linkedin"]} size="2x" />
                                    <p className="link-desc">LinkedIn</p>
                                </a>
                                <a className="link" href={EMAIL_LINK} rel="noopener noreferrer">
                                    <FontAwesomeIcon icon={["fal", "envelope"]} size="2x" />
                                    <p className="link-desc">Email</p>
                                </a>
                            </div>
                        </div>

                    </div>
                </section>

                <section id="projects">

                    <div className="row justify-content-center">
                        {this.state.projectsOrder.map(name => <Project {...this.state.projects[name]} key={name} name={name} onClick={this.setActiveProject} />)}
                    </div>

                </section>
                <ProjectModal activeProject={this.state.activeProject} close={this.closeModal} {...this.state.projects[this.state.activeProject]} />
            </div>
        );
    }

}
