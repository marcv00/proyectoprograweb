// src/context/CartContext.tsx
import { createContext, useContext, useState, useEffect } from "react";
import type { ReactNode } from "react";
import { useAuth } from "./AuthContext";

interface Game {
    id: number;
    titulo: string;
    precio: number;
    porcentajeOferta: number | null;
    fotos: { url: string }[];
}

interface CartContextType {
    isCartOpen: boolean;
    toggleCart: () => void;
    openCart: () => void;
    closeCart: () => void;
    cartItems: Game[];
    addToCart: (game: Game) => Promise<void>;
    removeFromCart: (juegoId: number) => Promise<void>;
    reloadCart: () => Promise<void>;
}

const CartContext = createContext<CartContextType | undefined>(undefined);

export function CartProvider({ children }: { children: ReactNode }) {
    const { token } = useAuth(); // 👈 traemos el token del contexto
    console.log(token);
    const [isCartOpen, setIsCartOpen] = useState(false);
    const [cartItems, setCartItems] = useState<Game[]>([]);
    const BACKEND_URL = import.meta.env.VITE_BACKEND_URL;

    const getAuthHeader = (): Record<string, string> => ({
        ...(token ? { Authorization: `Bearer ${token}` } : {}),
        "Content-Type": "application/json",
    });

    const toggleCart = () => setIsCartOpen((prev) => !prev);
    const openCart = () => setIsCartOpen(true);
    const closeCart = () => setIsCartOpen(false);

    const reloadCart = async () => {
        if (!token) return;
        try {
            const res = await fetch(`${BACKEND_URL}/usuarios/carrito`, {
                headers: getAuthHeader(),
            });

            if (!res.ok) throw new Error("Fallo la carga del carrito");

            const data = await res.json();
            setCartItems(data);
        } catch (error) {
            console.error("Error al recargar el carrito:", error);
        }
    };

    const addToCart = async (game: Game) => {
        if (!token) {
            alert("Debes iniciar sesión para agregar al carrito");
            return;
        }

        if (cartItems.some((item) => item.id === game.id)) {
            alert("El juego ya está en el carrito");
            return;
        }

        try {
            const response = await fetch(
                `${BACKEND_URL}/usuarios/agregar-a-carrito`,
                {
                    method: "POST",
                    headers: getAuthHeader(),
                    body: JSON.stringify({ juegoId: game.id }),
                }
            );

            const data = await response.json();

            if (!response.ok) {
                alert(data.error || "Error al agregar al carrito");
            } else {
                await reloadCart();
            }
        } catch (error) {
            alert("No se pudo conectar con el servidor");
            console.error("Error al agregar al carrito:", error);
        }
    };

    const removeFromCart = async (juegoId: number) => {
        if (!token) return;

        try {
            const response = await fetch(
                `${BACKEND_URL}/usuarios/eliminar-del-carrito`,
                {
                    method: "DELETE",
                    headers: getAuthHeader(),
                    body: JSON.stringify({ juegoId }),
                }
            );

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
        if (token) reloadCart(); // 👈 se recarga si hay token válido
    }, [token]);

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
                reloadCart,
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
