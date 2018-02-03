import React from 'react';
import gql from 'graphql-tag';
import { graphql } from 'react-apollo';
import { PublisherDialog } from './publisher-dialog';

class PublisherUpdateContainerBase extends React.Component {
    render() {
        const { publisher, openDialog } = this.props;
        return (
            <PublisherDialog
                publisher={publisher}
                isNew={false}
                open={openDialog}
                onSave={this.onSave}
                onCancel={this.onCancel}
            />
        );
    }

    onSave = () => {
        const { publisher, mutate, onUpdateDone } = this.props;
        mutate({
            variables: {
                ...publisher
            }
        });
        onUpdateDone();
    };

    onCancel = () => {
        const { onUpdateDone } = this.props;
        onUpdateDone();
    };
}

const UPDATE_PUBLISHER_MUTATION = gql`
    mutation UpdatePublisher($id: ID!, $name: String!) {
        updatePublisher(id: $id, name: $name) {
            id
            name
        }
    }
`;

// PublisherUpdateContainer = graphql(...)(LoadingStateViewer(PublishersUpdateContainerBase`))
export const PublisherUpdateContainer = graphql(UPDATE_PUBLISHER_MUTATION, {})(
    PublisherUpdateContainerBase
);
