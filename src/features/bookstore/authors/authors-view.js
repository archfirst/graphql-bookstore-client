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

class AuthorsViewBase extends React.Component {
    static propTypes = {
        authors: PropTypes.arrayOf(PropTypes.object).isRequired
    };

    render() {
        const { classes, authors } = this.props;

        return (
            <div className={classes.root}>
                <div className={classes.header}>
                    <Typography type="title">Authors</Typography>
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
                            </TableRow>
                        </TableHead>
                        <TableBody>
                            {
                                authors.map(author => (
                                    <TableRow hover key={author.id}>
                                        <TableCell>{author.name}</TableCell>
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

export const AuthorsView = withStyles(styles)(AuthorsViewBase);
