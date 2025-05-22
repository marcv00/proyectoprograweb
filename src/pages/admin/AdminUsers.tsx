import { useEffect, useState } from "react";
import styles from "./AdminUsers.module.css";

export default function AdminUsers() {
    const [sidebarWidth, setSidebarWidth] = useState(220);

    useEffect(() => {
        const updateSidebarWidth = () => {
            const sidebar = document.querySelector(".sidebar");
            if (sidebar) {
                const width = sidebar.classList.contains("collapsed") ? 60 : 220;
                setSidebarWidth(width);
            }
        };

        const observer = new MutationObserver(updateSidebarWidth);
        const target = document.querySelector(".sidebar");
        if (target) {
            observer.observe(target, { attributes: true, attributeFilter: ["class"] });
        }

        updateSidebarWidth();

        return () => observer.disconnect();
    }, []);

    const users = [
        { id: 1, name: "Juan Pérez", email: "juanperez@gmail.com", role: "Usuario" },
        { id: 2, name: "Ana López", email: "analopez@gmail.com", role: "Administrador" },
        { id: 3, name: "Diego Tinoco", email: "digotinoco@gmail.com", role: "Usuario" },
        { id: 4, name: "Laura Gómez", email: "lauragomez@gmail.com", role: "Usuario" },
        { id: 5, name: "María Torres", email: "mariatorres@gmail.com", role: "Usuario" },
        { id: 6, name: "Luis Hernández", email: "luishernandez@gmail.com", role: "Usuario" },
        { id: 7, name: "Pedro Ramírez", email: "pedroramirez@gmail.com", role: "Administrador" },
        { id: 8, name: "Sofía Martínez", email: "sofiamartinez@gmail.com", role: "Usuario" },
        { id: 9, name: "Diego Silva", email: "diegosilva@gmail.com", role: "Usuario" },
        { id: 10, name: "Elena Vargas", email: "elenavargas@gmail.com", role: "Usuario" },
        { id: 11, name: "Fernando Castillo", email: "fernandocastillo@gmail.com", role: "Usuario" },
        { id: 12, name: "Lucía Romero", email: "luciaromero@gmail.com", role: "Usuario" },
        { id: 13, name: "Javier Soto", email: "javiersoto@gmail.com", role: "Usuario" },
        { id: 14, name: "Valentina Méndez", email: "valentinamendez@gmail.com", role: "Usuario" },
        { id: 15, name: "Ricardo Díaz", email: "ricardodiaz@gmail.com", role: "Usuario" },
        { id: 16, name: "Daniela Reyes", email: "danielareyes@gmail.com", role: "Usuario" },
        { id: 17, name: "Andrés Morales", email: "andresmorales@gmail.com", role: "Administrador" },
        { id: 18, name: "Camila Rivas", email: "camilarivas@gmail.com", role: "Usuario" },
        { id: 19, name: "Miguel Navarro", email: "miguelnavarro@gmail.com", role: "Usuario" },
        { id: 20, name: "Natalia Herrera", email: "nataliaherrera@gmail.com", role: "Usuario" },
    ];

    return (
        <div
            className={styles.container}
            style={{ marginLeft: `${sidebarWidth}px`, transition: "margin-left 0.3s ease" }}
        >
            <h1>Gestión de Usuarios</h1>
            <p>Total de usuarios: <strong>{users.length}</strong></p>

            <input
                type="text"
                placeholder="Buscar usuario por nombre o correo..."
                className={styles.searchInput}
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
                    {users.map(user => (
                        <tr key={user.id}>
                            <td>{user.id}</td>
                            <td>{user.name}</td>
                            <td>{user.email}</td>
                            <td>{user.role}</td>
                            <td title="Configurar Cuenta">🔧</td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
}
