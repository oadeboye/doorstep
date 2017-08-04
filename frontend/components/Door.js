import React from 'react';
import { Link } from 'react-router-dom';

class Door extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      community: this.props.com
    };
  }
  render() {
    console.log("INSIDE THE DOOR", this.props.com);
    return (
      <div className="door">
        <div className="door-inner"></div>
        <div className="door-info">
          <h2>{this.state.community.name ? this.state.community.name :  '7th Street Market'}</h2>
          <p>{this.state.community.description ? this.state.community.description : 'Lorem ipsum something something at 7th street yay'}</p>
        </div>
        <div className="doorknob"></div>
        {
          this.props.fromSearch ?
          <div className="button ask-button">Ask To Join</div>
          :
          <Link to={'/community/profile/' + this.state.community._id}><div className="button join-button">View Market</div></Link>
        }
      </div>
    );
  }
}

export default Door;
