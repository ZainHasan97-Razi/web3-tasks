"use strict";
// 8. Create a script that fetches all transactions executed by an address.
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
exports.AllTransactionsByAddress = void 0;
const web3_1 = __importDefault(require("web3"));
require("dotenv/config");
const InfuraRinkbey = 'https://rinkeby.infura.io/v3/388c2e54484b4d90a0a54aa9238f1db7';
const HDWalletProvider = require("@truffle/hdwallet-provider");
const EthereumTx = require("ethereumjs-tx").Transaction;
const Key1 = process.env.prvtKey1;
const Key2 = process.env.prvtKey2;
// HDWalletProvider
const provider = new HDWalletProvider(Key1, InfuraRinkbey);
const web3 = new web3_1.default(provider);
const AllTransactionsByAddress = (accountAddress) => __awaiter(void 0, void 0, void 0, function* () {
    let userTransactions = [];
    let latestBlock = yield web3.eth.getBlockNumber();
    // console.log('Block data of latest block', await web3.eth.getBlock(Number(latestBlock)));
    // return
    for (let i = 10139255; i <= Number(latestBlock); i++) {
        let blockData = yield web3.eth.getBlock(i);
        // console.log('Blockchain Data => ', blockData);
        console.log('BlockNumber=', i, 'blockData.transactions.length => ', blockData.transactions.length);
        blockData.transactions.map((v, indx) => __awaiter(void 0, void 0, void 0, function* () {
            let txDetails = yield web3.eth.getTransaction(v);
            // console.log('txDetails => ', txDetails.to);
            if (txDetails && txDetails.to) {
                if (accountAddress == txDetails.from) {
                    console.log('Hey we got a Tx at Block =>', i);
                }
            }
        }));
    }
});
exports.AllTransactionsByAddress = AllTransactionsByAddress;
