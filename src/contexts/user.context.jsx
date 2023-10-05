import React, { useState } from 'react';

const UserContext = React.createContext({
  isAuthenticated: false,
  setIsAuthenticated: () => {},
});

const UserProvider = ({ children }) => {
  const [isAuthenticated, setIsAuthenticated] = useState(true);

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
};

export default UserProvider;
export { UserContext };
