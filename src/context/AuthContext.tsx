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
    token: string | null;
    login: (role: Role, name: string | null, token: string) => void;
    logout: () => void;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export function AuthProvider({ children }: { children: ReactNode }) {
    const [role, setRole] = useState<Role>(null);
    const [name, setName] = useState<string | null>(null);
    const [token, setToken] = useState<string | null>(null);

    useEffect(() => {
        const storedRole = localStorage.getItem("authRole") as Role;
        const storedName = localStorage.getItem("authName");
        const storedToken = localStorage.getItem("authToken");

        if (storedRole) setRole(storedRole);
        if (storedName) setName(storedName);
        if (storedToken) setToken(storedToken);
    }, []);

    const login = (newRole: Role, newName: string | null, newToken: string) => {
        setRole(newRole);
        setName(newName);
        setToken(newToken);

        localStorage.setItem("authRole", newRole || "");
        localStorage.setItem("authName", newName || "");
        localStorage.setItem("authToken", newToken || "");
    };

    const logout = () => {
        setRole(null);
        setName(null);
        setToken(null);

        localStorage.removeItem("authRole");
        localStorage.removeItem("authName");
        localStorage.removeItem("authToken");
    };

    return (
        <AuthContext.Provider value={{ role, name, token, login, logout }}>
            {children}
        </AuthContext.Provider>
    );
}

export function useAuth(): AuthContextType {
    const context = useContext(AuthContext);
    if (!context) throw new Error("useAuth must be used inside AuthProvider");
    return context;
}
