import { useState, useEffect } from "react";
import TaskItem from "./TaskItem";

const TaskList = () => {
    const [tareas, setTareas] = useState([]);

    const obtenerTareas = async () => {
        const res =  await fetch('http://localhost:3000/api/tasks');
        const data = await res.json();
        setTareas(data);
    };

    useEffect(() => {
        obtenerTareas();
    }, []);

    return (
        <div>
            <h2>Lista de Tareas</h2>
            {tareas.map(tarea => (
                <TaskItem key={tarea.id} tarea={tarea} actualizar={obtenerTareas} />
            ))}
        </div>
    );
};

export default TaskList;