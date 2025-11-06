// Contenido de src/components/MainLayout.jsx (Funcionalidad Completa Pre-Refactorización)

import React, { useState } from 'react'; 
import { Outlet } from 'react-router-dom';
import Header from './Header'; 
import { List } from 'react-bootstrap-icons'; // Ícono de "hamburguesa"

function MainLayout() {
  // Estado para el menú móvil: true si está abierto, false si está cerrado.
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  // Función para alternar el estado del menú
  const toggleMenu = () => {
    setIsMenuOpen(prev => !prev);
  };

  return (
    <div className="wrapper">
      {/* El Header es el aside (barra lateral).
        Le pasamos el estado del menú y la función para cambiarlo.
      */}
      <Header isMenuOpen={isMenuOpen} toggleMenu={toggleMenu} />

      {/* Overlay móvil: Se muestra como un fondo oscuro que ayuda a cerrar el menú 
        y bloquea el contenido cuando el menú lateral está abierto en pantallas pequeñas.
      */}
      <div className="overlay-mobile" onClick={toggleMenu}></div>

      <main>
        {/* Botón Hamburguesa: Es visible solo en resoluciones móviles (definido en CSS).
          Su click activa la función toggleMenu.
        */}
        <button className="btn-menu-toggle" onClick={toggleMenu}>
          <List />
        </button>

        {/* Outlet: Aquí es donde React Router renderiza el contenido de la página actual 
          (HomePage, ProductsPage, CartPage, etc.).
        */}
        <Outlet />
      </main>
    </div>
  );
}

export default MainLayout;