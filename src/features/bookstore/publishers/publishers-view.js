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
import { Publisher } from './publisher';
import { PublisherCreateContainer } from './publisher-create-container';
import { PublisherUpdateContainer } from './publisher-update-container';

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

@observer
class PublishersViewBase extends React.Component {
    static propTypes = {
        publishers: PropTypes.arrayOf(PropTypes.object).isRequired
    };

    @observable openCreateDialog = false;
    @observable openUpdateDialog = false;
    @observable newPublisher = new Publisher();
    @observable existingPublisher = new Publisher();

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
                                    <TableRow
                                        hover
                                        key={publisher.id}
                                        onClick={() => this.onRowClicked(publisher)}
                                    >
                                        <TableCell>{publisher.name}</TableCell>
                                    </TableRow>
                                ))
                            }
                        </TableBody>
                    </Table>
                </Paper>

                <PublisherCreateContainer
                    publisher={this.newPublisher}
                    openDialog={this.openCreateDialog}
                    onAddDone={this.onAddDone}
                />

                <PublisherUpdateContainer
                    publisher={this.existingPublisher}
                    openDialog={this.openUpdateDialog}
                    onUpdateDone={this.onUpdateDone}
                />
            </div>
        );
    }

    @action
    onAddClicked = () => {
        this.newPublisher = new Publisher();
        this.openCreateDialog = true;
    };

    @action
    onAddDone = () => {
        this.openCreateDialog = false;
    };

    @action
    onRowClicked = (publisher) => {
        this.existingPublisher = new Publisher(publisher.id, publisher.name);
        this.openUpdateDialog = true;
    };

    @action
    onUpdateDone = () => {
        this.openUpdateDialog = false;
    };
}

export const PublishersView = withStyles(styles)(PublishersViewBase);
