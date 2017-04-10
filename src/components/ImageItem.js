import React, { Component } from 'react';

import PropTypes from 'prop-types';

class ImageItem extends Component
{ 
  constructor(props) {
    super(props);
    this.removePhoto = this.removePhoto.bind(this);
    this.goEdit = this.goEdit.bind(this);
  }

  removePhoto () {
    this.props.removePhoto(this.props.photoId);
  }

  goEdit () {
    this.props.goEdit(this.props.photoId);
  }

  render() {
    return (
      <div className="col-sm-6 col-md-4">
        <div className="thumbnail">
          <img src={this.props.imageUrl} alt={this.props.imageTitle} />
          <div className="caption">
            <h3>{this.props.imageTitle}</h3>
          </div>
          <button type="button" className="btn btn-primary" aria-label="Left Align" onClick={this.goEdit}>
            <span className="glyphicon glyphicon-edit" aria-hidden="true"></span>
          </button>
          <button type="button" className="btn btn-danger" aria-label="Left Align" onClick={this.removePhoto}>
            <span className="glyphicon glyphicon-remove" aria-hidden="true"></span>
          </button>
        </div>
      </div>
    );
  }
}

ImageItem.propTypes = {
  removePhoto: PropTypes.func.isRequired,
  photoId: PropTypes.number.isRequired,
  goEdit: PropTypes.func.isRequired
};

export default ImageItem;
