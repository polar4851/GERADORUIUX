document.addEventListener('DOMContentLoaded', () => {
    const taskInput = document.getElementById('taskInput');
    const addTaskBtn = document.getElementById('addTaskBtn');
    const taskList = document.getElementById('taskList');

    // Carregar tarefas do LocalStorage ao iniciar
    loadTasks();

    addTaskBtn.addEventListener('click', addTask);
    taskInput.addEventListener('keypress', (e) => {
        if (e.key === 'Enter') {
            addTask();
        }
    });

    function addTask() {
        const taskText = taskInput.value.trim();
        if (taskText === '') {
            alert('Por favor, digite uma tarefa!');
            return;
        }

        const task = {
            id: Date.now(), // ID único para a tarefa
            text: taskText,
            completed: false
        };

        createTaskElement(task);
        saveTask(task);
        taskInput.value = ''; // Limpa o input
    }

    function createTaskElement(task) {
        const listItem = document.createElement('li');
        listItem.dataset.id = task.id; // Armazena o ID no elemento DOM

        const taskSpan = document.createElement('span');
        taskSpan.textContent = task.text;

        const actionsDiv = document.createElement('div');
        actionsDiv.classList.add('actions');

        const completeBtn = document.createElement('button');
        completeBtn.textContent = task.completed ? 'Desmarcar' : 'Completar';
        completeBtn.classList.add('complete-btn');
        completeBtn.addEventListener('click', () => toggleComplete(listItem, task));

        const deleteBtn = document.createElement('button');
        deleteBtn.textContent = 'Remover';
        deleteBtn.classList.add('delete-btn');
        deleteBtn.addEventListener('click', () => deleteTask(listItem, task.id));

        if (task.completed) {
            listItem.classList.add('completed');
        }

        actionsDiv.appendChild(completeBtn);
        actionsDiv.appendChild(deleteBtn);
        listItem.appendChild(taskSpan);
        listItem.appendChild(actionsDiv);
        taskList.appendChild(listItem);
    }

    function toggleComplete(listItem, task) {
        task.completed = !task.completed;
        listItem.classList.toggle('completed');
        const completeBtn = listItem.querySelector('.complete-btn');
        completeBtn.textContent = task.completed ? 'Desmarcar' : 'Completar';
        updateTask(task); // Atualiza a tarefa no LocalStorage
    }

    function deleteTask(listItem, id) {
        taskList.removeChild(listItem);
        removeTask(id); // Remove a tarefa do LocalStorage
    }

    // --- Funções para gerenciar o LocalStorage ---
    function getTasks() {
        return JSON.parse(localStorage.getItem('tasks')) || [];
    }

    function saveTask(newTask) {
        const tasks = getTasks();
        tasks.push(newTask);
        localStorage.setItem('tasks', JSON.stringify(tasks));
    }

    function updateTask(updatedTask) {
        let tasks = getTasks();
        tasks = tasks.map(task => task.id === updatedTask.id ? updatedTask : task);
        localStorage.setItem('tasks', JSON.stringify(tasks));
    }

    function removeTask(id) {
        let tasks = getTasks();
        tasks = tasks.filter(task => task.id !== id);
        localStorage.setItem('tasks', JSON.stringify(tasks));
    }

    function loadTasks() {
        const tasks = getTasks();
        tasks.forEach(task => createTaskElement(task));
    }
});