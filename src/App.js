import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';
import axios from 'axios';
import { createStore } from 'redux';


let store = createStore(counter);

store.subscribe(()=>{console.log(store.getState())})
function counter(state ={}, action) {
    switch (action.type) {
        case 'ADD':
            return {...state, films:action.payload}
        default:
            return state
    }
}

class App extends Component {
    constructor(props){
        super(props)

        this.handleClick=this.handleClick.bind(this)
    }


    handleClick(){
        axios.get(
            'https://swapi.co/api/people/1/'
        ).then((res)=>{
            store.dispatch({type:"ADD" ,payload:res.data.films})
        })
    }

  render() {
    return (
      <div className="App">
      <div className="card" style={{width: `18rem`}}>
          <div className="card-body">
                  <button className="btn btn-success" onClick={this.handleClick}>Створити</button>
            </div>
      </div>
     </div>
    );
  }
}

export default App;
