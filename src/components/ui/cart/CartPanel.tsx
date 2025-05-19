// src//components/CartPanel/CartPanel.tsx
import { useCart } from "../../../context/CartContext";
import "./CartPanel.css";
import SHOPCARTICON from "/SHOPCARTICON.svg"
export default function CartPanel() {
    const { isCartOpen, closeCart } = useCart();

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
                {[
                    {
                        title: "Minecraft",
                        price: "26.95 PEN",
                        img: "https://www.infobae.com/resizer/v2/EXPB4AGS2ZA7VKTZKFMVELDHQU.jpg?auth=7b5dfca07a45f13226dc58f5c8e0b1d431b42d02dd699b6358a79aeaac84cf71&smart=true&width=1200&height=675&quality=85"
                    },
                    {
                        title: "Elden Ring",
                        price: "41.99 PEN",
                        img: "https://steamforged.com/cdn/shop/collections/ER-collection-2000x1125-780428.png?v=1743077065"
                    },
                    {
                        title: "God of War (2018)",
                        price: "49.99 PEN",
                        img: "https://image.api.playstation.com/vulcan/img/rnd/202010/2217/LsaRVLF2IU2L1FNtu9d3MKLq.jpg"
                    }
                ].map((item, index) => (
                    <div key={index} className="cartItem">
                        <img src={item.img} alt={item.title} />
                        <div className="cartInfo">
                            <h4>{item.title}</h4>
                            <p>{item.price}</p>
                        </div>
                    </div>
                ))}
            </div>

            <div className="cartTotal">
                <span>Total del carrito:</span>
                <strong>118.93 PEN</strong>
            </div>

            <button className="checkoutBtn">Ir a Checkout</button>
        </div>
    );
}

                // Requerimento [11] , Requerimento [12]
                // Ver el diseño al presionar boton carro en barra de navegacion
                // http://localhost:5173/proyectoprograweb/#/