import React from 'react';
import { gql, graphql } from 'react-apollo';
import { LoadingStateViewer } from 'shared/components';
import { AuthorsView } from './authors-view';

class AuthorsContainerBase extends React.Component {
    render() {
        const { authors } = this.props;
        return <AuthorsView authors={authors} />;
    }
}

const AUTHORS_QUERY = gql`
    {
        authors {
            id
            name
        }
    }
`;

// AuthorsContainer = graphql(...)(LoadingStateViewer(AuthorsContainerBase`))
export const AuthorsContainer = graphql(AUTHORS_QUERY, {
    props: ({ data: { loading, error, authors } }) => ({
        loading,
        error,
        authors
    })
})(LoadingStateViewer(AuthorsContainerBase));
