// Contenido de: src/pages/ProfilePage.jsx (Refactorizado con CSS Modules)

import React, { useEffect } from 'react';
import { useAuth } from '../context/AuthContext';
import { useNavigate } from 'react-router-dom';
import { PersonVcard, CheckCircleFill, InfoCircleFill } from 'react-bootstrap-icons';
import toast from 'react-hot-toast';

// 1. Importar los estilos del módulo
import styles from './ProfilePage.module.css';

export default function ProfilePage() {
  const { currentUser, logout } = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    if (!currentUser) {
      toast.error("Debes iniciar sesión para ver tu perfil.");
      navigate('/login');
    }
  }, [currentUser, navigate]);

  const handleLogout = () => {
    logout();
    navigate('/');
    toast.success("Has cerrado sesión.");
  };

  if (!currentUser) {
    return null; 
  }

  const nombreCompleto = `${currentUser.nombre} ${currentUser.apellidoPaterno} ${currentUser.apellidoMaterno}`;

  // 2. Lógica para clases dinámicas del banner
  const bannerClasses = `${styles.discountBanner} ${currentUser.tieneDescuentoDuoc ? styles.duoc : styles.noDuoc}`;

  return (
    // 3. Usar el objeto 'styles'
    <div className={styles.profilePage}>
      <h2 className="titulo-principal">Mi Perfil</h2>
      
      <div className={styles.profileHeader}>
        <PersonVcard className={styles.icon} />
        <div>
          <h3>{nombreCompleto}</h3>
          <span className={styles.email}>{currentUser.email}</span>
        </div>
      </div>

      <div className={styles.profileInfo}>
        <p>Esta es tu información de usuario y beneficios.</p>
        
        {/* 4. Aplicar clases dinámicas */}
        {currentUser.tieneDescuentoDuoc ? (
          <div className={bannerClasses}>
            <h4><CheckCircleFill /> Beneficio Duoc UC Activado</h4>
            <p>¡Felicidades! Tienes un <b>10% de descuento</b> en todas tus compras por ser estudiante de Duoc UC.</p>
          </div>
        ) : (
          <div className={bannerClasses}>
            <h4><InfoCircleFill /> Beneficios Estudiantiles</h4>
            <p>¿Sabías que si te registras con tu correo @duocuc.cl obtienes un 10% de descuento? ¡Visita Duoc UC para más beneficios!</p>
          </div>
        )}
      </div>

      {/* 5. CORRECCIÓN: Usamos la clase específica del módulo en lugar de 'auth-button' */ }
      <button className={styles.profileLogoutButton} onClick={handleLogout}>
        Cerrar Sesión
      </button>
    </div>
  );
}