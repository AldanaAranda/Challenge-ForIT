import { useState, useEffect } from 'react';
import TaskForm from './components/TaskForm';
import TaskList from './components/TaskList';
import '@fortawesome/fontawesome-free/css/all.min.css';
import './App.css';

function App() {
  const [recargar, setRecargar] = useState(false);

  const actualizar = () => setRecargar(!recargar);

  return (
    <div style={{ width: '100%', margin: '0 auto', maxWidth: '45rem' }}>
      <h1>Gestor de Tareas</h1>
      <TaskForm actualizar={actualizar} />
      <TaskList key={recargar} />
    </div>
  );
};

export default App
