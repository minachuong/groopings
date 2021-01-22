import React, {Component} from 'react'
import './App.css';
import ListContainer from './ListContainer'

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      list: [],
      groopSize: 2,
      groopings: [],
      randomizedList: []
    };
  }

  setGroop = (event) => {
    const names = event.target.value.split('\n');
    const filteredNames = names.filter(name => name !== "");
    this.setState({list: filteredNames});
  }

  setGroopings = () => {
    // randomize list
    const randomizedList = this.generateRandomizeList();
    // Initalize list of arrays (list length / groopSize), each inner array represents a grooping
    const groopings = [];
    const numberOfGroopings = Math.floor(randomizedList.length / this.state.groopSize);
    for(let i=0; i<numberOfGroopings; i++) {
      groopings.push([]);
    }
    // TODO: account for remainders (if number remaining is more than half of divisor, add a new groop, for now)
    // while there are names in list, shift from list into inner arrays
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
    this.setState({groopSize: event.target.value});
  }

  setRandomizedList = () => {
    this.setState({randomizedList : this.generateRandomizeList()});
  }

  render() {
    return (
      <div className="App">
        <div className="container">
          <label htmlFor="names">
              Add names <span>(new line for each name please)</span>
            <textarea 
              name="names" 
              onChange={this.setGroop}/>
          </label>
          <label htmlFor="groopSize">
            Groop Size
            <input 
              name="groopSize"
              type="number" 
              value={this.state.groopSize} 
              onChange={this.setGroopSizeChange}/>
          </label>
          <div className="buttons-container">
            <button onClick={this.setGroopings}>Create Groop</button>
            <button onClick={this.setRandomizedList}>Randomize List</button>
          </div>
        </div>
        <div className="container">
          { this.state.randomizedList.length > 0 && (
            <ListContainer title="Randomized List">
              { this.state.randomizedList.map((name, index) => {
                  return (<div key={index}>{name}</div>);
              })}
            </ListContainer>
          )}
          { this.state.groopings.length > 0 && (
            <ListContainer title="Groopings">
              { this.state.groopings.length > 0 && this.state.groopings.map((groop, index) => {
                return (
                  <div key={index}>
                    <div key={index}>Groop {index}</div>
                    <ul>
                      { groop.map((name, nameIndex) => {
                        return(<li key={nameIndex}>{name}</li>);
                      })}
                    </ul>
                  </div>
                );
              })}
            </ListContainer>
          )}
        </div>
      </div>
    );
  }
}

export default App;
