import { useState } from "react";
import { useNavigate } from "react-router-dom";
import searchIcon from "/search-icon.svg";
import styles from "./Searchbar.module.css";

export default function Searchbar() {
    const [search, setSearch] = useState("");
    const navigate = useNavigate();

    // Verificar que no sea una busqueda en blanco
    // y redirigir a la ruta de busqueda
    const handleSearch = () => {
        const trimmed = search.trim();
        if (trimmed !== "") {
            navigate(`/search?term=${encodeURIComponent(trimmed)}`);
        }
    };

    // Para poder buscar tambien con la tecla Enter
    const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
        if (e.key === "Enter") {
            handleSearch();
        }
    };

    return (
        <div className={styles.searchContainer}>
            <img
                src={searchIcon}
                alt="Search"
                onClick={handleSearch}
                className={styles.searchIcon}
            />
            <input
                type="text"
                placeholder="Buscar en la tienda"
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                onKeyDown={handleKeyDown}
                className={styles.searchInput}
            />
        </div>
    );
}
