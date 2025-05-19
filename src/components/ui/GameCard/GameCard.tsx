import { Link } from "react-router-dom";
import styles from "./GameCard.module.css";
import React from "react";

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

type GameCardProps = {
    game: Game;
    index: number;
};

export default function GameCard({ game, index }: GameCardProps) {
    const hasDiscount = typeof game.discount === "number" && game.discount > 0;
    const discountedPrice = hasDiscount
        ? (game.price * (1 - game.discount! / 100)).toFixed(2)
        : null;

    const handlePlusClick = (e: React.MouseEvent) => {
        e.preventDefault();
        e.stopPropagation();
        console.log("Clicked + on", game.title);
    };

    return (
        <Link to={`/game/${index}`} className={styles.card}>
            <div className={styles.imageWrapper}>
                <img
                    src={game.images[0]}
                    alt={game.title}
                    className={styles.image}
                />
                <button className={styles.plusButton} onClick={handlePlusClick}>
                    <img src="./plus.svg" alt="Add" />
                </button>
            </div>
            <div className={styles.details}>
                <div className={styles.text}>
                    <h3 className={styles.title}>{game.title}</h3>
                    <p className={styles.description}>{game.description}</p>
                </div>
                <div className={styles.pricing}>
                    {hasDiscount ? (
                        <>
                            <span className={styles.discount}>
                                -{game.discount}%
                            </span>
                            <span className={styles.oldPrice}>
                                {game.price.toFixed(2)} PEN
                            </span>
                            <span className={styles.newPrice}>
                                {discountedPrice} PEN
                            </span>
                        </>
                    ) : (
                        <span className={styles.newPrice}>
                            {game.price.toFixed(2)} PEN
                        </span>
                    )}
                </div>
            </div>
        </Link>
    );
}
