
// TASK #2
// Write a web3 script to interact with an ERC20 token contract and execute its 
// transfer,transferFrom, approve, allowance and balanceOf functions.

import { ERC20_ABI } from "../ERC20_ABI";
import Web3 from 'web3'
import 'dotenv/config'
const InfuraRinkbey = 'https://rinkeby.infura.io/v3/388c2e54484b4d90a0a54aa9238f1db7'
const HDWalletProvider = require("@truffle/hdwallet-provider");

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

// (account1)=> is owner while (account)=> 2 is Spender
export const CheckTokenApproval:Function = async (account1:string, account2:string) => { 
  let TokenContract = await initContract()
  const allowance = await TokenContract?.methods.allowance(account1, account2).call(); // checking allowance for address2 to allow spending phnx of address1
  console.log('Allowancee ==>>>> ', allowance);
  if(allowance != 0) {
    return true
  } else {
    return false
  }
};

// await TokenContract?.methods.approve(account2, amount) // If we are connected to metemask we have account1 address which is 
// owner wallet address whose tokens are being allowing for account2 but in script we will use .send() to mention owner
export const GiveTokenApproval:Function = async (account1:string, account2:string) => {
  const amount = 1;
  try {
    let TokenContract = await initContract();
    let response = await TokenContract?.methods.approve(account2, amount.toString()).send({from: account1, to: tokenAddress, gas: 50000})
    // console.log('jjjjjjjjjjjjjjjjjj', response);

    return response;
  } catch(e) {
    console.error('Error at GiveTokenApproval', e)
  }
};

export const CheckPhnxBalanceWithBalanceOf:Function = async (Defination:string, address:string) => {
  let TokenContract = await initContract();
  console.log(Defination, web3.utils.fromWei(await TokenContract?.methods.balanceOf(address).call()));
}

// Transfer
export const TransferMethodPhnx = async (fromAccount:string, toAccount:string) => {
  const transferAmount = "1";
  CheckPhnxBalanceWithBalanceOf('Balancee of acc1 fromAccount', fromAccount)
  CheckPhnxBalanceWithBalanceOf('Balancee of acc2 toAccount', toAccount)
  
  let TokenContract = await initContract()!;

  // let resp = await TokenContract?.methods.mint(fromAccount, '1000').send({from: toAccount, to: tokenAddress, gas: 50000})
  // console.log('Mint response => ', resp);
  
  let res = await TokenContract?.methods.transfer(toAccount, transferAmount).send({from:fromAccount, gasLimit: 200000})
  console.log('TransferMethodPhnx Response => ', res);
}

// Transfer From
// in .send() method we don't provide owner address at from: key but instead we provide address which is allowed to spend that token of some owner
export const TransferFromMethodPhnx:Function = async (fromAccount:string, toAccount:string) => {
  const transferAmount = "1";
  CheckPhnxBalanceWithBalanceOf('Balancee of acc1 fromAccount', fromAccount)
  CheckPhnxBalanceWithBalanceOf('Balancee of acc2 toAccount', toAccount)
  
  let TokenContract = await initContract()!;
  
  let res = await TokenContract?.methods.transferFrom(fromAccount, toAccount, transferAmount).send({from:fromAccount, gasLimit: 200000})
  console.log('TransferMethodPhnx Response => ', res);
}



