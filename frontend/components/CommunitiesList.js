import React from 'react';
import Door from './Door';

class CommunitiesList extends React.Component {
  constructor(props) {
    super(props);
  }
  render() {
    return (
      <div className="communities-list">
      {
        this.props.fromSearch ? 
        (<div className="search">
          <div className="searchbar">
            <input className="search-input"/>
            <div className="search-button">Search</div>
          </div>
          <div className="sortbar">
          </div>
        </div>
        )
        :
        <div className="add-community-button">Create One</div>
      }
        <h2>Communities</h2>
        <div className="communities-box">
          <Door fromSearch={this.props.fromSearch}/>
          <Door fromSearch={this.props.fromSearch}/>
          <Door fromSearch={this.props.fromSearch}/>
        </div>
      </div>
    )
  }
}

export default CommunitiesList;