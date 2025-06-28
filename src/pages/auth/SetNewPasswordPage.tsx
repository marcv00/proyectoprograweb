import "./ForgotPasswordPage.css";
import { useState } from "react";
import ForgotPasswordIcon from "/ForgotPasswordIcon.svg";
import { useNavigate } from "react-router-dom";
import "../auth/LoginPage.css";

export default function SetNewPasswordPage() {
    const navigate = useNavigate();
    const [password, setPassword] = useState("");
    const [passwordRepeat, setPasswordRepeat] = useState("");
    const [mensaje, setMensaje] = useState("");
    const [mensajeTipo, setMensajeTipo] = useState(""); // "exito" | "error"
    const [bloqueado, setBloqueado] = useState(false);

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();

        if (password.length < 8) {
            setMensaje("La contraseña debe tener al menos 8 caracteres.");
            setMensajeTipo("error");
            return;
        }

        if (password === passwordRepeat) {
            setMensaje(
                "Seras redireccionado a la pagina de Login para que puedas ingresar con tu nueva contraseña."
            );
            setMensajeTipo("exito");
            setBloqueado(true);
            setTimeout(() => navigate("/login"), 3000);
        } else {
            setMensaje(
                "Las contraseñas no coinciden. Por favor, verifica e intenta nuevamente."
            );
            setMensajeTipo("error");
        }
    };

    return (
        <div className="login-container">
            <img
                src={ForgotPasswordIcon}
                alt="ForgotPassword"
                className="forgot-password-icon"
            />
            <h2>Actualizacion de contraseña</h2>
            <form onSubmit={handleSubmit}>
                <input
                    type="password"
                    placeholder="Ingresa una nueva contraseña"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    required
                />
                <input
                    type="password"
                    placeholder="Confirma tu nueva contraseña"
                    value={passwordRepeat}
                    onChange={(e) => setPasswordRepeat(e.target.value)}
                    required
                />
                <button type="submit" disabled={bloqueado}>
                    Confirmar
                </button>
            </form>
            {mensaje && (
                <p
                    style={{
                        color: mensajeTipo === "exito" ? "green" : "red",
                        marginTop: "10px",
                    }}
                >
                    {mensaje}
                </p>
            )}
        </div>
    );
}

// Nota:
// - Para ver como va quedando tu diseño, esta es la ruta:
//   http://localhost:5173/proyectoprograweb/#/set-new-password
// - Cualquier duda, no dudes en preguntar, diciendo que requerimento te toco.
