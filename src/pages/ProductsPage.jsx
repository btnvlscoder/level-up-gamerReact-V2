// Contenido de: src/pages/ProductsPage.jsx (Refactorizado con CSS Modules)

import React, { useState } from 'react';

import products from '../data/products'; 
import ProductCard from '../components/ProductCard'; // Este ya usa sus propios módulos
import { Search } from 'react-bootstrap-icons'; 

// 1. Importamos los estilos del módulo
import styles from './ProductsPage.module.css';

// Extracción segura de categorías únicas
const categoriasUnicas = Array.isArray(products)
  ? ["todos", ...new Set(products.map(p => p.category))]
  : ["todos"];

export default function ProductsPage() {
  
  const [categoria, setCategoria] = useState('todos');
  const [terminoBusqueda, setTerminoBusqueda] = useState('');

  // Lógica de Filtrado (sin cambios)
  const productosFiltrados = (Array.isArray(products) ? products : [])
    .filter(p => {
      return categoria === 'todos' ? true : p.category === categoria;
    })
    .filter(p => {
      const t = terminoBusqueda.toLowerCase();
      const nombreCoincide = p.name && p.name.toLowerCase().includes(t);
      const marcaCoincide = p.signature && p.signature.toLowerCase().includes(t);
      return nombreCoincide || marcaCoincide;
    });

  return (
    <>
      {/* 2. Dejamos el className global para el título */ }
      <h2 className="titulo-principal">Catálogo de productos</h2>
      
      {/* 3. Usamos el objeto 'styles' para las clases locales */ }
      <div className={styles.productosToolbar}>
        
        <select 
          id="filtro-categoria" 
          className={styles.filtroCategoria}
          value={categoria}
          onChange={(e) => setCategoria(e.target.value)}
        >
          {categoriasUnicas.map(cat => (
            <option key={cat} value={cat}>
              {cat === 'todos' ? 'Todas las categorías' : cat}
            </option>
          ))}
        </select>
        
        <input 
          id="buscador" 
          className={styles.buscador} 
          type="search" 
          placeholder="Buscar producto..." 
          value={terminoBusqueda}
          onChange={(e) => setTerminoBusqueda(e.target.value)}
        />
        <button id="btnBuscar" className="btn btn-primary">
          <Search />
        </button>
      </div>

      <div className={styles.contenedorProductos}>
        {/* Renderizado de Productos */}
        {productosFiltrados.length > 0 ? (
          productosFiltrados.map(producto => (
            <ProductCard 
              key={producto.code} 
              product={producto}
            />
          ))
        ) : (
          <div className={styles.noResultados}>
            <i className="bi bi-exclamation-triangle"></i> No se encontraron productos.
          </div>
        )}
      </div>
    </>
  );
}