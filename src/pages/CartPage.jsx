import React, { useState } from 'react';

// Importamos el contexto del carrito para manejar los productos
import { useCart } from '../context/CartContext';
// Importamos la fn para formatear precios
import { PriceFormat } from '../utils/formatter';
// Importamos íconos de Bootstrap
import { EmojiFrown, Trash, ArrowLeft } from 'react-bootstrap-icons';
import { Link, useNavigate } from 'react-router-dom';
// Importamos el modal del voucher que se muestra después de comprar
import VoucherModal from '../components/VoucherModal';
// Importamos el contexto de autenticación para verificar si el usuario está logueado
import { useAuth } from '../context/AuthContext';
import toast from 'react-hot-toast';

// Importamos los estilos específicos de esta página
import styles from './CartPage.module.css';

export default function CartPage() {
  // Estado para controlar si mostrar el modal del voucher
  const [showVoucher, setShowVoucher] = useState(false);
  
  // Estados para guardar una "foto" del carrito al momento de comprar
  // (necesario porque clearCart() borra el carrito principal)
  const [voucherCart, setVoucherCart] = useState([]);
  const [voucherSubtotal, setVoucherSubtotal] = useState(0);
  const [voucherDiscount, setVoucherDiscount] = useState(0);
  const [voucherTotal, setVoucherTotal] = useState(0);

  // Obtenemos todas las funciones y datos del carrito del contexto
  const {
    cart, subtotal, discount, cartTotal,
    removeItem, increaseQuantity, decreaseQuantity, clearCart,
  } = useCart();

  // Obtenemos el usuario actual para verificar si está logueado
  const { currentUser } = useAuth();
  const navigate = useNavigate();

  // fn para manejar la compra
  const handleCompra = () => {
    // Si el usuario no está logueado, mostramos error y redirigimos al login
    if (!currentUser) {
      toast.error("Debes iniciar sesion para comprar.");
      navigate('/login');
      return;
    }

    // Si el carrito está vacío, no hacemos nada
    if (cart.length === 0) return;

    // Guardamos una "foto" del carrito actual en los estados del voucher
    setVoucherCart([...cart]);
    setVoucherSubtotal(subtotal);
    setVoucherDiscount(discount);
    setVoucherTotal(cartTotal);

    // Mostramos el modal del voucher y limpiamos el carrito principal
    setShowVoucher(true);
    clearCart();
  };

  // fn para cerrar el modal del voucher
  const handleCloseVoucher = () => {
    setShowVoucher(false);
  };

  // Si el carrito está vacío y no estamos mostrando el voucher, mostramos mensaje
  if (cart.length === 0 && !showVoucher) {
    return (
      <div className={styles.contenedorCarrito}>
        <h2 className="titulo-principal">Carro de Compras</h2>
        <p className={styles.carritoVacio}>
          tu carrito esta vacio <EmojiFrown />
        </p>
        {/* Enlace para volver al catálogo */}
        <Link to="/products" className="btn-volver" style={{ textDecoration: 'none', display: 'inline-flex', margin: '0 auto' }}>
          <ArrowLeft /> ir al catalogo
        </Link>
      </div>
    );
  }

  // Renderizado principal cuando hay productos en el carrito
  return (
    <>
      <div className={styles.contenedorCarrito}>
        <h2 className="titulo-principal">carro de compras</h2>

        {/* Lista de productos en el carrito */}
        <div className={styles.carritoProductos}>
          {cart.map(item => (
            <div className={styles.carritoProducto} key={item.code}>
              {/* Imagen del producto */}
              <img src={item.img[0]} alt={item.name} className={styles.carritoProductoImagen} />

              {/* Información del producto (nombre y marca) */}
              <div className={styles.carritoProductoInfo}>
                <h3 className={styles.carritoProductoNombre}>{item.name}</h3>
                <p className={styles.carritoProductoMarca}>{item.signature}</p>
              </div>

              {/* Precio unitario del producto */}
              <div className={styles.carritoProductoPrecioContainer}>
                <span className={styles.etiqueta}>precio</span>
                <span className={styles.carritoProductoPrecio}>{PriceFormat(item.price)}</span>
              </div>

              {/* Controles para cambiar la cantidad */}
              <div className={styles.carritoProductoCantidadContainer}>
                <span className={styles.etiqueta}>cantidad</span>
                <div className={styles.carritoProductoControls}>
                  <button className={styles.cantidadBtn} onClick={() => decreaseQuantity(item.code)}>-</button>
                  <input type="number" className={styles.cantidadNumero} value={item.quantity} readOnly />
                  <button className={styles.cantidadBtn} onClick={() => increaseQuantity(item.code)}>+</button>
                </div>
              </div>

              {/* Subtotal (precio * cantidad) */}
              <div className={styles.carritoProductoSubtotalContainer}>
                <span className={styles.etiqueta}>subtotal</span>
                <span className={styles.carritoProductoSubtotal}>{PriceFormat(item.price * item.quantity)}</span>
              </div>

              {/* Botón para eliminar el producto del carrito */}
              <div className={styles.carritoProductoEliminarContainer}>
                <span className={styles.etiqueta}>eliminar</span>
                <button className={styles.carritoProductoEliminar} onClick={() => removeItem(item.code)}>
                  <Trash />
                </button>
              </div>
            </div>
          ))}
        </div>

        {/* Resumen del carrito con totales */}
        <div className={styles.carritoResumen}>
          <div className={styles.resumenTotalContainer}>
            <p className={styles.resumenLinea}>subtotal: <span>{PriceFormat(subtotal)}</span></p>
            {/* Solo mostramos descuento si es mayor a 0 */}
            {discount > 0 && (
              <p className={`${styles.resumenLinea} ${styles.descuento}`}>
                descuento duoc (10%): <span>- {PriceFormat(discount)}</span>
              </p>
            )}
            <p className={`${styles.resumenLinea} ${styles.total}`}>
              total: <span>{PriceFormat(cartTotal)}</span>
            </p>
          </div>

          {/* Botones de acción */}
          <div className={styles.carritoBotones}>
            <button className={styles.btnVaciar} onClick={() => clearCart()}>Vaciar carrito</button>
            <button className={styles.btnComprar} onClick={handleCompra}>
              {/* El texto del botón cambia según si el usuario está logueado o no */}
              {currentUser ? "Comprar ahora" : "Inicia sesion para comprar"}
            </button>
          </div>
        </div>
      </div>

      {/* Mostramos el modal del voucher si showVoucher es true */}
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