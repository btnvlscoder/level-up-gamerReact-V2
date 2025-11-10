import React from 'react';
// Importamos useNavigate para cambiar de página programáticamente
import { useNavigate } from 'react-router-dom';
// Importamos íconos de Bootstrap para la navegación
import {
  Joystick, HouseDoor, Controller, ChatDotsFill, Cart,
  BoxArrowRight, PersonCircle, PersonPlusFill, PersonVcard
} from 'react-bootstrap-icons';
// Importamos el contexto del carrito para mostrar la cantidad de items
import { useCart } from '../context/CartContext';
// Importamos el contexto de autenticación para saber si el usuario está logueado
import { useAuth } from '../context/AuthContext';
// Importamos toast para mostrar notificaciones
import toast from 'react-hot-toast';

// Importamos los estilos específicos de este componente
import styles from './Header.module.css';

// Componente Header - la barra lateral de navegación de la aplicación
function Header({ isMenuOpen, toggleMenu }) {
  // Obtenemos la cantidad total de items en el carrito
  const { totalItems } = useCart();
  // Obtenemos el usuario actual y la función para cerrar sesión
  const { currentUser, logout } = useAuth();
  // Hook para navegar entre páginas
  const navigate = useNavigate();

  // Función que se ejecuta cuando se hace clic en un enlace de navegación
  const handleLinkClick = (path) => {
    // Si el menú móvil está abierto, lo cerramos al navegar
    if (isMenuOpen) {
      toggleMenu();
    }
    // Navegamos a la ruta especificada
    navigate(path); 
  };

  // Función para cerrar sesión
  const handleLogout = () => {
    // Si el menú móvil está abierto, lo cerramos
    if (isMenuOpen) {
      toggleMenu();
    }
    // Cerramos sesión llamando a la función del contexto
    logout();
    // Redirigimos al usuario a la página de inicio
    navigate('/');
    // Mostramos notificación de éxito
    toast.success("Has cerrado sesion.");
  };

  // Creamos las clases dinámicas para el sidebar
  // Si isMenuOpen es true, añadimos la clase 'active' para mostrar el menú en móviles
  const sidebarClasses = `${styles.sidebar} ${isMenuOpen ? styles.active : ''}`;

  return (
    // Barra lateral de navegación con clases dinámicas
    <aside className={sidebarClasses}>
      {/* Encabezado del sidebar con logo */}
      <header>
        {/* Logo que lleva al inicio al hacer clic */}
        <a href="#" onClick={(e) => { e.preventDefault(); handleLinkClick('/'); }}>
          <h1 className={styles.logo}><Joystick /> Level-up Gamer</h1>
        </a>
        {/* Imagen del logo */}
        <img className={styles.logojpg} src="/img/logo.jpg" alt="logo level-up gamer" />
      </header>
      
      {/* Menú de navegación principal */}
      <nav>
        <ul className={styles.menu}>
          {/* Enlace a la página de inicio */}
          <li>
            <a href="#" className={styles.botonMenu} onClick={(e) => { e.preventDefault(); handleLinkClick('/'); }}>
              <HouseDoor /> Inicio
            </a>
          </li>
          {/* Enlace al catálogo de productos */}
          <li>
            <a href="#" className={styles.botonMenu} onClick={(e) => { e.preventDefault(); handleLinkClick('/products'); }}>
              <Controller /> Productos
            </a>
          </li>
          {/* Enlace a la página de contacto */}
          <li>
            <a href="#" className={styles.botonMenu} onClick={(e) => { e.preventDefault(); handleLinkClick('/contact'); }}>
              <ChatDotsFill /> Contactanos
            </a>
          </li>

          {/* Mostramos diferentes opciones según si el usuario está logueado o no */}
          {!currentUser ? (
            // Si no hay usuario logueado, mostramos opciones de login y registro
            <>
              <li>
                <a href="#" className={styles.botonMenu} onClick={(e) => { e.preventDefault(); handleLinkClick('/login'); }}>
                  <PersonCircle /> Iniciar Sesion
                </a>
              </li>
              <li>
                <a href="#" className={styles.botonMenu} onClick={(e) => { e.preventDefault(); handleLinkClick('/register'); }}>
                  <PersonPlusFill /> Registrarse
                </a>
              </li>
            </>
          ) : (
            // Si hay usuario logueado, mostramos perfil y cerrar sesión
            <>
              <li>
                <a href="#" className={styles.botonMenu} onClick={(e) => { e.preventDefault(); handleLinkClick('/profile'); }}>
                  <PersonVcard /> Mi Perfil
                </a>
              </li>
              <li>
                <a href="#" className={styles.botonMenu} onClick={(e) => { e.preventDefault(); handleLogout(); }}>
                  <BoxArrowRight /> Cerrar Sesion
                </a>
              </li>
            </>
          )}

          {/* Enlace al carrito de compras con contador de items */}
          <li>
            <a href="#" 
               className={`${styles.botonMenu} ${styles.botonCarrito}`} 
               onClick={(e) => { e.preventDefault(); handleLinkClick('/cart'); }}
            >
              <Cart /> Carrito <span className="numerito">{totalItems}</span>
            </a>
          </li>
        </ul>
      </nav>
      
      {/* Pie del sidebar con información de copyright */}
      <footer>
        <p className={styles.textoFooter}>&copy; 2025 level-up gamer</p>
        <small className={styles.textoSmallFooter}>
          tu tienda online de confianza para todos tus productos gamers.
        </small>
      </footer>
    </aside>
  );
}

export default Header;