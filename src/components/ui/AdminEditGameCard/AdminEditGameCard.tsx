import { useState } from "react";
import styles from "./AdminEditGameCard.module.css";

type Game = {
    id: number;
    title: string;
    description: string;
    category: string;
    releaseDate: string;
    price: number;
    discount?: number;
};

type Props = {
    game: Game;
    onSave: (updatedGame: Game) => void;
    onCancel: () => void;
    create: boolean | null;
};

const defaultNewGame: Game = {
    id: Date.now(),
    title: "",
    description: "",
    category: "RPG",
    releaseDate: new Date().toISOString().split("T")[0],
    price: 0,
    discount: 0,
};

export default function AdminEditGameCard({
    game,
    onSave,
    onCancel,
    create,
}: Props) {
    const [formData, setFormData] = useState<Game>(
        create ? defaultNewGame : { ...game }
    );

    const handleChange = (
        e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>
    ) => {
        const { name, value } = e.target;
        setFormData((prev) => ({
            ...prev,
            [name]:
                name === "price" || name === "discount"
                    ? parseFloat(value)
                    : value,
        }));
    };

    return (
        <div className={styles.overlay}>
            <div className={styles.card}>
                <h2>{create ? "Crear Juego" : "Editar Juego"}</h2>

                <label>
                    Título:
                    <input
                        name="title"
                        value={formData.title}
                        onChange={handleChange}
                    />
                </label>

                <label>
                    Descripción:
                    <textarea
                        name="description"
                        value={formData.description}
                        onChange={handleChange}
                        rows={4}
                        placeholder="Agrega una descripción del juego"
                    />
                </label>

                <label>
                    Categoría:
                    <select
                        name="category"
                        value={formData.category}
                        onChange={handleChange}
                    >
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
                </label>

                <label>
                    Fecha de lanzamiento:
                    <input
                        type="date"
                        name="releaseDate"
                        value={formData.releaseDate}
                        onChange={handleChange}
                    />
                </label>

                <label>
                    Precio:
                    <input
                        type="number"
                        name="price"
                        value={formData.price}
                        onChange={handleChange}
                    />
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
                    <button onClick={() => onSave(formData)}>
                        {create ? "Crear" : "Guardar"}
                    </button>
                    <button onClick={onCancel} className={styles.cancelBtn}>
                        Cancelar
                    </button>
                </div>
            </div>
        </div>
    );
}
