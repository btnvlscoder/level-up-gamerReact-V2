import React from 'react'; 
import { Outlet } from 'react-router-dom';
import Header from './Header'; 

function MainLayout() {
  return (
    <div className="wrapper">
      {/* MENU NAV */}
      <Header />
      <main>
      {/* R.ROUTER HACE LA INYECCION DE PAGINAS*/}
        <Outlet />
      </main>
    </div>
  );
}

export default MainLayout;