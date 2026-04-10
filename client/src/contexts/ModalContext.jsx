import { createContext, useContext, useState } from "react";

const ModalWindowsContext = createContext();

export const ModalProvider = ({ children }) => {
  const [isCartOpen, setCartOpen] = useState(false);

  return (
    <ModalWindowsContext.Provider
      value={{
        isCartOpen,
        setCartOpen,
      }}
    >
      {children}
    </ModalWindowsContext.Provider>
  );
};

export const useModal = () => useContext(ModalWindowsContext);
