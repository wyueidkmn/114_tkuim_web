document.addEventListener('DOMContentLoaded', () => {
    // DOM Elements
    const todoInput = document.getElementById('todo-input');
    const addBtn = document.getElementById('add-btn');
    const todoList = document.getElementById('todo-list');
    const itemsLeft = document.getElementById('items-left');
    const clearCompletedBtn = document.getElementById('clear-completed');
    const currentDateElement = document.getElementById('current-date');

    // Initial State
    let todos = JSON.parse(localStorage.getItem('todos')) || [
        { id: 1, text: '學習 HTML 結構', completed: true },
        { id: 2, text: '掌握 CSS 樣式', completed: false }
    ];

    // Set Date
    const dateOptions = { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' };
    currentDateElement.textContent = new Date().toLocaleDateString('zh-TW', dateOptions);

    // Save to LocalStorage
    function saveTodos() {
        localStorage.setItem('todos', JSON.stringify(todos));
        render();
    }

    // Render Todos
    function render() {
        todoList.innerHTML = '';
        let activeCount = 0;

        todos.forEach(todo => {
            if (!todo.completed) activeCount++;

            const li = document.createElement('li');
            li.className = todo.completed ? 'completed' : '';
            
            li.innerHTML = `
                <div class="checkbox-wrapper" onclick="toggleTask(${todo.id})">
                    <div class="custom-checkbox"></div>
                </div>
                <span class="task-text" onclick="toggleTask(${todo.id})">${todo.text}</span>
                <button class="delete-btn" onclick="deleteTask(${todo.id})" title="Delete task">
                    <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><polyline points="3 6 5 6 21 6"></polyline><path d="M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6m3 0V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2"></path></svg>
                </button>
            `;
            todoList.appendChild(li);
        });

        itemsLeft.textContent = `剩餘 ${activeCount} 個項目`;
    }

    // Add Task
    function addTask() {
        const text = todoInput.value.trim();
        if (text) {
            const newTodo = {
                id: Date.now(),
                text: text,
                completed: false
            };
            todos.push(newTodo);
            todoInput.value = '';
            saveTodos();
        }
    }

    // Event Listeners
    addBtn.addEventListener('click', addTask);
    
    todoInput.addEventListener('keypress', (e) => {
        if (e.key === 'Enter') addTask();
    });

    clearCompletedBtn.addEventListener('click', () => {
        todos = todos.filter(t => !t.completed);
        saveTodos();
    });

    // Global Functions for inline onclick
    window.toggleTask = (id) => {
        todos = todos.map(t => t.id === id ? { ...t, completed: !t.completed } : t);
        saveTodos();
    };

    window.deleteTask = (id) => {
        todos = todos.filter(t => t.id !== id);
        saveTodos();
    };

    // Initial Render
    render();
});
