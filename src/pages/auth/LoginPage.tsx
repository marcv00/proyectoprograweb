// pages/auth/LoginPage.tsx
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../../context/AuthContext";
import "./LoginPage.css"; // Importa el archivo CSS para estilos
import { Link } from "react-router-dom";
import logo from "/logo.svg";

export default function LoginPage() {
    const { login } = useAuth();
    const navigate = useNavigate();

    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [error, setError] = useState("");

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setError("");

        try {
            const res = await fetch(
                `${import.meta.env.VITE_BACKEND_URL}/usuarios/login`,
                {
                    method: "POST",
                    headers: {
                        "Content-Type": "application/json",
                    },
                    body: JSON.stringify({
                        correo: email,
                        contrasena: password,
                    }),
                }
            );

            const data = await res.json();

            if (!res.ok) {
                throw new Error(data.error || "Error al iniciar sesión");
            }

            const { token, usuario } = data;

            // Guarda el token para futuras peticiones protegidas
            localStorage.setItem("token", token);
            localStorage.setItem("usuarioId", usuario.id.toString());

            // Llama a tu context con rol y nombre
            login(usuario.rol.toLowerCase(), usuario.nombre, token);

            if (usuario.rol === "ADMIN") {
                navigate("/admin");
            } else {
                navigate("/");
            }
        } catch (err: any) {
            console.error("Login error:", err);
            setError(err.message || "Error al iniciar sesión");
        }
    };

    return (
        // Requerimento [1]
        // Nota:
        // - Faltaria añadir estilos en LoginPage.css (ya esta importado)
        // - Este html es básico solo para mostrar
        //   un funcionamiento basico de prueba para hacer login
        // - No tocar lo de arriba de return ya que es solo logica para el login de prueba.
        // - Si tu diseño necesata mas html, puedes añadirlo.
        // - Para ver como va quedando tu diseño, esta es la ruta:
        //   http://localhost:5173/proyectoprograweb/#/login
        // - Cualquier duda, no dudes en preguntar, diciendo que requerimento te toco.
        <div className="container">
            <div className="card">
                <Link to="/">
                    <img src={logo} alt="Logo" className="logo" />
                </Link>
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
                    <button type="submit" className="login-card-submit">
                        Ingresar
                    </button>
                </form>
                <Link to="/forgot-password" className="forgot-password-link">
                    ¿Olvidaste tu contraseña?
                </Link>
                <Link to="/register" className="forgot-password-link">
                    Crea una cuenta
                </Link>

                {error && (
                    <p style={{ color: "red", marginTop: "1rem" }}>{error}</p>
                )}
            </div>
        </div>
    );
}
