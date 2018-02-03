import React from 'react';
import gql from 'graphql-tag';
import { compose, graphql } from 'react-apollo';
import { BusyIndicator } from 'shared/components';
import { BookDialog } from './book-dialog';

class BookUpdateContainerBase extends React.Component {
    render() {
        const { book, openDialog, publishersQuery } = this.props;

        if (publishersQuery.loading) {
            return <BusyIndicator />;
        }

        return (
            openDialog && (
                <BookDialog
                    book={book}
                    isNew={false}
                    publishers={publishersQuery.publishers}
                    open={openDialog}
                    onSave={this.onSave}
                    onCancel={this.onCancel}
                />
            )
        );
    }

    onSave = () => {
        const { book, updateBookMutation, onUpdateDone } = this.props;

        updateBookMutation({
            variables: {
                ...book
            }
        });
        onUpdateDone();
    };

    onCancel = () => {
        const { onUpdateDone } = this.props;
        onUpdateDone();
    };
}

const UPDATE_BOOK_MUTATION = gql`
    mutation UpdateBook($id: ID!, $name: String!) {
        updateBook(id: $id, name: $name) {
            id
            name
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

// BookUpdateContainer = graphql(...)(LoadingStateViewer(BooksUpdateContainerBase`))
export const BookUpdateContainer = compose(
    graphql(UPDATE_BOOK_MUTATION, {
        name: 'updateBookMutation'
    }),
    graphql(PUBLISHERS_QUERY, {
        name: 'publishersQuery'
    })
)(BookUpdateContainerBase);
