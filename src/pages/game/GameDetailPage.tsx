import { useState } from "react";
import "./GameDetailPage.css";
import purschasedGames from "/purschasedGames.svg";
import Trash2 from "/Trash2.svg";

export default function GameDetailPage() {
    const initialGames = [
        {
            id: 1,
            title: "Celestial Quest",
            developer: "Moonlight Studios",
            imageUrl:
                "https://cdn.akamai.steamstatic.com/steam/apps/1289310/header.jpg",
        },
        {
            id: 2,
            title: "Pixel Dungeon",
            developer: "RetroSoft",
            imageUrl:
                "https://cdn.akamai.steamstatic.com/steam/apps/588650/header.jpg",
        },
        {
            id: 3,
            title: "Rogue Galaxy",
            developer: "StarForge",
            imageUrl:
                "https://cdn.akamai.steamstatic.com/steam/apps/1718570/header.jpg",
        },
        {
            id: 4,
            title: "Mystic Valley",
            developer: "IndieCore",
            imageUrl:
                "https://cdn.akamai.steamstatic.com/steam/apps/1388770/header.jpg",
        },
    ];

    const [games, setGames] = useState(initialGames);
    const [selectedGameId, setSelectedGameId] = useState<number | null>(null);

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
            <h1>Mis Juegos Comprados</h1>
            <div className="games-grid">
                {games.map((game) => (
                    <div key={game.id} className="game-card">
                        <img
                            src={game.imageUrl}
                            alt={game.title}
                            className="game-image"
                        />
                        <div className="game-info">
                            <h3>{game.title}</h3>
                            <p>{game.developer}</p>
                            <button className="review-button">
                                Dejar reseña
                            </button>
                        </div>
                        <button
                            className="delete-icon-button"
                            onClick={() => setSelectedGameId(game.id)}
                        >
                            <img
                                src={Trash2}
                                alt="Eliminar"
                                className="trash-icon"
                            />
                        </button>
                    </div>
                ))}
            </div>

            {selectedGameId !== null && (
                <div className="modal-overlay">
                    <div className="modal">
                        <p>¿Seguro que quieres desinstalar este juego?</p>
                        <div className="modal-buttons">
                            <button
                                className="confirm-button"
                                onClick={handleUninstall}
                            >
                                Desinstalar
                            </button>
                            <button
                                className="cancel-button"
                                onClick={() => setSelectedGameId(null)}
                            >
                                Cancelar
                            </button>
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


