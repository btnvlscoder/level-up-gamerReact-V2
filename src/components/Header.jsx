import React from 'react';
import { NavLink, useNavigate } from 'react-router-dom';
import {
  Joystick, HouseDoor, Controller, ChatDotsFill, Cart,
  BoxArrowRight, PersonCircle, PersonPlusFill, PersonVcard
} from 'react-bootstrap-icons';

import { useCart } from '../context/CartContext';
import { useAuth } from '../context/AuthContext';
import toast from 'react-hot-toast';

// Importamos los estilos (CSS Modules)
import styles from './Header.module.css';

function Header({ isMenuOpen, toggleMenu }) {
  const { totalItems } = useCart();
  const { currentUser, logout } = useAuth();
  const navigate = useNavigate();

  // Cierra el menú en móviles si está abierto
  const closeMenuIfOpen = () => {
    if (isMenuOpen) toggleMenu();
  };

  // Cerrar sesión + feedback + redirección
  const handleLogout = () => {
    closeMenuIfOpen();
    logout();
    navigate('/');
    toast.success("Has cerrado sesión.");
  };

  // Clase dinámica para el sidebar (modo móvil)
  const sidebarClasses = `${styles.sidebar} ${isMenuOpen ? styles.active : ''}`;

  return (
    <aside className={sidebarClasses}>
      <header>
        {/* Logo que vuelve al inicio */}
        <NavLink to="/" onClick={closeMenuIfOpen}>
          <h1 className={styles.logo}><Joystick /> Level-up Gamer</h1>
        </NavLink>

        <img className={styles.logojpg} src="/img/logo.jpg" alt="logo level-up gamer" />
      </header>

      <nav>
        <ul className={styles.menu}>

          {/* Ejemplo de item con clase activa usando NavLink */}
          <li>
            <NavLink 
              to="/"
              className={({ isActive }) =>
                isActive ? `${styles.botonMenu} ${styles.active}` : styles.botonMenu
              }
              onClick={closeMenuIfOpen}
            >
              <HouseDoor /> Inicio
            </NavLink>
          </li>

          <li>
            <NavLink 
              to="/products"
              className={({ isActive }) =>
                isActive ? `${styles.botonMenu} ${styles.active}` : styles.botonMenu
              }
              onClick={closeMenuIfOpen}
            >
              <Controller /> Productos
            </NavLink>
          </li>

          <li>
            <NavLink 
              to="/contact"
              className={({ isActive }) =>
                isActive ? `${styles.botonMenu} ${styles.active}` : styles.botonMenu
              }
              onClick={closeMenuIfOpen}
            >
              <ChatDotsFill /> Contactanos
            </NavLink>
          </li>

          {/* Opciones según estado de autenticación */}
          {!currentUser ? (
            <>
              <li>
                <NavLink 
                  to="/login"
                  className={({ isActive }) =>
                    isActive ? `${styles.botonMenu} ${styles.active}` : styles.botonMenu
                  }
                  onClick={closeMenuIfOpen}
                >
                  <PersonCircle /> Iniciar Sesion
                </NavLink>
              </li>

              <li>
                <NavLink 
                  to="/register"
                  className={({ isActive }) =>
                    isActive ? `${styles.botonMenu} ${styles.active}` : styles.botonMenu
                  }
                  onClick={closeMenuIfOpen}
                >
                  <PersonPlusFill /> Registrarse
                </NavLink>
              </li>
            </>
          ) : (
            <>
              <li>
                <NavLink 
                  to="/profile"
                  className={({ isActive }) =>
                    isActive ? `${styles.botonMenu} ${styles.active}` : styles.botonMenu
                  }
                  onClick={closeMenuIfOpen}
                >
                  <PersonVcard /> Mi Perfil
                </NavLink>
              </li>

              {/* Botón real para cerrar sesión (porque no navega a una ruta fija) */}
              <li>
                <button className={styles.botonMenu} onClick={handleLogout}>
                  <BoxArrowRight /> Cerrar Sesion
                </button>
              </li>
            </>
          )}

          {/* Carrito con contador */}
          <li>
            <NavLink 
              to="/cart"
              className={({ isActive }) =>
                isActive
                  ? `${styles.botonMenu} ${styles.botonCarrito} ${styles.active}`
                  : `${styles.botonMenu} ${styles.botonCarrito}`
              }
              onClick={closeMenuIfOpen}
            >
              <Cart /> Carrito <span className="numerito">{totalItems}</span>
            </NavLink>
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
