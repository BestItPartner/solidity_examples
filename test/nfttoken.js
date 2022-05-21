const { expect } = require("chai");
const { ethers } = require("hardhat");
const {MerkleTree } = require('merkletreejs');
const keccak256 = require('keccak256');

describe("TestNFTToken", function () {  

  it("Should return checking result of whitelist addresses", async function () {
    const MyToken = await ethers.getContractFactory("MyToken");
    const nftToken = await MyToken.deploy();
    await nftToken.deployed();
    console.log('nftToken: ', nftToken.address);

    const whitelists = [
      "address1", 
      "address2", 
      "address3", 
      "address4", 
      "address5"
    ];

    const leafNodes = whitelists.map(addr => keccak256(addr));
    const merkleTree = new MerkleTree(leafNodes, keccak256, {sortPairs: true});
    const rootHash = merkleTree.getRoot();
    await nftToken.setRoot(rootHash);

    const testLeaf = leafNodes[0];
    const hexProof = merkleTree.getHexProof(testLeaf);
    expect(await nftToken.isValid(hexProof, testLeaf)).to.equal(true);

    const testInvalidLeaf = keccak256("invalid address");
    expect(await nftToken.isValid(hexProof, testInvalidLeaf)).to.equal(false);
  });
});
