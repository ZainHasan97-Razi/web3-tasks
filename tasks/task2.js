"use strict";
// TASK #2
// Write a web3 script to interact with an ERC20 token contract and execute its 
// transfer,transferFrom, approve, allowance and balanceOf functions.
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
exports.TransferFromMethodPhnx = exports.TransferMethodPhnx = exports.CheckPhnxBalanceWithBalanceOf = exports.GiveTokenApproval = exports.CheckTokenApproval = void 0;
const ERC20_ABI_1 = require("../ERC20_ABI");
const web3_1 = __importDefault(require("web3"));
require("dotenv/config");
const InfuraRinkbey = 'https://rinkeby.infura.io/v3/388c2e54484b4d90a0a54aa9238f1db7';
const HDWalletProvider = require("@truffle/hdwallet-provider");
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
// (account1)=> is owner while (account)=> 2 is Spender
const CheckTokenApproval = (account1, account2) => __awaiter(void 0, void 0, void 0, function* () {
    let TokenContract = yield initContract();
    const allowance = yield (TokenContract === null || TokenContract === void 0 ? void 0 : TokenContract.methods.allowance(account1, account2).call()); // checking allowance for address2 to allow spending phnx of address1
    console.log('Allowancee ==>>>> ', allowance);
    if (allowance != 0) {
        return true;
    }
    else {
        return false;
    }
});
exports.CheckTokenApproval = CheckTokenApproval;
// await TokenContract?.methods.approve(account2, amount) // If we are connected to metemask we have account1 address which is 
// owner wallet address whose tokens are being allowing for account2 but in script we will use .send() to mention owner
const GiveTokenApproval = (account1, account2) => __awaiter(void 0, void 0, void 0, function* () {
    const amount = 1;
    try {
        let TokenContract = yield initContract();
        let response = yield (TokenContract === null || TokenContract === void 0 ? void 0 : TokenContract.methods.approve(account2, amount.toString()).send({ from: account1, to: tokenAddress, gas: 50000 }));
        // console.log('jjjjjjjjjjjjjjjjjj', response);
        return response;
    }
    catch (e) {
        console.error('Error at GiveTokenApproval', e);
    }
});
exports.GiveTokenApproval = GiveTokenApproval;
const CheckPhnxBalanceWithBalanceOf = (Defination, address) => __awaiter(void 0, void 0, void 0, function* () {
    let TokenContract = yield initContract();
    console.log(Defination, web3.utils.fromWei(yield (TokenContract === null || TokenContract === void 0 ? void 0 : TokenContract.methods.balanceOf(address).call())));
});
exports.CheckPhnxBalanceWithBalanceOf = CheckPhnxBalanceWithBalanceOf;
// Transfer
const TransferMethodPhnx = (fromAccount, toAccount) => __awaiter(void 0, void 0, void 0, function* () {
    const transferAmount = "1";
    (0, exports.CheckPhnxBalanceWithBalanceOf)('Balancee of acc1 fromAccount', fromAccount);
    (0, exports.CheckPhnxBalanceWithBalanceOf)('Balancee of acc2 toAccount', toAccount);
    let TokenContract = yield initContract();
    // let resp = await TokenContract?.methods.mint(fromAccount, '1000').send({from: toAccount, to: tokenAddress, gas: 50000})
    // console.log('Mint response => ', resp);
    let res = yield (TokenContract === null || TokenContract === void 0 ? void 0 : TokenContract.methods.transfer(toAccount, transferAmount).send({ from: fromAccount, gasLimit: 200000 }));
    console.log('TransferMethodPhnx Response => ', res);
});
exports.TransferMethodPhnx = TransferMethodPhnx;
// Transfer From
const TransferFromMethodPhnx = (fromAccount, toAccount) => __awaiter(void 0, void 0, void 0, function* () {
    const transferAmount = "1";
    (0, exports.CheckPhnxBalanceWithBalanceOf)('Balancee of acc1 fromAccount', fromAccount);
    (0, exports.CheckPhnxBalanceWithBalanceOf)('Balancee of acc2 toAccount', toAccount);
    let TokenContract = yield initContract();
    let res = yield (TokenContract === null || TokenContract === void 0 ? void 0 : TokenContract.methods.transferFrom(fromAccount, toAccount, transferAmount).send({ from: fromAccount, gasLimit: 200000 }));
    console.log('TransferMethodPhnx Response => ', res);
});
exports.TransferFromMethodPhnx = TransferFromMethodPhnx;
