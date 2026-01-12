import { createContext, useContext, useEffect, useState } from "react";
import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  signOut,
  onAuthStateChanged,
  updateProfile,
} from "firebase/auth";
import { auth } from "../firebase";

const AuthContext = createContext(null);

const getStorageKey = (uid) => `portgenie_user_${uid}`;

export const AuthContextProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [profile, setProfile] = useState(null);

  /* ======================
     AUTH
     ====================== */
  const signUp = async (email, password, username) => {
    const cred = await createUserWithEmailAndPassword(auth, email, password);
    if (username) {
      await updateProfile(cred.user, { displayName: username });
    }
    return cred.user;
  };

  const logIn = (email, password) =>
    signInWithEmailAndPassword(auth, email, password);

  const logOut = async () => {
    await signOut(auth);
    setUser(null);
    setProfile(null);
  };

  /* ======================
     PROFILE + SETTINGS
     ====================== */
  const updateProfileData = (updates) => {
    setProfile((prev) => {
      const next = { ...prev, ...updates };
      localStorage.setItem(getStorageKey(user.uid), JSON.stringify(next));
      return next;
    });
  };

  /* ======================
     AUTH STATE LISTENER
     ====================== */
  useEffect(() => {
    const unsub = onAuthStateChanged(auth, (firebaseUser) => {
      if (!firebaseUser) {
        setUser(null);
        setProfile(null);
        setLoading(false);
        return;
      }

      setUser(firebaseUser);

      const saved =
        JSON.parse(localStorage.getItem(getStorageKey(firebaseUser.uid))) ||
        {
          username: firebaseUser.displayName || "",
          email: firebaseUser.email || "",
          github: "",
          bio: "",
          profilePic: null,
          theme: "dark",
          notifications: true,
          language: "English",
        };

      setProfile(saved);
      setLoading(false);
    });

    return () => unsub();
  }, []);

  return (
    <AuthContext.Provider
      value={{
        user,
        profile,
        updateProfileData,
        loading,
        signUp,
        logIn,
        logOut,
      }}
    >
      {!loading && children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);
