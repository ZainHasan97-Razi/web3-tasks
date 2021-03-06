//7.  Create a script to send a transaction with a very low gas price and then create 
// a script to speed up or cancel that transaction.

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
// const tokenAddress = "0xF5C638B9E09727D714Aca185B657F691b4E24ddc" // Shahbaz

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

const getCurrentGasPrices = async () => {
    let response = await axios.get('https://ethgasstation.info/json/ethgasAPI.json');
    let prices = {
      low: response.data.safeLow / 10,
      medium: response.data.average / 10,
      high: response.data.fast / 10
    };
    return prices;
  }

export const SendTxAtLowGas = async (fromAccount:string, toAccount:string) => {
    const transferAmount = "100";
    let Nonce = await web3.eth.getTransactionCount(fromAccount);
    console.log('Nonceeeeeeeeeeeeeee', Nonce);
    
    
    let TokenContract = await initContract()!;
    let txObject = {
        from: fromAccount,
        nonce: Nonce,
        gasLimit: 210000,
        gasPrice: web3.utils.toWei("10", "gwei"),
      }
  
    // let resp = await TokenContract?.methods.mint(fromAccount, '1000').send({from: toAccount, to: tokenAddress, gas: 50000})
    // console.log('Mint response => ', resp);
    
    let res = TokenContract?.methods.transfer(toAccount, transferAmount).send(txObject)
    console.log('TransferMethodPhnx Response => ', res);

    await CancelTransaction(fromAccount, Nonce)
}

const CancelTransaction = async (fromAccount:string, Nonce:number) => {
    // let Nonce = await web3.eth.getTransactionCount(fromAccount);
    let gasPrices = await getCurrentGasPrices()

    let txObject = {
        from: fromAccount,
        nonce: Nonce,
        gasLimit: 210000,
        gasPrice: gasPrices.high * 1000000000,
    }

    const transaction = new EthereumTx(txObject, { chain: "rinkeby" });
    let privateKey = Key1.toString().split("0x");
    // console.log('privateKey after splittttttttttt', privateKey);
    
    let privKey = Buffer.from(privateKey[0], "hex");
    transaction.sign(privKey);

    const serializedTransaction = await transaction.serialize();

    web3.eth.sendSignedTransaction(
        "0x" + serializedTransaction.toString("hex"),
        (err, id) => {
          if (err) {
            console.log(err);
          }
          const url = `https://rinkeby.etherscan.io/tx/${id}`;
          console.log(url);
        }
    );

}








