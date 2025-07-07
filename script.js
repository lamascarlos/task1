document.addEventListener('DOMContentLoaded', () => {
    const taskInput = document.getElementById('taskInput');
    const saveTaskBtn = document.getElementById('saveTaskBtn');
    const taskList = document.getElementById('taskList');
    const saveFileBtn = document.getElementById('saveFileBtn'); // Keep this for downloading a file

    const LOCAL_STORAGE_KEY = 'tasks'; // Key for storing tasks in localStorage

    // --- Helper function to save tasks to localStorage ---
    function saveTasksToLocalStorage() {
        const tasks = [];
        taskList.querySelectorAll('li').forEach(item => {
            const taskText = item.querySelector('span').textContent;
            const isCompleted = item.querySelector('input[type="checkbox"]').checked;
            tasks.push({ text: taskText, completed: isCompleted });
        });
        // localStorage can only store strings, so convert the array of objects to a JSON string
        localStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify(tasks));
    }

    // --- Helper function to load tasks from localStorage and display them ---
    function loadTasksFromLocalStorage() {
        const storedTasks = localStorage.getItem(LOCAL_STORAGE_KEY);
        if (storedTasks) {
            // Parse the JSON string back into an array of objects
            const tasks = JSON.parse(storedTasks);
            tasks.forEach(task => {
                const listItem = document.createElement('li');

                const checkbox = document.createElement('input');
                checkbox.type = 'checkbox';
                checkbox.checked = task.completed; // Set checkbox state based on loaded data
                checkbox.addEventListener('change', function() {
                    if (this.checked) {
                        listItem.classList.add('completed');
                    } else {
                        listItem.classList.remove('completed');
                    }
                    saveTasksToLocalStorage(); // Save changes to localStorage
                });

                const taskSpan = document.createElement('span');
                taskSpan.textContent = task.text;

                listItem.appendChild(checkbox);
                listItem.appendChild(taskSpan);

                if (task.completed) { // Apply completed class if task was completed
                    listItem.classList.add('completed');
                }

                taskList.appendChild(listItem);
            });
        }
    }

    // Function to add a new task
    function addTask() {
        const taskText = taskInput.value.trim();

        if (taskText !== '') {
            const listItem = document.createElement('li');

            const checkbox = document.createElement('input');
            checkbox.type = 'checkbox';
            checkbox.addEventListener('change', function() {
                if (this.checked) {
                    listItem.classList.add('completed');
                } else {
                    listItem.classList.remove('completed');
                }
                saveTasksToLocalStorage(); // Save changes to localStorage
            });

            const taskSpan = document.createElement('span');
            taskSpan.textContent = taskText;

            listItem.appendChild(checkbox);
            listItem.appendChild(taskSpan);
            taskList.appendChild(listItem);

            taskInput.value = ''; // Clear the input field
            taskInput.focus(); // Keep focus on the input field

            saveTasksToLocalStorage(); // Save tasks after adding a new one
        } else {
            alert('Please enter a task!');
        }
    }

    // Function to save tasks to a .txt file (remains the same)
    function saveTasksToFile() {
        const tasks = [];
        taskList.querySelectorAll('li').forEach(item => {
            const taskText = item.querySelector('span').textContent;
            const isCompleted = item.querySelector('input[type="checkbox"]').checked;
            tasks.push(`[${isCompleted ? 'x' : ' '}] ${taskText}`);
        });

        const fileContent = tasks.join('\n');
        const blob = new Blob([fileContent], { type: 'text/plain;charset=utf-8' });
        const url = URL.createObjectURL(blob);
        const a = document.createElement('a');
        a.href = url;
        a.download = 'my_tasks.txt';
        document.body.appendChild(a);
        a.click();
        document.body.removeChild(a);
        URL.revokeObjectURL(url);
    }

    // --- Event Listeners ---
    saveTaskBtn.addEventListener('click', addTask);

    taskInput.addEventListener('keypress', (event) => {
        if (event.key === 'Enter') {
            addTask();
        }
    });

    saveFileBtn.addEventListener('click', saveTasksToFile);

    // --- Load tasks when the page loads ---
    loadTasksFromLocalStorage();
});
