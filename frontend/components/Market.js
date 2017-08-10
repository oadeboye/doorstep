import React from 'react';
import Item from '../components/Item';
import PropTypes from 'prop-types';

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
          <p className="empty-list">No Items :(</p>
        }
        </div>
      </div>
    );
  }
}

Market.propTypes = {
  community: PropTypes.object
};

export default Market;
