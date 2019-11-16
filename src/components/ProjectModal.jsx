import React, { Component } from 'react';
import { Modal, ModalBody, ModalFooter } from 'reactstrap';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {OutboundLink} from 'react-ga';

export default class ProjectModal extends Component {

    render() {
        const name = this.props.activeProject;
        const {color, backgroundColor, logo, description, link} = this.props;

        const modalBgStyles = {
            backgroundColor: backgroundColor,
        };

        return (
            <div>
                <Modal isOpen={!!name} toggle={this.props.close} className={"modal-dialog-centered"}>
                    <ModalBody>
                        <div className="d-flex justify-content-center align-items-center modal-bg" style={modalBgStyles}>
                            <img className="modal-logo mx-auto" src={logo} alt={name + " logo"} />

                            <FontAwesomeIcon className="close-btn" icon={["far", "times"]} onClick={this.props.close} style={{color}} />
                        </div>
                        <p>
                            {description}
                        </p>
                    </ModalBody>
                    <ModalFooter>
                        {name
                            ? (<OutboundLink className="link" eventLabel={`${name} outbound`} to={link} target="_blank">
                                <FontAwesomeIcon icon={["fas", "browser"]} /> Website
                            </OutboundLink>)
                            : null
                        }
                    </ModalFooter>
                </Modal>
            </div>
        );
    }
}
