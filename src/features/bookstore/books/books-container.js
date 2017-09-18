import React from 'react';
import { gql, graphql } from 'react-apollo';
import { LoadingStateViewer } from 'shared/components';
import { BooksView } from './books-view';

class BooksContainerBase extends React.Component {
    render() {
        const { books } = this.props;
        return <BooksView books={books} />;
    }
}

// IMPORTANT: Be sure to fetch the id's of the child objects otherwise
// Apollo can't fold them into the real entities.
const BOOKS_QUERY = gql`
    {
        books {
            id
            name
            publisher {
                id
                name
            }
            authors {
                id
                name
            }
        }
    }
`;

// BooksContainer = graphql(...)(LoadingStateViewer(BooksContainerBase`))
export const BooksContainer = graphql(BOOKS_QUERY, {
    props: ({ data: { loading, error, books } }) => ({
        loading,
        error,
        books
    })
})(LoadingStateViewer(BooksContainerBase));
