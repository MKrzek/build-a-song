/* eslint-disable react/prop-types */
import React, { useEffect } from 'react';
import gql from 'graphql-tag';
import { graphql } from 'react-apollo';

export const AUTH_USER = gql`
  query AUTH_USER {
    user {
      email
      id
    }
  }
`;

export default WrappedComponent => {
  const RequireAuth = props => {
    console.log('props', props);
    useEffect(() => {
      if (!props.data.loading && !props.data.user) {
        return props.history.push('/login');
      }
    }, [props]);

    return <WrappedComponent {...props} />;
  };
  return graphql(AUTH_USER)(RequireAuth);
};
