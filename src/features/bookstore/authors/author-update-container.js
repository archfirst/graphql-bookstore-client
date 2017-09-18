import React from 'react';
import { gql, graphql } from 'react-apollo';
import { LoadingStateViewer } from 'shared/components';
import { AuthorDialog } from './author-dialog';

class AuthorUpdateContainerBase extends React.Component {
    render() {
        const { author, openDialog } = this.props;
        return (
            <AuthorDialog
                author={author}
                isNew={false}
                open={openDialog}
                onSave={this.onSave}
                onCancel={this.onCancel}
            />
        );
    }

    onSave = () => {
        const { author, mutate, onUpdateDone } = this.props;
        mutate({
            variables: {
                ...author
            }
        });
        onUpdateDone();
    };

    onCancel = () => {
        const { onUpdateDone } = this.props;
        onUpdateDone();
    };
}

const AUTHOR_UPDATE = gql`
    mutation UpdateAuthor($id: ID!, $name: String!) {
        updateAuthor(id: $id, name: $name) {
            id
            name
        }
    }
`;

// AuthorUpdateContainer = graphql(...)(LoadingStateViewer(AuthorsUpdateContainerBase`))
export const AuthorUpdateContainer = graphql(AUTHOR_UPDATE, {
    options: {}
})(LoadingStateViewer(AuthorUpdateContainerBase));
