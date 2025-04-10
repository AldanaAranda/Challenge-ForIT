import { useState, useEffect } from "react";
import TaskItem from "./TaskItem";

const TaskList = () => {
    const [tareas, setTareas] = useState([]);
    const [filtro, setFiltro] = useState('todas');

    const obtenerTareas = async () => {
        const res = await fetch('http://localhost:3000/api/tasks');
        const data = await res.json();
        setTareas(data);
    };

    useEffect(() => {
        obtenerTareas();
    }, []);

    const tareasFiltradas = tareas.filter(tarea => {
        if (filtro === 'completadas') return tarea.completado === true;
        if (filtro === 'pendientes') return tarea.completado === false;
        return true;
    });

    return (
        <div>
            <h2>Lista de Tareas</h2>
            <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '1rem' }}>
                {tareas.map(tarea => (
                    <TaskItem key={tarea.id} tarea={tarea} actualizar={obtenerTareas} />
                ))}
            </div>
        </div>
    );
};

export default TaskList;