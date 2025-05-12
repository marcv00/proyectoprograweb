import styles from "./UserLayout.module.css";
import { Link, Outlet } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

export default function UserLayout() {
    const { role, logout } = useAuth();

    return (
        <div>
            <nav className={styles.navbar}>
                <Link to="/">Home</Link>
                <Link to="/catalog">Catalogo</Link>
                <Link to="/top-sellers">Mas vendidos</Link>
                <Link to="/top-rated">Mejor valorados</Link>
                <Link to="/settings">Configuracion</Link>

                <input
                    type="text"
                    placeholder="Buscar juego..."
                    style={{ marginLeft: "auto" }}
                />

                <Link to="/cart">🛒</Link>

                {role ? (
                    <>
                        <span>👤 {role}</span>
                        <button onClick={logout}>Cerrar sesión</button>
                    </>
                ) : (
                    <>
                        <Link to="/login">Iniciar sesión</Link>
                        <Link to="/register">Crea una cuenta</Link>
                    </>
                )}
            </nav>

            <main style={{ padding: "1rem" }}>
                <Outlet />
            </main>
        </div>
    );
}
