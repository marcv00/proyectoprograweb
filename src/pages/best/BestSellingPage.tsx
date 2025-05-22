import "./BestSellingPage.css";

type JuegoVenta = {
  puesto: number;
  nombre: string;
  imagen: string;
  precio: string;           // precio actual
  precioAntes?: string;     // precio anterior, si hay descuento
  descuento?: string;       // "-20%", si aplica
  plataforma: string[];
  etiqueta?: string;        // "NUEVO", etc.
};


const juegosVendidos: JuegoVenta[] = [
  {
    puesto: 1,
    nombre: "Minecraft",
    imagen: "https://static0.gamerantimages.com/wordpress/wp-content/uploads/2023/05/minecraft-new-spin-off-genres.jpg",
    descuento: "-90%",
    precioAntes: "S/. 99.00",
    precio: "S/. 9.90",
    plataforma: ["PC", "XBOne", "PS5", "Switch"],
    etiqueta: "POPULAR",
  },
  {
    puesto: 2,
    nombre: "League of Legends",
    imagen: "https://images3.alphacoders.com/129/1297067.jpg",
    precio: "S/. 100.00",
    plataforma: ["PC"],
  },  
  {
    puesto: 3,
    nombre: "The Legend of Zelda: Tears of the Kingdom",
    imagen: "https://zelda.nintendo.com/tears-of-the-kingdom/images/share-fb.jpg",
    precio: "S/. 259.00",
    plataforma: ["Switch"],
  },
  {
    puesto: 4,
    nombre: "Red Dead Redemption 2",
    imagen: "https://gaming-cdn.com/images/products/1744/orig/red-dead-redemption-2-xbox-one-game-microsoft-store-europe-cover.jpg?v=1730908051",
    precio: "S/. 139.00",
    plataforma: ["PS5"],
  },
    {
    puesto: 5,
    nombre: "PES 2025",
    imagen: "https://cdn.cloudflare.steamstatic.com/steam/apps/1665460/header.jpg",
    precio: "S/. 59.99",
    plataforma: ["PC", "PS5", "XBOne"],
    etiqueta: "DEPORTES",
  },
  {
    puesto: 6,
    nombre: "Left 4 Dead",
    imagen: "https://cdn.akamai.steamstatic.com/steam/apps/500/header.jpg",
    precio: "S/. 69.99",
    plataforma: ["PC", "XBOne"],
    etiqueta: "ZOMBIES",
  },
  {
    puesto: 7,
    nombre: "GTA V",
    imagen: "https://cdn.akamai.steamstatic.com/steam/apps/271590/header.jpg",
    descuento: "-60%",
    precioAntes: "S/. 49.98",
    precio: "S/. 19.99",
    plataforma: ["PC", "PS5", "XBOne"],
    etiqueta: "MUNDO ABIERTO",
  },
  {
    puesto: 8,
    nombre: "Resident Evil",
    imagen: "https://cdn.akamai.steamstatic.com/steam/apps/304240/header.jpg",
    precio: "S/. 46.99",
    plataforma: ["PC", "PS5", "XBOne"],
    etiqueta: "SURVIVAL",
  },
  {
    puesto: 9,
    nombre: "Call of Duty: Modern Warfare II",
    imagen: "https://cdn.cloudflare.steamstatic.com/steam/apps/1938090/header.jpg",
    precio: "S/. 59.99",
    plataforma: ["PC", "PS5", "XBOne"],
    etiqueta: "SHOOTER",
  },
  {
    puesto: 10,
    nombre: "DiRT Rally 2.0",
    imagen: "https://cdn.akamai.steamstatic.com/steam/apps/690790/header.jpg",
    precio: "S/. 39.99",
    plataforma: ["PC", "PS5", "XBOne"],
    etiqueta: "CARRERAS",
  },
  {
    puesto: 11,
    nombre: "Batman: Arkham Knight",
    imagen: "https://cdn.akamai.steamstatic.com/steam/apps/208650/header.jpg",
    precio: "S/. 29.99",
    plataforma: ["PC", "PS5", "XBOne"],
    etiqueta: "ACCIÓN",
  },
  {
    puesto: 12,
    nombre: "Rise of the Tomb Raider",
    imagen: "https://cdn.akamai.steamstatic.com/steam/apps/391220/header.jpg",
    descuento: "-50%",
    precioAntes: "S/. 39.98",
    precio: "S/. 19.99",
    plataforma: ["PC", "PS5", "XBOne"],
    etiqueta: "AVENTURA",
  },
  {
    puesto: 13,
    nombre: "OneShot",
    imagen: "https://shared.fastly.steamstatic.com/store_item_assets/steam/apps/420530/header.jpg?t=1747673318",
    precio: "S/. 25.00",
    plataforma: ["PC"],
  },
];

const clasePlataforma: { [key: string]: string } = {
  PC: 'pc',
  PS5: 'ps5',
  Switch: 'switch',
  XBOne: 'xbox',
};

export default function BestSellingPage() {
  return (
    <div className="best-selling-page">
      <div className="selling-page-header">
        <h1>LOS MÁS VENDIDOS</h1>
        <p>Los 100 juegos más vendidos al momento, por ingresos</p>
      </div>
      <div className="ranking-page">
        {juegosVendidos.map((juego, index) =>
          <div key={index}  className="selling-container">
            <div className="puesto">{juego.puesto}</div>
            <img className={`selling-game-cover`} src={juego.imagen} alt={juego.nombre} />
            
            <div className="selling-title-game">{juego.nombre}</div>
            <div className="precio-grupo">
              {juego.plataforma.map((plat, i) => (
                <span key={i} className={`selling-tag-plataforma ${clasePlataforma[plat] || ''}`}>
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

        )}
      </div>
        
    </div>
  );
}
