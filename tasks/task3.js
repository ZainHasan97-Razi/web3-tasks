"use strict";
// 3. Create a dynamic function that takes contract address, event name, start block, end block as input and 
// then fetches the events of the contracts address defined. Also perform filtration on the events fetched.
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.fetchEvents = void 0;
const web3_1 = __importDefault(require("web3"));
require("dotenv/config");
const InfuraRinkbey = 'https://rinkeby.infura.io/v3/388c2e54484b4d90a0a54aa9238f1db7';
const HDWalletProvider = require("@truffle/hdwallet-provider");
const Key1 = process.env.prvtKey1;
const Key2 = process.env.prvtKey2;
// HDWalletProvider
const provider = new HDWalletProvider(Key1, InfuraRinkbey);
const web3 = new web3_1.default(provider);
const initEventsContract = (contractAddress, contractABI) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const contract = new web3.eth.Contract(contractABI, contractAddress);
        return contract;
    }
    catch (err) {
        console.log("Err in contract init =>", err);
    }
});
const fetchEvents = (contractAddress, contractABI, eventName, startBlock, endBlock) => __awaiter(void 0, void 0, void 0, function* () {
    const contract = yield initEventsContract(contractAddress, contractABI);
    // console.log('contract?.getPastEvents', contract?.getPastEvents);
    // Works on web3.js@1.0.0-beta.34:
    // console.log('contract?.getPastEvents', contract?.events.allEvents);
    // return
    let events = yield (contract === null || contract === void 0 ? void 0 : contract.getPastEvents(eventName, {
        // filter: {myIndexedParam: [0,5], myOtherIndexedParam: '0x74E7330850c512c5364339f26DB089C931F52c27'}, // Using an array means OR: e.g. 20 or 23
        fromBlock: startBlock,
        toBlock: endBlock
    }, function (error, events) {
        //  console.log(events); 
    }));
    console.log('events list =>> ', events === null || events === void 0 ? void 0 : events.length);
});
exports.fetchEvents = fetchEvents;
