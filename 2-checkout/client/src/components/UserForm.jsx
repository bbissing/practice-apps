import React from 'react';

class UserForm extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      name: '',
      email: '',
      password: '',
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

    this.props.submit(object);
  }

  render() {
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