import "./EditProfilePage.css";

export default function EditProfilePage() {
    return (
        <div className="edit-profile-container">
            <h2>Editar Perfil</h2>
            <form className="edit-profile-form">
                <label>
                    Nombre de usuario:
                    <input type="text" name="username" placeholder="Ingresa tu nombre" />
                </label>
                <label>
                    Correo electrónico:
                    <input type="email" name="email" placeholder="Ingresa tu correo" />
                </label>
                <label>
                    Nueva contraseña:
                    <input type="password" name="password" placeholder="Nueva contraseña" />
                </label>
                <label>
                    Confirmar contraseña:
                    <input type="password" name="confirmPassword" placeholder="Confirma contraseña" />
                </label>
                <button type="submit">Guardar cambios</button>
            </form>
        </div>
    );
}

