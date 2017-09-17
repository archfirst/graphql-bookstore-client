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
import PropTypes from 'prop-types';

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

class BooksViewBase extends React.Component {
    static propTypes = {
        books: PropTypes.arrayOf(PropTypes.object).isRequired
    };

    render() {
        const { classes, books } = this.props;

        return (
            <div className={classes.root}>
                <div className={classes.header}>
                    <Typography type="title">Books</Typography>
                    <Button
                        dense
                        color="primary"
                        onClick={this.onAddClicked}
                    >
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
                            {
                                books.map(book => (
                                    <TableRow hover key={book.id}>
                                        <TableCell>{book.name}</TableCell>
                                        <TableCell>{book.publisher.name}</TableCell>
                                        <TableCell>{book.authors.map(author => author.name).join(', ')}</TableCell>
                                    </TableRow>
                                ))
                            }
                        </TableBody>
                    </Table>
                </Paper>





            </div>
        );
    }

    onAddClicked = () => {
        console.log('Add clicked');
    }
}

export const BooksView = withStyles(styles)(BooksViewBase);
