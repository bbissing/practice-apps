import React from 'react';

class Definition extends React.Component{
  constructor(props) {
    super(props);
    this.state = {
      isTrue: false,
      wordValue: '',
      definitionValue: '',
      removed: false,
      currentWord: this.props.word.word,
      currentDefinition: this.props.word.definition
    };

    //this.handleChange = this.handleChange.bind(this);
    this.handleClick = this.handleClick.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.handleChange = this.handleChange.bind(this);
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
    var filter = {
      word: this.state.currentWord,
      definition: this.state.currentDefinition
    }
    var update = {
      word: this.state.wordValue,
      definition: this.state.definitionValue
    };
    console.log('DefinitionClass.jsx - handleSubmit() - filter/update', filter, update);
    if (update.word === '' || update.definition === '') {
      this.setState({isTrue: false});
    } else {
      this.props.update(filter, update);
      this.setState({currentWord: this.state.wordValue, currentDefinition: this.state.definitionValue, isTrue: false});
    }
  }

  handleClick(event) {
    event.preventDefault();
    console.log(event.target.attributes.value.nodeValue);
    if(event.target.attributes.value.nodeValue === "Edit") {
      this.setState({isTrue: true});
    } else {
      var object = {
        word: this.state.currentWord,
        definition: this.state.currentDefinition
      };
      console.log('DefinitionClass.jsx - handleClick() - delete - object', object);
      this.props.delete(object);
      this.setState({removed: true});
    }
  }

  render() {
    if (this.state.removed) {
      return (
        <div></div>
      )
    } else if (this.state.isTrue) {
      return (
        <form onSubmit={this.handleSubmit}>
          <label>
            Word:
            <input type="text" className="word" value={this.state.wordValue} onChange={this.handleChange}/>
          </label>
          <label>
            Definition:
            <input type="text" className="definition" value={this.state.definitionValue} onChange={this.handleChange}/>
          </label>
          <input type="submit" value="Done"/>
        </form>
      )
    } else {
      return (
      <div>
        <div>{this.state.currentWord}: {this.state.currentDefinition} </div>
        <input type="submit" value="Edit" onClick={this.handleClick}/>
        <input type="submit" value="Delete" onClick={this.handleClick}/>
      </div>
    )
   }
  }
}

export default Definition


// return (
//   <form onSubmit={this.handleSubmit}>
//     <label>
//       Word:
//       <input type="text" className="word" value={this.state.wordValue} onChange={this.handleChange}/>
//     </label>
//     <label>
//       Definition:
//       <input type="text" className="definition" value={this.state.definitionValue} onChange={this.handleChange}/>
//     </label>
//     <input type="submit" value="Submit"/>
//   </form>
// )

// return (
//   <div>
//     <div>{this.props.word.word}: {this.props.word.definition} </div>
//     <input type="submit" value="Done" onClick={this.handleClick}/>
//     <input type="submit" value="Delete" onClick={this.handleClick}/>
//  </div>
// )

