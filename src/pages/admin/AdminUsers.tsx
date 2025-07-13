import { useEffect, useState } from "react";
import styles from "./AdminUsers.module.css";

type Usuario = {
    id: number;
    nombre: string;
    apellido: string;
    correo: string;
    rol: "USER" | "ADMIN";
};

export default function AdminUsers() {
    const [sidebarWidth, setSidebarWidth] = useState(220);
    const [usuarios, setUsuarios] = useState<Usuario[]>([]);
    const [busqueda, setBusqueda] = useState("");

    useEffect(() => {
        const updateSidebarWidth = () => {
            const sidebar = document.querySelector(".sidebar");
            if (sidebar) {
                const width = sidebar.classList.contains("collapsed")
                    ? 60
                    : 220;
                setSidebarWidth(width);
            }
        };

        const observer = new MutationObserver(updateSidebarWidth);
        const target = document.querySelector(".sidebar");
        if (target) {
            observer.observe(target, {
                attributes: true,
                attributeFilter: ["class"],
            });
        }

        updateSidebarWidth();

        return () => observer.disconnect();
    }, []);

    useEffect(() => {
        const fetchUsuarios = async () => {
            try {
                const response = await fetch(
                    `${import.meta.env.VITE_BACKEND_URL}/usuarios/lista`,
                    {
                        credentials: "include",
                    }
                );
                const data = await response.json();
                setUsuarios(data);
            } catch (error) {
                console.error("Error al obtener usuarios:", error);
            }
        };

        fetchUsuarios();
    }, []);

    const usuariosFiltrados = usuarios.filter((usuario) =>
        `${usuario.nombre} ${usuario.apellido} ${usuario.correo}`
            .toLowerCase()
            .includes(busqueda.toLowerCase())
    );

    return (
        <div
            className={styles.container}
            style={{
                marginLeft: `${sidebarWidth}px`,
                transition: "margin-left 0.3s ease",
            }}
        >
            <h1>Gestión de Usuarios</h1>
            <p>
                Total de usuarios: <strong>{usuariosFiltrados.length}</strong>
            </p>

            <input
                type="text"
                placeholder="Buscar usuario por nombre o correo..."
                className={styles.searchInput}
                value={busqueda}
                onChange={(e) => setBusqueda(e.target.value)}
            />

            <table className={styles.userTable}>
                <thead>
                    <tr>
                        <th>ID</th>
                        <th>Nombre</th>
                        <th>Correo</th>
                        <th>Rol</th>
                        <th>Acciones</th>
                    </tr>
                </thead>
                <tbody>
                    {usuariosFiltrados.map((usuario) => (
                        <tr key={usuario.id}>
                            <td>{usuario.id}</td>
                            <td>{`${usuario.nombre} ${usuario.apellido}`}</td>
                            <td>{usuario.correo}</td>
                            <td>
                                {usuario.rol === "ADMIN"
                                    ? "Administrador"
                                    : "Usuario"}
                            </td>
                            <td title="Configurar Cuenta">🔧</td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
}
