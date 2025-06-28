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
    const [filters, setFilters] = useState({
        title: "",
        date: "",
    });
    const [editingNews, setEditingNews] = useState<News | null>(null);
    const [creatingNew, setCreatingNew] = useState(false);

    // Estado para manejar el modal de confirmación
    const [noticiaAEliminar, setNoticiaAEliminar] = useState<number | null>(
        null
    );
    const [mostrarModalConfirmacion, setMostrarModalConfirmacion] =
        useState(false);

    // Sidebar width watcher
    useEffect(() => {
        const updateSidebarWidth = () => {
            const sidebar = document.querySelector(".sidebar");
            if (sidebar) {
                const width = sidebar.classList.contains("collapsed")
                    ? 60
                    : 220;
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

    // Simular carga de noticias
    useEffect(() => {
        const fakeNews: News[] = [
            {
                id: 1,
                title: "Nuevo juego anunciado",
                shortsummary: "Una gran sorpresa llega a los fans.",
                text: "Texto completo de la noticia...",
                readingtime: "3 min",
                banner: "/banners/news1.jpg",
                date: "2024-05-20",
            },
            {
                id: 2,
                title: "Actualización de Elden Ring",
                shortsummary: "Se añade un nuevo jefe al DLC.",
                text: "Texto completo de la noticia...",
                readingtime: "2 min",
                banner: "/banners/news2.jpg",
                date: "2024-05-15",
            },
            {
                id: 3,
                title: "Actualización de Elden Ring",
                shortsummary: "Se añade un nuevo jefe al DLC.",
                text: "Texto completo de la noticia...",
                readingtime: "2 min",
                banner: "/banners/news2.jpg",
                date: "2024-05-15",
            },
            {
                id: 4,
                title: "Actualización de Elden Ring",
                shortsummary: "Se añade un nuevo jefe al DLC.",
                text: "Texto completo de la noticia...",
                readingtime: "2 min",
                banner: "/banners/news2.jpg",
                date: "2024-05-15",
            },
            {
                id: 5,
                title: "Actualización de Elden Ring",
                shortsummary: "Se añade un nuevo jefe al DLC.",
                text: "Texto completo de la noticia...",
                readingtime: "2 min",
                banner: "/banners/news2.jpg",
                date: "2024-05-15",
            },
            // más noticias...
        ];
        setNewsList(fakeNews);
        setFilteredNews(fakeNews);
    }, []);

    useEffect(() => {
        const filtered = newsList.filter((n) => {
            return (
                (filters.title === "" ||
                    n.title
                        .toLowerCase()
                        .includes(filters.title.toLowerCase())) &&
                (filters.date === "" || n.date >= filters.date)
            );
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

    const deleteNews = (id: number) => {
        const updated = newsList.filter((n) => n.id !== id);
        setNewsList(updated);
    };

    const updateNews = (updatedItem: News) => {
        const updated = newsList.map((n) =>
            n.id === updatedItem.id ? updatedItem : n
        );
        setNewsList(updated);
        setEditingNews(null);
    };

    const createNews = (newItem: News) => {
        const newId = Math.max(...newsList.map((n) => n.id), 0) + 1;
        const withId = { ...newItem, id: newId };
        const updated = [...newsList, withId];
        setNewsList(updated);
        setCreatingNew(false);
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

            {/* Filtros + Agregar */}
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

            {/* Tabla */}
            <table className={styles.newsTable}>
                <thead>
                    <tr>
                        <th>Título</th>
                        <th>Fecha</th>
                        <th>Tiempo de Lectura</th>
                        <th></th> {/* Para los botones de acción */}
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
                                        <img
                                            src="./pencil.svg"
                                            alt="Editar icon"
                                        />
                                    </button>
                                    <button
                                        onClick={() =>
                                            confirmarEliminacion(item.id)
                                        }
                                        className={styles.deleteButton}
                                        aria-label={`Eliminar ${item.title}`}
                                    >
                                        <img
                                            src="./trash-icon.svg"
                                            alt="Basura icon"
                                        />
                                    </button>
                                </div>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>

            {/* Editor flotante para editar */}
            {editingNews && (
                <AdminEditNewsCard
                    news={editingNews}
                    onSave={updateNews}
                    onCancel={() => setEditingNews(null)}
                    create={false}
                />
            )}

            {/* Editor flotante para crear */}
            {creatingNew && (
                <AdminEditNewsCard
                    news={{
                        id: 0,
                        title: "",
                        shortsummary: "",
                        text: "",
                        readingtime: "1 min",
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
