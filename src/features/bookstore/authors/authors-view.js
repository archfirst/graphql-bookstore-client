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
import { Author } from './author';
import { AuthorCreateContainer } from './author-create-container';
import { AuthorUpdateContainer } from './author-update-container';

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
class AuthorsViewBase extends React.Component {
    static propTypes = {
        authors: PropTypes.arrayOf(PropTypes.object).isRequired
    };

    @observable openCreateDialog = false;
    @observable openUpdateDialog = false;
    @observable newAuthor = new Author();
    @observable existingAuthor = new Author();

    render() {
        const { classes, authors } = this.props;

        return (
            <div className={classes.root}>
                <div className={classes.header}>
                    <Typography type="title">Authors</Typography>
                    <Button dense color="primary" onClick={this.onAddClicked}>
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
                            {authors.map(author => (
                                <TableRow
                                    hover
                                    key={author.id}
                                    onClick={() => this.onRowClicked(author)}
                                >
                                    <TableCell>{author.name}</TableCell>
                                </TableRow>
                            ))}
                        </TableBody>
                    </Table>
                </Paper>

                <AuthorCreateContainer
                    author={this.newAuthor}
                    openDialog={this.openCreateDialog}
                    onAddDone={this.onAddDone}
                />

                <AuthorUpdateContainer
                    author={this.existingAuthor}
                    openDialog={this.openUpdateDialog}
                    onUpdateDone={this.onUpdateDone}
                />
            </div>
        );
    }

    @action
    onAddClicked = () => {
        this.newAuthor = new Author();
        this.openCreateDialog = true;
    };

    @action
    onAddDone = () => {
        this.openCreateDialog = false;
    };

    @action
    onRowClicked = author => {
        this.existingAuthor = new Author(author.id, author.name);
        this.openUpdateDialog = true;
    };

    @action
    onUpdateDone = () => {
        this.openUpdateDialog = false;
    };
}

export const AuthorsView = withStyles(styles)(AuthorsViewBase);
