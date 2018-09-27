import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';
import axios from 'axios';
import { connect } from 'react-redux';

class App extends Component {
    constructor(props){
        super(props)
        this.state={
            filmsCount: (  props.linksFilm.length ),
            filmsOnPage:0,
            nextFilmIndex:0,
            noMore:false
        }

        this.handleClick=this.handleClick.bind(this)
    }

    componentDidMount(){
        axios.get(
            'https://swapi.co/api/people/1/'
        ).then((res)=>{
            this.props.addLinks(res.data.films)
        })
    }

    handleClick(){
        const {addFilm, films, linksFilm} = this.props;
        const {filmsOnPage, nextFilmIndex, filmsCount} =this.state;
        if (filmsOnPage < linksFilm.length){
        axios.get(linksFilm[nextFilmIndex]).then((res)=>{
            addFilm(res.data);
            this.setState({
                nextFilmIndex: nextFilmIndex+1,
                filmsOnPage: filmsOnPage+1
            })
        })} else {
            this.setState({
                noMore:true
            })
        }
    }

  render() {
    return (
      <div className="App">
          <div className="frame">
                <h2>Додати цей товар у список</h2>
          <div  className="text-left new" > Cтворити новий список </div>
                {this.state.noMore && <div  className="text-left noMore" > Більше немає </div> }
              <div className="text-right create-block">
                      <button className="btn pull-right create" onClick={this.handleClick}>Створити</button>
              </div>
              <div>
                <ul>
                    {this.props.films && this.props.films.map((film)=>{return(
                      <li className="item">
                          <div className="item__text item__title">{film.title}</div>
                          <div className="item__text item__count">{film.starships.length}</div>
                      </li>
                    )})}
                </ul>
             <button className="btn btn-success add">Додати</button>
              </div>
          </div>
     </div>
    );
  }
}

export default connect((store)=>({
    films     : store.films,
    linksFilm : store.linksFilm,
}),
    dispatch=>({
        addFilm: (film)=>{
        dispatch({type:`ADD_FILM`, payload:film})},

        addLinks: (linksFilm)=>{
        dispatch({type:`ADD_LINKS`, payload:linksFilm})
    }
    })
)(App);
