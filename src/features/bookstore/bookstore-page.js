import React from 'react';
import { withStyles } from 'material-ui/styles';
import { Titlebar } from 'shared/components';
import { AuthorsContainer } from './authors/authors-container';
import { BooksContainer } from './books/books-container';
import { PublishersContainer } from './publishers/publishers-container';

const styles = {
    root: {
        height: '100%',
        display: 'flex',
        flexDirection: 'column'
    },
    topPanel: {
        flex: 1,
        display: 'flex',
        flexDirection: 'row'
    },
    leftPanel: {
        flex: 1
    },
    rightPanel: {
        flex: 1
    },
    bottomPanel: {
        flex: 1,
        display: 'flex',
        flexDirection: 'row'
    }
};

class BookstorePageBase extends React.Component {
    render() {
        const { classes } = this.props;

        return (
            <div className={classes.root}>
                <Titlebar>GraphQL Bookstore</Titlebar>
                <div className={classes.topPanel}>
                    <div className={classes.leftPanel}>
                        <PublishersContainer/>
                    </div>
                    <div className={classes.rightPanel}>
                        <AuthorsContainer/>
                    </div>
                </div>
                <div className={classes.bottomPanel}>
                    <BooksContainer />
                </div>
            </div>
        );
    }
}

export const BookstorePage = withStyles(styles)(BookstorePageBase);
