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
        </div>
      </div>
    )
  }
}

export default Door;