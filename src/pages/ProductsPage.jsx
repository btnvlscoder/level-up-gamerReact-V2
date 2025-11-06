import React, { useState } from 'react';

// importa la "base de datos" de productos
import products from '../data/products'; 
// importa el componente hijo 'productcard' (que tiene sus propios estilos)
import ProductCard from '../components/productCard'; 
import { Search } from 'react-bootstrap-icons'; 

// importamos los estilos modulares para esta pagina
import styles from './productsPage.module.css';

// logica para extraer las categorias unicas del array de productos
// 'new set()' elimina duplicados.
const categoriasUnicas = Array.isArray(products)
  ? ["todos", ...new Set(products.map(p => p.category))]
  : ["todos"];

/**
 * pagina del catalogo de productos.
 * muestra una lista filtrable y buscable de todos los productos.
 */
export default function ProductsPage() {
  
  // estado para el valor actual del filtro de categoria
  const [categoria, setCategoria] = useState('todos');
  // estado para el texto actual en la barra de busqueda
  const [terminoBusqueda, setTerminoBusqueda] = useState('');

  // logica de filtrado y busqueda
  // 'productosfiltrados' es un nuevo array que se recalcula en cada render
  const productosFiltrados = (Array.isArray(products) ? products : [])
    // primer .filter() por categoria
    .filter(p => {
      // si la categoria es 'todos', devuelve true (no filtrar)
      return categoria === 'todos' ? true : p.category === categoria;
    })
    // segundo .filter() por termino de busqueda
    .filter(p => {
      const t = terminoBusqueda.toLowerCase();
      // busca el termino en el nombre o en la marca (signature)
      const nombreCoincide = p.name && p.name.toLowerCase().includes(t);
      const marcaCoincide = p.signature && p.signature.toLowerCase().includes(t);
      return nombreCoincide || marcaCoincide;
    });

  return (
    <>
      {/* '.titulo-principal' es una clase global de style.css */}
      <h2 className="titulo-principal">Catalogo de Productos</h2>
      
      {/* usamos la clase del modulo para la barra de herramientas */}
      <div className={styles.productosToolbar}>
        
        {/* filtro <select> */}
        <select 
          id="filtro-categoria" 
          className={styles.filtroCategoria}
          value={categoria} // controlado por el estado
          onChange={(e) => setCategoria(e.target.value)} // actualiza el estado al cambiar
        >
          {/* mapeamos el array 'categoriasunicas' para crear las <option> */}
          {categoriasUnicas.map(cat => (
            <option key={cat} value={cat}>
              {cat === 'todos' ? 'Todas las categorias' : cat}
            </option>
          ))}
        </select>
        
        {/* buscador <input> */}
        <input 
          id="buscador" 
          className={styles.buscador} 
          type="search" 
          placeholder="Buscar producto..." 
          value={terminoBusqueda} // controlado por el estado
          onChange={(e) => setTerminoBusqueda(e.target.value)} // actualiza el estado
        />
        {/* este boton actualmente no tiene una funcion 'onclick',
            la busqueda es reactiva (se ejecuta mientras escribes) */}
        <button id="btnBuscar" className="btn btn-primary">
          <Search />
        </button>
      </div>

      {/* contenedor del grid de productos */}
      <div className={styles.contenedorProductos}>
        
        {/* renderizado condicional:
            si hay productos, mapealos y renderiza un 'productcard' por cada uno.
            si no, muestra el mensaje de 'noresultados'.
        */}
        {productosFiltrados.length > 0 ? (
          productosFiltrados.map(producto => (
            <ProductCard 
              key={producto.code} 
              product={producto}
            />
          ))
        ) : (
          <div className={styles.noResultados}>
            {/* usamos iconos de bootstrap (cargados globalmente en main.jsx) */}
            <i className="bi bi-exclamation-triangle"></i> No se encontraron productos.
          </div>
        )}
      </div>
    </>
  );
}