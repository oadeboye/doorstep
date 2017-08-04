import React from 'react';
import Member from './Member';
import { Modal, Form, FormGroup, ControlLabel, FormControl, Button } from 'react-bootstrap';
import Autosuggest from 'react-autosuggest';
import axios from 'axios';

class MembersList extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      showModal: false,
      users: [],
      value: ''
    };
  }

  componentDidMount() {
    axios.get('http://localhost:3000/api/users')
    .then((resp) => {
      this.setState({users: resp.data.users});
    })
    .catch((err) => console.log('cannot get all users'));
  }

  getSuggestions(value, users) {
    const inputValue = value.trim().toLowerCase();
    const inputLength = inputValue.length;
    // returns an array of matches
    return inputLength === 0 ? [] : users.filter(user =>
      user.slice(0, inputLength) === inputValue
    );
  }


  // When suggestion is clicked, Autosuggest needs to populate the input
  // based on the clicked suggestion. Teach Autosuggest how to calculate the
  // input value for every given suggestion.
  getSuggestionValue(usernames) {
    return usernames.username;
  }

  // Autosuggest will call this function every time you need to update suggestions.
  // You already implemented this logic above, so just use it.
  onSuggestionsFetchRequested({value}) {
    this.setState({
      usernames: this.getSuggestions(value)
    });
  }

  renderSuggestion(usernames) {
    return (
      <div>
        {usernames.username}
      </div>
    );
  }

  // Autosuggest will call this function every time you need to clear suggestions.
  onSuggestionsClearRequested() {
    this.setState({
      usernames: []
    });
  }

  open() {
    this.setState({showModal: true});
  }

  close() {
    this.setState({showModal: false});
  }

  onValueChange(e) {
    this.setState({member: e.target.value});
  }

  render() {
    const value = this.state.value;
    const usernames = this.state.usernames;
    const inputProps = {
      placeholder: 'Type a username',
      value,
      onChange: this.onValueChange
    };
    return (
      <div className="members-list">
        <button onClick={() => this.open()} className="add-members-button">Add members</button>
        <h2>Members</h2>
        <div className="members-box">
          {this.state.users.map((user, index) =>
            <Member key={index} user={user}/>
          )}
        </div>
        <Modal show={this.state.showModal} onHide={() => this.close()}>
          <Modal.Header closeButton>
            <Modal.Title>More neighbors! More fun!</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <Form>
              <FormGroup>
                <ControlLabel>Add memeber</ControlLabel>
                <FormControl
                  type="text"
                  placeholder="Type a username"
                  onChange={(e) => this.onValueChange(e)}
                />
                <Autosuggest
                  suggestions={usernames}
                  onSuggestionsFetchRequested={this.onSuggestionsFetchRequested.bind(this)}
                  onSuggestionsClearRequested={this.onSuggestionsClearRequested.bind(this)}
                  getSuggestionValue={this.getSuggestionValue.bind(this, this.state.usernames)}
                  renderSuggestion={this.renderSuggestion.bind(this)}
                  inputProps={inputProps}
                />
                <Button>Add</Button>
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

export default MembersList;
