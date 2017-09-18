import React from 'react';
import { gql, graphql } from 'react-apollo';
import { LoadingStateViewer } from 'shared/components';
import { BooksView } from './books-view';

class BooksContainerBase extends React.Component {
    componentWillMount() {
        const { subscribeToMore } = this.props;
        subscribeToMore({
            document: BOOK_ADDED,
            updateQuery: (prev, { subscriptionData }) => {
                if (!subscriptionData.data) {
                    return prev;
                }

                const newBook = subscriptionData.data.bookAdded;

                // Don't double add the book
                if (!prev.books.find(book => book.id === newBook.id)) {
                    return Object.assign({}, prev, {
                        books: [...prev.books, newBook]
                    });
                } else {
                    return prev;
                }
            }
        });
        subscribeToMore({
            document: BOOK_UPDATED,
            updateQuery: (prev, { subscriptionData }) => {
                if (!subscriptionData.data) {
                    return prev;
                }

                const updatedBook = subscriptionData.data.bookUpdated;
                return Object.assign({}, prev, {
                    books: [...prev.books, updatedBook]
                });
            }
        });
    }

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

const BOOK_ADDED = gql`
    subscription bookAdded {
        bookAdded {
            id
            name
        }
    }
`;

const BOOK_UPDATED = gql`
    subscription bookUpdated {
        bookUpdated {
            id
            name
        }
    }
`;

// BooksContainer = graphql(...)(LoadingStateViewer(BooksContainerBase`))
export const BooksContainer = graphql(BOOKS_QUERY, {
    props: ({ data: { loading, error, subscribeToMore, books } }) => ({
        loading,
        error,
        subscribeToMore,
        books
    })
})(LoadingStateViewer(BooksContainerBase));
