const { expect } = require("chai");
const { ethers } = require("hardhat");

describe("IterableMapping", function () {
  it("Should return void in the testIterableMap", async function () {
    const TestIterableMap = await ethers.getContractFactory("./contracts/TestIterableMap.sol");
    const testiterablemap = await TestIterableMap.deploy();
    await testiterablemap.deployed();

    console.log(testiterablemap.address);
    await testiterablemap.testIterableMap().wait();
  });
});
