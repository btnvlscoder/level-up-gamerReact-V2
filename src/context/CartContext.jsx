import React, { createContext, useContext, useReducer, useMemo, useEffect } from 'react';

// Importamos el contexto de autenticación para aplicar descuentos según el usuario
import { useAuth } from './AuthContext';

// Definimos las acciones posibles que se pueden realizar en el carrito
export const ACTIONS = {
  ADD_ITEM: 'ADD_ITEM',           // Agregar un producto
  REMOVE_ITEM: 'REMOVE_ITEM',     // Eliminar un producto
  INCREASE_QUANTITY: 'INCREASE_QUANTITY', // Aumentar cantidad
  DECREASE_QUANTITY: 'DECREASE_QUANTITY', // Disminuir cantidad
  CLEAR_CART: 'CLEAR_CART',       // Vaciar todo el carrito
};

// REDUCER en lugar de State simple para centralizar lógica compleja
export function cartReducer(state, action) {
  switch (action.type) {
    // AGREGAR AL CARRITO
    case ACTIONS.ADD_ITEM: {
      const product = action.payload;
      // Verifico existencia para NO duplicar filas, sino sumar cantidad
      const existingItem = state.find(item => item.code === product.code);

      if (existingItem) {
        // Creo copia del array con .map y actualizo solo el item modificado
        return state.map(item =>
          item.code === product.code
            ? { ...item, quantity: item.quantity + 1 }
            : item
        );
      } else {
        // Si es nuevo, lo agrego al array inicializando cantidad en 1
        return [...state, { ...product, quantity: 1 }];
      }
    }

    // Eliminar un producto del carrito
    case ACTIONS.REMOVE_ITEM: {
      const code = action.payload;
      // Filtramos el array para quitar el producto con ese código
      return state.filter(item => item.code !== code);
    }

    // Aumentar la cantidad de un producto
    case ACTIONS.INCREASE_QUANTITY: {
      const code = action.payload;
      return state.map(item =>
        item.code === code ? { ...item, quantity: item.quantity + 1 } : item
      );
    }

    // Disminuir la cantidad de un producto
    case ACTIONS.DECREASE_QUANTITY: {
      const code = action.payload;
      return state.map(item =>
        // Solo disminuimos si la cantidad es mayor a 1
        item.code === code && item.quantity > 1
          ? { ...item, quantity: item.quantity - 1 }
          : item
      );
    }

    // Vaciar todo el carrito
    case ACTIONS.CLEAR_CART: {
      return []; // Devolvemos un array vacío
    }
    default:
      return state;
  }
}

// fn para cargar el carrito guardado en localStorage
const getInitialCart = () => {
  try {
    const savedCart = localStorage.getItem('cart-levelup');
    return savedCart ? JSON.parse(savedCart) : [];
  } catch (e) {
    console.error("Error al cargar el carrito desde localstorage", e);
    return [];
  }
};

// Creamos el contexto del carrito
const CartContext = createContext();

// Hook personalizado para usar el contexto del carrito
export function useCart() {
  const context = useContext(CartContext);
  
  // Verificamos que se esté usando dentro del proveedor
  if (!context) {
    throw new Error('Usecart debe ser usado dentro de un cartprovider');
  }
  return context;
}

// Proveedor del contexto del carrito
export function CartProvider({ children }) {
  // Estado global inicializado con LocalStorage (persistencia)
  const [cart, dispatch] = useReducer(cartReducer, [], getInitialCart);
  
  // Obtenemos el usuario actual para aplicar descuentos
  const { currentUser } = useAuth();

  // Efecto secundario para sincronizar cambios con LocalStorage automáticamente
  useEffect(() => {
    localStorage.setItem('cart-levelup', JSON.stringify(cart));
  }, [cart]);

  // Funciones que envuelven las llamadas a dispatch para hacerlas más fáciles de usar
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

  // OPTIMIZACION con useMEMO. Solo recalcula totales si cambia el carrito o el usuario
  const { totalItems, subtotal, discount, cartTotal } = useMemo(() => {
    // sumando todas las cantidades
    const totalItems = cart.reduce((acc, item) => acc + item.quantity, 0);
    // Calculamos el precio * cantidad de cada producto
    const subtotal = cart.reduce((acc, item) => acc + item.price * item.quantity, 0);
    
    let discount = 0;
    // Aplicamos descuento del 10% si el usuario es de Duoc
    if (currentUser && currentUser.tieneDescuentoDuoc) {
      discount = subtotal * 0.10;
    }
    
    // Calculamos el total final restando el descuento
    const cartTotal = subtotal - discount;
    
    return { totalItems, subtotal, discount, cartTotal };
  }, [cart, currentUser]); // Se recalculan solo si cambia el carrito o el usuario

  // Objeto con todos los valores que estarán disponibles en el contexto
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
  
  // Proveemos el contexto a todos los componentes hijos
  return <CartContext.Provider value={value}>{children}</CartContext.Provider>;
}

