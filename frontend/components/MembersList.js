import React from 'react';
import Member from './Member';

class MembersList extends React.Component {
  constructor(props) {
    super(props);
  }
  render() {
    return (
      <div className="members-list">
        <div className="add-members-button">Add members</div>
        <h2>Members</h2>
        <div className="members-box">
          <Member />
          <Member />
          <Member />
          <Member />
          <Member />
        </div>
      </div>
    )
  }
}

export default MembersList;