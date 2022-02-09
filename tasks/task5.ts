

//5.  Create a function that takes tx-hash as input and outputs whether the transaction 
// is confirmed or failed, if confirmed display the amount of tx_fees incurred.

import Web3 from 'web3'
import 'dotenv/config'
const InfuraRinkbey = 'https://rinkeby.infura.io/v3/388c2e54484b4d90a0a54aa9238f1db7'
const HDWalletProvider = require("@truffle/hdwallet-provider");

const Key1:string = process.env.prvtKey1!;
const Key2:string = process.env.prvtKey2!;

// HDWalletProvider
const provider = new HDWalletProvider(Key1, InfuraRinkbey)
const web3 = new Web3(provider);


export const GetTxDetails:Function = async (txHash:string) => {
    try {
        let resp = await web3.eth.getTransactionReceipt(txHash)
        // console.log('Tx Detailss', resp);
        if(resp.status) {
            console.log("This Transaction was confirmed!!");
            console.log("Gas fees incured was: ", Web3.utils.fromWei(resp.gasUsed.toString()), "Eth");
        } else {
            console.log("This Transaction was failed!!");
        }
    } catch(e){
        console.log('Err at GetTxDetails', e);
    }
}







