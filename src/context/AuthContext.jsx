import React, { createContext, useContext, useState, useEffect } from 'react';

const USERS_DB_KEY = 'users-levelup-db';        // Para la base de datos de usuarios en localStorage
const CURRENT_USER_KEY = 'currentUser-levelup'; // Para el usuario actual en sessionStorage

// fn para obtener los usuarios guardados en localStorage
const getUsersDatabase = () => {
  try {
    const users = localStorage.getItem(USERS_DB_KEY);
    // Si hay usuarios, JSON a objeto JavaScript
    return users ? JSON.parse(users) : [];
  } catch (e) {
    // Si hay error, devolvemos array vacío
    return [];
  }
};

// fn para guardar usuarios en localStorage
const setUsersDatabase = (users) => {
  localStorage.setItem(USERS_DB_KEY, JSON.stringify(users));
};

// Creamos el contexto de autenticación
const AuthContext = createContext();

// Hook personalizado para usar el contexto de autenticación
export const useAuth = () => {
  return useContext(AuthContext);
};

// Proveedor del contexto de autenticación
export function AuthProvider({ children }) {
// Estado que guardan

  // La lista completa de usuarios registrados
  const [users, setUsers] = useState(getUsersDatabase());
  
  // El usuario que tiene la sesión activa en este momento
  const [currentUser, setCurrentUser] = useState(() => {
  //Cuando la app carga, revisamos si hay alguien guardado en sessionStorage para mantener la sesión activa."
    try {
      const user = sessionStorage.getItem(CURRENT_USER_KEY);
      return user ? JSON.parse(user) : null;
    } catch (e) {
      return null;
    }
  });

  // Efecto que guarda los usuarios en localStorage cuando cambian
  useEffect(() => {
    setUsersDatabase(users);
  }, [users]);

  // Efecto que guarda o elimina la sesión en sessionStorage cuando cambia currentUser
  useEffect(() => {
    if (currentUser) {
      // Si hay usuario logueado, lo guardamos en sessionStorage
      sessionStorage.setItem(CURRENT_USER_KEY, JSON.stringify(currentUser));
    } else {
      // Si no hay usuario, limpiamos sessionStorage
      sessionStorage.removeItem(CURRENT_USER_KEY);
    }
  }, [currentUser]);

  // fn para registrar un nuevo usuario
  const register = (userData) => {
    // Usamos una promesa para manejar el proceso asíncrono
    return new Promise((resolve, reject) => {
      // Validamos que las contraseñas coincidan
      if (userData.password !== userData.confirmPassword) {
        return reject(new Error("Las contrasenas no coinciden."));
      }
      // Validamos longitud mínima de contraseña
      if (userData.password.length < 6) {
        return reject(new Error("La contrasena debe tener al menos 6 caracteres."));
      }

      // Validamos que el email no esté ya registrado
      const emailExists = users.find(user => user.email.toLowerCase() === userData.email.toLowerCase());
      if (emailExists) {
        return reject(new Error("Este correo electronico ya esta registrado."));
      }

      // Validamos que el RUT no esté ya registrado
      const rutExists = users.find(user => user.rut.trim() === userData.rut.trim());
      if (rutExists) {
        return reject(new Error("Este rut ya esta registrado."));
      }

      // Lógica de negocio: verificamos si el email es de Duoc para aplicar descuento
      const tieneDescuentoDuoc = userData.email.toLowerCase().endsWith('@duocuc.cl');

      // Creamos el nuevo usuario
      const newUser = {
        id: Date.now().toString(), // ID único basado en la fecha actual
        rut: userData.rut,
        nombre: userData.nombre,
        apellidoPaterno: userData.apellidoPaterno,
        apellidoMaterno: userData.apellidoMaterno,
        email: userData.email,
        password: userData.password, // NOTA: En producción esto debería estar encriptado
        tieneDescuentoDuoc: tieneDescuentoDuoc,
      };

      // Guardamos el nuevo usuario y iniciamos sesión automáticamente
      setUsers([...users, newUser]);
      setCurrentUser(newUser);
      resolve(newUser); // Devolvemos el nuevo usuario
    });
  };

  // fn para iniciar sesión
  const login = (email, password) => {
    return new Promise((resolve, reject) => {
      // Buscamos el usuario por email
      const user = users.find(user => user.email.toLowerCase() === email.toLowerCase());

      // Si encontramos el usuario y la contraseña coincide
      if (user && user.password === password) {
        setCurrentUser(user); // Establecemos la sesión
        resolve(user); // Devolvemos el usuario
      } else {
        // Si no coincide, devolvemos error
        reject(new Error("Correo o contrasena incorrectos."));
      }
    });
  };

  // fn para cerrar sesión
  const logout = () => {
    // Simplemente establecemos currentUser a null
    // El useEffect se encargará de limpiar sessionStorage
    setCurrentUser(null);
  };

  // Valores que estarán disponibles para todos los componentes
  const value = {
    currentUser,  // Usuario actualmente logueado
    register,     // fn para registrar nuevo usuario
    login,        // fn para iniciar sesión
    logout,       // fn para cerrar sesión
  };

  // Proveemos el contexto a todos los componentes hijos
  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}