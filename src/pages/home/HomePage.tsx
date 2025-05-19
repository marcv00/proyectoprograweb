import { useEffect, useRef, useState } from "react";
import GameCard from "../../components/ui/GameCard/GameCard";
import styles from "./HomePage.module.css";
import NewsCarousel from "../../components/ui/NewsCarousel/NewsCarousel";

type Game = {
    title: string;
    category: string[];
    description: string;
    price: number;
    discount: number | null;
    rating: number;
    reviews: string[];
    images: string[];
    trailer: string;
};

type News = {
    id: number;
    title: string;
    shortsummary: string;
    text: string;
    readingtime: string; // "4 minutos"
    banner: string; // URL de imagen
};

export default function HomePage() {
    const [games, setGames] = useState<Game[] | null>(null);
    const [news, setNews] = useState<News[] | null>(null);
    const [loading, setLoading] = useState(true);
    const [canScrollLeft, setCanScrollLeft] = useState(false);
    const [canScrollRight, setCanScrollRight] = useState(false);

    const sliderRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        fetch("./data/games.json")
            .then((res) => res.json())
            .then((data) => {
                setGames(data);
                setLoading(false);
            })
            .catch((err) => {
                console.error("Failed to fetch games.json:", err);
                setLoading(false);
            });
    }, []);

    useEffect(() => {
        fetch("./data/news.json")
            .then((res) => res.json())
            .then((data) => {
                setNews(data);
                setLoading(false);
            })
            .catch((err) => {
                console.error("Failed to fetch news.json:", err);
                setLoading(false);
            });
    }, []);

    const updateScrollButtons = () => {
        const el = sliderRef.current;
        if (el) {
            setCanScrollLeft(el.scrollLeft > 0);
            setCanScrollRight(el.scrollLeft + el.clientWidth < el.scrollWidth);
        }
    };

    const scroll = (direction: "left" | "right") => {
        const el = sliderRef.current;
        if (!el) return;
        const scrollAmount = 450 + 24; // width + gap
        el.scrollBy({
            left: direction === "left" ? -scrollAmount : scrollAmount,
            behavior: "smooth",
        });
    };

    useEffect(() => {
        const el = sliderRef.current;
        if (!el) return;
        updateScrollButtons();
        el.addEventListener("scroll", updateScrollButtons);
        window.addEventListener("resize", updateScrollButtons);
        return () => {
            el.removeEventListener("scroll", updateScrollButtons);
            window.removeEventListener("resize", updateScrollButtons);
        };
    }, [games]);

    return (
        <>
            <section className={styles["section"]}>
                <h2 className={styles["section-title"]}>
                    Añadidos recientemente
                </h2>
                <div className={styles.sliderWrapper}>
                    {canScrollLeft && (
                        <button
                            className={`${styles.arrow} ${styles.leftArrow}`}
                            onClick={() => scroll("left")}
                            aria-label="Scroll Left"
                        >
                            <img
                                src="./left-arrow.svg"
                                alt="Flecha izquierda"
                            />
                        </button>
                    )}
                    {canScrollRight && (
                        <button
                            className={`${styles.arrow} ${styles.rightArrow}`}
                            onClick={() => scroll("right")}
                            aria-label="Scroll Right"
                        >
                            <img src="./right-arrow.svg" alt="Flecha derecha" />
                        </button>
                    )}

                    <div className={styles.slider} ref={sliderRef}>
                        {loading && <p>Cargando juegos...</p>}
                        {!loading &&
                            games?.map((game, index) => (
                                <GameCard
                                    key={index}
                                    game={game}
                                    index={index}
                                />
                            ))}
                    </div>
                    <div className={styles.rightOverlay} />
                </div>
            </section>
            <section className={styles["section"]}>
                <h2 className={styles["section-title"]}>
                    Checkpoint Informativo
                </h2>
                {news && <NewsCarousel news={news} />}
            </section>
        </>
    );
}
