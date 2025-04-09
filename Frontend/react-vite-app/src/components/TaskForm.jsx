import { useState } from "react";

const TaskForm = ({ actualizar }) => {
    const [titulo, setTitulo] = useState('');

    const enviarForm = async (e) => {
        e.preventDefault();
        if (!titulo.trim()) return;

        await fetch('http://localhost:3000/api/tasks', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ titulo })
        });

        setTitulo('');
        actualizar();
    };

    return (
        <form onSubmit={enviarForm}>
            <input
                type="text"
                placeholder="Nueva tarea"
                value={titulo}
                onChange={(e) => setTitulo(e.target.value)}
            />
            <button type="submit">Agregar</button>
        </form>
    );
};

export default TaskForm;