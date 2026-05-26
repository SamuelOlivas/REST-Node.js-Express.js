# CRUD App — REST con Node.js + Express

**Práctica de backend · REST API**
Samuel Olivas Grimaldos

![Node.js](https://img.shields.io/badge/Node.js-LTS-339933?logo=nodedotjs&logoColor=white)
![Express](https://img.shields.io/badge/Express-5.x-000000?logo=express&logoColor=white)
![React](https://img.shields.io/badge/React-CRA-61DAFB?logo=react&logoColor=white)
![REST](https://img.shields.io/badge/API-REST-1f6feb)

---

Aplicación CRUD completa construida desde cero: API REST en **Node.js + Express** con persistencia en JSON y cliente **React** para consumir la API. Práctica para afianzar el patrón controlador/ruta, el ciclo petición-respuesta y la separación cliente/servidor.

---

## Funcionalidades

| Módulo | Descripción |
|---|---|
| **GET items** | Listado completo de items |
| **GET item por ID** | Consulta individual con 404 si no existe |
| **POST item** | Alta con validación de campos y ID autoincremental |
| **PUT item** | Edición con validación e índice por ID |
| **DELETE item** | Borrado con confirmación 404 si no existe |
| **Cliente React** | Formulario + tabla con acciones editar/eliminar |

---

## Stack

| Capa | Tecnología |
|---|---|
| Runtime | Node.js |
| Framework | Express 5 |
| Middleware | CORS · body-parser |
| Dev | Nodemon |
| Persistencia | Archivo JSON (`data/items.json`) |
| Frontend | React (CRA) · CSS plano |
| Patrón | MVC ligero — Routes → Controllers → Data |

---

## Arquitectura

Separación clásica en tres capas dentro del backend, más un cliente React independiente que consume la API por HTTP:

1. **Routes** (`routes/items.js`) — definición de los 5 endpoints REST
2. **Controllers** (`controllers/itemController.js`) — lógica CRUD y validación
3. **Data** (`data/items.json`) — fuente de verdad en disco

El cliente React vive en `client/` y se comunica con el backend en `http://localhost:3000/api/items` con CORS habilitado.

---

## Estructura

```
REST-Node.js-Express.js/
├── server.js                       # Punto de entrada Express (puerto 3000)
├── routes/
│   └── items.js                    # Rutas REST /api/items
├── controllers/
│   └── itemController.js           # CRUD + validación + manejo de errores
├── data/
│   └── items.json                  # Persistencia en disco
└── client/                         # Frontend React
    ├── public/index.html
    └── src/
        ├── App.js                  # Estado, formulario, tabla
        ├── App.css
        └── index.js
```

---

## Endpoints

| Método | Ruta | Body | Respuesta |
|---|---|---|---|
| `GET`    | `/api/items`       | —                     | `200` lista de items |
| `GET`    | `/api/items/:id`   | —                     | `200` item · `404` si no existe |
| `POST`   | `/api/items`       | `{ nombre, precio }`  | `201` item creado · `400` validación |
| `PUT`    | `/api/items/:id`   | `{ nombre, precio }`  | `200` item actualizado · `404` |
| `DELETE` | `/api/items/:id`   | —                     | `200` confirmación · `404` |

---

## Instalación

```bash
git clone https://github.com/SamuelOlivas/REST-Node.js-Express.js.git
cd REST-Node.js-Express.js
npm install
cd client && npm install && cd ..
```

## Ejecución

**Terminal 1 — Backend** (puerto `3000`):

```bash
npm start
```

**Terminal 2 — Frontend** (puerto `3001` por defecto si el 3000 está ocupado):

```bash
cd client
npm start
```

---

## Proyectos relacionados

- [**CoopÓlea Mobile**](https://github.com/SamuelOlivas/CoopOlea-mobile) — app React Native para socios de una cooperativa olivarera. Backend Supabase con RLS y modo offline.
- [**CoopÓlea Desktop**](https://github.com/SamuelOlivas/CoopOlea) — app JavaFX para el personal de la misma cooperativa. Gestión de socios, entregas e informes PDF.

---

*Práctica de backend · Node.js + Express · 2025*
