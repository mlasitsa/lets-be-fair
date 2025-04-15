// context/RoleContext.tsx
import { createContext, useContext, useState, ReactNode } from 'react';

type RoleContextType = {
  isInterviewer: boolean | null;
  setIsInterviewer: (val: boolean) => void;
};

const RoleContext = createContext<RoleContextType | undefined>(undefined);

export const RoleProvider = ({ children }: { children: ReactNode }) => {
  const [isInterviewer, setIsInterviewer] = useState<boolean | null>(null);

  return (
    <RoleContext.Provider value={{ isInterviewer, setIsInterviewer }}>
      {children}
    </RoleContext.Provider>
  );
};

export const useRole = () => {
  const context = useContext(RoleContext);
  if (!context) throw new Error("useRole must be used inside RoleProvider");
  return context;
};
