"use client"
import { createContext, useState } from "react";

const UniformContext = createContext();

const UniformContextProvider = ({ children }) => {
  const [product, setProduct] = useState(null);

  return (
    <UniformContext.Provider value={{ product, setProduct }}>
      {children}
    </UniformContext.Provider>
  );
};

export { UniformContextProvider, UniformContext };
