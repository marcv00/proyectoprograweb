import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import styles from "./RegisterPage.module.css";
import logo from "/logo.svg";

export default function RegisterPage() {
    const navigate = useNavigate();

    const [name, setName] = useState("");
    const [surname, setSurname] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");

    const [error, setError] = useState("");
    const [success, setSuccess] = useState("");
    const [isSubmitting, setIsSubmitting] = useState(false);

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();

        setError("");
        setSuccess("Creando cuenta...");
        setIsSubmitting(true);

        setTimeout(() => {
            navigate("/confirmation");
        }, 3000);
    };

    return (
        <div className={styles.container}>
            <div className={styles.card}>
                <Link to="/">
                    <img src={logo} alt="Logo" className={styles.logo} />
                </Link>
                <h1 className={styles.title}>Formulario de Registro</h1>
                <form onSubmit={handleSubmit} className={styles.form}>
                    <input
                        type="text"
                        placeholder="Nombre"
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                        required
                        className={styles.input}
                    />
                    <input
                        type="text"
                        placeholder="Apellido"
                        value={surname}
                        onChange={(e) => setSurname(e.target.value)}
                        required
                        className={styles.input}
                    />
                    <input
                        type="email"
                        placeholder="Correo electrónico"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        required
                        className={styles.input}
                    />
                    <input
                        type="password"
                        placeholder="Contraseña"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        required
                        className={styles.input}
                    />
                    <button
                        type="submit"
                        className={styles.button}
                        disabled={isSubmitting}
                    >
                        {success ? success : "Crear cuenta"}
                    </button>
                </form>
                {error && <p className={styles.error}>{error}</p>}
            </div>
        </div>
    );
}
