import React, { Component } from 'react';
import { Form, Button, Input, Message } from 'semantic-ui-react';
import Lyaout from '../../components/layout';
import factory from '../../etherum/factory';
import web3 from '../../etherum/web3';
import { Router } from '../../routes';

class CampaignNew extends Component {
    state = {
        minimumContribution: '',
        errorMessage: '',
        loading: false
    };

    onSubmit = async (event) =>{
        event.preventDefault();
        this.setState({loading: true, errorMessage: ''});

        try{
            const accounts = await web3.eth.getAccounts();
            await factory.methods
            .createCampaign(this.state.minimumContribution)
            .send({
                from: accounts[0]
            });
            Router.pushRoute('/');
        } catch (err) {
            this.setState({ errorMessage: err.message });
        }

        this.setState({loading: false});
    };

    render() {
        return (
        <Lyaout>
            <h3>Create a Campaign!</h3>
            <Form onSubmit={this.onSubmit} error={!!this.state.errorMessage}>
                <Form.Field>
                    <label>Minimum Contribution</label>
                    <Input 
                        label="wei" 
                        labelPosition="right" 
                        value={this.state.minimumContribution}
                        onChange={event => this.setState({minimumContribution: event.target.value})}
                    />
                </Form.Field>
                <Message error header="Oops!" content={this.state.errorMessage} />
                <Button primary loading={this.state.loading}>Create</Button>
            </Form>
        </Lyaout>
    );
}
}

export default CampaignNew;