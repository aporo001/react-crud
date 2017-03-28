import React, { Component } from 'react';
import ImageItem from './ImageItem';
import Axios from 'axios';

class Home extends Component
{
  constructor(props) {
    super(props);
    this.state = {
      data: [],
    };
    this.goAdd = this.goAdd.bind(this);
    this.removePhoto = this.removePhoto.bind(this);
    this.loadData = this.loadData.bind(this);
    this.goEdit = this.goEdit.bind(this);
  }

  componentWillMount() {
    this.loadData();
  }

  loadData() {
    Axios.get('http://localhost:5000/photos')
      .then(response => {
        this.setState({
          data: response.data
        });
      })
      .catch((error) => {
        console.log(error);
      });
  }

  removePhoto (photoId) {
    if(confirm('Are you sure ?')) {
      Axios.delete('http://localhost:5000/photos/' + photoId)
        .then(() => {
          this.loadData();
        })
        .catch((error) => {
          console.log(error)
        });
    }
  }

  goAdd (e) {
    e.preventDefault();
    this.props.history.push('/add');
  }

  goEdit (photoId) {
    this.props.history.push('/edit/' + photoId);
  }

  render() {
    const listItems = this.state.data.map((item, i) => (
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

export default Home;
