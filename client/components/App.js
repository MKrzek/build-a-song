/* eslint-disable react/prop-types */
import React from 'react';
import { Link } from 'react-router-dom';

const App = ({ children }) => (
  <div>
    <nav>
      <div className="nav-wrapper">
        <ul>
          <li>
            <Link to="/login">Log-in</Link>
          </li>

          <li>
            <Link to="/signin">Sign-in</Link>
          </li>
          <li>
            <Link to="/logout">Logout</Link>
          </li>
        </ul>
      </div>
    </nav>
    <div>{children} </div>
  </div>
);
export default App;
