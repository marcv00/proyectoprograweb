// pages/auth/LoginPage.tsx
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../../context/AuthContext";

export default function LoginPage() {
    const { login } = useAuth();
    const navigate = useNavigate();

    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [error, setError] = useState("");

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();

        try {
            const res = await fetch("src/data/users.json");
            const users = await res.json();

            const matchedUser = users.find(
                (user: any) =>
                    user.email === email && user.password === password
            );

            if (matchedUser) {
                login(matchedUser.email);
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
                    type="email"
                    placeholder="Correo Electrónico"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
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
