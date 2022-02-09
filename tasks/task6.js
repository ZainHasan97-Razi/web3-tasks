"use strict";
//6. Create a function that takes tx_hash of an erc20 transfer and determines how many erc20 tokens 
// were transferred along with the sender and receiver.
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
exports.GetTransferTxDetails = void 0;
const web3_1 = __importDefault(require("web3"));
require("dotenv/config");
const InfuraRinkbey = 'https://rinkeby.infura.io/v3/388c2e54484b4d90a0a54aa9238f1db7';
const HDWalletProvider = require("@truffle/hdwallet-provider");
const Key1 = process.env.prvtKey1;
const Key2 = process.env.prvtKey2;
// HDWalletProvider
const provider = new HDWalletProvider(Key1, InfuraRinkbey);
const web3 = new web3_1.default(provider);
const GetTransferTxDetails = (txHash) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        let resp = yield web3.eth.getTransaction(txHash);
        console.log('Tx Detailss', resp);
        let inputAmount = web3.utils.hexToNumberString('0x' + resp.input.toString().slice(74, 138));
        inputAmount = web3.utils.fromWei(inputAmount);
        // console.log('Amountt ==>>> ',
        //   inputAmount);
        if (resp) {
            console.log(`${inputAmount} Phnx were transfered from ${resp.from} to the address ${resp.to}`);
        }
    }
    catch (e) {
        console.log('Err at GetTxDetails', e);
    }
});
exports.GetTransferTxDetails = GetTransferTxDetails;
