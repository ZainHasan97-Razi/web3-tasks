"use strict";
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
// TASK #1
// Write a web3 script to transfer ether from one address to another and also to display a 
// balance of the 2 addresses in question before and after transfer.
const web3_1 = __importDefault(require("web3"));
const HDWalletProvider = require("@truffle/hdwallet-provider");
const EthereumTx = require("ethereumjs-tx").Transaction;
const task2_1 = require("./tasks/task2");
const task3_1 = require("./tasks/task3");
const task4_1 = require("./tasks/task4");
const task5_1 = require("./tasks/task5");
const task6_1 = require("./tasks/task6");
const task7_1 = require("./tasks/task7");
const task8_1 = require("./tasks/task8");
const task9_1 = require("./tasks/task9");
const task10_1 = require("./tasks/task10");
const task11_1 = require("./tasks/task11");
require("dotenv/config");
const EVENTS_ABI_1 = require("./EVENTS_ABI");
const Key1 = process.env.prvtKey1;
const Key2 = process.env.prvtKey2;
// Infura initialize
const InfuraRinkbey = 'https://rinkeby.infura.io/v3/388c2e54484b4d90a0a54aa9238f1db7';
// const web3 = new Web3(new Web3.providers.HttpProvider(InfuraRinkbey))
// HDWalletProvider
const provider = new HDWalletProvider(Key1, InfuraRinkbey);
const web3 = new web3_1.default(provider);
let account1;
let account2;
// const EventsContractAddress = '0x110073E52cF4c3bea54De375cA94e66FBd54D7C8'
account1 = web3.eth.accounts.privateKeyToAccount(Key1);
account2 = web3.eth.accounts.privateKeyToAccount(Key2);
// web3.eth.accounts.wallet.add(Key1);
// web3.eth.accounts.wallet.add(Key2);
let Account1balanceBeforeTx;
let Account2balanceBeforeTx;
// let details = {
//         to: signWithAccount == 1 ? account1.address : account2.address,
//         value: web3.utils.toHex(web3.utils.toWei('11', "ether")),
//         gas: 21000,
//         gasPrice: web3.utils.toHex(web3.utils.toWei('10', 'gwei')), // converts the gwei price to wei
//         gasLimit: web3.utils.toHex(21000),
//         nonce: web3.utils.toHex(txCount),
//         chainId: 4, // EIP 155 chainId - mainnet: 1, rinkeby: 4
//     };
const SignRawTransaction = (signWithAccount) => __awaiter(void 0, void 0, void 0, function* () {
    //  web3.eth.getTransactionCount(account1.address, async (err,txCount) => {
    //     //building a transaction
    //     const txObject = {
    //         // nonce:    web3.utils.toHex(txCount),
    //         to:       account2.address,
    //         value:    web3.utils.toHex(web3.utils.toWei('0.01', 'ether')),
    //         gasLimit: web3.utils.toHex(21000),
    //         gasPrice: web3.utils.toHex(web3.utils.toWei('10', 'gwei'))
    //     }
    //     const transaction = new EthereumTx(txObject, {'chain':'rinkeby'});
    //     // console.log('transaction ==>>>>', transaction);
    //     signWithAccount == 1 ?
    //     transaction.sign(Buffer.from(Key1, "hex")):
    //     signWithAccount == 2 ? 
    //     transaction.sign(Buffer.from(Key2, "hex")):
    //     null;
    //     // signWithAccount == 1 ?
    //     // transaction.sign(Key1):
    //     // signWithAccount == 2 ? 
    //     // transaction.sign(Key2):
    //     // null
    //     /**
    //      * Now, we'll compress the transaction info down into a transportable object.
    //      */
    //     const serializedTransaction = await transaction.serialize();
    //     console.log('serializedTransaction', '0x'+ serializedTransaction.toString("hex"));
    //     // const transactionId = web3.eth.sendRawTransaction(signWithAccount == 1 ? account1.address : account2.address  + serializedTransaction.toString("hex"));
    //     await web3.eth.sendSignedTransaction('0x'+ serializedTransaction.toString("hex"), (err, tx)=> {
    //         console.log('txxxxxxxxxxxxxxxxxxxxxxxx',tx)
    //     })
    //     // console.log('respppp of web3.eth.sendSignedTransaction', await web3.eth.sendSignedTransaction('0x'+ serializedTransaction.toString("hex")));
    // })
});
const task1 = () => __awaiter(void 0, void 0, void 0, function* () {
    const getBalances = () => __awaiter(void 0, void 0, void 0, function* () {
        Account1balanceBeforeTx = web3.utils.fromWei(yield web3.eth.getBalance(account1.address));
        Account2balanceBeforeTx = web3.utils.fromWei(yield web3.eth.getBalance(account2.address));
        console.log('Balancee 1 ==>>>', Account1balanceBeforeTx);
        console.log('Balancee 2 ==>>>', Account2balanceBeforeTx);
    });
    yield getBalances();
    const handleTransferEth = () => __awaiter(void 0, void 0, void 0, function* () {
        web3.eth.accounts.wallet.add(Key1);
        try {
            yield web3.eth.sendTransaction({ to: account2.address, from: account1.address, value: web3.utils.toWei("0.001", "ether"), gas: 42000 });
            console.log(`O.05 Ethers have been transfered from ${account2.address} to account ${account2.address}`);
        }
        catch (e) {
            console.error('Error at handleTransferEth =>', e);
        }
        yield getBalances();
    });
    yield handleTransferEth();
});
// task1()
const task2 = () => __awaiter(void 0, void 0, void 0, function* () {
    let allowance = yield (0, task2_1.CheckTokenApproval)(account1.address, account2.address);
    if (allowance) {
        console.log('Hey you are allowed!!');
    }
    else {
        yield (0, task2_1.GiveTokenApproval)(account1.address, account2.address);
    }
    // await CheckPhnxBalanceWithBalanceOf('My accoun1 balanceOf PHNX => ', account1.address)
    // await TransferMethodPhnx(
    //     account1.address, 
    //     account2.address
    // )
    yield (0, task2_1.TransferFromMethodPhnx)(account1.address, account2.address);
});
// task2()
// TASK #3
const task3 = () => __awaiter(void 0, void 0, void 0, function* () {
    const EventsContractAddress = '0x110073E52cF4c3bea54De375cA94e66FBd54D7C8';
    const EventsAbi = EVENTS_ABI_1.EVENTS_ABI;
    const contract = new web3.eth.Contract(EventsAbi, EventsContractAddress);
    const EventName = 'CreatedEvent';
    const StartingBlock = 10053017;
    const EndBlock = 10097623;
    // Block of last transaction
    const LastBlock = contract.defaultBlock;
    // console.log('LastBlock', LastBlock);
    yield (0, task3_1.fetchEvents)(EventsContractAddress, EventsAbi, EventName, StartingBlock, EndBlock);
});
// task3()
const task4 = () => __awaiter(void 0, void 0, void 0, function* () {
    const EventsContractAddress = '0x110073E52cF4c3bea54De375cA94e66FBd54D7C8';
    const EventsAbi = EVENTS_ABI_1.EVENTS_ABI;
    const EventName = 'CreatedEvent';
    const StartingBlock = 10053017;
    const EndBlock = 10097623;
    yield (0, task4_1.SubscribeEvent)(EventsContractAddress, EventsAbi, EventName, StartingBlock, EndBlock);
});
// task4()
const task5 = () => __awaiter(void 0, void 0, void 0, function* () {
    const txHash = '0x2cea735e44a2627fecfd9dbbccaba97b208aed3c46b7952a96ff92c74db2d468';
    yield (0, task5_1.GetTxDetails)(txHash);
});
// task5()
const task6 = () => __awaiter(void 0, void 0, void 0, function* () {
    const tokenAddress = "0x521855AA99a80Cb467A12b1881f05CF9440c7023"; // phnx
    const txHash = '0x94af3f425b350a20c4f62fa5a3e3d84d259b4d42d2a7f4aad08e87da69d0af12'; // Transfer Tx Hash
    yield (0, task6_1.GetTransferTxDetails)(txHash);
});
// task6()
const task7 = () => __awaiter(void 0, void 0, void 0, function* () {
    yield (0, task7_1.SendTxAtLowGas)(account1.address, account2.address);
});
// task7()
const task8 = () => __awaiter(void 0, void 0, void 0, function* () {
    yield (0, task8_1.AllTransactionsByAddress)(account1.address);
});
// task8()
const task9 = () => __awaiter(void 0, void 0, void 0, function* () {
    yield (0, task9_1.GetListOfAllTokenTransfers)();
});
// task9()
const task10 = () => __awaiter(void 0, void 0, void 0, function* () {
    const EventsContractAddress = '0x110073E52cF4c3bea54De375cA94e66FBd54D7C8';
    yield (0, task10_1.GetDeployerAddress)(EventsContractAddress, EVENTS_ABI_1.EVENTS_ABI);
});
// task10()
const task11 = () => __awaiter(void 0, void 0, void 0, function* () {
    const tokenAddress = "0x521855AA99a80Cb467A12b1881f05CF9440c7023"; // phnx
    yield (0, task11_1.NumberOfTokenHolders)(tokenAddress);
});
task11();
