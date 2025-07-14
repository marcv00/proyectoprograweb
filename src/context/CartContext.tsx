// src/context/CartContext.tsx
import { createContext, useContext, useState, useEffect } from "react";
import type { ReactNode } from "react";

interface Game {
    id: number;
    titulo: string;
    precio: number;
    fotos: { url: string }[];
}

interface CartContextType {
    isCartOpen: boolean;
    toggleCart: () => void;
    openCart: () => void;
    closeCart: () => void;
    cartItems: Game[];
    addToCart: (game: Game) => Promise<void>;
    removeFromCart: (juegoId: number) => Promise<void>; // ← NUEVO
    reloadCart: () => Promise<void>;
}


const CartContext = createContext<CartContextType | undefined>(undefined);

const usuarioId = 1; // ← Este puedes adaptarlo si luego tienes login real

export function CartProvider({ children }: { children: ReactNode }) {
    const [isCartOpen, setIsCartOpen] = useState(false);
    const [cartItems, setCartItems] = useState<Game[]>([]);

    const toggleCart = () => setIsCartOpen((prev) => !prev);
    const openCart = () => setIsCartOpen(true);
    const closeCart = () => setIsCartOpen(false);

    const reloadCart = async () => {
        try {
            const res = await fetch(`http://localhost:5000/usuarios/carrito/${usuarioId}`);
            const data = await res.json();
            setCartItems(data);
        } catch (error) {
            console.error("Error al recargar el carrito:", error);
        }
    };



    const addToCart = async (game: Game) => {
        if (cartItems.some(item => item.id === game.id)) {
            alert("El juego ya está en el carrito");
            return;
        }

        try {
            const response = await fetch("http://localhost:5000/usuarios/agregar-a-carrito", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({
                    usuarioId,
                    juegoId: game.id
                })
            });

            const data = await response.json();

            if (!response.ok) {
                alert(data.error || "Error al agregar al carrito");
            } else {
                await reloadCart(); // actualizar después de agregar
            }
        } catch (error) {
            alert("No se pudo conectar con el servidor");
            console.error("Error al agregar al carrito:", error);
        }
    };
const removeFromCart = async (juegoId: number) => {
    try {
        const response = await fetch("http://localhost:5000/usuarios/eliminar-del-carrito", {
            method: "DELETE",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({
                usuarioId: 1,
                juegoId: juegoId,
            }),
        });

        const data = await response.json();

        if (!response.ok) {
            alert(data.error || "Error al eliminar del carrito");
        } else {
            await reloadCart();
        }
    } catch (error) {
        console.error("Error al eliminar del carrito:", error);
        alert("No se pudo conectar con el servidor");
    }
};




    useEffect(() => {
        reloadCart();
    }, []);

    return (
        <CartContext.Provider
            value={{
                isCartOpen,
                toggleCart,
                openCart,
                closeCart,
                cartItems,
                addToCart,
                removeFromCart,
                reloadCart
            }}
        >
            {children}
        </CartContext.Provider>
    );
}

export function useCart(): CartContextType {
    const context = useContext(CartContext);
    if (!context) throw new Error("useCart must be used within a CartProvider");
    return context;
}
