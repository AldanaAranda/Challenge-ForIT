import { useState } from "react";

const TaskItem = ({ tarea, actualizar }) => {
    const [enEdicion, setEnEdicion] = useState(false);
    const [tituloNuevo, setTituloNuevo] = useState(tarea.titulo);
    const [descripcionNueva, setDescripcionNueva] = useState(tarea.descripcion);

    const marcarTarea = async () => {
        await fetch(`http://localhost:3000/api/tasks/${tarea.id}`, {
            method: 'PUT',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ completado: !tarea.completado})
        });
        actualizar();
    };

    const borrarTarea = async () => {
        await fetch(`http://localhost:3000/api/tasks/${tarea.id}`, {
            method: 'DELETE'
        });
        actualizar();
    }

    const editarTarea = async () => {
        if (tituloNuevo.trim() === "" || descripcionNueva.trim() === "") return;

        await fetch(`http://localhost:3000/api/tasks/${tarea.id}`, {
            method: 'PUT',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ titulo: tituloNuevo, descripcion: descripcionNueva })
        });
        setEnEdicion(false);
        actualizar();
    };

    return (
        <div style={{ marginBottom: '12px', padding: '10px', border: '1px solid #ccc', borderRadius: '8px' }}>
            <input
                type="checkbox"
                checked={tarea.completado}
                onChange={marcarTarea}
            />
            {enEdicion ? (
                <>
                    <div>
                        <input
                            type="text"
                            value={tituloNuevo}
                            onChange={e => setTituloNuevo(e.target.value)}
                            placeholder="Titulo"
                            style={{ marginLeft: '8px', display: 'block', marginBottom: '6px', }}
                        />
                        <textarea
                            value={descripcionNueva}
                            onChange={e => setDescripcionNueva(e.target.value)}
                            placeholder="Descripcion"
                            style={{ display: 'block', marginBottom: '6px', width: '100%' }}
                        />
                    </div>
                    <button onClick={editarTarea}>Guardar</button>
                    <button onClick={() => {
                        setEnEdicion(false);
                        setTituloNuevo(tarea.titulo);
                        setDescripcionNueva(tarea.descripcion);
                    }}>Cancelar</button>
                </>
            ) : (
                <>
                    <div style={{ marginLeft: '8px' }}>
                        <strong style={{ textDecoration: tarea.completado ? 'line-through' : 'none' }}>{tarea.titulo}</strong>
                        <p style={{ margin: '4px 0', textDecoration: tarea.completado ? 'line-through' : 'none' }}>{tarea.descripcion}</p>
                        <small>Creado el: {new Date(tarea.fechaCreacion).toLocaleDateString()}</small>
                    </div>
                    <button onClick={() => setEnEdicion(true)}>Editar</button>
                    <button onClick={borrarTarea}>Eliminar</button>
                </>
            )}
        </div>
    );
};

export default TaskItem;