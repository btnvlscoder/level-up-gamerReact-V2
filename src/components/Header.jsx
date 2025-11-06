import React from 'react';
// hook de react-router para navegar programaticamente
import { useNavigate } from 'react-router-dom';
// iconos de bootstrap
import {
  Joystick, HouseDoor, Controller, ChatDotsFill, Cart,
  BoxArrowRight, PersonCircle, PersonPlusFill, PersonVcard
} from 'react-bootstrap-icons';
// hook para acceder al contexto del carrito (cartContext.jsx)
import { useCart } from '../context/CartContext';
// hook para acceder al contexto de autenticacion (authContext.jsx)
import { useAuth } from '../context/AuthContext';
// para mostrar notificaciones
import toast from 'react-hot-toast';

// importamos los estilos modulares (header.module.css)
import styles from './Header.module.css';

/**
 * componente header (la barra lateral de navegacion).
 * @param {object} props
 * @param {boolean} props.isMenuOpen - estado (booleano) que indica si el menu movil esta abierto.
 * @param {function} props.toggleMenu - funcion para cambiar el estado de 'isMenuOpen'.
 */
function Header({ isMenuOpen, toggleMenu }) {
  // extraemos datos del contexto del carrito
  const { totalItems } = useCart();
  // extraemos datos y funciones del contexto de autenticacion
  const { currentUser, logout } = useAuth();
  // inicializamos el hook 'usenavigate'
  const navigate = useNavigate();

  /**
   * manejador para los clics en los enlaces de navegacion.
   * cierra el menu movil (si esta abierto) y navega a la ruta.
   * @param {string} path - la ruta a la que navegar (ej. '/products').
   */
  const handleLinkClick = (path) => {
    if (isMenuOpen) {
      toggleMenu();
    }
    navigate(path); 
  };

  /**
   * manejador para el boton de cerrar sesion.
   */
  const handleLogout = () => {
    if (isMenuOpen) {
      toggleMenu();
    }
    logout(); // llama a la funcion del contexto
    navigate('/'); // redirige al inicio
    toast.success("Has cerrado sesion.");
  };

  // construye las clases para el 'aside' dinamicamente.
  // si 'isMenuOpen' es true, anade la clase 'styles.active'.
  const sidebarClasses = `${styles.sidebar} ${isMenuOpen ? styles.active : ''}`;

  return (
    // aplicamos las clases dinamicas al 'aside'
    <aside className={sidebarClasses}>
      <header>
        {/* 'e.preventdefault()' evita que el '#' recargue la pagina */}
        <a href="#" onClick={(e) => { e.preventDefault(); handleLinkClick('/'); }}>
          <h1 className={styles.logo}><Joystick /> level-up gamer</h1>
        </a>
        <img className={styles.logojpg} src="/img/logo.jpg" alt="logo level-up gamer" />
      </header>
      
      <nav>
        <ul className={styles.menu}>
          <li>
            <a href="#" className={styles.botonMenu} onClick={(e) => { e.preventDefault(); handleLinkClick('/'); }}>
              <HouseDoor /> Inicio
            </a>
          </li>
          <li>
            <a href="#" className={styles.botonMenu} onClick={(e) => { e.preventDefault(); handleLinkClick('/products'); }}>
              <Controller /> Productos
            </a>
          </li>
          <li>
            <a href="#" className={styles.botonMenu} onClick={(e) => { e.preventDefault(); handleLinkClick('/contact'); }}>
              <ChatDotsFill /> Contactanos
            </a>
          </li>

          {/* renderizado condicional:
              si 'currentuser' no existe (invitado), muestra login/registro.
              si 'currentuser' existe (logueado), muestra perfil/cerrar sesion.
          */}
          {!currentUser ? (
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

          <li>
            {/* multiples clases (locales) se unen usando template literals */}
            <a href="#" 
               className={`${styles.botonMenu} ${styles.botonCarrito}`} 
               onClick={(e) => { e.preventDefault(); handleLinkClick('/cart'); }}
            >
              {/* 'totalitems' viene del 'usecart()' hook */}
              <Cart /> Carrito <span className="numerito">{totalItems}</span>
            </a>
          </li>
        </ul>
      </nav>
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