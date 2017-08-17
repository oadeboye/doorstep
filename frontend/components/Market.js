import React from 'react';
import Item from '../components/Item';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

class Market extends React.Component {
  constructor(props) {
    super(props);
  }
  render() {
    const marketItems = this.props.community.items.filter((item) => {
      return !(item.owner && (item.owner._id === this.props.user._id));
    });
    const yourItems = this.props.community.items.filter((item) => {
      return (item.owner && (item.owner._id === this.props.user._id));
    });
    const areThereItems = !this.props.pending && this.props.community.items;
    return (
      <div className="market">
        <div className="market-list">
          <h2>Marketplace</h2>
          <div className="item-list">
            {
              marketItems.length > 0 ? marketItems.map((item, index) =>
              <Item key={index} item={item} pending={this.props.pending} index={index}/>)
              :
              <p className="empty-list">No Items Available on the Market</p>
            }
          </div>
        </div>
        <div className="your-list">
          <h2>Items You've Given</h2>
          <div className="item-list">
            {
              yourItems.length > 0 ? yourItems.map((item, index) =>
              <Item key={index} item={item} pending={this.props.pending} index={index}/>)
              :
              <p className="empty-list">No Items Available from You</p>
            }
          </div>
        </div>
      </div>
    );
  }
}

const mapStateToProps = ( state ) => {
  return {
    community: state.currentComm.community,
    pending: state.currentComm.pending,
    user: state.user.user
  };
};

Market.propTypes = {
  pending: PropTypes.bool,
  community: PropTypes.object,
  user: PropTypes.object
};

export default connect(
  mapStateToProps
)(Market);
