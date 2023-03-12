export const TEST_DATA = {
    columns: [
        {
            id: 0,
            name: 'Backlog',
            groups: [
                {
                    id: 0,
                    name: 'Loner',
                    cards: [
                        {
                            id: 0,
                            laneId: '',
                            name: 'Estudar para as provas do mês',
                            description: '',
                            tags: [2]
                        },
                        {
                            id: 1,
                            laneId: '',
                            name: 'Apontar as horas de trabalho',
                            description: '',
                            tags: [0, 1, 2]
                        },
                        {
                            id: 2,
                            laneId: '',
                            name: 'Finalizar a documentação do novo projeto',
                            description: '',
                            tags: [2]
                        }
                    ]
                },
                {
                    id: 1,
                    name: 'Monolith',
                    cards: [
                        {
                            id: 3,
                            laneId: '',
                            name: 'Estudar para as provas do mês',
                            description: '',
                            tags: [2]
                        },
                        {
                            id: 4,
                            laneId: '',
                            name: 'Apontar as horas de trabalho',
                            description: '',
                            tags: [0, 1, 2]
                        },
                        {
                            id: 5,
                            laneId: '',
                            name: 'Finalizar a documentação do novo projeto',
                            description: '',
                            tags: [2]
                        }
                    ]
                }
            ],
            showSwinLanes: true
        },
        {
            id: 1,
            name: 'Doing',
            groups: [
                {
                    id: 2,
                    name: 'Doing',
                    cards: []
                }
            ]
        },
        {
            id: 2,
            name: 'Done',
            groups: [
                {
                    id: 3,
                    name: 'Doing',
                    cards: []
                }
            ]
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
            name: 'Default'
        },
        {
            id: 1,
            name: 'Expedite'
        }
    ],
    nextCardId: 6,
    nextGroupId: 4,
    nextColumnId: 3
};
