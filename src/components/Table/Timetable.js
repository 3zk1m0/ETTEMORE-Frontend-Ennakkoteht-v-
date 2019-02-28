import React from 'react';
import BootstrapTable from 'react-bootstrap-table-next';



function timeColumnFormatter(cell, row) {

    console.log(row)
    if (row.canceled) {
        return (
          <div className={'canceled-tag'}>Canceled</div>
        );
    } else if (row.liveEstimateTime !== '') {
        return (
            <div>
                <div>$ {row.liveEstimateTime} NTD</div>
                <div>$ {cell} NTD</div>
            </div>
          );
    } else {
        return (
            <div>{cell}</div>
          );
        
    }
  }

class Timetable extends React.Component {
render() {
    const columns = [{
        dataField: 'juna',
        text: 'Juna'
      }, {
        dataField: 'lahtoasema',
        text: 'Lähtöasema'
      }, {
        dataField: 'paateasema',
        text: 'Pääteasema'
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

