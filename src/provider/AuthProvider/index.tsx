"use client";
import { createContext, ReactNode, useContext } from "react";

type AuthContextType = {};

const AuthContext = createContext<AuthContextType | null>(null);

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
};

type Props = {
  children: ReactNode;
};

export default function AuthProvider({ children }: Props) {
  return <AuthContext.Provider value={{}}>{children}</AuthContext.Provider>;
}
