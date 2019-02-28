import React, { Component } from 'react';
import './App.css';

import NavBar from './components/NavBar';
import Search from './components/Search';
import Table from './components/Table'



class App extends Component {
  state = {
    stations: null,
    selected: null
  }

  updateStation = (station) => {
    this.setState({selected: station});
  }

  setStations = (stations) => {
    this.setState({stations});
  }

  render() {
    return (
      <div className="App">
        <NavBar/>
        <Search updateStation={this.updateStation} setStations={this.setStations}/>
        <Table station={this.state.selected} stationList={this.state.stations}/>
      </div>
    );
  }
}

export default App;
