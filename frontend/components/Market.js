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
    console.log("COMMUNITY MARKET", this.props.community);
    return (
      <div className="market">
        <div className="item-list">
          { areThereItems ? this.props.community.items.map((item, index) =>
            <Item key={index} item={item} pending={this.props.pending} index={index}/>
          ) :
          <h1 className="loader">Loading...</h1>
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
