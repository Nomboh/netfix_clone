import {
  createUserWithEmailAndPassword,
  onAuthStateChanged,
  signInWithEmailAndPassword,
  signOut,
  User,
} from "firebase/auth";

import { useRouter } from "next/router";
import React, {
  useEffect,
  useContext,
  createContext,
  useMemo,
  useState,
} from "react";
import { auth } from "../firebase";

interface IAuth {
  user: User | null;
  signUp: (email: string, password: string) => Promise<void>;
  signIn: (email: string, password: string) => Promise<void>;
  logOut: () => Promise<void>;
  loading: boolean;
  error: string | null;
}

const AuthContext = createContext<IAuth>({
  user: null,
  signUp: async () => {},
  signIn: async () => {},
  logOut: async () => {},
  loading: false,
  error: null,
});

interface authProviderProps {
  children: React.ReactNode;
}

export const AuthProvider = ({ children }: authProviderProps) => {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [initialized, setInitialized] = useState(true);
  const router = useRouter();

  useEffect(() => {
    onAuthStateChanged(auth, user => {
      if (user) {
        setUser(user);
        setLoading(false);
        router.push("/");
      } else {
        setUser(null);
        setLoading(true);
        router.push("/login");
      }

      setInitialized(false);
    });
  }, [auth]);

  const signUp = async (email: string, password: string) => {
    setLoading(true);
    await createUserWithEmailAndPassword(auth, email, password)
      .then(userCredentials => {
        setUser(userCredentials.user);
        router.push("/login");
        setLoading(false);
      })
      .catch(error => {
        alert(error.message);
        setError(error.message);
      })
      .finally(() => {
        setLoading(false);
      });
  };

  const signIn = async (email: string, password: string) => {
    setLoading(true);
    await signInWithEmailAndPassword(auth, email, password)
      .then(userCredentials => {
        setUser(userCredentials.user);
        router.push("/");
        setLoading(false);
      })
      .catch(error => {
        alert(error.message);
        setError(error.message);
      })
      .finally(() => {
        setLoading(false);
      });
  };

  const logOut = async () => {
    setLoading(true);
    await signOut(auth)
      .catch(error => {
        alert(error.message);
      })
      .finally(() => {
        setLoading(false);
      });
  };

  const memoizedValue = useMemo(
    () => ({
      user,
      signUp,
      signIn,
      logOut,
      loading,
      error,
    }),
    [user, loading, error]
  );

  return (
    <AuthContext.Provider value={memoizedValue}>
      {!initialized && children}
    </AuthContext.Provider>
  );
};

export default function useAuth() {
  return useContext(AuthContext);
}
