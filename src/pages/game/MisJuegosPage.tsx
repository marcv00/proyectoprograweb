import { useEffect, useState } from "react";
import styles from "./MisJuegosPage.module.css";
import { Link } from "react-router-dom";

type Juego = {
    id: number;
    titulo: string;
    slug: string;
    precio: number;
    porcentajeOferta: number | null;
    fotos: { url: string }[];
};

export default function MisJuegosPage() {
    const [juegos, setJuegos] = useState<Juego[]>([]);
    const [cargando, setCargando] = useState(true);

    useEffect(() => {
        const fetchJuegos = async () => {
            const token = localStorage.getItem("token");

            try {
                const res = await fetch(
                    `${import.meta.env.VITE_BACKEND_URL}/usuarios/mis-juegos`,
                    {
                        headers: {
                            Authorization: `Bearer ${token}`,
                        },
                    }
                );

                if (!res.ok) throw new Error("Fallo la carga de mis juegos");

                const data = await res.json();

                if (Array.isArray(data)) {
                    setJuegos(data);
                } else {
                    console.error("Respuesta inesperada del backend:", data);
                }
            } catch (error) {
                console.error("Error al cargar juegos:", error);
            } finally {
                setCargando(false);
            }
        };

        fetchJuegos();
    }, []);

    if (cargando) return <p className={styles.estado}>Cargando juegos...</p>;

    if (juegos.length === 0)
        return <p className={styles.estado}>No tenés juegos registrados.</p>;

    return (
        <div className={styles.container}>
            <h1 className={styles.titulo}>Mis Juegos</h1>
            <div className={styles.grid}>
                {juegos.map((juego) => {
                    const tieneDescuento =
                        juego.porcentajeOferta !== null &&
                        juego.porcentajeOferta > 0;
                    const precioDescontado = tieneDescuento
                        ? (
                              juego.precio *
                              (1 - juego.porcentajeOferta! / 100)
                          ).toFixed(2)
                        : null;

                    return (
                        <div key={juego.id} className={styles.card}>
                            <Link to={`/game/${juego.slug}`}>
                                <img
                                    src={juego.fotos[0]?.url || "/placeholder.jpg"}
                                    alt={juego.titulo}
                                    className={styles.imagen}
                                />
                                <h3 className={styles.nombre}>{juego.titulo}</h3>
                                <p className={styles.precio}>
                                    {tieneDescuento ? (
                                        <>
                                            <span className={styles.oldPrice}>
                                                S/ {juego.precio.toFixed(2)}
                                            </span>{" "}
                                            <span className={styles.discountedPrice}>
                                                S/ {precioDescontado}
                                            </span>
                                        </>
                                    ) : (
                                        <>S/ {juego.precio.toFixed(2)}</>
                                    )}
                                </p>
                            </Link>

                            <Link
                                to={`/game/${juego.slug}/agregar-resena`}
                                className={styles.botonResena}
                            >
                                Agregar Reseña
                            </Link>
                        </div>
                    );
                })}
            </div>
        </div>
    );
}
