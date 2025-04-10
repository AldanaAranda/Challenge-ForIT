import { useState } from "react";

const TaskItem = ({ tarea, actualizar }) => {
    const [enEdicion, setEnEdicion] = useState(false);
    const [tituloNuevo, setTituloNuevo] = useState(tarea.titulo);
    const [descripcionNueva, setDescripcionNueva] = useState(tarea.descripcion);

    const marcarTarea = async () => {
        await fetch(`http://localhost:3000/api/tasks/${tarea.id}`, {
            method: 'PUT',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ completado: !tarea.completado })
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
        <div style={{ padding: '0 2rem', border: '1px solid #ccc', borderRadius: '8px', gap: '1rem', width: '100%', maxWidth: '45rem' }}>
            {enEdicion ? (
                <>
                    <div>
                        <input
                            type="text"
                            value={tituloNuevo}
                            onChange={e => setTituloNuevo(e.target.value)}
                            placeholder="Titulo"
                            style={{ display: 'block', marginBottom: '6px', width: '100%', marginTop: '2rem' }}
                        />
                        <textarea
                            value={descripcionNueva}
                            onChange={e => setDescripcionNueva(e.target.value)}
                            placeholder="Descripcion"
                            style={{ display: 'block', marginBottom: '1rem', width: '100%' }}
                        />
                    </div>
                    <button onClick={editarTarea} style={{ marginBottom: '1rem', marginRight: '1rem' }}>Guardar</button>
                    <button onClick={() => {
                        setEnEdicion(false);
                        setTituloNuevo(tarea.titulo);
                        setDescripcionNueva(tarea.descripcion);
                    }} style={{ marginBottom: '1rem' }}>Cancelar</button>
                </>
            ) : (
                <>
                    <div style={{ display: 'flex', width: '100%', justifyContent: 'space-between', maxWidth: '45rem' }}>
                        <input
                            type="checkbox"
                            checked={tarea.completado}
                            onChange={marcarTarea}
                            style={{ width: '1.5rem' }}
                        />
                        <div style={{ width: '60%', padding: '1rem', textAlign: 'left' }}>
                            <strong style={{ textDecoration: tarea.completado ? 'line-through' : 'none' }}>{tarea.titulo}</strong>
                            <p style={{ margin: '1px 0', textDecoration: tarea.completado ? 'line-through' : 'none' }}>{tarea.descripcion}</p>
                            <small>Creado el: {new Date(tarea.fechaCreacion).toLocaleDateString()}</small>
                        </div>
                        <div style={{ display: 'flex', gap: '0.5rem', alignItems: 'center' }}>
                            <button onClick={() => setEnEdicion(true)} style={{
                                padding: '0.3rem', 
                                width: '2rem', 
                                height: '2rem', 
                                borderRadius: '5px', 
                                border: 'none'
                            }}><i className="fa-solid fa-pen"></i></button>
                            <button onClick={borrarTarea} style={{
                                padding: '0.3rem',
                                width: '2rem',
                                height: '2rem',
                                borderRadius: '5px',
                                border: 'none'
                            }}><i className="fa-solid fa-trash"></i></button>
                        </div>
                    </div>
                </>
            )}
        </div>
    );
};

export default TaskItem;