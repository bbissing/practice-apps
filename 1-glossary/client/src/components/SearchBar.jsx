import React from 'react';

class SearchBar extends React.Component{
  constructor(props) {
    super(props);
    this.state = {
      value: '',
    };
    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleChange(event) {
    this.setState({value: event.target.value}, () => { if(this.state.value === '') { this.props.search(null); } });
  }

  handleSubmit(event) {
    event.preventDefault();
    var word = this.state.value;
    this.props.search(word);
  }

  render() {
    return (
      <form onSubmit={this.handleSubmit}>
        <label>
          Glossary Search:
          <input type="text" value={this.state.value} onChange={this.handleChange}/>
        </label>
        <input type="submit" value="Search"/>
      </form>
    )
  }
}

export default SearchBar