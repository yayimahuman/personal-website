import React, { Component } from 'react';
// import {Link} from "react-router-dom";
// import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
// import config from '../config';


export default class Project extends Component {
    constructor(props){
        super(props);

        this.handleClick = this.handleClick.bind(this);
    }

    handleClick(){
        this.props.onClick(this.props.name);
    }

    render(){
        const {color, backgroundColor, img, name, logo} = this.props;
        return (
            <div className="project project-container">
                <div style={{backgroundColor}} className="project-card" onClick={this.handleClick}>
                    <img className="project-img img-responsive" src={logo} alt={name + " logo"} />
                    {this.props.hideDesc ? "" : <p style={{color}} className="project-title">{name}</p>}
                </div>
            </div>
        );
    }

}
