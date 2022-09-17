import React from 'react';

class Submit extends React.Component{
  constructor(props) {
    super(props);
    this.state = {
      wordValue: '',
      definitionValue: ''
    };

    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleChange(event) {
    if(event.target.attributes.class.nodeValue === "word") {
      this.setState({wordValue: event.target.value});
    } else {
      this.setState({definitionValue: event.target.value});
    }
  }

  handleSubmit(event) {
    event.preventDefault();
    var object = {
      word: this.state.wordValue,
      definition: this.state.definitionValue
    };
    console.log('Submit.jsx - handleSubmit() - object', object);
    this.props.submit(object);
    this.setState({wordValue: '', definitionValue: ''});
  }

  render() {
    return (
      <div>
      <div>Add a New Word and Definition</div>
      <form onSubmit={this.handleSubmit}>
        <label>
          Word:
          <input type="text" className="word" value={this.state.wordValue} onChange={this.handleChange}/>
        </label>
        <label>
          Definition:
          <input type="text" className="definition" value={this.state.definitionValue} onChange={this.handleChange}/>
        </label>
        <input type="submit" value="Submit"/>
      </form>
      </div>
    )
  }
}

export default Submit