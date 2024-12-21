"use client"
import { createContext, useState } from "react";

const UniformContext = createContext();

const UniformContextProvider = ({ children }) => {
  const [product, setProduct] = useState(null);
  const [showWhatsApp, setShowWhatsApp] = useState(false)

  return (
    <UniformContext.Provider value={{ product, setProduct, showWhatsApp, setShowWhatsApp }}>
      {children}
    </UniformContext.Provider>
  );
};

export { UniformContextProvider, UniformContext };
