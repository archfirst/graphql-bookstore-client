import React from 'react';
import { gql, graphql } from 'react-apollo';
import { LoadingStateViewer } from 'shared/components';
import { PublishersView } from './publishers-view';

class PublishersContainerBase extends React.Component {
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

// PublishersContainer = graphql(...)(LoadingStateViewer(PublishersContainerBase`))
export const PublishersContainer = graphql(PUBLISHERS_QUERY, {
    props: ({ data: { loading, error, publishers } }) => ({
        loading,
        error,
        publishers
    })
})(LoadingStateViewer(PublishersContainerBase));
