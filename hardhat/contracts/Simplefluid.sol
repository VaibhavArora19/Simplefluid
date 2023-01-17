//SPDX-License-Identifier: MIT
pragma solidity 0.8.14;

import { 
    ISuperfluid 
} from "@superfluid-finance/ethereum-contracts/contracts/interfaces/superfluid/ISuperfluid.sol";

import { 
    ISuperToken 
} from "@superfluid-finance/ethereum-contracts/contracts/interfaces/superfluid/ISuperToken.sol";

import {
    SuperTokenV1Library
} from "@superfluid-finance/ethereum-contracts/contracts/apps/SuperTokenV1Library.sol";


// Interface defining superfluid scheduler
interface IFlowScheduler {

        struct FlowSchedule {
        uint32 startDate;
        uint32 startMaxDelay;
        uint32 endDate;
        int96 flowRate;
        uint256 startAmount;
        bytes32 userData;
    }

        function createFlowSchedule(
        ISuperToken superToken,
        address receiver,
        uint32 startDate,
        uint32 startMaxDelay,
        int96 flowRate,
        uint256 startAmount,
        uint32 endDate,
        bytes memory userData,
        bytes memory ctx
    ) external returns (bytes memory newCtx);

        function getFlowSchedule(
        address superToken,
        address sender,
        address receiver
    ) external view returns (FlowSchedule memory);

    // [Solidity] Execute a scheduled stream opening
        function executeCreateFlow(
        ISuperToken superToken,
        address sender,
        address receiver,
        bytes memory userData
    ) external returns(bool success);

    // [Solidity] Execute a scheduled stream closure
    function executeDeleteFlow(
        ISuperToken superToken,
        address sender,
        address receiver,
        bytes memory userData
    ) external returns(bool success);

}

contract Simplefluid {

    event streamStartedSingle(address sender, address receiver, int96 flowRate);
    event streamStartedMultiple(address sender, address[] receiver, int96 flowRate);
    event streamDeletedSingle(address sender, address receiver);
    event streamDeletedMultiple(address sender, address[] receiver);

    using SuperTokenV1Library for ISuperToken;
    
    ISuperToken public token;
    IFlowScheduler public flowScheduler;
    
    address public constant _flowScheduler = 0xF18825d412C061aEfEFB4dF46a1c077636dA50bf;
    address public constant _token = 0x5D8B4C2554aeB7e86F387B4d6c00Ac33499Ed01f; //fDAIx 

    //mapping of sender with multiple receivers that are scheduled for automated streaming
    mapping(address => address[]) public automatedStreams;

    //array of sender addresses that want to automate their streams
    address[] public automatedSenders;

    constructor() {
        token = ISuperToken(_token);
        flowScheduler = IFlowScheduler( _flowScheduler);
    }
    
    //function to start a single flow using operator
    function startFlowSingle(address _sender, address _receiver, int96 _flowRate) external {
        token.createFlowFrom(_sender, _receiver, _flowRate);

        emit streamStartedSingle(_sender, _receiver, _flowRate);
    }

    //function to start multiple flow in single transaction with the help of operator
    // Operator is smart contract in this case
    function startFlowMultiple(address _sender, address[] memory _receiver, int96 _flowRate) external {
        
        for(uint i =0; i<_receiver.length; i++) {
             token.createFlowFrom(_sender, _receiver[i], _flowRate);
        }

        emit streamStartedMultiple( _sender, _receiver,  _flowRate);
    }

    //function to delete a single flow with the help of operator
    function deleteFlowSingle(address _sender, address _receiver) external {
        token.deleteFlowFrom(_sender, _receiver);

        emit streamDeletedSingle(_sender, _receiver);
    }


    //function to delete multiple transactions in a single transaction with the help of operator
    //operator is the smart contract in this case
    function deleteFlowMultiple(address _sender, address[] memory _receiver) external {
        
        for(uint i =0; i<_receiver.length; i++) {
             token.deleteFlowFrom(_sender, _receiver[i]);
        }

        emit streamDeletedMultiple(_sender, _receiver);
    }

    /**
     * @dev Automating the flow using superfluid scheduler
     * Permission will be handled using superfluid sdk
     */
    function scheduleStream(address receiver, uint32 startDate, int96 flowRate, uint32 endDate, 
    bytes memory userData) external {
        //endDate can be set to zero if the user is only concerned with the opening of stream

            if(automatedStreams[msg.sender].length == 0){
                automatedSenders.push(msg.sender);   
            }

            automatedStreams[msg.sender].push(receiver);

           flowScheduler.createFlowSchedule(token, receiver, startDate, 5 minutes, flowRate, 0,
            endDate, userData, "0x"
           );
    }

    /**
    * @dev function that should be triggered by an off-chain keeper
    * off-chain keeper constantly checks the streams to start/close by calling this function
    */
    function getScheduledStream(address sender, address receiver) external view returns(IFlowScheduler.FlowSchedule memory) {
        return flowScheduler.getFlowSchedule(_token, sender, receiver);
    }

    //function to start the scheduled stream
    function startScheduledStream(address sender, address receiver) external returns(bool){
        return flowScheduler.executeCreateFlow(token, sender, receiver, "0x");   
    }

    //function to delete the scheduled stream
    function endScheduledStream(address sender, address receiver) external returns(bool) {
        return flowScheduler.executeDeleteFlow(token, sender, receiver, "0x");
    }
}