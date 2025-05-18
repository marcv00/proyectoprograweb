import "./ForgotPasswordPage.css";
import { useState } from "react";
import ForgotPasswordIcon from "/ForgotPasswordIcon.svg";
import { useNavigate } from "react-router-dom";
import "../auth/LoginPage.css";

export default function ForgotPasswordPage() {
    const navigate = useNavigate();
    const [email, setEmail] = useState("");
    const [mensaje, setMensaje] = useState("");

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        setMensaje(
            "Te hemos enviando un enlace por el correo asignado para cambiar tu contraseña."
        );
        setTimeout(() => navigate("/"), 3000);
    };

    return (
        <div className="login-container">
            <img
                src={ForgotPasswordIcon}
                alt="ForgotPassword"
                className="forgot-password-icon"
            />
            <h2>Recuperar Contraseña</h2>
            <form onSubmit={handleSubmit}>
                <input
                    type="email"
                    placeholder="Ingresa tu correo electrónico"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    required
                />
                <button type="submit"> Enviar enlace</button>
            </form>
            {mensaje && <p>{mensaje}</p>}
        </div>
    );
}
// Requerimento [4]
// Nota:
// - Faltaria añadir estilos en ForgotPasswordPage.css (ya esta importado)
// - Para ver como va quedando tu diseño, esta es la ruta:
//   http://localhost:5173/proyectoprograweb/#/forgot-password
// - Cualquier duda, no dudes en preguntar, diciendo que requerimento te toco.
