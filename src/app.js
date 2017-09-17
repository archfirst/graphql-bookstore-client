import React from 'react';
import { BrowserRouter as Router } from 'react-router-dom';
import ApolloClient, { createNetworkInterface } from 'apollo-client';
import { ApolloProvider } from 'react-apollo';
import blue from 'material-ui/colors/blue';
import pink from 'material-ui/colors/pink';
import red from 'material-ui/colors/red';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import createMuiTheme from 'material-ui/styles/createMuiTheme';
import { Provider } from 'mobx-react';
import { Shell } from './shell';

export class App extends React.Component {
    render() {
        // Create Material UI theme
        const palette = {
            primary: blue,
            secondary: pink,
            error: red,
            type: 'light'
        };

        const typography = {
            fontFamily: '"Roboto", "Helvetica", "Arial", sans-serif'
        };

        const theme = createMuiTheme({ palette, typography });

        // Create Apollo client
        const graphqlServerUri = 'http://localhost:8080/graphql';
        const networkInterface = createNetworkInterface({
            uri: graphqlServerUri
        });
        const apolloClient = new ApolloClient({
            networkInterface: networkInterface,
            dataIdFromObject: o => o.id
        });

        return (
            <ApolloProvider client={apolloClient}>
                <MuiThemeProvider theme={theme}>
                    <Provider>
                        <Router>
                            <Shell />
                        </Router>
                    </Provider>
                </MuiThemeProvider>
            </ApolloProvider>
        );
    }
}
