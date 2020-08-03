import React, { useContext } from 'react';

import AuthContext from './auth-context-trial';

const Header = props => {
  const auth = useContext(AuthContext);

  return (
    <div
      style={{
        margin: 14,
      }}
    >
      {auth.authStatus && <button onClick={props.loadTodos}>Todo</button>} ~{' '}
      <button onClick={props.loadAuth}>Auth</button>
    </div>
  );
};

export default Header;
