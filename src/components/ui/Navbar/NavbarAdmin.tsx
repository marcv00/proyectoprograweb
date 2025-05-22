import { useState } from "react";
import "./NavbarAdmin.css";
import { Link } from "react-router-dom";
import logo from "/logo.svg";

export default function NavbarAdmin() {
    const [isCollapsed, setIsCollapsed] = useState(false);

    return (
        <div className={`sidebar ${isCollapsed ? "collapsed" : ""}`}>
            <button
                className="toggle-button"
                onClick={() => setIsCollapsed(!isCollapsed)}
            >
                {isCollapsed ? "▶" : "◀"}
            </button>

            <div className="sidebar-header">
                <img src={logo} alt="Logo" className="sidebar-logo" />
                {!isCollapsed && <h2>Bienvenido Administrador!</h2>}
            </div>

            <nav className="sidebar-nav">
                <Link to="/admin/dashboard">Dashboard</Link>
                <Link to="/admin/users">Usuarios</Link>
                <Link to="/admin/games">Juegos</Link>
                <Link to="/admin/news">Noticias</Link>
            </nav>

            <div className="sidebar-footer">
                {!isCollapsed && (
                    <Link to="/" className="logout-button">
                        Cerrar sesión
                    </Link>
                )}
            </div>
        </div>
    );
}
