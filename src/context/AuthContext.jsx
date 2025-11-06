import React, { createContext, useContext, useState, useEffect } from 'react';

/*
   storage y persistencia
*/
// 'users_db_key' es la clave para guardar la base de datos de usuarios en localstorage
const USERS_DB_KEY = 'users-levelup-db';
// 'current_user_key' es la clave para guardar la sesion activa en sessionstorage
const CURRENT_USER_KEY = 'currentUser-levelup';

/**
 * funcion helper para leer la base de datos de usuarios desde localstorage.
 * @returns {array} - un array de objetos de usuario, o un array vacio si no hay nada.
 */
const getUsersDatabase = () => {
  try {
    const users = localStorage.getItem(USERS_DB_KEY);
    // si 'users' existe, lo parseamos de json a un array. si no, devolvemos [].
    return users ? JSON.parse(users) : [];
  } catch (e) {
    // si json.parse falla, devuelve un array vacio.
    return [];
  }
};

/**
 * funcion helper para escribir la base de datos de usuarios en localstorage.
 * @param {array} users - el array de usuarios a guardar.
 */
const setUsersDatabase = (users) => {
  localStorage.setItem(USERS_DB_KEY, JSON.stringify(users)); 
};

/*
   contexto principal
*/

// 1. creamos el contexto
const AuthContext = createContext();

/**
 * hook personalizado para consumir el contexto de autenticacion.
 * esto evita tener que importar 'usecontext' y 'authcontext' en cada componente.
 * @returns {object} - el valor del contexto (currentuser, login, logout, register).
 */
export const useAuth = () => {
  return useContext(AuthContext);
};

// 2. creamos el proveedor del contexto
/**
 * componente proveedor que envuelve la aplicacion y maneja el estado de autenticacion.
 * @param {object} props - props de react, 'children' son los componentes hijos.
 */
export function AuthProvider({ children }) {
  // 'users' es el estado que mantiene la lista completa de usuarios registrados.
  // se inicializa con los datos de localstorage.
  const [users, setUsers] = useState(getUsersDatabase());
  
  // 'currentuser' es el estado que mantiene al usuario que ha iniciado sesion.
  // se inicializa desde sessionstorage para mantener la sesion activa si se recarga la pagina.
  const [currentUser, setCurrentUser] = useState(() => {
    try {
      const user = sessionStorage.getItem(CURRENT_USER_KEY);
      return user ? JSON.parse(user) : null;
    } catch (e) {
      return null;
    }
  });

  // 'useeffect' para persistir la base de datos de usuarios.
  // se ejecuta cada vez que el estado 'users' cambia (ej. en un registro).
  useEffect(() => {
    setUsersDatabase(users);
  }, [users]);

  // 'useeffect' para persistir la sesion actual.
  // se ejecuta cada vez que 'currentuser' cambia (ej. en login o logout).
  useEffect(() => {
    if (currentUser) {
      // si el usuario inicia sesion, lo guardamos en sessionstorage
      sessionStorage.setItem(CURRENT_USER_KEY, JSON.stringify(currentUser));
    } else {
      // si el usuario cierra sesion (currentuser es null), limpiamos sessionstorage
      sessionStorage.removeItem(CURRENT_USER_KEY);
    }
  }, [currentUser]);

  /*
     logica de registro
  */
  /**
   * registra un nuevo usuario en el sistema.
   * @param {object} userdata - datos del formulario de registro.
   * @returns {promise} - resuelve con el nuevo usuario o rechaza con un error.
   */
  const register = (userData) => {
    // usamos una promesa para poder manejar 'await' y try/catch en el formulario
    return new Promise((resolve, reject) => {
      // 1. validar contrasenas
      if (userData.password !== userData.confirmPassword) {
        return reject(new Error("Las contrasenas no coinciden."));
      }
      if (userData.password.length < 6) {
        return reject(new Error("La contrasena debe tener al menos 6 caracteres."));
      }

      // 2. validar email unico (insensible a mayusculas/minusculas)
      const emailExists = users.find(user => user.email.toLowerCase() === userData.email.toLowerCase());
      if (emailExists) {
        return reject(new Error("Este correo electronico ya esta registrado."));
      }

      // 3. validar rut unico
      const rutExists = users.find(user => user.rut.trim() === userData.rut.trim());
      if (rutExists) {
        return reject(new Error("Este rut ya esta registrado."));
      }

      // 4. logica de negocio: aplicar descuento si el email es @duocuc.cl
      const tieneDescuentoDuoc = userData.email.toLowerCase().endsWith('@duocuc.cl');

      // 5. crear el objeto del nuevo usuario
      const newUser = {
        id: Date.now().toString(),
        rut: userData.rut,
        nombre: userData.nombre,
        apellidoPaterno: userData.apellidoPaterno,
        apellidoMaterno: userData.apellidoMaterno,
        email: userData.email,
        password: userData.password, // nota: la contrasena se guarda en texto plano (solo para fines educativos)
        tieneDescuentoDuoc: tieneDescuentoDuoc,
      };

      // 6. guardar el nuevo usuario en la "base de datos" (estado 'users')
      //    e iniciar sesion automaticamente con el nuevo usuario
      setUsers([...users, newUser]);
      setCurrentUser(newUser);
      resolve(newUser); // resuelve la promesa con el usuario creado
    });
  };

  /*
     logica de login
  */
  /**
   * inicia la sesion de un usuario existente.
   * @param {string} email - email del usuario.
   * @param {string} password - contrasena del usuario.
   * @returns {promise} - resuelve con el usuario o rechaza con un error.
   */
  const login = (email, password) => {
    return new Promise((resolve, reject) => {
      // buscamos al usuario por email (insensible a mayusculas/minusculas)
      const user = users.find(user => user.email.toLowerCase() === email.toLowerCase());

      // si el usuario existe y la contrasena coincide
      if (user && user.password === password) {
        setCurrentUser(user); // establecemos la sesion
        resolve(user); // resolvemos la promesa
      } else {
        // si no, rechazamos la promesa con un error
        reject(new Error("Correo o contrasena incorrectos."));
      }
    });
  };

  /*
     logica de logout
  */
  /**
   * cierra la sesion activa.
   */
  const logout = () => {
    // simplemente establecemos el usuario actual a null
    // el 'useeffect' de arriba se encargara de limpiar sessionstorage
    setCurrentUser(null);
  };

  // 'value' es el objeto que se comparte a todos los componentes hijos
  // que consuman este contexto.
  const value = {
    currentUser,
    register,
    login,
    logout,
  };

  // 3. retornamos el componente proveedor
  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}