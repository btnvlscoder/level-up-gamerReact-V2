/*
   pruebas unitarias para cartReducer
*/
import { cartReducer, ACTIONS } from './CartContext.jsx'; 

// 'mockproduct' es un objeto de prueba simulando un producto
const mockProduct = {
  code: "JM001",
  name: "Catan",
  price: 29990
};

// 'describe' agrupa todos los tests para 'cartreducer'
describe('cartReducer', () => {

  // 'it' define el primer caso de prueba
  it('Debe anadir un nuevo producto al carrito (add_item)', () => {
    // 1. arrange (preparar): definimos el estado inicial y la accion
    const initialState = []; 
    const action = { type: ACTIONS.ADD_ITEM, payload: mockProduct };
    
    // 2. act (actuar): ejecutamos el reducer con el estado y la accion
    const newState = cartReducer(initialState, action);
    
    // 3. assert (verificar): comprobamos que el 'newstate' es el esperado
    expect(newState.length).toBe(1); // el carrito debe tener 1 item
    // el item debe ser el producto de prueba con 'quantity: 1' anadido
    expect(newState[0]).toEqual({ ...mockProduct, quantity: 1 });
  });

  // segundo caso de prueba
  it('Debe incrementar la cantidad de un producto existente (add_item)', () => {
    // 1. arrange: el estado inicial ya tiene 1 catan
    const initialState = [
      { ...mockProduct, quantity: 1 }
    ];
    const action = { type: ACTIONS.ADD_ITEM, payload: mockProduct }; 
    
    // 2. act
    const newState = cartReducer(initialState, action);
    
    // 3. assert
    expect(newState.length).toBe(1); // el carrito debe seguir teniendo 1 item (no 2)
    expect(newState[0].quantity).toBe(2); // la cantidad de ese item debe ser 2
  });

  // tercer caso de prueba
  it('Debe eliminar un producto del carrito (remove_item)', () => {
    // 1. arrange: el estado inicial tiene 1 catan
    const initialState = [
      { ...mockProduct, quantity: 1 }
    ];
    const action = { type: ACTIONS.REMOVE_ITEM, payload: "JM001" }; // el payload es el 'code'
    
    // 2. act
    const newState = cartReducer(initialState, action);
    
    // 3. assert
    expect(newState.length).toBe(0); // el carrito debe estar vacio
  });
  
});