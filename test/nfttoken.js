const { expect } = require("chai");
const { ethers } = require("hardhat");
const { MerkleTree } = require('merkletreejs');
const keccak256 = require('keccak256');

describe("TestNFTToken", function () {  
  let nftToken;
  let signers;

  beforeEach(async () => {    
    if (nftToken == null) {
      signers = await ethers.getSigners();

      const MyToken = await ethers.getContractFactory("MyToken");
      nftToken = await MyToken.deploy();
      await nftToken.deployed();
      console.log('nftToken: ', nftToken.address);
    }
  });

  it("Should return checking result of whitelist addresses", async function () {
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

    merkleTree.addLeaf(testInvalidLeaf);
    const newRootHash = merkleTree.getRoot();
    await nftToken.setRoot(newRootHash);
    const newHexProof = merkleTree.getHexProof(testInvalidLeaf);
    expect(await nftToken.isValid(newHexProof, testInvalidLeaf)).to.equal(true);    
  });

  it("Sould returh checking result using Signature and message hash", async () => {
    const message = "example message";
    const messagehash = keccak256(message);
    const signature = await signers[0].signMessage(messagehash);

    expect(await nftToken.isValidSignature(signers[0].address, messagehash, signature)).to.equal(true);
  });

});
