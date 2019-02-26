import React, { Component } from 'react';
import { Navbar } from 'react-bootstrap';

class NavBar extends Component {
  render() {
    return (
      <Navbar bg="light" expand="lg">
        <Navbar.Brand>Aseman junatiedot</Navbar.Brand>
      </Navbar>
    );
  }
}

export default NavBar;

