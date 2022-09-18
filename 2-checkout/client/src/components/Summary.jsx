import React from 'react';
import App from './App.jsx';
const axios = require('axios');

class Summary extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      name: '',
      email: '',
      password: '',
      address1: '',
      address2: '',
      city: '',
      state: '',
      zip: '',
      phone: '',
      credit_card_number: '',
      expiry_date: '',
      zipCard: '',
      cvv: '',
      user_id: this.props.userId,
      userClicked: false
    }

    this.retrieve = this.retrieve.bind(this);
    this.handleClick = this.handleClick.bind(this);
  }

  handleClick(event) {
    event.preventDefault();
    this.setState({userClicked: true});
  }

  retrieve() {
    console.log('Summary.jsx/retrieve()');
    axios.get('/summary')
    .then((response) => {
      var userForm = response.data[0][0][0];
      var locationForm = response.data[1][0][0];
      var paymentForm = response.data[2][0][0];
      var date = paymentForm.expiry_date.slice(0, 10);
      console.log(userForm, locationForm, paymentForm, date);
      this.setState({
        name: userForm.name,
        email: userForm.email,
        password: userForm.password,
        address1: locationForm.address1,
        address2: locationForm.address2,
        city: locationForm.city,
        state: locationForm.state,
        zip: locationForm.zip,
        phone: locationForm.phone,
        credit_card_number: paymentForm.credit_card_number,
        expiry_date: date,
        zipCard: paymentForm.zip,
        cvv: paymentForm.cvv},
        () => {console.log(this.state);
      });
    })
    .catch((error) => { console.error(error); });
  }

  componentDidMount() {
    this.retrieve();
  }

  render() {
    if (this.state.userClicked) {
      return (
        <App />
      )
    }

    return(
      <div>
        <div>Summary: </div>
        <div>name: {this.state.name}</div>
        <div>email: {this.state.email}</div>
        <div>password: {this.state.password}</div>
        <div>address1: {this.state.address1}</div>
        <div>address2: {this.state.address2}</div>
        <div>city: {this.state.city}</div>
        <div>state: {this.state.state}</div>
        <div>zip: {this.state.zip}</div>
        <div>phone: {this.state.phone}</div>
        <div>credit_card_number: {this.state.credit_card_number}</div>
        <div>expiry_date: {this.state.expiry_date}</div>
        <div>zipCard: {this.state.zipCard}</div>
        <div>cvv: {this.state.cvv}</div>
        <button onClick={this.handleClick}>Purchase</button>
      </div>
    )
  }
}

export default Summary;