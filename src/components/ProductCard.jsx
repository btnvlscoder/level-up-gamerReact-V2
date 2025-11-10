import React from "react";

// Importamos Link para navegar a la página de detalle del producto
import { Link } from "react-router-dom";
// Importamos el ícono del carrito de Bootstrap
import { Cart } from "react-bootstrap-icons";
// Importamos la función para formatear precios
import { PriceFormat } from '../utils/formatter.js';

// Importamos el contexto del carrito para agregar productos
import { useCart } from '../context/CartContext';
// Importamos toast para mostrar notificaciones
import toast from 'react-hot-toast';

// Importamos los estilos específicos de este componente
import styles from './ProductCard.module.css';

// Componente que muestra una tarjeta de producto individual
function ProductCard({ product }) {
  // Obtenemos la función para agregar productos al carrito
  const { addItem } = useCart();

  // Extraemos las propiedades del producto para usarlas más fácilmente
  const { code, name, signature, price, img } = product;

  // Definimos la URL de la imagen - usamos la primera imagen o una imagen por defecto
  const imageUrl = img && img.length > 0 ? img[0] : '/img/placeholder.jpg';

  // Función que se ejecuta al hacer clic en "Agregar al carrito"
  const handleAddToCart = () => {
    addItem(product); // Agregamos el producto al carrito
    toast.success(`"${name}" agregado al carrito!`); // Mostramos notificación de éxito
  }

  return (
    // Contenedor principal de la tarjeta de producto
    <div className={styles.product}>
      {/* Imagen del producto que es un enlace a su página de detalle */}
      <Link to={`/product/${code}`}>
        <img className={styles.productImg} src={imageUrl} alt={name} />
      </Link>
      
      {/* Contenedor con la información del producto */}
      <div className={styles.productDetails}>
        {/* Mostramos la marca del producto si existe */}
        {signature && <p className={styles.productSignature}>{signature}</p>}
        
        {/* Nombre del producto que también es un enlace al detalle */}
        <h3 className={styles.productTitle}>
          <Link to={`/product/${code}`}>{name}</Link>
        </h3>

        {/* Precio del producto formateado */}
        <p className={styles.price}>{PriceFormat(price)}</p>

        {/* Botón para agregar el producto al carrito */}
        <button className={styles.productAdd} onClick={handleAddToCart} data-code={code}>
          <Cart /> agregar
        </button>
      </div>
    </div>
  );
}

export default ProductCard;