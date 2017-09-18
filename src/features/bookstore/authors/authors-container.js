import React from 'react';
import { gql, graphql } from 'react-apollo';
import { LoadingStateViewer } from 'shared/components';
import { AuthorsView } from './authors-view';

class AuthorsContainerBase extends React.Component {
    componentWillMount() {
        const { subscribeToMore } = this.props;
        subscribeToMore({
            document: AUTHOR_ADDED,
            updateQuery: (prev, { subscriptionData }) => {
                if (!subscriptionData.data) {
                    return prev;
                }

                const newAuthor = subscriptionData.data.authorAdded;

                // Don't double add the author
                if (!prev.authors.find(author => author.id === newAuthor.id)) {
                    return Object.assign({}, prev, {
                        authors: [...prev.authors, newAuthor]
                    });
                } else {
                    return prev;
                }
            }
        });
        subscribeToMore({
            document: AUTHOR_UPDATED,
            updateQuery: (prev, { subscriptionData }) => {
                if (!subscriptionData.data) {
                    return prev;
                }

                const updatedAuthor = subscriptionData.data.authorUpdated;
                return Object.assign({}, prev, {
                    authors: [...prev.authors, updatedAuthor]
                });
            }
        });
    }

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

const AUTHOR_ADDED = gql`
    subscription authorAdded {
        authorAdded {
            id
            name
        }
    }
`;

const AUTHOR_UPDATED = gql`
    subscription authorUpdated {
        authorUpdated {
            id
            name
        }
    }
`;

// AuthorsContainer = graphql(...)(LoadingStateViewer(AuthorsContainerBase`))
export const AuthorsContainer = graphql(AUTHORS_QUERY, {
    props: ({ data: { loading, error, subscribeToMore, authors } }) => ({
        loading,
        error,
        subscribeToMore,
        authors
    })
})(LoadingStateViewer(AuthorsContainerBase));
