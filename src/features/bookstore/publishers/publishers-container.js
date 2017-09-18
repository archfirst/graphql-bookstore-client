import React from 'react';
import { gql, graphql } from 'react-apollo';
import { LoadingStateViewer } from 'shared/components';
import { PublishersView } from './publishers-view';

class PublishersContainerBase extends React.Component {
    componentWillMount() {
        const { subscribeToMore } = this.props;
        subscribeToMore({
            document: PUBLISHER_ADDED,
            updateQuery: (prev, { subscriptionData }) => {
                if (!subscriptionData.data) {
                    return prev;
                }

                const newPublisher = subscriptionData.data.publisherAdded;

                // Don't double add the publisher
                if (
                    !prev.publishers.find(
                        publisher => publisher.id === newPublisher.id
                    )
                ) {
                    return Object.assign({}, prev, {
                        publishers: [...prev.publishers, newPublisher]
                    });
                } else {
                    return prev;
                }
            }
        });
        subscribeToMore({
            document: PUBLISHER_UPDATED,
            updateQuery: (prev, { subscriptionData }) => {
                if (!subscriptionData.data) {
                    return prev;
                }

                const updatedPublisher = subscriptionData.data.publisherUpdated;
                return Object.assign({}, prev, {
                    publishers: [...prev.publishers, updatedPublisher]
                });
            }
        });
    }

    render() {
        const { publishers } = this.props;
        return <PublishersView publishers={publishers} />;
    }
}

const PUBLISHERS_QUERY = gql`
    {
        publishers {
            id
            name
        }
    }
`;

const PUBLISHER_ADDED = gql`
    subscription publisherAdded {
        publisherAdded {
            id
            name
        }
    }
`;

const PUBLISHER_UPDATED = gql`
    subscription publisherUpdated {
        publisherUpdated {
            id
            name
        }
    }
`;

// PublishersContainer = graphql(...)(LoadingStateViewer(PublishersContainerBase`))
export const PublishersContainer = graphql(PUBLISHERS_QUERY, {
    props: ({ data: { loading, error, subscribeToMore, publishers } }) => ({
        loading,
        error,
        subscribeToMore,
        publishers
    })
})(LoadingStateViewer(PublishersContainerBase));
