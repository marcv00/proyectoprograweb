import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import styles from "./NewsSinglePage.module.css";

type Noticia = {
    id: number;
    titulo: string;
    texto: string;
    slug: string;
    tiempoLectura: number;
    fechaPub: string;
    foto: { url: string } | null;
    categorias: string[];
};

export default function NewsSinglePage() {
    const { slug } = useParams();
    const [noticia, setNoticia] = useState<Noticia | null>(null);

    useEffect(() => {
        const fetchNoticia = async () => {
            try {
                const res = await fetch(
                    `${import.meta.env.VITE_BACKEND_URL}/noticias/slug/${slug}`
                );
                const data = await res.json();
                setNoticia(data);
            } catch (error) {
                console.error("Error al cargar la noticia:", error);
            }
        };

        fetchNoticia();
    }, [slug]);

    if (!noticia) return <p className={styles.loading}>Cargando noticia...</p>;

    const fecha = new Date(noticia.fechaPub).toLocaleDateString("es-PE", {
        year: "numeric",
        month: "long",
        day: "numeric",
    });

    return (
        <div className={styles.container}>
            {noticia.foto?.url && (
                <img
                    src={noticia.foto.url}
                    alt={noticia.titulo}
                    className={styles.cover}
                />
            )}
            <div className={styles.content}>
                <div className={styles.metaContainer}>
                    <div className={styles.categorias}>
                        {noticia.categorias
                            .map((cat) => cat.toUpperCase())
                            .join(", ")}
                    </div>

                    <div className={styles.meta}>
                        <span>{fecha}</span>
                        <span className={styles.readTime}>
                            <img src="./clock.svg" alt="Clock icon" />
                            {noticia.tiempoLectura} min de lectura
                        </span>
                    </div>
                </div>

                <h1 className={styles.title}>{noticia.titulo}</h1>

                <article className={styles.texto}>
                    {noticia.texto.split("\n").map((p, i) => (
                        <p key={i}>{p}</p>
                    ))}
                </article>
            </div>
        </div>
    );
}
