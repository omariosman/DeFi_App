import React, { Component } from 'react'
import Navbar from './Navbar'

import Main from './Main'

import TokenFarm from "../abis/TokenFarm.json"

import './App.css'

//var Web3 = require('web3')

import Web3 from 'web3'

class App extends Component {




  async componentWillMount(){
    await this.loadWeb3();
    await this.loadBlockchainData();
    
  }

  async loadBlockchainData() {
    const web3 = window.web3;
    const accounts = await web3.eth.getAccounts();
    console.log(accounts);
    this.setState({ account: accounts[0] });
    /*
    const TokenFarmContract = web3.eth.Contract(TokenFarm.abi, TokenFarm.address);
    TokenFarmContract.methods.getName().call();
    */
    this.setState({loading: false})

  }

  async loadWeb3() {
    if (window.ethereum) {
      window.web3 = new Web3(window.ethereum)
      await window.ethereum.enable()
    }
    else if (window.web3) {
      window.web3 = new Web3(window.web3.currentProvider)
    }
    else {
      window.alert('Non-Ethereum browser detected. You should consider trying MetaMask!')
    }
  }




  constructor(props) {
    super(props)
    this.state = {
      account: '0x0',
      loading: true
    }
  }

  render() {
    let content = "<p>The content is loading</p>"
    if (!this.state.loading) {
      content = <Main />
    }
    return (
      <div>
        <Navbar account={this.state.account} />
        <div className="container-fluid mt-5">
          <div className="row">
            <main role="main" className="col-lg-12 ml-auto mr-auto" style={{ maxWidth: '600px' }}>
              <div className="content mr-auto ml-auto">
                <a
                  href="http://www.dappuniversity.com/bootcamp"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                </a>

                {content}

              </div>
            </main>
          </div>
        </div>
      </div>
    );
  }
}

export default App;
