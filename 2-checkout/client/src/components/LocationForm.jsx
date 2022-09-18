import React from 'react';
import PaymentForm from './PaymentForm.jsx';
const axios = require('axios');

class LocationForm extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      address1: '',
      address2: '',
      city: '',
      state: '',
      zip: '',
      phone: '',
      user_id: this.props.userId,
      userClicked: false
    }

    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleChange(event) {
    event.preventDefault();
    if(event.target.attributes.class.nodeValue === "address1") {
      this.setState({address1: event.target.value});
    } else if(event.target.attributes.class.nodeValue === "address2") {
      this.setState({address2: event.target.value});
    } else if (event.target.attributes.class.nodeValue === "city"){
      this.setState({city: event.target.value});
    } else if(event.target.attributes.class.nodeValue === "state") {
      this.setState({state: event.target.value});
    } else if(event.target.attributes.class.nodeValue === "zip") {
      this.setState({zip: event.target.value});
    } else  {
      this.setState({phone: event.target.value});
    }
  }

  handleSubmit(event) {
    event.preventDefault();
    var object = {
      address1: this.state.address1,
      address2: this.state.address2,
      city: this.state.city,
      state: this.state.state,
      zip: this.state.zip,
      phone: this.state.phone,
      user_id: this.state.user_id
    };

    axios.post('/location', {object})
    .then((response) => {
      console.log(response);
    })
    .catch((error) => { console.error(error); });
    this.setState({ userClicked: true });
  }

  render() {
    if (this.state.userClicked) {
      return (
        <PaymentForm userId={this.state.user_id}/>
      )
    }

    return(
      <form onSubmit={this.handleSubmit}>
        <label>
          Address:
          <input type="text" value={this.state.address1} className="address1" onChange={this.handleChange}/>
        </label>
        <label>
          Apartment, suite, etc:
          <input type="text" value={this.state.address2} className="address2" onChange={this.handleChange}/>
        </label>
        <label>
          City:
          <input type="text" value={this.state.city} className="city" onChange={this.handleChange}/>
        </label>
        <label>
          State:
          <input type="text" value={this.state.state} className="state" onChange={this.handleChange}/>
        </label>
        <label>
          Zip:
          <input type="text" value={this.state.zip} className="zip" onChange={this.handleChange}/>
        </label>
        <label>
          Phone:
          <input type="text" value={this.state.phone} className="phone" onChange={this.handleChange}/>
        </label>
        <input type="submit" value="Next"/>
      </form>
    )
  }
}

export default LocationForm;