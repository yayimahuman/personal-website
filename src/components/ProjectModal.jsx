import React, { Component } from 'react';
import { Button, Modal, ModalHeader, ModalBody, ModalFooter } from 'reactstrap';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'

export default class ProjectModal extends React.Component {
    constructor(props) {
        super(props);
    }

    render() {
        const isOpen = this.props.activeProject;
        const name = this.props.activeProject;
        const {color, backgroundColor, logo, description, link} = this.props;
        console.log(logo);

        const modalBgStyles = {
            margin: "-1rem -1rem 1rem",
            height: "400px",
            backgroundColor: backgroundColor,
            borderRadius: ".3rem .3rem 0 0"
        };

        return (
            <div>
                <Modal isOpen={isOpen} toggle={this.props.close} className={"modal-dialog-centered"}>
                    {/*<ModalHeader toggle={this.props.close}>{name}</ModalHeader>*/}
                    <ModalBody>
                        <div className="d-flex justify-content-center align-items-center" style={modalBgStyles}>
                            <img className="mx-auto" src={logo} style={{width: "70%"}}/>

                            <FontAwesomeIcon className="close-btn" icon={["fa", "times"]} onClick={this.props.close} style={{color}} />
                        </div>
                        <p>
                            {description}
                        </p>
                    </ModalBody>
                    <ModalFooter>
                        <a href={link} target="_blank" style={{width: "100%", textAlign: "center"}}><FontAwesomeIcon icon={["fas", "browser"]} /> Website</a>
                    </ModalFooter>
                </Modal>
            </div>
        );
    }
}
