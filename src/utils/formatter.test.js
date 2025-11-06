/*
   pruebas unitarias para formatter.js
*/

// importamos las herramientas de testing de vitest
import { describe, it, expect } from 'vitest';
// importamos la funcion que queremos probar
import { PriceFormat } from './formatter.js';

// 'describe' agrupa pruebas relacionadas bajo un mismo titulo
describe('priceformat utility', () => {

  // 'it' define una prueba individual (un "caso de prueba")
  it('debe formatear un numero a moneda chilena (clp)', () => {
    const precio = 10000;
    
    // 'expect' es la asercion. esperamos que el resultado de priceformat(precio)
    // 'tobe' (sea exactamente) '$10.000'.
    // nota: 'es-cl' usa '.' como separador de miles y un espacio despues del '$'.
    expect(PriceFormat(precio)).toBe('$10.000');
  });

  it('debe manejar el numero 0 correctamente', () => {
    // probamos un caso borde (edge case) para asegurar que 0 se formatee a '$0'
    expect(PriceFormat(0)).toBe('$0');
  });

});