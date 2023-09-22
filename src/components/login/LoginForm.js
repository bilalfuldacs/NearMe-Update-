import React, { useState } from 'react';
import './LoginForm.css';
import Loading from './LoginGif';
import { Link,redirect } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';
function Login() {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate();
  const handleUsernameChange = (event) => {
    setUsername(event.target.value);
  };

  const handlePasswordChange = (event) => {
    setPassword(event.target.value);
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
  
   
  
    const values = { email: username, password: password };
  
    try {
      const response = await fetch('http://127.0.0.1:8000/api/login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(values),
      });
  
      if (!response.ok) {
        throw new Error('Error registering user');
      }

      const responseData = await response.json();

        console.log(responseData)
       return navigate('/display/event');
    // return redirect('/display/event');
  
      // Redirect to another page or update the UI based on the successful login
  
    } catch (error) {
      console.error('Error logging user:', error.email);
    }
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
