// pages/auth/LoginPage.tsx
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../../context/AuthContext";

export default function LoginPage() {
    const { login } = useAuth();
    const navigate = useNavigate();

    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const [error, setError] = useState("");

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();

        try {
            const res = await fetch("src/data/users.json");
            const users = await res.json();

            const matchedUser = users.find(
                (user: any) =>
                    user.username === username && user.password === password
            );

            if (matchedUser) {
                login(matchedUser.username);
                navigate("/");
            } else {
                setError("Credenciales incorrectas.");
            }
        } catch (err) {
            console.error(err);
            setError("Error al verificar credenciales.");
        }
    };

    return (
        <div>
            <h1>Iniciar Sesion</h1>
            <form onSubmit={handleSubmit}>
                <input
                    type="text"
                    placeholder="Usuario"
                    value={username}
                    onChange={(e) => setUsername(e.target.value)}
                    required
                />
                <input
                    type="password"
                    placeholder="Contraseña"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    required
                />
                <button type="submit">Ingresar</button>
            </form>
            <p>¿Olvidaste tu contraseña?</p>
            {error && <p style={{ color: "red" }}>{error}</p>}
        </div>
    );
}
