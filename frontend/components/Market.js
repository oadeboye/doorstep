import React from 'react';
import Item from '../components/Item';

class Market extends React.Component {
  constructor(props) {
    super(props);
  }
  render() {
    return (
      <div className="market">
        <div className="item-list">
          <Item />
          <Item />
          <Item />
          <Item />
          <Item />
          
        </div>
      </div>
    )
  }
}

export default Market;