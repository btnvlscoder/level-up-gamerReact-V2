// Contenido de: src/pages/CartPage.jsx (Refactorizado con CSS Modules)

import React, { useState } from 'react';
import { useCart } from '../context/CartContext';
import { PriceFormat } from '../utils/formatter';
import { EmojiFrown, Trash, ArrowLeft } from 'react-bootstrap-icons';
import { Link, useNavigate } from 'react-router-dom'; 
import VoucherModal from '../components/VoucherModal';
import { useAuth } from '../context/AuthContext'; 
import toast from 'react-hot-toast';

// 1. Importar los estilos del módulo
import styles from './CartPage.module.css';

export default function CartPage() {
  const [showVoucher, setShowVoucher] = useState(false);
  
  // Estados para el voucher (sin cambios)
  const [voucherCart, setVoucherCart] = useState([]);
  const [voucherSubtotal, setVoucherSubtotal] = useState(0); 
  const [voucherDiscount, setVoucherDiscount] = useState(0);
  const [voucherTotal, setVoucherTotal] = useState(0);

  const {
    cart, subtotal, discount, cartTotal,
    removeItem, increaseQuantity, decreaseQuantity, clearCart,
  } = useCart();

  const { currentUser } = useAuth(); 
  const navigate = useNavigate();

  const handleCompra = () => {
    if (!currentUser) {
      toast.error("Debes iniciar sesión para comprar.");
      navigate('/login'); 
      return;
    }
    if (cart.length === 0) return;

    setVoucherCart([...cart]);
    setVoucherSubtotal(subtotal);
    setVoucherDiscount(discount);
    setVoucherTotal(cartTotal);
    setShowVoucher(true);
    clearCart();
  };

  const handleCloseVoucher = () => {
    setShowVoucher(false);
  };

  // 2. Usar el objeto 'styles'
  if (cart.length === 0 && !showVoucher) {
    return (
      <div className={styles.contenedorCarrito}>
        <h2 className="titulo-principal">Carro de compras</h2>
        <p className={styles.carritoVacio}>
          Tu carrito está vacío <EmojiFrown />
        </p>
        {/* 3. El botón 'btn-volver' es global, lo dejamos */ }
        <Link to="/products" className="btn-volver" style={{ textDecoration: 'none', display: 'inline-flex', margin: '0 auto' }}>
          <ArrowLeft /> Ir al catálogo
        </Link>
      </div>
    );
  }

  // Vista de Carrito con Items
  return (
    <>
      <div className={styles.contenedorCarrito}>
        <h2 className="titulo-principal">Carro de compras</h2>

        <div className={styles.carritoProductos}>
          {cart.map(item => (
            <div className={styles.carritoProducto} key={item.code}>
              <img src={item.img[0]} alt={item.name} className={styles.carritoProductoImagen} />
              
              <div className={styles.carritoProductoInfo}>
                <h3 className={styles.carritoProductoNombre}>{item.name}</h3>
                <p className={styles.carritoProductoMarca}>{item.signature}</p>
              </div>
              
              <div className={styles.carritoProductoPrecioContainer}>
                <span className={styles.etiqueta}>Precio</span>
                <span className={styles.carritoProductoPrecio}>{PriceFormat(item.price)}</span>
              </div>
              
              <div className={styles.carritoProductoCantidadContainer}>
                <span className={styles.etiqueta}>Cantidad</span>
                <div className={styles.carritoProductoControls}>
                  <button className={styles.cantidadBtn} onClick={() => decreaseQuantity(item.code)}>-</button>
                  <input type="number" className={styles.cantidadNumero} value={item.quantity} readOnly />
                  <button className={styles.cantidadBtn} onClick={() => increaseQuantity(item.code)}>+</button>
                </div>
              </div>
              
              <div className={styles.carritoProductoSubtotalContainer}>
                <span className={styles.etiqueta}>Subtotal</span>
                <span className={styles.carritoProductoSubtotal}>{PriceFormat(item.price * item.quantity)}</span>
              </div>
              
              <div className={styles.carritoProductoEliminarContainer}>
                <span className={styles.etiqueta}>Eliminar</span>
                <button className={styles.carritoProductoEliminar} onClick={() => removeItem(item.code)}>
                  <Trash />
                </button>
              </div>
            </div>
          ))}
        </div>

        {/* Resumen del Carrito con Descuento */}
        <div className={styles.carritoResumen}>
          <div className={styles.resumenTotalContainer}> {/* Renombrado para evitar conflicto con resumenTotal de JS */ }
            <p className={styles.resumenLinea}>Subtotal: <span>{PriceFormat(subtotal)}</span></p>
            {discount > 0 && (
              <p className={`${styles.resumenLinea} ${styles.descuento}`}>
                Descuento Duoc (10%): <span>- {PriceFormat(discount)}</span>
              </p>
            )}
            <p className={`${styles.resumenLinea} ${styles.total}`}>
              Total: <span>{PriceFormat(cartTotal)}</span>
            </p>
          </div>

          <div className={styles.carritoBotones}>
            <button className={styles.btnVaciar} onClick={() => clearCart()}>Vaciar carrito</button>
            <button className={styles.btnComprar} onClick={handleCompra}>
              {currentUser ? "Comprar ahora" : "Inicia sesión para comprar"}
            </button>
          </div>
        </div>
      </div>

      {/* Voucher Modal (Este componente usa sus propios estilos) */}
      {showVoucher && (
        <VoucherModal
          cart={voucherCart}
          subtotal={voucherSubtotal}
          discount={voucherDiscount}
          cartTotal={voucherTotal}
          onClose={handleCloseVoucher}
        />
      )}
    </>
  );
}