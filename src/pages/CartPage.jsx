import React, { useState } from 'react';
// hook para acceder al contexto del carrito (CartContext.jsx)
import { useCart } from '../context/CartContext';
// funcion de utilidad para formatear precios (formatter.js)
import { PriceFormat } from '../utils/formatter';
import { EmojiFrown, Trash, ArrowLeft } from 'react-bootstrap-icons';
import { Link, useNavigate } from 'react-router-dom'; 
// componente modal para el comprobante (VoucherModal.jsx)
import VoucherModal from '../components/VoucherModal';
// hook para acceder al contexto de autenticacion (AuthContext.jsx)
import { useAuth } from '../context/AuthContext'; 
import toast from 'react-hot-toast';

// importamos los estilos modulares (CartPage.module.css)
import styles from './CartPage.module.css';

/**
 * pagina del carro de compras.
 * muestra los items agregados, permite modificar cantidades,
 * ver el total (con descuentos) y proceder al pago.
 */
export default function CartPage() {
  // estado para controlar la visibilidad del modal de voucher
  const [showVoucher, setShowVoucher] = useState(false);
  
  // estados para guardar una "foto" (snapshot) del carrito al momento de comprar.
  // esto es necesario porque 'clearcart()' borrara el carrito principal,
  // pero el voucher necesita mostrar los datos de la compra que se acaba de hacer.
  const [voucherCart, setVoucherCart] = useState([]);
  const [voucherSubtotal, setVoucherSubtotal] = useState(0); 
  const [voucherDiscount, setVoucherDiscount] = useState(0);
  const [voucherTotal, setVoucherTotal] = useState(0);

  // extraemos todo lo necesario del contexto del carrito
  const {
    cart, subtotal, discount, cartTotal,
    removeItem, increaseQuantity, decreaseQuantity, clearCart,
  } = useCart();

  // extraemos el usuario actual para proteger la compra
  const { currentUser } = useAuth(); 
  const navigate = useNavigate();

  /**
   * manejador para el boton "comprar ahora".
   * valida la sesion, guarda el snapshot del carrito y muestra el voucher.
   */
  const handleCompra = () => {
    // 1. proteger la compra: si no hay usuario, redirigir al login
    if (!currentUser) {
      toast.error("Debes iniciar sesion para comprar.");
      navigate('/login'); 
      return; // corta la ejecucion
    }
    // no hacer nada si el carrito esta vacio
    if (cart.length === 0) return;

    // 2. guardar la "foto" del carrito y los totales en el estado local
    setVoucherCart([...cart]);
    setVoucherSubtotal(subtotal);
    setVoucherDiscount(discount);
    setVoucherTotal(cartTotal);

    // 3. mostrar el voucher y limpiar el carrito principal (del contexto)
    setShowVoucher(true);
    clearCart();
  };

  /**
   * manejador para cerrar el modal del voucher.
   * esta funcion se pasa como prop a <vouchermodal>.
   */
  const handleCloseVoucher = () => {
    setShowVoucher(false);
  };

  // renderizado condicional: si el carrito esta vacio y el voucher no esta activo
  if (cart.length === 0 && !showVoucher) {
    return (
      <div className={styles.contenedorCarrito}>
        <h2 className="titulo-principal">carro de compras</h2>
        <p className={styles.carritoVacio}>
          tu carrito esta vacio <EmojiFrown />
        </p>
        {/* '.btn-volver' es una clase global de style.css */}
        <Link to="/products" className="btn-volver" style={{ textDecoration: 'none', display: 'inline-flex', margin: '0 auto' }}>
          <ArrowLeft /> ir al catalogo
        </Link>
      </div>
    );
  }

  // renderizado principal: carrito con items
  return (
    <>
      <div className={styles.contenedorCarrito}>
        <h2 className="titulo-principal">carro de compras</h2>

        {/* lista de productos en el carrito */}
        <div className={styles.carritoProductos}>
          {cart.map(item => (
            <div className={styles.carritoProducto} key={item.code}>
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
          ))}
        </div>

        {/* resumen del carrito con descuento */}
        <div className={styles.carritoResumen}>
          <div className={styles.resumenTotalContainer}>
            <p className={styles.resumenLinea}>subtotal: <span>{PriceFormat(subtotal)}</span></p>
            {/* renderizado condicional: mostrar descuento solo si es mayor a 0 */}
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
            <button className={styles.btnVaciar} onClick={() => clearCart()}>Vaciar carrito</button>
            <button className={styles.btnComprar} onClick={handleCompra}>
              {/* texto del boton cambia segun si el usuario esta logueado */}
              {currentUser ? "Comprar ahora" : "Inicia sesion para comprar"}
            </button>
          </div>
        </div>
      </div>

      {/* renderizado condicional del modal de voucher */}
      {showVoucher && (
        <VoucherModal
          cart={voucherCart} /* le pasamos la "foto" del carrito */
          subtotal={voucherSubtotal}
          discount={voucherDiscount}
          cartTotal={voucherTotal}
          onClose={handleCloseVoucher} /* le pasamos la funcion para cerrarse */
        />
      )}
    </>
  );
}