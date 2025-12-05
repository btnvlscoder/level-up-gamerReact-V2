import React from 'react';
import { Link } from 'react-router-dom';
import { ArrowLeft } from 'react-bootstrap-icons';

// Si no le paso nada, asume la ruta '/products' y el texto 'volver al catalogo'.
function BackToCatalogLink({ to = '/products', onClick, children = 'volver al catalogo', style }) {
  //SI LA TENGO: Renderizo un btn
  if (onClick) {
    return (
      <button className="btn-volver" onClick={onClick} style={style}>
        <ArrowLeft /> {children}
      </button>
    );
  }
  //SI NO TENGO onClick: Renderizo un LINK de React Router
  return (
    <Link to={to} className="btn-volver" style={style}>
      <ArrowLeft /> {children}
    </Link>
  );
}

export default BackToCatalogLink;

