export const TEST_DATA = {
    columns: [
        {
            name: 'To-Do',
            count: 2,
            data: [],
            subColumns: [
                {
                    id: 0,
                    name: 'Commited',
                    data: [
                        {
                            id: 1,
                            laneId: '',
                            name: 'Monolith',
                            description:
                                'description lorem ipsum dolor asi amet',
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
                    id: 1,
                    name: 'Done',
                    data: [
                        {
                            id: 56,
                            laneId: '',
                            name: 'Ford Stream',
                            description:
                                'description lorem ipsum dolor asi amet',
                            tags: [{ id: 1, text: 'Tester' }]
                        },
                        {
                            id: 57,
                            laneId: '',
                            name: 'Compiled',
                            description: '123',
                            tags: [{ id: 1, text: 'Oi' }]
                        }
                    ]
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
            ],
            subColumns: []
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
            ],
            subColumns: []
        }
    ],
    lanes: [
        { id: 1, name: 'Oi' },
        { id: 2, name: 'eae' }
    ],
    nextId: 6
};
