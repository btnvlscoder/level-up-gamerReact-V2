import React, { useEffect } from 'react';

import { useAuth } from '../context/AuthContext';
import { useNavigate } from 'react-router-dom';
import { PersonVcard, CheckCircleFill, InfoCircleFill } from 'react-bootstrap-icons';
import toast from 'react-hot-toast';
import styles from './profilePage.module.css';

export default function ProfilePage() {
  // Obtenemos el usuario actual y la fn para cerrar sesión del contexto
  const { currentUser, logout } = useAuth();
  // Hook para navegar entre páginas
  const navigate = useNavigate();

  // useEffect que se ejecuta cuando el componente se monta o cuando currentUser cambia
  useEffect(() => {
    // Si no hay usuario logueado, mostramos error y redirigimos al login
    if (!currentUser) {
      toast.error("Debes iniciar sesion para ver tu perfil.");
      navigate('/login');
    }
  }, [currentUser, navigate]); // Se ejecuta cada vez que currentUser o navigate cambian

  // fn para cerrar sesión
  const handleLogout = () => {
    logout(); // Llama a la fn de logout del contexto
    navigate('/'); // Redirige al inicio
    toast.success("Has cerrado sesion."); // Muestra notificación de éxito
  };

  // Si no hay usuario logueado, no mostramos nada (el useEffect ya redirigió)
  if (!currentUser) {
    return null;
  }

  // Creamos el nombre completo concatenando los datos del usuario
  const nombreCompleto = `${currentUser.nombre} ${currentUser.apellidoPaterno} ${currentUser.apellidoMaterno}`;

  // Definimos las clases del banner según si tiene descuento Duoc o no
  const bannerClasses = `${styles.discountBanner} ${currentUser.tieneDescuentoduoc ? styles.duoc : styles.noDuoc}`;

  return (
    // Contenedor principal de la página de perfil
    <div className={styles.profilePage}>
      {/* Título de la página */}
      <h2 className="titulo-principal">Mi Perfil</h2>

      {/* Encabezado con información del usuario */}
      <div className={styles.profileHeader}>
        <PersonVcard className={styles.icon} /> {/* Ícono de perfil */}
        <div>
          <h3>{nombreCompleto}</h3> {/* Nombre completo */}
          <span className={styles.email}>{currentUser.email}</span> {/* Email */}
        </div>
      </div>

      {/* Sección de información y beneficios */}
      <div className={styles.profileInfo}>
        <p>Esta es tu informacion de usuario y beneficios.</p>
        
        {/* Mostramos diferente banner según si tiene descuento Duoc o no */}
        {currentUser.tieneDescuentoduoc ? (
          // Banner para usuarios con descuento Duoc
          <div className={bannerClasses}>
            <h4><CheckCircleFill /> Beneficio duoc uc activado</h4>
            <p>¡Felicidades! tienes un <b>10% de descuento</b> en todas tus compras por ser estudiante de duoc uc.</p>
          </div>
        ) : (
          // Banner para usuarios sin descuento Duoc
          <div className={bannerClasses}>
            <h4><InfoCircleFill /> Beneficios estudiantiles</h4>
            <p>¿Sabias que si te registras con tu correo @duocuc.cl obtienes un 10% de descuento? ¡Visita duoc uc para mas beneficios!</p>
          </div>
        )}
      </div>

      {/* Botón para cerrar sesión */}
      <button className={styles.profileLogoutButton} onClick={handleLogout}>
        cerrar sesion
      </button>
    </div>
  );
}