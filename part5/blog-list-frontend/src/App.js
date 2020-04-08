import React, { useState, useEffect } from 'react';
import blogService from './services/blogs';
import loginService from './services/login';
import LoginForm from './components/LoginForm';
import Blogs from './components/Blogs';
import Notification from './components/Notification';

const App = () => {
  const [user, setUser] = useState(null);
  const [message, setMessage] = useState({ content: null, color: '#61dafb' });

  const showNotification = (content, color = '#61dafb') => {
    if (content instanceof Error) {
      console.log(content);
      const error =
        content.response && content.response.data.error !== undefined
          ? content.response.data.error
          : 'Something went wrong!'
      setMessage({ content: error, color: 'red' })
      setTimeout(() => {
        setMessage({ content: null })
      }, 6000)
    } else {
      setMessage({ content, color })
      setTimeout(() => {
        setMessage({ content: null })
      }, 6000)
    }
  }

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
      showNotification(exception)
    }
  };

  const handleLogout = () => {
    window.localStorage.removeItem('loggedBlogAppUser');
    showNotification(`${user.name} has been logged out`)
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
      <Notification message={message} />
      <LoginForm 
        user={user}
        loginHandler={handleLogin}
        logoutHandler={handleLogout}
      />
      <Blogs 
        user={user}
        showNotification={showNotification}
      />
    </div>
  );
};

export default App;
