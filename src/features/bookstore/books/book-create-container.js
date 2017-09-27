import React from 'react';
import { compose, gql, graphql } from 'react-apollo';
import { BusyIndicator } from 'shared/components';
import { BookDialog } from './book-dialog';

class BookCreateContainerBase extends React.Component {
    render() {
        const { book, openDialog, publishersQuery } = this.props;

        if (publishersQuery.loading) {
            return <BusyIndicator />;
        }

        return (
            openDialog && (
                <BookDialog
                    book={book}
                    isNew={true}
                    publishers={publishersQuery.publishers}
                    open={openDialog}
                    onSave={this.onSave}
                    onCancel={this.onCancel}
                />
            )
        );
    }

    onSave = () => {
        const { book, createBookMutation, onAddDone } = this.props;
        createBookMutation({
            variables: {
                ...book
            }
        });
        onAddDone();
    };

    onCancel = () => {
        const { onAddDone } = this.props;
        onAddDone();
    };
}

const CREATE_BOOK_MUTATION = gql`
    mutation CreateBook($id: ID!, $name: String!, $publisherId: String!) {
        createBook(id: $id, name: $name, publisherId: $publisherId) {
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

const PUBLISHERS_QUERY = gql`
    {
        publishers {
            id
            name
        }
    }
`;

// BookCreateContainer = graphql(...)(LoadingStateViewer(BooksCreateContainerBase`))
export const BookCreateContainer = compose(
    graphql(CREATE_BOOK_MUTATION, {
        name: 'createBookMutation'
    }),
    graphql(PUBLISHERS_QUERY, {
        name: 'publishersQuery'
    })
)(BookCreateContainerBase);
