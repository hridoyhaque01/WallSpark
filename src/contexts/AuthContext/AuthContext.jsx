import {
  getAuth,
  onAuthStateChanged,
  signInWithEmailAndPassword,
  signOut,
} from "firebase/auth";
import { createContext, useContext, useEffect, useState } from "react";
import "../../firebase/firebase.config";

const AuthContext = createContext();
export const useAuth = () => {
  return useContext(AuthContext);
};

const auth = getAuth();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState("");
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(
      auth,
      (currentUser) => {
        setUser(currentUser);
        setIsLoading(false);
      },
      []
    );

    return unsubscribe;
  }, []);

  const authLogin = (email, password) => {
    return signInWithEmailAndPassword(auth, email, password);
  };

  const logout = () => {
    return signOut(auth);
  };

  const value = { user, isLoading, authLogin, logout };
  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};
