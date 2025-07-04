window.addEventListener('load', () => {

    // --- SELEÇÃO DE ELEMENTOS DO DOM ---
    const form = document.querySelector("#new-task-form");
    const input = document.querySelector("#new-task-input");
    const tasksContainer = document.querySelector("#tasks-container");
    const dateDisplay = document.querySelector("#date-display");

    // --- FUNÇÃO PARA EXIBIR A DATA ATUAL ---
    const displayCurrentDate = () => {
        const today = new Date();
        const options = { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' };
        dateDisplay.textContent = today.toLocaleDateString('pt-BR', options);
    };

    displayCurrentDate(); // Chama a função ao carregar a página

    // --- EVENT LISTENER PARA SUBMISSÃO DO FORMULÁRIO ---
    form.addEventListener('submit', (e) => {
        e.preventDefault(); // Impede o recarregamento da página

        const taskText = input.value.trim();

        // Validação: não adicionar tarefa se o campo estiver vazio
        if (!taskText) {
            alert("Por favor, digite uma tarefa.");
            return;
        }

        createTaskElement(taskText);

        // Limpa o input e foca nele novamente
        input.value = "";
        input.focus();
    });

    // --- FUNÇÃO PARA CRIAR O ELEMENTO DA TAREFA ---
    const createTaskElement = (text) => {
        // Cria o elemento principal da tarefa
        const task_el = document.createElement('div');
        task_el.classList.add('task');

        // Cria o conteúdo da tarefa (o texto)
        const task_content_el = document.createElement('div');
        task_content_el.classList.add('content');
        task_content_el.textContent = text;

        // Cria a div de ações (botão de deletar)
        const task_actions_el = document.createElement('div');
        task_actions_el.classList.add('actions');

        // Cria o botão de deletar com ícone SVG
        const task_delete_btn = document.createElement('button');
        task_delete_btn.classList.add('delete-btn');
        task_delete_btn.innerHTML = `
            <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                <polyline points="3 6 5 6 21 6"></polyline>
                <path d="M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6m3 0V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2"></path>
                <line x1="10" y1="11" x2="10" y2="17"></line>
                <line x1="14" y1="11" x2="14" y2="17"></line>
            </svg>`;

        // Monta o elemento da tarefa
        task_actions_el.appendChild(task_delete_btn);
        task_el.appendChild(task_content_el);
        task_el.appendChild(task_actions_el);

        // Adiciona a nova tarefa no início da lista para melhor visibilidade
        tasksContainer.prepend(task_el);

        // --- EVENT LISTENERS PARA AS AÇÕES DA TAREFA ---

        // Marcar/desmarcar como concluída ao clicar no texto
        task_content_el.addEventListener('click', () => {
            task_el.classList.toggle('done');
        });

        // Deletar a tarefa
        task_delete_btn.addEventListener('click', (e) => {
            e.stopPropagation(); // Impede que o clique se propague para outros elementos

            // Adiciona a classe para a animação de saída
            task_el.classList.add('fade-out');
            
            // Remove o elemento do DOM após a animação terminar
            task_el.addEventListener('animationend', () => {
                tasksContainer.removeChild(task_el);
            });
        });
    }
});