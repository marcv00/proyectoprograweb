import styles from "./AdminUsers.module.css";

export default function AdminUsers() {
    return (
        // Requerimento [21] , Requerimiento [22]
        // Modificar html como se necesite para tu diseño
        // Estilos en AdminUsers.modules.css (ya importado)
        // Ver resultados en
        // http://localhost:5173/proyectoprograweb/#/admin/users
        <div className={styles.container}>
            <h1>Gestión de Usuarios</h1>
            <p>
                Aquí verás la cantidad total de usuarios y una lista de ellos.
            </p>
        </div>
    );
}
