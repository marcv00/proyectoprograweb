import { useEffect, useState } from "react";
import styles from "./ExplorePage.module.css";

type Juego = {


    id: number;
    titulo: string;
    descripcion: string;
    precio: number;
    porcentajeOferta: number | null;
    fotos: { url: string }[];
    categorias: string[];
    plataformas: string[];
};


export default function ExplorePage() {
    const [juegos, setJuegos] = useState<Juego[]>([]);
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

    useEffect(() => {
        const fetchJuegos = async () => {
            try {
                const res = await fetch(`${import.meta.env.VITE_BACKEND_URL}/juegos/explorar`);
                const data = await res.json();
                setJuegos(data);
            } catch (error) {
                console.error("Error al cargar juegos:", error);
            }
        };

        fetchJuegos();
    }, []);

    const juegosFiltrados = juegos.filter((juego) => {
        const cumpleCategoria = filtroCategoria
            ? juego.categorias.some((cat) =>
                  cat.toLowerCase().includes(filtroCategoria.toLowerCase())
              )
            : true;
        const cumpleOferta = filtroOferta ? juego.porcentajeOferta !== null : true;
        const cumplePlataforma = filtroPlataforma
            ? juego.plataformas.includes(filtroPlataforma)
            : true;
        const cumplePrecio =
            juego.precio >= rangoPrecio[0] && juego.precio <= rangoPrecio[1];

        return cumpleCategoria && cumpleOferta && cumplePlataforma && cumplePrecio;
    });

    return (
        <div className={styles.catalogoContainer}>
            <h1 className={styles.titulo}>Catálogo de Juegos</h1>

            <div className={styles.filtros}>
                <label>
                    Categoría:
                    <input
                        type="text"
                        placeholder="Ej: Aventura"
                        value={filtroCategoria}
                        onChange={(e) => setFiltroCategoria(e.target.value)}
                    />
                </label>

                <label>
                    Plataforma:
                    <select
                        value={filtroPlataforma}
                        onChange={(e) => setFiltroPlataforma(e.target.value)}
                    >
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
                        onChange={(e) => setFiltroOferta(e.target.checked)}
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
                    onChange={(e) =>
                        setRangoPrecio([0, Number(e.target.value)])
                    }
                />
            </div>

            <div className={styles.juegosGrid}>
                {juegosFiltrados.map((juego) => (
                    <div
                        key={juego.id}
                        className={styles.juegoCard}
                        onClick={() => abrirDetalle(juego)}
                    >
                        <img src={juego.fotos[0]?.url} alt={juego.titulo} />
                        <h3>{juego.titulo}</h3>
                        <p>{juego.categorias.join(", ")}</p>
                        <span className={styles.plataformas}>
                            {juego.plataformas.join(", ")}
                        </span>
                        <p className={styles.precio}>
                            S/ {juego.precio.toFixed(2)}
                        </p>
                        {juego.porcentajeOferta !== null && (
                            <span className={styles.etiquetaOferta}>
                                ¡Oferta!
                            </span>
                        )}
                    </div>
                ))}
            </div>

            {juegoSeleccionado && (
                <div className={styles.modal} onClick={cerrarDetalle}>
                    <div
                        className={styles.modalContent}
                        onClick={(e) => e.stopPropagation()}
                    >
                        <span className={styles.cerrar} onClick={cerrarDetalle}>
                            &times;
                        </span>
                        <h2>{juegoSeleccionado.titulo}</h2>
                        <div className={styles.galeria}>
                            {juegoSeleccionado.fotos.map((foto, i) => (
                                <img
                                    key={i}
                                    src={foto.url}
                                    alt={`${juegoSeleccionado.titulo} ${i}`}
                                />
                            ))}
                        </div>
                        <p>{juegoSeleccionado.descripcion}</p>
                        <p>
                            <strong>Categorías:</strong>{" "}
                            {juegoSeleccionado.categorias.join(", ")}
                        </p>
                        <p>
                            <strong>Plataformas:</strong>{" "}
                            {juegoSeleccionado.plataformas.join(", ")}
                        </p>
                        <p>
                            <strong>Precio:</strong> S/{" "}
                            {juegoSeleccionado.precio.toFixed(2)}
                        </p>
                        {juegoSeleccionado.porcentajeOferta !== null && (
                            <p className={styles.etiquetaOferta}>
                                ¡Oferta del {juegoSeleccionado.porcentajeOferta}%!
                            </p>
                        )}
                    </div>
                </div>
            )}
        </div>
    );
}
