const { expect } = require("chai");
const { ethers } = require("hardhat");

var utils = require('ethers').utils;
const provider = new ethers.providers.JsonRpcProvider('https://eth-rinkeby.alchemyapi.io/v2/BeL-9jQ8nULR3W12GKw5y137CZnwt7Ur');


describe("Greeter", function () {
  it("Should return the new greeting once it's changed", async function () {

    const Greeter = await ethers.getContractFactory("Greeter");
    const greeter = await Greeter.deploy("Hello, world!");
    await greeter.deployed();

    console.log((await provider.getBalance(greeter.address.toString())).toString());

    expect(await greeter.greet()).to.equal("Hello, world!");

    const setGreetingTx = await greeter.setGreeting("Hola, mundo!", {value : utils.parseEther('0.01')});
    await setGreetingTx.wait();

    console.log(((await provider.getBalance(greeter.address.toString()))/10**18).toString());

    expect(await greeter.greet()).to.equal("Hola, mundo!");
  }).timeout(60000);
  
});
