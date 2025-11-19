import React from 'react';
import { NavLink, useNavigate } from 'react-router-dom';
import {
  Joystick, HouseDoor, Controller, ChatDotsFill, Cart,
  BoxArrowRight, PersonCircle, PersonPlusFill, PersonVcard
} from 'react-bootstrap-icons';

import { useCart } from '../context/CartContext';
import { useAuth } from '../context/AuthContext';
import toast from 'react-hot-toast';

import styles from './Header.module.css';

//
function Header() {
  const { totalItems } = useCart();
  const { currentUser, logout } = useAuth();
  const navigate = useNavigate();

  //fn para cerrar sesion
  const handleLogout = () => {
    logout();
    navigate('/');
    toast.success("Has cerrado sesión.");
  };

  return (
    <aside className={styles.sidebar}>
      <header>
        <NavLink to="/">
          <h1 className={styles.logo}><Joystick /> Level-up Gamer</h1>
        </NavLink>
        <img className={styles.logojpg} src="/img/logo.jpg" alt="logo level-up gamer" />
      </header>

      <nav>
        <ul className={styles.menu}>
          <li>
            <NavLink 
              to="/"
              className={({ isActive }) =>
                isActive ? `${styles.botonMenu} ${styles.active}` : styles.botonMenu
              }
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
            >
              <ChatDotsFill /> Contactanos
            </NavLink>
          </li>

          {!currentUser ? (
            <>
              <li>
                <NavLink 
                  to="/login"
                  className={({ isActive }) =>
                    isActive ? `${styles.botonMenu} ${styles.active}` : styles.botonMenu
                  }
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
                >
                  <PersonVcard /> Mi Perfil
                </NavLink>
              </li>

              <li>
                <button className={styles.botonMenu} onClick={handleLogout}>
                  <BoxArrowRight /> Cerrar Sesion
                </button>
              </li>
            </>
          )}

          <li>
            <NavLink 
              to="/cart"
              className={({ isActive }) =>
                isActive
                  ? `${styles.botonMenu} ${styles.botonCarrito} ${styles.active}`
                  : `${styles.botonMenu} ${styles.botonCarrito}`
              }
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