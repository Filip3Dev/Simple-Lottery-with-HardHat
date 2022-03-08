const { expect } = require("chai");
const { ethers } = require("hardhat");

require('chai').use(require('chai-as-promised')).should();

var utils = require('ethers').utils;
const provider = new ethers.providers.JsonRpcProvider('https://eth-rinkeby.alchemyapi.io/v2/BeL-9jQ8nULR3W12GKw5y137CZnwt7Ur');


describe("LotteryContract", function () {
  it("Should return the new greeting once it's changed", async function () {

    //DEPLOY LOTTERY CONTRACT
    const Lottery = await ethers.getContractFactory("Lottery");
    const LotteryContract = await Lottery.deploy();
    await LotteryContract.deployed();

    //GET LOTTERY CONTRACT BALANCE BEFORE ANYTHING
    console.log((await provider.getBalance(LotteryContract.address.toString())).toString());
  
    //ENTER LOTTERY WITH PAYMENT 0.01 ETHER
    const enterLotteryTX = await LotteryContract.enterLottery({value : utils.parseEther('0.01')});
    await enterLotteryTX.wait();

    //GET LOTTERY CONTRACT BALANCE AFTER ENTER
    console.log(((await provider.getBalance(LotteryContract.address.toString()))/10**18).toString());

    //GET FIRST PLAYER IN ARRAY OF PLAYERS
    console.log(await LotteryContract.players(0));

    //END LOTTERY
    const endLotteryTX = await LotteryContract.endLottery();
    await endLotteryTX.wait();

    //GET WINNER
    console.log(await LotteryContract.recentWinner());

    //GET LOTTERY CONTRACT BALANCE AFTER END
    console.log(((await provider.getBalance(LotteryContract.address.toString()))/10**18).toString());

  }).timeout(60000);

});
