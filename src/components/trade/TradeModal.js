import React, {Component} from 'react';
import {NavLink} from 'react-router-dom';
import { Button, Modal, ModalHeader, ModalBody, ModalFooter } from 'reactstrap';

/**
 * props:
 * name- name
 * desc- description
 * offererId- uid of the user making the offer
 */
class TradeModal extends Component {
  constructor(props) {
    super(props);
    this.state = {
      modal: false
    };

    this.toggle = this.toggle.bind(this);
  }

  toggle() {
    this.setState({
      modal: !this.state.modal
    });
  }

  render() {
    return (
      <div>
        <Button color="danger" onClick={this.toggle}>Details</Button>
        <Modal isOpen={this.state.modal} toggle={this.toggle}>
          <ModalHeader toggle={this.toggle}>{this.props.name}</ModalHeader>
          <ModalBody>
            {this.props.desc}
          </ModalBody>
          <ModalFooter>
            <NavLink to={"/personal-chat/" + this.props.offererId} className="btn btn-danger d-inline float-right">Message the offerer</NavLink>
            {/* <Button color="primary" onClick={this.props.goToMessages}>Message the offerer</Button>{' '} */}
            <Button color="secondary" onClick={this.toggle}>Cancel</Button>
          </ModalFooter>
        </Modal>
      </div>
    );
  }
}

export default TradeModal;