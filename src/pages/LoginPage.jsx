import React, { useState } from 'react';
// hook para acceder al contexto de autenticacion (AuthContext.jsx)
import { useAuth } from '../context/AuthContext';
// hook para navegar
import { useNavigate } from 'react-router-dom';
import toast from 'react-hot-toast';

// importamos los estilos compartidos (Auth.module.css)
import styles from './Auth.module.css';

/**
 * pagina de inicio de sesion.
 * renderiza un formulario para que los usuarios ingresen.
 */
export default function LoginPage() {
  // 'email' y 'password' son estados locales para los campos del formulario
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  // 'error' almacena el mensaje si el login falla (ej. "contrasena incorrecta")
  const [error, setError] = useState('');
  
  // extraemos la funcion 'login' del contexto
  const { login } = useAuth();
  const navigate = useNavigate();

  /**
   * manejador para el envio (submit) del formulario de login.
   * @param {object} e - el evento del formulario
   */
  const handleSubmit = async (e) => {
    e.preventDefault();
    setError(''); // limpia errores anteriores

    try {
      // intentamos iniciar sesion llamando a la funcion 'login' del contexto
      await login(email, password);
      toast.success('¡Bienvenido de vuelta!');
      navigate('/'); // redirigimos al inicio si es exitoso
    } catch (err) {
      // si 'login' (en AuthContext.jsx) falla, capturamos el error
      setError(err.message);
      toast.error(err.message);
    }
  };

  return (
    // usamos la clase '.authcontainer' del modulo importado
    <div className={styles.authContainer}>
      {/* '.titulo-principal' es una clase global de style.css */}
      <h2 className="titulo-principal" style={{ margin: '0 0 2rem 0' }}>Inicia sesion</h2>
      
      <form className={styles.authForm} onSubmit={handleSubmit}>

        {/* muestra el error si existe */}
        {error && <div className={styles.authError}>{error}</div>}

        {/* campo de correo electronico */}
        <div className={styles.formGroup}>
          <label htmlFor="email">Correo electronico</label>
          <input
            type="email"
            id="email"
            value={email} // controlado por el estado 'email'
            onChange={(e) => setEmail(e.target.value)} // actualiza el estado 'email'
            required
          />
        </div>
        
        {/* campo de contrasena */}
        <div className={styles.formGroup}>
          <label htmlFor="password">Contrasena</label>
          <input
            type="password"
            id="password"
            value={password} // controlado por el estado 'password'
            onChange={(e) => setPassword(e.target.value)} // actualiza el estado 'password'
            required
          />
        </div>
        
        <button type="submit" className={styles.authButton}>Entrar</button>
      </form>
      
      {/* enlace para redirigir a la pagina de registro */}
      <div className={styles.authSwitchLink}>
        ¿No tienes cuenta? <a onClick={() => navigate('/register')} style={{cursor: 'pointer'}}>Registrate</a>
      </div>
    </div>
  );
}