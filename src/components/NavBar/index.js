import React, { Component } from 'react';
import { Navbar } from 'react-bootstrap';

import './NavBar.css'

class NavBar extends Component {
  render() {
    return (
      <Navbar fixedTop className='nav'>
        Aseman junatiedot
      </Navbar>
    );
  }
}

export default NavBar;

