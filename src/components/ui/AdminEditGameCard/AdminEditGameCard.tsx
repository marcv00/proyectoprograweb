// components/AdminEditGameCard.tsx
import React, { useState } from "react";
import styles from "./AdminEditGameCard.module.css";

type Game = {
  id: number;
  title: string;
  category: string;
  releaseDate: string;
  price: number;
  discount?: number;
};

type Props = {
  game: Game;
  onSave: (updatedGame: Game) => void;
  onCancel: () => void;
};

export default function AdminEditGameCard({ game, onSave, onCancel }: Props) {
  const [formData, setFormData] = useState<Game>({ ...game });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: name === "price" || name === "discount" ? parseFloat(value) : value,
    });
  };

  return (
    <div className={styles.overlay}>
      <div className={styles.card}>
        <h2>Editar Juego</h2>
        <label>
          Título:
          <input name="title" value={formData.title} onChange={handleChange} />
        </label>

        <label>
          Categoría:
          <select name="category" value={formData.category} onChange={handleChange}>
            <option value="RPG">RPG</option>
            <option value="Sports">Sports</option>
            <option value="Shooter">Shooter</option>
            <option value="Adventure">Adventure</option>
            <option value="Simulation">Simulation</option>
            <option value="Racing">Racing</option>
            <option value="Sandbox">Sandbox</option>
            <option value="Battle Royale">Battle Royale</option>
          </select>
        </label>

        <label>
          Precio:
          <input type="number" name="price" value={formData.price} onChange={handleChange} />
        </label>

        <label>
          Descuento (%):
          <input
            type="number"
            name="discount"
            min={0}
            max={100}
            value={formData.discount ?? ""}
            onChange={handleChange}
          />
        </label>

        <div className={styles.actions}>
          <button onClick={() => onSave(formData)}>Guardar</button>
          <button onClick={onCancel} className={styles.cancelBtn}>Cancelar</button>
        </div>
      </div>
    </div>
  );
}
