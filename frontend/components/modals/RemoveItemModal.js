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

  close() {
    this.setState({
      showEditModal: false,
    });
  }

  open(e) {
    e.preventDefault();
    this.setState({ showEditModal: true });
  }

  onRemove(e) {
    e.preventDefault();
    const removeObj = {
      itemId: this.props.item._id,
      communityId: this.props.communityId,
    };
    this.props.removeItem(removeObj);
    this.close();
  }

  render() {
    return (
      <div>
        <div onClick={(e) => this.open(e)}><Glyphicon glyph="remove"/></div>
        <Modal show={this.state.showEditModal} onHide={() => this.close()}>
          <Modal.Header closeButton>
            <Modal.Title>Remove an item</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <div>
              Would you like to remove {this.props.item.name} from the community doorstep?
            </div>
          </Modal.Body>
          <Modal.Footer>
            <Button onClick={(e) => this.onRemove(e)}>Yes, please!</Button>
            <Button onClick={() => this.close()}>No! Cancel.</Button>
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
