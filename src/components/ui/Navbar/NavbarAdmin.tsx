import { Link } from "react-router-dom";
import "./NavbarAdmin.css";

export default function NavbarAdmin() {
    return (
        // Requerimento [26]
        // Los estilos de este componente estan en el archivo NavbarAdmin.css (ya importado)
        // Ver el diseño en la ruta
        // http://localhost:5173/admin

        <aside className="navbar-admin">
            <h2 className="navbar-admin-title">Admin</h2>
            <nav className="navbar-admin-nav">
                <Link to="/admin/users">Usuarios</Link>
                <Link to="/admin/games">Juegos</Link>
                <Link to="/admin/news">Noticias</Link>
                <Link to="/admin/stats">Estadisticas</Link>
            </nav>
        </aside>
    );
}
