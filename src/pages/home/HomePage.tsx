import styles from "./HomePage.module.css";
import { useAuth } from "../../context/AuthContext";

export default function HomePage() {
    const { role, logout } = useAuth();

    if (!role) {
        return (
            <h2 className={styles["main-title--error"]}>
                Please log in to access your dashboard
            </h2>
        );
    }

    return (
        <div>
            <h2 className={styles["main-title"]}>Welcome, {role}</h2>
            <button onClick={logout}>Logout</button>
        </div>
    );
}
