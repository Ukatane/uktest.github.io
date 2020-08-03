import React from 'react';

const authContextTrial = React.createContext({
  authStatus: false,
  login() {},
});

export default authContextTrial;
