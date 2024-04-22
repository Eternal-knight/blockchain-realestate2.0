// SPDX-License-Identifier: MIT
pragma solidity ^0.8.18;

contract place {
    uint256 public value;
    address payable public owner;
    mapping(uint256 => address) public historyOwnership;
    uint256 public ownershipCounter;

    modifier isOwner() {
        require(owner == msg.sender, "Access Denied");
        _;
    }

    constructor(address from_) {
        assert(1 wei == 1);
        ownershipCounter = 0;
        owner = payable(from_);
        historyOwnership[ownershipCounter] = owner;
        ownershipCounter++;
    }

    function setValue(uint256 value_val) public isOwner() {
        value = value_val;
    }

    function transaction() public payable {
        require(msg.value == value, "Invalid");
        bool sent = owner.send(address(this).balance);
        require(sent, "Invalid sent");
        owner = payable(msg.sender);
        historyOwnership[ownershipCounter] = owner;
        ownershipCounter++;
    }

    function getLastOwnerIndex() public view returns (uint256) {
        return ownershipCounter;
    }

    function getOwnerHistory() public view returns (address[] memory) {
        address[] memory ret = new address[](ownershipCounter);
        for (uint256 i = 0; i < ownershipCounter; i++) {
            ret[i] = historyOwnership[i];
        }
        return ret;
    }

    function getOwnerAddress()public view returns (address) {
       
        return address(owner);
    }

}


contract DeployPlace {
    mapping(uint256 => place) private placeDeployed;
    uint256 private placeCounter;

    function deploying(address from_) public returns (uint256) {
        place obj = new place(from_);
        placeDeployed[placeCounter] = obj;
        placeCounter++;
        return placeCounter - 1;
    }

    function getContract(uint256 index) public view returns (address) {
        return address(placeDeployed[index]);
    }

    function getLatestIndex() public view returns (uint256){
        return  placeCounter-1;
    }
}