"use strict";
//7.  Create a script to send a transaction with a very low gas price and then create 
// a script to speed up or cancel that transaction.
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
exports.SendTxAtLowGas = void 0;
const web3_1 = __importDefault(require("web3"));
require("dotenv/config");
const ERC20_ABI_1 = require("../ERC20_ABI");
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
// const tokenAddress = "0xF5C638B9E09727D714Aca185B657F691b4E24ddc" // Shahbaz
const initContract = () => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const TOKEN = new web3.eth.Contract(ERC20_ABI_1.ERC20_ABI, tokenAddress);
        return TOKEN;
    }
    catch (err) {
        console.log("Err in contract init =>", err);
    }
});
const getCurrentGasPrices = () => __awaiter(void 0, void 0, void 0, function* () {
    let response = yield axios_1.default.get('https://ethgasstation.info/json/ethgasAPI.json');
    let prices = {
        low: response.data.safeLow / 10,
        medium: response.data.average / 10,
        high: response.data.fast / 10
    };
    return prices;
});
const SendTxAtLowGas = (fromAccount, toAccount) => __awaiter(void 0, void 0, void 0, function* () {
    const transferAmount = "100";
    let Nonce = yield web3.eth.getTransactionCount(fromAccount);
    console.log('Nonceeeeeeeeeeeeeee', Nonce);
    let TokenContract = yield initContract();
    let txObject = {
        from: fromAccount,
        nonce: Nonce,
        gasLimit: 210000,
        gasPrice: web3.utils.toWei("10", "gwei"),
    };
    // let resp = await TokenContract?.methods.mint(fromAccount, '1000').send({from: toAccount, to: tokenAddress, gas: 50000})
    // console.log('Mint response => ', resp);
    let res = yield (TokenContract === null || TokenContract === void 0 ? void 0 : TokenContract.methods.transfer(toAccount, transferAmount).send(txObject));
    console.log('TransferMethodPhnx Response => ', res);
    yield CancelTransaction(fromAccount, Nonce);
});
exports.SendTxAtLowGas = SendTxAtLowGas;
const CancelTransaction = (fromAccount, Nonce) => __awaiter(void 0, void 0, void 0, function* () {
    // let Nonce = await web3.eth.getTransactionCount(fromAccount);
    let gasPrices = yield getCurrentGasPrices();
    let txObject = {
        from: fromAccount,
        nonce: Nonce,
        gasLimit: 210000,
        gasPrice: gasPrices.high * 1000000000,
    };
    const transaction = new EthereumTx(txObject, { chain: "rinkeby" });
    let privateKey = Key1.toString().split("0x");
    // console.log('privateKey after splittttttttttt', privateKey);
    let privKey = Buffer.from(privateKey[0], "hex");
    transaction.sign(privKey);
    const serializedTransaction = yield transaction.serialize();
    web3.eth.sendSignedTransaction("0x" + serializedTransaction.toString("hex"), (err, id) => {
        if (err) {
            console.log(err);
        }
        const url = `https://rinkeby.etherscan.io/tx/${id}`;
        console.log(url);
    });
});
