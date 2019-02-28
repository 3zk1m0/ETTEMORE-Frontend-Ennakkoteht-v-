import React, { Component } from 'react';
import { Tab, Tabs, TabList, TabPanel } from 'react-tabs';
import "react-tabs/style/react-tabs.css";

import Button from 'bootstrap'

import Timetable from './Timetable';


const API_PATH = 'https://rata.digitraffic.fi/api/v1/live-trains/station/'

const SETTINGS_departure = '?minutes_before_departure=60&minutes_after_departure=0&minutes_before_arrival=0&minutes_after_arrival=0'
const SETTINGS_arrival = '?minutes_before_arrival=60'



class Table extends Component {
    state = {
      station: '',
      arrivalData: [],
      departureData: []
    }
  
    componentWillUpdate = () => {
      if (this.props.station !== this.state.station) {
        this.updateTable('arrivalData');
        this.updateTable('departureData');
        this.setState({station: this.props.station})
      }
    }

    updateTable = (direction) => {
      const path = API_PATH + this.props.station + SETTINGS_arrival
      fetch(path)
      .then(response => response.json())
      .then(data => {
        let tmp = [];
        if (data == null) { return [] };
        data.forEach(element => {
          const station = element.timeTableRows.find( (element) => {
            return element.stationShortCode === this.props.station && element.type === 'ARRIVAL'
          })

          if (station != null) {
            const trainName = (element.commuterLineID !== '') ? element.commuterLineID : element.trainType;

            const liveEstimateTime = (element.liveEstimateTime === null) ? element.liveEstimateTime.toLocaleTimeString().slice(0, -3).padStart(5, '0') : '';

            const lahtoasema = this.props.stationList.find( (station) => {
              return station.value === element.timeTableRows[0].stationShortCode
            }).label.replace(' asema', '').replace(' Asema', '').replace(' tavara', '')

            const paateasema = this.props.stationList.find( (station) => {
              return station.value === element.timeTableRows[element.timeTableRows.length - 1].stationShortCode
            }).label.replace(' asema', '').replace(' Asema', '').replace(' tavara', '')

            tmp.push({
              juna: trainName + ' ' + element.trainNumber.toString(),
              lahtoasema,
              paateasema,
              time: new Date(station.scheduledTime).toLocaleTimeString().slice(0, -3).padStart(5, '0'),
              cancelled: element.cancelled,
              liveEstimateTime
            })
          }
        });
        return tmp;
      })
      .then(data => this.setState({ [direction]: data}))
    }
  
    render() {
      return (
        <Tabs>
        <TabList>
          <Tab>Saapuvat</Tab>
          <Tab>Lähtevät</Tab>
        </TabList>
    
        <TabPanel>
          <Timetable data={this.state.arrivalData} state={'Saapuu'}/>
        </TabPanel>
        <TabPanel>
        <Timetable data={this.state.departureData} state={'Lähtee'}/>
        </TabPanel>
      </Tabs>
      );
    }
  }
  


  
export default Table;