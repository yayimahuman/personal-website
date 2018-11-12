import React, { Component } from 'react';
// import {Link} from "react-router-dom";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { Tooltip } from 'reactstrap';
import $ from "jquery";
import moment from "moment";
// import config from '../config';
import Project from "../components/Project.jsx";
import ProjectModal from "../components/ProjectModal.jsx";

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
                "Terabyte Tundra",
                "How Long to Read",
                "DataEarth"
            ],
            projects: {
                "Terabyte Tundra": {
                    color: "#fff",
                    backgroundColor: "#334668",
                    logo: "https://www.harrydong.com/img/tt-logo.png",
                    description: "Reddit and Quora marketing and SEO for individuals and businesses. Completed numerous contracts working extensively with customers; work done includes reaching funding goal for a Kickstarter Campaign, and building backlinks for a popular e-commerce store.\n\nConstructed MySQL database to store orders and actions, as well as administrator and client dashboard to access stored data. Developed multiple websites with automated PayPal and Stripe payment processing with PHP backend.",
                    link: "https://terabytetundra.com"
                },
                "How Long to Read": {
                    color: "#000",
                    backgroundColor: "#6aadcc",
                    logo: "https://www.harrydong.com/img/hltr-logo.png",
                    description: "Featured in the New York Times, Lifehacker.com, Yahoo! News, Bustle, The Independent, The Pittsburgh Gazette, MakeUseOf, Netted by the Webbys, Qué Leer, The Memo, and several US and international radio stations. Over 1 million users since launch, 12 million searchable books, and 352,000 pages ranked in Google.\n\nHow Long to Read is a book search engine that shows you how long you'll take to read books you're interested in and provides personalized reading time data with a timed reading of a sample passage.\n\nIntegrated with Amazon API for book information and website monetization. Structured and implemented MySQL database for caching information, optimized for speed. Currently handles 1.2 million cached books for faster loading.",
                    link: "https://howlongtoreadthis.com"
                },
                "DataEarth": {
                    color: "#fff",
                    backgroundColor: "#23a8e9",
                    logo: "https://www.harrydong.com/img/dataearth-logo.png",
                    description: "DataEARTH transforms earth science research into a global ecological map. It helps visualize biological relationships between organic and non-organic things within an ecosystem.",
                    hideDesc: true,
                    link: "https://dataearth.com"
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

                        <p className={'active-interest' + (this.state.activeInterest == "nothing to see here" ? " invisible" : "")} style={{color: this.state.interests[this.state.activeInterest].color}}>{this.state.activeInterest}</p>

                        <div className="links-container row d-flex justify-content-center">
                            <div className="links-dock d-flex animated slideInUp">
                                <a className="link" href="https://www.harrydong.com/resume.pdf" target="_blank">
                                    <FontAwesomeIcon icon={["fal", "file-alt"]} size="2x" />
                                    <p className="link-desc">Résumé</p>
                                </a>
                                <a className="link" href="https://github.com/harry-d" target="_blank">
                                    <FontAwesomeIcon icon={["fab", "github"]} size="2x" />
                                    <p className="link-desc">GitHub</p>
                                </a>
                                <a className="link" href="https://www.linkedin.com/in/harry-dong/" target="_blank">
                                    <FontAwesomeIcon icon={["fab", "linkedin"]} size="2x" />
                                    <p className="link-desc">LinkedIn</p>
                                </a>
                                <a className="link" href="mailto:hhdong@uwaterloo.ca">
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
