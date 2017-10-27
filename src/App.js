import React, { Component } from "react";
import logo from "./logo.png";
import generate from "./core/perec";
import "./App.css";

class App extends Component {
  render() {
    return (
      <div className="App">
        <Logo />
        <Sentence className="App-intro" sense="music" />
        <Doc />
      </div>
    );
  }
}

function Logo(props) {
  return (
    <header className="App-header">
      <img src={logo} alt="logo" />
    </header>
  );
}

class Sentence extends Component {
  constructor(props) {
    super(props);
    this.state = { sentence: "Hello World" };
  }

  componentDidMount() {
    this.setState({
      sentence: "generate(this.props.sense, 10, 1)"
    });
  }

  render() {
    return <p>{this.state.sentence}</p>;
  }
}

function Doc() {
  return (
    <p>
      Continue to read the doc{" "}
      <a href="https://reactjs.org/docs/handling-events.html">here</a>
    </p>
  );
}

export default App;
