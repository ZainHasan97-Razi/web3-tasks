"use strict";
//4.  Create a dynamic function that takes contract address, 
// events name and subscribes to the event defined.
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
exports.SubscribeEvent = void 0;
const web3_1 = __importDefault(require("web3"));
require("dotenv/config");
const InfuraRinkbey = 'wss://rinkeby.infura.io/ws/v3/4d0a070e46394bcbaef4723ed9e1532c';
const HDWalletProvider = require("@truffle/hdwallet-provider");
const Key1 = process.env.prvtKey1;
const Key2 = process.env.prvtKey2;
// HDWalletProvider
const provider = new HDWalletProvider(Key1, InfuraRinkbey);
// const web3 = new Web3(provider);
const web3 = new web3_1.default(new web3_1.default.providers.WebsocketProvider(InfuraRinkbey));
web3.eth.accounts.wallet.add(Key1);
const SubscribeEvent = (contractAddress, contractABI, eventName, startBlock, endBlock) => __awaiter(void 0, void 0, void 0, function* () {
    let options = {
        fromBlock: startBlock,
        // eventName:"Approval",
        address: contractAddress,
        topics: ["0xc59c475c058d1be347a4986e07026cc513132cebe3ea96ad0c360b4544e03067"] //What topics to subscribe to
    };
    // return
    let subscription = web3.eth.subscribe('logs', options, (err, event) => {
        if (!err) {
            console.log('subscription event =>> ', event);
        }
        console.log('Errr', err);
    });
    // console.log('Resp subscription => ', subscription);
});
exports.SubscribeEvent = SubscribeEvent;
