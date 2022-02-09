//4.  Create a dynamic function that takes contract address, 
// events name and subscribes to the event defined.

import Web3 from 'web3'
import 'dotenv/config'
const InfuraRinkbey = 'wss://rinkeby.infura.io/ws/v3/4d0a070e46394bcbaef4723ed9e1532c'
const HDWalletProvider = require("@truffle/hdwallet-provider");

const Key1:string = process.env.prvtKey1!;
const Key2:string = process.env.prvtKey2!;

// HDWalletProvider
const provider = new HDWalletProvider(Key1, InfuraRinkbey)
// const web3 = new Web3(provider);
const web3 = new Web3(new Web3.providers.WebsocketProvider(InfuraRinkbey))

web3.eth.accounts.wallet.add(Key1);

export const SubscribeEvent:Function = async (contractAddress:string, contractABI:any, eventName:string, startBlock:number, endBlock:number) => {

    let options = {
        fromBlock: startBlock,
        // eventName:"Approval",
        address: contractAddress,    //Only get events from specific addresses
        topics: ["0xc59c475c058d1be347a4986e07026cc513132cebe3ea96ad0c360b4544e03067"]                              //What topics to subscribe to
    }
    
// return
    let subscription = web3.eth.subscribe('logs', options, (err,event) => {
        if (!err){
            console.log('subscription event =>> ', event)
        }
        console.log('Errr', err);
    })
    // console.log('Resp subscription => ', subscription);
    
}






