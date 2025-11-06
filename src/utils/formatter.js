/* Usamos "export const" en lugar de "export default"
  para poder añadir más funciones (como formatDate, etc.) 
  a este mismo archivo en el futuro.
*/

export const PriceFormat = (price) => {
  return new Intl.NumberFormat('es-CL', {
    style: 'currency',
    currency: 'CLP'
  }).format(price);
};

