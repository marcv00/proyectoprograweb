import { BrowserRouter, Routes, Route } from "react-router-dom";
import UserLayout from "../layouts/UserLayout";
import AdminLayout from "../layouts/AdminLayout";


import HomePage from "../pages/home/HomePage";
import CatalogPage from "../pages/catalog/CatalogPage";
import GameDetailPage from "../pages/game/GameDetailPage";
import LoginPage from "../pages/auth/LoginPage";
import RegisterPage from "../pages/auth/RegisterPage";
import CartPage from "../pages/cart/CartPage";


import AdminUsers from "../pages/admin/AdminUsers";
import AdminGames from "../pages/admin/AdminGames";
import AdminNews from "../pages/admin/AdminNews";
import AdminStats from "../pages/admin/AdminStats";


export function AppRouter() {
    return (
        <BrowserRouter>
            <Routes>
                {/* Layout para usuarios comunes */}
                <Route element={<UserLayout />}>
                    <Route path="/" element={<HomePage />} />
                    <Route path="/catalog" element={<CatalogPage />} />
                    <Route path="/explorar" element={<CatalogPage />} />
                    <Route path="/noticias" element={<CatalogPage />} />
                    <Route path="/mejor-vendidos" element={<CatalogPage />} />
                    <Route path="/mejor-valorados" element={<CatalogPage />} />
                    <Route path="/game/:id" element={<GameDetailPage />} />
                    <Route path="/cart" element={<CartPage />} />
                </Route>


                {/* Rutas de autenticación sin layout */}
                <Route path="/login" element={<LoginPage />} />
                <Route path="/register" element={<RegisterPage />} />


                {/* Layout para administrador */}
                <Route path="/admin" element={<AdminLayout />}>
                    <Route path="users" element={<AdminUsers />} />
                    <Route path="games" element={<AdminGames />} />
                    <Route path="news" element={<AdminNews />} />
                    <Route path="stats" element={<AdminStats />} />
                </Route>
            </Routes>
        </BrowserRouter>
    );
}
