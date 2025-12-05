import React from "react";

import { Link } from "react-router-dom";
import { Cart } from "react-bootstrap-icons";
import { PriceFormat } from '../utils/formatter.js';

import { useCart } from '../context/CartContext';
import { notifyAddToCart } from '../utils/notifications.js';

import styles from './ProductCard.module.css';

function ProductCard({ product }) {
  const { addItem } = useCart();

  // Extraemos las prop. de producto
  const { code, name, signature, price, img } = product;

  // Definimos la URL de la imagen - usamos la primera imagen o una imagen por defecto
  const imageUrl = img && img.length > 0 ? img[0] : '/img/placeholder.jpg';

  // fn para el btn "Agregar al carrito"
  const handleAddToCart = () => {
    addItem(product);
    notifyAddToCart(name);
  }

  return (
    // Contenedor de la tarjeta prod.
    <div className={styles.product}>
      {/* img del producto con link al detalle del prod.*/}
      <Link to={`/product/${code}`}>
        <img className={styles.productImg} src={imageUrl} alt={name} />
      </Link>
      
      {/* Contenedor con la info del producto */}
      <div className={styles.productDetails}>
        {/* Mostramos la marca del producto si existe */}
        {signature && <p className={styles.productSignature}>{signature}</p>}
        
        {/* Nombre prod+ link al detalle del prod*/}
        <h3 className={styles.productTitle}>
          <Link to={`/product/${code}`}>{name}</Link>
        </h3>

        {/* formateo de precio*/}
        <p className={styles.price}>{PriceFormat(price)}</p>

        {/* btn add carrito*/}
        <button className={styles.productAdd} onClick={handleAddToCart} data-code={code}>
          <Cart /> agregar
        </button>
      </div>
    </div>
  );
}

export default ProductCard;
