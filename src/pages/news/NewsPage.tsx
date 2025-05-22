import { useEffect, useState } from "react";
import styles from "./NewsPage.module.css";
import { Link } from "react-router-dom";

type News = {
    id: number;
    title: string;
    shortsummary: string;
    text: string;
    readingtime: string;
    banner: string;
};

const slugify = (text: string) =>
    text
        .toLowerCase()
        .replace(/\s+/g, "-")
        .replace(/[^\w-]+/g, "");

export default function NewsPage() {
    const [news, setNews] = useState<News[] | null>(null);

    useEffect(() => {
        fetch("./data/news.json")
            .then((res) => res.json())
            .then((data) => {
                setNews(data);
            })
            .catch((err) => {
                console.error("Failed to fetch news.json:", err);
            });
    }, []);

    if (!news)
        return <div className={styles.loading}>Cargando noticias...</div>;

    const featured = news[0];
    const remainingNews = news.slice(1, 7);

    return (
        <div className={styles.container}>
            {/* Featured News */}
            <Link
                to={`${slugify(featured.title)}`}
                className={styles.featuredCard}
            >
                <img
                    src={featured.banner}
                    alt="Banner"
                    className={styles.featuredImage}
                />
                <div className={styles.featuredContent}>
                    <h1 className={styles.featuredTitle}>{featured.title}</h1>
                    <p className={styles.featuredSummary}>
                        {featured.shortsummary}
                    </p>
                    <span className={styles.readingTime}>
                        <img src="./clock.svg" alt="Clock icon" />
                        Lectura de {featured.readingtime}
                    </span>
                </div>
            </Link>

            {/* Tabs */}
            <div className={styles.tabs}>
                <span className={`${styles.tab} ${styles.active}`}>
                    POPULAR
                </span>
                <span className={styles.tab}>COMUNIDAD</span>
                <span className={styles.tab}>REVIEWS</span>
                <span className={styles.tab}>OPINION</span>
            </div>

            {/* Grid News */}
            <div className={styles.grid}>
                {remainingNews.map((item) => (
                    <Link
                        key={item.id}
                        to={`${slugify(item.title)}`}
                        className={styles.card}
                    >
                        <img
                            src={item.banner}
                            alt="Banner"
                            className={styles.cardImage}
                        />
                        <div className={styles.cardContent}>
                            <h3 className={styles.cardTitle}>{item.title}</h3>
                            <p className={styles.cardSummary}>
                                {item.shortsummary}
                            </p>
                            <span className={styles.readingTime}>
                                <img src="./clock.svg" alt="Clock icon" />
                                Lectura de {item.readingtime}
                            </span>
                        </div>
                    </Link>
                ))}
            </div>
        </div>
    );
}
