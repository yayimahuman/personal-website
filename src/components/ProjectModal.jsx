import React, { Component } from 'react';
import { Button, Modal, ModalHeader, ModalBody, ModalFooter } from 'reactstrap';

export default class ProjectModal extends React.Component {
    constructor(props) {
        super(props);
    }

    render() {
        const isOpen = this.props.activeProject;
        const name = this.props.activeProject;
        const {color, backgroundColor, logo, description, link} = this.props;
        console.log(this.props);
        return (
            <div>
                <Modal isOpen={isOpen} toggle={this.props.close} className={this.props.className}>
                    <ModalHeader toggle={this.props.close}>{name}</ModalHeader>
                    <ModalBody>
                        {description}
                    </ModalBody>
                    <ModalFooter>
                        <a className="btn btn-primary" href={link} target="_blank">Website</a>{' '}
                        <Button color="secondary" onClick={this.props.close}>Close</Button>
                    </ModalFooter>
                </Modal>
            </div>
        );
    }
}
