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

const BOOKS_QUERY = gql`
    {
        books {
            id
            name
            publisher {
              name
            },
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
