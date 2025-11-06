// Contenido de src/utils/formatter.test.js

import { describe, it, expect } from 'vitest';
import { PriceFormat } from './formatter.js';

describe('PriceFormat Utility', () => {

  it('debe formatear un número a moneda chilena (CLP)', () => {
    const precio = 10000;
    // Usamos 'vi' (Vitest) para simular el objeto Intl
    // Nota: 'es-CL' usa '.' como separador de miles y no tiene decimales por defecto.
    // Y añade un espacio entre el $ y el número.
    expect(PriceFormat(precio)).toBe('$10.000');
  });

  it('debe manejar el número 0 correctamente', () => {
    expect(PriceFormat(0)).toBe('$0');
  });

});