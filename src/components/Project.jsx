import React, {Component} from "react";

export default class Project extends Component {
	constructor(props) {
		super(props);

		this.handleClick = this.handleClick.bind(this);
	}

	handleClick() {
		this.props.onClick(this.props.name);
	}

	render() {
		const {backgroundColor, name, logo, logoStyles, textStyles} = this.props;
		return (
			<div className="project project-container">
				<div
					style={{backgroundColor}}
					className="project-card"
					onClick={this.handleClick}
				>
					<img
						className="project-img img-responsive"
						src={logo}
						alt={name + " logo"}
						style={logoStyles}
					/>
					{this.props.hideDesc ? (
						""
					) : (
						<p style={textStyles} className="project-title">
							{name}
						</p>
					)}
				</div>
			</div>
		);
	}
}
