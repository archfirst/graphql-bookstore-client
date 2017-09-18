import React from 'react';
import { gql, graphql } from 'react-apollo';
import { LoadingStateViewer } from 'shared/components';
import { BookDialog } from './book-dialog';

class BookUpdateContainerBase extends React.Component {
    render() {
        const { book, openDialog } = this.props;
        return (
            <BookDialog
                book={book}
                isNew={false}
                open={openDialog}
                onSave={this.onSave}
                onCancel={this.onCancel}
            />
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

const BOOK_UPDATE = gql`
    mutation UpdateBook($id: ID!, $name: String!) {
        updateBook(id: $id, name: $name) {
            id
            name
        }
    }
`;

// BookUpdateContainer = graphql(...)(LoadingStateViewer(BooksUpdateContainerBase`))
export const BookUpdateContainer = graphql(BOOK_UPDATE, {
    options: {}
})(LoadingStateViewer(BookUpdateContainerBase));
