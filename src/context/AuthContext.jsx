import React, { createContext, useContext, useEffect, useState } from "react";
import { auth, db } from "../firebase/config";
import {
  createUserWithEmailAndPassword,
  signOut,
  signInWithEmailAndPassword,
  onAuthStateChanged,
} from "firebase/auth";
import { doc, getDoc } from "firebase/firestore";

export const AuthContext = createContext();

export const AuthContextProvider = ({ children }) => {
  //state
  const [user, setUser] = useState({});

  const signIn = (email, password) => {
    return signInWithEmailAndPassword(auth, email, password);
  };
  const signUp = (email, password) => {
    return createUserWithEmailAndPassword(auth, email, password);
  };
  const SignOut = () => {
    return signOut(auth);
  };

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
      console.log(currentUser, "current user");
      console.log(user, "it is the user in the context");
      if (currentUser) {
        getDoc(doc(db, "users", currentUser.uid)).then(() => {
          setUser({
            userName: currentUser.displayName,
            userId: currentUser.uid,
          });
        });
      } else {
        setUser(null);
      }
    });
    return () => {
      unsubscribe();
    };
  },[user?.userId]);
  const setAsUser = (val) =>{
    setUser(val)
}
  return (
    <AuthContext.Provider value={{user,signIn,signUp,SignOut,setAsUser}}>
      {children}
    </AuthContext.Provider>
  );
};

export function UserAuth(){
  return useContext(AuthContext)
}