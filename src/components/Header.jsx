// Contenido de: src/components/Header.jsx (Refactorizado con CSS Modules)

import React from 'react';
import { useNavigate } from 'react-router-dom';
import {
  Joystick, HouseDoor, Controller, ChatDotsFill, Cart,
  BoxArrowRight, PersonCircle, PersonPlusFill, PersonVcard
} from 'react-bootstrap-icons';
import { useCart } from '../context/CartContext';
import { useAuth } from '../context/AuthContext';
import toast from 'react-hot-toast';

// 1. Importa los estilos del módulo
import styles from './Header.module.css';

function Header({ isMenuOpen, toggleMenu }) {
  const { totalItems } = useCart();
  const { currentUser, logout } = useAuth();
  const navigate = useNavigate();

  const handleLinkClick = (path) => {
    if (isMenuOpen) {
      toggleMenu();
    }
    navigate(path); 
  };

  const handleLogout = () => {
    if (isMenuOpen) {
      toggleMenu();
    }
    logout();
    navigate('/'); 
    toast.success("Has cerrado sesión.");
  };

  // 2. Construye la clase del sidebar dinámicamente
  const sidebarClasses = `${styles.sidebar} ${isMenuOpen ? styles.active : ''}`;

  return (
    // 3. Usa el objeto 'styles' para las clases
    //    (Ej: className="logo" se convierte en className={styles.logo})
    <aside className={sidebarClasses}>
      <header>
        <a href="#" onClick={(e) => { e.preventDefault(); handleLinkClick('/'); }}>
          <h1 className={styles.logo}><Joystick /> Level-Up Gamer</h1>
        </a>
        <img className={styles.logojpg} src="/img/logo.jpg" alt="Logo Level-Up Gamer" />
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
              <ChatDotsFill /> Contáctanos
            </a>
          </li>

          {!currentUser ? (
            <>
              <li>
                <a href="#" className={styles.botonMenu} onClick={(e) => { e.preventDefault(); handleLinkClick('/login'); }}>
                  <PersonCircle /> Iniciar Sesión
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
                  <BoxArrowRight /> Cerrar Sesión
                </a>
              </li>
            </>
          )}

          <li>
            {/* 4. Múltiples clases se unen con template literals */}
            <a href="#" 
               className={`${styles.botonMenu} ${styles.botonCarrito}`} 
               onClick={(e) => { e.preventDefault(); handleLinkClick('/cart'); }}
            >
              <Cart /> Carrito <span className="numerito">{totalItems}</span>
            </a>
          </li>
        </ul>
      </nav>
      <footer>
        <p className={styles.textoFooter}>&copy; 2025 Level-Up Gamer</p>
        <small className={styles.textoSmallFooter}>
          Tu tienda online de confianza para todos tus productos gamers.
        </small>
      </footer>
    </aside>
  );
}

export default Header;