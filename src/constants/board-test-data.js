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
                    cards: []
                },
                {
                    id: 11,
                    name: 'Done',
                    cards: []
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
            name: 'Expedite',
            color: 'red',
            expanded: true
        },
        {
            id: 1,
            name: 'Expedite',
            color: 'gray',
            expanded: true
        }
    ],
    nextCardId: 0,
    nextGroupId: 14,
    nextColumnId: 8
};
