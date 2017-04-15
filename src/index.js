import './index.css';

import React from 'react';
import ReactDOM from 'react-dom';
import { createStore, combineReducers, applyMiddleware, compose } from 'redux';
import { ApolloClient, ApolloProvider } from 'react-apollo';
import { networkInterface } from './graphql/networkInterface';
import App from './App';
import { reducer as counter } from './counter';

const client = new ApolloClient({ networkInterface });
const store = createStore(
  combineReducers({
    counter,
    apollo: client.reducer(),
  }),
  {},
  compose(
    applyMiddleware(client.middleware()),
  )
);

ReactDOM.render(
  <ApolloProvider store={store} client={client}>
    <App />
  </ApolloProvider>,
  document.getElementById('root'),
);
