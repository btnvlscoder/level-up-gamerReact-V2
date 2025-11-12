import React, { useState } from 'react';

import { Outlet } from 'react-router-dom';
import Header from './Header';
import { List } from 'react-bootstrap-icons';

function MainLayout() {
  // Estado de menu abierto/cerrado
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  // abrir/cerrar menu movil
  const toggleMenu = () => {
    setIsMenuOpen(prev => !prev); // valor contrario
  };

  return (
    // sidebar y main content
    <div className="wrapper">
  
      <Header isMenuOpen={isMenuOpen} toggleMenu={toggleMenu} />
      <div className="overlay-mobile" onClick={toggleMenu}></div>
      <main>
        <button className="btn-menu-toggle" onClick={toggleMenu}>{/* btn hamburguesa*/}
          <List /> {/* Este es el icono de tres - */}
        </button>
        <Outlet />  {/* React Router cambia lo que se muestra por la URL */}
      </main>
    </div>
  );
}

export default MainLayout;