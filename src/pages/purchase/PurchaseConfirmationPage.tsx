import styles from "./PurchaseConfirmationPage.module.css";
import { Link } from "react-router-dom";

const purchasedGames = [
    {
        id: 1,
        title: "The Witcher 3: Wild Hunt",
        image: "https://cdn.cloudflare.steamstatic.com/steam/apps/292030/header.jpg",
        quantity: 1,
        price: 29.99,
    },
    {
        id: 2,
        title: "Hades",
        image: "https://cdn.cloudflare.steamstatic.com/steam/apps/1145360/header.jpg",
        quantity: 2,
        price: 24.99,
    },
];

export default function PurchaseConfirmationPage() {
    const total = purchasedGames.reduce(
        (acc, game) => acc + game.price * game.quantity,
        0
    );

    return (
        // Requerimento [13]
        // Nota:
        // - Para ver como va quedando tu diseño, esta es la ruta:
        //   http://localhost:5173/proyectoprograweb/#/purchase-confirmation
        <div className={styles.container}>
            <div className={styles.summaryBox}>
                <Link to="/" className={styles.backLink}>
                    ← Volver
                </Link>
                <h1 className={styles.title}>¡Gracias por su compra!</h1>
                <p className={styles.subtitle}>
                    Las llaves de los juegos que adquiriste serán enviadas a tu
                    correo electrónico.
                </p>
                <h2 className={styles.sectionTitle}>Resumen de tu compra</h2>
                <div className={styles.gamesList}>
                    {purchasedGames.map((game) => (
                        <div key={game.id} className={styles.gameItem}>
                            <img
                                src={game.image}
                                alt={game.title}
                                className={styles.gameThumbnail}
                            />
                            <div className={styles.gameDetails}>
                                <h3 className={styles.gameTitle}>
                                    {game.title}
                                </h3>
                                <p className={styles.gameMeta}>
                                    Cantidad: {game.quantity}
                                </p>
                                <p className={styles.gameMeta}>
                                    Importe: $
                                    {(game.price * game.quantity).toFixed(2)}
                                </p>
                            </div>
                        </div>
                    ))}
                </div>
                <div className={styles.totalRow}>
                    <span className={styles.totalLabel}>Total:</span>
                    <span>${total.toFixed(2)}</span>
                </div>
            </div>
        </div>
    );
}
