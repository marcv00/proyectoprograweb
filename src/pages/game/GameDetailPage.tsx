// pages/game/GameDetailPage.tsx
import { useParams } from "react-router-dom";

export default function GameDetailPage() {
    const { id } = useParams();

    return (
        <div>
            <h1>Detalle del Juego</h1>
            <p>ID del juego: {id}</p>
            <p>Descripción, trailer, fotos, estrellas y reseñas del juego.</p>
        </div>
    );
}
