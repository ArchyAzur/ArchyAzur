import { useState, useEffect } from 'react';
import { ethers } from 'ethers';
import BIContract from './artifacts/contracts/BIContract.sol/BIContract.json';
import './App.css';
import React from 'react';

import $ from 'jquery';

const BIContractAdress = '0x5655b8da6b539Bd7b09E39658d1E3Aa420592100';

function App() {

  const [error, setError] = useState('');
  const [data, setData] = useState({});

  useEffect(() => {
    fetchData();
  }, [])

  async function fetchData() {
    if (typeof window.ethereum !== 'undefined') {
      const provider = new ethers.providers.Web3Provider(window.ethereum);
      const contract = new ethers.Contract(BIContractAdress, BIContract.abi, provider);

      try {
        const cost = await contract.cost();
        const totalSupply = await contract.totalSupply();
        const maxSupply = await contract.maxSupply();
        
        const object = {"cost" : String(cost),
                        "totalSupply" : String(totalSupply),
                      "maxSupply": String(maxSupply)};

        setData(object);
      } catch (err) {
        setError(err.message);
        console.log("Error on fetchData : " + err);
      }
    }
  }

  async function mint1Bird() {
    if (typeof window.ethereum !== 'undefined') {
      let accounts = await window.ethereum.request({method: 'eth_requestAccounts'});
      const provider = new ethers.providers.Web3Provider(window.ethereum);
      const signer = provider.getSigner();
      const contract = new ethers.Contract(BIContractAdress, BIContract.abi, signer);
      try {
        let overrides = {
          from: accounts[0],
          value: data.cost
        }
        const transaction = await contract.mint(accounts[0], 1, overrides);
        await transaction.wait();
        fetchData();
      }
      catch(err) {
        setError(err.message);
        console.log("Error on mint1Bird : " + err);
      }
    }
  }

  async function mint5Birds() {
    if (typeof window.ethereum !== 'undefined') {
      let accounts = await window.ethereum.request({method: 'eth_requestAccounts'});
      const provider = new ethers.providers.Web3Provider(window.ethereum);
      const signer = provider.getSigner();
      const contract = new ethers.Contract(BIContractAdress, BIContract.abi, signer);
      try {
        let overrides = {
          from: accounts[0],
          value: String(data.cost * 4)
        }

        const transaction = await contract.mint(accounts[0], 5, overrides);
        await transaction.wait();
        fetchData();
      }
      catch(err) {
        setError(err.message);
        console.log("Error on mint5Birds : " + err);
      }
    }
  }

  async function mint10Birds() {
    if (typeof window.ethereum !== 'undefined') {
      let accounts = await window.ethereum.request({method: 'eth_requestAccounts'});
      const provider = new ethers.providers.Web3Provider(window.ethereum);
      const signer = provider.getSigner();
      const contract = new ethers.Contract(BIContractAdress, BIContract.abi, signer);
      try {
        let overrides = {
          from: accounts[0],
          value: String(data.cost * 7)
        }

        const transaction = await contract.mint(accounts[0], 10, overrides);
        await transaction.wait();
        fetchData();
      }
      catch(err) {
        setError(err.message);
        console.log("Error on mint10Birds : " + err);
      }
    }
  }

  async function withdraw() {
    if (typeof window.ethereum !== 'undefined') {
      const provider = new ethers.providers.Web3Provider(window.ethereum);
      const signer = provider.getSigner();
      const contract = new ethers.Contract(BIContractAdress, BIContract.abi, signer);
      try {
        const transaction = await contract.withdraw();
        await transaction.wait();
        fetchData();
      }
      catch(err) {
        setError(err.message);
        console.log("Error on withdraw : " + err);
      }
    }
  }

  async function reveal() {
    if (typeof window.ethereum !== 'undefined') {
      const provider = new ethers.providers.Web3Provider(window.ethereum);
      const signer = provider.getSigner();
      const contract = new ethers.Contract(BIContractAdress, BIContract.abi, signer);
      try {

         const transaction = await contract.reveal();
         await transaction.wait();

         //const transaction = await contract.revealed();
         //console.log(transaction);

        fetchData();
      }
      catch(err) {
        setError(err.message);
        console.log("Error on reveal : " + err);
      }
    }
  }

  async function displayOwnerOnly() {
    if (typeof window.ethereum !== 'undefined') {
      try {

        const provider = new ethers.providers.Web3Provider(window.ethereum);
        const contract = new ethers.Contract(BIContractAdress, BIContract.abi, provider);
  
        const accountConnected = await provider.listAccounts();
        const contractAddress = await contract.getOwner();

        if (accountConnected[0] === contractAddress) {
          $('.ownerProperty').show();
        } else {
          $('.ownerProperty').hide();
        }
      }
      catch(err) {
        setError(err.message);
        console.log("Error on displayOwnerOnly : " + err);
      }
    } else {
      $('.ownerProperty').hide();
    }
  }

  return (
    <div>
      <div className="App" onLoad={displayOwnerOnly}>
      <button className="ownerProperty button" onClick={reveal}>Reveal NFT !!</button>
        <button className="ownerProperty button" onClick={withdraw}>Withdraw</button>
          <div className="container">
            <p>{error}</p>
            
            <div className="mintButtons">
                <button className="button" onClick={mint1Bird}>Mint 1 bird</button><br/><br/>
                <button className="button" onClick={mint5Birds}>Mint 5 birds (1 bird free)</button><br/><br/>
                <button className="button" onClick={mint10Birds}>Mint 10 birds (3 birds free)</button><br/><br/>
            </div>

            <p className="cost">Each Bird NFT cost {data.cost / 10**18} eth excluding gas price</p>
           
          </div>
      </div>
    </div>
  );
}

export default App;
