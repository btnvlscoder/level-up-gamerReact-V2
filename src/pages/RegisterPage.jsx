// Contenido de: src/pages/RegisterPage.jsx (Refactorizado con CSS Modules)

import React, { useState } from 'react';
import { useAuth } from '../context/AuthContext';
import { useNavigate } from 'react-router-dom';
import toast from 'react-hot-toast';

// 1. Importar los mismos estilos del módulo
import styles from './Auth.module.css';

export default function RegisterPage() {
  const [formData, setFormData] = useState({
    rut: '',
    nombre: '',
    apellidoPaterno: '',
    apellidoMaterno: '',
    email: '',
    password: '',
    confirmPassword: '',
  });
  const [error, setError] = useState('');
  
  const { register } = useAuth();
  const navigate = useNavigate();

  const handleChange = (e) => {
    const { id, value } = e.target;
    setFormData(prev => ({ ...prev, [id]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError(''); 

    try {
      const newUser = await register(formData);
      
      if (newUser.tieneDescuentoDuoc) {
        toast.success(`¡Bienvenido! Tienes un 10% de descuento por ser de Duoc UC.`);
      } else {
        toast.success(`¡Bienvenido! Registro exitoso.`);
      }
      
      navigate('/'); // Redirigir al inicio
    } catch (err) {
      setError(err.message);
      toast.error(err.message);
    }
  };

  return (
    // 2. Usar el objeto 'styles'
    <div className={styles.authContainer}>
      <h2 className="titulo-principal" style={{ margin: '0 0 2rem 0' }}>Crear Cuenta</h2>
      
      <form className={styles.authForm} onSubmit={handleSubmit}>
        
        {error && <div className={styles.authError}>{error}</div>}

        <div className={styles.formGroup}>
          <label htmlFor="rut">RUT (Ej: 12345678-9)</label>
          <input type="text" id="rut" value={formData.rut} onChange={handleChange} required />
        </div>
        <div className={styles.formGroup}>
          <label htmlFor="nombre">Nombre</label>
          <input type="text" id="nombre" value={formData.nombre} onChange={handleChange} required />
        </div>
        <div className={styles.formGroup}>
          <label htmlFor="apellidoPaterno">Apellido Paterno</label>
          <input type="text" id="apellidoPaterno" value={formData.apellidoPaterno} onChange={handleChange} required />
        </div>
        <div className={styles.formGroup}>
          <label htmlFor="apellidoMaterno">Apellido Materno</label>
          <input type="text" id="apellidoMaterno" value={formData.apellidoMaterno} onChange={handleChange} required />
        </div>
        <div className={styles.formGroup}>
          <label htmlFor="email">Correo Electrónico</label>
          <input type="email" id="email" value={formData.email} onChange={handleChange} required />
        </div>
        <div className={styles.formGroup}>
          <label htmlFor="password">Contraseña (mín. 6 caracteres)</label>
          <input type="password" id="password" value={formData.password} onChange={handleChange} required />
        </div>
        <div className={styles.formGroup}>
          <label htmlFor="confirmPassword">Confirmar Contraseña</label>
          <input type="password" id="confirmPassword" value={formData.confirmPassword} onChange={handleChange} required />
        </div>
        <button type="submit" className={styles.authButton}>Registrarse</button>
      </form>
      
      <div className={styles.authSwitchLink}>
        ¿Ya tienes cuenta? <a onClick={() => navigate('/login')} style={{cursor: 'pointer'}}>Inicia Sesión</a>
      </div>
    </div>
  );
}