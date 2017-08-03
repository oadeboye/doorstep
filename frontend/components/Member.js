import React from 'react';

class Member extends React.Component {
  constructor(props) {
    super(props);
  }
  render() {
    return (
      <div className="member">
        <div className="img-wrapper">
          <img src='https://lh3.googleusercontent.com/-_G3XieI-P7Y/AAAAAAAAAAI/AAAAAAAAAEY/AU_AGutjoWQ/s640/photo.jpg' />
        </div>
        <div className="member-info">
          <h3 className="member-name">First Last</h3>
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
    )
  }
}

export default Member;