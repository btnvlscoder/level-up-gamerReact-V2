import React, { useState } from 'react';
import products from '../data/products';
import ProductCard from '../components/ProductCard';
import styles from './ProductsPage.module.css';
import useProductsFilter from '../hooks/useProductsFilter';
import ProductsToolbar from '../components/ProductsToolbar';


export default function ProductsPage() {
  const {
    categoria,
    setCategoria,
    terminoBusqueda,
    setTerminoBusqueda,
    categorias,
    productosFiltrados,
  } = useProductsFilter(products);

  return (
    <>
      <h2 className="titulo-principal">Catálogo de Productos</h2>
      
      <ProductsToolbar
        categorias={categorias}
        categoria={categoria}
        setCategoria={setCategoria}
        terminoBusqueda={terminoBusqueda}
        setTerminoBusqueda={setTerminoBusqueda}
      />

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