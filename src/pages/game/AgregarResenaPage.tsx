import { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import styles from "./AgregarResenaPage.module.css";

export default function AgregarResenaPage() {
    const { slug } = useParams();
    const navigate = useNavigate();
    const [comentario, setComentario] = useState("");
    const [puntuacion, setPuntuacion] = useState(5);
    const [cargando, setCargando] = useState(false);
    const [juego, setJuego] = useState<{ id: number; titulo: string } | null>(null);

    useEffect(() => {
        const fetchJuego = async () => {
            try {
                const res = await fetch(`${import.meta.env.VITE_BACKEND_URL}/juegos/slug/${slug}`);
                if (!res.ok) throw new Error("No se pudo cargar el juego");
                const data = await res.json();
                setJuego({ id: data.id, titulo: data.titulo });
            } catch (err) {
                console.error("Error al obtener el juego:", err);
            }
        };

        fetchJuego();
    }, [slug]);

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setCargando(true);

        const usuarioId = localStorage.getItem("usuarioId");

        if (!usuarioId || !juego?.id) {
            alert("Faltan datos de usuario o juego");
            return;
        }

        try {
            const res = await fetch(`${import.meta.env.VITE_BACKEND_URL}/resenas`, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({
                    texto: comentario,
                    puntuacion,
                    usuarioId: parseInt(usuarioId),
                    juegoId: juego.id,
                }),
            });

            if (!res.ok) throw new Error("Error al enviar reseña");

            navigate("/mis-juegos");
        } catch (error) {
            console.error(error);
            alert("Error al enviar la reseña");
        } finally {
            setCargando(false);
        }
    };

    return (
        <div className={styles.container}>
            <h2 className={styles.titulo}>Agregar Reseña</h2>
            {juego && <h2 className={styles.tituloJuego}>{juego.titulo}</h2>}

            <form className={styles.formulario} onSubmit={handleSubmit}>
                <label className={styles.label}>
                    Comentario:
                    <textarea
                        className={styles.textarea}
                        value={comentario}
                        onChange={(e) => setComentario(e.target.value)}
                        required
                    />
                </label>

                <label className={styles.label}>
                    Puntuación:
                    <select
                        className={styles.select}
                        value={puntuacion}
                        onChange={(e) => setPuntuacion(Number(e.target.value))}
                    >
                        {[1, 2, 3, 4, 5].map((n) => (
                            <option key={n} value={n}>
                                {n} ⭐
                            </option>
                        ))}
                    </select>
                </label>

                <div className={styles.botones}>
                    <button
                        className={styles.botonPrimario}
                        type="submit"
                        disabled={cargando}
                    >
                        {cargando ? "Enviando..." : "Enviar Reseña"}
                    </button>
                    <button
                        className={styles.botonSecundario}
                        type="button"
                        onClick={() => navigate("/mis-juegos")}
                    >
                        Cancelar
                    </button>
                </div>
            </form>
        </div>
    );
}
