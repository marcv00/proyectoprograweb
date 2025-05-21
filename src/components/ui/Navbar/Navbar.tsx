import styles from "./Navbar.module.css";
import logo from "/logo.svg";
import { Link, useLocation } from "react-router-dom";
import { useAuth } from "../../../context/AuthContext";
import Searchbar from "../Searchbar/Searchbar";
import CtaButton from "../Buttons/CtaButon/CtaButton";
import { useCart } from "../../../context/CartContext";
import { useEffect, useState, useRef } from "react";



export default function Navbar() {
    const { role, logout, name } = useAuth();
    const location = useLocation();
    const { toggleCart } = useCart();
    const [menuOpen, setMenuOpen] = useState<boolean>(false);
    const dropdownRef = useRef<HTMLDivElement | null>(null);

    useEffect(() => {
        const handleClickOutside = (e: MouseEvent) => {
            if (
                dropdownRef.current &&
                !dropdownRef.current.contains(e.target as Node)
            ) {
                setMenuOpen(false);
            }
        };
        document.addEventListener("mousedown", handleClickOutside);
        return () =>
            document.removeEventListener("mousedown", handleClickOutside);
    }, []);

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
                {role === "user" ? (
                    <div className={styles.userMenuContainer} ref={dropdownRef}>
                        <div
                            className={styles.profileSection}
                            onClick={() => setMenuOpen((prev) => !prev)}
                        >
                            <div className={styles.profilePic}></div>
                            <span className={styles.username}>{name}</span>
                            <button
                                onClick={(e) => {
                                    e.stopPropagation();
                                    toggleCart();
                                }}
                                className={styles.cartBtn}
                            >
                                <img src="./shopping-bag.svg" alt="Carro" />
                            </button>
                        </div>
                        {menuOpen && (
                            <div className={styles.dropdownMenu}>
                                <Link
                                    to="/mis-juegos"
                                    className={styles.dropdownItem}
                                >
                                    <img
                                        src="./game-controller.svg"
                                        alt="Mis Juegos"
                                    />
                                    Mis Juegos
                                </Link>
                                <Link
                                    to="/editar-perfil"
                                    className={styles.dropdownItem}
                                >
                                    <img
                                        src="./pencil.svg"
                                        alt="Editar perfil"
                                    />
                                    Editar mi perfil
                                    
                                </Link>
                                <button
                                    onClick={logout}
                                    className={styles.dropdownItem}
                                >
                                    <img
                                        src="./logout.svg"
                                        alt="Cerrar sesion"
                                    />
                                    Cerrar sesión
                                </button>
                            </div>
                        )}
                    </div>
                ) : (
                    <div className={styles.authSection}>
                        <Link to="/login" className={styles.loginBtn}>
                            Ingresar
                        </Link>
                        <CtaButton to="/register">Registrarme</CtaButton>
                    </div>
                )}
            </div>
        </nav>
    );
}
