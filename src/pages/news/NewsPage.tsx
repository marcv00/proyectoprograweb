import { useEffect, useState } from "react";
import styles from "./NewsPage.module.css";
import { Link } from "react-router-dom";

const BACKEND_URL = import.meta.env.VITE_BACKEND_URL;

type News = {
    id: number;
    titulo: string;
    resumen: string;
    tiempoLectura: number;
    slug: string;
    foto: {
        url: string;
    };
    categorias: string[];
};

type Categoria = {
    id: number;
    nombre: string;
};

export default function NewsPage() {
    const [news, setNews] = useState<News[] | null>(null);
    const [categories, setCategories] = useState<Categoria[]>([]);
    const [activeCategory, setActiveCategory] = useState<string>("");

    useEffect(() => {
        let fetchedNews: News[] = [];

        // Fetch noticias y categorías al mismo tiempo
        Promise.all([
            fetch(`${BACKEND_URL}/noticias/page`).then((res) => res.json()),
            fetch(`${BACKEND_URL}/categorias/noticias`).then((res) =>
                res.json()
            ),
        ])
            .then(([newsData, categoriesData]: [News[], Categoria[]]) => {
                fetchedNews = newsData;

                // Filtrar categorías con al menos 2 noticias
                const categoriesWithEnoughNews = categoriesData.filter(
                    (cat) => {
                        const count = fetchedNews.filter((n) =>
                            n.categorias
                                .map((c) => c.toLowerCase())
                                .includes(cat.nombre.toLowerCase())
                        ).length;
                        return count > 1;
                    }
                );

                setNews(fetchedNews);
                setCategories(categoriesWithEnoughNews);

                if (categoriesWithEnoughNews.length > 0) {
                    setActiveCategory(categoriesWithEnoughNews[0].nombre);
                }
            })
            .catch((err) => {
                console.error("Error fetching noticias o categorias:", err);
            });
    }, []);

    if (!news || !activeCategory)
        return <div className={styles.loading}>Cargando noticias...</div>;

    // Filtrar por categoría activa
    const filtered = news.filter((n) =>
        n.categorias
            .map((c) => c.toLowerCase())
            .includes(activeCategory.toLowerCase())
    );

    if (filtered.length === 0)
        return <div>No hay noticias para la categoría seleccionada.</div>;

    const featured = filtered[0];
    const remainingNews = filtered.slice(1, 7);

    return (
        <div className={styles.container}>
            {/* Featured News */}
            <Link to={`${featured.slug}`} className={styles.featuredCard}>
                <img
                    src={featured.foto.url}
                    alt="Banner"
                    className={styles.featuredImage}
                />
                <div className={styles.featuredContent}>
                    <h1 className={styles.featuredTitle}>{featured.titulo}</h1>
                    <p className={styles.featuredSummary}>{featured.resumen}</p>
                    <span className={styles.readingTime}>
                        <img src="./clock.svg" alt="Clock icon" />
                        Lectura de {featured.tiempoLectura} min
                    </span>
                </div>
            </Link>

            {/* Tabs */}
            <div className={styles.tabs}>
                {categories.map((cat) => (
                    <span
                        key={cat.id}
                        className={`${styles.tab} ${
                            activeCategory === cat.nombre ? styles.active : ""
                        }`}
                        onClick={() => setActiveCategory(cat.nombre)}
                    >
                        {cat.nombre.toUpperCase()}
                    </span>
                ))}
            </div>

            {/* Grid News */}
            <div className={styles.grid}>
                {remainingNews.map((item) => (
                    <Link
                        key={item.id}
                        to={`${item.slug}`}
                        className={styles.card}
                    >
                        <img
                            src={item.foto.url}
                            alt="Banner"
                            className={styles.cardImage}
                        />
                        <div className={styles.cardContent}>
                            <h3 className={styles.cardTitle}>{item.titulo}</h3>
                            <p className={styles.cardSummary}>{item.resumen}</p>
                            <span className={styles.readingTime}>
                                <img src="./clock.svg" alt="Clock icon" />
                                Lectura de {item.tiempoLectura} min
                            </span>
                        </div>
                    </Link>
                ))}
            </div>
        </div>
    );
}
