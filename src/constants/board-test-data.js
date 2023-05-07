export const TEST_DATA = {
    columns: [
        {
            id: 0,
            name: 'Backlog',
            groups: [
                {
                    id: 0,
                    name: 'Doing',
                    cards: []
                }
            ],
            showSwinLanes: false
        },
        {
            id: 2,
            name: 'Analisys',
            groups: [
                {
                    id: 2,
                    name: 'Doing',
                    cards: []
                },
                {
                    id: 8,
                    name: 'Done',
                    cards: []
                }
            ],
            showSwinLanes: true
        },
        {
            id: 1,
            name: 'To delivery',
            groups: [
                {
                    id: 1,
                    name: 'Doing',
                    cards: []
                },
                {
                    id: 9,
                    name: 'Done',
                    cards: []
                }
            ],
            showSwinLanes: true
        },
        {
            id: 3,
            name: 'Prioritized',
            groups: [
                {
                    id: 3,
                    name: 'Doing',
                    cards: []
                },
                {
                    id: 10,
                    name: 'Done',
                    cards: []
                }
            ],
            showSwinLanes: true
        },
        {
            id: 4,
            name: 'Commited',
            groups: [
                {
                    id: 4,
                    name: 'Doing',
                    cards: [
                        {
                            id: 2,
                            name: 'Refatorar front-end do board',
                            description: '',
                            laneId: 0
                        },
                        {
                            id: 1,
                            name: 'Gerenciamento de tags',
                            description: '',
                            laneId: 0
                        },
                        {
                            id: 0,
                            name: 'Gerenciamento de Swinlanes',
                            description: '',
                            laneId: 0
                        }
                    ]
                },
                {
                    id: 11,
                    name: 'Done',
                    cards: [
                        {
                            id: 3,
                            name: 'eeee',
                            description: '',
                            laneId: 0
                        }
                    ]
                }
            ],
            showSwinLanes: true
        },
        {
            id: 5,
            name: 'Testing',
            groups: [
                {
                    id: 5,
                    name: 'Doing',
                    cards: []
                },
                {
                    id: 12,
                    name: 'Done',
                    cards: []
                }
            ],
            showSwinLanes: true
        },
        {
            id: 6,
            name: 'Validation',
            groups: [
                {
                    id: 6,
                    name: 'Doing',
                    cards: []
                },
                {
                    id: 13,
                    name: 'Done',
                    cards: []
                }
            ],
            showSwinLanes: true
        },
        {
            id: 7,
            name: 'Done',
            groups: [
                {
                    id: 7,
                    name: 'Doing',
                    cards: []
                }
            ],
            showSwinLanes: false
        }
    ],
    tags: [
        {
            id: 0,
            label: 'Trabalho',
            size: 'small',
            variant: 'none',
            textColor: '#ecf0f1',
            bgColor: '#f1c40f',
            borderColor: 'none'
        },
        {
            id: 1,
            label: 'Faculdade',
            size: 'small',
            variant: 'none',
            textColor: '#ecf0f1',
            bgColor: '#2980b9',
            borderColor: 'none'
        },
        {
            id: 2,
            label: 'PRA ONTEM',
            size: 'small',
            variant: 'none',
            textColor: '#ecf0f1',
            bgColor: '#c0392b',
            borderColor: 'none'
        }
    ],
    swinlanes: [
        {
            id: 0,
            name: 'Prioritized',
            color: 'red',
            expanded: true
        },
        {
            id: 1,
            name: 'Normal',
            color: 'gray',
            expanded: true
        }
    ],
    nextCardId: 4,
    nextGroupId: 14,
    nextSwinlaneId: 2,
    nextColumnId: 8
};
