import React, { createContext } from "react";
import { UserContextType } from "../types/user-data";

const defaultValue: UserContextType = {
  user: null,
  setUser: () => {},
};

export const UserContext = createContext<UserContextType>(defaultValue);
