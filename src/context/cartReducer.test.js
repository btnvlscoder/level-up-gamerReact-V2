// Contenido de src/context/cartReducer.test.js (Funcionalidad Completa Pre-Refactorización)

import { describe, it, expect } from 'vitest';
// Importamos el reducer y las acciones que acabamos de exportar
import { cartReducer, ACTIONS } from './CartContext.jsx'; 

// Un producto de prueba
const mockProduct = {
  code: "JM001",
  name: "Catan",
  price: 29990
};

describe('cartReducer', () => {

  it('debe añadir un nuevo producto al carrito (ADD_ITEM)', () => {
    const initialState = []; 
    const action = { type: ACTIONS.ADD_ITEM, payload: mockProduct };
    
    const newState = cartReducer(initialState, action);
    
    // 1. Comprobamos que el carrito ahora tiene 1 item
    expect(newState.length).toBe(1);
    // 2. Comprobamos que el item añadido es el correcto y tiene cantidad 1
    expect(newState[0]).toEqual({ ...mockProduct, quantity: 1 });
  });

  it('debe incrementar la cantidad de un producto existente (ADD_ITEM)', () => {
    // Empezamos con un carrito que YA tiene el Catan
    const initialState = [
      { ...mockProduct, quantity: 1 }
    ];
    const action = { type: ACTIONS.ADD_ITEM, payload: mockProduct };
    
    const newState = cartReducer(initialState, action);
    
    // 1. Comprobamos que el carrito sigue teniendo 1 item (no 2)
    expect(newState.length).toBe(1);
    // 2. Comprobamos que la cantidad de ese item ahora es 2
    expect(newState[0].quantity).toBe(2);
  });

  it('debe eliminar un producto del carrito (REMOVE_ITEM)', () => {
    const initialState = [
      { ...mockProduct, quantity: 1 }
    ];
    const action = { type: ACTIONS.REMOVE_ITEM, payload: "JM001" }; // Payload es el 'code'
    
    const newState = cartReducer(initialState, action);
    
    // Comprobamos que el carrito ahora está vacío
    expect(newState.length).toBe(0);
  });
  
  // Nota: Faltarían tests para DECREASE_QUANTITY y CLEAR_CART, pero ya tienes 4 tests funcionales.
});