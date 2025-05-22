import "./EditProfilePage.css";
import EditProfileIcon from "/EditProfileIcon.svg";

export default function EditProfilePage() {
    return (
        <div className="edit-profile-page">
            <div className="edit-profile-card">
                <img
                    src={EditProfileIcon}
                    alt="Edit Profile"
                    className="edit-profile-logo"
                />
                <h2 className="edit-profile-title">Editar mi perfil</h2>
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
        </div>
    );
}


