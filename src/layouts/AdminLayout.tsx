// layouts/AdminLayout.tsx
import { Link, Outlet } from "react-router-dom";

export default function AdminLayout() {
    return (
        <div style={{ display: "flex", minHeight: "100vh" }}>
            <aside
                style={{
                    width: "200px",
                    backgroundColor: "#f4f4f4",
                    padding: "1rem",
                }}
            >
                <h2>Admin</h2>
                <nav
                    style={{
                        display: "flex",
                        flexDirection: "column",
                        gap: "0.5rem",
                    }}
                >
                    <Link to="/admin/users">Usuarios</Link>
                    <Link to="/admin/games">Juegos</Link>
                    <Link to="/admin/news">Noticias</Link>
                    <Link to="/admin/stats">Estadisticas</Link>
                </nav>
            </aside>

            <main style={{ flexGrow: 1, padding: "1rem" }}>
                <Outlet />
            </main>
        </div>
    );
}
