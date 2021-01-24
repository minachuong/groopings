import React, {Component, Fragment} from 'react'
import './App.css';
import ListContainer from './ListContainer'

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      list: [],
      groopSize: 2,
      groopings: [],
      randomizedList: [],
    };
  }

  setGroop = (event) => {
    const names = event.target.value.split('\n');
    const filteredNames = names.filter(name => name !== "");
    this.setState({list: filteredNames});
  }

  setGroopings = () => {
    const randomizedList = this.generateRandomizeList();
    const groopings = [];
    const numberOfGroopings = Math.floor(randomizedList.length / this.state.groopSize);
      
    for(let i=0; i<numberOfGroopings; i++) {
      groopings.push([]);
    }

    // TODO: account for remainders (if number remaining is more than half of divisor, add a new groop, for now)
    let index = 0;
    while(randomizedList.length) {
      groopings[index].push(randomizedList.shift());

      if (index === groopings.length - 1) {
        index = 0;
      } else {
        index++;
      }
    }
    this.setState({groopings: groopings});
  }

  generateRandomizeList = () => {
    const originalList = [...this.state.list];
    let newRandomizedList = [];

    while(originalList.length) {
      const randomNumber = Math.floor(Math.random() * originalList.length);
      newRandomizedList.push(originalList[randomNumber]);
      originalList.splice(randomNumber, 1);
    }

    return newRandomizedList;
  }

  setGroopSizeChange = (event) => {
    this.setState({
      groopSize: event.target.value,
      isGroopsBySize: true
    });
  }

  setNumberOfGroups = (event) => {
    this.setState({
      numberOfGroops: event.target.value,
      isGroopsBySize: false
    });
  }

  setRandomizedList = () => {
    this.setState({randomizedList : this.generateRandomizeList()});
  }

  render() {
    return (
      <div role="main" className="App">
        <section>
          <label>
            Add names 
            <textarea 
              autoFocus
              placeholder="Enter each name on a new line"
              onChange={this.setGroop}/>
          </label>
          <button onClick={this.setRandomizedList}>Randomize List</button>
        </section>
        <ListContainer title="Customize Groopings">
          <label>
            Groop Size
            <input 
              type="number" 
              value={this.state.groopSize} 
              onChange={this.setGroopSizeChange}/>
          </label>
          <button onClick={this.setGroopings}>Create Groopings</button>
        </ListContainer>
        { this.state.randomizedList.length > 0 && (
          <ListContainer title="Randomized List" id="RandomizedList">
            <ul aria-labelledby="RandomizedList">
              { this.state.randomizedList.map((name, index) => {
                  return (<li key={index}>{name}</li>);
              })}
            </ul>
          </ListContainer>
        )}
        { this.state.groopings.length > 0 && (
          <ListContainer title="Groopings">
            { this.state.groopings.length > 0 && this.state.groopings.map((groop, index) => {
              return (
                <Fragment key={index}>
                  <h4 id={`Groop${index + 1}`}>Groop {index + 1}</h4>
                  <ul aria-labelledby={`Groop${index + 1}`}>
                    { groop.map((name, nameIndex) => {
                      return(<li key={nameIndex}>{name}</li>);
                    })}
                  </ul>
                </Fragment>
              );
            })}
          </ListContainer>
        )}
      </div>
    );
  }
}

export default App;
