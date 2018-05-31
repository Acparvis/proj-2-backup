import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';
import PostList from './components/postList';
import ViewPostPage from './components/viewPostPage';
import Controls from './components/controls';
import axios from 'axios';
import { Link, Route, BrowserRouter } from 'react-router-dom';
import CreatePage from './components/createPage';

class App extends Component {


  componentDidMount() {

    }

  render() {
    return (
      <div className="App">
        <Route path="/" exact render={ () => (
          <div>
            <Controls />
            <PostList />
          </div> )} />
          <Route path="/:category" exact render={ (props) => (
            <div>
              <Controls />
              <PostList extra={props}/>
            </div> )} />
          <Route path="/create" exact render={ () => (<CreatePage />)} />
          <Route path="/:category/:id" render={ () => (<ViewPostPage />)} />

      </div>
    );
  }
}

export default App;
