// TASK #1
// Write a web3 script to transfer ether from one address to another and also to display a 
// balance of the 2 addresses in question before and after transfer.
import Web3 from 'web3'
const HDWalletProvider = require("@truffle/hdwallet-provider");
const EthereumTx = require("ethereumjs-tx").Transaction;
import { GiveTokenApproval, CheckTokenApproval, CheckPhnxBalanceWithBalanceOf, TransferMethodPhnx, TransferFromMethodPhnx} from './tasks/task2'
import { fetchEvents } from './tasks/task3'
import { SubscribeEvent } from './tasks/task4';
import { GetTxDetails } from './tasks/task5';
import { GetTransferTxDetails } from './tasks/task6';
import { SendTxAtLowGas } from './tasks/task7';
import { AllTransactionsByAddress } from './tasks/task8';
import { GetListOfAllTokenTransfers } from './tasks/task9';
import { GetDeployerAddress } from './tasks/task10'
import { NumberOfTokenHolders } from './tasks/task11'
import 'dotenv/config'
import { EVENTS_ABI } from './EVENTS_ABI';

const Key1:string = process.env.prvtKey1!;
const Key2:string = process.env.prvtKey2!;

// Infura initialize
const InfuraRinkbey = 'https://rinkeby.infura.io/v3/388c2e54484b4d90a0a54aa9238f1db7'
// const web3 = new Web3(new Web3.providers.HttpProvider(InfuraRinkbey))

// HDWalletProvider
const provider = new HDWalletProvider(Key1, InfuraRinkbey)
const web3 = new Web3(provider);

type accountType = {
    address: string,
    privateKey: string,
    signTransaction: Function,
    sign: Function,
    encrypt: Function
}

let account1:accountType;
let account2:accountType;
// const EventsContractAddress = '0x110073E52cF4c3bea54De375cA94e66FBd54D7C8'

account1 = web3.eth.accounts.privateKeyToAccount(Key1)
account2 = web3.eth.accounts.privateKeyToAccount(Key2)

// web3.eth.accounts.wallet.add(Key1);
// web3.eth.accounts.wallet.add(Key2);

let Account1balanceBeforeTx: string;
let Account2balanceBeforeTx: string;

// let details = {
    //         to: signWithAccount == 1 ? account1.address : account2.address,
    //         value: web3.utils.toHex(web3.utils.toWei('11', "ether")),
    //         gas: 21000,
    //         gasPrice: web3.utils.toHex(web3.utils.toWei('10', 'gwei')), // converts the gwei price to wei
    //         gasLimit: web3.utils.toHex(21000),
    //         nonce: web3.utils.toHex(txCount),
    //         chainId: 4, // EIP 155 chainId - mainnet: 1, rinkeby: 4
    //     };

const SignRawTransaction = async (signWithAccount:number) => {
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
}

const task1 = async () => {
    const getBalances = async () => {
        Account1balanceBeforeTx = web3.utils.fromWei(await web3.eth.getBalance(account1.address))
        Account2balanceBeforeTx = web3.utils.fromWei(await web3.eth.getBalance(account2.address))
        console.log('Balancee 1 ==>>>', Account1balanceBeforeTx);
        console.log('Balancee 2 ==>>>', Account2balanceBeforeTx);
    }
    await getBalances()
    
    const handleTransferEth = async () => {
        web3.eth.accounts.wallet.add(Key1)
        try {
            await web3.eth.sendTransaction({to: account2.address, from: account1.address, value: web3.utils.toWei("0.001", "ether"), gas: 42000});
            console.log(`O.05 Ethers have been transfered from ${account2.address} to account ${account2.address}`);
        } catch(e) {
            console.error('Error at handleTransferEth =>', e)
        }
        await getBalances()
    }
    await handleTransferEth()
}
// task1()


const task2 = async () => {
    let allowance = await CheckTokenApproval(account1.address, account2.address)
    if(allowance) {
        console.log('Hey you are allowed!!');
    } else {
        await GiveTokenApproval(account1.address, account2.address)
    }
    // await CheckPhnxBalanceWithBalanceOf('My accoun1 balanceOf PHNX => ', account1.address)

    // await TransferMethodPhnx(
    //     account1.address, 
    //     account2.address
    // )

    await TransferFromMethodPhnx(
        account1.address, 
        account2.address
    )

}
// task2()


// TASK #3
const task3 = async () => {
    const EventsContractAddress = '0x110073E52cF4c3bea54De375cA94e66FBd54D7C8';
    const EventsAbi = EVENTS_ABI;
    const contract = new web3.eth.Contract(
        EventsAbi,
        EventsContractAddress
        );
    const EventName = 'CreatedEvent';
    const StartingBlock = 10053017;
    const EndBlock = 10097623;

    // Block of last transaction
    const LastBlock = contract.defaultBlock;
    // console.log('LastBlock', LastBlock);
    
    await fetchEvents(EventsContractAddress, EventsAbi, EventName, StartingBlock, EndBlock)
}
// task3()

const task4 = async () => {
    const EventsContractAddress = '0x110073E52cF4c3bea54De375cA94e66FBd54D7C8';
    const EventsAbi = EVENTS_ABI;
    const EventName = 'CreatedEvent';
    const StartingBlock = 10053017;
    const EndBlock = 10097623;

    await SubscribeEvent(EventsContractAddress, EventsAbi, EventName, StartingBlock, EndBlock)
}
// task4()

const task5 = async () => {
    const txHash = '0x2cea735e44a2627fecfd9dbbccaba97b208aed3c46b7952a96ff92c74db2d468'
    await GetTxDetails(txHash)
}
// task5()

const task6 = async () => {
    const tokenAddress = "0x521855AA99a80Cb467A12b1881f05CF9440c7023" // phnx
    const txHash = '0x94af3f425b350a20c4f62fa5a3e3d84d259b4d42d2a7f4aad08e87da69d0af12' // Transfer Tx Hash
    await GetTransferTxDetails(txHash)
}
// task6()

const task7 = async () => {
    await SendTxAtLowGas(account1.address, account2.address)
}
// task7()

const task8 = async () => {
    await AllTransactionsByAddress(account1.address)
}
// task8()

const task9 = async () => {
    await GetListOfAllTokenTransfers()
}
// task9()

const task10 = async () => {
    const EventsContractAddress = '0x110073E52cF4c3bea54De375cA94e66FBd54D7C8';
    await GetDeployerAddress(EventsContractAddress, EVENTS_ABI)
}
// task10()

const task11 = async () => {
    const tokenAddress = "0x521855AA99a80Cb467A12b1881f05CF9440c7023" // phnx
    await NumberOfTokenHolders(tokenAddress)
}
// task11()