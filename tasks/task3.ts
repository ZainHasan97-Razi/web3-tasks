
// 3. Create a dynamic function that takes contract address, event name, start block, end block as input and 
// then fetches the events of the contracts address defined. Also perform filtration on the events fetched.

import Web3 from 'web3'
import 'dotenv/config'
const InfuraRinkbey = 'https://rinkeby.infura.io/v3/388c2e54484b4d90a0a54aa9238f1db7'
const HDWalletProvider = require("@truffle/hdwallet-provider");

const Key1:string = process.env.prvtKey1!;
const Key2:string = process.env.prvtKey2!;

// HDWalletProvider
const provider = new HDWalletProvider(Key1, InfuraRinkbey)
const web3 = new Web3(provider);

const initEventsContract:Function = async (contractAddress:string, contractABI:any) => {
    try {
      const contract = new web3.eth.Contract(
        contractABI,
        contractAddress
      );
      return contract;
    } catch (err) {
      console.log("Err in contract init =>", err);
    }
};

export const fetchEvents:Function = async (contractAddress:string, contractABI:any, eventName:string, startBlock:number, endBlock:number) => {
    const contract = await initEventsContract(contractAddress, contractABI)
    // console.log('contract?.getPastEvents', contract?.getPastEvents);

    // Works on web3.js@1.0.0-beta.34:
    // console.log('contract?.getPastEvents', contract?.events.allEvents);
    
    // return
    let events = await contract?.getPastEvents(eventName, {
        // filter: {myIndexedParam: [0,5], myOtherIndexedParam: '0x74E7330850c512c5364339f26DB089C931F52c27'}, // Using an array means OR: e.g. 20 or 23
        fromBlock: startBlock,
        toBlock: endBlock
    }, function(error:any, events:Array<object> | null){
        //  console.log(events); 
    })

    console.log('events list =>> ', events?.length)
}