import React from "react"
import "./App.css"
import Web3 from 'web3'
import 'bootstrap'
import 'bootstrap/dist/css/bootstrap.css'
import 'bootstrap/dist/js/bootstrap.js'
import {BrowserRouter as Router,Route,Switch,Link} from "react-router-dom"
import ETHBank from '../abis/ETHBank.json'
import Navbar from "./Navbar"
import $ from 'jquery'
import Popper from 'popper.js'
import Transactions from "./Transactions"
import History from "./History"
import TransactionHistory from "./TransactionHistory"
window.jQuery = $;
class App extends React.Component{

  constructor(props){
    super(props);
    this.state = {
      loading : true,
      count: 0,
      account: '',
      receipt: null,
      abi : null,
      History: [],
      date: new Date().toLocaleString(),
      balance: ''
    };
  }
  async componentWillMount(){
    await this.loadWeb3()
    await this.loadBlockchainData()
  }

  async loadWeb3(){
    if (window.ethereum) {
      window.web3 = new Web3(window.ethereum)
      window.ethereum.enable()
    }
    else if (window.web3) {
      window.web3 = new Web3(window.web3.currentProvider)
    }
    else {
      window.alert('Non-Ethereum browser detected. You should consider trying MetaMask!')
    }
  }

  async loadBlockchainData(){
    const web3 = window.web3
    // Load account
    const accounts = await web3.eth.getAccounts()
    let balance = await web3.eth.getBalance(accounts[0])
    balance =  await web3.utils.fromWei(balance,'ether')
    this.setState({ account: accounts[0] })
    this.setState({balance : balance})
    // Network ID
    const networkId = await web3.eth.net.getId()
    const networkData = ETHBank.networks[networkId]
    if(networkData) {
      const eTHBank = await web3.eth.Contract(ETHBank.abi, networkData.address)
      this.setState({abi : eTHBank})
      let count =  await eTHBank.methods.count().call()
      count = count.toNumber()
      for (var i = 1; i <= count; i++) {
        const his = await eTHBank.methods.history(this.state.account,i).call()
        if(his._ethers != 0){
          this.setState({
            History: [...this.state.History, his]
          })
        }
      }
      this.setState({count : count})
      this.setState({ loading: false})
    } else {
      window.alert('ETHBank contract not deployed to detected network.')
    }
  }
  onSum = (event) =>{
    event.preventDefault()
    let R = "let"
    this.setState({loading : true})
    this.state.abi.methods.transfer(this.state.date,$("#input1").val()).send({from : this.state.account ,  value: window.web3.utils.toWei($("#input2").val(), 'ether')}).once('receipt',(receipt) =>{
      this.setState({loading : false})
      console.log("Underrated")
    })
    this.setState({loading : false})
  }
  render(){
      return (
            this.state.loading ?
                                <div className="text-center" id="spinner">
                                  <div class="spinner-grow text-muted"></div>
                                  <div class="spinner-grow text-primary"></div>
                                  <div class="spinner-grow text-success"></div>
                                  <div class="spinner-grow text-info"></div>
                                  <div class="spinner-grow text-warning"></div>
                                  <div class="spinner-grow text-danger"></div>
                                  <div class="spinner-grow text-secondary"></div>
                                  <div class="spinner-grow text-dark"></div>
                                  <div class="spinner-grow text-light"></div>
                                  <p>Loading.....</p>
                                </div>
                                  :<div>
                                      <Navbar account={this.state.account}/>
                                      <Switch>
                                        <Route exact path="/Transactions" component={() =><Transactions account={this.state.account} onSum={this.onSum} balance={this.state.balance}/>}/>
                                        <Route path="/History" component={ () =><TransactionHistory History={this.state.History}/>}/>
                                        <Route component={Transactions}/>
                                      </Switch>
                                    </div>
          
        );
  }
};
export default App;