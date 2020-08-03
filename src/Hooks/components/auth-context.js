import React from 'react';

const authContext = React.createContext({
  authStatus: false,
  login: () => {},
});

export default authContext;
