

//6. Create a function that takes tx_hash of an erc20 transfer and determines how many erc20 tokens 
// were transferred along with the sender and receiver.

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


export const GetTransferTxDetails:Function = async (txHash:string) => {
    try {
        let resp = await web3.eth.getTransaction(txHash)
        console.log('Tx Detailss', resp);
        let inputAmount = web3.utils.hexToNumberString('0x'+resp.input.toString().slice(74,138));
        inputAmount = web3.utils.fromWei(inputAmount);
    
        // console.log('Amountt ==>>> ',
        //   inputAmount);
        
        if(resp) {
            console.log( `${inputAmount} Phnx were transfered from ${resp.from} to the address ${resp.to}`);
        }
       
    } catch(e){
        console.log('Err at GetTxDetails', e);
    }
}







