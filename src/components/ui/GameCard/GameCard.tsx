import { Link } from "react-router-dom";
import styles from "./GameCard.module.css";
import React from "react";

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
};

export default function GameCard({ game }: GameCardProps) {
    const hasDiscount =
        typeof game.porcentajeOferta === "number" && game.porcentajeOferta > 0;
    const discountedPrice = hasDiscount
        ? (game.precio * (1 - game.porcentajeOferta! / 100)).toFixed(2)
        : null;

    const handlePlusClick = (e: React.MouseEvent) => {
        e.preventDefault();
        e.stopPropagation();
        console.log("Clicked + on", game.titulo);
    };

    return (
        <Link to={`/game/${game.id}`} className={styles.card}>
            <div className={styles.imageWrapper}>
                <img
                    src={game.fotos[0]?.url || "/logo.svg"}
                    alt={game.titulo}
                    className={styles.image}
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
