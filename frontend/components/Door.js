import React from 'react';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';

class Door extends React.Component {
  constructor(props) {
    super(props);
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
          <div className="button ask-button">Ask To Join</div>
        }
      </div>
    );
  }
}

Door.propTypes = {
  com: PropTypes.object
};

export default Door;
