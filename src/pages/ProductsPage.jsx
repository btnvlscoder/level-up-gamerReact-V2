import React, { useState, useEffect } from 'react';
import ProductCard from '../components/ProductCard';
import styles from './ProductsPage.module.css';
import useProductsFilter from '../hooks/useProductsFilter';
import ProductsToolbar from '../components/ProductsToolbar';
import { getProducts } from '../services/productService';


export default function ProductsPage() {
  const [data, setData] = useState([]);

  useEffect(() => {
    let active = true;
    getProducts()
      .then((res) => { if (active) setData(res); })
      .catch(() => { if (active) setData([]); });
    return () => { active = false; };
  }, []);

  const {
    categoria,
    setCategoria,
    terminoBusqueda,
    setTerminoBusqueda,
    categorias,
    productosFiltrados,
  } = useProductsFilter(data);

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
