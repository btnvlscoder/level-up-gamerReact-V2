import React from 'react';
import { PriceFormat } from '../utils/formatter';
import styles from '../pages/CartPage.module.css';

export default function CartSummary({ subtotal, discount, cartTotal, onClear, onBuy, isLoggedIn }) {
  return (
    <div className={styles.carritoResumen}>
      <div className={styles.resumenTotalContainer}>
        <p className={styles.resumenLinea}>subtotal: <span>{PriceFormat(subtotal)}</span></p>
        {discount > 0 && (
          <p className={`${styles.resumenLinea} ${styles.descuento}`}>
            descuento duoc (10%): <span>- {PriceFormat(discount)}</span>
          </p>
        )}
        <p className={`${styles.resumenLinea} ${styles.total}`}>
          total: <span>{PriceFormat(cartTotal)}</span>
        </p>
      </div>
      <div className={styles.carritoBotones}>
        <button className={styles.btnVaciar} onClick={onClear}>Vaciar carrito</button>
        <button className={styles.btnComprar} onClick={onBuy}>
          {isLoggedIn ? 'Comprar ahora' : 'Inicia sesion para comprar'}
        </button>
      </div>
    </div>
  );
}