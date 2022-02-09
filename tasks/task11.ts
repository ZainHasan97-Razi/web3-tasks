
// 11.  Create a script that calculates the current number of token holders of a particular token.

import Web3 from 'web3'
import 'dotenv/config'
import { ERC20_ABI } from '../ERC20_ABI';
const InfuraRinkbey = 'https://rinkeby.infura.io/v3/388c2e54484b4d90a0a54aa9238f1db7'
const HDWalletProvider = require("@truffle/hdwallet-provider");
import axios from 'axios'
import { count } from 'console';
const EthereumTx = require("ethereumjs-tx").Transaction;

const Key1:string = process.env.prvtKey1!;
const Key2:string = process.env.prvtKey2!;

// HDWalletProvider
const provider = new HDWalletProvider(Key1, InfuraRinkbey)
const web3 = new Web3(provider);

const tokenAddress = "0x521855AA99a80Cb467A12b1881f05CF9440c7023" // phnx

const initContract:Function = async () => {
    try {
      const TOKEN = new web3.eth.Contract(
        ERC20_ABI,
        tokenAddress
      );
      return TOKEN;
    } catch (err) {
      console.log("Err in contract init =>", err);
    }
};

let userCount = 0;

const CheckBalanceWithBalanceOf:Function = async (address:string) => {
  let TokenContract = await initContract();
  let balance = web3.utils.fromWei(await TokenContract?.methods.balanceOf(address).call());
  // console.log('BalanceOf =>> ', address, ' => ', balance);
  // if(Number(balance) > 0){
  //   userCount++;
  // }
  return balance;
}

export const NumberOfTokenHolders = async (tokenAddress:string) => {
    let Contract = await initContract()
     let resp = await Contract.getPastEvents('Transfer', {
         fromBlock:9227843, // First block token was created at
         toBlock: 'latest'
    })
    // console.log('resppppppppppppppppppp', resp.length);

    let allAddresses:Array<any> = [];

    resp.map((v:any, i:number) => {
        // userCount ++;
        allAddresses.push(v.returnValues.from)
    })

    let UsersThatHoldSomeTokens:Array<any> = []

    allAddresses.map(async(v:any, i:number) => {
      let balance = await CheckBalanceWithBalanceOf(v)
      // console.log('Balances returned => ', balance);
      
      if(Number(balance) > 0){
        userCount++;
        UsersThatHoldSomeTokens.push(v)
      }
      if(i == allAddresses.length - 1){
        console.log('Length of users that still hold some token =>>> ', userCount);
      }
    })
    

    console.log('Length of all addresses', allAddresses.length);

    // console.log('Length of users that hold tokens', UsersThatHoldSomeTokens.length);

    // console.log('UserCount =>>> ', userCount);
    
    // console.log('Detailssssssssss ', resp[0].returnValues.from);

}






