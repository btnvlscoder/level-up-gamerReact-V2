import React, { useState } from 'react';

// Importamos la lista de productos desde el archivo de datos
import products from '../data/products';
// Importamos el componente ProductCard para mostrar cada producto
import ProductCard from '../components/ProductCard';
// Importamos el ícono de búsqueda de Bootstrap
import { Search } from 'react-bootstrap-icons';

// Importamos los estilos específicos de esta página
import styles from './productsPage.module.css';

// Creamos un array con las categorías únicas de productos
// Si products es un array, obtenemos las categorías únicas, sino usamos ["todos"]
const categoriasUnicas = Array.isArray(products)
  ? ["todos", ...new Set(products.map(p => p.category))]
  : ["todos"];

export default function ProductsPage() {
  // Estado para guardar la categoría seleccionada en el filtro
  const [categoria, setCategoria] = useState('todos');
  // Estado para guardar el texto de búsqueda
  const [terminoBusqueda, setTerminoBusqueda] = useState('');

  // Filtramos los productos según la categoría y el término de búsqueda
  const productosFiltrados = (Array.isArray(products) ? products : [])
    // Primer filtro: por categoría
    .filter(p => {
      // Si la categoría es "todos", mostramos todos los productos
      return categoria === 'todos' ? true : p.category === categoria;
    })
    // Segundo filtro: por término de búsqueda
    .filter(p => {
      const t = terminoBusqueda.toLowerCase(); // Convertimos a minúsculas para buscar sin importar mayúsculas
      
      // Buscamos en el nombre del producto
      const nombreCoincide = p.name && p.name.toLowerCase().includes(t);
      // Buscamos en la marca del producto
      const marcaCoincide = p.signature && p.signature.toLowerCase().includes(t);
      // Mostramos el producto si coincide en nombre o marca
      return nombreCoincide || marcaCoincide;
    });

  return (
    <>
      {/* Título de la página */}
      <h2 className="titulo-principal">Catalogo de Productos</h2>
      
      {/* Barra de herramientas con filtros y búsqueda */}
      <div className={styles.productosToolbar}>
        
        {/* Select para filtrar por categoría */}
        <select
          id="filtro-categoria"
          className={styles.filtroCategoria}
          value={categoria} // Valor controlado por el estado
          onChange={(e) => setCategoria(e.target.value)} // Actualizamos el estado cuando cambia
        >
          {/* Mapeamos las categorías únicas para crear las opciones */}
          {categoriasUnicas.map(cat => (
            <option key={cat} value={cat}>
              {/* Mostramos texto amigable para "todos" */}
              {cat === 'todos' ? 'Todas las categorias' : cat}
            </option>
          ))}
        </select>

        {/* Input para buscar productos */}
        <input
          id="buscador"
          className={styles.buscador}
          type="search"
          placeholder="Buscar producto..."
          value={terminoBusqueda} // Valor controlado por el estado
          onChange={(e) => setTerminoBusqueda(e.target.value)} // Actualizamos el estado cuando escribe
        />
        {/* Botón de búsqueda (actualmente decorativo, la búsqueda es en tiempo real) */}
        <button id="btnBuscar" className="btn btn-primary">
          <Search />
        </button>
      </div>

      {/* Contenedor donde se muestran los productos */}
      <div className={styles.contenedorProductos}>
        
        {/* Si hay productos filtrados, los mostramos */}
        {productosFiltrados.length > 0 ? (
          productosFiltrados.map(producto => (
            <ProductCard
              key={producto.code} // Key única para cada producto
              product={producto}   // Pasamos el producto como prop
            />
          ))
        ) : (
          /* Si no hay resultados, mostramos mensaje */
          <div className={styles.noResultados}>
            <i className="bi bi-exclamation-triangle"></i> No se encontraron productos.
          </div>
        )}
      </div>
    </>
  );
}