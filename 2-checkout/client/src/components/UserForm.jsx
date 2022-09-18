import React from 'react';
import LocationForm from './LocationForm.jsx';
const axios = require('axios');

class UserForm extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      name: '',
      email: '',
      password: '',
      userClicked: false,
      userId: null
    }

    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleChange(event) {
    event.preventDefault();
    if(event.target.attributes.class.nodeValue === "name") {
      this.setState({name: event.target.value});
    } else if(event.target.attributes.class.nodeValue === "email") {
      this.setState({email: event.target.value});
    } else  {
      this.setState({password: event.target.value});
    }
  }

  handleSubmit(event) {
    event.preventDefault();
    var object = {
      name: this.state.name,
      email: this.state.email,
      password: this.state.password
    };

    axios.post('/user', {object})
    .then((response) => {
      console.log('data sucessfully added', response.data[0].insertId);
      var userId = response.data[0].insertId;
      this.setState({ userClicked: true, userId: userId }, () => { console.log(this.state.userId); });
    })
    .catch((error) => { console.error(error); });

  }

  render() {
    if (this.state.userClicked) {
      return (
        <LocationForm submit={this.props.submit} userId={this.state.userId}/>
      )
    }

    return(
      <form onSubmit={this.handleSubmit}>
        <label>
          Name:
          <input type="text" value={this.state.name} className="name" onChange={this.handleChange}/>
        </label>
        <label>
          E-mail:
          <input type="text" value={this.state.email} className="email" onChange={this.handleChange}/>
        </label>
        <label>
          Password:
          <input type="text" value={this.state.password} className="password" onChange={this.handleChange}/>
        </label>
        <input type="submit" value="Next"/>
      </form>
    )
  }
}

export default UserForm;