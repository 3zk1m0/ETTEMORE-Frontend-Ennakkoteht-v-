import React, { Component, PropTypes } from 'react'

import Select from 'react-select';

import './Search.css'

const STATION_API = 'https://rata.digitraffic.fi/api/v1/metadata/stations';

class Search extends Component {
  state = {
    selectedOption: {},
    stations: [],
  }

  componentWillMount = () => {

    fetch(STATION_API)
    .then(response => response.json())
    .then(data => {
      let stations = [];
      data.forEach(element => {
        stations.push({value: element.stationShortCode, label: element.stationName})
      });
      return stations;
    })
    .then(data => {
      this.setState({ stations: data , selectedOption: {value: "TPE", label: "Tampere asema"}});
      this.handleChange({value: "TPE", label: "Tampere asema"});
      this.props.setStations(data);
    })
  }

  handleChange = (selectedOption) => {
    this.setState({ selectedOption });
    this.props.updateStation(selectedOption.value);
    //console.log(`Option selected:`, selectedOption);
  }

  render() {
    const { selectedOption } = this.state;
    
    return (
      <div>
        <div className='Header'>
          Hae Aseman nimellä
        </div>
        <Select
          value={selectedOption}
          onChange={this.handleChange}
          options={this.state.stations} 
        />
      </div>
    );
  }
}


export default Search;