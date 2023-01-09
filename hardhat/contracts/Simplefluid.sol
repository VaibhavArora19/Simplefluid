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

contract Simplefluid {

    event streamStartedSingle(address sender, address receiver, int96 flowRate);
    event streamStartedMultiple(address sender, address[] receiver, int96 flowRate);
    event streamDeletedSingle(address sender, address receiver);
    event streamStartedMultiple(address sender, address[] receiver);
    event flowStartedWithoutOperator(address sender, address receiver, int96 flowRate, bool isOperatorIncluded);

    using SuperTokenV1Library for ISuperToken;
    ISuperToken public token;
    
    constructor(ISuperToken _token) {
        token = _token;
    }

    function startFlowSingle(address _sender, address _receiver, int96 _flowRate) external {
        token.createFlowFrom(_sender, _receiver, _flowRate);

        emit streamStartedSingle(_sender, _receiver, _flowRate);
    }


    function startFlowMultiple(address _sender, address[] memory _receiver, int96 _flowRate) external {
        
        for(uint i =0; i<_receiver.length; i++) {
             token.createFlowFrom(_sender, _receiver[i], _flowRate);
        }

        emit streamStartedMultiple( _sender, _receiver,  _flowRate);
    }

    function deleteFlowSingle(address _sender, address _receiver) external {
        token.deleteFlowFrom(_sender, _receiver);

        emit streamDeletedSingle(_sender, _receiver);
    }

    function deleteFlowMultiple(address _sender, address[] memory _receiver) external {
        
        for(uint i =0; i<_receiver.length; i++) {
             token.deleteFlowFrom(_sender, _receiver[i]);
        }

        emit streamStartedMultiple(_sender, _receiver);
    }

    function createFlowWithoutOperator(address _sender, address _receiver, int96 _flowRate) external {
        int96 flowRate = token.getFlowRate(_sender, _receiver);

        if(flowRate != 0) {
            emit flowStartedWithoutOperator(_sender, _receiver, flowRate, false);
        }
    }
}