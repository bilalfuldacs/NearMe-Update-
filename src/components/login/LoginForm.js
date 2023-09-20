import React, { useState } from 'react';
import './LoginForm.css';
import Loading from './LoginGif';
import { Link } from 'react-router-dom';
function Login() {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');

  const handleUsernameChange = (event) => {
    setUsername(event.target.value);
  };

  const handlePasswordChange = (event) => {
    setPassword(event.target.value);
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    console.log(`Username: ${username}, Password: ${password}`);
  };

  return (
    <div className="container">
      <div className="logo-container">
        <Loading />
      </div>
      <div className="child-container">
        <form onSubmit={handleSubmit}>
          <div className="form-group">
            <input
              type="text"
              id="username"
              name="username"
              className="input"
              placeholder="Username"
              value={username}
              onChange={handleUsernameChange}
            />
         
            <input
              type="password"
              id="password"
              name="password"
              className="input"
              placeholder="Password"
              value={password}
              onChange={handlePasswordChange}
            />
          </div>
          <button type="submit" className="button ">
            Login
          </button>
        </form>
        <div className="signup-link">
          Don't have an account?  <Link to="/signup">Signup</Link>
        </div>
      </div>
    </div>
  );
}

export default Login;
