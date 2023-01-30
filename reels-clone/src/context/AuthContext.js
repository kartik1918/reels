import React, { useState, useEffect } from "react";
import { auth } from "../firebase";
export const AuthContext = React.createContext();

export const AuthProvider = ({ children }) => {
    console.log("children are heer--------->", children);
  const [user, setUser] = useState();
  const [loading, setLoading] = useState(true);

  const signUp = (email, password) => {
    return auth.createUserWithEmailAndPassword(email, password);
  };

  const login = (email, password) => {
    return auth.signInWithEmailAndPassword(email, password);
  };

  const logout = () => {
    return auth.signOut();
  };

  useEffect(() => {
    const unsub = auth.onAuthStateChanged((user) => {
      setUser(user);
      setLoading(false);
    });

    return () => {
      unsub();
    };
  }, []);

  const store = {
    user,
    signUp,
    login,
    logout,
  };

  return (
    <AuthContext.Provider value={store}>
      {!loading && children}
    </AuthContext.Provider>
  );
};
