//SPDX-License-Identifier: MIT

pragma solidity >=0.7.0 <0.9.0;

import { 
    ISuperfluid 
} from "@superfluid-finance/ethereum-contracts/contracts/interfaces/superfluid/ISuperfluid.sol";

import { 
    ISuperToken 
} from "@superfluid-finance/ethereum-contracts/contracts/interfaces/superfluid/ISuperToken.sol";

import {
    SuperTokenV1Library
} from "@superfluid-finance/ethereum-contracts/contracts/apps/SuperTokenV1Library.sol";

contract Simplefluid {

    event singleFlowStarted(address _sender, address _receiver, int _flowRate);
    event multipleFlowStarted(address _sender, address[] _receivers, int _flowRate);

    // superfluid super token library
    using SuperTokenV1Library for ISuperToken;
    ISuperToken public token;

    //owner of the contract
    address owner;

    constructor(ISuperToken _token) {
        token = _token;
        owner = msg.sender;
    }

    //function to start CFA flow for a single user
    /**
    * @param sender is the address of the person who started the stream
    * @param receiver is the address of receiving party
    * @param flowRate defines the token to flow per second
     */
    function createFlowOneCFA(address sender, address receiver, int flowRate, bool allowDelete) external {
        require(msg.sender == sender, "You are not the owner of address");
        
        //set flowRateAllowance to 100 for now 
        /**
        * @dev change flowRate later
         */

        token.setFlowPermissions(address(this), true, false, allowDelete, 100);
        token.createFlowFrom(sender, receiver, flowRate);
        emit singleFlowStarted(sender, receiver, flowRate);
    }


    //createFlowMultipleCFA allows you to stream tokens to multiple accounts in a single stream
    function createFlowMultipleCFA(address sender, address[] memory receivers, int flowRate, bool allowDelete) external {
        require(msg.sender == sender, "You are not the owner of address");
        
        token.setFlowPermissions(address(this), true, true, allowDelete, 1000);

        //loop through all the addresses that are being sent
        for(uint i =0; i<receivers.length; i++) {
            token.createFlowFrom(sender, receivers[i], flowRate);
        }

        emit multipleFlowStarted(sender, receivers, flowRate);
    }     


}