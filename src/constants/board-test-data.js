export const TEST_DATA = {
    columns: [
        {
            name: 'To-Do',
            count: 3,
            data: [
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
            ],
            subColumns: []
        },
        {
            name: 'A Fazer',
            count: 5,
            data: [],
            subColumns: [
                {
                    id: 0,
                    name: 'Fazendo',
                    data: [
                        {
                            id: 3,
                            laneId: '',
                            name: 'Terminar a documentação do TCC',
                            description: '',
                            tags: [1]
                        },
                        {
                            id: 4,
                            laneId: '',
                            name: 'Estudar para a prova de LP',
                            description: '',
                            tags: [0]
                        },
                        {
                            id: 5,
                            laneId: '',
                            name: 'Finalizar o protótipo do TCC',
                            description: '',
                            tags: [0, 1, 2]
                        },
                        {
                            id: 11,
                            laneId: '',
                            name: 'Criar o PPT do PIT',
                            description: '',
                            tags: [0, 1, 2]
                        }
                    ]
                },
                {
                    id: 1,
                    name: 'Feito',
                    data: [
                        {
                            id: 6,
                            laneId: '',
                            name: 'Tirar as dúvidas com o Hayala',
                            description: '',
                            tags: [0, 1]
                        },
                        {
                            id: 7,
                            laneId: '',
                            name: 'Apresentar os seminários',
                            description: '',
                            tags: [0, 1]
                        }
                    ]
                }
            ]
        },
        {
            name: 'Done',
            count: 3,
            data: [
                {
                    id: 8,
                    laneId: '',
                    name: 'Terminar a primeira parte da documentação',
                    description: '',
                    tags: [1, 2]
                },
                {
                    id: 9,
                    laneId: '',
                    name: 'Criar a base do projeto do TCC',
                    description: '',
                    tags: [1, 2]
                },
                {
                    id: 10,
                    laneId: '',
                    name: 'Tirar dúvidas sobre o Kanban com AM',
                    description: '',
                    tags: [0, 1, 2]
                }
            ],
            subColumns: []
        }
    ],
    lanes: [
        { id: 1, name: 'Oi' },
        { id: 2, name: 'eae' }
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
    nextId: 12
};
