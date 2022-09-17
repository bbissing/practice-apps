import React from 'react';
import Definition from './Definition.jsx';
import DefinitionClass from './DefinitionClass.jsx';

function Definitions(props) {
  console.log('in Definitions.jsx - searchedTerm', props.searched);
  if (props.searched) {
    return props.wordList.data.map(word => {
      console.log('in Definitions.jsx - searchedTerm - in map - currentWord', word);
      console.log('in Definitions.jsx - searchedTerm - in map - searchedTerm', props.searched);
      if (word.word === props.searched) {
        return (
          <DefinitionClass key={word._id} word={word} update={props.update} delete={props.delete}/>
        )
      }
    })
  } else return props.wordList.data.map(word => {
    return (
      <DefinitionClass key={word._id} word={word} update={props.update} delete={props.delete}/>
    )
  })
}

export default Definitions