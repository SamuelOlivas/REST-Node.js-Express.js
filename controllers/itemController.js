const fs = require('fs');
const path = require('path');

const dataPath = path.join(__dirname, '../data/items.json');

// Leer items del archivo JSON
const readItems = () => {
  try {
    const data = fs.readFileSync(dataPath, 'utf8');
    return JSON.parse(data);
  } catch (error) {
    return [];
  }
};

// Guardar items en el archivo JSON
const writeItems = (items) => {
  fs.writeFileSync(dataPath, JSON.stringify(items, null, 2));
};

// GET - Obtener todos los items
exports.getAllItems = (req, res) => {
  try {
    const items = readItems();
    res.json(items);
  } catch (error) {
    res.status(500).json({ error: 'Error al obtener los items' });
  }
};

// GET - Obtener un item por ID
exports.getItemById = (req, res) => {
  try {
    const items = readItems();
    const item = items.find(i => i.id === parseInt(req.params.id));

    if (!item) {
      return res.status(404).json({ error: 'Item no encontrado' });
    }

    res.json(item);
  } catch (error) {
    res.status(500).json({ error: 'Error al obtener el item' });
  }
};

// POST - Crear nuevo item
exports.createItem = (req, res) => {
  try {
    const items = readItems();
    const { nombre, precio } = req.body;

    // Validar datos
    if (!nombre || !precio) {
      return res.status(400).json({ error: 'Nombre y precio son requeridos' });
    }

    // Generar nuevo ID (autoincremental)
    let nuevoId = 1;
    if (items.length > 0) {
      const ids = items.map(item => item.id);
      nuevoId = Math.max(...ids) + 1;
    }

    const newItem = {
      id: nuevoId,
      nombre: nombre,
      precio: parseFloat(precio)
    };

    items.push(newItem);
    writeItems(items);

    res.status(201).json(newItem);
  } catch (error) {
    res.status(500).json({ error: 'Error al crear el item' });
  }
};

// PUT - Actualizar item
exports.updateItem = (req, res) => {
  try {
    const items = readItems();
    const { nombre, precio } = req.body;
    const id = parseInt(req.params.id);

    if (!nombre || !precio) {
      return res.status(400).json({ error: 'Nombre y precio son requeridos' });
    }

    const itemIndex = items.findIndex(i => i.id === id);

    if (itemIndex === -1) {
      return res.status(404).json({ error: 'Item no encontrado' });
    }

    // Actualizar item
    items[itemIndex] = {
      id: id,
      nombre: nombre,
      precio: parseFloat(precio)
    };

    writeItems(items);
    res.json(items[itemIndex]);
  } catch (error) {
    res.status(500).json({ error: 'Error al actualizar el item' });
  }
};

// DELETE - Eliminar item
exports.deleteItem = (req, res) => {
  try {
    const items = readItems();
    const id = parseInt(req.params.id);
    const itemIndex = items.findIndex(i => i.id === id);

    if (itemIndex === -1) {
      return res.status(404).json({ error: 'Item no encontrado' });
    }

    const deletedItem = items.splice(itemIndex, 1);
    writeItems(items);

    res.json({ message: 'Item eliminado', item: deletedItem[0] });
  } catch (error) {
    res.status(500).json({ error: 'Error al eliminar el item' });
  }
};
