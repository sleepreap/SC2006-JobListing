import { createContext, useReducer } from "react";

export const AuthContext = createContext();

const authReducer = (state, action) => {
  switch (action.type) {
    case "LOGIN":
      return { user: action.payload };
    case "LOGOUT":
      return { user: null };
    default:
      return state;
  }
};

export const AuthContextProvider = ({ children }) => {
  const [state, dispatch] = useReducer(authReducer, { users: null });
  //dispatch is a function while state is like a global variable
  console.log("AuthContext state: ", state);
  return (
    <AuthContext.Provider value={{ ...state, dispatch }}>
      {/* allow children to access state and dispatch function */}
      {children}
    </AuthContext.Provider>
  );
};
