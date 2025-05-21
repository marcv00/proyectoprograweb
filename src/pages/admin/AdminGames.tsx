// pages/admin/AdminGames.tsx
import { useState, useEffect } from "react";
import styles from "./AdminGames.module.css";
import AdminEditGameCard from "../../components/ui/AdminEditGameCard/AdminEditGameCard";

type Game = {
  id: number;
  title: string;
  category: string;
  releaseDate: string;
  price: number;
  discount?: number;
};

export default function AdminGames() {
  const [games, setGames] = useState<Game[]>([]);
  const [filteredGames, setFilteredGames] = useState<Game[]>([]);
  const [filters, setFilters] = useState({
    category: "",
    releaseDate: "",
    maxPrice: 100,
  });
  const [editingGame, setEditingGame] = useState<Game | null>(null);

  useEffect(() => {
    const fakeData: Game[] = [
      { id: 1, title: "Elden Ring", category: "RPG", releaseDate: "2022-02-25", price: 59.99 },
      { id: 2, title: "FIFA 24", category: "Sports", releaseDate: "2023-09-29", price: 69.99 },
      { id: 3, title: "The Witcher 3", category: "RPG", releaseDate: "2015-05-19", price: 39.99 },
      { id: 4, title: "Call of Duty: Modern Warfare II", category: "Shooter", releaseDate: "2022-10-28", price: 69.99 },
      { id: 5, title: "Minecraft", category: "Sandbox", releaseDate: "2011-11-18", price: 26.95 },
      { id: 6, title: "Cyberpunk 2077", category: "RPG", releaseDate: "2020-12-10", price: 49.99 },
      { id: 7, title: "Hogwarts Legacy", category: "Adventure", releaseDate: "2023-02-10", price: 59.99 },
      { id: 8, title: "Gran Turismo 7", category: "Racing", releaseDate: "2022-03-04", price: 69.99 },
      { id: 9, title: "Animal Crossing: New Horizons", category: "Simulation", releaseDate: "2020-03-20", price: 59.99 },
      { id: 10, title: "Fortnite", category: "Battle Royale", releaseDate: "2017-07-21", price: 0.0 },
    ];
    setGames(fakeData);
    setFilteredGames(fakeData);
  }, []);

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

  const handleFilterChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFilters({ ...filters, [name]: name === "maxPrice" ? parseFloat(value) : value });
  };

  const deleteGame = (id: number) => {
    const updated = games.filter((g) => g.id !== id);
    setGames(updated);
  };

  const updateGame = (updatedGame: Game) => {
    const updated = games.map((g) => (g.id === updatedGame.id ? updatedGame : g));
    setGames(updated);
    setEditingGame(null);
  };

  return (
    <div className={styles.adminContainer}>
      <h1>Gestión de Juegos</h1>

      {/* Filtros + Agregar */}
      <div className={styles.filtersRow}>
        <select name="category" onChange={handleFilterChange}>
          <option value="">Todas</option>
          <option value="RPG">RPG</option>
          <option value="Sports">Sports</option>
          <option value="Shooter">Shooter</option>
          <option value="Adventure">Adventure</option>
          <option value="Simulation">Simulation</option>
          <option value="Sandbox">Sandbox</option>
          <option value="Racing">Racing</option>
          <option value="Battle Royale">Battle Royale</option>
        </select>
        <input type="date" name="releaseDate" onChange={handleFilterChange} />
        <div className={styles.sliderContainer}>
          <label>Máx. Precio: ${filters.maxPrice}</label>
          <input
            type="range"
            name="maxPrice"
            min="0"
            max="100"
            value={filters.maxPrice}
            onChange={handleFilterChange}
          />
        </div>
        <button className={styles.addButton}>Agregar Juego</button>
      </div>

      {/* Tabla de juegos */}
      <table className={styles.gamesTable}>
        <thead>
          <tr>
            <th>Título</th>
            <th>Categoría</th>
            <th>Lanzamiento</th>
            <th>Precio</th>
            <th>Acciones</th>
          </tr>
        </thead>
        <tbody>
          {filteredGames.map((game) => (
            <tr key={game.id} className={styles.gameRow}>
              <td>{game.title}</td>
              <td>{game.category}</td>
              <td>{game.releaseDate}</td>
              <td>${game.price.toFixed(2)}</td>
              <td className={styles.actionsCell}>
                <div className={styles.actions}>
                  <button onClick={() => setEditingGame(game)}>✏️</button>
                  <button onClick={() => deleteGame(game.id)}>🗑️</button>
                </div>
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      {/* Editor flotante */}
      {editingGame && (
        <AdminEditGameCard
          game={editingGame}
          onSave={updateGame}
          onCancel={() => setEditingGame(null)}
        />
      )}
    </div>
  );
}
