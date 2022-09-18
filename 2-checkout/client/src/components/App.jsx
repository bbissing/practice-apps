import React from 'react';
import UserForm from './UserForm.jsx';

class App extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      userClicked: false
    }

    this.handleClick = this.handleClick.bind(this);
  }

  handleClick(e) {
    e.preventDefault();
    this.setState({userClicked: true});
  }

  render() {
    if (this.state.userClicked) {
      return (
        <UserForm />
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