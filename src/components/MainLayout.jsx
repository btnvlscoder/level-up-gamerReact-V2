import React, { useState } from 'react'; 
// 'outlet' es el marcador de posicion donde react-router renderiza las paginas (children)
import { Outlet } from 'react-router-dom';
// 'header' es el componente de la barra lateral (Header.jsx)
import Header from './Header'; 
// 'list' es el icono de hamburguesa para el menu movil
import { List } from 'react-bootstrap-icons'; 

/**
 * componente 'mainlayout' (plantilla principal).
 * define la estructura visual comun: barra lateral (header) y area de contenido (main).
 * tambien maneja la logica del menu movil.
 */
function MainLayout() {
  // 'ismenuopen' es el estado que controla si el menu movil esta visible
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  // 'togglemenu' es la funcion que invierte el estado 'ismenuopen'
  // 'prev => !prev' es la forma segura de actualizar un estado basado en su valor anterior
  const toggleMenu = () => {
    setIsMenuOpen(prev => !prev);
  };

  return (
    // '.wrapper' es la clase global (en style.css) que define el grid layout
    <div className="wrapper">
      
      {/* 1. la barra lateral (header)
         le pasamos el estado 'ismenuopen' y la funcion 'togglemenu' como props
         para que el header (Header.jsx) sepa si debe mostrarse (en movil) y
         para que los enlaces del header puedan cerrar el menu al navegar.
      */}
      <Header isMenuOpen={isMenuOpen} toggleMenu={toggleMenu} />

      {/* 2. el overlay movil
         esta capa oscura solo es visible en movil cuando 'ismenuopen' es true
         (controlado por style.css).
         al hacer clic en el, se cierra el menu llamando a 'togglemenu'.
      */}
      <div className="overlay-mobile" onClick={toggleMenu}></div>

      {/* 3. el contenedor de contenido principal */}
      <main>
        {/* el boton hamburguesa (definido en style.css)
            solo es visible en movil. al hacer clic, abre el menu.
        */}
        <button className="btn-menu-toggle" onClick={toggleMenu}>
          <List />
        </button>

        {/* 'outlet' es donde react-router inyecta la pagina actual
            (ej. HomePage.jsx, ProductsPage.jsx, etc.)
            segun la ruta definida en main.jsx
        */}
        <Outlet />
      </main>
    </div>
  );
}

export default MainLayout;