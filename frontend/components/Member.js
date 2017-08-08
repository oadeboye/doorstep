import React from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';

class Member extends React.Component {
  constructor(props) {
    super(props);
  }
  render() {
    return (
      <Link to={'/view/profile/' + this.props.user._id}>
        <div className="member">
          <div className="img-wrapper">
            <img alt="user profile" src={this.props.user.imgURL || 'https://lh3.googleusercontent.com/-_G3XieI-P7Y/AAAAAAAAAAI/AAAAAAAAAEY/AU_AGutjoWQ/s640/photo.jpg'} />
          </div>
          <div className="member-info">
            <h3 className="member-name">{this.props.user.fName + ' ' + this.props.user.lName}</h3>
            <div className="stats-box">
              <div className="stat">
                <h1>4</h1>
                <h3>Given</h3>
              </div>
              <div className="stat">
                <h1>4</h1>
                <h3>Given</h3>
              </div>
              <div className="stat">
                <h1>4</h1>
                <h3>Given</h3>
              </div>
            </div>
          </div>
        </div>
      </Link>
    );
  }
}

Member.propTypes = {
  user: PropTypes.object,
};

export default Member;
