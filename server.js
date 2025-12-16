// Importar módulos necesarios
const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
const itemRoutes = require('./routes/items');

// Crear aplicación Express
const app = express();
const PORT = 3000;

// Middlewares
app.use(cors()); // Permitir peticiones desde React
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

// Rutas
app.use('/api/items', itemRoutes);

// Ruta raíz
app.get('/', (req, res) => {
  res.json({ message: 'API CRUD funcionando' });
});

// Iniciar servidor
app.listen(PORT, () => {
  console.log(`Servidor corriendo en http://localhost:${PORT}`);
});
