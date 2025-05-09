// pages/auth/RegisterPage.tsx
export default function RegisterPage() {
    return (
        <div>
            <h1>Registrarse</h1>
            <form>
                <input type="text" placeholder="Nombre" required />
                <input type="email" placeholder="Correo electrónico" required />
                <input type="password" placeholder="Contraseña" required />
                <button type="submit">Crear cuenta</button>
            </form>
        </div>
    );
}
