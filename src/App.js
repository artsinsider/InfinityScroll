import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';
import LongScroll from './components/LongScroll/LongScroll'

class App extends Component {

    state = {
        from: -5,
        to: 5
    }

    changeHandler = ({ from, to }) => this.setState({ from, to });

    getItems = () => {
        const { from, to } = this.state;
        const result = [];
        for( let i = from; i <= to; i += 1 ) {
            result.push( <div key={i} >{i}</div> )
        }
        return result;
    }

  render() {
    const { from, to } = this.state

    return (
      <div className="App">
        <div className="App-header">
          <img src={logo} className="App-logo" alt="logo" />
          <h2>Welcome to React</h2>
        </div>
        <p className="App-intro">
          To get started, edit <code>src/App.js</code> and save to reload.
        </p>
          <div>
              <LongScroll
                  {...this.props}
                  from={from}
                  to={to}
                  items={this.getItems()}
                  onChange={this.changeHandler}
              />
          </div>
      </div>
    );
  }
}

export default App;
