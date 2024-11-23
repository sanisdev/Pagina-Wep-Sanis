import React, { createContext, useContext, useState } from "react";

interface PalapaContextProps {
  selectedPalapa: number | null; // Permitir null
  setSelectedPalapa: (palapaId: number | null) => void; // Permitir null
}

const PalapaContext = createContext<PalapaContextProps | undefined>(undefined);

export const PalapaProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [selectedPalapa, setSelectedPalapa] = useState<number | null>(null); // Estado inicial null

  return (
    <PalapaContext.Provider value={{ selectedPalapa, setSelectedPalapa }}>
      {children}
    </PalapaContext.Provider>
  );
};

export const usePalapaContext = () => {
  const context = useContext(PalapaContext);
  if (!context) {
    throw new Error("usePalapaContext debe ser usado dentro de un PalapaProvider.");
  }
  return context;
};
