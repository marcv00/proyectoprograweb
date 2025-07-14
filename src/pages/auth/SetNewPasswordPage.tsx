import React, { useState } from 'react'

const SetNewPasswordPage = () => {
  const [correo, setCorreo] = useState('')
  const [nuevaContrasena, setNuevaContrasena] = useState('')
  const [mensaje, setMensaje] = useState('')
  const [error, setError] = useState('')

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()

    try {
      const response = await fetch('http://localhost:5000/usuarios/reestablecer', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ correo, nuevaContrasena }),
      })

      const data = await response.json()

      if (response.ok) {
        setMensaje(data.mensaje)
        setError('')
      } else {
        setMensaje('')
        setError(data.error || 'Error al actualizar la contraseña')
      }
    } catch (err) {
      setMensaje('')
      setError('No se pudo conectar con el servidor')
    }
  }

  return (
    <div style={{ maxWidth: '400px', margin: 'auto' }}>
      <h2>Restablecer contraseña</h2>
      <form onSubmit={handleSubmit}>
        <div>
          <label>Correo:</label>
          <input
            type="email"
            value={correo}
            onChange={(e) => setCorreo(e.target.value)}
            required
          />
        </div>
        <div>
          <label>Nueva contraseña:</label>
          <input
            type="password"
            value={nuevaContrasena}
            onChange={(e) => setNuevaContrasena(e.target.value)}
            required
          />
        </div>
        <button type="submit">Actualizar contraseña</button>
      </form>

      {mensaje && <p style={{ color: 'green' }}>{mensaje}</p>}
      {error && <p style={{ color: 'red' }}>{error}</p>}
    </div>
  )
}

export default SetNewPasswordPage


// Nota:
// - Para ver como va quedando tu diseño, esta es la ruta:
//   http://localhost:5173/proyectoprograweb/#/set-new-password
// - Cualquier duda, no dudes en preguntar, diciendo que requerimento te toco.
