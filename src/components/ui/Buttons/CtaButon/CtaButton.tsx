import type { MouseEventHandler } from "react";
import { Link } from "react-router-dom";
import styles from "./CtaButton.module.css";

interface CtaButtonProps {
    children: React.ReactNode;
    to?: string;
    onClick?: MouseEventHandler<HTMLButtonElement>;
}

export default function CtaButton({ children, to, onClick }: CtaButtonProps) {
    if (to) {
        return (
            <Link to={to} className={styles.cta}>
                {children}
            </Link>
        );
    }

    return (
        <button onClick={onClick} className={styles.cta}>
            {children}
        </button>
    );
}
