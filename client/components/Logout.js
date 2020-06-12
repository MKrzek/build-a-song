import React, { useEffect } from 'react';
import gql from 'graphql-tag';
import { useMutation } from 'react-apollo';
import { AUTH_USER } from './App';

const LOGOUT = gql`
  mutation LOGOUT {
    logout {
      email
      id
    }
  }
`;

const Logout = () => {
  const [logout, { loading, error }] = useMutation(LOGOUT, {
    refetchQueries: [{ query: AUTH_USER }],
  });
  useEffect(() => {
    logout();
  }, [logout]);
  return <h4>You have successfully logged out</h4>;
};

export default Logout;
