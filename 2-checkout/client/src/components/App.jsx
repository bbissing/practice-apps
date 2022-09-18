import React from 'react';
import UserForm from './UserForm.jsx';
const axios = require('axios');

class App extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      userClicked: false
    }

    this.handleClick = this.handleClick.bind(this);
    this.submit = this.submit.bind(this);
  }

  submit(object) {
    console.log('App.jsx - submit()');
    axios.post('/user', {object})
    .then((response) => {
      console.log('data sucessfully added', response);
    })
    .catch((error) => { console.error(error); });
  }

  handleClick(e) {
    e.preventDefault();
    this.setState({userClicked: true});
  }

  render() {
    if (this.state.userClicked) {
      return (
        <UserForm submit={this.submit}/>
      )
    }

    return(
      <div>
        <button className="checkout" onClick={this.handleClick}>Checkout</button>
      </div>
    )
  }
}

export default App