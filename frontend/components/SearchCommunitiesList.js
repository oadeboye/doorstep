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
import { connect } from 'react-redux';
import PropTypes from 'prop-types';

class CommunitiesList extends React.Component {
  constructor(props) {
    super(props);
  }


  render() {
    console.log("BBBOOOo", this.props.communities);
    return (
      <div className="communities-list">
        <h2>Communities</h2>
        <div className="communities-box">
          {this.props.communities.map((com, index) => {
            if (com.users.includes(this.props.user._id)) {
              return (<Door key={index} com={com} isMember={true}/>);
            }
            else {
              return (<Door key={index} com={com} isMember={false}/>);
            }
          })}
        </div>
      </div>
    );
  }
}

CommunitiesList.propTypes = {
  user: PropTypes.object,
  communities: PropTypes.array
};

const mapStateToProps = (state) => {
  return {
    user: state
  };
};

export default connect(
  mapStateToProps
)(CommunitiesList);
