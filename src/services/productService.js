import localProducts from '../data/products';

// normalizacion de datos para el match con backend
const normalize = (s) => (typeof s === 'string' ? s.trim().toLowerCase() : '');

// ASYNC para manejar la promesa sin bloquear el hilo principal
export async function getProducts() {
  let backendProducts = [];
  
  // conexion al backend
  try {
    const res = await fetch('http://localhost:8080/products');
    const data = await res.json();
    backendProducts = Array.isArray(data) ? data : [];
  } catch {}

  // diccionario local normalizado para el match  
  const localByName = new Map(localProducts.map(p => [normalize(p.name), p]));

  // match con backend
  return backendProducts.map((b) => {
    const match = localByName.get(normalize(b.name));
    const img = match?.img && match.img.length ? match.img : ['/img/placeholder.jpg'];
    return {
      id: b.id ?? match?.id ?? match?.code ?? b.code ?? b.name,
      code: match?.code ?? (b.id ? String(b.id) : b.name),
      name: b.name ?? match?.name,
      price: b.price ?? match?.price ?? 0,
      category: match?.category ?? 'sin-categoria',
      signature: match?.signature,
      img,
    };
  });
}