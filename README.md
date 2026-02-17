# Voting Smart Contract – Blockchain-Based Voting System

## Introduction

The Voting Smart Contract is a decentralized application built using Solidity that enables secure and transparent voting on the Ethereum blockchain.
It allows an administrator to register candidates and users to cast their votes directly through their wallet. The system ensures fairness by restricting each voter to vote only once and maintaining tamper-proof vote records.

---

## Objectives

* To provide a transparent and decentralized voting mechanism.
* To ensure that each voter can vote only once.
* To prevent duplicate candidates from the same party.
* To maintain secure and immutable vote records on the blockchain.

---

## Features

### Admin Features

* The contract deployer becomes the admin automatically.
* Add candidates with name, party, and Aadhaar details.
* Restrict multiple candidates from the same party.

### Voter Features

* Vote for a candidate using their wallet address.
* Each address can vote only once.
* Voting data is recorded permanently on the blockchain.

### Public Access

* View candidate details and vote count.
* Transparent and real-time vote tracking.

---



## Security Measures

* Only admin can add candidates.
* One vote per wallet address.
* Validation for candidate ID before voting.
* Party duplication prevention.

---

## Blockchain Integration

* Built using Solidity (version 0.8.28).
* Stores voting data on the Ethereum blockchain.
* Ensures immutability, transparency, and trust.
* Can be integrated with MetaMask and Ethers.js for frontend interaction.

---

## System Architecture

**Frontend**

* Built using React.js.
* Connects to MetaMask for wallet authentication.
* Uses Ethers.js to interact with the smart contract.

**Blockchain Layer**

* Ethereum network (Sepolia testnet).
* Smart contract manages candidates and voting logic.
* All votes are stored permanently and cannot be modified.

---



