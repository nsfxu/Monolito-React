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
