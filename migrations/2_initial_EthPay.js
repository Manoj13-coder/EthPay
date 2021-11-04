const ETHBank = artifacts.require("ETHBank");

module.exports = function(deployer) {
  deployer.deploy(ETHBank);
};
