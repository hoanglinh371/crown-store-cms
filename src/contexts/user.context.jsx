import React, { useState } from 'react';

const UserContext = React.createContext({
  isAuthenticated: false,
  setIsAuthenticated: () => {},
});

function UserProvider({ children }) {
  const isLogin = !!localStorage.getItem('user');

  const [isAuthenticated, setIsAuthenticated] = useState(isLogin);

  return (
    <UserContext.Provider
      value={{
        isAuthenticated,
        setIsAuthenticated,
      }}
    >
      {children}
    </UserContext.Provider>
  );
}

export default UserProvider;
export { UserContext };
