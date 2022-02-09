"use strict";
// 10.	Create a function that inputs a contract address and output the deployer’s address.
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
exports.GetDeployerAddress = void 0;
const web3_1 = __importDefault(require("web3"));
require("dotenv/config");
const InfuraRinkbey = 'https://rinkeby.infura.io/v3/388c2e54484b4d90a0a54aa9238f1db7';
const HDWalletProvider = require("@truffle/hdwallet-provider");
const axios_1 = __importDefault(require("axios"));
const EthereumTx = require("ethereumjs-tx").Transaction;
const Key1 = process.env.prvtKey1;
const Key2 = process.env.prvtKey2;
// HDWalletProvider
const provider = new HDWalletProvider(Key1, InfuraRinkbey);
const web3 = new web3_1.default(provider);
const tokenAddress = "0x521855AA99a80Cb467A12b1881f05CF9440c7023"; // phnx
const initContract = (ContractAddress, ABI) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const TOKEN = new web3.eth.Contract(ABI, ContractAddress);
        return TOKEN;
    }
    catch (err) {
        console.log("Err in contract init =>", err);
    }
});
const GetDeployerAddress = (ContractAddress, ABI) => __awaiter(void 0, void 0, void 0, function* () {
    const contractCreationTx = "0x629b3970eae2e465c6ee4b77dfba00a1fd025650a185547a41b2fa6d5f3b93f7";
    let EndBlock = yield web3.eth.getBlockNumber();
    let TxList = yield axios_1.default.get(`https://api-rinkeby.etherscan.io/api?module=account&action=txlist&address=${ContractAddress}&startblock=0&endblock=${EndBlock}&page=1&offset=3&sort=asc&apikey=6ZBV147DR5TC38EI8JFBJ57TWAJ2QX9SFH`);
    console.log('TxList ==>>>>>>>> ', TxList.data.result[0].hash);
    let Contract = yield initContract(ContractAddress, ABI);
    // console.log('Tx Data ==>>>> ', await Contract.getTransactionCount())
    // let earltTx = await web3.eth.getTransactionFromBlock('10047122', 0)
    // console.log('earltTx ==>> ', earltTx);
    let resp = yield web3.eth.getTransactionReceipt(TxList.data.result[0].hash);
    console.log('Contract Owner =>> ', resp.from);
    //    web3.eth.getTransaction()
});
exports.GetDeployerAddress = GetDeployerAddress;
