import React from 'react';
import { connect } from 'react-redux';
import axios from 'axios';
import PropTypes from 'prop-types';
import { Modal,
         Button,
         FieldGroup,
         FormGroup,
         Col,
         ControlLabel,
         FormControl,
         HelpBlock,
         InputGroup,
         Form,
         Input,
         Glyphicon } from 'react-bootstrap';

import { removeItem } from '../../actions/removeItem';

class RemoveItemModal extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      showEditModal: false,
    };
  }

  closeEdit() {
    this.setState({
      showEditModal: false,
    });
  }

  openEdit(e) {
    e.preventDefault();
    this.setState({ showEditModal: true });
  }

  onRemove(e) {
    e.preventDefault();
    const removeObj = {
      itemId: this.props.item._id,
      communityId: this.props.communityId,
    };
    console.log("REMOVING", this.props.item);
    this.props.removeItem(removeObj);
    this.closeEdit();
  }

  render() {
    return (
      <div>
        <div onClick={(e) => this.openEdit(e)}><Glyphicon glyph="remove"/></div>
        <Modal show={this.state.showEditModal} onHide={() => this.closeEdit()}>
          <Modal.Header closeButton>
            <Modal.Title>Remove an item</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <div>
              Would you like to remove {this.props.item.name} from the community?
            </div>
          </Modal.Body>
          <Modal.Footer>
            <Button onClick={(e) => this.onRemove(e)}>Yes, please!</Button>
            <Button onClick={() => this.closeEdit()}>No! Cancel.</Button>
          </Modal.Footer>
        </Modal>
      </div>
    );
  }
}

const mapStateToProps = ( state, ownProps ) => {
  return {
    item: ownProps.item,
    communityId: state.currentComm.community._id,
    pending: state.currentComm.pending,
    user: state.user.user
  };
};

const mapDispatchToProps = ( dispatch ) => {
  return {
    removeItem: (removeObj) => {
      dispatch(removeItem(removeObj));
    }
  };
};

RemoveItemModal.propTypes = {
  item: PropTypes.object,
  communityId: PropTypes.string,
  removeItem: PropTypes.func,
  pending: PropTypes.bool,
  user: PropTypes.object
};

export default connect(
  mapStateToProps, mapDispatchToProps
)(RemoveItemModal);
