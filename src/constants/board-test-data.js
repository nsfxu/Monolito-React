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
                    tags: []
                },
                {
                    id: 1,
                    laneId: '',
                    name: 'Apontar as horas de trabalho',
                    description: '',
                    tags: []
                },
                {
                    id: 2,
                    laneId: '',
                    name: 'Finalizar a documentação do novo projeto',
                    description: '',
                    tags: []
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
                            tags: []
                        },
                        {
                            id: 4,
                            laneId: '',
                            name: 'Estudar para a prova de LP',
                            description: '',
                            tags: []
                        },
                        {
                            id: 5,
                            laneId: '',
                            name: 'Finalizar o protótipo do TCC',
                            description: '',
                            tags: []
                        },
                        {
                            id: 11,
                            laneId: '',
                            name: 'Criar o PPT do PIT',
                            description: '',
                            tags: []
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
                            tags: []
                        },
                        {
                            id: 7,
                            laneId: '',
                            name: 'Apresentar os seminários',
                            description: '',
                            tags: []
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
                    tags: []
                },
                {
                    id: 9,
                    laneId: '',
                    name: 'Criar a base do projeto do TCC',
                    description: '',
                    tags: []
                },
                {
                    id: 10,
                    laneId: '',
                    name: 'Tirar dúvidas sobre o Kanban com AM',
                    description: '',
                    tags: [0]
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
            label: 'Tester',
            textColor: '#ecf0f1',
            bgColor: '#e74c3c',
            borderColor: 'none'
        }
    ],
    nextId: 12
};
