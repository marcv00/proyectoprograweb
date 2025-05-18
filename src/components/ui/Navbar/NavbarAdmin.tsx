import { Link, useNavigate } from "react-router-dom";
import "./NavbarAdmin.css";
import { useAuth } from "../../../context/AuthContext";

export default function NavbarAdmin() {
    const { logout } = useAuth();
    const navigate = useNavigate();

    const handleLogout = () => {
        logout();
        navigate("/"); // Redirige al home
    };

    return (
        <aside className="navbar-admin">
            <h2 className="navbar-admin-title">Admin</h2>
            <nav className="navbar-admin-nav">
                <Link to="/admin/users">Usuarios</Link>
                <Link to="/admin/games">Juegos</Link>
                <Link to="/admin/news">Noticias</Link>
                <Link to="/admin/stats">Estadisticas</Link>
            </nav>
            <button onClick={handleLogout}>Cerrar sesión</button>
        </aside>
    );
}
