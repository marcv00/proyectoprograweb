import { Outlet } from "react-router-dom";
import Navbar from "../components/ui/Navbar/Navbar";
import styles from "./UserLayout.module.css";
import CartPanel from "../components/ui/cart/CartPanel";

export default function UserLayout() {
    return (
        <div className={styles.container}>
            <Navbar />
            <CartPanel />
            <main>
                <Outlet />
            </main>
        </div>
    );
}
