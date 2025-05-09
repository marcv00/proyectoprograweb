// layouts/UserLayout.tsx
import { Link, Outlet } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

export default function UserLayout() {
    const { role, logout } = useAuth();

    return (
        <div>
            <nav
                style={{
                    display: "flex",
                    gap: "1rem",
                    padding: "1rem",
                    borderBottom: "1px solid #ccc",
                    alignItems: "center",
                }}
            >
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
                        <span style={{ marginLeft: "1rem" }}>👤 {role}</span>
                        <button
                            onClick={logout}
                            style={{ marginLeft: "0.5rem" }}
                        >
                            Cerrar sesión
                        </button>
                    </>
                ) : (
                    <Link to="/login" style={{ marginLeft: "1rem" }}>
                        Iniciar sesión
                    </Link>
                )}
            </nav>

            <main style={{ padding: "1rem" }}>
                <Outlet />
            </main>
        </div>
    );
}
