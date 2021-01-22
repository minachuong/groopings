import React from 'react'
import './ListContainer.css'

function ListContainer(props) {
  return (
    <div className="list-container">
      <h2 className="list-title">{props.title}</h2>
      <div className="list-grooping">
        {props.children} 
      </div>
    </div>
  );
}

export default ListContainer;