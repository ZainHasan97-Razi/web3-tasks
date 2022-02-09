// const web3 = require('web3');
// let URL = "https://eth-mainnet.alchemyapi.io/v2/wOoilbXUnr4ao16cSHpeccfbCM6t4Eu4";
// let Web3 = new web3(URL);

// let erc20Abi = require("../erc20abi.json");

// async function main() {

//     let contractInstance = await new Web3.eth.Contract(erc20Abi, "0xF5C638B9E09727D714Aca185B657F691b4E24ddc");

//     contractInstance.methods.totalSupply().call().then(console.log);

// }
// main()  .then(() => process.exit(0))
// .catch((error) => {
//   console.error(error);
//   process.exit(1);
// });

const Web3 = require("web3");
const axios = require("axios");
const EthereumTx = require("ethereumjs-tx").Transaction;

const web3 = new Web3(
  "https://rinkeby.infura.io/v3/d8761b551d1f4423b12bcd298d66ed66"
);
var PK2 = "62b4c9d040bcc65102e45bfb031217d1ac342177bb3cba83b9bc33d636cd0d71";
var user2 = web3.eth.accounts.wallet.add(PK2);
const PK = "5da45c9023c9c54495fbd29df3af6ca2a6427e28ae74d5379e055fcd1d957512";
var user = web3.eth.accounts.wallet.add(PK);

async function main() {
  // Set up web3 object, connected to the local development network

  //  let accounts = await web3.eth.getAccounts();
  // console.log(accounts[0]);

  var NONCE = await web3.eth.getTransactionCount(user.address);

  const address = "0xF5C638B9E09727D714Aca185B657F691b4E24ddc";
  const abi = require("../artifacts/contracts/Erc20.sol/ERC20.json").abi;
  const counter = new web3.eth.Contract(abi, address);

  const value = await counter.methods
    .balanceOf("0x611485C1990cd77A7D67e46AA6D6e7F8359dF4ee")
    .call();
  console.log("Before Transfer", value);
  var gP = await getCurrentGasPrices();
  let amount = 100; // web3.toBigNumber(100);
  let toAddress = "0x3Ab20b6375B5c8E791E9b62635ff2bfF85F8595D";
  let approvedAddress = "0x71A311EDB7423815Fc71421428E47aF57543bce3";
  // let gp = await getCurrentGasPrices();
  // let trans = await counter.methods.transfer(approvedAddress , 139000).send({from: user.address, nonce ,gasLimit: 200000 , gasPrice:gP.low*1000000000});
  // console.log(trans);

  //APPROVE FUNCTION
  let aprove = counter.methods
    .approve(approvedAddress, 1000000000)
    .send({
      from: user.address,
      gasLimit: 200000,
      gasPrice: web3.utils.toWei("20", "gwei"),
      nonce: NONCE,
    })
    .then(console.log);
  //   console.log(aprove);

  var cancel = await web3.eth.sendTransaction({
    from: user.address,
    to: user.address,
    value: 0,
    nonce: NONCE,
    gasLimit: 210000,
    gasPrice: web3.utils.toWei("2100", "gwei"),
  });
  //   console.log(cancel);

  //cancelTransaction(NONCE);

  //TRANSFER FROM FUNCTION
  // let transFrom =  await counter.methods.transferFrom( user.address ,toAddress,123).send({from: user2.address ,gasLimit: 200000});
  // console.log(transFrom);

  // ALLOWANCE FUNCTION
  // let alow = await counter.methods.allowance(user.address , user2.address).call();
  // console.log(alow);

  // counter.transfer("0x3Ab20b6375B5c8E791E9b62635ff2bfF85F8595D", amount(error, txHash) => {
  //   // it returns tx hash because sending tx
  //   console.log(txHash)
  // )};.

  // counter.methods.transfer(toAddress, amount).send({from: fromAddress})
  // .on('transactionHash', function(hash){
  //   console.log(hash);
  // });
}
async function cancelTransaction(_nonce) {
  let amountToSend = 0;
  let gasPrices = await getCurrentGasPrices();
  let details = {
    to: user.address,
    value: web3.utils.toHex(web3.utils.toWei(amountToSend.toString(), "ether")),
    gas: 210000,
    gasPrice: gasPrices.high * 1000000000,
    nonce: _nonce,
    chainId: 4, // EIP 155 chainId - mainnet: 1, rinkeby: 4
  };

  const transaction = new EthereumTx(details, { chain: "rinkeby" });
  let privateKey = PK.split("0x");
  let privKey = Buffer.from(privateKey[1], "hex");
  transaction.sign(privKey);

  const serializedTransaction = transaction.serialize();

  web3.eth.sendSignedTransaction(
    "0x" + serializedTransaction.toString("hex"),
    (err, id) => {
      if (err) {
        console.log(err);
        return reject();
      }
      const url = `https://rinkeby.etherscan.io/tx/${id}`;
      console.log(url);
      // resolve({id: id, link: url});
    }
  );
}

async function getCurrentGasPrices() {
  let response = await axios.get(
    "https://ethgasstation.info/json/ethgasAPI.json"
  );
  let prices = {
    low: response.data.safeLow / 10,
    medium: response.data.average / 10,
    high: response.data.fast / 10,
  };
  return prices;
}

// main();
(async function () {
  try {
    const res = await main();
    console.log("res: ", res);
  } catch (error) {
    console.log(error);
  }
})();
