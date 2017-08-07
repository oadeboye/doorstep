import React from 'react';
import Door from './Door';
import { Modal,
         Form,
         FormGroup,
         Col,
         FormControl,
         ControlLabel,
         Button,
         FieldGroup } from 'react-bootstrap';
import axios from 'axios';
import PropTypes from 'prop-types';

class CommunitiesList extends React.Component {
  constructor(props) {
    super(props);
  }


  render() {
    console.log("BBBOOOo", this.props.communities);
    return (
      <div className="communities-list">
        <div className="search">
          <div className="searchbar">
            <input className="search-input"/>
            <div className="search-button">Search</div>
          </div>
          <div className="sortbar">
          </div>
        </div>
        <h2>Communities</h2>
        <div className="communities-box">
          {this.props.communities.map((com, index) =>
            <Door key={index} com={com} fromSearch/>)}
        </div>
      </div>
    );
  }
}

CommunitiesList.propTypes = {
  user: PropTypes.object,
  communities: PropTypes.array
};

export default CommunitiesList;
