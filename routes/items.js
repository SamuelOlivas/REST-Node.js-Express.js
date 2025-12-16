const express = require('express');
const router = express.Router();
const itemController = require('../controllers/itemController');

// Rutas CRUD
router.get('/', itemController.getAllItems);           // Obtener todos
router.get('/:id', itemController.getItemById);         // Obtener por ID
router.post('/', itemController.createItem);            // Crear
router.put('/:id', itemController.updateItem);          // Actualizar
router.delete('/:id', itemController.deleteItem);       // Eliminar

module.exports = router;
