import toast from 'react-hot-toast';

export const notifyAddToCart = (name) => {
  toast.success(`"${name}" agregado al carrito!`);
};

export const notifyLoginSuccess = () => {
  toast.success('¡Bienvenido de vuelta!');
};

export const notifyLoginError = (message) => {
  toast.error(message);
};

export const notifyRegisterSuccess = (tieneDescuentoDuoc) => {
  if (tieneDescuentoDuoc) {
    toast.success('bienvenido! tienes un 10% de descuento por ser de duoc uc.');
  } else {
    toast.success('bienvenido! registro exitoso.');
  }
};

export const notifyRegisterError = (message) => {
  toast.error(message);
};

export const notifyLogoutSuccess = () => {
  toast.success('Has cerrado sesión.');
};

export const notifyPurchaseErrorNotLogged = () => {
  toast.error('Debes iniciar sesion para comprar.');
};

export const notifyVoucherEmailError = () => {
  toast.error('Por favor, ingresa un correo.');
};

export const notifyVoucherEmailSent = () => {
  toast.success('Comprobante enviado (Simulado)!');
};

export const notifyContactSuccess = () => {
  toast.success('Mensaje enviado con exito! Te contactaremos pronto.', { duration: 3000 });
};

