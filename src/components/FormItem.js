import React, { Component } from 'react';
import Axios from 'axios';

class componentName extends Component {
  constructor(props) {
    super(props);
    this.state = {
      title: '',
      thumbnailUrl: '',
      url: ''
    };

    this.handleInputChange = this.handleInputChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.loadDataById = this.loadDataById.bind(this);
  }

  componentWillMount() {
    if(typeof this.props.match.params.id !== 'undefined') {
      this.loadDataById(this.props.match.params.id);
    }
  }
  
  loadDataById (id) {
    Axios.get('http://localhost:5000/photos/' + id)
      .then(response => { 
        return response.data
      }).then(res => {
        this.setState({
          id: res.id,
          title: res.title,
          thumbnailUrl: res.thumbnailUrl,
          url: res.url
        });
      })
  }

  handleInputChange(event) {
    const target = event.target;
    const value = target.type === 'checkbox' ? target.checked : target.value;
    const name = target.name;

    this.setState({
      [name]: value
    });
  }
  
  handleSubmit(event) {
    event.preventDefault();
    var id = this.state.id;
    if(typeof id!== 'undefined') {
      Axios.put('http://localhost:5000/photos/' + id, {
        title: this.state.title,
        thumbnailUrl: this.state.thumbnailUrl,
        url: this.state.url
      }).then(() => {
        this.props.history.replace('/');
      }).catch(error => {
        console.log(error);
      });
    } else {
      Axios.post('http://localhost:5000/photos', {
        title: this.state.title,
        thumbnailUrl: this.state.thumbnailUrl,
        url: this.state.url
      }).then(() => {
        this.props.history.replace('/');
      }).catch(error => {
        console.log(error);
      });
    }
    
  }

  render() {
    return (
      <form className="form-horizontal" onSubmit={this.handleSubmit} >
        <fieldset>
          {/* Form Name */}
          <legend><h1>Photos</h1></legend>
          {/* Text input*/}
          <div className="form-group">
            <label className="col-md-4 control-label" htmlFor="title">Title</label>
            <div className="col-md-4">
              <input id="title" name="title" type="text" placeholder="title" className="form-control input-md" value={this.state.title}  onChange={this.handleInputChange} required/>
            </div>
          </div>
          {/* Text input*/}
          <div className="form-group">
            <label className="col-md-4 control-label" htmlFor="thumbnailUrl">Thumbnail URL</label>
            <div className="col-md-4">
              <input id="thumbnailUrl" name="thumbnailUrl" type="text" placeholder="thumbnail url" className="form-control input-md" value={this.state.thumbnailUrl}  onChange={this.handleInputChange}  required />
            </div>
          </div>
          {/* Text input*/}
          <div className="form-group">
            <label className="col-md-4 control-label" htmlFor="url">URL</label>
            <div className="col-md-4">
              <input id="url" name="url" type="text" placeholder="url" className="form-control input-md" value={this.state.url} onChange={this.handleInputChange}  required/>
            </div>
          </div>
          {/* Button (Double) */}
          <div className="form-group">
            <label className="col-md-4 control-label" htmlFor="save" />
            <div className="col-md-8">
              <button id="save" name="save" className="btn btn-success">Save</button>
              <button id="cancel" name="cancel" className="btn btn-danger" >Cancel</button>
            </div>
          </div>
        </fieldset>
      </form>
    );
  }
}

export default componentName;