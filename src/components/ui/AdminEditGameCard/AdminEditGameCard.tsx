import { useState } from "react";
import styles from "./AdminEditGameCard.module.css";

// Definimos el tipo 'Game' con las propiedades que va a tener un juego
type Game = {
    id: number;
    title: string;
    category: string;
    releaseDate: string;
    price: number;
    discount?: number; // Opcional, puede no estar presente
};

// Props que espera el componente
type Props = {
    game: Game; // Juego original (para editar)
    onSave: (updatedGame: Game) => void; // Función a ejecutar al guardar
    onCancel: () => void; // Función a ejecutar al cancelar
    create: boolean | null; // Indica si estamos creando un nuevo juego o editando uno existente
};

// Este objeto es el modelo base para un juego nuevo
const defaultNewGame: Game = {
    id: Date.now(), // ID temporal generado con la hora actual (esto normalmente lo maneja el backend)
    title: "", // Campo vacío al inicio
    category: "RPG", // Categoría por defecto
    releaseDate: new Date().toISOString().split("T")[0], // Fecha actual en formato YYYY-MM-DD
    price: 0, // Precio inicial en 0
    discount: 0, // Sin descuento al principio
};

export default function AdminEditGameCard({
    game,
    onSave,
    onCancel,
    create,
}: Props) {
    // Estado del formulario, depende si estamos creando o editando
    const [formData, setFormData] = useState<Game>(
        create ? defaultNewGame : { ...game }
    );

    // Esta función se ejecuta cuando el usuario cambia cualquier campo del formulario
    const handleChange = (
        e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
    ) => {
        const { name, value } = e.target;

        // Actualizamos el estado del formulario
        setFormData((prev) => ({
            ...prev,
            // Convertimos los campos numéricos a número real (float)
            [name]:
                name === "price" || name === "discount"
                    ? parseFloat(value)
                    : value,
        }));
    };

    // Renderizado del formulario
    return (
        <div className={styles.overlay}>
            <div className={styles.card}>
                <h2>{create ? "Crear Juego" : "Editar Juego"}</h2>

                {/* Campo: Título del juego */}
                <label>
                    Título:
                    <input
                        name="title"
                        value={formData.title}
                        onChange={handleChange}
                    />
                </label>

                {/* Campo: Categoría del juego */}
                <label>
                    Categoría:
                    <select
                        name="category"
                        value={formData.category}
                        onChange={handleChange}
                    >
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
                    Fecha de lanzamiento:
                    <input
                        type="date"
                        name="releaseDate"
                        value={formData.releaseDate}
                        onChange={handleChange}
                    />
                </label>

                {/* Campo: Precio del juego */}
                <label>
                    Precio:
                    <input
                        type="number"
                        name="price"
                        value={formData.price}
                        onChange={handleChange}
                    />
                </label>

                {/* Campo: Descuento del juego (opcional) */}
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

                {/* Botones de acción: Guardar o Cancelar */}
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
