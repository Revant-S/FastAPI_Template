# Project Overview

This project allows users to generate Solidity code based on prompts provided through a Gemini AI interface. The generated contracts are then compiled and deployed on the Etherlink blockchain. This setup integrates with MetaMask for wallet management and utilizes IPFS Pinata for storing metadata and files associated with the contracts.

# Working
- ## AI-Powered Code Generation: Generate Solidity smart contracts using Gemini AI prompts.
- ## Compilation: Automatically compile generated Solidity code using the Solidity compiler (solc).
- ## Deployment: Deploy compiled contracts to the Etherlink blockchain.
- ## MetaMask Integration: Seamlessly connect to user wallets for transaction management.
- ## IPFS Pinata Storage: Store contract metadata and related files on IPFS for decentralized access.

# Key Features and Benefits
   - ## No Coding Required
              Users can generate smart contracts without needing programming skills, making blockchain technology accessible to a broader audience
   - ## Rapid Contract Generation
              AI-driven prompts facilitate quick generation of smart contracts
   - ## Automated Processes
           The DApp automates the compilation and deployment processes,       minimizing manual intervention and speeding up the entire workflow.
   - ## Lower Transaction Fees
         Smart contracts can reduce or eliminate fees typically paid to intermediaries, making transactions more economical.
   
# Project Setup Guide

This README provides step-by-step instructions for setting up both the client and server environments for your project. Follow the instructions carefully to get everything running smoothly.

## Table of Contents
- [Client Setup](#client-setup)
- [Server Setup](#server-setup)

## Client Setup

1. **Clone the Repository**
   ```bash
   git clone https://github.com/Revant-S/FastAPI_Template/tree/master
   ```
2. **Navigate to the Client Directory**
   ```bash
   cd client
   ```
3. **Install Dependencies**
   ```bash
   npm install
   ```
4. **Start the Development Server**
   ```bash
   npm run dev
   ```
## Server Setup

1. **Navigate to the Server Directory**
   ```bash
   cd server
   ```
2. **Create a Virtual Environment**
   ```bash
     python3 -m venv myenv
   ```
3. **Activate the Virtual Environment**
      - For Linux/Mac
         ```bash
         source ./myenv/bin/activate
         ```
      - For Windows
        ```bash
         .\myenv\Scripts\activate
         ```
  
4. **Install Server Dependencies**
   ```bash
     pip install -r requirements.txt
   ```
5. **Start the Server**
   ```bash
     uvicorn main:app --reload
   ```
The server will start on port 8000, and you can access it at http://localhost:8000.

## BlockChain 
   # MetaMask Integration
      Ensure you have MetaMask installed in your browser and connected to the Etherlink network. When deploying contracts, MetaMask will prompt you to confirm transactions.
      
1. **Install Truffle Globally [For compilation of Solidity Code]**
   ```bash
     npm install -g truffle
   ```
2. **Create a New Directory **
   ```bash
     mkdir my-no-code-dapp
     cd my-no-code-dapp
   ```
3. **Initialize a New Truffle Project**
   ```bash
    truffle init
   ```
4.**Create Your Solidity Contract**
   ```bash
    touch contracts/MyContract.sol
   ```
5.**Create a Migration Script**
   ```bash
   touch migrations/2_deploy_contracts.js
   ```
6.**Compile Your Contracts**
   ```bash
    truffle compile
   ```
7.**Set Up Ganache**
If you want to test locally, install Ganache:
   ```bash
    npm install -g ganache-cli
   ```
Then run Ganache:
 ```bash
    ganache-cli
   ```
8.**Migrate Your Contracts to the Development Network**
   ```bash
   truffle migrate --network development 
   ```
9.**Interact with Your Deployed Contracte**
You can open the Truffle console to interact with your deployed contract:
   ```bash
truffle console
   ```

   
# Conclusion
This no-code DApp for generating smart contracts not only democratizes access to blockchain technology but also enhances efficiency, security, and transparency in contractual agreements. By leveraging AI and decentralized technologies, it empowers users to create robust smart contracts tailored to their specific needs while minimizing costs and risks associated with traditional contract management.
