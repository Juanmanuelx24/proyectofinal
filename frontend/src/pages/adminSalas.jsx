//Vista para ver las salas, crear, editar o eliminar.
// AdminSalas.jsx
import { useState, useEffect } from 'react';
import { salas } from '../data';
import SalaCard from '../components/SalaCard';
import SalaForm from '../components/SalaForm';

const AdminSalas = () => {
  const [salasData, setSalasData] = useState(salas);
  const [showForm, setShowForm] = useState(false);
  const [selectedSala, setSelectedSala] = useState(null);

  const handleDelete = (id) => {
    setSalasData(salasData.filter((sala) => sala.id !== id));
  };

  const handleEdit = (sala) => {
    setSelectedSala(sala);
    setShowForm(true);
  };

  return (
    <div>
      <h1>Gestión de Salas</h1>
      <button onClick={() => setShowForm(true)}>Crear Sala</button>
      <div>
        {salasData.map((sala) => (
          <SalaCard key={sala.id} sala={sala} onEdit={handleEdit} onDelete={handleDelete} />
        ))}
      </div>
      {showForm && <SalaForm sala={selectedSala} onClose={() => setShowForm(false)} />}
    </div>
  );
};

export default AdminSalas;
