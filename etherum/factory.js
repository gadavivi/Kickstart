import web3 from './web3';
import CampaignFactory from './build/CampaignFactory.json';

const factory = new web3.eth.Contract(
    JSON.parse(CampaignFactory.interface),
    '0xaafdF042b5715F875b932C4cabeC46A8A0A603fC'
);

export default factory;