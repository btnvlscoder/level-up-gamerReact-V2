import React, { useState, useEffect } from 'react';
import ProductCard from '../components/ProductCard';
import styles from './ProductsPage.module.css';
import useProductsFilter from '../hooks/useProductsFilter';
import ProductsToolbar from '../components/ProductsToolbar';
import { getProducts } from '../services/productService';


export default function ProductsPage() {
  const [data, setData] = useState([]);

// useEffect para la carga inicial
  useEffect(() => {
    let active = true; //Evita Memory Leaks si el usuario cambia de página rápido
    getProducts()
    //preguntamos si esta activo
      .then((res) => { if (active) setData(res); }) 
      .catch(() => { if (active) setData([]); });//Solo actualiza si el componente vive
    return () => { active = false; }; //Desactiva el flag al desmontar el componente
  }, []);

  //ejecutamos custom hook 
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
