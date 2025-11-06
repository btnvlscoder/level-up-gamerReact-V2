import React from "react";
// 'link' se usa para navegar a la pagina de detalle del producto
import { Link } from "react-router-dom";
// icono para el boton "agregar"
import { Cart } from "react-bootstrap-icons";
// funcion de utilidad para formatear el precio (formatter.js)
import { PriceFormat } from '../utils/formatter.js';

// hook para acceder al contexto del carrito (CartContext.jsx)
import { useCart } from '../context/CartContext'; 
// para mostrar notificaciones (ej. "producto agregado")
import toast from 'react-hot-toast'; 

// importamos los estilos modulares (ProductCard.module.css)
import styles from './ProductCard.module.css';

/**
 * componente 'productcard'.
 * muestra una tarjeta individual de producto para el catalogo.
 * @param {object} props
 * @param {object} props.product - el objeto del producto a mostrar (desde products.js).
 */
function ProductCard({product}) {
  // extraemos la funcion 'additem' del contexto del carrito
  const { addItem } = useCart(); 

  // desestructuramos los datos del producto para un acceso mas facil
  const {code, name, signature, price, img} = product;
  
  // logica para la imagen: usa la primera imagen (indice 0) del array 'img',
  // o usa una imagen 'placeholder' si el array esta vacio o no existe.
  const imageUrl = img && img.length > 0 ? img[0] : '/img/placeholder.jpg';

  /**
   * manejador para el boton "agregar".
   */
  const handleAddToCart = () => {
    addItem(product); // anade este producto al contexto del carrito
    toast.success(`"${name}" agregado al carrito!`); // muestra notificacion
  }

  return (
    // usamos las clases del modulo de estilos
    <div className={styles.product}>
      {/* la imagen y el titulo son enlaces a la pagina de detalle (ej. /product/jm001) */}
      <Link to={`/product/${code}`}>
        <img className={styles.productImg} src={imageUrl} alt={name} />
      </Link>
      <div className={styles.productDetails}>
        {/* renderizado condicional: solo muestra la marca si existe */}
        {signature && <p className={styles.productSignature}>{signature}</p>}
        <h3 className={styles.productTitle}>
          <Link to={`/product/${code}`}>{name}</Link>
        </h3>
        
        {/* usamos la funcion 'priceformat' para mostrar el precio */}
        <p className={styles.price}>{PriceFormat(price)}</p>
        
        <button className={styles.productAdd} onClick={handleAddToCart} data-code={code}>
          <Cart /> agregar
        </button>
      </div>
    </div>
  );
}

export default ProductCard;