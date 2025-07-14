import { useEffect, useState } from "react";
import "./BestReviewedPage.css";

type JuegoRanking = {
  nombre: string;
  plataformas: string[];
  descripcion: string;
  imagen: string;
  score: number;
};

const clasePlataforma: { [key: string]: string } = {
  PC: "pc",
  PS5: "ps5",
  PS4: "ps4",             
  Switch: "switch",
  "Xbox-One": "xbox",     
  "Xbox-X": "xbox",       
};


const BACKEND_URL = import.meta.env.VITE_BACKEND_URL;

export default function BestReviewedPage() {
  const [juegosRanking, setJuegosRanking] = useState<JuegoRanking[]>([]);

  useEffect(() => {
    const fetchJuegos = async () => {
      try {
        const response = await fetch(`${BACKEND_URL}/juegos/mejor-valorados`);
        const data = await response.json();
        setJuegosRanking(data);
      } catch (error) {
        console.error("Error al cargar juegos mejor valorados:", error);
      }
    };

    fetchJuegos();
  }, []);

  return (
    <div className="best-reviewed-page">
      <div className="page-header">
        <h1>LOS MEJOR VALORADOS</h1>
        <p>Los juegos mejor puntuados por los usuarios y la crítica de JuegosXD</p>
      </div>

      <div className="ranking-page">
        {juegosRanking.map((juego, index) => (
          <div key={index} className="ranking-container">
            <div className="score-circle">{juego.score}</div>
            <img className="game-cover" src={juego.imagen} alt={juego.nombre} />
            <div className="game-info">
              <div className="game-header">
                <span className="title-text">{juego.nombre}</span>
                <span className="platform">
                  {juego.plataformas.map((plat, i) => (
                    <span key={i} className={`tag-plataforma ${clasePlataforma[plat] || ""}`}>
                      {plat}
                    </span>
                  ))}
                </span>
              </div>
              <p className="description">{juego.descripcion}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
