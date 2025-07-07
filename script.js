document.addEventListener('DOMContentLoaded', () => {
    const taskInput = document.getElementById('taskInput');
    const saveTaskBtn = document.getElementById('saveTaskBtn');
    const taskList = document.getElementById('taskList');
    const saveFileBtn = document.getElementById('saveFileBtn'); // Get the new button

    // Function to add a new task (remains the same)
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
            });

            const taskSpan = document.createElement('span');
            taskSpan.textContent = taskText;

            listItem.appendChild(checkbox);
            listItem.appendChild(taskSpan);
            taskList.appendChild(listItem);

            taskInput.value = '';
            taskInput.focus();
        } else {
            alert('Please enter a task!');
        }
    }

    // Function to save tasks to a .txt file
    function saveTasksToFile() {
        const tasks = [];
        // Iterate over each list item in the task list
        taskList.querySelectorAll('li').forEach(item => {
            const taskText = item.querySelector('span').textContent;
            const isCompleted = item.querySelector('input[type="checkbox"]').checked;
            tasks.push(`[${isCompleted ? 'x' : ' '}] ${taskText}`);
        });

        // Join tasks with a newline character
        const fileContent = tasks.join('\n');

        // Create a Blob object
        const blob = new Blob([fileContent], { type: 'text/plain;charset=utf-8' });

        // Create a temporary URL for the Blob
        const url = URL.createObjectURL(blob);

        // Create a temporary anchor element
        const a = document.createElement('a');
        a.href = url;
        a.download = 'my_tasks.txt'; // Set the default file name

        // Programmatically click the anchor element to trigger download
        document.body.appendChild(a);
        a.click();

        // Clean up: remove the anchor and revoke the URL
        document.body.removeChild(a);
        URL.revokeObjectURL(url);
    }

    // Event listener for the Save Task button (remains the same)
    saveTaskBtn.addEventListener('click', addTask);

    // Event listener for pressing Enter key in the input field (remains the same)
    taskInput.addEventListener('keypress', (event) => {
        if (event.key === 'Enter') {
            addTask();
        }
    });

    // Event listener for the new Save to File button
    saveFileBtn.addEventListener('click', saveTasksToFile);
});
