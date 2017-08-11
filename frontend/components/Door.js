import React from 'react';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';
import axios from 'axios';
import { connect } from 'react-redux';


class Door extends React.Component {
  constructor(props) {
    super(props);
  }

  sendEmail() {
    axios.post('/mail/send-email', {
      user: this.props.user,
      community: this.props.com
    })
    .then(response => {
      if (response.data.success) {
        console.log("SUCCESS FRONT END SENDING MAIL");
        alert('Email successfully sent!');
      } else {
        console.log("FAILURE FRONT END SENDING MAIL", response.data.error);
        alert('Email failed to send!');
      }
    });
  }
  render() {
    const profileUrl = '/community/profile/' + this.props.com._id;
    return (
      <div className="door">
        <div className="door-inner"></div>
        <div className="door-info">
          <h2>{this.props.com.name ? this.props.com.name :  '7th Street Market'}</h2>
          <p>{this.props.com.description ? this.props.com.description : 'Lorem ipsum something something at 7th street yay'}</p>
        </div>
        <div className="doorknob"></div>
        {
          this.props.isMember ?
          <Link to={profileUrl}><div className="button join-button">View Market</div></Link>
          :
          <div className="button ask-button" onClick={() => this.sendEmail()}>Ask To Join</div>
        }
      </div>
    );
  }
}

Door.propTypes = {
  user: PropTypes.object,
  com: PropTypes.object,
  isMember: PropTypes.bool
};

const mapStateToProps = (state, ownProps) => {
  return {
    user: state.user.user,
    com: ownProps.com,
  };
};

export default connect(
  mapStateToProps
)(Door);
