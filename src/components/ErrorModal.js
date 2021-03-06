import React, { Component } from "react";
// import Glyphicon from "react-bootstrap/lib/Glyphicon";
import Modal from "react-bootstrap-modal";
// var Modal = require('react-bootstrap-modal')

/**
 *
 * Renders a Error modal if app encounter any error.
 */

export default class ErrorModal extends Component {

// const Modal = ReactBootstrap.Modal;

  state = {};
  render() {
    return (
      <Modal show={this.props.show}>
        <Modal.Header>
          <Modal.Title>Error</Modal.Title>
        </Modal.Header>

        <Modal.Body>
          <h1 className="text-center">
            {/* <Glyphicon glyph="alert" /> */}
          </h1>
          <h5 className="text-center">{this.props.errorMessage}</h5>
        </Modal.Body>
      </Modal>
    );
  }
}
