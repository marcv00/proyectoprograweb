import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import styles from "./GameDetailPage.module.css";
import { useCart } from "../../context/CartContext";

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

export default function GameDetailPage() {
    const { slug } = useParams();
    const [juego, setJuego] = useState<Juego | null>(null);
    const { addToCart } = useCart();

    useEffect(() => {
        const fetchJuego = async () => {
            try {
                const res = await fetch(
                    `${import.meta.env.VITE_BACKEND_URL}/juegos/slug/${slug}`
                );
                const data = await res.json();
                setJuego(data);
            } catch (error) {
                console.error("Error al cargar el juego:", error);
            }
        };

        fetchJuego();
    }, [slug]);

    if (!juego) return <p>Cargando...</p>;

    const hasDiscount =
        juego.porcentajeOferta !== null && juego.porcentajeOferta > 0;
    const discountedPrice = hasDiscount
        ? (juego.precio * (1 - juego.porcentajeOferta! / 100)).toFixed(2)
        : null;

    return (
        <div className={styles.detailContainer}>
            <h1>{juego.titulo}</h1>
            <div className={styles.galeria}>
                {juego.fotos.map((foto, i) => (
                    <img key={i} src={foto.url} alt={`${juego.titulo} ${i}`} />
                ))}
            </div>
            <p>{juego.descripcion}</p>
            <p>
                <strong>Categorías:</strong> {juego.categorias.join(", ")}
            </p>
            <p>
                <strong>Plataformas:</strong> {juego.plataformas.join(", ")}
            </p>
            <p>
                <strong>Precio:</strong>{" "}
                {hasDiscount ? (
                    <>
                        <span className={styles.oldPrice}>
                            {juego.precio.toFixed(2)} PEN
                        </span>{" "}
                        <span className={styles.discountedPrice}>
                            {discountedPrice} PEN
                        </span>
                    </>
                ) : (
                    <>S/ {juego.precio.toFixed(2)}</>
                )}
            </p>
            <button
                className={styles.addToCart}
                onClick={() => addToCart(juego)}
            >
                Agregar al carrito
            </button>
        </div>
    );
}
