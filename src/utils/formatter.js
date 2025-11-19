/*
   archivo de utilidades para formateo de datos
*/

// usamos 'export const' en lugar de 'export default'
// para poder anadir mas funciones (como formatdate, etc.) 
// a este mismo archivo en el futuro.

/**
 * formatea un numero al formato de moneda chilena (clp).
 * @param {number} price - el numero a formatear.
 * @returns {string} - el numero formateado como moneda (ej. "$10.000").
 */
export const PriceFormat = (price) => {
  // 'intl.numberformat' es la api nativa de javascript para internacionalizacion de numeros.
  return new Intl.NumberFormat('es-CL', { // 'es-cl' define el formato local (chile).
    style: 'currency', // 'currency' anade el simbolo de moneda.
    currency: 'CLP'    // 'clp' especifica la moneda (peso chileno).
  }).format(price); // '.format()' aplica el formato al precio entregado.
};