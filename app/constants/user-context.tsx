import React, { createContext, useState, useContext } from "react";
import { UserDataType } from "../types/user-data";

type UserContextType = {
  user: UserDataType | null;
  setUser: (user: UserDataType) => void;
};

export const UserContext = createContext<UserContextType>({
  user: null,
  setUser: () => {},
});

export const UserProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const [user, setUser] = useState<UserDataType | null>(null);

  return (
    <UserContext.Provider value={{ user, setUser }}>
      {children}
    </UserContext.Provider>
  );
};

// Optional: Hook for cleaner use
export const useUser = () => useContext(UserContext);
