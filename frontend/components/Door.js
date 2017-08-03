import React from 'react';

class Door extends React.Component {
  constructor(props) {
    super(props);
  }
  render() {
    return (
      <div className="door">
        <div className="door-inner"></div>
        <div className="door-info">
          <h2>7th Street</h2>
          <p>Lorem ipsum something something at 7th street yay</p>
        </div>
        <div className="doorknob"></div>
        {
          this.props.fromSearch ? 
          <div className="button ask-button">Ask To Join</div>
          :
          <div className="button join-button">View Market</div>
        } 
      </div>
    )
  }
}

export default Door;