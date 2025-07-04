document.addEventListener('DOMContentLoaded', () => {
    const taskInput = document.getElementById('taskInput');
    const descriptionInput = document.getElementById('descriptionInput');
    const addTaskBtn = document.getElementById('addTaskBtn');
    const taskList = document.getElementById('taskList');

    // Carregar tarefas do LocalStorage ao iniciar
    loadTasks();

    // Event listener para adicionar tarefa ao clicar no botão
    addTaskBtn.addEventListener('click', addTask);

    // Event listener para adicionar tarefa ao pressionar Enter no campo de título
    taskInput.addEventListener('keypress', (e) => {
        if (e.key === 'Enter') {
            addTask();
        }
    });

    // Event listener para adicionar tarefa ao pressionar Enter no campo de descrição (com Shift para nova linha)
    descriptionInput.addEventListener('keypress', (e) => {
        if (e.key === 'Enter' && !e.shiftKey) {
            e.preventDefault(); // Impede a quebra de linha padrão do textarea
            addTask();
        }
    });

    function addTask() {
        const taskText = taskInput.value.trim();
        const descriptionText = descriptionInput.value.trim();

        if (taskText === '') {
            alert('Ops! O título da tarefa não pode estar vazio.');
            return;
        }

        const task = {
            id: Date.now(), // ID único baseado no timestamp
            text: taskText,
            description: descriptionText,
            completed: false
        };

        createTaskElement(task);
        saveTask(task); // Salva a tarefa no LocalStorage
        
        // Limpa os campos após adicionar
        taskInput.value = '';
        descriptionInput.value = '';
        taskInput.focus(); // Retorna o foco para o campo de título
    }

    function createTaskElement(task) {
        const listItem = document.createElement('li');
        listItem.dataset.id = task.id; // Armazena o ID no elemento DOM para fácil acesso

        const taskContentDiv = document.createElement('div');
        taskContentDiv.classList.add('task-content');

        const taskTitleSpan = document.createElement('span');
        taskTitleSpan.classList.add('task-title');
        taskTitleSpan.textContent = task.text;

        const taskDescriptionSpan = document.createElement('span');
        taskDescriptionSpan.classList.add('task-description');
        taskDescriptionSpan.textContent = task.description;

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

        // Aplica a classe 'completed' se a tarefa já estiver marcada
        if (task.completed) {
            listItem.classList.add('completed');
        }

        // Monta o elemento da lista
        taskContentDiv.appendChild(taskTitleSpan);
        if (task.description) { // Só adiciona a descrição se houver uma
            taskContentDiv.appendChild(taskDescriptionSpan);
        }
        
        actionsDiv.appendChild(completeBtn);
        actionsDiv.appendChild(deleteBtn);
        
        listItem.appendChild(taskContentDiv);
        listItem.appendChild(actionsDiv);
        
        // Adiciona a nova tarefa no topo da lista
        taskList.prepend(listItem);
    }

    function toggleComplete(listItem, task) {
        task.completed = !task.completed;
        listItem.classList.toggle('completed');
        const completeBtn = listItem.querySelector('.complete-btn');
        completeBtn.textContent = task.completed ? 'Desmarcar' : 'Completar';
        updateTask(task); // Atualiza o estado no LocalStorage
    }

    function deleteTask(listItem, id) {
        // Animação de saída antes de remover
        listItem.style.opacity = '0';
        listItem.style.transform = 'translateY(10px) scale(0.9)';
        listItem.style.transition = 'all 0.3s ease-out';

        setTimeout(() => {
            taskList.removeChild(listItem);
            removeTask(id); // Remove do LocalStorage
        }, 300); // Tempo da animação
    }

    // --- Funções para gerenciar o LocalStorage ---
    function getTasks() {
        return JSON.parse(localStorage.getItem('elegantTasks')) || [];
    }

    function saveTask(newTask) {
        const tasks = getTasks();
        tasks.push(newTask);
        localStorage.setItem('elegantTasks', JSON.stringify(tasks));
    }

    function updateTask(updatedTask) {
        let tasks = getTasks();
        tasks = tasks.map(task => task.id === updatedTask.id ? updatedTask : task);
        localStorage.setItem('elegantTasks', JSON.stringify(tasks));
    }

    function removeTask(id) {
        let tasks = getTasks();
        tasks = tasks.filter(task => task.id !== id);
        localStorage.setItem('elegantTasks', JSON.stringify(tasks));
    }

    function loadTasks() {
        const tasks = getTasks();
        // Carrega as tarefas na ordem inversa para que as mais recentes apareçam no topo
        tasks.slice().reverse().forEach(task => createTaskElement(task)); 
    }
});