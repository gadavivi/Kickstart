import React, { Component } from 'react';
import { Card } from 'semantic-ui-react';
import Layout from '../../components/layout';
import Campaign from '../../etherum/campaign'
import web3 from '../../etherum/web3';

class CampaignShow extends Component {

    static async getInitialProps(props) {
        const campaign = Campaign(props.query.address);
        const summary = await campaign.methods.getSummary().call();

        console.log(summary);

        return {
            minimumContribution: summary[0],
            balance: summary[1],
            requestsCount: summary[2],
            apporversCount: summary[3],
            manager: summary[4]
        };
    }

    renderCards() {
        const {
            balance,
            manager,
            minimumContribution,
            requestsCount,
            apporversCount
        } = this.props;

        const items = [
            {
                header: manager,
                meta: "Address if Manager",
                description: "The manager created this campaign and can create request to withdraw money!",
                style: {overflowWrap: 'break-word'}
            },
            {
                header: minimumContribution,
                meta: "Minimum Contributionm (wei)",
                description:"You must contribute at least this much wei to become a contrinuter.",
                style: {overflowWrap: 'break-word'}
            },
            {
                header: requestsCount,
                meta: "Number of Requests",
                description: "A request tries to withdraw money from the ocntract. Requests must be approved by approvers.",
                style: {overflowWrap: 'break-word'}
            },
            {
                header: apporversCount,
                meta: "Number of Approvers",
                description: "Number of people who have already donated to this campaign.",
                style: {overflowWrap: 'break-word'}
            },
            {
                header: web3.utils.fromWei(balance, 'ether'),
                meta: "Campaign Balance (ETH)",
                description: "The balance is how much money this campaign has left to spend.",
                style: {overflowWrap: 'break-word'}
            }
        ];

        return <Card.Group items={items} />;
    }
    render() { 
        return (
            <Layout>
                <h3>Campaign show</h3>
                {this.renderCards()}
            </Layout>
        );
    }
}

export default CampaignShow;