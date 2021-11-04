import React,{Component} from "react"
import {BrowserRouter as Router,Route,Switch,Link} from "react-router-dom"
import TransactionHistory from "./TransactionHistory"
const History = () =>{
  return(
        <div>
            <TransactionHistory/>
        </div>
        );
};
export default History;