import React from 'react';
import { Link } from 'react-router-dom';

const App = () => (
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

    <h3>Build Yourself A Song</h3>
  </div>
);

export default App;
