import React from 'react';
import Request from './Request';

class RequestsBar extends React.Component {
  constructor(props) {
    super(props);
  }
  render() {
    return (
      <div className="requests-bar">
        <div className="add-request-button">+</div>
        <div className="requests-bar-title">REQUESTS</div>
        <Request />
        <Request />
        <Request />
        <Request />
      </div>
    )
  }
}

export default RequestsBar;