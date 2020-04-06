import React, { useState } from 'react';

const LoginForm = ({ user, loginHandler, logoutHandler }) => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');

  if (!user) {
    return (
      <div>
        <h2>Log in to application</h2>
        <form>
          <div>
            Username:{' '}
            <input type="text" value={username} name="Username" onChange={({ target }) => setUsername(target.value)} />
          </div>
          <div>
            Password:{' '}
            <input
              type="password"
              value={password}
              name="Password"
              onChange={({ target }) => setPassword(target.value)}
            />
          </div>
          <button type="button" onClick={() => loginHandler(username, password)}>login</button>
        </form>
      </div>
    );
  }

  return (
    <div>
      {`${user.name} logged in.`}{' '}
      <button type="button" onClick={() => logoutHandler()}>
        Logout
      </button>
    </div>
  );
};

export default LoginForm;
