//SPDX-License-Identifier: Unlicense
pragma solidity ^0.8.0;

import "hardhat/console.sol";

contract Lottery {

    address payable[] public players;
    address public recentWinner;

    function enterLottery() public payable {
        require(msg.value == 0.01 ether);
        players.push(payable(msg.sender));
    }

    function endLottery() public {
        uint256 indexOfWinner =         
        uint256(
            keccak256(
                abi.encodePacked(
                    msg.sender, 
                    block.difficulty, 
                    block.timestamp
                )
            )
        ) % players.length;
        recentWinner = players[indexOfWinner];
        payable(recentWinner).transfer(address(this).balance);

        players = new address payable[](0);
    }
}
