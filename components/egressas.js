/**
 * @file components/egressas.js
 * @description Módulo de dados e renderização interativa do Acompanhamento das Egressas da Rede MeMC.
 * Arquitetura: Módulo reutilizável com busca e filtros dinâmicos em tempo real por Subsede e Modalidade de Bolsa.
 */

/**
 * @typedef {Object} EgressaItem
 * @property {string} id - Identificador único da egressa
 * @property {string} nome - Nome completo da estudante/bolsista
 * @property {number} subsede - Número da subsede (1, 2, 3 ou 4)
 * @property {string} subsedeNome - Nome da subsede institucional
 * @property {string} instituicao - Sigla da instituição e campus
 * @property {string} modalidade - Código da bolsa (ICJ, IC ou AT)
 * @property {string} modalidadeExtenso - Nome por extenso da modalidade
 * @property {string} orientacao - Nome do orientador(a) / supervisores
 * @property {string} lattes - URL do Currículo Lattes
 * @property {string} iniciais - Iniciais para exibição do avatar
 */

/**
 * Base de dados oficial das bolsistas egressas da Rede Meninas e Mulheres Cientistas.
 * Dados consolidados e revisados conforme atribuição de bolsas.
 * @type {EgressaItem[]}
 */
const EGRESSAS_DATA = [
    // -------------------------------------------------------------------------
    // SUBSEDE 1: IFSP (Campus Sertãozinho) • Unifesp Diadema Articuladora
    // -------------------------------------------------------------------------
    {
        id: 'egressa-1',
        nome: 'Ana Julia Ribeiro Machado',
        subsede: 1,
        subsedeNome: 'Subsede 1',
        instituicao: 'IFSP (Campus Sertãozinho)',
        modalidade: 'ICJ',
        modalidadeExtenso: 'Iniciação Científica Júnior',
        orientacao: 'Paulo Sérgio Calefi',
        lattes: 'http://lattes.cnpq.br/1692554413955010',
        iniciais: 'AM'
    },
    {
        id: 'egressa-2',
        nome: 'Eduarda Sena de Carvalho',
        subsede: 1,
        subsedeNome: 'Subsede 1',
        instituicao: 'IFSP (Campus Sertãozinho)',
        modalidade: 'ICJ',
        modalidadeExtenso: 'Iniciação Científica Júnior',
        orientacao: 'Paulo Sérgio Calefi',
        lattes: 'http://lattes.cnpq.br/8961303558757784',
        iniciais: 'EC'
    },
    {
        id: 'egressa-3',
        nome: 'Fabiane Elidia Dias',
        subsede: 1,
        subsedeNome: 'Subsede 1',
        instituicao: 'IFSP (Campus Sertãozinho)',
        modalidade: 'AT',
        modalidadeExtenso: 'Bolsista de Apoio Técnico',
        orientacao: 'Paulo Sérgio Calefi',
        lattes: 'http://lattes.cnpq.br/2694114368216564',
        iniciais: 'FD'
    },
    {
        id: 'egressa-4',
        nome: 'Heloisa De Souza Pereira',
        subsede: 1,
        subsedeNome: 'Subsede 1',
        instituicao: 'IFSP (Campus Sertãozinho)',
        modalidade: 'ICJ',
        modalidadeExtenso: 'Iniciação Científica Júnior',
        orientacao: 'Paulo Sérgio Calefi',
        lattes: 'http://lattes.cnpq.br/8141654904211875',
        iniciais: 'HP'
    },
    {
        id: 'egressa-5',
        nome: 'Poliany Aparecida Carvalho Dias',
        subsede: 1,
        subsedeNome: 'Subsede 1',
        instituicao: 'IFSP (Campus Sertãozinho)',
        modalidade: 'ICJ',
        modalidadeExtenso: 'Iniciação Científica Júnior',
        orientacao: 'Paulo Sérgio Calefi',
        lattes: 'http://lattes.cnpq.br/6000171125371848',
        iniciais: 'PD'
    },
    {
        id: 'egressa-6',
        nome: 'Rute da Silva Nunes',
        subsede: 1,
        subsedeNome: 'Subsede 1',
        instituicao: 'IFSP (Campus Sertãozinho)',
        modalidade: 'ICJ',
        modalidadeExtenso: 'Iniciação Científica Júnior',
        orientacao: 'Paulo Sérgio Calefi',
        lattes: 'http://lattes.cnpq.br/1375251435493730',
        iniciais: 'RN'
    },

    // -------------------------------------------------------------------------
    // SUBSEDE 2: USP (Campus Ribeirão Preto) • CEIQ
    // -------------------------------------------------------------------------
    {
        id: 'egressa-7',
        nome: 'Ana Luiza Rodrigues Ferreira da Silva',
        subsede: 2,
        subsedeNome: 'Subsede 2',
        instituicao: 'USP (Campus Ribeirão Preto)',
        modalidade: 'ICJ',
        modalidadeExtenso: 'Iniciação Científica Júnior',
        orientacao: 'Glaucia Maria da Silva Degrève',
        lattes: 'http://lattes.cnpq.br/7764564671135602',
        iniciais: 'AS'
    },
    {
        id: 'egressa-8',
        nome: 'Jhenniffer Santos de Almeida',
        subsede: 2,
        subsedeNome: 'Subsede 2',
        instituicao: 'USP (Campus Ribeirão Preto)',
        modalidade: 'ICJ',
        modalidadeExtenso: 'Iniciação Científica Júnior',
        orientacao: 'Glaucia Maria da Silva Degrève',
        lattes: 'http://lattes.cnpq.br/9482906052612358',
        iniciais: 'JA'
    },
    {
        id: 'egressa-9',
        nome: 'Raissa Monteiro Mariano',
        subsede: 2,
        subsedeNome: 'Subsede 2',
        instituicao: 'USP (Campus Ribeirão Preto)',
        modalidade: 'ICJ',
        modalidadeExtenso: 'Iniciação Científica Júnior',
        orientacao: 'Glaucia Maria da Silva Degrève',
        lattes: 'http://lattes.cnpq.br/8734977467438508',
        iniciais: 'RM'
    },
    {
        id: 'egressa-10',
        nome: 'Sophia Catto Ribeiro',
        subsede: 2,
        subsedeNome: 'Subsede 2',
        instituicao: 'USP (Campus Ribeirão Preto)',
        modalidade: 'ICJ',
        modalidadeExtenso: 'Iniciação Científica Júnior',
        orientacao: 'Joana de Jesus de Andrade',
        lattes: 'http://lattes.cnpq.br/9897343810224466',
        iniciais: 'SR'
    },
    {
        id: 'egressa-11',
        nome: 'Yasmin Alves Rocha',
        subsede: 2,
        subsedeNome: 'Subsede 2',
        instituicao: 'USP (Campus Ribeirão Preto)',
        modalidade: 'ICJ',
        modalidadeExtenso: 'Iniciação Científica Júnior',
        orientacao: 'Joana de Jesus de Andrade',
        lattes: 'http://lattes.cnpq.br/9999837109631914',
        iniciais: 'YR'
    },
    {
        id: 'egressa-12',
        nome: 'Lavínia Ferreira dos Anjos',
        subsede: 2,
        subsedeNome: 'Subsede 2',
        instituicao: 'USP (Campus Ribeirão Preto)',
        modalidade: 'ICJ',
        modalidadeExtenso: 'Iniciação Científica Júnior',
        orientacao: 'Glaucia Maria da Silva Degrève',
        lattes: 'http://lattes.cnpq.br/3811490904351312',
        iniciais: 'LA'
    },
    {
        id: 'egressa-13',
        nome: 'Leslee Eulampio de Barros',
        subsede: 2,
        subsedeNome: 'Subsede 2',
        instituicao: 'USP (Campus Ribeirão Preto)',
        modalidade: 'IC',
        modalidadeExtenso: 'Iniciação Científica',
        orientacao: 'Glaucia Maria da Silva Degrève',
        lattes: 'http://lattes.cnpq.br/9395020452171798',
        iniciais: 'LB'
    },
    {
        id: 'egressa-14',
        nome: 'Maria Eduarda Bisco Fantini',
        subsede: 2,
        subsedeNome: 'Subsede 2',
        instituicao: 'USP (Campus Ribeirão Preto)',
        modalidade: 'ICJ',
        modalidadeExtenso: 'Iniciação Científica Júnior',
        orientacao: 'Glaucia Maria da Silva Degrève',
        lattes: 'http://lattes.cnpq.br/6214016847020203',
        iniciais: 'MF'
    },
    {
        id: 'egressa-15',
        nome: 'Maria Eduarda Santos de Lima Souza',
        subsede: 2,
        subsedeNome: 'Subsede 2',
        instituicao: 'USP (Campus Ribeirão Preto)',
        modalidade: 'ICJ',
        modalidadeExtenso: 'Iniciação Científica Júnior',
        orientacao: 'Glaucia Maria da Silva Degrève',
        lattes: 'http://lattes.cnpq.br/0669032436690651',
        iniciais: 'MS'
    },
    {
        id: 'egressa-16',
        nome: 'Maria Eduarda Santos Padilha',
        subsede: 2,
        subsedeNome: 'Subsede 2',
        instituicao: 'USP (Campus Ribeirão Preto)',
        modalidade: 'ICJ',
        modalidadeExtenso: 'Iniciação Científica Júnior',
        orientacao: 'Glaucia Maria da Silva Degrève',
        lattes: 'http://lattes.cnpq.br/3734375839414962',
        iniciais: 'MP'
    },
    {
        id: 'egressa-17',
        nome: 'Maria Luiza Ferrarini Goulart',
        subsede: 2,
        subsedeNome: 'Subsede 2',
        instituicao: 'USP (Campus Ribeirão Preto)',
        modalidade: 'AT',
        modalidadeExtenso: 'Bolsista de Apoio Técnico',
        orientacao: 'Glaucia Maria da Silva Degrève',
        lattes: '',
        iniciais: 'MG'
    },
    {
        id: 'egressa-18',
        nome: 'Milenah Santos Nicolau',
        subsede: 2,
        subsedeNome: 'Subsede 2',
        instituicao: 'USP (Campus Ribeirão Preto)',
        modalidade: 'ICJ',
        modalidadeExtenso: 'Iniciação Científica Júnior',
        orientacao: 'Glaucia Maria da Silva Degrève',
        lattes: 'http://lattes.cnpq.br/5655380636933040',
        iniciais: 'MN'
    },

    // -------------------------------------------------------------------------
    // SUBSEDE 3: UNIFEI (Itajubá e Itabira) • Semeando Cientistas
    // -------------------------------------------------------------------------
    {
        id: 'egressa-19',
        nome: 'Jhenny Karen Madeira Mendes',
        subsede: 3,
        subsedeNome: 'Subsede 3',
        instituicao: 'UNIFEI (Campus Itabira)',
        modalidade: 'ICJ',
        modalidadeExtenso: 'Iniciação Científica Júnior',
        orientacao: 'Gustavo Henrique de Magalhães Gomes',
        lattes: 'http://lattes.cnpq.br/1900272210672584',
        iniciais: 'JM'
    },
    {
        id: 'egressa-20',
        nome: 'Larissa Rafaela Silva Lima',
        subsede: 3,
        subsedeNome: 'Subsede 3',
        instituicao: 'UNIFEI (Campus Itajubá)',
        modalidade: 'AT',
        modalidadeExtenso: 'Bolsista de Apoio Técnico',
        orientacao: 'Milady Renata Apolinário da Silva e Maria Elizabete Villela Santiago',
        lattes: 'http://lattes.cnpq.br/5783661816697610',
        iniciais: 'LL'
    },
    {
        id: 'egressa-21',
        nome: 'Ruthiele Couto Rosa',
        subsede: 3,
        subsedeNome: 'Subsede 3',
        instituicao: 'UNIFEI (Campus Itabira)',
        modalidade: 'ICJ',
        modalidadeExtenso: 'Iniciação Científica Júnior',
        orientacao: 'Gustavo Henrique de Magalhães Gomes',
        lattes: 'http://lattes.cnpq.br/5531448002419305',
        iniciais: 'RR'
    },

    // -------------------------------------------------------------------------
    // SUBSEDE 4: UFSCar (Araras e Sorocaba) • Pequenas Cientistas
    // -------------------------------------------------------------------------
    {
        id: 'egressa-22',
        nome: 'Luana Belemer França de Sá',
        subsede: 4,
        subsedeNome: 'Subsede 4',
        instituicao: 'UFSCar (Campus Sorocaba)',
        modalidade: 'IC',
        modalidadeExtenso: 'Iniciação Científica',
        orientacao: 'João Batista dos Santos Junior e Marystela Ferreira',
        lattes: 'http://lattes.cnpq.br/5405489539484714',
        iniciais: 'LS'
    },
    {
        id: 'egressa-23',
        nome: 'Luiza de Castro Geromim',
        subsede: 4,
        subsedeNome: 'Subsede 4',
        instituicao: 'UFSCar (Campus Araras)',
        modalidade: 'ICJ',
        modalidadeExtenso: 'Iniciação Científica Júnior',
        orientacao: 'Elaine Gomes Matheus Furlan',
        lattes: 'http://lattes.cnpq.br/9782560403338174',
        iniciais: 'LG'
    },
    {
        id: 'egressa-24',
        nome: 'Stephany Veronez',
        subsede: 4,
        subsedeNome: 'Subsede 4',
        instituicao: 'UFSCar (Campus Araras)',
        modalidade: 'ICJ',
        modalidadeExtenso: 'Iniciação Científica Júnior',
        orientacao: 'Elaine Gomes Matheus Furlan',
        lattes: 'http://lattes.cnpq.br/6667270539833016',
        iniciais: 'SV'
    },
    {
        id: 'egressa-25',
        nome: 'Suzane Farias da Silva',
        subsede: 4,
        subsedeNome: 'Subsede 4',
        instituicao: 'UFSCar (Campus Araras)',
        modalidade: 'IC',
        modalidadeExtenso: 'Iniciação Científica',
        orientacao: 'Elaine Gomes Matheus Furlan',
        lattes: 'http://lattes.cnpq.br/6508883363160937',
        iniciais: 'SS'
    },
    {
        id: 'egressa-26',
        nome: 'Talita Martins Oliveira de Souza',
        subsede: 4,
        subsedeNome: 'Subsede 4',
        instituicao: 'UFSCar (Campus Araras)',
        modalidade: 'AT',
        modalidadeExtenso: 'Bolsista de Apoio Técnico',
        orientacao: 'Elaine Gomes Matheus Furlan',
        lattes: 'http://lattes.cnpq.br/4120555047123461',
        iniciais: 'TS'
    }
];

/**
 * Estado atual dos filtros de busca e seleção.
 */
let estadoFiltroEgressas = {
    subsede: 'todas',
    modalidade: 'todas',
    termoBusca: ''
};

/**
 * Retorna as classes de cor e estilo com base na subsede institucional.
 * @param {number} numSubsede
 * @returns {{ badgeBg: string, bordaHover: string, avatarBg: string, textoCor: string }}
 */
function obterEstiloSubsede(numSubsede) {
    switch (numSubsede) {
        case 1:
            return {
                badgeBg: 'bg-instituicoes-subsede1 text-neutral-900',
                bordaHover: 'hover:border-instituicoes-subsede1',
                avatarBg: 'bg-instituicoes-subsede1 text-neutral-900',
                dotBg: 'bg-instituicoes-subsede1',
                textoCor: 'text-neutral-700'
            };
        case 2:
            return {
                badgeBg: 'bg-instituicoes-subsede2 text-neutral-900',
                bordaHover: 'hover:border-instituicoes-subsede2',
                avatarBg: 'bg-instituicoes-subsede2 text-neutral-900',
                dotBg: 'bg-instituicoes-subsede2',
                textoCor: 'text-neutral-700'
            };
        case 3:
            return {
                badgeBg: 'bg-instituicoes-subsede3 text-neutral-900',
                bordaHover: 'hover:border-instituicoes-subsede3',
                avatarBg: 'bg-instituicoes-subsede3 text-neutral-900',
                dotBg: 'bg-instituicoes-subsede3',
                textoCor: 'text-neutral-700'
            };
        case 4:
            return {
                badgeBg: 'bg-instituicoes-subsede4 text-neutral-900',
                bordaHover: 'hover:border-instituicoes-subsede4',
                avatarBg: 'bg-instituicoes-subsede4 text-neutral-900',
                dotBg: 'bg-instituicoes-subsede4',
                textoCor: 'text-neutral-700'
            };
        default:
            return {
                badgeBg: 'bg-neutral-600 text-white',
                bordaHover: 'hover:border-neutral-400',
                avatarBg: 'bg-neutral-600 text-white',
                dotBg: 'bg-neutral-600',
                textoCor: 'text-neutral-700'
            };
    }
}

/**
 * Retorna as classes visuais da badge de modalidade de bolsa.
 * @param {string} modalidade
 * @returns {{ bg: string, texto: string, border: string }}
 */
function obterEstiloModalidade(modalidade) {
    switch (modalidade) {
        case 'ICJ':
            return {
                bg: 'bg-pink-50',
                texto: 'text-memc-rosa',
                border: 'border-pink-200'
            };
        case 'IC':
            return {
                bg: 'bg-blue-50',
                texto: 'text-memc-azul',
                border: 'border-blue-200'
            };
        case 'AT':
            return {
                bg: 'bg-purple-50',
                texto: 'text-memc-roxo-medio',
                border: 'border-purple-200'
            };
        default:
            return {
                bg: 'bg-neutral-100',
                texto: 'text-neutral-700',
                border: 'border-neutral-200'
            };
    }
}

/**
 * Cria a marcação HTML individual do cartão de uma egressa.
 * @param {EgressaItem} egressa
 * @returns {string} Fragmento HTML do card
 */
function criarCardEgressaHTML(egressa) {
    const estiloSub = obterEstiloSubsede(egressa.subsede);
    const estiloMod = obterEstiloModalidade(egressa.modalidade);

    return `
        <article class="bg-white/95 backdrop-blur-md rounded-3xl p-6 shadow-md border-2 border-neutral-200/90 ${estiloSub.bordaHover} hover:shadow-xl transition-all flex flex-col justify-between group">
            <div>
                <!-- Topo do Card: Badge de Subsede e Modalidade -->
                <div class="flex items-start justify-between gap-3 mb-4">
                    <span class="inline-flex items-center gap-1.5 text-[10px] sm:text-[11px] font-black uppercase tracking-wider px-3 py-1 rounded-full ${estiloSub.badgeBg} shadow-xs">
                        <i class="fa-solid fa-location-dot text-[9px]" aria-hidden="true"></i> ${egressa.subsedeNome}
                    </span>
                    <span class="inline-flex items-center text-[10px] sm:text-[11px] font-extrabold uppercase tracking-wider px-2.5 py-0.5 rounded-lg border ${estiloMod.bg} ${estiloMod.texto} ${estiloMod.border}">
                        ${egressa.modalidade}
                    </span>
                </div>

                <!-- Avatar e Identificação da Egressa -->
                <div class="flex items-center gap-4 mb-4">
                    <div class="w-14 h-14 rounded-2xl ${estiloSub.avatarBg} flex items-center justify-center font-black text-lg shadow-xs shrink-0 group-hover:scale-105 transition-transform">
                        <span>${egressa.iniciais}</span>
                    </div>
                    <div>
                        <h3 class="text-base font-bold text-memc-roxo-escuro leading-snug">
                            ${egressa.nome}
                        </h3>
                        <span class="text-xs text-neutral-500 font-medium block mt-0.5">
                            ${egressa.modalidadeExtenso}
                        </span>
                    </div>
                </div>

                <!-- Informações Institucionais e Orientação -->
                <div class="space-y-2 pt-2 border-t border-neutral-100 text-xs">
                    <div class="flex items-start gap-2 text-neutral-600">
                        <i class="fa-solid fa-building-columns ${estiloSub.textoCor} mt-0.5 shrink-0" aria-hidden="true"></i>
                        <span class="font-medium">${egressa.instituicao}</span>
                    </div>
                    <div class="flex items-start gap-2 text-neutral-600">
                        <i class="fa-solid fa-user-tie ${estiloSub.textoCor} mt-0.5 shrink-0" aria-hidden="true"></i>
                        <span class="font-medium"><strong class="font-semibold text-neutral-700">Orientação:</strong> ${egressa.orientacao}</span>
                    </div>
                </div>
            </div>

            <!-- Botão de Acesso ao Lattes -->
            <div class="mt-5 pt-3 border-t border-neutral-100">
                <a href="${egressa.lattes}" target="_blank" rel="noopener noreferrer" class="w-full inline-flex items-center justify-center gap-2 px-3 py-2 text-xs font-bold text-neutral-700 bg-neutral-100 hover:bg-memc-azul hover:text-white rounded-xl transition-all shadow-2xs">
                    <i class="fa-solid fa-graduation-cap" aria-hidden="true"></i>
                    <span>Currículo Lattes</span>
                </a>
            </div>
        </article>
    `;
}

/**
 * Filtra e renderiza a lista de egressas no DOM com base no estado atual dos filtros.
 */
function renderizarEgressas() {
    const container = document.getElementById('grid-egressas');
    const contadorEl = document.getElementById('contador-egressas');
    const vazioEl = document.getElementById('vazio-egressas');

    if (!container) return;

    const listaFiltrada = EGRESSAS_DATA.filter(item => {
        // Filtro por Subsede
        const passaSubsede = (estadoFiltroEgressas.subsede === 'todas') ||
            (item.subsede === parseInt(estadoFiltroEgressas.subsede, 10));

        // Filtro por Modalidade
        const passaModalidade = (estadoFiltroEgressas.modalidade === 'todas') ||
            (item.modalidade === estadoFiltroEgressas.modalidade);

        // Filtro por Busca Textual (Nome, Orientador ou Instituição)
        const termo = estadoFiltroEgressas.termoBusca.toLowerCase().trim();
        const passaBusca = !termo ||
            item.nome.toLowerCase().includes(termo) ||
            item.orientacao.toLowerCase().includes(termo) ||
            item.instituicao.toLowerCase().includes(termo);

        return passaSubsede && passaModalidade && passaBusca;
    });

    // Atualização do contador visual
    if (contadorEl) {
        contadorEl.textContent = `${listaFiltrada.length} ${listaFiltrada.length === 1 ? 'bolsista encontrada' : 'bolsistas encontradas'}`;
    }

    if (listaFiltrada.length === 0) {
        container.innerHTML = '';
        if (vazioEl) vazioEl.classList.remove('hidden');
    } else {
        if (vazioEl) vazioEl.classList.add('hidden');
        container.innerHTML = listaFiltrada.map(criarCardEgressaHTML).join('');
    }
}

/**
 * Altera o filtro ativo de Subsede.
 * @param {string} valorSubsede - 'todas', '1', '2', '3' ou '4'
 */
function filtrarEgressasPorSubsede(valorSubsede) {
    estadoFiltroEgressas.subsede = valorSubsede;

    const classesAtivasPorSubsede = {
        'todas': ['bg-memc-roxo-escuro', 'text-white', 'shadow-xs'],
        '1': ['bg-instituicoes-subsede1', 'text-neutral-900', 'border-instituicoes-subsede1', 'font-black', 'shadow-xs'],
        '2': ['bg-instituicoes-subsede2', 'text-neutral-900', 'border-instituicoes-subsede2', 'font-black', 'shadow-xs'],
        '3': ['bg-instituicoes-subsede3', 'text-neutral-900', 'border-instituicoes-subsede3', 'font-black', 'shadow-xs'],
        '4': ['bg-instituicoes-subsede4', 'text-neutral-900', 'border-instituicoes-subsede4', 'font-black', 'shadow-xs']
    };

    const todasClassesAtivas = [
        'bg-memc-roxo-escuro', 'bg-instituicoes-subsede1', 'bg-instituicoes-subsede2', 'bg-instituicoes-subsede3', 'bg-instituicoes-subsede4',
        'border-instituicoes-subsede1', 'border-instituicoes-subsede2', 'border-instituicoes-subsede3', 'border-instituicoes-subsede4',
        'bg-memc-roxo-medio', 'text-white', 'text-neutral-900', 'font-black', 'shadow-xs'
    ];

    // Atualiza classes ativas dos botões de subsede
    document.querySelectorAll('[data-filtro-subsede]').forEach(btn => {
        const val = btn.getAttribute('data-filtro-subsede');
        btn.classList.remove(...todasClassesAtivas);

        if (val === valorSubsede) {
            const classesAtivar = classesAtivasPorSubsede[val] || ['bg-neutral-800', 'text-white', 'shadow-xs'];
            btn.classList.add(...classesAtivar);
            btn.classList.remove('bg-white', 'text-neutral-700', 'border-neutral-200');
        } else {
            btn.classList.add('bg-white', 'text-neutral-700', 'border-neutral-200');
        }
    });

    renderizarEgressas();
}

/**
 * Altera o filtro ativo de Modalidade de Bolsa.
 * @param {string} valorModalidade - 'todas', 'ICJ', 'IC' ou 'AT'
 */
function filtrarEgressasPorModalidade(valorModalidade) {
    estadoFiltroEgressas.modalidade = valorModalidade;

    // Atualiza classes ativas dos botões de modalidade
    document.querySelectorAll('[data-filtro-modalidade]').forEach(btn => {
        const ativo = btn.getAttribute('data-filtro-modalidade') === valorModalidade;
        if (ativo) {
            btn.classList.add('bg-memc-rosa', 'text-white', 'shadow-xs');
            btn.classList.remove('bg-white', 'text-neutral-700', 'border-neutral-200');
        } else {
            btn.classList.remove('bg-memc-rosa', 'text-white', 'shadow-xs');
            btn.classList.add('bg-white', 'text-neutral-700', 'border-neutral-200');
        }
    });

    renderizarEgressas();
}

/**
 * Manipulador do campo de busca textual em tempo real.
 * @param {Event} event
 */
function buscarEgressasInput(event) {
    estadoFiltroEgressas.termoBusca = event.target.value;
    renderizarEgressas();
}

// Inicialização automática após carregamento do DOM
document.addEventListener('DOMContentLoaded', () => {
    const inputBusca = document.getElementById('input-busca-egressas');
    if (inputBusca) {
        inputBusca.addEventListener('input', buscarEgressasInput);
    }
    renderizarEgressas();
});
