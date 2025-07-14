import { useEffect, useState, useRef } from "react";
import STORELOGO from "/logo.svg";
import styles from "./ExplorePage.module.css";
import { useCart } from "../../context/CartContext";
import PLUSICON from "/plus.svg";
import { Link } from "react-router-dom";

type Juego = {
    id: number;
    titulo: string;
    descripcion: string;
    precio: number;
    slug: string;
    porcentajeOferta: number | null;
    fotos: { url: string }[];
    categorias: string[];
    plataformas: string[];
};

type Categoria = {
    id: number;
    nombre: string;
};

type Plataforma = {
    id: number;
    nombre: string;
};

function RetryImage({ src, alt }: { src?: string; alt: string }) {
    const [imageSrc, setImageSrc] = useState(src || STORELOGO);
    const [retrying, setRetrying] = useState(false);
    const imgRef = useRef<HTMLImageElement>(null);

    const handleImageError = () => {
        if (!retrying && imgRef.current) {
            setRetrying(true);
            imgRef.current.src = imageSrc;
        } else {
            setImageSrc(STORELOGO);
        }
    };

    return (
        <img
            ref={imgRef}
            src={imageSrc}
            alt={alt}
            className={styles.image}
            onError={handleImageError}
        />
    );
}

export default function ExplorePage() {
    const [juegos, setJuegos] = useState<Juego[]>([]);
    const [filtroCategoria, setFiltroCategoria] = useState("");
    const [filtroOferta, setFiltroOferta] = useState(false);
    const [filtroPlataforma, setFiltroPlataforma] = useState("");
    const [rangoPrecio, setRangoPrecio] = useState<[number, number]>([0, 70]);
    const [categoriasDisponibles, setCategoriasDisponibles] = useState<
        Categoria[]
    >([]);
    const [plataformasDisponibles, setPlataformasDisponibles] = useState<
        Plataforma[]
    >([]);
    const { addToCart } = useCart();

    useEffect(() => {
        const fetchJuegos = async () => {
            try {
                const res = await fetch(
                    `${import.meta.env.VITE_BACKEND_URL}/juegos/explorar`
                );
                const data = await res.json();
                setJuegos(data);
            } catch (error) {
                console.error("Error al cargar juegos:", error);
            }
        };

        const fetchCategorias = async () => {
            try {
                const res = await fetch(
                    `${import.meta.env.VITE_BACKEND_URL}/categorias/juegos`
                );
                const data = await res.json();
                setCategoriasDisponibles(data);
            } catch (error) {
                console.error("Error al cargar categorías:", error);
            }
        };

        const fetchPlataformas = async () => {
            try {
                const res = await fetch(
                    `${import.meta.env.VITE_BACKEND_URL}/plataformas`
                );
                const data = await res.json();
                setPlataformasDisponibles(data);
            } catch (error) {
                console.error("Error al cargar plataformas:", error);
            }
        };

        fetchJuegos();
        fetchCategorias();
        fetchPlataformas();
    }, []);

    const juegosFiltrados = juegos.filter((juego) => {
        const cumpleCategoria = filtroCategoria
            ? juego.categorias.includes(filtroCategoria)
            : true;
        const cumpleOferta = filtroOferta
            ? juego.porcentajeOferta !== null
            : true;
        const cumplePlataforma = filtroPlataforma
            ? juego.plataformas.includes(filtroPlataforma)
            : true;
        const cumplePrecio =
            juego.precio >= rangoPrecio[0] && juego.precio <= rangoPrecio[1];

        return (
            cumpleCategoria && cumpleOferta && cumplePlataforma && cumplePrecio
        );
    });

    return (
        <div className={styles.catalogoContainer}>
            <h1 className={styles.titulo}>Catálogo de Juegos</h1>

            <div className={styles.filtros}>
                <label>
                    Categoría:
                    <select
                        value={filtroCategoria}
                        onChange={(e) => setFiltroCategoria(e.target.value)}
                    >
                        <option value="">Todas</option>
                        {categoriasDisponibles.map((cat) => (
                            <option key={cat.id} value={cat.nombre}>
                                {cat.nombre}
                            </option>
                        ))}
                    </select>
                </label>

                <label>
                    Plataforma:
                    <select
                        value={filtroPlataforma}
                        onChange={(e) => setFiltroPlataforma(e.target.value)}
                    >
                        <option value="">Todas</option>
                        {plataformasDisponibles.map((plat) => (
                            <option key={plat.id} value={plat.nombre}>
                                {plat.nombre}
                            </option>
                        ))}
                    </select>
                </label>

                <label>
                    <input
                        type="checkbox"
                        checked={filtroOferta}
                        onChange={(e) => setFiltroOferta(e.target.checked)}
                    />
                    Solo ofertas
                </label>

                <label>
                    Rango de Precio: S/{rangoPrecio[0]} - S/{rangoPrecio[1]}
                    <input
                        type="range"
                        min="0"
                        max="70"
                        step="1"
                        value={rangoPrecio[1]}
                        onChange={(e) =>
                            setRangoPrecio([0, Number(e.target.value)])
                        }
                    />
                </label>
            </div>

            <div className={styles.juegosGrid}>
                {juegosFiltrados.map((juego) => {
                    const hasDiscount =
                        typeof juego.porcentajeOferta === "number" &&
                        juego.porcentajeOferta > 0;
                    const discountedPrice = hasDiscount
                        ? (
                              juego.precio *
                              (1 - juego.porcentajeOferta! / 100)
                          ).toFixed(2)
                        : null;

                    return (
                        <Link
                            to={`/game/${juego.slug}`}
                            key={juego.id}
                            className={styles.juegoCard}
                        >
                            <div className={styles.imageWrapper}>
                                <RetryImage
                                    src={juego.fotos[0]?.url}
                                    alt={juego.titulo}
                                />
                                <button
                                    className={styles.plusButton}
                                    onClick={(e) => {
                                        e.preventDefault(); // no navega al hacer click
                                        addToCart(juego);
                                    }}
                                    aria-label="Agregar al carrito"
                                >
                                    <img src={PLUSICON} alt="+" />
                                </button>
                            </div>

                            <h3>{juego.titulo}</h3>
                            <p className={styles.categorias}>
                                {juego.categorias.join(", ")}
                            </p>
                            <span className={styles.plataformas}>
                                {juego.plataformas.join(", ")}
                            </span>
                            <div className={styles.precio}>
                                {hasDiscount ? (
                                    <>
                                        <span className={styles.discount}>
                                            -{juego.porcentajeOferta}%
                                        </span>
                                        <span className={styles.oldPrice}>
                                            {juego.precio.toFixed(2)} PEN
                                        </span>
                                        <span className={styles.newPrice}>
                                            {discountedPrice} PEN
                                        </span>
                                    </>
                                ) : (
                                    <span className={styles.newPrice}>
                                        S/ {juego.precio.toFixed(2)}
                                    </span>
                                )}
                            </div>
                        </Link>
                    );
                })}
            </div>
        </div>
    );
}
