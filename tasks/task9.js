"use strict";
//9.  Create a script that fetches all erc20 token transfers of a particular token
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
exports.GetListOfAllTokenTransfers = void 0;
const web3_1 = __importDefault(require("web3"));
require("dotenv/config");
const ERC20_ABI_1 = require("../ERC20_ABI");
const InfuraRinkbey = 'https://rinkeby.infura.io/v3/388c2e54484b4d90a0a54aa9238f1db7';
const HDWalletProvider = require("@truffle/hdwallet-provider");
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
const GetListOfAllTokenTransfers = () => __awaiter(void 0, void 0, void 0, function* () {
    let Contract = yield initContract();
    let resp = yield Contract.getPastEvents('Transfer', {
        //  fromBlock:10108767,
        fromBlock: 9227840,
        toBlock: 'latest'
    });
    // .on('data', function(event:any) {
    //     console.log('Events of transfer =>>>> ', event); // same results as the optional callback above
    // })
    console.log('resppppppppppppppppppp', resp.length);
});
exports.GetListOfAllTokenTransfers = GetListOfAllTokenTransfers;
