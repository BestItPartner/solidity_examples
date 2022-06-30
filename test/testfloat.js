const { expect } = require("chai");
const { ethers } = require("hardhat");
const { toBn, fromBn } = require("evm-bn");

describe("TestFloat", function () {  
  let testFloat;
  let signers;

  beforeEach(async () => {    
    if (testFloat == null) {
      signers = await ethers.getSigners();

      const TestFloat = await ethers.getContractFactory("TestFloat");
      testFloat = await TestFloat.deploy();
      await testFloat.deployed();
      console.log('testFloat: ', testFloat.address);
    }
  });

  it("Sould returh power of floats correctly", async () => {
    const x1 = toBn("1.0999");
    const x2 = toBn("476.7");
    const y = toBn("1.0014114");
    // let daily = 25000;
    // for (let i = 1; i < 10; i++) {
    //     let result = await testFloat.doPow(y, toBn(i.toString()));
    //     let result1 = await testFloat.doPow(x1, result);
    //     let result2 = await testFloat.doPow(x2, result);
    //     result = await testFloat.doMul(toBn(daily.toString()), testFloat.doDiv(result1, result2));
    //     console.log(fromBn(result).toString());    
    //     daily = fromBn(result);
    // }
      let result = await testFloat.doPow(x1, x2);
      console.log(fromBn(result).toString());    
  });

});
