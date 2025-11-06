import React, { createContext, useContext, useReducer, useMemo, useEffect } from 'react';
// importamos 'useauth' porque el carrito necesita saber quien es el 'currentuser'
// para aplicar el descuento de duoc.
import { useAuth } from './AuthContext';

/*
   definicion de acciones
*/
// 'actions' son constantes que describen las "ordenes" que podemos enviar al reducer.
export const ACTIONS = {
  ADD_ITEM: 'ADD_ITEM',
  REMOVE_ITEM: 'REMOVE_ITEM',
  INCREASE_QUANTITY: 'INCREASE_QUANTITY',
  DECREASE_QUANTITY: 'DECREASE_QUANTITY',
  CLEAR_CART: 'CLEAR_CART',
};

/*
   funcion reductora (logica de estado)
*/
/**
 * 'cartreducer' es una funcion pura que toma el estado actual y una accion,
 * y devuelve un nuevo estado. maneja toda la logica del carrito.
 * @param {array} state - el estado actual del carrito (un array de productos).
 * @param {object} action - la accion a ejecutar (ej. { type: 'ADD_ITEM', payload: producto }).
 */
export function cartReducer(state, action) {
  switch (action.type) {
    // caso para anadir un producto
    case ACTIONS.ADD_ITEM: {
      const product = action.payload;
      const existingItem = state.find(item => item.code === product.code);

      if (existingItem) {
        // si el item ya existe, mapeamos el estado y solo incrementamos la cantidad de ese item
        return state.map(item =>
          item.code === product.code
            ? { ...item, quantity: item.quantity + 1 }
            : item
        );
      } else {
        // si es un item nuevo, lo agregamos al array con cantidad 1
        return [...state, { ...product, quantity: 1 }];
      }
    }
    // caso para eliminar un producto (por su 'code')
    case ACTIONS.REMOVE_ITEM: {
      const code = action.payload;
      // filtramos el estado, devolviendo un nuevo array sin el item
      return state.filter(item => item.code !== code);
    }
    // caso para incrementar la cantidad
    case ACTIONS.INCREASE_QUANTITY: {
      const code = action.payload;
      return state.map(item =>
        item.code === code ? { ...item, quantity: item.quantity + 1 } : item
      );
    }
    // caso para decrementar la cantidad
    case ACTIONS.DECREASE_QUANTITY: {
      const code = action.payload;
      return state.map(item =>
        // solo decrementamos si la cantidad es mayor a 1
        item.code === code && item.quantity > 1
          ? { ...item, quantity: item.quantity - 1 }
          : item
      );
    }
    // caso para vaciar el carrito
    case ACTIONS.CLEAR_CART: {
      return []; // devolvemos un array vacio
    }
    default:
      return state;
  }
}

/**
 * funcion helper para cargar el carrito guardado en localstorage.
 * esto permite que el carrito persista despues de recargar la pagina.
 * @returns {array} - el carrito guardado o un array vacio.
 */
const getInitialCart = () => {
  try {
    const savedCart = localStorage.getItem('cart-levelup');
    return savedCart ? JSON.parse(savedCart) : [];
  } catch (e) {
    console.error("Error al cargar el carrito desde localstorage", e);
    return [];
  }
};

// 1. creamos el contexto del carrito
const CartContext = createContext();

// 2. creamos el proveedor del contexto
/**
 * componente proveedor que envuelve la aplicacion y maneja el estado del carrito.
 * @param {object} props - props de react, 'children' son los componentes hijos.
 */
export function CartProvider({ children }) {
  // 'usereducer' es un hook para manejar estados complejos.
  // 'cart' es el estado actual.
  // 'dispatch' es la funcion para enviar acciones al 'cartreducer'.
  // 'getinitialcart()' es la funcion que define el estado inicial (desde localstorage).
  const [cart, dispatch] = useReducer(cartReducer, [], getInitialCart);
  
  // obtenemos el 'currentuser' del 'authcontext'
  const { currentUser } = useAuth();

  // 'useeffect' para persistir el carrito en localstorage.
  // se ejecuta cada vez que el estado 'cart' cambia.
  useEffect(() => {
    localStorage.setItem('cart-levelup', JSON.stringify(cart));
  }, [cart]);

  /*
     wrappers de dispatch
     estas funciones "envuelven" la llamada a 'dispatch' para que
     los componentes (ej. productcard.jsx) no tengan que saber
     la estructura de las acciones (type, payload).
  */
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

  /*
     calculo de totales (con descuento)
     usamos 'usememo' para "memorizar" el resultado de estos calculos.
     esto evita que los totales se recalculen en cada renderizado,
     solo se recalculan si 'cart' o 'currentuser' cambian.
  */
  const { totalItems, subtotal, discount, cartTotal } = useMemo(() => {
    // calculamos el numero total de items (sumando cantidades)
    const totalItems = cart.reduce((acc, item) => acc + item.quantity, 0);
    // calculamos el subtotal (precio * cantidad)
    const subtotal = cart.reduce((acc, item) => acc + item.price * item.quantity, 0);
    
    let discount = 0;
    // logica de negocio: aplicar descuento si el usuario es de duoc
    if (currentUser && currentUser.tieneDescuentoDuoc) {
      discount = subtotal * 0.10; // 10% de descuento
    }
    
    const cartTotal = subtotal - discount;
    
    return { totalItems, subtotal, discount, cartTotal };
  }, [cart, currentUser]); // dependencias: recalcular solo si esto cambia

  // 'value' es el objeto que compartimos a traves del contexto
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

/**
 * hook personalizado para consumir el contexto del carrito.
 * @returns {object} - el valor del contexto del carrito.
 */
export function useCart() {
  const context = useContext(CartContext);
  // 'if' de guarda: si 'context' es indefinido, significa que 'usecart'
  // se esta usando fuera de un 'cartprovider', lo cual es un error.
  if (!context) {
    throw new Error('Usecart debe ser usado dentro de un cartprovider');
  }
  return context;
}