import React from 'react';
import Button from 'material-ui/Button';
import Paper from 'material-ui/Paper';
import { withStyles } from 'material-ui/styles';
import Table, {
    TableBody,
    TableCell,
    TableHead,
    TableRow
} from 'material-ui/Table';
import Typography from 'material-ui/Typography';
import { action, observable } from 'mobx';
import { observer } from 'mobx-react';
import PropTypes from 'prop-types';
import { Book } from './book';
import { BookCreateContainer } from './book-create-container';
import { BookUpdateContainer } from './book-update-container';

const styles = theme => ({
    root: {
        height: '100%',
        width: '100%',
        padding: theme.spacing.unit,
        display: 'flex',
        flexDirection: 'column'
    },
    header: {
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center'
    },
    paper: {
        flex: 1,
        overflow: 'auto'
    }
});

@observer
class BooksViewBase extends React.Component {
    static propTypes = {
        books: PropTypes.arrayOf(PropTypes.object).isRequired
    };

    @observable openCreateDialog = false;
    @observable openUpdateDialog = false;
    @observable newBook = new Book();
    @observable existingBook = new Book();

    render() {
        const { classes, books } = this.props;

        return (
            <div className={classes.root}>
                <div className={classes.header}>
                    <Typography type="title">Books</Typography>
                    <Button dense color="primary" onClick={this.onAddClicked}>
                        Add
                    </Button>
                </div>

                <Paper className={classes.paper}>
                    <Table>
                        <TableHead>
                            <TableRow>
                                <TableCell>Name</TableCell>
                                <TableCell>Publisher</TableCell>
                                <TableCell>Authors</TableCell>
                            </TableRow>
                        </TableHead>
                        <TableBody>
                            {books.map(book => (
                                <TableRow
                                    hover
                                    key={book.id}
                                    onClick={() => this.onRowClicked(book)}
                                >
                                    <TableCell>{book.name}</TableCell>
                                    <TableCell>{book.publisherId}</TableCell>
                                    <TableCell>
                                        {book.authors
                                            .map(author => author.name)
                                            .join(', ')}
                                    </TableCell>
                                </TableRow>
                            ))}
                        </TableBody>
                    </Table>
                </Paper>

                <BookCreateContainer
                    book={this.newBook}
                    openDialog={this.openCreateDialog}
                    onAddDone={this.onAddDone}
                />

                <BookUpdateContainer
                    book={this.existingBook}
                    openDialog={this.openUpdateDialog}
                    onUpdateDone={this.onUpdateDone}
                />
            </div>
        );
    }

    @action
    onAddClicked = () => {
        this.newBook = new Book();
        this.openCreateDialog = true;
    };

    @action
    onAddDone = () => {
        this.openCreateDialog = false;
    };

    @action
    onRowClicked = book => {
        this.existingBook = new Book(book.id, book.name);
        this.openUpdateDialog = true;
    };

    @action
    onUpdateDone = () => {
        this.openUpdateDialog = false;
    };
}

export const BooksView = withStyles(styles)(BooksViewBase);
