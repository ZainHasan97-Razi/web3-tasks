"use strict";
// 11.  Create a script that calculates the current number of token holders of a particular token.
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
exports.NumberOfTokenHolders = void 0;
const web3_1 = __importDefault(require("web3"));
require("dotenv/config");
const ERC20_ABI_1 = require("../ERC20_ABI");
const InfuraRinkbey = 'https://rinkeby.infura.io/v3/388c2e54484b4d90a0a54aa9238f1db7';
const HDWalletProvider = require("@truffle/hdwallet-provider");
const EthereumTx = require("ethereumjs-tx").Transaction;
const Key1 = process.env.prvtKey1;
const Key2 = process.env.prvtKey2;
// HDWalletProvider
const provider = new HDWalletProvider(Key1, InfuraRinkbey);
const web3 = new web3_1.default(provider);
const tokenAddress = "0x521855AA99a80Cb467A12b1881f05CF9440c7023"; // phnx
const initContract = () => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const TOKEN = new web3.eth.Contract(ERC20_ABI_1.ERC20_ABI, tokenAddress);
        return TOKEN;
    }
    catch (err) {
        console.log("Err in contract init =>", err);
    }
});
let userCount = 0;
const CheckBalanceWithBalanceOf = (address) => __awaiter(void 0, void 0, void 0, function* () {
    let TokenContract = yield initContract();
    let balance = web3.utils.fromWei(yield (TokenContract === null || TokenContract === void 0 ? void 0 : TokenContract.methods.balanceOf(address).call()));
    // console.log('BalanceOf =>> ', address, ' => ', balance);
    // if(Number(balance) > 0){
    //   userCount++;
    // }
    return balance;
});
const NumberOfTokenHolders = (tokenAddress) => __awaiter(void 0, void 0, void 0, function* () {
    let Contract = yield initContract();
    let resp = yield Contract.getPastEvents('Transfer', {
        fromBlock: 9227843,
        toBlock: 'latest'
    });
    // console.log('resppppppppppppppppppp', resp.length);
    let allAddresses = [];
    resp.map((v, i) => {
        // userCount ++;
        allAddresses.push(v.returnValues.from);
    });
    let UsersThatHoldSomeTokens = [];
    allAddresses.map((v, i) => __awaiter(void 0, void 0, void 0, function* () {
        let balance = yield CheckBalanceWithBalanceOf(v);
        // console.log('Balances returned => ', balance);
        if (Number(balance) > 0) {
            userCount++;
            UsersThatHoldSomeTokens.push(v);
        }
        if (i == allAddresses.length - 1) {
            console.log('Length of users that still hold some token =>>> ', userCount);
        }
    }));
    console.log('Length of all addresses', allAddresses.length);
    // console.log('Length of users that hold tokens', UsersThatHoldSomeTokens.length);
    // console.log('UserCount =>>> ', userCount);
    // console.log('Detailssssssssss ', resp[0].returnValues.from);
});
exports.NumberOfTokenHolders = NumberOfTokenHolders;
