"use client";
import { createContext, ReactNode, useContext } from "react";

type AuthContextType = {
  token: string | undefined;
};

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
  token: string | undefined;
};

export default function AuthProvider({ children, token }: Props) {
  return (
    <AuthContext.Provider value={{ token }}>{children}</AuthContext.Provider>
  );
}
