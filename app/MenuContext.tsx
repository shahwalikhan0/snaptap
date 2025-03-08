import React, { createContext, useContext, useState } from "react";

// Define the context type
interface MenuContextType {
  menuVisible: boolean;
  setMenuVisible: (visible: boolean) => void;
}

// Create the context
const MenuContext = createContext<MenuContextType | undefined>(undefined);

// Create a provider component
export const MenuProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const [menuVisible, setMenuVisible] = useState(false);

  return (
    <MenuContext.Provider value={{ menuVisible, setMenuVisible }}>
      {children}
    </MenuContext.Provider>
  );
};

// Custom hook for using the context
export const useMenu = () => {
  const context = useContext(MenuContext);
  if (!context) {
    throw new Error("useMenu must be used within a MenuProvider");
  }
  return context;
};
