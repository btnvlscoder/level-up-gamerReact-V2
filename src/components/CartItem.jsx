import React from 'react';
import { PriceFormat } from '../utils/formatter';
import { Trash } from 'react-bootstrap-icons';
import styles from '../pages/CartPage.module.css';

export default function CartItem({ item, removeItem, increaseQuantity, decreaseQuantity }) {
  return (
    <div className={styles.carritoProducto}>
      <img src={item.img[0]} alt={item.name} className={styles.carritoProductoImagen} />
      <div className={styles.carritoProductoInfo}>
        <h3 className={styles.carritoProductoNombre}>{item.name}</h3>
        <p className={styles.carritoProductoMarca}>{item.signature}</p>
      </div>
      <div className={styles.carritoProductoPrecioContainer}>
        <span className={styles.etiqueta}>precio</span>
        <span className={styles.carritoProductoPrecio}>{PriceFormat(item.price)}</span>
      </div>
      <div className={styles.carritoProductoCantidadContainer}>
        <span className={styles.etiqueta}>cantidad</span>
        <div className={styles.carritoProductoControls}>
          <button className={styles.cantidadBtn} onClick={() => decreaseQuantity(item.code)}>-</button>
          <input type="number" className={styles.cantidadNumero} value={item.quantity} readOnly />
          <button className={styles.cantidadBtn} onClick={() => increaseQuantity(item.code)}>+</button>
        </div>
      </div>
      <div className={styles.carritoProductoSubtotalContainer}>
        <span className={styles.etiqueta}>subtotal</span>
        <span className={styles.carritoProductoSubtotal}>{PriceFormat(item.price * item.quantity)}</span>
      </div>
      <div className={styles.carritoProductoEliminarContainer}>
        <span className={styles.etiqueta}>eliminar</span>
        <button className={styles.carritoProductoEliminar} onClick={() => removeItem(item.code)}>
          <Trash />
        </button>
      </div>
    </div>
  );
}