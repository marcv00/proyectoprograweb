// src/context/AuthContext.tsx
import { createContext, useContext, useState, type ReactNode } from "react";

type Role = "admin" | "user" | null;

interface AuthContextType {
    role: Role;
    login: (role: Role) => void;
    logout: () => void;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export function AuthProvider({ children }: { children: ReactNode }) {
    const [role, setRole] = useState<Role>(null);

    const login = (newRole: Role) => setRole(newRole);
    const logout = () => setRole(null);

    return (
        <AuthContext.Provider value={{ role, login, logout }}>
            {children}
        </AuthContext.Provider>
    );
}

export function useAuth(): AuthContextType {
    const context = useContext(AuthContext);
    if (!context) throw new Error("useAuth must be used inside AuthProvider");
    return context;
}
