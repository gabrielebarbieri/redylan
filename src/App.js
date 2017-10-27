import React, { Component } from "react";
import logo from "./logo.png";
import generate from "./core/perec";
import "./App.css";

class App extends Component {
  render() {
    return (
      <div className="App">
        <header className="App-header">
          <img src={logo} alt="logo" />
        </header>
        <p className="App-intro">{generate("music", 10, 1)}</p>
      </div>
    );
  }
}

export default App;
