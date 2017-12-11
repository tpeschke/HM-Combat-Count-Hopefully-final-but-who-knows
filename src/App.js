import React, { Component } from 'react';
import './App.css';

import Counter from "./1G/Counter"

class App extends Component {
  constructor() {
    super()
  }

  render() {
    return (
      <div className="maindiv">
        <Counter />
      </div>
    );
  }
}

export default App;
