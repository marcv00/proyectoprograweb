import { useEffect, useState } from "react";
import "./ExplorePage.css";

type Juego = {
  nombre: string;
  plataforma: string[];
  categoria: string;
  precio: number;
  oferta: boolean;
  imagenes: string[];
  descripcion: string;
  trailer: string;
  reseña: string;
  estrellas: number;
};

// Aquí está el array de juegos (omite para ahorrar espacio si no cambia)

const juegos: Juego[] = [
  {
    nombre: "Minecraft",
    plataforma: ["PC", "PS4", "Xbox", "Switch", "Móvil"],
    categoria: "Aventura / Sandbox",
    precio: 26.95,
    oferta: false,
    imagenes: ["https://cdn.cloudflare.steamstatic.com/steam/apps/1129580/header.jpg"],
    descripcion: "Construye y explora mundos infinitos con bloques.",
    trailer: "https://www.youtube.com/embed/MmB9b5njVbA",
    reseña: "Creativo, divertido y educativo.",
    estrellas: 5,
  },
  {
    nombre: "Outlast",
    plataforma: ["PC", "PS4", "Xbox"],
    categoria: "Terror / Aventura",
    precio: 29.99,
    oferta: true,
    imagenes: ["https://cdn.akamai.steamstatic.com/steam/apps/238320/header.jpg"],
    descripcion: "Periodista investiga un hospital psiquiátrico tenebroso.",
    trailer: "https://www.youtube.com/embed/2GPf3MdVOKI",
    reseña: "Muy aterrador, excelente atmósfera.",
    estrellas: 4,
  },
  {
    nombre: "Counter-Strike: Global Offensive",
    plataforma: ["PC", "Xbox"],
    categoria: "Shooter / Competitivo",
    precio: 50.99,
    oferta: false,
    imagenes: ["https://cdn.cloudflare.steamstatic.com/steam/apps/730/header.jpg"],
    descripcion: "FPS táctico con modo competitivo.",
    trailer: "https://www.youtube.com/embed/edYCtaNueQY",
    reseña: "Juego muy adictivo y exigente.",
    estrellas: 5,
  },
  {
    nombre: "Counter-Strike: Source",
    plataforma: ["PC"],
    categoria: "Shooter / Acción",
    precio: 9.99,
    oferta: true,
    imagenes: ["https://cdn.akamai.steamstatic.com/steam/apps/240/header.jpg"],
    descripcion: "Versión mejorada del clásico Counter-Strike.",
    trailer: "https://www.youtube.com/embed/bvI62FUDpKA",
    reseña: "Balanceado, fluido y competitivo.",
    estrellas: 4,
  },
  {
    nombre: "PES 2025",
    plataforma: ["PC", "PS4", "PS5", "Xbox"],
    categoria: "Fútbol / Deportes",
    precio: 59.99,
    oferta: false,
    imagenes: ["https://cdn.cloudflare.steamstatic.com/steam/apps/1665460/header.jpg"],
    descripcion: "Simulador de fútbol competitivo.",
    trailer:"https://www.youtube.com/embed/g_FLYnY5x08",
    reseña: "Mejores físicas y realismo.",
    estrellas: 4,
  },
  {
    nombre: "Left 4 Dead",
    plataforma: ["PC", "Xbox"],
    categoria: "Cooperativo / Zombies",
    precio: 69.99,
    oferta: true,
    imagenes: ["https://cdn.akamai.steamstatic.com/steam/apps/500/header.jpg"],
    descripcion: "Coop para sobrevivir a hordas de infectados.",
    trailer: "https://www.youtube.com/embed/Z5g3mrK82VA",
    reseña: "Ideal para jugar con amigos.",
    estrellas: 4,
  },
  {
    nombre: "GTA V",
    plataforma: ["PC", "PS5", "Xbox"],
    categoria: "Acción / Mundo abierto",
    precio: 19.99,
    oferta: true,
    imagenes: ["https://cdn.akamai.steamstatic.com/steam/apps/271590/header.jpg"],
    descripcion: "Tres protagonistas en el caos de Los Santos.",
    trailer: "https://www.youtube.com/embed/QkkoHAzjnUs",
    reseña: "Diversión sin límites.",
    estrellas: 5,
  },
  {
    nombre: "Resident Evil",
    plataforma: ["PC", "PS4", "Xbox"],
    categoria: "Terror / Supervivencia",
    precio: 46.99,
    oferta: false,
    imagenes: ["https://cdn.akamai.steamstatic.com/steam/apps/304240/header.jpg"],
    descripcion: "Clásico juego de zombies y supervivencia.",
    trailer: "https://www.youtube.com/embed/HhBAIDHvRTc",
    reseña: "Excelente ambientación y tensión.",
    estrellas: 5,
  },
  {
    nombre: "Call of Duty: Modern Warfare II",
    plataforma: ["PC", "PS5", "PS4", "Xbox"],
    categoria: "Shooter / Acción",
    precio: 59.99,
    oferta: true,
    imagenes: ["https://cdn.cloudflare.steamstatic.com/steam/apps/1938090/header.jpg"],
    descripcion: "Campaña intensa y multijugador épico.",
    trailer:  "https://www.youtube.com/embed/ztjfwecrY8E",
    reseña: "Visuales impresionantes y gameplay sólido.",
    estrellas: 5,
  },
  {
    nombre: "DiRT Rally 2.0",
    plataforma: ["PC", "PS4", "Xbox One"],
    categoria: "Carreras / Simulación",
    precio: 39.99,
    oferta: true,
    imagenes: ["https://cdn.akamai.steamstatic.com/steam/apps/690790/header.jpg"],
    descripcion: "Conduce autos de rally realistas en pistas extremas de todo el mundo.",
    trailer: "https://www.youtube.com/embed/RQ7JvIncd4Y",
    reseña: "Increíble realismo y física desafiante.",
    estrellas: 4,
  },
  {
    nombre: "Batman: Arkham Knight",
    plataforma: ["PC", "PS4", "Xbox One"],
    categoria: "Acción / Aventura",
    precio: 29.99,
    oferta: false,
    imagenes: ["https://cdn.akamai.steamstatic.com/steam/apps/208650/header.jpg"],
    descripcion: "Asume el rol de Batman enfrentando a nuevos enemigos en Gotham.",
    trailer: "https://www.youtube.com/embed/JeGAQXY2FzI",
    reseña: "Narrativa intensa y combates fluidos.",
    estrellas: 5,
  },
  {
    nombre: "Rise of the Tomb Raider",
    plataforma: ["PC", "PS4", "Xbox"],
    categoria: "Acción / Aventura",
    precio: 19.99,
    oferta: true,
    imagenes: ["https://cdn.akamai.steamstatic.com/steam/apps/391220/header.jpg"],
    descripcion: "Lara Croft explora Siberia en busca de la ciudad perdida de Kitezh.",
    trailer: "https://www.youtube.com/embed/qiYiddjc6cU",
    reseña: "Gráficos asombrosos y jugabilidad envolvente.",
    estrellas: 5,
  },
];

export default function ExplorePage() {
  const [juegoSeleccionado, setJuegoSeleccionado] = useState<Juego | null>(null);
  const [filtroCategoria, setFiltroCategoria] = useState("");
  const [filtroOferta, setFiltroOferta] = useState(false);
  const [filtroPlataforma, setFiltroPlataforma] = useState("");
  const [rangoPrecio, setRangoPrecio] = useState<[number, number]>([0, 70]);

  const abrirDetalle = (juego: Juego) => setJuegoSeleccionado(juego);
  const cerrarDetalle = () => setJuegoSeleccionado(null);

  useEffect(() => {
    const handleKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") cerrarDetalle();
    };
    window.addEventListener("keydown", handleKey);
    return () => window.removeEventListener("keydown", handleKey);
  }, []);

  const juegosFiltrados = juegos.filter(juego => {
    const cumpleCategoria = filtroCategoria ? juego.categoria.toLowerCase().includes(filtroCategoria.toLowerCase()) : true;
    const cumpleOferta = filtroOferta ? juego.oferta : true;
    const cumplePlataforma = filtroPlataforma ? juego.plataforma.includes(filtroPlataforma) : true;
    const cumplePrecio = juego.precio >= rangoPrecio[0] && juego.precio <= rangoPrecio[1];
    return cumpleCategoria && cumpleOferta && cumplePlataforma && cumplePrecio;
  });

  return (
    <div className="catalogo-container">
      <h1>Catálogo de Juegos</h1>

      <div className="filtros">
        <label>
          Categoría:
          <input
            type="text"
            placeholder="Ej: Aventura"
            value={filtroCategoria}
            onChange={e => setFiltroCategoria(e.target.value)}
          />
        </label>

        <label>
          Plataforma:
          <select value={filtroPlataforma} onChange={e => setFiltroPlataforma(e.target.value)}>
            <option value="">Todas</option>
            <option value="PC">Windows</option>
            <option value="PS4">PS4</option>
            <option value="PS5">PS5</option>
            <option value="Xbox">Xbox</option>
            <option value="Switch">Switch</option>
            <option value="Móvil">Móvil</option>
            <option value="macOS">macOS</option>
          </select>
        </label>

        <label>
          <input
            type="checkbox"
            checked={filtroOferta}
            onChange={e => setFiltroOferta(e.target.checked)}
          />
          Solo ofertas
        </label>

        <label>
          Rango de Precio: S/{rangoPrecio[0]} - S/{rangoPrecio[1]}
        </label>
        <input
          type="range"
          min="0"
          max="70"
          step="1"
          value={rangoPrecio[1]}
          onChange={e => setRangoPrecio([0, Number(e.target.value)])}
        />
      </div>

      <div className="juegos-grid">
        {juegosFiltrados.map((juego, index) => (
          <div key={index} className="juego-card" onClick={() => abrirDetalle(juego)}>
            <img src={juego.imagenes[0]} alt={juego.nombre} />
            <h3>{juego.nombre}</h3>
            <p>{juego.categoria}</p>
            <span className="plataformas">{juego.plataforma.join(", ")}</span>
            <p className="precio">S/ {juego.precio.toFixed(2)}</p>
            {juego.oferta && <span className="etiqueta-oferta">¡Oferta!</span>}
          </div>
        ))}
      </div>

      {juegoSeleccionado && (
        <div className="modal" onClick={cerrarDetalle}>
          <div className="modal-content" onClick={(e) => e.stopPropagation()}>
            <span className="cerrar" onClick={cerrarDetalle}>&times;</span>
            <h2>{juegoSeleccionado.nombre}</h2>
            <div className="galeria">
              {juegoSeleccionado.imagenes.map((src, i) => (
                <img key={i} src={src} alt={`${juegoSeleccionado.nombre} ${i}`} />
              ))}
            </div>
            <p>{juegoSeleccionado.descripcion}</p>
            <iframe
              width="100%"
              height="315"
              src={juegoSeleccionado.trailer}
              title="Trailer"
              frameBorder="0"
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
              allowFullScreen
            ></iframe>
            <p><strong>Reseña:</strong> {juegoSeleccionado.reseña}</p>
            <p><strong>Estrellas:</strong> {"★".repeat(juegoSeleccionado.estrellas)}</p>
          </div>
        </div>
      )}
    </div>
  );
}





