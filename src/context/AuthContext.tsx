// src/context/AuthContext.tsx
import { createContext, useContext, useState, type ReactNode } from "react";

type Role = "admin" | "user" | null;

interface AuthContextType {
    role: Role;
    name: string | null;
    login: (role: Role, name: string | null) => void;
    logout: () => void;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export function AuthProvider({ children }: { children: ReactNode }) {
    const [role, setRole] = useState<Role>(null);
    const [name, setName] = useState<string | null>(null);

    const login = (newRole: Role, name: string | null) => {
        setRole(newRole);
        setName(name);
    };

    const logout = () => {
        setRole(null);
        setName(null);
    };

    return (
        <AuthContext.Provider value={{ role, login, logout, name }}>
            {children}
        </AuthContext.Provider>
    );
}

export function useAuth(): AuthContextType {
    const context = useContext(AuthContext);
    if (!context) throw new Error("useAuth must be used inside AuthProvider");
    return context;
}
