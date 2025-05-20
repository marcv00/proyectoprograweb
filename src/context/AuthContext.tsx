import {
    createContext,
    useContext,
    useEffect,
    useState,
    type ReactNode,
} from "react";

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

    useEffect(() => {
        const storedRole = localStorage.getItem("authRole") as Role;
        const storedName = localStorage.getItem("authName");
        if (storedRole) setRole(storedRole);
        if (storedName) setName(storedName);
    }, []);

    const login = (newRole: Role, newName: string | null) => {
        setRole(newRole);
        setName(newName);
        localStorage.setItem("authRole", newRole || "");
        localStorage.setItem("authName", newName || "");
    };

    const logout = () => {
        setRole(null);
        setName(null);
        localStorage.removeItem("authRole");
        localStorage.removeItem("authName");
    };

    return (
        <AuthContext.Provider value={{ role, name, login, logout }}>
            {children}
        </AuthContext.Provider>
    );
}

export function useAuth(): AuthContextType {
    const context = useContext(AuthContext);
    if (!context) throw new Error("useAuth must be used inside AuthProvider");
    return context;
}
