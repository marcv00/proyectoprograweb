import { Link } from "react-router-dom";
import styles from "./GameCard.module.css";
import React, { useRef, useState } from "react";
import STORELOGO from "/logo.svg";

type GameCard = {
    id: number;
    titulo: string;
    descripcion: string;
    precio: number;
    porcentajeOferta: number | null;
    fotos: { url: string }[];
};

type GameCardProps = {
    game: GameCard;
    onAddToCart?: (game: GameCard) => void;
};


export default function GameCard({ game, onAddToCart }: GameCardProps) {
    const hasDiscount =
        typeof game.porcentajeOferta === "number" && game.porcentajeOferta > 0;
    const discountedPrice = hasDiscount
        ? (game.precio * (1 - game.porcentajeOferta! / 100)).toFixed(2)
        : null;

    const [imageSrc, setImageSrc] = useState<string>(
        game.fotos[0]?.url || STORELOGO
    );
    const [retrying, setRetrying] = useState(false);
    const imgRef = useRef<HTMLImageElement>(null);

    const handleImageError = () => {
        if (!retrying && imgRef.current) {
            // Retry without CORS/referrerPolicy
            setRetrying(true);
            imgRef.current.removeAttribute("crossOrigin");
            imgRef.current.removeAttribute("referrerPolicy");
            imgRef.current.src = imageSrc; // retry with same src
        } else {
            // Final fallback
            setImageSrc(STORELOGO);
        }
    };

    const handlePlusClick = (e: React.MouseEvent) => {
        e.preventDefault();
        e.stopPropagation();
        console.log("Clicked + on", game.titulo);
        if (onAddToCart) {
            onAddToCart(game); // ← Aquí se dispara lo que venga desde HomePage.tsx
        }
    };

    return (
        <Link to={`/game/${game.id}`} className={styles.card}>
            <div className={styles.imageWrapper}>
                <img
                    ref={imgRef}
                    src={imageSrc}
                    alt={game.titulo}
                    className={styles.image}
                    onError={handleImageError}
                    crossOrigin="anonymous"
                    referrerPolicy="no-referrer"
                />
                <button className={styles.plusButton} onClick={handlePlusClick}>
                    <img src="./plus.svg" alt="Add" />
                </button>
            </div>
            <div className={styles.details}>
                <div className={styles.text}>
                    <h3 className={styles.title}>{game.titulo}</h3>
                    <p className={styles.description}>{game.descripcion}</p>
                </div>
                <div className={styles.pricing}>
                    {hasDiscount ? (
                        <>
                            <span className={styles.discount}>
                                -{game.porcentajeOferta}%
                            </span>
                            <span className={styles.oldPrice}>
                                {game.precio.toFixed(2)} PEN
                            </span>
                            <span className={styles.newPrice}>
                                {discountedPrice} PEN
                            </span>
                        </>
                    ) : (
                        <span className={styles.newPrice}>
                            {game.precio.toFixed(2)} PEN
                        </span>
                    )}
                </div>
            </div>
        </Link>
    );
}
