import React from "react";
import {ReactComponent as SubstackLogo} from "./SubstackLogo.svg";

const SubstackIcon = ({size = "2x", className = ""}) => {
	const sizeClass = size === "2x" ? "fa-2x" : `fa-${size}`;

	return (
		<SubstackLogo
			className={`svg-inline--fa fa-substack ${sizeClass} ${className}`}
			role="img"
			aria-hidden="true"
			focusable="false"
		/>
	);
};

export default SubstackIcon;
