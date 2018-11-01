import React, { Component } from 'react';
// import {Link} from "react-router-dom";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { Tooltip } from 'reactstrap';
import $ from "jquery";
import moment from "moment";
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
        const {color, backgroundColor, img, name} = this.props;
        console.log(this.props);
        return (
            <div className="project project-container">
                <div style={{backgroundColor}} className="project-card" onClick={this.handleClick}>
                    <p style={{color}} className="project-title">{name}</p>
                </div>
            </div>
        );
    }

}
