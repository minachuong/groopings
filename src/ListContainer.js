import React from 'react'
import './ListContainer.css'

function ListContainer(props) {
  return (
    <div className="list-container">
      <div className="list-title">{props.title}</div>
      <div className="list-grooping">
        {props.children} 
      </div>
    </div>
  );
}

export default ListContainer;