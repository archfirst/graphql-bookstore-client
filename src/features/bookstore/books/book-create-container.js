import React from 'react';
import { compose, gql, graphql } from 'react-apollo';
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
    graphql(BOOK_CREATION, {
        name: 'bookCreation'
    }),
    graphql(PUBLISHERS_QUERY, {
        name: 'publishersQuery'
    })
)(LoadingStateViewer(BookCreateContainerBase));
