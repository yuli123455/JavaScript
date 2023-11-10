const tasks = []; // Array para almacenar las tareas

const taskForm = document.getElementById('task-form'); // Formulario para administrar los campos de las tareas
const taskList = document.getElementById('task-list'); // Lista de tareas

taskForm.addEventListener('submit', function(event) { // Crea un evento que escucha cuando se da click en el boton de submit del formulario
    event.preventDefault();

    const taskId = document.getElementById('task-id').value; // Obtener el ID de la tarea
    const title = document.getElementById('task-title').value; // Obtener el título de la tarea
    const description = document.getElementById('task-description').value; // Obtener la descripción de la tarea
    const completed = document.getElementById('task-completed').checked; // Obtener el estado de completado de la tarea

    if (title && description) {
        if (taskId) {
            // Editar tarea existente
            const existingTask = tasks.find(task => task.id === parseInt(taskId)); // Buscar la tarea existente con el ID proporcionado
            if (existingTask) {
                existingTask.title = title; // Actualizar el título de la tarea existente
                existingTask.description = description; // Actualizar la descripción de la tarea existente
                existingTask.completed = completed; // Actualizar el estado de completado de la tarea existente
            }
        } else {
            // Agregar nueva tarea
            const newTask = {
                id: Date.now(), // Generar un ID único para la nueva tarea
                title: title, // Asignar el título de la nueva tarea
                description: description, // Asignar la descripción de la nueva tarea
                completed: completed // Asignar el estado de completado de la nueva tarea
            };
            tasks.push(newTask); // Agregar la nueva tarea al array de tareas
        }

        renderTasks(); // Renderizar las tareas en la lista
        taskForm.reset(); // Limpiar el formulario
        document.getElementById('task-id').value = ''; // Limpiar el campo oculto del ID
    } else {
        alert('Por favor, completa todos los campos.'); // Mostrar una alerta si no se completaron todos los campos
    }
});

function deleteTask(taskId) {
    const taskIndex = tasks.findIndex(task => task.id === parseInt(taskId)); // Encontrar el índice de la tarea a eliminar en el array de tareas
    if (taskIndex !== -1) {
        tasks.splice(taskIndex, 1); // Eliminar la tarea del array de tareas
        renderTasks(); // Renderizar las tareas en la lista
        taskForm.reset(); // Limpiar el formulario
        document.getElementById('task-id').value = ''; // Limpiar el campo oculto del ID
    }
}

function editTask(taskId) {
    const existingTask = tasks.find(task => task.id === parseInt(taskId)); // Encontrar la tarea a editar en el array de tareas
    if (existingTask) {
        document.getElementById('task-id').value = existingTask.id; // Asignar el ID de la tarea al campo oculto del ID en el formulario
        document.getElementById('task-title').value = existingTask.title; // Asignar el título de la tarea al campo de título en el formulario
        document.getElementById('task-description').value = existingTask.description; // Asignar la descripción de la tarea al campo de descripción en el formulario
        document.getElementById('task-completed').checked = existingTask.completed; // Asignar el estado de completado de la tarea al campo de completado en el formulario
    }
}

function renderTasks(status) { // Renderizar las tareas teniendo en cuenta el estado a filtrar
    taskList.innerHTML = ''; // Limpiar las tareas
    let filteredTasks = tasks; // Cargar las taeas a mostrar en una nueva variable

    if (status === 'completed') { // Validar si el estado a filtrar es completada
        filteredTasks = tasks.filter(task => task.completed); // Filtrar tareas completadas
    } else if (status === 'incomplete') { // validar si el esatdo a filtrar es incompletas
        filteredTasks = tasks.filter(task => !task.completed); // Filtrar tareas que no esten completas
    }

    filteredTasks.forEach(task => { // Crear un registro por cada tarea para mostrar en la tabla
        const taskRow = document.createElement('tr');
        taskRow.innerHTML = `
            <td>${task.title}</td>
            <td>${task.description}</td>
            <td>${task.completed ? 'Sí' : 'No'}</td>
            <td>
                <button class="btn btn-warning btn-sm" onclick="editTask(${task.id})">Editar</button>
                <button class="btn btn-danger btn-sm" onclick="deleteTask(${task.id})">Eliminar</button>
            </td>
        `;
        taskList.appendChild(taskRow); // Agregar el nuevo resgistro a la lista de tareas.
    });
}

const taskStatusSelect = document.getElementById('task-status'); // Obtener la lista de estados
taskStatusSelect.addEventListener('change', function() { // Escuchar el evento de la lista de estados cuando tiene un cambio
    const selectedStatus = taskStatusSelect.value; // Obtener el estado seleccionado
    renderTasks(selectedStatus); // Renderizar las tareas
});