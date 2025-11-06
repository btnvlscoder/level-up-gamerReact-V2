// Contenido de: src/components/ProductCard.jsx (Refactorizado con CSS Modules)

import React from "react";
import { Link } from "react-router-dom";
import { Cart } from "react-bootstrap-icons";
import { PriceFormat } from '../utils/formatter.js';

import { useCart } from '../context/CartContext'; 
import toast from 'react-hot-toast'; 

// 1. Importamos los estilos del módulo
import styles from './ProductCard.module.css';

function ProductCard({product}) {
  const { addItem } = useCart(); 

  const {code, name, signature, price, img} = product;
  const imageUrl = img && img.length > 0 ? img[0] : '/img/placeholder.jpg';

  const handleAddToCart = () => {
    addItem(product); 
    toast.success(`"${name}" agregado al carrito!`); 
  }

  return (
    // 2. Usamos el objeto 'styles' para las clases
    <div className={styles.product}>
      <Link to={`/product/${code}`}>
        <img className={styles.productImg} src={imageUrl} alt={name} />
      </Link>
      <div className={styles.productDetails}>
        {signature && <p className={styles.productSignature}>{signature}</p>}
        <h3 className={styles.productTitle}>
          <Link to={`/product/${code}`}>{name}</Link>
        </h3>
        {/* 3. Aplicamos el nuevo estilo de precio */ }
        <p className={styles.price}>{PriceFormat(price)}</p>
        
        <button className={styles.productAdd} onClick={handleAddToCart} data-code={code}>
          <Cart /> Agregar
        </button>
      </div>
    </div>
  );
}

export default ProductCard;