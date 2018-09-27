import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import { Provider} from 'react-redux';
import { createStore } from 'redux';


let store = createStore(counter);

function counter(state ={films:[], linksFilm:[] }, action) {
    switch (action.type) {
        case 'ADD_FILM':
            return {...state, films:[...state.films, action.payload]};
        case 'ADD_LINKS':
            return {...state, linksFilm:action.payload}
default:
    return state
}
}

const render =()=>{
    ReactDOM.render(
    < Provider
    store = {store} >
        < App / >
        < / Provider>,
    document.getElementById('root')
)};

render();
store.subscribe(()=>{render()})
