import web3 from './web3';
import CampaignFactory from './build/CampaignFactory.json';

const factory = new web3.eth.Contract(
    JSON.parse(CampaignFactory.interface),
    '0x3acBf74114763ED2017693EC7b758771B7dDA41A'
);

export default factory;