import React,{Component} from "react"
import App from "./App.js"
import Navbar from "./Navbar.js"
class Transactions extends Component{
	render(){
		return(
			<div>
				<div className="container mt-5 mb-5">
		            <h2>Transactions</h2>
		            <form>
		              <b>Current Balance : {this.props.balance} ETH</b>
		              <div className="form-group">
		                <label>From:</label>&nbsp;&nbsp;
		                <small>{this.props.account}</small>
		              </div>
		              <div className="form-group">
		                <label>To:</label>
		                <input type="text" className="form-control" placeholder="Enter Account Address" id="input1"/>
		              </div>
		              <div className="form-group">
		                <label>Ethers:</label>
		                <input type="text" className="form-control" placeholder="Enter Ethers" id="input2"/>
		              </div>
		              <button type="button" className="btn btn-outline-success" onClick={this.props.onSum}>Submit</button>
		              &nbsp;&nbsp;
		            </form>
		          </div>
			</div>
			);
	}
};
export default Transactions;