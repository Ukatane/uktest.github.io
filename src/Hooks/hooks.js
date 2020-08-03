import React, { useState } from 'react';

import Todo from './components/Todo';
import Header from './components/Header';
import Auth from './components/Auth';
import AuthContext from './components/auth-context';
import AuthContextTrial from './components/auth-context-trial';

const Hooks = () => {
  const [route, setRoute] = useState('auth');
  const [authStatus, setAuthStatus] = useState(false);

  const loadRoute = route => setRoute(route);

  const login = () => setAuthStatus(!authStatus);

  return (
    <AuthContextTrial.Provider value={{ authStatus, login }}>
      <AuthContext.Provider value={{ authStatus, login }}>
        <div>
          <Header
            loadTodos={loadRoute.bind(this, 'todo')}
            loadAuth={loadRoute.bind(this, 'auth')}
          />
          <hr />

          {route === 'todo' ? <Todo /> : <Auth />}
        </div>
      </AuthContext.Provider>
    </AuthContextTrial.Provider>
  );
};

export default Hooks;
