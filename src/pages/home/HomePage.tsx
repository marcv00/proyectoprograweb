import { useEffect, useRef, useState } from "react";
import GameCard from "../../components/ui/GameCard/GameCard";
import styles from "./HomePage.module.css";
import NewsCarousel from "../../components/ui/NewsCarousel/NewsCarousel";
import { useCart } from "../../context/CartContext";

const BACKEND_URL = import.meta.env.VITE_BACKEND_URL;

type GameCard = {
    id: number;
    titulo: string;
    descripcion: string;
    slug: string;
    precio: number;
    porcentajeOferta: number | null;
    fotos: { url: string }[];
};

type News = {
    id: number;
    titulo: string;
    resumen: string;
    slug: string;
    foto: { url: string };
};

export default function HomePage() {
    const [games, setGames] = useState<GameCard[] | null>(null);
    const [news, setNews] = useState<News[] | null>(null);
    const [loading, setLoading] = useState(true);
    const [canScrollLeft, setCanScrollLeft] = useState(false);
    const [canScrollRight, setCanScrollRight] = useState(false);

    const sliderRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        const httpObtenerJuegosRecientes = async () => {
            try {
                const response = await fetch(`${BACKEND_URL}/juegos/recientes`);
                const data: GameCard[] = await response.json();
                setGames(data);
            } catch (err) {
                console.error("Error fetching juegos recientes:", err);
            } finally {
                setLoading(false);
            }
        };

        httpObtenerJuegosRecientes();
    }, []);

    useEffect(() => {
        const httpObtenerNoticiasCarousel = async () => {
            try {
                const response = await fetch(
                    `${BACKEND_URL}/noticias/carousel`
                );
                const data: News[] = await response.json();
                setNews(data);
            } catch (err) {
                console.error("Error fetching juegos recientes:", err);
            } finally {
                setLoading(false);
            }
        };

        httpObtenerNoticiasCarousel();
    }, []);
    const { addToCart } = useCart();

    const handleAddToCart = async (game: GameCard) => {
        await addToCart(game);
    };

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
                                    onAddToCart={handleAddToCart}
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
