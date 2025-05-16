import { useParams } from "react-router-dom";
import "./GameDetailPage.css";

export default function GameDetailPage() {
    const { id } = useParams();

    return (
        // Requerimento [9] , Requerimento [14]
        // Nota:
        // - Faltaria añadir estilos en GameDetailPage.css (ya esta importado)
        // - Para ver como va quedando tu diseño, esta es la ruta:
        //  http://localhost:5173/game/{aqui le agregas un numero cualquiera}

        <div>
            <h1>Detalle del Juego</h1>
            <p>ID del juego: {id}</p>
            <p>Descripción, trailer, fotos, estrellas y reseñas del juego.</p>
        </div>
    );
}
