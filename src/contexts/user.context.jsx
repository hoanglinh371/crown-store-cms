import React from 'react';

const UserContext = React.createContext(null);

const UserProvider = ({ children }) => {
  return <UserContext.Provider value={{}}>{children}</UserContext.Provider>;
};

export default UserProvider;
export { UserContext };
