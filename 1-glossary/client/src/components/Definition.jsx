import React from 'react';

function Definition(props) {
  console.log(props);
  return (
    <div>{props.word.word}: {props.word.definition}</div>
  )
}

export default Definition