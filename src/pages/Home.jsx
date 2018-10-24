import React, { Component } from 'react';
// import {Link} from "react-router-dom";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { Tooltip } from 'reactstrap';
import $ from "jquery";
import moment from "moment";
// import config from '../config';


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
                    color: "#D0E619"
                },
                "food": {
                    icon: ['fal', 'utensils'],
                    color: "#d0d7d8"
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
                    color: "#F4DF8E"
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
            activeInterest: "nothing to see here"

        }

        this.hover = this.hover.bind(this);
        this.reset = this.reset.bind(this);
    }

    hover(event){
        let interest = event.target.id || event.target.parentNode.id || "nothing to see here";
        // event.target.tooltip({placement: "top"});
        this.setState({activeInterest: interest});
    }
    reset(){
        this.setState({activeInterest: "nothing to see here"});
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
                <section id="landing" className="h-100">
                    <div>
                        <div id="window-container" className="mx-auto"><div id="window-inner-container"><div id="window"></div></div></div>

                        <h1>Hi! I'm Harry</h1>
                        <p className="m-0 desc">{/*I'm a {this.state.age} year old guy from Toronto. */}I study software engineering at the University of Waterloo. <br />I love &nbsp;
                        <span className="interest-icon-span">
                            {icons}
                        </span></p>

                        <p className={'active-interest' + (this.state.activeInterest == "nothing to see here" ? " invisible" : "")} style={{color: this.state.interests[this.state.activeInterest].color}}>{this.state.activeInterest}</p>

                        <div className="links mx-auto row d-flex justify-content-center">
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
                </section>
            </div>
        );
    }

}
