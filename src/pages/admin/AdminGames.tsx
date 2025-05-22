import { useEffect, useState } from "react";
import styles from "./AdminGames.module.css";

export default function AdminGames() {
    const [sidebarWidth, setSidebarWidth] = useState(220);

    const [filters, setFilters] = useState({ category: "", price: "", date: "" });

    const [games] = useState([
        {
            title: "Elden Ring",
            category: "RPG",
            releaseDate: "2022-02-25",
            price: 59.99,
            image: "https://cdn.cloudflare.steamstatic.com/steam/apps/1245620/header.jpg",
        },
        {
            title: "Cyberpunk 2077",
            category: "Acción",
            releaseDate: "2020-12-10",
            price: 39.99,
            image: "https://cdn.cloudflare.steamstatic.com/steam/apps/1091500/header.jpg",
        },
        {
            title: "The Witcher 3",
            category: "RPG",
            releaseDate: "2015-05-18",
            price: 29.99,
            image: "https://cdn.cloudflare.steamstatic.com/steam/apps/292030/header.jpg",
        },
        {
            title: "FIFA 24",
            category: "Deportes",
            releaseDate: "2023-09-29",
            price: 49.99,
            image: "https://cdn.cloudflare.steamstatic.com/steam/apps/2195250/header.jpg",
        },
        {
            title: "Rocket League",
            category: "Deportes",
            releaseDate: "2015-07-07",
            price: 0.0,
            image: "https://cdn.cloudflare.steamstatic.com/steam/apps/252950/header.jpg",
        },
        {
            title: "Red Dead Redemption 2",
            category: "Acción",
            releaseDate: "2018-10-26",
            price: 59.99,
            image: "https://cdn.cloudflare.steamstatic.com/steam/apps/1174180/header.jpg",
        },
        {
            title: "God of War",
            category: "Acción",
            releaseDate: "2018-04-20",
            price: 49.99,
            image: "https://cdn.cloudflare.steamstatic.com/steam/apps/1593500/header.jpg",
        },
        {
            title: "Hogwarts Legacy",
            category: "Aventura",
            releaseDate: "2023-02-10",
            price: 69.99,
            image: "https://cdn.cloudflare.steamstatic.com/steam/apps/990080/header.jpg",
        },
        {
            title: "Resident Evil 4 Remake",
            category: "Terror",
            releaseDate: "2023-03-24",
            price: 59.99,
            image: "https://cdn.cloudflare.steamstatic.com/steam/apps/2050650/header.jpg",
        },
        {
            title: "Assassin's Creed Valhalla",
            category: "Acción",
            releaseDate: "2020-11-10",
            price: 39.99,
            image: "https://cdn.cloudflare.steamstatic.com/steam/apps/2208920/header.jpg",
        },
        {
            title: "GTA V",
            category: "Acción",
            releaseDate: "2013-09-17",
            price: 29.99,
            image: "https://cdn.cloudflare.steamstatic.com/steam/apps/271590/header.jpg",
        },
        {
            title: "Valorant",
            category: "Shooter",
            releaseDate: "2020-06-02",
            price: 0.0,
            image: "https://www.techrupt.pk/wp-content/uploads/2020/10/Valorant-image-696x344-1.png",
        },
        {
            title: "League of Legends",
            category: "MOBA",
            releaseDate: "2009-10-27",
            price: 0.0,
            image: "https://img.redbull.com/images/c_fill,w_1200,h_630,g_auto,f_auto,q_auto/redbullcom/2022/8/1/ksfga6rlx2ugfhjd9vnk/league-of-legends",
        },
    ]);

    const [filteredGames, setFilteredGames] = useState(games);

    useEffect(() => {
        const sidebar = document.querySelector(".sidebar");
        const update = () => {
            setSidebarWidth(sidebar?.classList.contains("collapsed") ? 60 : 220);
        };

        if (sidebar) {
            update();
            const observer = new MutationObserver(update);
            observer.observe(sidebar, { attributes: true, attributeFilter: ["class"] });
            return () => observer.disconnect();
        }
    }, []);

    useEffect(() => {
        let result = [...games];
        if (filters.category) result = result.filter((g) => g.category === filters.category);
        if (filters.price === "low") result.sort((a, b) => a.price - b.price);
        if (filters.price === "high") result.sort((a, b) => b.price - a.price);
        if (filters.date === "new") result.sort((a, b) => b.releaseDate.localeCompare(a.releaseDate));
        if (filters.date === "old") result.sort((a, b) => a.releaseDate.localeCompare(b.releaseDate));
        setFilteredGames(result);
    }, [filters, games]);

    const handleFilterChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
        setFilters({ ...filters, [e.target.name]: e.target.value });
    };

    return (
        <div
            className={styles.gamesContainer}
            style={{ marginLeft: `${sidebarWidth}px`, transition: "margin-left 0.3s ease" }}
        >
            <h1 className={styles.title}>Gestión de Juegos</h1>
            <p className={styles.description}>Desde aquí puedes visualizar, editar o eliminar juegos del sistema.</p>

            <div className={styles.filters}>
                <select name="category" onChange={handleFilterChange}>
                    <option value="">Filtrar por categoría</option>
                    <option value="RPG">RPG</option>
                    <option value="Acción">Acción</option>
                    <option value="Deportes">Deportes</option>
                </select>
                <select name="price" onChange={handleFilterChange}>
                    <option value="">Ordenar por precio</option>
                    <option value="low">Menor a mayor</option>
                    <option value="high">Mayor a menor</option>
                </select>
                <select name="date" onChange={handleFilterChange}>
                    <option value="">Ordenar por fecha</option>
                    <option value="new">Más reciente</option>
                    <option value="old">Más antiguo</option>
                </select>
                <button className={styles.addButton}>+ Agregar juego</button>
            </div>

            <div className={styles.gameGrid}>
                {filteredGames.map((game, i) => (
                    <div key={i} className={styles.gameCard}>
                        <img src={game.image} alt={game.title} className={styles.gameImage} />
                        <h3>{game.title}</h3>
                        <p>{game.category} • {game.releaseDate}</p>
                        <p>{game.price === 0 ? "Gratis" : `$${game.price.toFixed(2)}`}</p>
                        <div className={styles.actions}>
                            <button>Editar</button>
                            <button>Eliminar</button>
                            <button>Aplicar descuento</button>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
}
