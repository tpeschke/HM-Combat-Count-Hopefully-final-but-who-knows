import React, { Component } from 'react';
import './reset.css';
import './App.css';

import MainBody from "./1G/2G/MainBody"

class App extends Component {

  render() {
    return (
      <div className="maindiv">
        <div className="header">
          <div className="logo">
            <h4>Combat Counter</h4>
          </div>
          <div className="headpic"></div>
        </div>
        <MainBody />
      </div>
    );
  }
}

export default App;
