import React from 'react';
import BootstrapTable from 'react-bootstrap-table-next';

import './Timetable.css'

const timeColumnFormatter = (cell, row ) => {

    if (row.cancelled) {
        return (
            <div>
                <div className={'greyed'}>{cell}</div>
                <div className={'canceled-tag'}>Cancelled</div>
            </div>
        );
    } else if (row.liveEstimateTime !== '') {
        return (
            <div>
                <div className={'live-estimate'}>{row.liveEstimateTime}</div>
                <div className={'original-estimate'}>({cell})</div>
            </div>
          );
    } else {
        return (
            <div>{cell}</div>
          );
        
    }
  }

const canccelledRowFormatter = (cell, row) => {
    if (row.cancelled) {
        return (
            <div className={'greyed'}>{cell}</div>
        )
    } else {
        return (
            <div className={'normal'}>{cell}</div>
        )
    }

}

class Timetable extends React.Component {
render() {
    const columns = [{
        dataField: 'juna',
        text: 'Juna',
        formatter: canccelledRowFormatter
      }, {
        dataField: 'lahtoasema',
        text: 'Lähtöasema',
        formatter: canccelledRowFormatter
      }, {
        dataField: 'paateasema',
        text: 'Pääteasema',
        formatter: canccelledRowFormatter
      }, {
        dataField: 'time',
        text: this.props.state,
        formatter: timeColumnFormatter
      }];

    return (
        <BootstrapTable
            keyField="id"
            data={ this.props.data }
            columns={ columns }
            bordered={ false }
            noDataIndication="Table is Empty"
            striped
            hover
            condensed
        />
    );
}
}

export default Timetable;

