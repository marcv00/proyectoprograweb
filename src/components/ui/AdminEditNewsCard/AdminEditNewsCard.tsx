// AdminEditNewsCard.tsx
import { useState } from "react";
import styles from "./AdminEditNewsCard.module.css"; // Reutilizamos los mismos estilos

// Tipo de noticia
type News = {
    id: number;
    title: string;
    shortsummary: string;
    text: string;
    readingtime: string;
    banner: string;
    date: string;
};

// Props del componente
type Props = {
    news: News;
    onSave: (updatedNews: News) => void;
    onCancel: () => void;
    create: boolean | null;
};

// Noticia por defecto para crear
const defaultNewNews: News = {
    id: Date.now(),
    title: "",
    shortsummary: "",
    text: "",
    readingtime: "",
    banner: "",
    date: new Date().toISOString().split("T")[0],
};

export default function AdminEditNewsCard({
    news,
    onSave,
    onCancel,
    create,
}: Props) {
    const [formData, setFormData] = useState<News>(
        create ? defaultNewNews : { ...news }
    );

    const handleChange = (
        e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
    ) => {
        const { name, value } = e.target;
        setFormData((prev) => ({
            ...prev,
            [name]: value,
        }));
    };

    return (
        <div className={styles.overlay}>
            <div className={styles.card}>
                <h2>{create ? "Crear Noticia" : "Editar Noticia"}</h2>

                <div className={styles.formGrid}>
                    {/* Columna izquierda */}
                    <div className={styles.formColumn}>
                        <label>
                            Título:
                            <input
                                name="title"
                                value={formData.title}
                                onChange={handleChange}
                            />
                        </label>

                        <label>
                            Tiempo estimado de lectura:
                            <input
                                name="readingtime"
                                value={formData.readingtime}
                                onChange={handleChange}
                            />
                        </label>

                        <label>
                            URL del banner:
                            <input
                                name="banner"
                                value={formData.banner}
                                onChange={handleChange}
                            />
                        </label>

                        <label>
                            Fecha:
                            <input
                                type="date"
                                name="date"
                                value={formData.date}
                                onChange={handleChange}
                            />
                        </label>
                    </div>

                    {/* Columna derecha */}
                    <div className={styles.formColumn}>
                        <label>
                            Resumen corto:
                            <input
                                name="shortsummary"
                                value={formData.shortsummary}
                                onChange={handleChange}
                            />
                        </label>

                        <label>
                            Texto completo:
                            <textarea
                                name="text"
                                value={formData.text}
                                onChange={handleChange}
                                rows={6}
                            />
                        </label>
                    </div>
                </div>

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
