import React, { useState } from 'react';
// 'useauth' es un hook personalizado que nos da acceso al contexto de autenticacion (authContext.jsx)
import { useAuth } from '../context/AuthContext';
// 'usenavigate' es un hook de react-router para redirigir al usuario programaticamente
import { useNavigate } from 'react-router-dom';
// 'toast' es para mostrar notificaciones emergentes
import toast from 'react-hot-toast';

// importamos los estilos modulares. 'auth.module.css' se comparte con loginPage.jsx
import styles from './Auth.module.css';

export default function RegisterPage() {
  // 'formdata' es un estado que almacena todos los campos del formulario de registro
  const [formData, setFormData] = useState({
    rut: '',
    nombre: '',
    apellidoPaterno: '',
    apellidoMaterno: '',
    email: '',
    password: '',
    confirmPassword: '',
  });
  // 'error' almacena el mensaje de error si el registro falla (ej. "email ya existe")
  const [error, setError] = useState('');
  
  // extraemos la funcion 'register' de nuestro contexto de autenticacion
  const { register } = useAuth();
  // inicializamos el hook 'navigate' para poder redirigir
  const navigate = useNavigate();

  /**
   * manejador generico para actualizar el estado 'formdata'.
   * se activa cada vez que el usuario escribe en un input.
   * @param {object} e - el evento del input
   */
  const handleChange = (e) => {
    // 'id' (ej. "rut") y 'value' (ej. "12345678-9") vienen del input
    const { id, value } = e.target;
    // actualizamos el estado. 'prev' es el estado anterior.
    // usamos el 'id' del input como la clave para actualizar el objeto 'formdata'.
    setFormData(prev => ({ ...prev, [id]: value }));
  };

  /**
   * manejador para el envio (submit) del formulario.
   * se activa al presionar el boton de "registrarse".
   * @param {object} e - el evento del formulario
   */
  const handleSubmit = async (e) => {
    // previene que el navegador recargue la pagina (comportamiento por defecto del form)
    e.preventDefault();
    // limpia cualquier error de un intento anterior
    setError(''); 

    try {
      // llamamos a la funcion 'register' del contexto y le pasamos los datos del formulario.
      // 'await' pausa la ejecucion hasta que 'register' termine (es asincrona).
      const newUser = await register(formData);
      
      // si el registro es exitoso, mostramos un toast de bienvenida.
      // verificamos si el 'newuser' tiene el descuento para un mensaje personalizado.
      if (newUser.tieneDescuentoDuoc) {
        toast.success('bienvenido! tienes un 10% de descuento por ser de duoc uc.');
      } else {
        toast.success('bienvenido! registro exitoso.');
      }
      
      // redirigimos al usuario a la pagina de inicio ('/')
      navigate('/');
    } catch (err) {
      // si 'register' (en authContext.jsx) lanza un error (ej. contrasenas no coinciden),
      // lo capturamos aqui.
      setError(err.message);
      toast.error(err.message);
    }
  };

  return (
    // 'authcontainer' es la caja principal que centra el formulario
    <div className={styles.authContainer}>
      {/* 'titulo-principal' es una clase global definida en style.css */}
      <h2 className="titulo-principal" style={{ margin: '0 0 2rem 0' }}>crear cuenta</h2>
      
      <form className={styles.authForm} onSubmit={handleSubmit}>
        
        {/* renderizado condicional: muestra este div solo si 'error' no esta vacio */}
        {error && <div className={styles.authError}>{error}</div>}

        {/* cada campo del formulario esta envuelto en un 'formgroup' */}
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
        
        <button type="submit" className={styles.authButton}>registrarse</button>
      </form>
      
      {/* enlace para navegar a la pagina de login si el usuario ya tiene cuenta */}
      <div className={styles.authSwitchLink}>
        ¿ya tienes cuenta? <a onClick={() => navigate('/login')} style={{cursor: 'pointer'}}>inicia sesion</a>
      </div>
    </div>
  );
}