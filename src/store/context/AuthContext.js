import react,{createContext,useState,useContext} from  'react';
const AuthContext = createContext({
    currentuser: "",
    token: "",
  });

  export const AuthContextProvider = ({ children }) => {
    const [currentuser, setCurrentUser] = useState({name:"bilal"});
    const [token, setToken] = useState(localStorage.getItem("access_token"));
  
    const updateToken = (newToken) => {
      setToken(newToken);
      if (newToken) {
        localStorage.setItem("access_token", newToken);
      } else {
        localStorage.removeItem("access_token");
      }
    };
  
    return (
      <AuthContext.Provider value={{ currentuser, token, setCurrentUser, updateToken }}>
        {children}
      </AuthContext.Provider>
    );
  };
  export const useAuthContext = () => {
    return useContext(AuthContext);
  };