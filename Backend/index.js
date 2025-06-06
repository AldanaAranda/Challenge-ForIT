const express = require('express');
const cors = require('cors');
const app = express();
require('dotenv').config();
const PORT = process.env.PORT || 3000;


app.use(cors());
app.use(express.json());

app.listen(PORT, () => {
    console.log(`Servidor corriendo en http://localhost:${PORT}`);
});

let tareas = [];
let idTarea = 1;

//endpoint para obtener todas las tareas
app.get('/api/tasks', (req, res) => {
    res.status(200).json(tareas);
});

//endpoint para crear una nueva tarea
app.post('/api/tasks', (req, res) => {
    const { titulo, descripcion } = req.body;

    if (!titulo || !descripcion){
        return res.status(400).json({ error: 'El titulo y la descripcion son necesarios' });
    }

    let nuevaTarea = { id: idTarea++, titulo, descripcion, completado: false, fechaCreacion: new Date().toISOString() };
    tareas.push(nuevaTarea);
    res.status(201).json(nuevaTarea);
});

//endpoint para actualizar una tarea
app.put('/api/tasks/:id', (req, res) => {
    const { id } = req.params;
    const { titulo, descripcion, completado } = req.body;

    const tarea = tareas.find(t => t.id === parseInt(id));

    if (!tarea){
        return res.status(404).json({ error: 'No se encontró la tarea'});
    }

    if (titulo !== undefined) {
        tarea.titulo = titulo;
    }

    if (descripcion !== undefined) {
        tarea.descripcion = descripcion;
    }

    if (completado !== undefined) {
        tarea.completado = completado;
    }

    res.json(tarea);
});

//endpoint para eliminar una tarea
app.delete('/api/tasks/:id', (req, res) => {
    const { id } = req.params;
    const index = tareas.findIndex(t => t.id === parseInt(id));

    if (index === -1) {
        return res.status(404).json({ error: "Tarea no encontrada"});
    }

    tareas.splice(index, 1);
    res.status(204).end();
})
