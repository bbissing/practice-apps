import React from 'react';
import Definitions from './Definitions.jsx';
import Submit from './Submit.jsx';
import SearchBar from './SearchBar.jsx';
const data = require('../../../dictionary/data.json');
const axios = require('axios');

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      data: null,
      searchedTerm: null
    };

    this.submit = this.submit.bind(this);
    this.seed = this.seed.bind(this);
    this.update = this.update.bind(this);
    this.search = this.search.bind(this);
  }

  search(word) {
   console.log('App.jsx - search()');
   console.log('word', word);
   this.setState({searchedTerm: word});
  }

  submit(object) {
      axios.post('/glossary', {object})
      .then((response) => {
        console.log('App.jsx - submit() - axios.post()', response);
        this.seed();
      })
      .catch((error) => { console.error(error); });
  }

  seed() {
    console.log('App.jsx - seed()');
    axios.get('/glossary')
      .then((response) => {
        console.log('App.jsx - seed() - axios.get()', response);
        this.setState({ data: response });
      })
      .catch((error) => { console.error(error); });
  }

  update(filter, update){
    console.log('App.jsx - update()');
    axios.post('/update', {filter, update})
      .then((response) => {
        console.log('App.jsx - update() - axios.post()', response);
      })
      .catch((error) => { console.error(error); });
  }

  delete(object){
    console.log('App.jsx - delete()');
    axios.post('/delete', {object})
      .then((response) => {
        console.log('App.jsx - delete() - axios.post()', response);
      })
      .catch((error) => { console.error(error); });
  }

  render() {
    if (!this.state.data) {
      this.seed();
      return (
        <div>
          <div></div>
        </div>
      )
    } else {
      console.log(this.state.data);
      return(
        <div>
          <div><SearchBar search={this.search}/></div>
          <div><Submit submit={this.submit}/></div>
          <div><Definitions wordList={this.state.data} update={this.update} delete={this.delete} searched={this.state.searchedTerm}/></div>
        </div>
      )
    }
  }
};

export default App;


    // axios.post('/glossary', {data})
    //   .then((response) => {
    //     console.log('App.jsx - in seed()', response);
    //     this.setState({ data: response });
    //   })
    //   .catch((error) => {
    //     console.error(error);
    //   });