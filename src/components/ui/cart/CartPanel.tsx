// src/components/ui/CartPanel/CartPanel.tsx
import { useNavigate } from "react-router-dom";
import { useCart } from "../../../context/CartContext";
import "./CartPanel.css";
import SHOPCARTICON from "/SHOPCARTICON.svg";

export default function CartPanel() {
    const {
        isCartOpen,
        closeCart,
        cartItems,
        removeFromCart,
        // reloadCart, // ← solo si lo necesitas en el futuro
    } = useCart();

    const navigate = useNavigate();

    const handleRemove = async (juegoId: number) => {
        console.log("Eliminando juego con ID:", juegoId); // 👈 agrega este log
        await removeFromCart(juegoId);
    };


    const getTotal = () => {
        return cartItems.reduce((acc, item) => acc + item.precio, 0);
    };

    const handleCheckout = () => {
        closeCart();
        navigate("/checkout");
    };

    return (
        <div className={`cartPanel ${isCartOpen ? "open" : ""}`}>
            <div className="cartHeader">
                <div className="cartTittle">
                    <img
                        src={SHOPCARTICON}
                        alt="shopcart"
                        className="shopcart-icon"
                    />
                    <h2>Resumen de tu carrito</h2>
                </div>
                <button onClick={closeCart} className="closeBtn">
                    X
                </button>
            </div>

            <div className="cartItems">
                {cartItems.length > 0 ? (
                    <>
                        <h3 style={{ marginBottom: "10px" }}>
                            Juegos seleccionados:
                        </h3>
                        {cartItems.map((item, index) => (
                            <div key={item.id} className="cartItem">
                                <img
                                    src={item.fotos[0]?.url}
                                    alt={item.titulo}
                                />
                                <div className="cartInfo">
                                    <h4>{item.titulo}</h4>
                                    <p>{item.precio.toFixed(2)} PEN</p>
                                    {
                                        <button
                                            onClick={() => handleRemove(item.id)}
                                            className="removeBtn"
                                        >
                                            Eliminar
                                        </button>
                                    }
                                </div>
                            </div>
                        ))}
                    </>
                ) : (
                    <p>Tu carrito está vacío</p>
                )}
            </div>

            <div className="cartTotal">
                <span>Total del carrito:</span>
                <strong>{getTotal().toFixed(2)} PEN</strong>
            </div>

            <button
                className="checkoutBtn"
                onClick={handleCheckout}
                disabled={cartItems.length === 0}
            >
                Ir a Checkout
            </button>
        </div>
    );
}
