import React from 'react';
import { gql, graphql } from 'react-apollo';
import { LoadingStateViewer } from 'shared/components';
import { PublisherDialog } from './publisher-dialog';

class PublisherCreateContainerBase extends React.Component {
    render() {
        const { publisher, openDialog } = this.props;
        return (
            <PublisherDialog
                publisher={publisher}
                isNew={true}
                open={openDialog}
                onSave={this.onSave}
                onCancel={this.onCancel}
            />
        );
    }

    onSave = () => {
        const { publisher, mutate, onAddDone } = this.props;
        mutate({
            variables: {
                ...publisher
            }
        });
        onAddDone();
    };

    onCancel = () => {
        const { onAddDone } = this.props;
        onAddDone();
    };
}

const PUBLISHER_CREATION = gql`
    mutation CreatePublisher($id: ID!, $name: String!) {
      createPublisher(id: $id, name: $name) {
        id,
        name
      }
    }
`;

// PublisherCreateContainer = graphql(...)(LoadingStateViewer(PublishersCreateContainerBase`))
export const PublisherCreateContainer = graphql(PUBLISHER_CREATION, {
    options: {}
})(LoadingStateViewer(PublisherCreateContainerBase));
