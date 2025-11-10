import React, { useState } from 'react';

// Importamos Outlet para mostrar las páginas dentro del layout
import { Outlet } from 'react-router-dom';
// Importamos el componente Header (la barra lateral de navegación)
import Header from './Header';
// Importamos el ícono de hamburguesa para el botón del menú móvil
import { List } from 'react-bootstrap-icons';

// Este es el componente principal que define cómo se ve toda la aplicación
function MainLayout() {
  // Estado para saber si el menú móvil está abierto o cerrado
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  // Función para abrir o cerrar el menú móvil
  const toggleMenu = () => {
    setIsMenuOpen(prev => !prev); // Cambia al valor contrario del actual
  };

  return (
    // Este div es el contenedor principal con dos columnas: sidebar y contenido
    <div className="wrapper">
      
      {/* La barra lateral de navegación */}
      {/* Le pasamos el estado del menú y la función para cambiarlo */}
      <Header isMenuOpen={isMenuOpen} toggleMenu={toggleMenu} />

      {/* Capa oscura que aparece en móviles cuando el menú está abierto */}
      {/* Al hacer clic se cierra el menú */}
      <div className="overlay-mobile" onClick={toggleMenu}></div>

      {/* Área de contenido principal */}
      <main>
        {/* Botón de menú hamburguesa - solo visible en teléfonos */}
        <button className="btn-menu-toggle" onClick={toggleMenu}>
          <List /> {/* Este es el ícono de tres líneas */}
        </button>

        {/* Aquí es donde se muestran las páginas (Home, Productos, Carrito, etc.) */}
        {/* React Router cambia lo que se muestra aquí según la URL */}
        <Outlet />
      </main>
    </div>
  );
}

export default MainLayout;