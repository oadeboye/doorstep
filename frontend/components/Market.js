import React from 'react';
import Item from '../components/Item';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

class Market extends React.Component {
  constructor(props) {
    super(props);
  }
  render() {
    const areThereItems = !this.props.pending && this.props.community.items;
    return (
      <div className="market">
        <div className="item-list">
          { areThereItems ? this.props.community.items.map((item, index) =>
            <Item key={index} item={item} pending={this.props.pending} index={index}/>
          ) :
          <p className="empty-list">No Items :(</p>
        }
        </div>
      </div>
    );
  }
}

const mapStateToProps = ( state ) => {
  return {
    community: state.currentComm.community,
    pending: state.currentComm.pending
  };
};

Market.propTypes = {
  pending: PropTypes.bool,
  community: PropTypes.object,
};

export default connect(
  mapStateToProps
)(Market);
