import "./EditProfilePage.css";
import EditProfileIcon from "/EditProfileIcon.svg";

export default function EditProfilePage() {
    return (
        <div className="edit-profile-container">
            <img
                src={EditProfileIcon}
                alt="EditProfileIcon"
                className="edit-profile-icon"
            />
            <h2>Editar mi perfil</h2>
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

