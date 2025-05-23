import { useState } from "react";
import styles from "./CheckoutPage.module.css";
import logo from "/logo.svg";
import { useNavigate } from "react-router-dom";

export default function CheckoutPage() {
    const navigate = useNavigate();
    const [formData, setFormData] = useState({
        name: "",
        cardNumber: "",
        expiry: "",
        cvv: "",
    });

    const [isProcessing, setIsProcessing] = useState(false);

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target;
        setFormData({ ...formData, [name]: value });
    };

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        setIsProcessing(true);
        setTimeout(() => {
            navigate("/purchase-confirmation");
        }, 3000); // Esperar 3 segundos
    };

    return (
        <div className={styles.checkoutContainer}>
            <div className={styles.presentationRow}>
                <h2 className={styles.title}>Formulario de Pago</h2>
                <img src={logo} alt="Logo" className={styles.storeLogo} />
            </div>
            <form className={styles.form} onSubmit={handleSubmit}>
                <label>
                    Nombre del titular:
                    <input
                        type="text"
                        name="name"
                        value={formData.name}
                        onChange={handleChange}
                        required
                        className={styles.input}
                    />
                </label>
                <label>
                    Numero de tarjeta:
                    <input
                        type="text"
                        name="cardNumber"
                        value={formData.cardNumber}
                        onChange={handleChange}
                        required
                        maxLength={16}
                        className={styles.input}
                    />
                </label>
                <div className={styles.row}>
                    <label>
                        Vencimiento:
                        <input
                            type="text"
                            name="expiry"
                            placeholder="MM/AA"
                            value={formData.expiry}
                            onChange={handleChange}
                            required
                            className={styles.input}
                        />
                    </label>
                    <label>
                        CVV:
                        <input
                            type="text"
                            name="cvv"
                            value={formData.cvv}
                            onChange={handleChange}
                            required
                            maxLength={4}
                            className={styles.input}
                        />
                    </label>
                </div>
                <button
                    type="submit"
                    className={styles.button}
                    disabled={isProcessing}
                    style={{
                        opacity: isProcessing ? 0.6 : 1,
                        cursor: isProcessing ? "not-allowed" : "pointer",
                    }}
                >
                    {isProcessing ? "Procesando..." : "Pagar"}
                </button>
            </form>
        </div>
    );
}
