// Contenido de: src/pages/LoginPage.jsx (Refactorizado con CSS Modules)

import React, { useState } from 'react';
import { useAuth } from '../context/AuthContext';
import { useNavigate } from 'react-router-dom';
import toast from 'react-hot-toast';

// 1. Importar los estilos del módulo
import styles from './Auth.module.css';

export default function LoginPage() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  
  const { login } = useAuth();
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');

    try {
      await login(email, password);
      toast.success('¡Bienvenido de vuelta!');
      navigate('/'); 
    } catch (err) {
      setError(err.message);
      toast.error(err.message);
    }
  };

  return (
    // 2. Usar el objeto 'styles'
    <div className={styles.authContainer}>
      {/* 3. El título principal sigue siendo global, como acordamos */ }
      <h2 className="titulo-principal" style={{ margin: '0 0 2rem 0' }}>Iniciar Sesión</h2>
      
      <form className={styles.authForm} onSubmit={handleSubmit}>

        {error && <div className={styles.authError}>{error}</div>}

        <div className={styles.formGroup}>
          <label htmlFor="email">Correo Electrónico</label>
          <input
            type="email"
            id="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
        </div>
        
        <div className={styles.formGroup}>
          <label htmlFor="password">Contraseña</label>
          <input
            type="password"
            id="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
        </div>
        
        <button type="submit" className={styles.authButton}>Entrar</button>
      </form>
      
      <div className={styles.authSwitchLink}>
        ¿No tienes cuenta? <a onClick={() => navigate('/register')} style={{cursor: 'pointer'}}>Regístrate</a>
      </div>
    </div>
  );
}