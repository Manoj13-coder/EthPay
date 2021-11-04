import React,{Component} from "react"
import {Link,Switch} from "react-router-dom"
import App from "./App.js"
import Transactions from "./Transactions"
class Navbar extends Component{
	render(){
		return(
				<div>
		          <nav className="navbar navbar-expand-lg navbar-light bg-light">
		            <a className="navbar-brand" href="index.html">EthPay</a>
		            <button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
		              <span className="navbar-toggler-icon"></span>
		            </button>

		            <div className="collapse navbar-collapse" id="navbarSupportedContent">
		              <ul className="navbar-nav mr-auto">
		              <Switch>
		                  <Link className="nav-link"
		                   to='/Transactions'
		               		>Transactions</Link>
		              </Switch>
		              <Switch>
		                  <Link className="nav-link" to="/History">History</Link>
		              </Switch>
		              </ul>
		              <div className="ml-auto">
		                <small>{this.props.account}</small>
		                <img
                        	className='mr-2'
                        	width='30'
                        	height='30'
                        	src={`https://joeschmoe.io/api/v1/${this.props.account}`}
                      	/>
		              </div>
		            </div>
		          </nav>
	         	</div>
			);
	}
}
export default Navbar;