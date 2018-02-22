import Web3 from 'web3';

let web3;

if (typeof window !== 'undefined' && typeof window.web3 !== 'undefined') {
    //in the browser and metmesk is runing
    web3 = new Web3(window.web3.currentProvider);
}
else{
    // we are on the server OR the user is not runing metamesk
    const provider = new Web3.providers.HttpProvider(
        'https://rinkeby.infura.io/oxKTa0lOMI5TdRcqGRNR'
    );
    web3 = new Web3(provider);
}

export default web3;