import { useState, useMemo } from 'react';

export default function useProductsFilter(products) {
  const categorias = useMemo(() => {
    const base = Array.isArray(products) ? [...new Set(products.map(p => p.category))] : [];
    return ['todos', ...base];
  }, [products]);

  const [categoria, setCategoria] = useState('todos');
  const [terminoBusqueda, setTerminoBusqueda] = useState('');

  const productosFiltrados = useMemo(() => {
    const src = Array.isArray(products) ? products : [];
    const byCat = src.filter(p => (categoria === 'todos' ? true : p.category === categoria));
    const t = terminoBusqueda.toLowerCase();
    return byCat.filter(p => (p.name?.toLowerCase().includes(t) || p.signature?.toLowerCase().includes(t)));
  }, [products, categoria, terminoBusqueda]);

  return { categoria, setCategoria, terminoBusqueda, setTerminoBusqueda, categorias, productosFiltrados };
}