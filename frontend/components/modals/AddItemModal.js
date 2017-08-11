import React from 'react';
import { Modal,
         Form,
         FormGroup,
         Col,
         FormControl,
         ControlLabel,
         Button,
         FieldGroup } from 'react-bootstrap';
import PropTypes from 'prop-types';
import axios from 'axios';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import { addItem } from '../../actions/addItem';

class AddItemModal extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      showModal: false,
      itemName: '',
      imgURL: ''
    };
  }

  open(e) {
    e.preventDefault();
    this.setState({showModal: true});
  }

  close() {
    this.setState({showModal: false});
  }

  onItemNameChange(e) {
    this.setState({itemName: e.target.value});
  }

  onImgUrlChange(e) {
    this.setState({imgURL: e.target.value});
  }

  onCreate(e, itemName, imgURL) {
    e.preventDefault();
    const itemObj = {
      name: this.state.itemName,
      imgURL: this.state.imgURL,
      owner: this.props.user._id,
      communityId: this.props.community._id
    };
    this.props.addItem(itemObj);
    this.close();
  }

  render() {
    return (
      <div>
        <div onClick={(e) => this.open(e)} className="add-community-button">Give an item!</div>
        <Modal show={this.state.showModal} onHide={() => this.close()}>
          <Modal.Header closeButton>
            <Modal.Title>Add a new item!</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <Form>
              <FormGroup>
                <ControlLabel>Item name</ControlLabel>
                <FormControl
                  type="text"
                  placeholder="Enter item name"
                  onChange={(e) => this.onItemNameChange(e)}
                />
              </FormGroup>
              <FormGroup>
                <ControlLabel>Image URL</ControlLabel>
                <FormControl
                  type="text"
                  placeholder="Enter a url for the image"
                  onChange={(e) => this.onImgUrlChange(e)}
                />
              </FormGroup>
            </Form>
          </Modal.Body>
          <Modal.Footer>
            <Button onClick={(e, itemName, imgURL) => this.onCreate(e, itemName, imgURL)}>Add Item to the community</Button>
            <Button onClick={() => this.close()}>Cancel</Button>
          </Modal.Footer>
        </Modal>
      </div>
    );
  }
}

AddItemModal.propTypes = {
  user: PropTypes.object,
  addItem: PropTypes.func,
  community: PropTypes.object
};

const mapStateToProps = (state) => {
  return {
    user: state.user.user,
    community: state.currentComm.community
  };
};
const mapDispatchToProps = (dispatch) => {
  return {
    addItem: (itemObj) => {
      dispatch(addItem(itemObj));
    }
  };
};


export default connect(
  mapStateToProps, mapDispatchToProps
)(AddItemModal);
