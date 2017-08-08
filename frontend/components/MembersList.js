import React from 'react';
import Member from './Member';
import { Modal, Form, FormGroup, ControlLabel, FormControl, Button } from 'react-bootstrap';
import Autosuggest from 'react-autosuggest';
import axios from 'axios';
import PropTypes from 'prop-types';
<<<<<<< HEAD
import { connect } from 'react-redux';
import { getAllUsers } from '../actions/getAllUsers';
import { addUser } from '../actions/addUser';
import { getCommUsers } from '../actions/getCommUsers';
=======
import domain from '../domain';
>>>>>>> 7ac53d635769abf328907279f9576303fe3e3e93

class MembersList extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      showModal: false,
      usernames: [],
      suggestions: [],
      value: ''
    };
  }

  componentDidMount() {
    // axios.get('http://localhost:3000/api/users')
    // .then((resp) => {
    //   var usernames = resp.data.users.map((user) => user.username);
    //   this.setState({usernames: usernames, users: resp.data.users});
    // })
    // .catch((err) => ('cannot get all users'));
    // ('MEMBERSLIST', this.props.commId);
    this.props.getCommUsersDispatch(this.props.commId);
    this.props.getAllUsersDispatch();
    // ('USERNAMEs', this.state.usernames);
  }

  componentWillReceiveProps(props) {
    // this.setState({communityId: props.communityId});
  }

  escapeRegexCharacters(str) {
    return str.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
  }

  // When suggestion is clicked, Autosuggest needs to populate the input
  // based on the clicked suggestion. Teach Autosuggest how to calculate the
  // input value for every given suggestion.
  getSuggestionValue(suggestion) {
    return suggestion.username;
  }

  getSuggestions(value) {
    const inputValue = value.trim().toLowerCase();
    const inputLength = inputValue.length;
    // returns an array of matches
    ('USER LIST', this.props.allUsers);
    var usernames = this.props.allUsers.map(user => user.username);
    return inputLength === 0 ? [] : usernames.filter(user =>
      user.slice(0, inputLength) === inputValue
    );
  }

  renderSuggestion(suggestion) {
    return (
      <div>
        {suggestion}
      </div>
    );
  }

  // Autosuggest will call this function every time you need to update suggestions.
  // You already implemented this logic above, so just use it.
  onSuggestionsFetchRequested({value}) {
    this.setState({
      suggestions: this.getSuggestions(value)
    });
  }

  // Autosuggest will call this function every time you need to clear suggestions.
  onSuggestionsClearRequested() {
    this.setState({
      suggestions: []
    });
  }

  open() {
    this.setState({showModal: true});
  }

  close() {
    this.setState({showModal: false});
  }

  onValueChange(e) {
    var newValue = e.target.value || e.currentTarget.textContent;
    this.setState({value: newValue});
  }

  onAdd(e) {
    e.preventDefault();
    const username = this.input.input.defaultValue;
    const communityId = this.props.commId;
    this.props.addUserDispatch(username, communityId);
    this.close();
    this.setState({value: ''});
  }

  render() {
    // ('ALL USERS', this.props.allUsers);
    const value = this.state.value;
    const usernames = this.state.usernames;
    const suggestions = this.state.suggestions;
    const inputProps = {
      placeholder: 'Type a username',
      value,
      onChange: this.onValueChange.bind(this)
    };
    // if (usernames) {
      return (
        <div className="members-list">
          <button onClick={() => this.open()} className="add-members-button">Add members</button>
          <h2>Members</h2>
          <div className="members-box">
            {
              this.props.commUsers.pending ? <h1>Loading users...</h1> :
            <div>
              {
                this.props.commUsers.commUsers.map((user, index) =>
                <Member key={index} user={user}/>)
              }
            </div>
            }
          </div>
          <Modal show={this.state.showModal} onHide={() => this.close()}>
            <Modal.Header closeButton>
              <Modal.Title>More neighbors! More fun!</Modal.Title>
            </Modal.Header>
            <Modal.Body>
              <Form>
                <FormGroup>
                  <ControlLabel>Add members</ControlLabel>
                  <Autosuggest
                    ref={(input) => {this.input = input;}}
                    suggestions={suggestions}
                    onSuggestionsFetchRequested={this.onSuggestionsFetchRequested.bind(this)}
                    onSuggestionsClearRequested={this.onSuggestionsClearRequested.bind(this)}
                    getSuggestionValue={this.getSuggestionValue.bind(this)}
                    renderSuggestion={this.renderSuggestion.bind(this)}
                    inputProps={inputProps}
                  />
                  <Button onClick={(e) => this.onAdd(e)}>Add</Button>
                </FormGroup>
              </Form>
            </Modal.Body>
            <Modal.Footer>
              <Button onClick={() => this.close()}>Cancel</Button>
            </Modal.Footer>
          </Modal>
        </div>
    );
  }
}

MembersList.propTypes = {
  commId: PropTypes.string,
  getAllUsersDispatch: PropTypes.func,
  addUserDispatch: PropTypes.func,
  allUsers: PropTypes.array,
  getCommUsersDispatch: PropTypes.func,
  commUsers: PropTypes.object
};

const mapStateToProps = (state, ownProps) => {
  return {
    allUsers: state.allUsers.users,
    commId: ownProps.commId,
    commUsers: state.commUsers
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    getAllUsersDispatch: () => dispatch(getAllUsers()),
    addUserDispatch: (username, communityId) => dispatch(addUser(username, communityId)),
    getCommUsersDispatch: (commId) => dispatch(getCommUsers(commId))
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(MembersList);
