/*
   catalogo de productos
   este archivo actua como una "base de datos" temporal para la aplicacion.
   exporta un array de objetos, donde cada objeto representa un producto.
*/
 const products= [
    {
      code: "JM001", // codigo unico del producto
      category: "Juegos de Mesa", // categoria para filtros
      signature: "DEVIR", // marca del producto
      name: "Catan", // nombre del producto
      price: 29990, // precio en clp (numero entero)
      description: 
        "un clasico juego de estrategia donde los jugadores compiten por colonizar y expandirse en la isla de catan.",
      img: [ // array de rutas a las imagenes del producto
        "/img/productos/catan/1.jpg", // la primera imagen (indice 0) se usa como miniatura
        "/img/productos/catan/2.jpg",
        "/img/productos/catan/3.jpg"
      ]
    },
    {
      code: "JM002",
      category: "Juegos de Mesa",
      signature: "DEVIR",
      name: "Carcassonne",
      price: 24990,
      description: "Juego de colocacion de fichas donde los jugadores construyen el paisaje medieval de carcassonne.",
      img: [
        "/img/productos/carcassonne/1.jpg",
        "/img/productos/carcassonne/2.jpg",
        "/img/productos/carcassonne/3.jpg"
      ]
    },
    {
      code: "AC001",
      category: "Accesorios",
      signature: "MICROSOFT",
      name: "Controlador Inalambrico Xbox Series X",
      price: 59990,
      description: "Experiencia de juego comoda con botones mapeables y respuesta tactil mejorada.",
      img: [
        "/img/productos/Controlador-Inalámbrico-Xbox-Series-X/1.jpg",
        "/img/productos/Controlador-Inalámbrico-Xbox-Series-X/2.jpg",
        "/img/productos/Controlador-Inalámbrico-Xbox-Series-X/3.jpg",
        "/img/productos/Controlador-Inalámbrico-Xbox-Series-X/4.jpg",
        "/img/productos/Controlador-Inalámbrico-Xbox-Series-X/5.jpg",
      ]
    },
    {
      code: "AC002",
      category: "Accesorios",
      signature: "HYPERX",
      name: "Auriculares Gamer HyperX Cloud II",
      price: 79990,
      description: "sonido envolvente de calidad con microfono desmontable y almohadillas ultra comodas.",
      img: [
        "/img/productos/Auriculares-Gaming-HyperX/1.jpg",
        "/img/productos/Auriculares-Gaming-HyperX/2.jpg",
        "/img/productos/Auriculares-Gaming-HyperX/3.jpg",
        "/img/productos/Auriculares-Gaming-HyperX/4.jpg",
      ]
    },
    {
      code: "CO001",
      category: "Consolas",
      signature: "SONY",
      name: "PlayStation 5",
      price: 549990,
      description: "consola de ultima generacion de sony con graficos impresionantes y carga ultrarrapida.",
      img: [
        "/img/productos/PlayStation-5/1.jpg",
        "/img/productos/PlayStation-5/2.jpg",
        "/img/productos/PlayStation-5/3.jpg",
        "/img/productos/PlayStation-5/4.jpg"
      ]
    },
    {
      code: "CG001",
      category: "Computadores Gamers",
      signature: "ASUS",
      name: "PC Gamer ASUS ROG Strix",
      price: 1299990,
      description: "potente equipo disenado para gamers exigentes, con rendimiento excepcional en cualquier juego.",
      img: [
        "/img/productos/PC-Gamer-ASUS-ROG-Strix/1.jpg",
        "/img/productos/PC-Gamer-ASUS-ROG-Strix/2.jpg",
        "/img/productos/PC-Gamer-ASUS-ROG-Strix/3.jpg",
        "/img/productos/PC-Gamer-ASUS-ROG-Strix/4.jpg"
      ]
    },
    {
      code: "SG001",
      category: "Sillas Gamers",
      signature: "SECRETLAB",
      name: "Silla Gamer Secretlab Titan",
      price: 349990,
      description: "maximo confort y soporte ergonomico para sesiones largas de juego.",
      img: [
        "/img/productos/Silla-GamerSecretlab-Titan/1.jpg",
        "/img/productos/Silla-GamerSecretlab-Titan/2.jpg",
        "/img/productos/Silla-GamerSecretlab-Titan/3.jpg",
        "/img/productos/Silla-GamerSecretlab-Titan/4.jpg",
        "/img/productos/Silla-GamerSecretlab-Titan/5.jpg",
        "/img/productos/Silla-GamerSecretlab-Titan/6.jpg",
        "/img/productos/Silla-GamerSecretlab-Titan/7.jpg",
        "/img/productos/Silla-GamerSecretlab-Titan/8.jpg",
        "/img/productos/Silla-GamerSecretlab-Titan/9.jpg",
      ]
    },
    {
      code: "MS001",
      category: "Mouse",
      signature: "LOGITECH",
      name: "Mouse Gamer Logitech G502 HERO",
      price: 49990,
      description: "sensor de alta precision y botones personalizables para un control preciso.",
      img: [
        "/img/productos/Mouse-Gamer-Logitech-G502-HERO/1.jpg",
        "/img/productos/Mouse-Gamer-Logitech-G502-HERO/2.jpg",
        "/img/productos/Mouse-Gamer-Logitech-G502-HERO/3.jpg",
        "/img/productos/Mouse-Gamer-Logitech-G502-HERO/4.jpg",
      ]
    },
    {
      code: "MP001",
      category: "Mousepad",
      signature: "RAZER",
      name: "Mousepad Razer Goliathus Extended Chroma",
      price: 29990,
      description: "area amplia de juego con iluminacion rgb personalizable.",
      img: [
        "/img/productos/Mousepad-Razer-Goliathus-Extended-Chroma/1.jpg",
        "/img/productos/Mousepad-Razer-Goliathus-Extended-Chroma/2.jpg",
        "/img/productos/Mousepad-Razer-Goliathus-Extended-Chroma/3.jpg",
      ]
    },
    {
      code: "PP001",
      category: "Poleras Personalizadas",
      signature: "LEVEL-UP",
      name: "Polera Gamer Personalizada 'Level-Up'",
      price: 14990,
      description: "camiseta comoda y estilizada, personalizable con tu gamer tag o diseno favorito.",
      img: [
        "/img/productos/Poleras-Personalizadas/1.png",
        "/img/productos/Poleras-Personalizadas/2.png",
        "/img/productos/Poleras-Personalizadas/3.png"
      ]
    }
]

// 'export default' hace que este array sea el valor principal importado
// desde otros archivos (ej. en productsPage.jsx).
export default products;