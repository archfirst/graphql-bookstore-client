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

class PublishersViewBase extends React.Component {
    static propTypes = {
        publishers: PropTypes.arrayOf(PropTypes.object).isRequired
    };

    render() {
        const { classes, publishers } = this.props;

        return (
            <div className={classes.root}>
                <div className={classes.header}>
                    <Typography type="title">Publishers</Typography>
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
                                publishers.map(publisher => (
                                    <TableRow hover key={publisher.id}>
                                        <TableCell>{publisher.name}</TableCell>
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

export const PublishersView = withStyles(styles)(PublishersViewBase);
