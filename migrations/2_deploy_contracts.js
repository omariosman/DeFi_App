const DappToken = artifacts.require('DappToken')
const DaiToken = artifacts.require('DaiToken')
const TokenFarm = artifacts.require('TokenFarm')

module.exports = async function(deployer, accounts) {
    // Deploy Mock DAI Token
    await deployer.deploy(DaiToken)
    const daiToken = await DaiToken.deployed()
  
    // Deploy Dapp Token
    await deployer.deploy(DappToken)
    const dappToken = await DappToken.deployed()
  
    // Deploy TokenFarm
    await deployer.deploy(TokenFarm, dappToken.address, daiToken.address)
    const tokenFarm = await TokenFarm.deployed()
  
    // Transfer all tokens to TokenFarm (1 million)
    await dappToken.transfer(tokenFarm.address, '1000000000000000000000000')
  
    // Transfer 100 Mock DAI tokens to investor
    await daiToken.transfer("0x70236d461f6dc9Df7F4bC8845DB98EbB1cfd4004", '100000000000000000000')

};
