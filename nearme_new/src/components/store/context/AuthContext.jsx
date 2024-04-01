import react, { createContext, useState, useContext } from "react";
const AuthContext = createContext({
  currentuser: "",
  token: "",
});

export const AuthContextProvider = ({ children }) => {
  const [currentuser, setCurrentUser] = useState({});
  const [token, setToken] = useState(localStorage.getItem("access_token"));

  const updateToken = (newToken) => {
    setToken(newToken);
    if (newToken) {
      localStorage.setItem("access_token", newToken);
    } else {
      localStorage.removeItem("access_token");
    }
  };
  const updateUser = (user) => {
    setCurrentUser(user);
    if (user) {
      localStorage.setItem("user", JSON.stringify(user));
    } else {
      localStorage.removeItem("user");
    }
  };

  return (
    <AuthContext.Provider
      value={{ currentuser, token, updateUser, updateToken }}
    >
      {children}
    </AuthContext.Provider>
  );
};
export const useAuthContext = () => {
  return useContext(AuthContext);
};
