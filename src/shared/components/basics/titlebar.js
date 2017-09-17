// Example: <Titlebar>Home</Titlebar>

import React from 'react';
import AppBar from 'material-ui/AppBar';
import Typography from 'material-ui/Typography';
import Toolbar from 'material-ui/Toolbar';

export function Titlebar({ children }) {
    return (
        <AppBar position="static">
            <Toolbar>
                <Typography type="title" color="inherit">
                    {children}
                </Typography>
            </Toolbar>
        </AppBar>
    );
}
