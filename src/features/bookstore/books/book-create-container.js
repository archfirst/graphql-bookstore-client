import React from 'react';
import { gql, graphql } from 'react-apollo';
import { LoadingStateViewer } from 'shared/components';
import { BookDialog } from './book-dialog';

class BookCreateContainerBase extends React.Component {
    render() {
        const { book, openDialog } = this.props;
        return (
            <BookDialog
                book={book}
                isNew={true}
                open={openDialog}
                onSave={this.onSave}
                onCancel={this.onCancel}
            />
        );
    }

    onSave = () => {
        const { book, mutate, onAddDone } = this.props;
        mutate({
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

const BOOK_CREATION = gql`
    mutation CreateBook($id: ID!, $name: String!) {
        createBook(id: $id, name: $name) {
            id
            name
        }
    }
`;

// BookCreateContainer = graphql(...)(LoadingStateViewer(BooksCreateContainerBase`))
export const BookCreateContainer = graphql(BOOK_CREATION, {
    options: {}
})(LoadingStateViewer(BookCreateContainerBase));
