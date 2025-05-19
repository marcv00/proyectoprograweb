
        // Requerimento [3]
        // Nota:
        // - Faltaria añadir estilos en ConfirmationPage.css (ya esta importado)
        // - Para ver como va quedando tu diseño, esta es la ruta:
        //   http://localhost:5173/proyectoprograweb/#/confirmation
        // - Cualquier duda, no dudes en preguntar, diciendo que requerimento te toco.


        
import { Link } from "react-router-dom";
        
import "./ConfirmationPage.css";

export default function ConfirmationPage() {
  return (
    <div className="confirmation-container">
      <h1>Registro exitoso</h1>
      <p>
        Gracias por registrarte. Por favor, revisa tu correo electrónico para
        activar tu cuenta y poder ingresar al sistema.
      </p>
      <p>Si no ves el correo, revisa la carpeta de spam o solicita un nuevo enlace de activación.</p>
{/* 
      especificar la ruta  */}
      <Link to={"/"} className = "link"  > Volver a página principal  </Link>

    </div>
  );
}
