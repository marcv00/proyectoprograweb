import { HashRouter, Routes, Route } from "react-router-dom";
import UserLayout from "../layouts/UserLayout";
import AdminLayout from "../layouts/AdminLayout";

import HomePage from "../pages/home/HomePage";
import LoginPage from "../pages/auth/LoginPage";
import RegisterPage from "../pages/auth/RegisterPage";

import EditProfilePage from "../pages/config/EditProfilePage";

import ConfirmationPage from "../pages/auth/ConfirmationPage";
import ForgotPasswordPage from "../pages/auth/ForgotPasswordPage";
import SetNewPasswordPage from "../pages/auth/SetNewPasswordPage";
import MisJuegosPage from "../pages/game/MisJuegosPage";

import ExplorePage from "../pages/explore/ExplorePage";
import BestSellingPage from "../pages/best/BestSellingPage";
import BestReviewedPage from "../pages/best/BestReviewedPage";
import GameDetailPage from "../pages/game/GameDetailPage";
import NewsPage from "../pages/news/NewsPage";
import NewsSinglePage from "../pages/news/NewsSinglePage";

import CheckoutPage from "../pages/purchase/CheckoutPage";
import PurchaseConfirmationPage from "../pages/purchase/PurchaseConfirmationPage";

import AdminUsers from "../pages/admin/AdminUsers";
import AdminGames from "../pages/admin/AdminGames";
import AdminNews from "../pages/admin/AdminNews";
import AdminStats from "../pages/admin/AdminStats";
import AgregarResenaPage from "../pages/game/AgregarResenaPage";

import NotFoundPage from "../pages/NotFoundPage";

export function AppRouter() {
    return (
        <HashRouter>
            <Routes>
                {/* Layout para usuarios comunes */}
                <Route element={<UserLayout />}>
                    <Route path="/" element={<HomePage />} />
                    <Route path="/explorar" element={<ExplorePage />} />
                    <Route path="/noticias" element={<NewsPage />} />
                    <Route
                        path="/noticias/:slug"
                        element={<NewsSinglePage />}
                    />
                    <Route
                        path="/mejor-vendidos"
                        element={<BestSellingPage />}
                    />
                    <Route
                        path="/mejor-valorados"
                        element={<BestReviewedPage />}
                    />
                    <Route path="/mis-juegos" element={<MisJuegosPage />} />
                    <Route path="/game/:slug" element={<GameDetailPage />} />
                    <Route path="/pago" element={<CheckoutPage />} />
                    <Route path="/checkout" element={<PurchaseConfirmationPage />} />
                    <Route path="/game/:slug/agregar-resena" element={<AgregarResenaPage />} />
                    <Route
                        path="/config/editar-perfil"
                        element={<EditProfilePage />}
                    />
                </Route>

                {/* Rutas sin layout */}
                <Route path="/login" element={<LoginPage />} />
                <Route path="/register" element={<RegisterPage />} />
                <Route path="/confirmation" element={<ConfirmationPage />} />
                <Route
                    path="/forgot-password"
                    element={<ForgotPasswordPage />}
                />
                <Route
                    path="/set-new-password"
                    element={<SetNewPasswordPage />}
                />
                
                <Route path="*" element={<NotFoundPage />} />

                {/* Layout para administrador */}
                <Route path="/admin" element={<AdminLayout />}>
                    <Route path="users" element={<AdminUsers />} />
                    <Route path="games" element={<AdminGames />} />
                    <Route path="news" element={<AdminNews />} />
                    <Route path="dashboard" element={<AdminStats />} />
                </Route>
            </Routes>
        </HashRouter>
    );
}
