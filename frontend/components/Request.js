import React from 'react';
import PropTypes from 'prop-types';

class Request extends React.Component {
  constructor(props) {
    super(props);
  }
  render() {
    return (
      <div className="request">
        <div className="request-title">{this.props.request.text}</div>
      </div>
    );
  }
}

Request.propTypes = {
  request: PropTypes.string
};

export default Request;
