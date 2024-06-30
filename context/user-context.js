import { createContext, useState } from "react";

export const UserContext = createContext({
  user: "",
  isLoggedIn: false,
  updateUser: (username) => {},
  updateIsLoggedIn: (value) => {},
});

function UserContextProvider({ children }) {
  const [user, setUser] = useState("");
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  function updateUser(username) {
    setUser(username);
  }

  function updateIsLoggedIn(value) {
    setIsLoggedIn(value);
  }

  const value = {
    user: user,
    isLoggedIn: isLoggedIn,
    updateUser: updateUser,
    updateIsLoggedIn: updateIsLoggedIn,
  };

  return <UserContext.Provider value={value}>{children}</UserContext.Provider>;
}

export default UserContextProvider;
