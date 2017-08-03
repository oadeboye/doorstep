import React from 'react';

class Item extends React.Component {
  constructor(props) {
    super(props);
  }
  render() {
    return (
      <div className="item">
        <div className="img-wrapper">
          <img src="https://lh3.googleusercontent.com/-_G3XieI-P7Y/AAAAAAAAAAI/AAAAAAAAAEY/AU_AGutjoWQ/s640/photo.jpg"/>
        </div>
        <div className="item-info">
          <div className="item-title">Item Title</div>
          <div className="description">About the item</div>
        </div>
      </div>
    )
  }
}

export default Item;