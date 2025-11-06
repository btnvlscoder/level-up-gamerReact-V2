import React from 'react';
import ReactDOM from 'react-dom/client';
// importaciones de react-router-dom para manejar el enrutamiento de la aplicacion
import { createBrowserRouter, RouterProvider } from 'react-router-dom';
// importacion de react-hot-toast para mostrar notificaciones (toasts)
import { Toaster } from 'react-hot-toast';

/*
   importaciones de estilos globales
*/
// importa los estilos base de bootstrap
import 'bootstrap/dist/css/bootstrap.min.css';
// importa nuestros estilos globales personalizados (variables css, resets, etc.)
// es crucial que este se importe despues de bootstrap para poder sobrescribirlo.
import './style.css'; 

/*
   importaciones de proveedores de contexto
*/
// proveedor para el estado global del carrito de compras
import { CartProvider } from './context/CartContext';
// proveedor para el estado global de autenticacion de usuario
import { AuthProvider } from './context/AuthContext'; 

/*
   importaciones de layout y paginas
*/
// 'mainLayout' es el componente base que envuelve todas las paginas (incluye header, footer)
import MainLayout from './components/MainLayout';
// paginas de la aplicacion
import HomePage from './pages/HomePage';
import ProductsPage from './pages/ProductsPage';
import ProductDetailPage from './pages/ProductDetailPage';
import ContactPage from './pages/ContactPage';
import CartPage from './pages/CartPage';
import LoginPage from './pages/LoginPage';
import RegisterPage from './pages/RegisterPage';
import ProfilePage from './pages/ProfilePage';

/*
   definicion de rutas
*/
// 'createBrowserRouter' define la estructura de navegacion de la aplicacion
const router = createBrowserRouter([
  {
    // la ruta raiz ('/') utiliza 'mainLayout' como su elemento principal
    path: '/',
    element: <MainLayout />,
    // 'children' define las rutas anidadas que se renderizaran dentro del <outlet> de 'mainLayout'
    children: [
      // 'index: true' marca a 'homePage' como la pagina por defecto para la ruta '/'
      { index: true, element: <HomePage /> },
      { path: 'products', element: <ProductsPage /> },
      // ':code' es un parametro dinamico en la url (ej. /product/jm001)
      { path: 'product/:code', element: <ProductDetailPage /> },
      { path: 'contact', element: <ContactPage /> },
      { path: 'cart', element: <CartPage /> },
      { path: 'login', element: <LoginPage /> },
      { path: 'register', element: <RegisterPage /> },
      // 'profilePage' es una ruta que probablemente sera protegida internamente
      { path: 'profile', element: <ProfilePage /> }, 
    ],
  },
]);

/*
   montaje de la aplicacion
*/
// 'ReactDOM.createRoot' selecciona el div con id "root" en el index.html
// este es el punto de anclaje donde vivira toda la aplicacion de react
const root = ReactDOM.createRoot(document.getElementById('root'));

// 'root.render()' inicia el proceso de renderizado de react
root.render(
  // 'react.strictmode' activa chequeos adicionales en desarrollo para detectar problemas
  <React.StrictMode>
    {/* envolvimos la app en 'authProvider' para que todos los componentes
        hijos (incluyendo 'cartProvider') puedan acceder al usuario actual */}
    <AuthProvider>
      {/* 'cartProvider' necesita acceso a 'authProvider' para aplicar descuentos
          basados en el usuario (ej. correo @duocuc.cl) */}
      <CartProvider>
        {/* 'routerProvider' gestiona cual pagina mostrar basado en la url */}
        <RouterProvider router={router} />
        
        {/* 'toaster' es el componente que renderiza las notificaciones
            lo ponemos aqui para que este disponible en toda la app */}
        <Toaster
          position="top-right" // las notificaciones apareceran arriba a la derecha
          toastOptions={{ // configuracion por defecto para todos los toasts
            style: {
              background: 'var(--clr-main-light)',
              color: 'var(--clr-accent-green)',
              border: '1px solid var(--clr-accent-green)',
              boxShadow: '0 4px 12px rgba(0,0,0,0.6)',
            },
            // estilos especificos para toasts de exito
            success: {
              iconTheme: {
                primary: 'var(--clr-accent-green)',
                secondary: 'var(--clr-main)',
              },
            },
            // estilos especificos para toasts de error
            error: {
              style: {
                background: '#ff33332a',
                color: 'var(--clr-accent-red)',
                border: '1px solid var(--clr-accent-red)',
              },
              iconTheme: {
                primary: 'var(--clr-accent-red)',
                secondary: 'var(--clr-main-light)',
              },
            }
          }}
        />
      </CartProvider>
    </AuthProvider>
  </React.StrictMode>
);