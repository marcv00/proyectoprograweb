import { BrowserRouter, Routes, Route } from "react-router-dom";
import UserLayout from "../layouts/UserLayout";
import AdminLayout from "../layouts/AdminLayout";

import HomePage from "../pages/home/HomePage";
import LoginPage from "../pages/auth/LoginPage";
import RegisterPage from "../pages/auth/RegisterPage";

import EditProfilePage from "../pages/config/EditProfilePage";

import ConfirmationPage from "../pages/auth/ConfirmationPage";
import ForgotPasswordPage from "../pages/auth/ForgotPasswordPage";

import ExplorePage from "../pages/explore/ExplorePage";
import BestSellingPage from "../pages/best/BestSellingPage";
import BestReviewedPage from "../pages/best/BestReviewedPage";
import GameDetailPage from "../pages/game/GameDetailPage";

import CheckoutPage from "../pages/purchase/CheckoutPage";
import PurchaseConfirmationPage from "../pages/purchase/PurchaseConfirmationPage";

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
                    <Route path="/explorar" element={<ExplorePage />} />
                    <Route path="/noticias" element={<ExplorePage />} />
                    <Route
                        path="/mejor-vendidos"
                        element={<BestSellingPage />}
                    />
                    <Route
                        path="/mejor-valorados"
                        element={<BestReviewedPage />}
                    />
                    <Route path="/game/:id" element={<GameDetailPage />} />
                    <Route path="/checkout" element={<CheckoutPage />} />
                    <Route
                        path="/purchase-confirmation"
                        element={<PurchaseConfirmationPage />}
                    />
                    <Route
                        path="/configuracion"
                        element={<EditProfilePage />}
                    />
                </Route>

                {/* Rutas de autenticación sin layout */}
                <Route path="/login" element={<LoginPage />} />
                <Route path="/register" element={<RegisterPage />} />
                <Route path="/confirmation" element={<ConfirmationPage />} />
                <Route
                    path="/forgot-password"
                    element={<ForgotPasswordPage />}
                />

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
