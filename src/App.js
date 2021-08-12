import logo from './logo.svg';
import './App.css';
import web3 from './web3';
import lottery from './lottery';
import { render } from '@testing-library/react';
import React, {Component} from 'react';
import Web3 from 'web3';
Class App extends Component {
  componentWillMount(){
    this.loadManagerData()
  }
  async loadManagerData(){
    const web3 = new Web3(Web3.givenProvider || "http://localhost:8545")
    const manager = await lottery.methods.manager().call();
    
    this.setState({manager});
  }

  render(){
    return (
      <div>
        <h2>Lottery Contract</h2>
        <p>This is managed by {this.state.manager}</p>
      </div>
    );
  }
}

export default App;
