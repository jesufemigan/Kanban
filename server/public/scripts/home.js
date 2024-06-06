document.addEventListener('DOMContentLoaded', () => {
    const columnContainer = document.getElementById('columnContainer');

    const loadBoard = async (boardId) => {
        try {
            console.log('Loading board:', boardId); // Debug log
            const response = await fetch(`/api/v1/boards/${boardId}`);
            if (!response.ok) {
                throw new Error('Network response was not ok ' + response.statusText);
            }
            const board = await response.json();
            console.log('Board data:', board); // Debug log
            renderColumns(board.columns);
        } catch (error) {
            console.error('Error fetching board:', error); // Error handling
        }
    };

    const renderColumns = (columns) => {
        columnContainer.innerHTML = ''; // Clear current content
        columns.forEach(column => {
            const columnDiv = document.createElement('div');
            columnDiv.classList.add('column');

            const columnHeader = document.createElement('span');
            const columnColor = document.createElement('div');
            columnColor.classList.add('column__color');
            columnHeader.appendChild(columnColor);

            const columnTitle = document.createElement('p');
            columnTitle.classList.add('column__title');
            columnTitle.textContent = `${column.title} (${column.tasks.length})`;
            columnHeader.appendChild(columnTitle);

            columnDiv.appendChild(columnHeader);

            const tasksDiv = document.createElement('div');
            const tasksClasses = [];
            if (column.tasks.length === 0) tasksClasses.push('empty');
            tasksClasses.push('column__tasks');
            tasksDiv.className = tasksClasses.join(' '); // Ensure no empty string is added

            column.tasks.forEach(task => {
                const taskDiv = document.createElement('div');
                taskDiv.classList.add('task');

                const taskTitle = document.createElement('h3');
                taskTitle.classList.add('task-title');
                taskTitle.textContent = task.title;
                taskDiv.appendChild(taskTitle);

                const subtasksDiv = document.createElement('div');
                subtasksDiv.classList.add('subtasks');
                subtasksDiv.style.display = 'none';

                task.subtasks.forEach(subtask => {
                    const subtaskDiv = document.createElement('div');
                    subtaskDiv.classList.add('subtask');

                    const subtaskName = document.createElement('span');
                    subtaskName.textContent = subtask.title;
                    subtaskDiv.appendChild(subtaskName);

                    const subtaskStatus = document.createElement('span');
                    subtaskStatus.classList.add('status');
                    subtaskStatus.textContent = subtask.status;
                    subtaskDiv.appendChild(subtaskStatus);

                    subtasksDiv.appendChild(subtaskDiv);
                });

                taskDiv.appendChild(subtasksDiv);
                tasksDiv.appendChild(taskDiv);
            });

            columnDiv.appendChild(tasksDiv);
            columnContainer.appendChild(columnDiv);
        });
    };

    const boardLinks = document.querySelectorAll('.board-link');
    if (boardLinks.length === 0) {
        console.error('No board links found.'); // Debug log
        return;
    }
    console.log('Board links found:', boardLinks); // Debug log

    boardLinks.forEach(boardLink => {
        boardLink.addEventListener('click', (event) => {
            const boardId = event.currentTarget.dataset.boardId;
            if (!boardId) {
                console.error('Board ID not found on clicked element.'); // Debug log
                return;
            }
            loadBoard(boardId);
        });
    });

    // Load the first board by default
    const firstBoardId = boardLinks[0]?.dataset.boardId;
    if (firstBoardId) {
        loadBoard(firstBoardId);
    } else {
        console.error('First board ID not found.'); // Debug log
    }
});
