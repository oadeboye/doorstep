import React from 'react';
import Item from '../components/Item';

class Market extends React.Component {
  constructor(props) {
    super(props);
  }
  render() {
    const areThereItems = this.props.community.items;
    return (
      <div className="market">
        <div className="item-list">
          { areThereItems ? this.props.community.items.map((item, index) =>
            <Item key={index} item={item}/>
          ) :
          <p>No Items :(</p>
        }
        </div>
      </div>
    );
  }
}

export default Market;
