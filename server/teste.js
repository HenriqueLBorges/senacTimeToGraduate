/*db.classes.insertMany([
    {
        '_id': '1',
        'hours': '36',
        'name': 'Ciências Ambientais',
        'professors': [],
        'description': '',
        'semester': '1',
        'course_ids': ['1']
    },
    {
        '_id': '2',
        'hours': '72',
        'name': 'Desenho Técnico e Geometria Descritiva',
        'professors': [],
        'description': '',
        'semester': '1',
        'course_ids': ['1']
    },
    {
        '_id': '3',
        'hours': '36',
        'name': 'Fundamentos da Engenharia',
        'professors': [],
        'description': '',
        'semester': '1',
        'course_ids': ['1']
    },
    {
        '_id': '4',
        'hours': '72',
        'name': 'Linguagem de Programação',
        'professors': [],
        'description': '',
        'semester': '1',
        'course_ids': ['1']
    },
    {
        '_id': '5',
        'hours': '72',
        'name': 'Pré-calculo',
        'professors': [],
        'description': '',
        'semester': '1',
        'course_ids': ['1']
    },
    {
        '_id': '6',
        'hours': '36',
        'name': 'Projeto Interativo I',
        'professors': [],
        'description': '',
        'semester': '1',
        'course_ids': ['1']
    },
    {
        '_id': '7',
        'hours': '72',
        'name': 'Química Geral e Experimental',
        'professors': [],
        'description': '',
        'semester': '1',
        'course_ids': ['1']
    },
    {
        '_id': '8',
        'hours': '36',
        'name': 'Comunicação e Redação Técnica',
        'professors': [],
        'description': '',
        'semester': '1',
        'course_ids': ['1']
    },
    {
        '_id': '9',
        'hours': '36',
        'name': 'Circuitos Digitais I',
        'professors': [],
        'description': '',
        'semester': '1',
        'course_ids': ['1']
    },
    {
        '_id': '10',
        'hours': '36',
        'name': 'Geometria Analítica',
        'professors': [],
        'description': '',
        'semester': '2',
        'course_ids': ['1']
    },
    {
        '_id': '11',
        'hours': '72',
        'name': 'Cálculo Diferencial e Integral I',
        'professors': [],
        'description': '',
        'semester': '2',
        'course_ids': ['1']
    },
    {
        '_id': '12',
        'hours': '72',
        'name': 'Ética e Responsabilidade Social na Engenharia',
        'professors': [],
        'description': '',
        'semester': '2',
        'course_ids': ['1']
    },
    {
        '_id': '13',
        'hours': '72',
        'name': 'Física I',
        'professors': [],
        'description': '',
        'semester': '2',
        'course_ids': ['1']
    },
    {
        '_id': '14',
        'hours': '72',
        'name': 'Laboratório de Física I',
        'professors': [],
        'description': '',
        'semester': '2',
        'course_ids': ['1']
    },
    {
        '_id': '15',
        'hours': '36',
        'name': 'Projeto Interativo II',
        'professors': [],
        'description': '',
        'semester': '2',
        'course_ids': ['1']
    },
    {
        '_id': '16',
        'hours': '72',
        'name': 'Algorítmos e Programação',
        'professors': [],
        'description': 'Equivalente à Algorítmos e Programação II em qualquer outro curso.',
        'semester': '2',
        'course_ids': ['1']
    },
    {
        '_id': '17',
        'hours': '36',
        'name': 'Circuitos Digitais II',
        'professors': [],
        'description': '',
        'semester': '2',
        'course_ids': ['1']
    },
    {
        '_id': '18',
        'hours': '36',
        'name': 'Álgebra Linear I',
        'professors': [],
        'description': '',
        'semester': '2',
        'course_ids': ['1']
    },
    {
        '_id': '19',
        'hours': '72',
        'name': 'Cálculo Diferencial e Integral II',
        'professors': [],
        'description': '',
        'semester': '2',
        'course_ids': ['1']
    },
    {
        '_id': '20',
        'hours': '72',
        'name': 'Estatística e Probabilidade',
        'professors': [],
        'description': '',
        'semester': '3',
        'course_ids': ['1']
    },
    {
        '_id': '21',
        'hours': '72',
        'name': 'Física II',
        'professors': [],
        'description': '',
        'semester': '3',
        'course_ids': ['1']
    },
    {
        '_id': '22',
        'hours': '72',
        'name': 'Programação Orientada a Objetos',
        'professors': [],
        'description': '',
        'semester': '3',
        'course_ids': ['1']
    },
    {
        '_id': '23',
        'hours': '36',
        'name': 'Laboratório de Física II',
        'professors': [],
        'description': '',
        'semester': '3',
        'course_ids': ['1']
    },
    {
        '_id': '24',
        'hours': '36',
        'name': 'Projeto Interativo III',
        'professors': [],
        'description': '',
        'semester': '3',
        'course_ids': ['1']
    },
    {
        '_id': '25',
        'hours': '72',
        'name': 'Cálculo Diferencial e Integral III',
        'professors': [],
        'description': '',
        'semester': '4',
        'course_ids': ['1']
    },
    {
        '_id': '26',
        'hours': '36',
        'name': 'Ciência e Tecnologia dos Materiais',
        'professors': [],
        'description': '',
        'semester': '4',
        'course_ids': ['1']
    },
    {
        '_id': '27',
        'hours': '72',
        'name': 'Estática',
        'professors': [],
        'description': '',
        'semester': '4',
        'course_ids': ['1']
    },
    {
        '_id': '28',
        'hours': '72',
        'name': 'Física III',
        'professors': [],
        'description': '',
        'semester': '4',
        'course_ids': ['1']
    },
    {
        '_id': '29',
        'hours': '36',
        'name': 'Projeto Interativo IV',
        'professors': [],
        'description': '',
        'semester': '4',
        'course_ids': ['1']
    },
    {
        '_id': '30',
        'hours': '72',
        'name': 'Estruturas de Dados',
        'professors': [],
        'description': '',
        'semester': '4',
        'course_ids': ['1']
    },
    {
        '_id': '31',
        'hours': '72',
        'name': 'Laboratório Digital',
        'professors': [],
        'description': '',
        'semester': '4',
        'course_ids': ['1']
    },
    {
        '_id': '32',
        'hours': '72',
        'name': 'Organização de Sistemas Digitais',
        'professors': [],
        'description': '',
        'semester': '5',
        'course_ids': ['1']
    },
    {
        '_id': '33',
        'hours': '72',
        'name': 'Circuitos Elétricos',
        'professors': [],
        'description': '',
        'semester': '5',
        'course_ids': ['1']
    },
    {
        '_id': '34',
        'hours': '36',
        'name': 'Álgebra Linear II',
        'professors': [],
        'description': '',
        'semester': '5',
        'course_ids': ['1']
    },
    {
        '_id': '35',
        'hours': '72',
        'name': 'Cálculo Numérico',
        'professors': [],
        'description': '',
        'semester': '5',
        'course_ids': ['1']
    },
    {
        '_id': '36',
        'hours': '72',
        'name': 'Laboratório de Eletricidade',
        'professors': [],
        'description': '',
        'semester': '5',
        'course_ids': ['1']
    },
    {
        '_id': '37',
        'hours': '72',
        'name': 'Fenômenos de Transporte',
        'professors': [],
        'description': '',
        'semester': '5',
        'course_ids': ['1']
    },
    {
        '_id': '38',
        'hours': '36',
        'name': 'Projeto Interativo V',
        'professors': [],
        'description': '',
        'semester': '5',
        'course_ids': ['1']
    },
    {
        '_id': '39',
        'hours': '72',
        'name': 'Arquitetura de Computadores',
        'professors': [],
        'description': '',
        'semester': '6',
        'course_ids': ['1']
    },
    {
        '_id': '39',
        'hours': '72',
        'name': 'Ondas e Eletromagnetismo',
        'professors': [],
        'description': '',
        'semester': '6',
        'course_ids': ['1']
    },
    {
        '_id': '40',
        'hours': '36',
        'name': 'Eletricidade Aplicada',
        'professors': [],
        'description': '',
        'semester': '6',
        'course_ids': ['1']
    },
    {
        '_id': '41',
        'hours': '72',
        'name': 'Eletrônica',
        'professors': [],
        'description': '',
        'semester': '6',
        'course_ids': ['1']
    },
    {
        '_id': '42',
        'hours': '72',
        'name': 'Laboratório de Eletrônica',
        'professors': [],
        'description': '',
        'semester': '6',
        'course_ids': ['1']
    },
    {
        '_id': '43',
        'hours': '72',
        'name': 'Engenharia de Segurança do Trabalho',
        'professors': [],
        'description': '',
        'semester': '6',
        'course_ids': ['1']
    },
    {
        '_id': '44',
        'hours': '36',
        'name': 'Projeto Interativo VI',
        'professors': [],
        'description': '',
        'semester': '6',
        'course_ids': ['1']
    },
    {
        '_id': '45',
        'hours': '36',
        'name': 'Materiais Elétricos e Processos',
        'professors': [],
        'description': '',
        'semester': '6',
        'course_ids': ['1']
    },
    {
        '_id': '46',
        'hours': '36',
        'name': 'Sistemas Móveis e Distribuídos',
        'professors': [],
        'description': '',
        'semester': '6',
        'course_ids': ['1']
    },
    {
        '_id': '47',
        'hours': '72',
        'name': 'Teoria da Computação e Compiladores',
        'professors': [],
        'description': '',
        'semester': '7',
        'course_ids': ['1']
    },
    {
        '_id': '48',
        'hours': '36',
        'name': 'Projeto Interativo VII',
        'professors': [],
        'description': '',
        'semester': '7',
        'course_ids': ['1']
    },
    {
        '_id': '49',
        'hours': '72',
        'name': 'Laboratório de Redes de Computadores',
        'professors': [],
        'description': '',
        'semester': '7',
        'course_ids': ['1']
    },
    {
        '_id': '50',
        'hours': '72',
        'name': 'Redes de Computadores',
        'professors': [],
        'description': '',
        'semester': '7',
        'course_ids': ['1']
    },
    {
        '_id': '51',
        'hours': '72',
        'name': 'Banco de Dados',
        'professors': [],
        'description': '',
        'semester': '7',
        'course_ids': ['1']
    },
    {
        '_id': '52',
        'hours': '72',
        'name': 'Sistemas e Sinais',
        'professors': [],
        'description': '',
        'semester': '7',
        'course_ids': ['1']
    },
    {
        '_id': '53',
        'hours': '72',
        'name': 'Engenharia de Controle',
        'professors': [],
        'description': '',
        'semester': '8',
        'course_ids': ['1']
    },
    {
        '_id': '54',
        'hours': '72',
        'name': 'Fundamentos de Telecomunicações',
        'professors': [],
        'description': '',
        'semester': '8',
        'course_ids': ['1']
    },
    {
        '_id': '55',
        'hours': '72',
        'name': 'Engenharia de Software I',
        'professors': [],
        'description': '',
        'semester': '8',
        'course_ids': ['1']
    },
    {
        '_id': '56',
        'hours': '72',
        'name': 'Gestão de Projetos',
        'professors': [],
        'description': '',
        'semester': '8',
        'course_ids': ['1']
    },
    {
        '_id': '57',
        'hours': '36',
        'name': 'Projeto Interativo VIII',
        'professors': [],
        'description': '',
        'semester': '8',
        'course_ids': ['1']
    },
    {
        '_id': '58',
        'hours': '72',
        'name': 'Sistemas Operacionais',
        'professors': [],
        'description': '',
        'semester': '8',
        'course_ids': ['1']
    },
    {
        '_id': '59',
        'hours': '36',
        'name': 'Engenharia de Software II',
        'professors': [],
        'description': '',
        'semester': '9',
        'course_ids': ['1']
    },
    {
        '_id': '60',
        'hours': '36',
        'name': 'Gestão da Inovação',
        'professors': [],
        'description': '',
        'semester': '9',
        'course_ids': ['1']
    },
    {
        '_id': '61',
        'hours': '36',
        'name': 'Eletiva I',
        'professors': [],
        'description': '',
        'semester': '9',
        'course_ids': ['1']
    },
    {
        '_id': '62',
        'hours': '36',
        'name': 'Avaliação de Desempenho de Sistemas Computacionais',
        'professors': [],
        'description': '',
        'semester': '9',
        'course_ids': ['1']
    },
    {
        '_id': '63',
        'hours': '36',
        'name': 'Trabalho de Conclusão de Curso I',
        'professors': [],
        'description': '',
        'semester': '9',
        'course_ids': ['1']
    },
    {
        '_id': '64',
        'hours': '72',
        'name': 'Laboratório de Microprocessadores',
        'professors': [],
        'description': '',
        'semester': '9',
        'course_ids': ['1']
    },
    {
        '_id': '65',
        'hours': '72',
        'name': 'Sistemas de Automação',
        'professors': [],
        'description': '',
        'semester': '9',
        'course_ids': ['1']
    },
    {
        '_id': '66',
        'hours': '36',
        'name': 'Introdução a Economia',
        'professors': [],
        'description': '',
        'semester': '10',
        'course_ids': ['1']
    },
    {
        '_id': '67',
        'hours': '36',
        'name': 'Introdução ao Direito',
        'professors': [],
        'description': '',
        'semester': '10',
        'course_ids': ['1']
    },
    {
        '_id': '68',
        'hours': '36',
        'name': 'Trabalho de Conclusão de Curso II',
        'professors': [],
        'description': '',
        'semester': '10',
        'course_ids': ['1']
    },
    {
        '_id': '69',
        'hours': '36',
        'name': 'Eletiva II',
        'professors': [],
        'description': '',
        'semester': '10',
        'course_ids': ['1']
    },
    {
        '_id': '70',
        'hours': '36',
        'name': 'Administração',
        'professors': [],
        'description': '',
        'semester': '10',
        'course_ids': ['1']
    },
    {
        '_id': '71',
        'hours': '108',
        'name': 'Atividades Complementares',
        'professors': [],
        'description': '',
        'semester': '10',
        'course_ids': ['1']
    },
    {
        '_id': '72',
        'hours': '160',
        'name': 'Estágio Obrigatório',
        'professors': [],
        'description': '',
        'semester': '10',
        'course_ids': ['1']
    },
])*/