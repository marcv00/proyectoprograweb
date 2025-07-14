import { useEffect, useState } from "react";
import "./BestSellingPage.css";
const BACKEND_URL = import.meta.env.VITE_BACKEND_URL;

type JuegoVenta = {
  puesto: number;
  nombre: string;
  imagen: string;
  precio: string;
  precioAntes?: string;
  descuento?: string;
  plataforma: string[];
  etiqueta?: string;
};

const clasePlataforma: { [key: string]: string } = {
  PC: "pc",
  PS4: "ps4",
  PS5: "ps5",
  Switch: "switch",
  "Xbox-One": "xbox-one",
  "Xbox-X": "xbox-x",
};


export default function BestSellingPage() {
  const [juegos, setJuegos] = useState<JuegoVenta[]>([]);

  useEffect(() => {
    const fetchJuegosMasVendidos = async () => {
      try {
        const response = await fetch(`${BACKEND_URL}/juegos/mas-vendidos`); // Ajusta si usas otro puerto o ruta base
        const data = await response.json();

        const juegosFormateados: JuegoVenta[] = data.map((juego: any, index: number) => {
          const precioNum = juego.precio ?? juego.npm ?? 0;
          const descuento = juego.porcentajeOferta ?? 0;
          const precioAntes = descuento > 0 ? (precioNum / (1 - descuento)).toFixed(2) : null;

          return {
            puesto: index + 1,
            nombre: juego.titulo,
            imagen: juego.fotos[0]?.url ?? "", // Asegúrate de que haya al menos una foto
            precio: `S/. ${precioNum.toFixed(2)}`,
            precioAntes: precioAntes ? `S/. ${precioAntes}` : undefined,
            descuento: descuento > 0 ? `-${Math.round(descuento * 100)}%` : undefined,
            plataforma: juego.plataformas,
          };
        });

        setJuegos(juegosFormateados);
      } catch (error) {
        console.error("Error al cargar juegos más vendidos", error);
      }
    };

    fetchJuegosMasVendidos();
  }, []);

  return (
    <div className="best-selling-page">
      <div className="selling-page-header">
        <h1>LOS MÁS VENDIDOS</h1> 
        <p>Los 100 juegos más vendidos al momento, por ingresos</p>
      </div>
      <div className="ranking-page">
        {juegos.map((juego, index) => (
          <div key={index} className="selling-container">
            <div className="puesto">{juego.puesto}</div>
            <img className="selling-game-cover" src={juego.imagen} alt={juego.nombre} />
            <div className="selling-title-game">{juego.nombre}</div>
            <div className="precio-grupo">
              {juego.plataforma.map((plat, i) => (
                <span key={i} className={`selling-tag-plataforma ${clasePlataforma[plat] || ""}`}>
                  {plat}
                </span>
              ))}
              {juego.descuento && juego.precioAntes ? (
                <div className="selling-precio-wrapper">
                  <div className="precio-antiguo">{juego.precioAntes}</div>
                  <div className="descuento-bloque">
                    <div className="selling-descuento">{juego.descuento}</div>
                    <div className="precio-final">{juego.precio}</div>
                  </div>
                </div>
              ) : (
                <div className="selling-precio">{juego.precio}</div>
              )}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
