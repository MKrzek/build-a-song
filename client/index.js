import React from 'react';
import ReactDOM from 'react-dom';
import ApolloClient from 'apollo-client';
import { ApolloProvider } from 'react-apollo';
import { InMemoryCache } from 'apollo-cache-inmemory';
import { HttpLink } from 'apollo-link-http';
import './style/style.css';
import { HashRouter as Router, Route, Switch } from 'react-router-dom';
import SongList from './components/SongList';

import SongCreate from './components/SongCreate';
import SongDetail from './components/SongDetail';

const link = new HttpLink({ uri: 'http://localhost:4000/graphql' });
const cache = new InMemoryCache();
const client = new ApolloClient({ link, cache });
console.log('client', client);

const Root = () => (
  <div className="container">
    <ApolloProvider client={client}>
      <Router>
        <Switch>
          <Route exact path="/songs" component={SongList} />
          <Route exact path="/songs-new" component={SongCreate} />
          <Route exact path="/songs/:id" component={SongDetail} />
        </Switch>
      </Router>
    </ApolloProvider>
  </div>
);

ReactDOM.render(<Root />, document.querySelector('#root'));
