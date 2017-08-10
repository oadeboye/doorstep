import React from 'react';
import PropTypes from 'prop-types';
import RemoveItemModal from './modals/RemoveItemModal';

import { connect } from 'react-redux';

class Item extends React.Component {
  constructor(props) {
    super(props);
  }
  render() {
    const verify = !this.props.pending && this.props.item.owner && (this.props.owner === JSON.parse(JSON.stringify(this.props.item.owner._id)));
    return (
      <div className="item">
        <div className="img-wrapper">
          <img alt="someImage" src={this.props.item.imgURL || "https://lh3.googleusercontent.com/-_G3XieI-P7Y/AAAAAAAAAAI/AAAAAAAAAEY/AU_AGutjoWQ/s640/photo.jpg"}/>
        </div>
        <div className="item-info">
          <div className="item-title">
            {this.props.item.name}
            { verify ?
              <RemoveItemModal item={this.props.item}/>
              :
              <p>Take</p>
            }
          </div>
          {/* <div className="description">{this.props.item.description}</div> */}
        </div>
      </div>
    );
  }
}

Item.propTypes = {
  item: PropTypes.object,
  owner: PropTypes.string,
  pending: PropTypes.bool,
  index: PropTypes.number
};

const mapStateToProps = ( state, ownProps ) => {
  return {
    owner: state.user.user._id,
    pending: ownProps.pending,
    item: ownProps.item,
    index: ownProps.index
  };
};

export default connect(
  mapStateToProps
)(Item);
