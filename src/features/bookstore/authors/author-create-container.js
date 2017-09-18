import React from 'react';
import { gql, graphql } from 'react-apollo';
import { LoadingStateViewer } from 'shared/components';
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

const AUTHOR_CREATION = gql`
    mutation CreateAuthor($id: ID!, $name: String!) {
        createAuthor(id: $id, name: $name) {
            id
            name
        }
    }
`;

// AuthorCreateContainer = graphql(...)(LoadingStateViewer(AuthorsCreateContainerBase`))
export const AuthorCreateContainer = graphql(AUTHOR_CREATION, {
    options: {}
})(LoadingStateViewer(AuthorCreateContainerBase));
