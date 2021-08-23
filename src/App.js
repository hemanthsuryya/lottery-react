import './App.css';
import lottery from './lottery';
import React, {Component} from 'react';
import web3 from './web3';

class App extends Component {
  //TYPE-I ##################
  // constructor(props){
  //   super(props);
    
  //   this.state = { manager: ''}
  // }
  //TYPE-II ##################
  state = {
    manager: '',
    players: [],
    balance: '',
    value: '',
    message: ''
  };

  async componentDidMount(){
    const manager = await lottery.methods.manager().call();
    const players = await lottery.methods.getPlayers().call();
    const balance = await web3.eth.getBalance(lottery.options.address);

    this.setState({ manager, players, balance });
  }

  onSubmit = async event => {//In this method we don't need to worry about inding 'this'.
    event.preventDefault();
    const accounts = await web3.eth.getAccounts();
    console.log(accounts[0]);
    this.setState({message: 'Waiting on transaction success...'})

    await lottery.methods.enter().send({
      from: accounts[0],
      value: web3.utils.toWei(this.state.value, 'ether'),
      gasPrice: '20000000000'
    });

    this.setState({message: 'You have been entered!!'});
  };

  render(){
    return (
      <div>
        <h2>Lottery Contract</h2>
        <p>
          This is managed by {this.state.manager}. 
          There are currently {this.state.players.length} people in the competition to win {web3.utils.fromWei(this.state.balance, 'ether')} ether.
        </p>
        <hr />
        <form onSubmit={this.onSubmit}>
          Try your luck
          <div>
            <label>Amount of ether to enter</label>
            <input 
              value = {this.state.value}
              onChange={event => this.setState({ value: event.target.value })} />
          </div>
          <input type="submit" value="Enter"/>
        </form>
        <hr />
        <h4>Ready to pick winner</h4>
        <hr />
        <h2>{this.state.message}</h2>
      </div>
    );
  }
}

export default App;
