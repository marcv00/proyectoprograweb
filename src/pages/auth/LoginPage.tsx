// pages/auth/LoginPage.tsx
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../../context/AuthContext";
import "./LoginPage.css"; // Importa el archivo CSS para estilos

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
        // Requerimento [1]
        // Nota:
        // - Faltaria añadir estilos en LoginPage.css (ya esta importado)
        // - Este html es básico solo para mostrar
        //   un funcionamiento basico de prueba para hacer login
        // - No tocar lo de arriba de return ya que es solo logica para el login de prueba.
        // - Si tu diseño necesata mas html, puedes añadirlo.
        // - Para ver como va quedando tu diseño, esta es la ruta:
        //   http://localhost:5173/proyectoprograweb/login
        // - Cualquier duda, no dudes en preguntar, diciendo que requerimento te toco.

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
