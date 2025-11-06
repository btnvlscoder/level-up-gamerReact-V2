import React, { useEffect } from 'react';
// hook para acceder al contexto de autenticacion
import { useAuth } from '../context/AuthContext';
// hook de react-router para navegar entre paginas
import { useNavigate } from 'react-router-dom';
// iconos de bootstrap
import { PersonVcard, CheckCircleFill, InfoCircleFill } from 'react-bootstrap-icons';
// para notificaciones
import toast from 'react-hot-toast';

// importamos los estilos modulares
import styles from './profilePage.module.css';

/**
 * pagina de perfil del usuario.
 * muestra la informacion del usuario, el estado de su beneficio
 * y permite cerrar sesion.
 */
export default function ProfilePage() {
  // extraemos el usuario actual y la funcion de logout del contexto
  const { currentUser, logout } = useAuth();
  const navigate = useNavigate();

  // 'useeffect' para proteger la ruta
  useEffect(() => {
    // si 'currentuser' es nulo (nadie ha iniciado sesion)
    if (!currentUser) {
      // mostramos un error y redirigimos al login
      toast.error("Debes iniciar sesion para ver tu perfil.");
      navigate('/login');
    }
    // [currentuser, navigate] son las dependencias. el efecto se re-ejecuta si cambian.
  }, [currentUser, navigate]);

  /**
   * maneja el clic en el boton de cerrar sesion.
   */
  const handleLogout = () => {
    logout(); // llama a la funcion del contexto
    navigate('/'); // redirige al inicio
    toast.success("Has cerrado sesion.");
  };

  // 'if' de guarda (guard clause):
  // si 'currentuser' aun no se ha cargado (o el useeffect esta redirigiendo),
  // no renderizamos nada para evitar un error.
  if (!currentUser) {
    return null; 
  }

  // formateamos el nombre completo a partir de los datos del usuario
  const nombreCompleto = `${currentUser.nombre} ${currentUser.apellidoPaterno} ${currentUser.apellidoMaterno}`;

  // logica para clases dinamicas del banner de descuento.
  // si 'tienedescuentoduoc' es true, usa 'styles.duoc', si no, usa 'styles.noduoc'.
  const bannerClasses = `${styles.discountBanner} ${currentUser.tieneDescuentoduoc ? styles.duoc : styles.noDuoc}`;

  return (
    // usamos la clase '.profilepage' del modulo de estilos
    <div className={styles.profilePage}>
      {/* '.titulo-principal' es una clase global de style.css */}
      <h2 className="titulo-principal">mi perfil</h2>
      
      <div className={styles.profileHeader}>
        <PersonVcard className={styles.icon} />
        <div>
          <h3>{nombreCompleto}</h3>
          <span className={styles.email}>{currentUser.email}</span>
        </div>
      </div>

      <div className={styles.profileInfo}>
        <p>Esta es tu informacion de usuario y beneficios.</p>
        
        {/* renderizado condicional del banner */}
        {currentUser.tieneDescuentoduoc ? (
          // version del banner para usuarios de duoc
          <div className={bannerClasses}>
            <h4><CheckCircleFill /> Beneficio duoc uc activado</h4>
            <p>¡Felicidades! tienes un <b>10% de descuento</b> en todas tus compras por ser estudiante de duoc uc.</p>
          </div>
        ) : (
          // version del banner para otros usuarios
          <div className={bannerClasses}>
            <h4><InfoCircleFill /> Beneficios estudiantiles</h4>
            <p>¿Sabias que si te registras con tu correo @duocuc.cl obtienes un 10% de descuento? ¡Visita duoc uc para mas beneficios!</p>
          </div>
        )}
      </div>

      {/* boton de logout con su clase especifica del modulo */}
      <button className={styles.profileLogoutButton} onClick={handleLogout}>
        cerrar sesion
      </button>
    </div>
  );
}