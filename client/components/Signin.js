/* eslint-disable react/prop-types */
import React, { useState, useEffect } from 'react';
import gql from 'graphql-tag';
import { useMutation, useQuery } from 'react-apollo';
import { AUTH_USER } from './App';

const SIGNIN = gql`
  mutation SIGNIN($email: String!, $password: String!) {
    signin(input: { email: $email, password: $password }) {
      email
      id
    }
  }
`;
const Signin = ({ history }) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [signin, { loading, error }] = useMutation(SIGNIN, {
    refetchQueries: [{ query: AUTH_USER }],
  });
  const {
    data: authUser,
    error: authUserError,
    loading: authUserLoading,
  } = useQuery(AUTH_USER);
  useEffect(() => {
    if (authUser && authUser.user) {
      history.push('/songs');
    }
  }, [authUser, history]);

  const handleSubmit = e => {
    e.preventDefault();
    signin({
      variables: { email, password },
    }).then(res => {
      if (authUser) {
        setEmail('');
        setPassword('');
      }
    });
  };

  return (
    <div>
      <h3>Login</h3>
      <form onSubmit={e => handleSubmit(e)}>
        <fieldset disabled={loading}>
          <label htmlFor="email">
            {' '}
            Email
            <input
              value={email}
              onChange={e => setEmail(e.target.value)}
              placeholder="Email"
              name="email"
            />
          </label>
          <label htmlFor="password">
            {' '}
            Password
            <input
              value={password}
              onChange={e => setPassword(e.target.value)}
              placeholder="Password"
              name="password"
            />
          </label>

          <button type="submit">Login</button>
        </fieldset>
      </form>
    </div>
  );
};

export default Signin;
