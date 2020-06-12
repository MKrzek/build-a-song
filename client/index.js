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
import Landing from './components/Landing';
import Login from './components/Login';
import Signin from './components/Signin';
import Logout from './components/Logout';
import App from './components/App';
import requireAuth from './components/requireAuth';

const link = new HttpLink({ uri: 'http://localhost:4000/graphql' });
const cache = new InMemoryCache();
const client = new ApolloClient({ link, cache });

const Root = () => (
  <div className="container">
    <ApolloProvider client={client}>
      <Router>
        <App />
        <Switch>
          <Route exact path="/" component={Landing} />
          <Route exact path="/signin" component={Signin} />
          <Route exact path="/login" component={Login} />
          <Route exact path="/logout" component={Logout} />
          <Route exact path="/songs" component={requireAuth(SongList)} />
          <Route exact path="/songs-new" component={requireAuth(SongCreate)} />
          <Route exact path="/songs/:id" component={requireAuth(SongDetail)} />
        </Switch>
      </Router>
    </ApolloProvider>
  </div>
);

ReactDOM.render(<Root />, document.querySelector('#root'));
