import React from 'react';

class Item extends React.Component {
  constructor(props) {
    super(props);
  }
  render() {
    return (
      <div className="item">
        <div className="img-wrapper">
          <img alt="someImage" src={this.props.item.imgURL || "https://lh3.googleusercontent.com/-_G3XieI-P7Y/AAAAAAAAAAI/AAAAAAAAAEY/AU_AGutjoWQ/s640/photo.jpg"}/>
        </div>
        <div className="item-info">
          <div className="item-title">{this.props.item.name}</div>
          {/* <div className="description">{this.props.item.description}</div> */}
        </div>
      </div>
    )
  }
}

export default Item;
