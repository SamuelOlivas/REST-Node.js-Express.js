# CRUD App

Aplicación CRUD con Node.js y React

## Resumen del funcionamiento
````
  BACKEND

  server.js - Servidor Express simplificado
  - Configuración básica sin comentarios excesivos
  - Puerto 3000
  - CORS habilitado
  - Rutas conectadas a /api/items

  controllers/itemController.js - Lógica CRUD
  - Funciones para leer/escribir JSON
  - GET todos los items
  - GET por ID con validación 404
  - POST con ID autoincremental
  - PUT con validación
  - DELETE con confirmación
  - Manejo de errores básico

  routes/items.js - Rutas API
  - Definición simple de las 5 rutas CRUD
  - Comentarios inline

  data/items.json - Base de datos
  - 2 items de ejemplo (Laptop y Mouse)

  FRONTEND

  client/src/App.js - Componente React
  - Estados separados (nombre, precio, editingId)
  - Funciones con nombres en español (cargarItems, guardarItem, editarItem, eliminarItem)
  - Formulario simple
  - Tabla con acciones

  client/src/App.css - Estilos completos

  client/public/index.html - HTML base

  OTROS

  .gitignore - Excluir node_modules
  README.md - Instrucciones simplificadas
  package.json - Script "start" usa nodemon

## Estructura

```
crud-app/
├── server.js                 # Servidor backend
├── routes/items.js           # Rutas de la API
├── controllers/itemController.js  # Lógica CRUD
├── data/items.json           # Base de datos JSON
└── client/                   # Frontend React
```

## Instalación

1. Instalar dependencias del backend:
```bash
npm install
```

2. Instalar dependencias del frontend:
```bash
cd client
npm install
cd ..
```

## Ejecución

**Terminal 1 - Backend:**
```bash
npm start

**Terminal 2 - Frontend:**
```bash
cd client
npm start

## API Endpoints

- `GET /api/items` - Listar todos
- `GET /api/items/:id` - Obtener por ID
- `POST /api/items` - Crear (body: nombre, precio)
- `PUT /api/items/:id` - Actualizar (body: nombre, precio)
- `DELETE /api/items/:id` - Eliminar

## Tecnologías

**Backend:** Node.js, Express, CORS
**Frontend:** React, CSS
**Base de datos:** JSON (archivo)
