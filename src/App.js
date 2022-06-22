import React, { useState, useEffect } from 'react';
import './w3.css';
import './style.css';
import { ethers } from 'ethers';
import abi from '../utils/Transaction.json';
import conv from 'cryptounit-converter';
import Modal from './components/Modal';

export default function App() {
  const { ethereum } = window;
  const contractABI = abi.output.abi;
  // console.log(contractABI);
  const contractAddress = '0xa19430A79255B56f445b919F5634E210400218D2';

  // send ethereum

  const [ethAccount, setEthAccount] = useState('');

  const [name, setName] = useState('');
  const [toggle, setToggle] = useState(true);
  const [count, setCount] = useState(0);
  let amount = ethers.utils.parseEther('10');

  const getContract = () => {
    const provider = new ethers.providers.Web3Provider(ethereum);
    // const provider = new ethers.getDefaultProvider();
    const signer = provider.getSigner();
    const transactionContract = new ethers.Contract(
      contractAddress,
      contractABI,
      signer
    );

    // console.log(transactionContract);
    return transactionContract;
  };

  const connectWallet = async () => {
    // check if Metamask is installed
    try {
      if (!ethereum) return alert('Please install MetaMask.');
      // const provider = new ethers.providers.Web3Provider(ethereum, 'ropsten');
      // await provider.send('eth_requestAccounts', []);
      // const signer = provider.getSigner();
      // const userAddress = await signer.getAddress();
      const accounts = await ethereum.request({
        method: 'eth_accounts',
      });
      console.log(accounts);
      console.log(ethereum.isConnected());
      // setEthAccount(accounts);
      ethereum.on('accountsChanged', async () => {
        console.log('Changed accounts');
        const acc = await ethereum.request({ method: 'eth_accounts' });
        console.log(acc, 'Changed');
      });
      // const contract = await getContract();
      // console.log(contract);
    } catch (error) {
      console.log(error);
    }
  };
  const getTransactions = async () => {
    const contract = await getContract();
    const trans = await contract.updateArr();
    const txwait = await trans.wait();
    console.log(txwait);
  };
  const makeTransaction = async () => {
    // contractApi = getContract();
    const parsedAmount = ethers.utils.parseEther(0.0005);
    try {
      await ethereum.request({
        method: 'eth_sendTransaction',
        params: [
          {
            from: '0x1D3E0725bD6dAf542C780AeDF28553B399556697',
            to: '0xccA6BBb221c3195BdB56F07f720752db000B1E3A',
            gas: '0x5208',
            value: parsedAmount._hex,
          },
        ],
      });
    } catch (e) {
      console.log(e);
    }
  };

  return (
    <div className="container">
      <div className="header">
        <h2>Smart Contract Dapps</h2>
        {ethAccount ? (
          <button
            onClick={connectWallet}
            style={{ outline: 'none', border: 'none' }}
          >
            Connected Wallet
          </button>
        ) : (
          <button onClick={connectWallet}> Connect Wallet</button>
        )}
      </div>
      {ethAccount ? <p> Your connected wallet is: {ethAccount} </p> : ''}
      <div className="card">
        <input
          className="w3-input"
          type="text"
          onChange={(e) => {
            setName(e.target.value);
          }}
          placeholder="Enter eth address"
        />
        <p style={toggle ? { display: 'none' } : { display: 'block' }}>Hello</p>
        <button
          onClick={() => {
            setToggle(!toggle);
          }}
        >
          Send 2 eth
        </button>
      </div>
      <Modal />
      <button onClick={getTransactions}>Get Transactions</button>
    </div>
  );
}
