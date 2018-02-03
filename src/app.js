import React from 'react';
import { Router } from 'react-router-dom';
import { InMemoryCache } from 'apollo-cache-inmemory';
import { ApolloClient } from 'apollo-client';
import { split } from 'apollo-link';
import { HttpLink } from 'apollo-link-http';
import { WebSocketLink } from 'apollo-link-ws';
import { getMainDefinition } from 'apollo-utilities';
import { ApolloProvider } from 'react-apollo';
import blue from 'material-ui/colors/blue';
import pink from 'material-ui/colors/pink';
import red from 'material-ui/colors/red';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import createMuiTheme from 'material-ui/styles/createMuiTheme';
import { Provider } from 'mobx-react';
import { browserHistory } from 'shared/utils';
import { Shell } from './shell';

const palette = {
    primary: {
        main: blue[500]
    },
    secondary: {
        main: pink.A400
    },
    error: {
        main: red.A400
    }
};

export class App extends React.Component {
    render() {
        const theme = createMuiTheme({ palette });

        // Create an http link:
        const httpLink = new HttpLink({
            uri: 'http://localhost:8080/graphql'
        });

        // Create a WebSocket link:
        const wsLink = new WebSocketLink({
            uri: 'ws://localhost:8080/subscriptions',
            options: {
                reconnect: true
            }
        });

        // Using the ability to split links, send data to each link
        // depending on what kind of operation is being sent
        const link = split(
            // split based on operation type
            ({ query }) => {
                const { kind, operation } = getMainDefinition(query);
                return (
                    kind === 'OperationDefinition' &&
                    operation === 'subscription'
                );
            },
            wsLink,
            httpLink
        );

        // Create the Apollo client
        const apolloClient = new ApolloClient({
            link: link,
            cache: new InMemoryCache()
        });

        return (
            <ApolloProvider client={apolloClient}>
                <MuiThemeProvider theme={theme}>
                    <Provider>
                        <Router history={browserHistory}>
                            <Shell />
                        </Router>
                    </Provider>
                </MuiThemeProvider>
            </ApolloProvider>
        );
    }
}
