import React, { Component } from 'react';
import { connect } from 'react-redux';
import ImageItem from './ImageItem';
import { loadData, removeData } from '../actions/Photos';
import { push } from 'react-router-redux'
 
const mapDispatchToProps = (dispatch) => {
  return {
    loadData: () => {
      dispatch(loadData())
    },
    removeData: (id) => {
      dispatch(removeData(id))
    },
    goAdd: () => {
      dispatch(push('/add'))
    },
    goEdit: (photoId) => {
      dispatch(push('/edit/' + photoId))
    }
  }
}

const mapStateToProps = (state) => {
  return {
    data: state.photos
  }
}

class Home extends Component
{
  constructor(props) {
    super(props);
    this.removePhoto = this.removePhoto.bind(this);
    this.loadData = this.loadData.bind(this);
    this.goAdd = this.goAdd.bind(this);
    this.goEdit = this.goEdit.bind(this);
  }

  componentWillMount() {
    this.loadData();
  }

  shouldComponentUpdate(nextProps, nextState) {
    return this.props.data !== nextProps.data;
  }
  
  loadData() {
    this.props.loadData();
  }

  removePhoto (photoId) {
    if(confirm('Are you sure ?')) {
      this.props.removeData(photoId);
    }
  }

  goAdd (e) {
    e.preventDefault();
    this.props.goAdd();
  }

  goEdit (photoId) {
    this.props.goEdit(photoId);
  }

  render() {
    const listItems = this.props.data.map((item, i) => (
      <ImageItem imageUrl={item.url} imageTitle={item.title} key={i} photoId={item.id} removePhoto={this.removePhoto} goEdit={this.goEdit}/>
    ));

    return (
      <div>
        <h1>Home</h1>
        <button type="button" className="btn btn-default btn-lg glyphicon-plus" onClick={this.goAdd} />
        <br />
        <br />
        { listItems.length > 0 ? listItems : 'loading' }
      </div>
    );
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(Home);
