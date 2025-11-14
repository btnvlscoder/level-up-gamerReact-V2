import React, { useState } from 'react';
import products from '../data/products';
import ProductCard from '../components/ProductCard';
import { Search } from 'react-bootstrap-icons';
import styles from './productsPage.module.css';

// Extrae categorías únicas para los filtros
const categoriasUnicas = Array.isArray(products)
  ? ["todos", ...new Set(products.map(p => p.category))]
  : ["todos"];

export default function ProductsPage() {
  // Estados para filtros
  const [categoria, setCategoria] = useState('todos');
  const [terminoBusqueda, setTerminoBusqueda] = useState('');

  // Filtrado combinado por categoría y búsqueda
  const productosFiltrados = (Array.isArray(products) ? products : [])
    .filter(p => categoria === 'todos' ? true : p.category === categoria)
    .filter(p => {
      const t = terminoBusqueda.toLowerCase();
      const nombreCoincide = p.name?.toLowerCase().includes(t);
      const marcaCoincide = p.signature?.toLowerCase().includes(t);
      return nombreCoincide || marcaCoincide;
    });

  return (
    <>
      <h2 className="titulo-principal">Catálogo de Productos</h2>
      
      <div className={styles.productosToolbar}>
        {/* Filtro por categoría */}
        <select
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

        {/* Búsqueda en tiempo real */}
        <input
          className={styles.buscador}
          type="search"
          placeholder="Buscar producto..."
          value={terminoBusqueda}
          onChange={(e) => setTerminoBusqueda(e.target.value)}
        />
        <button className="btn btn-primary">
          <Search />
        </button>
      </div>

      {/* Grid de productos */}
      <div className={styles.contenedorProductos}>
        {productosFiltrados.length > 0 ? (
          productosFiltrados.map(producto => (
            <ProductCard
              key={producto.code}
              product={producto}
            />
          ))
        ) : (
          <div className={styles.noResultados}>
            No se encontraron productos.
          </div>
        )}
      </div>
    </>
  );
}