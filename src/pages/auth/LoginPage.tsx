import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { useAuth } from "../../context/AuthContext";
import "./LoginPage.css";

export default function LoginPage() {
    const { login } = useAuth();
    const navigate = useNavigate();

    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [error, setError] = useState("");

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();

        try {
            const res = await fetch("./data/users.json");
            const users = await res.json();

            const matchedUser = users.find(
                (user: any) =>
                    user.email === email && user.password === password
            );

            if (matchedUser) {
                login(matchedUser.role, matchedUser.name);

                if (matchedUser.role === "admin") {
                    navigate("/admin");
                } else {
                    navigate("/");
                }
            } else {
                setError("Credenciales inválidas.");
            }
        } catch (err) {
            console.error(err);
            setError("Error al verificar credenciales.");
        }
    };

    return (
        <div className="container">
            <div className="card">
                <h1 className="title">Iniciar Sesión</h1>
                <form onSubmit={handleSubmit} className="form">
                    <input
                        type="email"
                        placeholder="Correo Electrónico"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        required
                        className="input"
                    />
                    <input
                        type="password"
                        placeholder="Contraseña"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        required
                        className="input"
                    />
                    <button type="submit" className="button">Ingresar</button>
                </form>
                <Link to="/forgot-password" className="forgot-password-link">
                    ¿Olvidaste tu contraseña?
                </Link>
                {error && <p className="error">{error}</p>}
            </div>
        </div>
    );
}
