export const TEST_DATA = {
    columns: [
        {
            name: 'To-Do',
            count: 2,
            data: [
                {
                    id: 1,
                    laneId: '',
                    name: 'Monolith',
                    description: 'description lorem ipsum dolor asi amet',
                    tags: [{ id: 1, text: 'Tester' }]
                },
                {
                    id: 2,
                    laneId: '',
                    name: 'Merc',
                    description: '123',
                    tags: [{ id: 1, text: 'Oi' }]
                }
            ]
        },
        {
            name: 'Doing',
            count: 2,
            data: [
                {
                    id: 4,
                    laneId: '',
                    name: 'Loner',
                    description: '',
                    tags: []
                },
                {
                    id: 3,
                    laneId: '',
                    name: 'Bandit',
                    description: '',
                    tags: [{ id: 1, text: 'Tester' }]
                }
            ]
        },
        {
            name: 'Done',
            count: 1,
            data: [
                {
                    id: 5,
                    laneId: '',
                    name: 'Ecolog',
                    description: '',
                    tags: []
                }
            ]
        }
    ],
    lanes: [],
    nextId: 6
};
