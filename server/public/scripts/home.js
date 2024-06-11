document.addEventListener('DOMContentLoaded', () => {
    const columnContainer = document.getElementById('columnContainer');
    const newBoardButton = document.getElementById('newBoardButton');
    const newBoardModal = document.getElementById('newBoardModal');
    const closeModal = document.querySelector('.modal .close');
    const newBoardForm = document.getElementById('newBoardForm');
    const addColumnButton = document.getElementById('addColumnButton');
    const columnsContainer = document.getElementById('columnsContainer');
    const boardLinksContainer = document.querySelector('.eachBoard');
    const deleteBoardButton = document.getElementById('deleteBoardButton')
    let currentBoardId = null

    const loadBoard = async (boardId) => {
        try {
            console.log('Loading board:', boardId); // Debug log
            const response = await fetch(`/api/v1/boards/${boardId}`);
            if (!response.ok) {
                throw new Error('Network response was not ok ' + response.statusText);
            }
            const board = await response.json();
            currentBoardId = boardId
            // console.log('Board data:', board); // Debug log
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

     // Open modal
    newBoardButton.addEventListener('click', () => {
        newBoardModal.style.display = 'block';
    });

    // Close modal
    closeModal.addEventListener('click', () => {
        newBoardModal.style.display = 'none';
    });

    window.addEventListener('click', (event) => {
        if (event.target === newBoardModal) {
            newBoardModal.style.display = 'none';
        }
    });

    // Add new column input
    addColumnButton.addEventListener('click', () => {
        const newColumnInput = document.createElement('input');
        newColumnInput.type = 'text';
        newColumnInput.name = 'columns';
        newColumnInput.classList.add('columnName');
        newColumnInput.required = true;
        columnsContainer.appendChild(newColumnInput);
    });

    // Handle new board form submission
    newBoardForm.addEventListener('submit', async (event) => {
        event.preventDefault();

        const boardName = newBoardForm.boardName.value;
        const columnInputs = document.querySelectorAll('.columnName');
        const columns = Array.from(columnInputs).map(input => input.value);
        const fullColumns = columns.map(column => {
            return {title: column, tasks: []}
        })

        try {
            const response = await fetch('/api/v1/boards', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ title: boardName, columns: fullColumns }),
            });

            if (!response.ok) {
                throw new Error('Network response was not ok ' + response.statusText);
            }

            const newBoard = await response.json();
            const newBoardLink = document.createElement('span');
            newBoardLink.classList.add('board-link');
            newBoardLink.dataset.boardId = newBoard._id;
            newBoardLink.innerHTML = `
                <svg width="16" height="16" xmlns="http://www.w3.org/2000/svg">
                    <path d="M0 2.889A2.889 2.889 0 0 1 2.889 0H13.11A2.889 2.889 0 0 1 16 2.889V13.11A2.888 2.888 0 0 1 13.111 16H2.89A2.889 2.889 0 0 1 0 13.111V2.89Zm1.333 5.555v4.667c0 .859.697 1.556 1.556 1.556h6.889V8.444H1.333Zm8.445-1.333V1.333h-6.89A1.556 1.556 0 0 0 1.334 2.89V7.11h8.445Zm4.889-1.333H11.11v4.444h3.556V5.778Zm0 5.778H11.11v3.11h2a1.556 1.556 0 0 0 1.556-1.555v-1.555Zm0-7.112V2.89a1.555 1.555 0 0 0-1.556-1.556h-2v3.111h3.556Z" fill="#828FA3"/>
                </svg>
                <p>${newBoard.title}</p>
            `;
            boardLinksContainer.appendChild(newBoardLink);

            newBoardLink.addEventListener('click', (event) => {
                const boardId = event.currentTarget.dataset.boardId;
                loadBoard(boardId);
                console.log("jee")
            });

            newBoardModal.style.display = 'none';
            newBoardForm.reset();
        } catch (error) {
            console.error('Error creating new board:', error);
        }
    });

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

    // Handle delete board button click
    deleteBoardButton.addEventListener('click', async () => {
        if (!currentBoardId) return;

        const confirmation = confirm('Are you sure you want to delete this board?');
        if (!confirmation) return;

        try {
            const response = await fetch(`/api/v1/boards/${currentBoardId}`, {
                method: 'DELETE',
            });

            if (!response.ok) {
                throw new Error('Network response was not ok ' + response.statusText);
            }

            // Remove the board link from the sidebar
            const boardLink = document.querySelector(`.board-link[data-board-id="${currentBoardId}"]`);
            boardLink.remove();

            // Clear the board columns display
            columnContainer.innerHTML = '';

            // Optionally load the next available board
            const nextBoardLink = document.querySelector('.board-link');
            if (nextBoardLink) {
                const nextBoardId = nextBoardLink.dataset.boardId;
                loadBoard(nextBoardId);
            } else {
                currentBoardId = null;
            }
        } catch (error) {
            console.error('Error deleting board:', error);
        }
    });

    // Load the first board by default
    const firstBoardId = boardLinks[0]?.dataset.boardId;
    if (firstBoardId) {
        loadBoard(firstBoardId);
    } else {
        console.error('First board ID not found.'); // Debug log
    }
});
