import { useState } from "react";

const TaskForm = ({ actualizar }) => {
    const [titulo, setTitulo] = useState('');
    const [descripcion, setDescripcion] = useState('');

    const enviarForm = async (e) => {
        e.preventDefault();
        if (!titulo.trim() || !descripcion.trim()) return;

        await fetch('http://localhost:3000/api/tasks', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ titulo, descripcion })
        });

        setTitulo('');
        setDescripcion('');
        actualizar();
    };

    return (
        <form onSubmit={enviarForm} style={{ width: '100%', display: 'flex', flexDirection: 'column', margin: '0 auto', gap: '1rem' }}>
            <input
                type="text"
                placeholder="Nueva tarea"
                value={titulo}
                onChange={(e) => setTitulo(e.target.value)}
            />
            <textarea
                placeholder="Descripción"
                value={descripcion}
                onChange={(e) => setDescripcion(e.target.value)}
            />
            <button type="submit">Agregar</button>
        </form>
    );
};

export default TaskForm;