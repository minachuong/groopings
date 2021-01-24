import React from 'react'

function ListContainer(props) {
  return (
    <section>
      <h2 id={props.id}>{props.title}</h2>
      {props.children} 
    </section>
  );
}

export default ListContainer;