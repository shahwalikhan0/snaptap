import React, { createContext, useState, useContext } from "react";
import { UserDataType } from "../types/user-data";

type UserContextType = {
  user: UserDataType | null;
  isLoggedIn: Boolean;
  setUser: (user: UserDataType) => void;
};

export const UserContext = createContext<UserContextType>({
  user: null,
  isLoggedIn: false,
  setUser: () => {},
});

export const UserProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const [user, setUser] = useState<UserDataType | null>(null);

  const isLoggedIn = !!user?.id;
  return (
    <UserContext.Provider value={{ user, isLoggedIn, setUser }}>
      {children}
    </UserContext.Provider>
  );
};

// Optional: Hook for cleaner use
export const useUser = () => useContext(UserContext);
