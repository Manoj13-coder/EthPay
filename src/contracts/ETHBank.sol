pragma solidity ^0.5.0;

contract ETHBank{
    uint256 public count=0;
    struct Parameters{
        string _date;
        address _from;
        address _to;
        uint256 _ethers;
        string _receipt;
    }
    event Requirements(
        string _date,
        address _from,
        address _to,
        uint256 _ethers,
        string _receipt
    );
    mapping(address => mapping(uint256 => Parameters)) public history;
    function generate(string memory date,address to,uint256 value,string memory _Hash) public{
        Parameters memory past = history[msg.sender][count];
        past._receipt = _Hash;
        history[msg.sender][count] = past;
        emit Requirements(date,msg.sender,to,value,_Hash);
    }
    function History(string memory date,address to,uint256 value) internal{
        count++;
        history[msg.sender][count] = Parameters(date,msg.sender,to,value,'');
    }
    function transfer(string memory date,address payable to) public payable{
        require(msg.value > 0);
        History(date,to,msg.value);
        address(to).transfer(msg.value);
    }
}