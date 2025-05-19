// src/components/CartPanel/CartPanel.tsx
import { useCart } from "../../../context/CartContext";
import "./CartPanel.css";

export default function CartPanel() {
    const { isCartOpen, closeCart } = useCart();

    return (
        // Requerimento [11] , Requerimento [12]
        // Ver el diseño al presionar boton carro en barra de navegacion
        // http://localhost:5173/proyectoprograweb/#/
        <div className={`cartPanel ${isCartOpen ? "open" : ""}`}>
            Este es el carrito de compras
            <button onClick={closeCart} className="closeBtn">
                X
            </button>
        </div>
    );
}
