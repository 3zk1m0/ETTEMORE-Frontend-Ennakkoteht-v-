import React, { Component } from 'react';
//import { Tab, Tabs, TabList, TabPanel } from 'react-tabs';
import "react-tabs/style/react-tabs.css";

import Tabs from 'react-bootstrap/Tabs'
import Tab from 'react-bootstrap/Tab'

import Timetable from './Timetable';


const API_PATH = 'https://rata.digitraffic.fi/api/v1/live-trains/station/'

const SELECT_TIME = 60;


const SETTINGS_departure = `?minutes_before_departure=${SELECT_TIME}&minutes_after_departure=0&minutes_before_arrival=0&minutes_after_arrival=0`
const SETTINGS_arrival = `?minutes_before_departure=0&minutes_after_departure=0&minutes_before_arrival=${SELECT_TIME}&minutes_after_arrival=0`



class Table extends Component {
    state = {
      arrivalData: [],
      departureData: []
    }

    componentWillReceiveProps = (nextProps) => {
      console.log('update')
      this.updateTable('arrivalData', nextProps.station);
      this.updateTable('departureData', nextProps.station);
    }

    updateTable = (direction, stationShortCode) => {
      const ApiDirection = (direction === 'arrivalData') ? SETTINGS_arrival : SETTINGS_departure;
      const path = API_PATH + stationShortCode + ApiDirection;
      fetch(path)
      .then(response => response.json())
      .then(data => {
        let tmp = [];
        if (data == null) { return [] };
        data.forEach(element => {
          const station = element.timeTableRows.find( (element) => {
            const trainDirection = (direction === 'arrivalData') ? 'ARRIVAL' : 'DEPARTURE';
            return element.stationShortCode === stationShortCode && element.type === trainDirection
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

        // Test data

        tmp.push({cancelled: true, juna: "IC 273", lahtoasema: "Helsinki", liveEstimateTime: "", paateasema: "Rovaniemi", time: "01.55"});
        tmp.push({cancelled: false, juna: "IC 273", lahtoasema: "Helsinki", liveEstimateTime: "01.59", paateasema: "Rovaniemi", time: "01.55"});
        
        // Test data end

        tmp.sort((a, b) => (a.time > b.time) ? 1 : -1)
        return tmp;
      })
      .then(data => this.setState({ [direction]: data}))
    }
  
    render() {

      return (
        <div className="MainTable">
        <Tabs className="direction-tabs" defaultActiveKey="saapuvat">
          <Tab className="direction-tab" eventKey="saapuvat" title="Saapuvat">
            <Timetable data={this.state.arrivalData} state={'Saapuu'}/>
          </Tab>
          <Tab className="direction-tab" eventKey="lahtevat" title="Lähtevät">
            <Timetable data={this.state.departureData} state={'Lähtee'}/>
          </Tab>
        </Tabs>
        </div>
      )
    }
  }
  


  
export default Table;