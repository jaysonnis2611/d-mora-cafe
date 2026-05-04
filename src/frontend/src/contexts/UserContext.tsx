import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useState,
} from "react";

const STORAGE_KEY = "dmora_user_profile";

export interface UserProfile {
  name: string;
  phone: string;
  email: string;
}

interface UserContextValue {
  userProfile: UserProfile | null;
  isProfileSet: boolean;
  saveProfile: (name: string, phone: string, email: string) => void;
}

const UserContext = createContext<UserContextValue | null>(null);

export function UserProvider({ children }: { children: React.ReactNode }) {
  const [userProfile, setUserProfile] = useState<UserProfile | null>(() => {
    try {
      const stored = localStorage.getItem(STORAGE_KEY);
      if (stored) return JSON.parse(stored) as UserProfile;
    } catch {
      // ignore corrupt storage
    }
    return null;
  });

  const isProfileSet = userProfile !== null;

  const saveProfile = useCallback(
    (name: string, phone: string, email: string) => {
      const profile: UserProfile = { name, phone, email };
      try {
        localStorage.setItem(STORAGE_KEY, JSON.stringify(profile));
      } catch {
        // storage unavailable — still update state
      }
      setUserProfile(profile);
    },
    [],
  );

  // Sync from storage if another tab updates it
  useEffect(() => {
    const onStorage = (e: StorageEvent) => {
      if (e.key === STORAGE_KEY && e.newValue) {
        try {
          setUserProfile(JSON.parse(e.newValue) as UserProfile);
        } catch {
          // ignore
        }
      }
    };
    window.addEventListener("storage", onStorage);
    return () => window.removeEventListener("storage", onStorage);
  }, []);

  const value = useMemo(
    () => ({ userProfile, isProfileSet, saveProfile }),
    [userProfile, isProfileSet, saveProfile],
  );

  return <UserContext.Provider value={value}>{children}</UserContext.Provider>;
}

export function useUser(): UserContextValue {
  const ctx = useContext(UserContext);
  if (!ctx) throw new Error("useUser must be used within UserProvider");
  return ctx;
}
