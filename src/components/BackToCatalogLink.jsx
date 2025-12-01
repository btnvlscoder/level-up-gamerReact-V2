import React from 'react';
import { Link } from 'react-router-dom';
import { ArrowLeft } from 'react-bootstrap-icons';

function BackToCatalogLink({ to = '/products', onClick, children = 'volver al catalogo', style }) {
  if (onClick) {
    return (
      <button className="btn-volver" onClick={onClick} style={style}>
        <ArrowLeft /> {children}
      </button>
    );
  }

  return (
    <Link to={to} className="btn-volver" style={style}>
      <ArrowLeft /> {children}
    </Link>
  );
}

export default BackToCatalogLink;

