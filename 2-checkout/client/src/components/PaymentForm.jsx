import React from 'react';
import Summary from './Summary.jsx';
const axios = require('axios');

class PaymentForm extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      credit_card_number: '',
      expiry_date: '',
      zip: '',
      cvv: '',
      user_id: this.props.userId,
      userClicked: false
    }

    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleChange(event) {
    event.preventDefault();
    if(event.target.attributes.class.nodeValue === "creditCardNumber") {
      this.setState({credit_card_number: event.target.value});
    } else if(event.target.attributes.class.nodeValue === "expiryDate") {
      this.setState({expiry_date: event.target.value});
    } else if (event.target.attributes.class.nodeValue === "cvv"){
      this.setState({cvv: event.target.value});
    } else {
      this.setState({zip: event.target.value});
    }
  }

  handleSubmit(event) {
    event.preventDefault();
    var object = {
      credit_card_number: this.state.credit_card_number,
      expiry_date: this.state.expiry_date,
      zip: this.state.zip,
      cvv: this.state.cvv,
      user_id: this.props.userId,
    };

    console.log(object.user_id);

    axios.post('/payment', {object})
    .then((response) => {
      console.log(response);
    })
    .catch((error) => { console.error(error); });

    this.setState({ userClicked: true });
  }

  render() {
    if (this.state.userClicked) {
      return (
        <Summary user_id={this.state.user_id}/>
      )
    }

    return(
      <form onSubmit={this.handleSubmit}>
        <label>
          Credit Card Number:
          <input type="text" value={this.state.credit_card_number} className="creditCardNumber" onChange={this.handleChange}/>
        </label>
        <label>
          Expiration:
          <input type="text" value={this.state.expiry_date} className="expiryDate" onChange={this.handleChange}/>
        </label>
        <label>
          CVV:
          <input type="text" value={this.state.cvv} className="cvv" onChange={this.handleChange}/>
        </label>
        <label>
          Zip:
          <input type="text" value={this.state.zip} className="zipCard" onChange={this.handleChange}/>
        </label>
        <input type="submit" value="Next"/>
      </form>
    )
  }
}

export default PaymentForm;