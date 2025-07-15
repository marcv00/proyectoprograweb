import { useEffect, useState } from "react";
import styles from "./AdminNews.module.css";
import AdminEditNewsCard from "../../components/ui/AdminEditNewsCard/AdminEditNewsCard";

type News = {
    id: number;
    title: string;
    shortsummary: string;
    text: string;
    readingtime: string;
    banner: string;
    date: string;
};

export default function AdminNews() {
    const [sidebarWidth, setSidebarWidth] = useState(220);
    const [newsList, setNewsList] = useState<News[]>([]);
    const [filteredNews, setFilteredNews] = useState<News[]>([]);
    const [filters, setFilters] = useState({ title: "", date: "" });
    const [editingNews, setEditingNews] = useState<News | null>(null);
    const [creatingNew, setCreatingNew] = useState(false);
    const [noticiaAEliminar, setNoticiaAEliminar] = useState<number | null>(null);
    const [mostrarModalConfirmacion, setMostrarModalConfirmacion] = useState(false);

    const BACKEND_URL = import.meta.env.VITE_BACKEND_URL;

    useEffect(() => {
        const updateSidebarWidth = () => {
            const sidebar = document.querySelector(".sidebar");
            if (sidebar) {
                const width = sidebar.classList.contains("collapsed") ? 60 : 220;
                setSidebarWidth(width);
            }
        };

        const observer = new MutationObserver(updateSidebarWidth);
        const target = document.querySelector(".sidebar");
        if (target) {
            observer.observe(target, {
                attributes: true,
                attributeFilter: ["class"],
            });
        }

        updateSidebarWidth();
        return () => observer.disconnect();
    }, []);

    useEffect(() => {
        const fetchNews = async () => {
            try {
                const response = await fetch(`${BACKEND_URL}/noticias/admin`);
                if (!response.ok) throw new Error("Error al obtener noticias");

                const data = await response.json();

                const parsed: News[] = data.map((n: any) => ({
                    id: n.id,
                    title: n.titulo,
                    shortsummary: n.resumen,
                    text: n.texto,
                    readingtime: `${n.tiempoLectura} min`,
                    banner: n.foto?.url ?? "",
                    date: n.fechaPub ? n.fechaPub.substring(0, 10) : ""
                }));

                setNewsList(parsed);
                setFilteredNews(parsed);
            } catch (error) {
                console.error("❌ Error al cargar noticias admin:", error);
            }
        };

        fetchNews();
    }, [BACKEND_URL]);

    useEffect(() => {
        const filtered = newsList.filter((n) => {
            const pasaTitulo =
                filters.title === "" ||
                n.title.toLowerCase().includes(filters.title.toLowerCase());

            const pasaFecha =
                filters.date === "" || (n.date && n.date >= filters.date);

            return pasaTitulo && pasaFecha;
        });

        setFilteredNews(filtered);
    }, [filters, newsList]);

    const handleFilterChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target;
        setFilters({ ...filters, [name]: value });
    };

    const confirmarEliminacion = (id: number) => {
        setNoticiaAEliminar(id);
        setMostrarModalConfirmacion(true);
    };

    const deleteNews = async (id: number) => {
        try {
            const response = await fetch(`${BACKEND_URL}/noticias/${id}`, {
                method: "DELETE",
            });

            if (response.ok) {
                const updated = newsList.filter((n) => n.id !== id);
                setNewsList(updated);
            } else {
                console.error("Error al eliminar noticia");
            }
        } catch (error) {
            console.error("Error al eliminar noticia:", error);
        }
    };

    const updateNews = async (updatedItem: News) => {
        try {
            const body = {
                titulo: updatedItem.title,
                resumen: updatedItem.shortsummary,
                texto: updatedItem.text,
                slug: updatedItem.title.toLowerCase().replace(/\s+/g, "-"),
                tiempoLectura: parseInt(updatedItem.readingtime),
                fechaPub: updatedItem.date,
                fotoUrl: updatedItem.banner,
            };

            const response = await fetch(`${BACKEND_URL}/noticias/${updatedItem.id}`, {
                method: "PUT",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(body),
            });

            if (response.ok) {
                const updated = newsList.map((n) =>
                    n.id === updatedItem.id ? updatedItem : n
                );
                setNewsList(updated);
                setEditingNews(null);
            } else {
                console.error("Error al actualizar noticia");
            }
        } catch (error) {
            console.error("Error al actualizar noticia:", error);
        }
    };

    const createNews = async (newItem: News) => {
        try {
            const body = {
                titulo: newItem.title,
                resumen: newItem.shortsummary,
                texto: newItem.text,
                slug: newItem.title.toLowerCase().replace(/\s+/g, "-"),
                tiempoLectura: parseInt(newItem.readingtime),
                fechaPub: newItem.date,
                fotoUrl: newItem.banner,
            };

            const response = await fetch(`${BACKEND_URL}/noticias`, {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(body),
            });

            if (response.ok) {
                const nueva = await response.json();
                const nuevaNews: News = {
                    id: nueva.id,
                    title: nueva.titulo,
                    shortsummary: nueva.resumen,
                    text: nueva.texto,
                    readingtime: `${nueva.tiempoLectura} min`,
                    banner: nueva.foto.url,
                    date: nueva.fechaPub.substring(0, 10),
                };

                setNewsList([...newsList, nuevaNews]);
                setCreatingNew(false);
            } else {
                console.error("Error al crear noticia");
            }
        } catch (error) {
            console.error("Error al crear noticia:", error);
        }
    };

    return (
        <div
            className={styles.adminContainer}
            style={{
                marginLeft: `${sidebarWidth}px`,
                transition: "margin-left 0.3s ease",
            }}
        >
            <h1>Gestión de Noticias</h1>

            <div className={styles.filtersRow}>
                <div className={styles.filterSection}>
                    <div className={styles.filterContainer}>
                        <label htmlFor="title">Título:</label>
                        <input
                            type="text"
                            name="title"
                            id="title"
                            placeholder="Buscar título..."
                            onChange={handleFilterChange}
                        />
                    </div>
                    <div className={styles.filterContainer}>
                        <label htmlFor="date">Desde fecha:</label>
                        <input
                            type="date"
                            name="date"
                            id="date"
                            onChange={handleFilterChange}
                        />
                    </div>
                </div>
                <button
                    className={styles.addButton}
                    aria-label="Añadir noticia"
                    onClick={() => setCreatingNew(true)}
                >
                    <img src="./plus-icon-black.svg" alt="Icono añadir" />
                </button>
            </div>

            <table className={styles.newsTable}>
                <thead>
                    <tr>
                        <th>Título</th>
                        <th>Fecha</th>
                        <th>Tiempo de Lectura</th>
                        <th></th>
                    </tr>
                </thead>
                <tbody>
                    {filteredNews.map((item) => (
                        <tr key={item.id} className={styles.newsRow}>
                            <td>{item.title}</td>
                            <td>{item.date}</td>
                            <td>{item.readingtime}</td>
                            <td className={styles.actionsCell}>
                                <div className={styles.actions}>
                                    <button
                                        onClick={() => setEditingNews(item)}
                                        className={styles.editButton}
                                        aria-label={`Editar ${item.title}`}
                                    >
                                        <img src="./pencil.svg" alt="Editar icon" />
                                    </button>
                                    <button
                                        onClick={() => confirmarEliminacion(item.id)}
                                        className={styles.deleteButton}
                                        aria-label={`Eliminar ${item.title}`}
                                    >
                                        <img src="./trash-icon.svg" alt="Basura icon" />
                                    </button>
                                </div>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>

            {editingNews && (
                <AdminEditNewsCard
                    news={editingNews}
                    onSave={updateNews}
                    onCancel={() => setEditingNews(null)}
                    create={false}
                />
            )}

            {creatingNew && (
                <AdminEditNewsCard
                    news={{
                        id: 0,
                        title: "",
                        shortsummary: "",
                        text: "",
                        readingtime: "1",
                        banner: "",
                        date: new Date().toISOString().split("T")[0],
                    }}
                    onSave={createNews}
                    onCancel={() => setCreatingNew(false)}
                    create={true}
                />
            )}

            {mostrarModalConfirmacion && (
                <div className={styles.modalOverlay}>
                    <div className={styles.modalBox}>
                        <p>¿Estás seguro que deseas eliminar esta noticia?</p>
                        <div className={styles.modalActions}>
                            <button
                                onClick={() => {
                                    if (noticiaAEliminar !== null) {
                                        deleteNews(noticiaAEliminar);
                                    }
                                    setMostrarModalConfirmacion(false);
                                    setNoticiaAEliminar(null);
                                }}
                            >
                                Confirmar
                            </button>
                            <button
                                onClick={() => {
                                    setMostrarModalConfirmacion(false);
                                    setNoticiaAEliminar(null);
                                }}
                            >
                                Cancelar
                            </button>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
}
