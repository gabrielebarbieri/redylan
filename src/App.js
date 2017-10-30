import React, { Component } from "react";
import logo from "./logo.png";
import generate from "./core/perec";
import "./App.css";

class App extends Component {
  render() {
    return (
      <div className="App">
        <Logo />
        <SentenceGenerator />
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

function Doc() {
  return (
    <p>
      Continue to read the doc{" "}
      <a href="https://reactjs.org/docs/handling-events.html">here</a>
    </p>
  );
}

class SentenceGenerator extends Component {
  constructor(props) {
    super(props);
    this.state = { sentence: "hello world", sense: "music" };
    this.handleGeneration = this.handleGeneration.bind(this);
  }

  handleGeneration() {
    this.setState({ sentence: generate(this.state.sense, 10, 1) });
  }

  render() {
    return (
      <div>
        <Sentence className="App-intro" sentence={this.state.sentence} />
        <GenerateButton onGenerateClick={this.handleGeneration} />
      </div>
    );
  }
}

function Sentence(props) {
  return <p>{props.sentence}</p>;
}

function GenerateButton(props) {
  return <button onClick={props.onGenerateClick}>Generate</button>;
}

export default App;
