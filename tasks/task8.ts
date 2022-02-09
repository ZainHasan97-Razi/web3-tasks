
// 8. Create a script that fetches all transactions executed by an address.

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

export const AllTransactionsByAddress:Function = async (accountAddress:string) => {

    let userTransactions:Array<string> = []
    let latestBlock = await web3.eth.getBlockNumber()

    // console.log('Block data of latest block', await web3.eth.getBlock(Number(latestBlock)));
    
// return
    for(let i=10139255; i <= Number(latestBlock); i++) {
        let blockData = await web3.eth.getBlock(i)
        // console.log('Blockchain Data => ', blockData);
        
        console.log('BlockNumber=', i,'blockData.transactions.length => ', blockData.transactions.length);
        
        blockData.transactions.map(async (v:string, indx:number) => { // v = transactionHash we get from iterating over each block's transaction
            let txDetails = await web3.eth.getTransaction(v)
            // console.log('txDetails => ', txDetails.to);
            if(txDetails && txDetails.to){
                if(accountAddress == txDetails.from){
                    console.log('Hey we got a Tx at Block =>', i);
                }
            }
        })
    }
}




