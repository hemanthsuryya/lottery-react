import Web3 from 'web3';
const ethereum = window.ethereum;
let web3;
const foo = async () => {
    web3 = new Web3(Web3.givenProvider);
    await ethereum.enable();
}
foo();
export default web3;