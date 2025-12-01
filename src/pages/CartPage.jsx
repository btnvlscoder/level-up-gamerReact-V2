import React, { useState } from 'react';

// Importamos el contexto del carrito para manejar los productos
import { useCart } from '../context/CartContext';
// Importamos la fn para formatear precios

// Importamos íconos de Bootstrap
import { EmojiFrown } from 'react-bootstrap-icons';
import { useNavigate } from 'react-router-dom';
// Importamos el modal del voucher que se muestra después de comprar
import VoucherModal from '../components/VoucherModal';
// Importamos el contexto de autenticación para verificar si el usuario está logueado
import { useAuth } from '../context/AuthContext';
import toast from 'react-hot-toast';

// Importamos los estilos específicos de esta página
import styles from './CartPage.module.css';
import CartItem from '../components/CartItem';
import CartSummary from '../components/CartSummary';
import BackToCatalogLink from '../components/BackToCatalogLink';

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
        <BackToCatalogLink style={{ textDecoration: 'none', display: 'inline-flex', margin: '0 auto' }}>
          ir al catalogo
        </BackToCatalogLink>
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
            <CartItem
              key={item.code}
              item={item}
              removeItem={removeItem}
              increaseQuantity={increaseQuantity}
              decreaseQuantity={decreaseQuantity}
            />
          ))}
        </div>

        <CartSummary
          subtotal={subtotal}
          discount={discount}
          cartTotal={cartTotal}
          onClear={clearCart}
          onBuy={handleCompra}
          isLoggedIn={!!currentUser}
        />
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
