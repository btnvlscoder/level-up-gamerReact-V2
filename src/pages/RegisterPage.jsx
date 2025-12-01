import React, { useState } from 'react';

import { useAuth } from '../context/AuthContext';
import { useNavigate } from 'react-router-dom';
import toast from 'react-hot-toast';

import styles from './Auth.module.css';
import FormField from '../components/FormField';

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

  // Obtenemos la fn register del contexto de autenticación
  const { register } = useAuth();
  // Hook para navegar entre páginas
  const navigate = useNavigate();

  // fn que se ejecuta cada vez que el usuario escribe en un input
  const handleChange = (e) => {
    // Obtenemos el id del input y el valor escrito
    const { id, value } = e.target;
    
    // Actualizamos el estado del formulario manteniendo los otros valores
    setFormData(prev => ({ ...prev, [id]: value }));
  };

  // fn que se ejecuta cuando el usuario envía el formulario
  const handleSubmit = async (e) => {
    // Prevenimos que el formulario recargue la página
    e.preventDefault();
    // Limpiamos cualquier error anterior
    setError('');

    try {
      // Intentamos registrar al usuario llamando a la fn del contexto
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
        <FormField
          id="rut"
          label="Rut (ej: 12345678-9)"
          type="text"
          value={formData.rut}
          onChange={handleChange}
          required
          containerClass={styles.formGroup}
        />
        <FormField
          id="nombre"
          label="Nombre"
          type="text"
          value={formData.nombre}
          onChange={handleChange}
          required
          containerClass={styles.formGroup}
        />
        <FormField
          id="apellidoPaterno"
          label="Apellido paterno"
          type="text"
          value={formData.apellidoPaterno}
          onChange={handleChange}
          required
          containerClass={styles.formGroup}
        />
        <FormField
          id="apellidoMaterno"
          label="Apellido materno"
          type="text"
          value={formData.apellidoMaterno}
          onChange={handleChange}
          required
          containerClass={styles.formGroup}
        />
        <FormField
          id="email"
          label="Correo electronico"
          type="email"
          value={formData.email}
          onChange={handleChange}
          required
          containerClass={styles.formGroup}
        />
        <FormField
          id="password"
          label="Contrasena (min. 6 caracteres)"
          type="password"
          value={formData.password}
          onChange={handleChange}
          required
          containerClass={styles.formGroup}
        />
        <FormField
          id="confirmPassword"
          label="Confirmar contrasena"
          type="password"
          value={formData.confirmPassword}
          onChange={handleChange}
          required
          containerClass={styles.formGroup}
        />

        {/* btn para enviar el formulario */}
        <button type="submit" className={styles.authButton}>registrarse</button>
      </form>

      {/* Enlace para ir a la página de login si ya tiene cuenta */}
      <div className={styles.authSwitchLink}>
        ¿Ya tienes cuenta? <a onClick={() => navigate('/login')} style={{ cursor: 'pointer' }}>Inicia sesion</a>
      </div>
    </div>
  );
}
