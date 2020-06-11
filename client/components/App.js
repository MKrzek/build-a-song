/* eslint-disable react/prop-types */
import React from 'react';
import { Link } from 'react-router-dom';
import gql from 'graphql-tag';
import { useQuery } from 'react-apollo';

const AUTH_USER = gql`
  query AUTH_USER {
    user {
      email
      id
    }
  }
`;

const App = ({ children }) => {
  const { loading, error, data } = useQuery(AUTH_USER);
  console.log('data', data);
  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error: {error}</p>;
  if (!data.user === null) return <p>Please log in</p>;

  return (
    <div>
      <nav>
        <div className="nav-wrapper">
          <ul>
            <li>{!data.user && <Link to="/login">Log-in</Link>}</li>

            <li>{!data.user && <Link to="/signin">Sign-in</Link>}</li>
            <li>{data.user && <Link to="/logout">Logout</Link>}</li>
          </ul>
        </div>
      </nav>
      <div>{children} </div>
    </div>
  );
};
export default App;
