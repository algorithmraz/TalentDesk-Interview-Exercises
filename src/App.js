import React, { Component } from 'react';
import { calculateResult } from './utils';
import './App.css';

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      value: '',
      userInput: '',
      result: '',
      error: 'Write something',
    };
    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleChange(event) {
    const { value } = event.target;
    this.setState({ value });
  }

  handleSubmit(event) {
    const { value } = this.state;
    const { input, result, error } = calculateResult(value);
    this.setState({ userInput: input, result, error });
    event.preventDefault();
  }

  render() {
    const { userInput, result, error } = this.state;
    return (
      <div className="App">
        <form className="App-form" onSubmit={this.handleSubmit}>
          <input type="text" value={this.state.value} onChange={this.handleChange} />
          { !error &&
            <p>
              <span>Result for input '{userInput}' is '{result}'</span>
            </p>
          }
          { error &&
            <p className="App-error">
              {error}
            </p>
          }
        </form>
      </div>
    );
  }
}

export default App;
