import { useEffect, useState } from "react";
import styles from "./AdminGames.module.css";
import AdminEditGameCard from "../../components/ui/AdminEditGameCard/AdminEditGameCard";

type Game = {
    id: number;
    title: string;
    description: string;
    category: string;
    releaseDate: string;
    price: number;
    discount?: number;
};

export default function AdminGames() {
    const [sidebarWidth, setSidebarWidth] = useState(220);
    const [games, setGames] = useState<Game[]>([]);
    const [filteredGames, setFilteredGames] = useState<Game[]>([]);
    const [filters, setFilters] = useState({
        category: "",
        releaseDate: "",
        maxPrice: 300,
    });
    const [editingGame, setEditingGame] = useState<Game | null>(null);
    const [creatingNewGame, setCreatingNewGame] = useState<boolean>(false);
    const [juegoAEliminar, setJuegoAEliminar] = useState<number | null>(null);
    const [mostrarModalConfirmacion, setMostrarModalConfirmacion] = useState(false);

    const BACKEND_URL = import.meta.env.VITE_BACKEND_URL;

    useEffect(() => {
        const fetchGames = async () => {
            try {
                const response = await fetch(`${BACKEND_URL}/juegos/admin`);
                const data = await response.json();
                setGames(data);
                setFilteredGames(data);
            } catch (error) {
                console.error("Error al cargar juegos:", error);
            }
        };
        fetchGames();
    }, [BACKEND_URL]);

    useEffect(() => {
        const filtered = games.filter((game) => {
            return (
                (filters.category === "" || game.category === filters.category) &&
                (filters.releaseDate === "" || game.releaseDate >= filters.releaseDate) &&
                game.price <= filters.maxPrice
            );
        });
        setFilteredGames(filtered);
    }, [filters, games]);

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

    const handleFilterChange = (
        e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
    ) => {
        const { name, value } = e.target;
        setFilters({
            ...filters,
            [name]: name === "maxPrice" ? parseFloat(value) : value,
        });
    };

    const confirmarEliminacion = (id: number) => {
        setJuegoAEliminar(id);
        setMostrarModalConfirmacion(true);
    };

    const deleteGame = async (id: number) => {
        try {
            const response = await fetch(`${BACKEND_URL}/juegos/admin/${id}`, {
                method: "DELETE",
            });
            if (response.ok) {
                const updated = games.filter((g) => g.id !== id);
                setGames(updated);
            } else {
                console.error("Error al eliminar juego");
            }
        } catch (error) {
            console.error("Error al eliminar juego:", error);
        }
    };

    const updateGame = async (updatedGame: Game) => {
        try {
            const body = {
                title: updatedGame.title,
                description: updatedGame.description,
                price: updatedGame.price,
                releaseDate: updatedGame.releaseDate,
                discount: updatedGame.discount ?? 0,
                category: updatedGame.category,
            };
            const response = await fetch(`${BACKEND_URL}/juegos/admin/${updatedGame.id}`, {
                method: "PUT",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(body),
            });

            if (response.ok) {
                const updated = games.map((g) =>
                    g.id === updatedGame.id ? updatedGame : g
                );
                setGames(updated);
                setEditingGame(null);
            } else {
                console.error("Error al actualizar juego");
            }
        } catch (error) {
            console.error("Error al actualizar juego:", error);
        }
    };

    const createGame = async (newGame: Game) => {
        try {
            const body = {
                title: newGame.title,
                description: newGame.description,
                price: newGame.price,
                releaseDate: newGame.releaseDate,
                discount: newGame.discount ?? 0,
                category: newGame.category,
            };
            const response = await fetch(`${BACKEND_URL}/juegos/admin`, {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(body),
            });

            if (response.ok) {
                const nuevo = await response.json();
                const nuevoJuego: Game = {
                    id: nuevo.id,
                    title: nuevo.titulo,
                    description: nuevo.descripcion,
                    price: nuevo.precio,
                    discount: nuevo.porcentajeOferta ?? 0,
                    releaseDate: nuevo.fechaLanzamiento.substring(0, 10),
                    category: newGame.category,
                };
                setGames([...games, nuevoJuego]);
                setCreatingNewGame(false);
            } else {
                console.error("Error al crear juego");
            }
        } catch (error) {
            console.error("Error al crear juego:", error);
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
            <h1>Gestión de Juegos</h1>

            <div className={styles.filtersRow}>
                <div className={styles.filterSection}>
                    <div className={styles.filterContainer}>
                        <label htmlFor="category">Categoría:</label>
                        <select name="category" onChange={handleFilterChange} id="category">
                            <option value="">Todos</option>
                            <option value="Aventura">Aventura</option>
                            <option value="Acción">Acción</option>
                            <option value="Estrategia">Estrategia</option>
                            <option value="RPG">RPG</option>
                            <option value="Simulación">Simulación</option>
                            <option value="Deportes">Deportes</option>
                            <option value="Terror">Terror</option>
                            <option value="Indie">Indie</option>
                            <option value="Puzzle">Puzzle</option>
                            <option value="Shooter">Shooter</option>
                            <option value="Supervivencia">Supervivencia</option>
                            <option value="Multijugador">Multijugador</option>
                        </select>
                    </div>
                    <div className={styles.filterContainer}>
                        <label htmlFor="releaseDate">Fecha de Lanzamiento</label>
                        <input type="date" name="releaseDate" onChange={handleFilterChange} />
                    </div>
                    <div className={styles.filterContainer}>
                        <label htmlFor="maxPrice">Precio Máximo $</label>
                        <input
                            type="number"
                            name="maxPrice"
                            placeholder="100"
                            onChange={handleFilterChange}
                        />
                    </div>
                </div>
                <button
                    className={styles.addButton}
                    aria-label="Añadir juego"
                    onClick={() => setCreatingNewGame(true)}
                >
                    <img src="./plus-icon-black.svg" alt="Icono añadir" />
                </button>
            </div>

            <table className={styles.gamesTable}>
                <thead>
                    <tr>
                        <th>Título</th>
                        <th>Categoría</th>
                        <th>Lanzamiento</th>
                        <th>Precio</th>
                        <th></th>
                    </tr>
                </thead>
                <tbody>
                    {filteredGames.map((game) => (
                        <tr key={game.id} className={styles.gameRow} tabIndex={0}>
                            <td>{game.title}</td>
                            <td>{game.category}</td>
                            <td>{game.releaseDate}</td>
                            <td>${game.price.toFixed(2)}</td>
                            <td className={styles.actionsCell}>
                                <div className={styles.actions}>
                                    <button
                                        onClick={() => setEditingGame(game)}
                                        className={styles.editButton}
                                        aria-label={`Editar ${game.title}`}
                                    >
                                        <img src="./pencil.svg" alt="Editar icon" />
                                    </button>
                                    <button
                                        onClick={() => confirmarEliminacion(game.id)}
                                        className={styles.deleteButton}
                                        aria-label={`Eliminar ${game.title}`}
                                    >
                                        <img src="./trash-icon.svg" alt="Basura icon" />
                                    </button>
                                </div>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>

            {editingGame && (
                <AdminEditGameCard
                    game={editingGame}
                    onSave={updateGame}
                    onCancel={() => setEditingGame(null)}
                    create={false}
                />
            )}

            {creatingNewGame && (
                <AdminEditGameCard
                    game={{
                        id: 0,
                        title: "",
                        description: "",
                        category: "RPG",
                        releaseDate: new Date().toISOString().split("T")[0],
                        price: 0,
                        discount: 0,
                    }}
                    onSave={createGame}
                    onCancel={() => setCreatingNewGame(false)}
                    create={true}
                />
            )}

            {mostrarModalConfirmacion && (
                <div className={styles.modalOverlay}>
                    <div className={styles.modalBox}>
                        <p>¿Estás seguro que deseas eliminar este juego?</p>
                        <div className={styles.modalActions}>
                            <button
                                onClick={() => {
                                    if (juegoAEliminar !== null) {
                                        deleteGame(juegoAEliminar);
                                    }
                                    setMostrarModalConfirmacion(false);
                                    setJuegoAEliminar(null);
                                }}
                            >
                                Confirmar
                            </button>
                            <button
                                onClick={() => {
                                    setMostrarModalConfirmacion(false);
                                    setJuegoAEliminar(null);
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
