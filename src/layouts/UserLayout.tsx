import { Outlet } from "react-router-dom";
import Navbar from "../components/ui/Navbar/Navbar";
import styles from "./UserLayout.module.css";

export default function UserLayout() {
    return (
        <div className={styles.container}>
            <Navbar />

            <main>
                <Outlet />
            </main>
        </div>
    );
}
