import React, { Component } from 'react';
import { Form, Button } from 'semantic-ui-react';
import Lyaout from '../../components/layout';

class CampaignNew extends Component {
        render() {
            return (
            <Lyaout>
                <h3>Create a Campaign!</h3>
                <Form>
                    <Form.Field>
                        <label>Minimum Contribution</label>
                        <input />
                    </Form.Field>
                    <Button primary>Create</Button>
                </Form>
            </Lyaout>
        );
    }
}

export default CampaignNew;