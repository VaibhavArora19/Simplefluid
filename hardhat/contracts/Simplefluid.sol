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

    using SuperTokenV1Library for ISuperToken;
    ISuperToken public token;
    
    constructor(ISuperToken _token) {
        token = _token;
    }

    // modifier setPermissions(int96 allowance) {
    //     token.setFlowPermissions(address(this), true, true, true, allowance);
    //     _;
    // }

    function create(address _sender, address _receiver, int96 _flowRate) external {
        token.createFlowFrom(_sender, _receiver, _flowRate);
    }

    function setPermissions(int96 allowance) external {
        token.setFlowPermissions(address(this), true, true, true, allowance);
    }
}