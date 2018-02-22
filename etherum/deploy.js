const HDwallertProvider = require('truffle-hdwallet-provider');
const Web3 = require('web3');
const compiledFactory = require('./build/CampaignFactory.json');

const provider = new HDwallertProvider(
    'olympic prison orchard alley what spot attitude clay glow eye fitness virtual',
    'https://rinkeby.infura.io/oxKTa0lOMI5TdRcqGRNR'
);
const web3 = new Web3(provider);

//create a function only for using the 
const deploy = async () => {
    const accounts = await web3.eth.getAccounts();

    console.log('Attempting to deploy from account:', accounts[0]);
    const result = await new web3.eth.Contract(JSON.parse(compiledFactory.interface))
        .deploy({ data: compiledFactory.bytecode })
        .send({ gas:'1000000', from: accounts[0] });

    console.log('Contract deployed to ', result.options.address);
};

deploy();
 