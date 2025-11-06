// Contenido de: src/context/CartContext.jsx (Funcionalidad Completa Pre-Refactorización)

import React, { createContext, useContext, useReducer, useMemo, useEffect } from 'react';
import { useAuth } from './AuthContext';

// --- DEFINICIÓN DE ACCIONES ---
export const ACTIONS = {
  ADD_ITEM: 'ADD_ITEM',
  REMOVE_ITEM: 'REMOVE_ITEM',
  INCREASE_QUANTITY: 'INCREASE_QUANTITY',
  DECREASE_QUANTITY: 'DECREASE_QUANTITY',
  CLEAR_CART: 'CLEAR_CART',
};

// --- FUNCIÓN REDUCTORA (Lógica de Estado) ---
export function cartReducer(state, action) {
  switch (action.type) {
    case ACTIONS.ADD_ITEM: {
      const product = action.payload;
      const existingItem = state.find(item => item.code === product.code);

      if (existingItem) {
        return state.map(item =>
          item.code === product.code
            ? { ...item, quantity: item.quantity + 1 }
            : item
        );
      } else {
        return [...state, { ...product, quantity: 1 }];
      }
    }
    case ACTIONS.REMOVE_ITEM: {
      const code = action.payload;
      return state.filter(item => item.code !== code);
    }
    case ACTIONS.INCREASE_QUANTITY: {
      const code = action.payload;
      return state.map(item =>
        item.code === code ? { ...item, quantity: item.quantity + 1 } : item
      );
    }
    case ACTIONS.DECREASE_QUANTITY: {
      const code = action.payload;
      return state.map(item =>
        item.code === code && item.quantity > 1
          ? { ...item, quantity: item.quantity - 1 }
          : item
      );
    }
    case ACTIONS.CLEAR_CART: {
      return [];
    }
    default:
      return state;
  }
}

// Función para obtener el estado inicial del carrito desde localStorage (Persistencia)
const getInitialCart = () => {
  try {
    const savedCart = localStorage.getItem('cart-levelup');
    return savedCart ? JSON.parse(savedCart) : [];
  } catch (e) {
    console.error("Error al cargar el carrito desde localStorage", e);
    return [];
  }
};

const CartContext = createContext();

// Proveedor del contexto del carrito
export function CartProvider({ children }) {
  const [cart, dispatch] = useReducer(cartReducer, [], getInitialCart);
  
  // Obtener el usuario actual desde AuthContext
  const { currentUser } = useAuth();

  // EFECTO: Guardar en localStorage cada vez que el carrito cambia
  useEffect(() => {
    localStorage.setItem('cart-levelup', JSON.stringify(cart));
  }, [cart]);

  // Wrappers de Dispatch
  const addItem = (product) => {
    dispatch({ type: ACTIONS.ADD_ITEM, payload: product });
  };
  const removeItem = (code) => {
    dispatch({ type: ACTIONS.REMOVE_ITEM, payload: code });
  };
  const increaseQuantity = (code) => {
    dispatch({ type: ACTIONS.INCREASE_QUANTITY, payload: code });
  };
  const decreaseQuantity = (code) => {
    dispatch({ type: ACTIONS.DECREASE_QUANTITY, payload: code });
  };
  const clearCart = () => {
    dispatch({ type: ACTIONS.CLEAR_CART });
  };

  // CÁLCULO DE TOTALES (con Descuento)
  const { totalItems, subtotal, discount, cartTotal } = useMemo(() => {
    const totalItems = cart.reduce((acc, item) => acc + item.quantity, 0);
    const subtotal = cart.reduce((acc, item) => acc + item.price * item.quantity, 0);
    
    let discount = 0;
    // Aplicar descuento si el usuario está logueado y tiene el beneficio
    if (currentUser && currentUser.tieneDescuentoDuoc) {
      discount = subtotal * 0.10; // 10% de descuento
    }
    
    const cartTotal = subtotal - discount;
    
    return { totalItems, subtotal, discount, cartTotal };
  }, [cart, currentUser]); // Depende de cart Y currentUser

  const value = {
    cart,
    addItem,
    removeItem,
    increaseQuantity,
    decreaseQuantity,
    clearCart,
    totalItems,
    subtotal,
    discount,
    cartTotal,
  };

  return <CartContext.Provider value={value}>{children}</CartContext.Provider>;
}

export function useCart() {
  const context = useContext(CartContext);
  if (!context) {
    throw new Error('useCart debe ser usado dentro de un CartProvider');
  }
  return context;
}