import React from "react";

const AuthContext = React.createContext({
  currentUser: null,
  signupUser: () => {},
  loginUser: () => {},
  logoutUser: () => {},
});

export default AuthContext;
