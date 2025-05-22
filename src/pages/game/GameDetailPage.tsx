import { useState } from "react";
import "./GameDetailPage.css";
import purschasedGames from "/purschasedGames.svg";
import Trash2 from "/Trash2.svg";

export default function GameDetailPage() {
    const initialGames = [
        {
            id: 1,
            title: "Minecraft",
            developer: "Mojang Studios",
            imageUrl: "https://www.infobae.com/resizer/v2/EXPB4AGS2ZA7VKTZKFMVELDHQU.jpg?auth=7b5dfca07a45f13226dc58f5c8e0b1d431b42d02dd699b6358a79aeaac84cf71&smart=true&width=1200&height=675&quality=85",
        },
        {
            id: 2,
            title: "GTA V",
            developer: "RockStar North",
            imageUrl: "https://th.bing.com/th/id/OIP.nd2WAw1I2eGRLNNE2C-BRQHaEK?cb=iwp2&rs=1&pid=ImgDetMain",
        },
        {
            id: 3,
            title: "Elden Ring",
            developer: "FromSoftware",
            imageUrl: "https://steamforged.com/cdn/shop/collections/ER-collection-2000x1125-780428.png?v=1743077065",
        },
        {
            id: 4,
            title: "Rocket League",
            developer: "Psyonix",
            imageUrl: "https://th.bing.com/th/id/R.7651ccf27b34eb6977bb79c65388bbf2?rik=36QrNBGjxAO%2bWA&pid=ImgRaw&r=0",
        },
    ];

    const [games, setGames] = useState(initialGames);
    const [selectedGameId, setSelectedGameId] = useState<number | null>(null);
    const [showReviewModal, setShowReviewModal] = useState<number | null>(null);
    const [rating, setRating] = useState(0);
    const [reviewText, setReviewText] = useState("");

    const handleUninstall = () => {
        setGames(games.filter((game) => game.id !== selectedGameId));
        setSelectedGameId(null);
    };

    return (
        <div className="purchased-games-container">
            <img
                src={purschasedGames}
                alt="PurschasedGames"
                className="purschased-games-icon"
            />
            <h1>Juegos Obtenidos</h1>
            <div className="games-grid">
                {games.map((game) => (
                    <div key={game.id} className="game-card">
                        <img src={game.imageUrl} alt={game.title} className="game-image" />
                        <div className="game-info">
                            <h3>{game.title}</h3>
                            <p>{game.developer}</p>
                            <div className="game-buttons">
                                <button className="play-button hover-grow">Jugar</button>
                                <button
                                    className="review-button hover-grow"
                                    onClick={() => setShowReviewModal(game.id)}
                                >
                                    Dejar reseña
                                </button>
                            </div>
                        </div>
                        <button
                            className="delete-icon-button hover-grow"
                            onClick={() => setSelectedGameId(game.id)}
                        >
                            <img src={Trash2} alt="Eliminar" className="trash-icon" />
                        </button>
                    </div>
                ))}
            </div>

            {/* Modal de confirmación de desinstalación */}
            {selectedGameId !== null && (
                <div className="modal-overlay">
                    <div className="modal">
                        <p>¿Seguro que quieres desinstalar este juego?</p>
                        <div className="modal-buttons">
                            <button className="confirm-button hover-grow" onClick={handleUninstall}>
                                Desinstalar
                            </button>
                            <button
                                className="cancel-button hover-grow"
                                onClick={() => setSelectedGameId(null)}
                            >
                                Cancelar
                            </button>
                        </div>
                    </div>
                </div>
            )}

            {showReviewModal !== null && (
                <div className="modal-overlay">
                    <div className="review-modal-container">
                        <div className="review-background">
                            <img
                                src={games.find((g) => g.id === showReviewModal)?.imageUrl}
                                alt="Fondo"
                                className="background-blur"
                            />
                        </div>
                        <div className="review-content">
                            <button
                                className="close-button hover-grow"
                                onClick={() => setShowReviewModal(null)}
                            >
                                ✕
                            </button>
                            <h2 className="review-title">
                                {games.find((g) => g.id === showReviewModal)?.title}
                            </h2>
                            <p className="review-developer">
                                {games.find((g) => g.id === showReviewModal)?.developer}
                            </p>

                            <div className="rating-stars">
                                {[1, 2, 3, 4, 5].map((star) => (
                                    <span
                                        key={star}
                                        className={star <= rating ? "star selected" : "star"}
                                        onClick={() => setRating(star)}
                                    >
                                        ★
                                    </span>
                                ))}
                            </div>

                            <textarea
                                placeholder="Escribe tu reseña aquí :) ..."
                                value={reviewText}
                                onChange={(e) => setReviewText(e.target.value)}
                            />
                            <button className="confirm-button hover-grow">Publicar reseña</button>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
}



        // Requerimento [10] , Requerimento [15]
        // Nota:
        // - Faltaria añadir estilos en GameDetailPage.css (ya esta importado)
        // - Para ver como va quedando tu diseño, esta es la ruta:
        //  http://localhost:5173/proyectoprograweb/#/game/{aqui le agregas un numero cualquiera}


