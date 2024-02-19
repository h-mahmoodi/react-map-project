const { createContext, useReducer, useContext } = require("react");

const AuthContext = createContext();

const initialState = {
  user: null,
  isAuth: false,
  error: "",
};

const actionTypes = {
  LOGIN: "LOGIN",
  LOGOUT: "LOGOUT",
  ERROR: "ERROR",
};

const reducer = (state, action) => {
  switch (action.type) {
    case actionTypes.LOGIN: {
      return {
        ...state,
        user: action.payload,
        isAuth: true,
      };
    }
    case actionTypes.LOGOUT: {
      return {
        ...state,
        user: null,
        isAuth: false,
      };
    }
    case actionTypes.ERROR: {
      return {
        ...state,
        error: action.payload,
      };
    }
    default: {
      throw new Error("Out of actions");
    }
  }
};

const AuthContextProvider = ({ children }) => {
  const [state, dispatch] = useReducer(reducer, initialState);

  const loginHandler = async (email, password) => {
    const response = await fetch("http://localhost:9000/users");
    if (!response.ok) {
      throw new Error("Cant connect to server...");
    }
    const data = await response.json();

    const users = data.filter((item) => {
      return item.email === email && item.password === password;
    });

    if (users.length) {
      dispatch({ type: actionTypes.LOGIN, payload: users[0] });
    }
  };

  const logoutHandler = () => {
    dispatch({ type: actionTypes.LOGOUT });
  };

  const contextValue = {
    user: state.user,
    isAuth: state.isAuth,
    login: loginHandler,
    logout: logoutHandler,
  };

  return (
    <AuthContext.Provider value={contextValue}>{children}</AuthContext.Provider>
  );
};

const useAuth = () => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error("Auth context Error");
  }
  return context;
};

export { AuthContextProvider, useAuth };
