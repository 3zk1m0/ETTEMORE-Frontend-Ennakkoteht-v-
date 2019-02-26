import React, { Component } from 'react'
import {Typeahead} from 'react-bootstrap-typeahead';



class Search extends React.Component {
  state = {
    multiple: false,
  };

  render() {

    var options = [
      {id: 1, label: 'John'},
      {id: 2, label: 'Miles'},
      {id: 3, label: 'Charles'},
      {id: 4, label: 'Herbie'},
    ];

    return (
      <>
        <Typeahead
          labelKey="name"
          options={options}
          placeholder="Choose a state..."
          clearButton={true}
        />
      </>
    );
  }
}

export default Search