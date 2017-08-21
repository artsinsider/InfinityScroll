import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';
import LongScroll from './components/LongScroll/LongScroll'

class App extends Component {

    state = {
        from: 0,
        to: 55
    }

    changeHandler = ({ from, to }) => this.setState({ from, to });

    getItems = () => {
        const { from, to } = this.state;
        const str1 = 'Lorem ipsum dolor sit amet, consectetur adipisicing elit.';
        const str2 = 'Lorem ipsum dolor sit amet, consectetur adipisicing elit. ' +
                     'Alias commodi, eum itaque minus possimus qui suscipit.';
        const news = { borderBottom: '1px solid #d4d4d4', paddingBottom: '10px' };
        const tittle = { color: '#4d4d4d'};
        const result = [];

        for( let i = from; i <= to; i += 1 ) {
            const unicKey = Math.random().toFixed(4)
            result.push(
                <div key={i + unicKey} style={news}
                     id={'$' + (i + unicKey)} >
                    <h4 style={tittle} >{i}. {str1}</h4>
                    <span>{str2}</span>
                </div> )
        }
        return result;
    }

  render() {
    const { from, to } = this.state;

    return (
      <div className="App">
        <div className="App-header">
          <img src={logo} className="App-logo" alt="logo" />
          <h1>Infinity Scroll</h1>
        </div>
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
