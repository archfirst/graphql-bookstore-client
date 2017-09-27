import React from 'react';
import { gql, graphql } from 'react-apollo';
import { BookDialog } from './book-dialog';

class BookUpdateContainerBase extends React.Component {
    render() {
        const { book, openDialog } = this.props;
        return (
            openDialog && (
                <BookDialog
                    book={book}
                    isNew={false}
                    open={openDialog}
                    onSave={this.onSave}
                    onCancel={this.onCancel}
                />
            )
        );
    }

    onSave = () => {
        const { book, mutate, onUpdateDone } = this.props;
        mutate({
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

// BookUpdateContainer = graphql(...)(LoadingStateViewer(BooksUpdateContainerBase`))
export const BookUpdateContainer = graphql(UPDATE_BOOK_MUTATION, {})(
    BookUpdateContainerBase
);
