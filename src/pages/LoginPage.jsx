import React, { useState } from 'react';

import { useAuth } from '../context/AuthContext';
import { useNavigate } from 'react-router-dom';
import toast from 'react-hot-toast';

import styles from './Auth.module.css';
import FormField from '../components/FormField';

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
        <FormField
          id="email"
          label="Correo electronico"
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
          containerClass={styles.formGroup}
        />

        {/* Campo para la contraseña */}
        <FormField
          id="password"
          label="Contrasena"
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
          containerClass={styles.formGroup}
        />

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
