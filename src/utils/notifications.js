import toast from 'react-hot-toast';

export const notifyAddToCart = (name) => {
  toast.success(`"${name}" agregado al carrito!`);
};

