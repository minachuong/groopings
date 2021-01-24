import React, {Component, Fragment, ChangeEvent} from 'react'
import './App.css';
import ListContainer from './ListContainer'

interface Props {}

interface State {
  list: string[];
  groopSize: number;
  groopings: string[][];
  randomizedList: string[];
}

export default class App extends Component<Props, State> {
  state: State = {
    list: [],
    groopSize: 2,
    groopings: [],
    randomizedList: [],
  };

  setList = (event: ChangeEvent<HTMLTextAreaElement>): void => {
    const names: string[] = event.target.value.split('\n');
    const filteredNames: string[] = names.filter(name => name !== "");
    this.setState({list: filteredNames});
  }

  setGroopings = (): void => {
    const randomizedList: string[] = this.generateRandomizeList();
    const groopings: string[][] = [];
    const numberOfGroopings: number = Math.floor(randomizedList.length / this.state.groopSize);

    for(let i=0; i<numberOfGroopings; i++) {
      groopings.push([]);
    }

    // TODO: account for remainders (if number remaining is more than half of divisor, add a new groop) ?
    let index = 0;
    while(randomizedList.length) {
      groopings[index].push(randomizedList[0]);
      randomizedList.shift(); // type error if used above b/c shift() => string | undefined

      if (index === groopings.length - 1) {
        index = 0;
      } else {
        index++;
      }
    }
    this.setState({groopings: groopings});
  }

  generateRandomizeList = (): string[] => {
    const originalList: string[] = [...this.state.list];
    let newRandomizedList: string[] = [];

    while(originalList.length) {
      const randomNumber: number = Math.floor(Math.random() * originalList.length);
      newRandomizedList.push(originalList[randomNumber]);
      originalList.splice(randomNumber, 1);
    }

    return newRandomizedList;
  }

  setGroopSizeChange = (event: ChangeEvent<HTMLInputElement>): void => {
    this.setState({
      groopSize: +event.target.value,
    });
  }

  // setNumberOfGroups = (event: ChangeEvent<HTMLInputElement>): void => {
  //   this.setState({
  //     numberOfGroops: +event.target.value,
  //     isGroopsBySize: false
  //   });
  // }

  setRandomizedList = (): void => {
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
              onChange={this.setList}/>
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