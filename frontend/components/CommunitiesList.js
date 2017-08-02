import React from 'react';
import Door from './Door';

class CommunitiesList extends React.Component {
  constructor(props) {
    super(props);
  }
  render() {
    return (
      <div className="communities-list">
      <div className="add-community-button">Create One</div>
        <h2>Communities</h2>
        <div className="communities-box">
          <Door />
          <Door />
          <Door />
        </div>
      </div>
    )
  }
}

export default CommunitiesList;