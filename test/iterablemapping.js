const { expect } = require("chai");
const { ethers } = require("hardhat");

describe("IterableMapping", function () {  

  it("Should return void in the testIterableMap", async function () {
    const signers = await ethers.getSigners();

    const IterableMapping = await ethers.getContractFactory("./contracts/libraries.sol:IterableMapping");
    const iterableMapping = await IterableMapping.deploy();
    await iterableMapping.deployed();
    console.log('iterableMapping: ', iterableMapping.address);

    const TestIterableMap = await ethers.getContractFactory("TestIterableMap", {signer: signers[0], libraries: {IterableMapping: iterableMapping.address}});
    const testiterablemap = await TestIterableMap.deploy();
    await testiterablemap.deployed();
    console.log('testiterablemap: ', testiterablemap.address);

    const _tx = await testiterablemap.testIterableMap();
    await _tx.wait();

  });
});
