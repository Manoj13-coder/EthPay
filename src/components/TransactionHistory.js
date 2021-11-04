import React,{Component} from "react"
class TransactionHistory extends Component{
  render(){
	return(
		<div>
        <div className="container mt-5">
                <h1>Transaction History</h1>
                <table className="table">
                  <thead>
                    <tr>
                      <th>Date(Time)</th>
                      <th>From</th>
                      <th>To</th>
                      <th>Amount(Wei)</th>
                    </tr>
                  </thead>
                    <tbody>
                      {
                        this.props.History.map((history,key) =>{
                          return(
                            <tr key={key}>
                              <td>{history._date}</td>
                              <td>{history._from}</td>
                              <td>{history._to}</td>
                              <td>{`${history._ethers}`}</td>
                            </tr>
                          );
                        })
                      }
                    </tbody>
                </table>
        </div>
		</div>
			);
    }
};
export default TransactionHistory;