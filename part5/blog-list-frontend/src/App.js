import React, { useState, useEffect } from 'react';
import blogService from './services/blogs';
import loginService from './services/login';
import LoginForm from './components/LoginForm';
import Blogs from './components/Blogs';

const App = () => {
  const [user, setUser] = useState(null);

  const handleLogin = async (username, password) => {
    try {
      const user = await loginService.login({
        username,
        password
      });

      window.localStorage.setItem('loggedBlogAppUser', JSON.stringify(user));

      blogService.setToken(user.token)

      setUser(user);
    } catch (exception) {
      // error handling
    }
  };

  const handleLogout = () => {
    window.localStorage.removeItem('loggedBlogAppUser');
    setUser(null);
  };

  const isLoggedIn = user ? true : false;

  useEffect(() => {
    const loggedUserJSON = window.localStorage.getItem('loggedBlogAppUser');
    if (loggedUserJSON) {
      const user = JSON.parse(loggedUserJSON);
      setUser(user);
      blogService.setToken(user.token)
    }
  }, []);

  return (
    <div>
      <h2>Blogs List</h2>
      <hr />
      <LoginForm 
        user={user}
        loginHandler={handleLogin}
        logoutHandler={handleLogout}
      />
      <Blogs 
        show={isLoggedIn}
      />
    </div>
  );
};

export default App;
