import React, { useState } from 'react';

// Importamos el hook useAuth para acceder al contexto de autenticación
import { useAuth } from '../context/AuthContext';
// Importamos useNavigate para redirigir al usuario después del registro
import { useNavigate } from 'react-router-dom';
// Importamos toast para mostrar notificaciones
import toast from 'react-hot-toast';

// Importamos los estilos específicos de esta página
import styles from './Auth.module.css';

export default function RegisterPage() {
  // Estado para guardar todos los datos del formulario
  const [formData, setFormData] = useState({
    rut: '',
    nombre: '',
    apellidoPaterno: '',
    apellidoMaterno: '',
    email: '',
    password: '',
    confirmPassword: '',
  });

  // Estado para mostrar errores si el registro falla
  const [error, setError] = useState('');

  // Obtenemos la función register del contexto de autenticación
  const { register } = useAuth();
  // Hook para navegar entre páginas
  const navigate = useNavigate();

  // Función que se ejecuta cada vez que el usuario escribe en un input
  const handleChange = (e) => {
    // Obtenemos el id del input y el valor escrito
    const { id, value } = e.target;
    
    // Actualizamos el estado del formulario manteniendo los otros valores
    setFormData(prev => ({ ...prev, [id]: value }));
  };

  // Función que se ejecuta cuando el usuario envía el formulario
  const handleSubmit = async (e) => {
    // Prevenimos que el formulario recargue la página
    e.preventDefault();
    // Limpiamos cualquier error anterior
    setError('');

    try {
      // Intentamos registrar al usuario llamando a la función del contexto
      const newUser = await register(formData);

      // Mostramos mensaje de éxito diferente según si tiene descuento Duoc
      if (newUser.tieneDescuentoDuoc) {
        toast.success('bienvenido! tienes un 10% de descuento por ser de duoc uc.');
      } else {
        toast.success('bienvenido! registro exitoso.');
      }

      // Redirigimos al usuario a la página de inicio
      navigate('/');
    } catch (err) {
      // Si hay error, lo mostramos en el formulario y con una notificación
      setError(err.message);
      toast.error(err.message);
    }
  };

  return (
    // Contenedor principal del formulario
    <div className={styles.authContainer}>
      {/* Título de la página */}
      <h2 className="titulo-principal" style={{ margin: '0 0 2rem 0' }}>crear cuenta</h2>

      {/* Formulario de registro */}
      <form className={styles.authForm} onSubmit={handleSubmit}>
        
        {/* Mostramos error si existe */}
        {error && <div className={styles.authError}>{error}</div>}

        {/* Campos del formulario */}
        <div className={styles.formGroup}>
          <label htmlFor="rut">rut (ej: 12345678-9)</label>
          <input type="text" id="rut" value={formData.rut} onChange={handleChange} required />
        </div>
        <div className={styles.formGroup}>
          <label htmlFor="nombre">nombre</label>
          <input type="text" id="nombre" value={formData.nombre} onChange={handleChange} required />
        </div>
        <div className={styles.formGroup}>
          <label htmlFor="apellidoPaterno">apellido paterno</label>
          <input type="text" id="apellidoPaterno" value={formData.apellidoPaterno} onChange={handleChange} required />
        </div>
        <div className={styles.formGroup}>
          <label htmlFor="apellidoMaterno">apellido materno</label>
          <input type="text" id="apellidoMaterno" value={formData.apellidoMaterno} onChange={handleChange} required />
        </div>
        <div className={styles.formGroup}>
          <label htmlFor="email">correo electronico</label>
          <input type="email" id="email" value={formData.email} onChange={handleChange} required />
        </div>
        <div className={styles.formGroup}>
          <label htmlFor="password">contrasena (min. 6 caracteres)</label>
          <input type="password" id="password" value={formData.password} onChange={handleChange} required />
        </div>
        <div className={styles.formGroup}>
          <label htmlFor="confirmPassword">confirmar contrasena</label>
          <input type="password" id="confirmPassword" value={formData.confirmPassword} onChange={handleChange} required />
        </div>

        {/* Botón para enviar el formulario */}
        <button type="submit" className={styles.authButton}>registrarse</button>
      </form>

      {/* Enlace para ir a la página de login si ya tiene cuenta */}
      <div className={styles.authSwitchLink}>
        ¿ya tienes cuenta? <a onClick={() => navigate('/login')} style={{ cursor: 'pointer' }}>inicia sesion</a>
      </div>
    </div>
  );
}