// src//components/CartPanel/CartPanel.tsx
import { useState } from "react";
import { useCart } from "../../../context/CartContext";
import "./CartPanel.css";
import SHOPCARTICON from "/SHOPCARTICON.svg";

export default function CartPanel() {
    const { isCartOpen, closeCart } = useCart();
    const [cartItems, setCartItems] = useState<any[]>([]);

    const allGames = [
        {
            title: "Minecraft",
            price: 26.95,
            img: "https://www.infobae.com/resizer/v2/EXPB4AGS2ZA7VKTZKFMVELDHQU.jpg?auth=7b5dfca07a45f13226dc58f5c8e0b1d431b42d02dd699b6358a79aeaac84cf71&smart=true&width=1200&height=675&quality=85"
        },
        {
            title: "Elden Ring",
            price: 41.99,
            img: "https://steamforged.com/cdn/shop/collections/ER-collection-2000x1125-780428.png?v=1743077065"
        },
        {
            title: "God of War (2018)",
            price: 49.99,
            img: "https://image.api.playstation.com/vulcan/img/rnd/202010/2217/LsaRVLF2IU2L1FNtu9d3MKLq.jpg"
        },
        {
            title: "Outlast",
            price: 29.99,
            img: "https://cdn.akamai.steamstatic.com/steam/apps/238320/header.jpg"
        },
        {
            title: "Counter-Strike: Global Offensive",
            price: 50.99,
            img: "https://cdn.cloudflare.steamstatic.com/steam/apps/730/header.jpg"
        },
        {
            title: "Left 4 Dead",
            price: 69.99,
            img: "https://cdn.akamai.steamstatic.com/steam/apps/500/header.jpg"
        },
        {
            title: "GTA V",
            price: 19.99,
            img: "https://cdn.akamai.steamstatic.com/steam/apps/271590/header.jpg"
        },
        {
            title: "Counter-Strike: Source",
            price: 9.99,
            img: "https://cdn.akamai.steamstatic.com/steam/apps/240/header.jpg"
        },
        {
            title: "PES 2025",
            price: 59.99,
            img: "https://cdn.cloudflare.steamstatic.com/steam/apps/1665460/header.jpg"
        },
        {
            title: "Resident Evil",
            price: 46.99,
            img: "https://cdn.akamai.steamstatic.com/steam/apps/304240/header.jpg"
        },
            {

            title: "Call of Duty: Modern Warfare II",
            price: 59.99,
            img: "https://cdn.cloudflare.steamstatic.com/steam/apps/1938090/header.jpg"

        },
         {

            title: "DiRT Rally 2.0",
            price: 39.99,
            img: "https://cdn.akamai.steamstatic.com/steam/apps/690790/header.jpg"
            
        },

         {

            title: "Batman: Arkham Knight",
            price: 29.99,
            img: "https://cdn.akamai.steamstatic.com/steam/apps/208650/header.jpg"
            
        },

         {

            title: "Rise of the Tomb Raider",
            price: 19.99,
            img:"https://cdn.akamai.steamstatic.com/steam/apps/391220/header.jpg"
        }




        
    ];

    const handleAdd = (game: any) => {
        setCartItems(prev => [...prev, game]);
    };

    const handleRemove = (index: number) => {
        const updated = [...cartItems];
        updated.splice(index, 1);
        setCartItems(updated);
    };

    const getTotal = () => {
        return cartItems.reduce((acc, item) => acc + item.price, 0);
    };

    const handleCheckout = () => {
        alert("¡Gracias por tu compra!");
        setCartItems([]);
        closeCart();
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
                <button onClick={closeCart} className="closeBtn">X</button>
            </div>

            <div className="cartItems">
                {allGames.map((item, index) => (
                    <div key={index} className="cartItem">
                        <img src={item.img} alt={item.title} />
                        <div className="cartInfo">
                            <h4>{item.title}</h4>
                            <p>{item.price.toFixed(2)} PEN</p>
                            <button onClick={() => handleAdd(item)}>Agregar</button>
                        </div>
                    </div>
                ))}

                <hr />

                {cartItems.length > 0 && (
                    <>
                        <h3 style={{ marginBottom: "10px" }}>Juegos seleccionados:</h3>
                        {cartItems.map((item, index) => (
                            <div key={index} className="cartItem">
                                <img src={item.img} alt={item.title} />
                                <div className="cartInfo">
                                    <h4>{item.title}</h4>
                                    <p>{item.price.toFixed(2)} PEN</p>
                                    <button onClick={() => handleRemove(index)} className="removeBtn">Eliminar</button>
                                </div>
                            </div>
                        ))}
                    </>
                )}
            </div>

            <div className="cartTotal">
                <span>Total del carrito:</span>
                <strong>{getTotal().toFixed(2)} PEN</strong>
            </div>

            <button className="checkoutBtn" onClick={handleCheckout} disabled={cartItems.length === 0}>
                Ir a Checkout
            </button>
        </div>
    );
}
