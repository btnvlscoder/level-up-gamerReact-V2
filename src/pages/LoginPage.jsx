import React, { useState } from 'react';

// Importamos el contexto de autenticación para usar la función de login
import { useAuth } from '../context/AuthContext';
// Importamos useNavigate para redirigir después del login
import { useNavigate } from 'react-router-dom';
// Importamos toast para mostrar notificaciones
import toast from 'react-hot-toast';

// Importamos los estilos específicos de esta página
import styles from './Auth.module.css';

export default function LoginPage() {
  // Estados para guardar el email y contraseña del formulario
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  // Estado para mostrar errores si el login falla
  const [error, setError] = useState('');

  // Obtenemos la función login del contexto de autenticación
  const { login } = useAuth();
  // Hook para navegar entre páginas
  const navigate = useNavigate();

  // Función que se ejecuta cuando el usuario envía el formulario
  const handleSubmit = async (e) => {
    // Prevenimos que el formulario recargue la página
    e.preventDefault();
    // Limpiamos cualquier error anterior
    setError('');

    try {
      // Intentamos hacer login con el email y contraseña
      await login(email, password);
      // Si es exitoso, mostramos mensaje de bienvenida
      toast.success('¡Bienvenido de vuelta!');
      // Redirigimos al usuario a la página de inicio
      navigate('/');
    } catch (err) {
      // Si hay error, lo mostramos en el formulario y con notificación
      setError(err.message);
      toast.error(err.message);
    }
  };

  return (
    // Contenedor principal del formulario de login
    <div className={styles.authContainer}>
      {/* Título de la página */}
      <h2 className="titulo-principal" style={{ margin: '0 0 2rem 0' }}>Inicia sesion</h2>

      {/* Formulario de inicio de sesión */}
      <form className={styles.authForm} onSubmit={handleSubmit}>

        {/* Mostramos error si existe */}
        {error && <div className={styles.authError}>{error}</div>}

        {/* Campo para el email */}
        <div className={styles.formGroup}>
          <label htmlFor="email">Correo electronico</label>
          <input
            type="email"
            id="email"
            value={email} // Valor controlado por el estado
            onChange={(e) => setEmail(e.target.value)} // Actualizamos el estado cuando escribe
            required
          />
        </div>

        {/* Campo para la contraseña */}
        <div className={styles.formGroup}>
          <label htmlFor="password">Contrasena</label>
          <input
            type="password"
            id="password"
            value={password} // Valor controlado por el estado
            onChange={(e) => setPassword(e.target.value)} // Actualizamos el estado cuando escribe
            required
          />
        </div>

        {/* Botón para enviar el formulario */}
        <button type="submit" className={styles.authButton}>Entrar</button>
      </form>

      {/* Enlace para ir a la página de registro si no tiene cuenta */}
      <div className={styles.authSwitchLink}>
        ¿No tienes cuenta? <a onClick={() => navigate('/register')} style={{ cursor: 'pointer' }}>Registrate</a>
      </div>
    </div>
  );
}