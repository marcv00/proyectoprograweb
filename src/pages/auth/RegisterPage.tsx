// pages/auth/RegisterPage.tsx
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import "./RegisterPage.css";

export default function RegisterPage() {
    const navigate = useNavigate();

    // En este estados guardamos la información del formulario
    const [name, setName] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");

    const [error, setError] = useState("");
    const [success, setSuccess] = useState("");

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();

        try {
            // Construimos el nuevo usuario con la información del formulario
            const newUser = {
                name,
                email,
                password,
            };

            // 👉 En un entorno real, aquí haríamos un POST a una API para registrar el usuario.
            // Este endpoint podría ser por ejemplo: https://miapi.com/api/register
            const response = await fetch("https://miapi.com/api/register", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify(newUser),
            });

            // Verificamos si el registro fue exitoso
            if (!response.ok) {
                throw new Error("No se pudo registrar el usuario.");
            }

            // ✅ Simulación de éxito en el registro
            setSuccess("Cuenta creada. Revisa tu correo para verificar.");
            setTimeout(() => navigate("/login"), 3000);
        } catch (err) {
            console.error(err);
            setError("Error al registrar usuario.");
        }
    };

    return (
        // Requerimento [2]
        // Nota:
        // - Faltaria añadir estilos en RegisterPage.css (ya esta importado)
        // - Este html es básico solo para mostrar
        //   un funcionamiento basico de prueba para hacer un registro fake
        // - No tocar lo de arriba de return ya que es solo logica para el register de prueba.
        // - Si tu diseño necesata mas html, puedes añadirlo.
        // - Para ver como va quedando tu diseño, esta es la ruta:
        //   http://localhost:5173/proyectoprograweb/#/register
        // - Cualquier duda, no dudes en preguntar, diciendo que requerimento te toco.

        <div>
            <h1>Registrarse</h1>
            <form onSubmit={handleSubmit}>
                <input
                    type="text"
                    placeholder="Nombre"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    required
                />
                <input
                    type="email"
                    placeholder="Correo electrónico"
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
                <button type="submit">Crear cuenta</button>
            </form>

            {error && <p style={{ color: "red" }}>{error}</p>}
            {success && <p style={{ color: "green" }}>{success}</p>}
        </div>
    );
}
