// 10.	Create a function that inputs a contract address and output the deployer’s address.

import Web3 from 'web3'
import 'dotenv/config'
import { ERC20_ABI } from '../ERC20_ABI';
const InfuraRinkbey = 'https://rinkeby.infura.io/v3/388c2e54484b4d90a0a54aa9238f1db7'
const HDWalletProvider = require("@truffle/hdwallet-provider");
import axios from 'axios'
const EthereumTx = require("ethereumjs-tx").Transaction;

const Key1:string = process.env.prvtKey1!;
const Key2:string = process.env.prvtKey2!;

// HDWalletProvider
const provider = new HDWalletProvider(Key1, InfuraRinkbey)
const web3 = new Web3(provider);

const tokenAddress = "0x521855AA99a80Cb467A12b1881f05CF9440c7023" // phnx

const initContract:Function = async (ContractAddress:string, ABI:any) => {
    try {
      const TOKEN = new web3.eth.Contract(
        ABI,
        ContractAddress
      );
      return TOKEN;
    } catch (err) {
      console.log("Err in contract init =>", err);
    }
};

export const GetDeployerAddress = async (ContractAddress:string, ABI:any) => {
    const contractCreationTx = "0x629b3970eae2e465c6ee4b77dfba00a1fd025650a185547a41b2fa6d5f3b93f7"
    let EndBlock = await web3.eth.getBlockNumber()
    let TxList = await axios.get(`https://api-rinkeby.etherscan.io/api?module=account&action=txlist&address=${ContractAddress}&startblock=0&endblock=${EndBlock}&page=1&offset=3&sort=asc&apikey=6ZBV147DR5TC38EI8JFBJ57TWAJ2QX9SFH`)
    console.log('TxList ==>>>>>>>> ', TxList.data.result[0].hash);
    

    let Contract = await initContract(ContractAddress, ABI)
    // console.log('Tx Data ==>>>> ', await Contract.getTransactionCount())
    // let earltTx = await web3.eth.getTransactionFromBlock('10047122', 0)
    // console.log('earltTx ==>> ', earltTx);
    
    let resp = await web3.eth.getTransactionReceipt(TxList.data.result[0].hash)

   console.log('Contract Owner =>> ', resp.from);

//    web3.eth.getTransaction()
   
}





