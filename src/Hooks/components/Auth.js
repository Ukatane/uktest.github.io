import React, { useContext } from 'react';

import AuthContext from './auth-context-trial';

const Auth = () => {
  const auth = useContext(AuthContext);

  return (
    <div>
      <h1>Authentication</h1>
      <button onClick={auth.login}>log in</button>
    </div>
  );
};

export default Auth;
