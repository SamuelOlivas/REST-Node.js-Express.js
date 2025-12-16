import React, { useState, useEffect } from 'react';
import './App.css';

const API_URL = 'http://localhost:3000/api/items';

function App() {
  const [items, setItems] = useState([]);
  const [nombre, setNombre] = useState('');
  const [precio, setPrecio] = useState('');
  const [editingId, setEditingId] = useState(null);

  // Cargar items al iniciar
  useEffect(() => {
    cargarItems();
  }, []);

  // Obtener todos los items del servidor
  const cargarItems = async () => {
    try {
      const response = await fetch(API_URL);
      const data = await response.json();
      setItems(data);
    } catch (error) {
      console.log('Error:', error);
    }
  };

  // Guardar item (crear o actualizar)
  const guardarItem = async (e) => {
    e.preventDefault();

    if (!nombre || !precio) {
      alert('Completa todos los campos');
      return;
    }

    const item = { nombre, precio };

    try {
      if (editingId) {
        // Actualizar item existente
        await fetch(`${API_URL}/${editingId}`, {
          method: 'PUT',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(item)
        });
      } else {
        // Crear nuevo item
        await fetch(API_URL, {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(item)
        });
      }

      setNombre('');
      setPrecio('');
      setEditingId(null);
      cargarItems();
    } catch (error) {
      console.log('Error:', error);
    }
  };

  // Editar item
  const editarItem = (item) => {
    setNombre(item.nombre);
    setPrecio(item.precio);
    setEditingId(item.id);
  };

  // Eliminar item
  const eliminarItem = async (id) => {
    if (window.confirm('¿Seguro que quieres eliminar este item?')) {
      try {
        await fetch(`${API_URL}/${id}`, { method: 'DELETE' });
        cargarItems();
      } catch (error) {
        console.log('Error:', error);
      }
    }
  };

  // Cancelar edición
  const cancelar = () => {
    setNombre('');
    setPrecio('');
    setEditingId(null);
  };

  return (
    <div className="App">
      <h1>Gestión de Items</h1>

      <div className="form-container">
        <h2>{editingId ? 'Editar Item' : 'Nuevo Item'}</h2>
        <form onSubmit={guardarItem}>
          <div className="form-group">
            <label>Nombre:</label>
            <input
              type="text"
              value={nombre}
              onChange={(e) => setNombre(e.target.value)}
              placeholder="Ingresa el nombre"
            />
          </div>
          <div className="form-group">
            <label>Precio:</label>
            <input
              type="number"
              value={precio}
              onChange={(e) => setPrecio(e.target.value)}
              placeholder="Ingresa el precio"
              step="0.01"
            />
          </div>
          <div className="button-group">
            <button type="submit" className="btn-submit">
              {editingId ? 'Actualizar' : 'Guardar'}
            </button>
            {editingId && (
              <button type="button" onClick={cancelar} className="btn-cancel">
                Cancelar
              </button>
            )}
          </div>
        </form>
      </div>

      <div className="table-container">
        <h2>Lista de Items</h2>
        {items.length === 0 ? (
          <p>No hay items</p>
        ) : (
          <table>
            <thead>
              <tr>
                <th>ID</th>
                <th>Nombre</th>
                <th>Precio</th>
                <th>Acciones</th>
              </tr>
            </thead>
            <tbody>
              {items.map((item) => (
                <tr key={item.id}>
                  <td>{item.id}</td>
                  <td>{item.nombre}</td>
                  <td>${item.precio.toFixed(2)}</td>
                  <td>
                    <button onClick={() => editarItem(item)} className="btn-edit">
                      Editar
                    </button>
                    <button onClick={() => eliminarItem(item.id)} className="btn-delete">
                      Eliminar
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        )}
      </div>
    </div>
  );
}

export default App;
