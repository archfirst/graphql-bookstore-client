import React from 'react';
import { gql, graphql } from 'react-apollo';
import { AuthorDialog } from './author-dialog';

class AuthorCreateContainerBase extends React.Component {
    render() {
        const { author, openDialog } = this.props;
        return (
            <AuthorDialog
                author={author}
                isNew={true}
                open={openDialog}
                onSave={this.onSave}
                onCancel={this.onCancel}
            />
        );
    }

    onSave = () => {
        const { author, mutate, onAddDone } = this.props;
        mutate({
            variables: {
                ...author
            }
        });
        onAddDone();
    };

    onCancel = () => {
        const { onAddDone } = this.props;
        onAddDone();
    };
}

const CREATE_AUTHOR_MUTATION = gql`
    mutation CreateAuthor($id: ID!, $name: String!) {
        createAuthor(id: $id, name: $name) {
            id
            name
        }
    }
`;

// AuthorCreateContainer = graphql(...)(LoadingStateViewer(AuthorsCreateContainerBase`))
export const AuthorCreateContainer = graphql(CREATE_AUTHOR_MUTATION, {})(
    AuthorCreateContainerBase
);
