import styles from "./PurchaseConfirmationPage.module.css";
import { Link } from "react-router-dom";
import { useCart } from "../../context/CartContext";

export default function PurchaseConfirmationPage() {
    const { cartItems } = useCart();

    const calculatePrice = (precio: number, porcentajeOferta: number | null) => {
        if (porcentajeOferta) {
            return precio * (1 - porcentajeOferta / 100);
        }
        return precio;
    };

    const total = cartItems.reduce((acc, game) => {
        const finalPrice = calculatePrice(game.precio, game.porcentajeOferta);
        return acc + finalPrice;
    }, 0);

    return (
        <div className={styles.container}>
            <div className={styles.summaryBox}>
                <Link to="/" className={styles.backLink}>
                    ← Volver
                </Link>
                <h1 className={styles.title}>¡Estás a punto de comprar estos juegos!</h1>

                <h2 className={styles.sectionTitle}>Lista de juegos</h2>
                <div className={styles.gamesList}>
                    {cartItems.map((game) => {
                        const price = calculatePrice(game.precio, game.porcentajeOferta);
                        return (
                            <div key={game.id} className={styles.gameItem}>
                                <img
                                    src={game.fotos[0]?.url}
                                    alt={game.titulo}
                                    className={styles.gameThumbnail}
                                />
                                <div className={styles.gameDetails}>
                                    <h3 className={styles.gameTitle}>
                                        {game.titulo}
                                    </h3>
                                    <p className={styles.gameMeta}>
                                        Cantidad: 1
                                    </p>
                                    <p className={styles.gameMeta}>
                                        Importe: ${price.toFixed(2)}
                                    </p>
                                </div>
                            </div>
                        );
                    })}
                </div>

                <div className={styles.totalRow}>
                    <span className={styles.totalLabel}>Total:</span>
                    <span>${total.toFixed(2)}</span>
                </div>

                {/* BOTÓN AGREGADO AQUÍ */}
                <div className={styles.buttonContainer}>
                    <Link to="/pago" className={styles.proceedButton}>
                        Proceder con la compra
                    </Link>
                </div>
            </div>
        </div>
    );
}
