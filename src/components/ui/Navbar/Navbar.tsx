import styles from "./Navbar.module.css";
import logo from "/logo.svg";
import { Link, useLocation } from "react-router-dom";
import { useAuth } from "../../../context/AuthContext";
import Searchbar from "../Searchbar/Searchbar";
import CtaButton from "../Buttons/CtaButon/CtaButton";

export default function Navbar() {
    const { role, logout } = useAuth();
    const location = useLocation();
    return (
        <nav className={styles.navbar}>
            <div className={styles.leftSection}>
                <Link to="/" className={styles.logo}>
                    <img src={logo} alt="Juegos XD Logo" />
                </Link>
                <div className={styles.navItems}>
                    <Link
                        to="/"
                        className={`${styles.navItem} ${
                            location.pathname === "/" ? styles.active : ""
                        }`}
                    >
                        Descubrir
                    </Link>
                    <Link
                        to="/explorar"
                        className={`${styles.navItem} ${
                            location.pathname === "/explorar"
                                ? styles.active
                                : ""
                        }`}
                    >
                        Explorar
                    </Link>
                    <Link
                        to="/noticias"
                        className={`${styles.navItem} ${
                            location.pathname === "/noticias"
                                ? styles.active
                                : ""
                        }`}
                    >
                        Noticias
                    </Link>
                    <Link
                        to="/mejor-vendidos"
                        className={`${styles.navItem} ${
                            location.pathname === "/mejor-vendidos"
                                ? styles.active
                                : ""
                        }`}
                    >
                        Mejor Vendidos
                    </Link>
                    <Link
                        to="/mejor-valorados"
                        className={`${styles.navItem} ${
                            location.pathname === "/mejor-valorados"
                                ? styles.active
                                : ""
                        }`}
                    >
                        Mejor Valorados
                    </Link>
                </div>
            </div>

            <div className={styles.rightSection}>
                <Searchbar />

                <div className={styles.authSection}>
                    {role ? (
                        <>
                            <span className={styles.username}>👤 {role}</span>
                            <button
                                onClick={logout}
                                className={styles.logoutBtn}
                            >
                                Cerrar sesión
                            </button>
                        </>
                    ) : (
                        <>
                            <Link to="/login" className={styles.loginBtn}>
                                Ingresar
                            </Link>
                            <CtaButton to="/register">Registrarme</CtaButton>
                        </>
                    )}
                </div>
            </div>
        </nav>
    );
}
