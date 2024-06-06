export const boards = [
    {
        id: 1,
        name: 'Board 1',
        columns: [
            {
                id: 1,
                name: 'To Do',
                tasks: [
                    {
                        id: 1,
                        name: 'Task 1',
                        subtasks: [
                            { id: 1, name: 'Subtask 1', status: 'not completed' },
                            { id: 2, name: 'Subtask 2', status: 'completed' }
                        ]
                    },
                    {
                        id: 2,
                        name: 'Task 2',
                        subtasks: [
                            { id: 3, name: 'Subtask 1', status: 'not completed' }
                        ]
                    }
                ]
            },
            {
                id: 2,
                name: 'In Progress',
                tasks: []
            },
            {
                id: 3,
                name: 'Done',
                tasks: []
            }
        ]
    },
    {
        id: 2,
        name: 'Board 2',
        columns: [
            // Columns and tasks for Board 2...
        ]
    }
];