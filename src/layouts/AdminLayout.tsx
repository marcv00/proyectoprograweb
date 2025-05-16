import { Outlet } from "react-router-dom";
import NavbarAdmin from "../components/ui/Navbar/NavbarAdmin";
import styles from "./AdminLayout.module.css";

export default function AdminLayout() {
    return (
        <div className={styles.layoutAdmin}>
            <NavbarAdmin />
            <main className={styles.mainAdmin}>
                <Outlet />
            </main>
        </div>
    );
}
