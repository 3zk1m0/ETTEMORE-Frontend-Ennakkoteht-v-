import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';

import NavBar from './components/NavBar';
import Search from './components/Search';

import Button from 'react-bootstrap/Button';

class App extends Component {
  render() {
    return (
      <div className="App">
        <NavBar/>
        <Search/>
        <header className="App-header">
          <img src={logo} className="App-logo" alt="logo" />
          <p>
            Edit <code>src/App.js</code> and save to reload.
          </p>
          <a
            className="App-link"
            href="https://reactjs.org"
            target="_blank"
            rel="noopener noreferrer"
          >
            Learn React
          </a>
          <Button>Test</Button>
        </header>
      </div>
    );
  }
}

export default App;
