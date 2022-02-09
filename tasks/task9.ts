//9.  Create a script that fetches all erc20 token transfers of a particular token

import Web3 from 'web3'
import 'dotenv/config'
import { ERC20_ABI } from '../ERC20_ABI';
const InfuraRinkbey = 'https://rinkeby.infura.io/v3/388c2e54484b4d90a0a54aa9238f1db7'
const HDWalletProvider = require("@truffle/hdwallet-provider");

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

export const GetListOfAllTokenTransfers = async () => {
    let Contract = await initContract()
     let resp = await Contract.getPastEvents('Transfer', {
         fromBlock:10108767,
         toBlock: 'latest'
    })
    // .on('data', function(event:any) {
    //     console.log('Events of transfer =>>>> ', event); // same results as the optional callback above
    // })
    console.log('resppppppppppppppppppp', resp);
}