/**
 * @file components/pesquisadores.js
 * @description Módulo de dados e renderização automatizada dos cartões de pesquisadores da Rede Meninas e Mulheres Cientistas (MeMC).
 * 
 * Arquitetura e Boas Práticas:
 * - Elimina a duplicação excessiva de HTML nos blocos de subsedes do index.html (Princípio DRY).
 * - Renderização modular e desacoplada, preservando estritamente os estilos visuais de cada subsede.
 * - Suporta inicialização automática via DOMContentLoaded e invocação manual via renderizarPesquisadores().
 * - Tratamento de acessibilidade (WCAG), fallback de iniciais caso a imagem não carregue e links opcionais (Lattes e ORCID).
 */

/**
 * @typedef {Object} PesquisadorItem
 * @property {string} id - Identificador exclusivo do pesquisador
 * @property {number} subsede - Número da subsede de vínculo (1, 2, 3 ou 4)
 * @property {string} nome - Nome completo com títulos acadêmicos
 * @property {string} foto - Caminho relativo da imagem de perfil
 * @property {string} iniciais - Iniciais para exibição em caso de falha de carregamento da foto
 * @property {string} [lattes] - URL do Currículo Lattes no CNPq
 * @property {string} [orcid] - URL do identificador persistente ORCID
 */

/**
 * Configurações visuais e temas cromáticos por subsede, respeitando a identidade visual da Rede MeMC.
 */
const TEMAS_SUBSEDES = {
    1: {
        bordaPadrao: 'border-memc-roxo-medio/40',
        bordaHover: 'hover:border-memc-roxo-medio hover:shadow-xl',
        avatarFallback: 'bg-purple-100 text-memc-roxo-medio',
        tituloCor: 'text-memc-roxo-escuro'
    },
    2: {
        bordaPadrao: 'border-pink-200/80',
        bordaHover: 'hover:border-memc-rosa hover:shadow-xl',
        avatarFallback: 'bg-purple-100 text-memc-roxo-medio',
        tituloCor: 'text-memc-roxo-escuro'
    },
    3: {
        bordaPadrao: 'border-memc-laranja/20',
        bordaHover: 'hover:border-memc-laranja hover:shadow-xl',
        avatarFallback: 'bg-instituicoes-subsede3/30 text-neutral-900',
        tituloCor: 'text-memc-roxo-escuro'
    },
    4: {
        bordaPadrao: 'border-memc-amarelo/20',
        bordaHover: 'hover:border-memc-amarelo hover:shadow-xl',
        avatarFallback: 'bg-amber-100 text-amber-900',
        tituloCor: 'text-memc-roxo-escuro'
    }
};

/**
 * Base de dados oficial de pesquisadores da Rede MeMC.
 * Armazenada em memória para evitar bloqueios de CORS e garantir compatibilidade total local (file://) e remota (GitHub Pages).
 * 
 * @type {PesquisadorItem[]}
 */
const PESQUISADORES_DATA = [
    // =========================================================================
    // SUBSEDE 1: UNIFESP (Campus Diadema) - Projeto "Cientista por um Dia"
    // =========================================================================
    {
        id: 'pesquisador-sub1-ana-gouw',
        subsede: 1,
        nome: 'Profa. Dra. Ana Maria Santos Gouw',
        foto: 'img/pesquisadores/subsede1/ana-maria-santos-gouw.jpeg',
        iniciais: 'AG',
        lattes: 'http://lattes.cnpq.br/3359786303402164',
        orcid: 'https://orcid.org/0000-0002-1245-4304',
    },
    {
        id: 'pesquisador-sub1-helga-aleme',
        subsede: 1,
        nome: 'Profa. Dra. Helga Gabriela Aleme',
        foto: 'img/pesquisadores/subsede1/helga-gabriela-aleme.jpg',
        iniciais: 'HA',
        lattes: 'http://lattes.cnpq.br/3534671658166290',
        orcid: 'https://orcid.org/0000-0001-8679-1541',
    },
    {
        id: 'pesquisador-sub1-simone-martorano',
        subsede: 1,
        nome: 'Profa. Dra. Simone Alves de Assis Martorano',
        foto: 'img/pesquisadores/subsede1/simone-alves-assis-martorano.jpg',
        iniciais: 'SM',
        lattes: 'http://lattes.cnpq.br/3872820602594598',
        orcid: 'https://orcid.org/0000-0002-7115-0933'
    },
    {
        id: 'pesquisador-sub1-solange-locatelli',
        subsede: 1,
        nome: 'Profa. Dra. Solange Wagner Locatelli',
        foto: 'img/pesquisadores/subsede1/solange-wagner-locatelli.webp',
        iniciais: 'SL',
        lattes: 'http://lattes.cnpq.br/8962640200169519',
        orcid: 'https://orcid.org/0000-0002-7639-6772'
    },
    {
        id: 'pesquisador-sub1-thiago-souza',
        subsede: 1,
        nome: 'Prof. Dr. Thiago Antunes Souza',
        foto: 'img/pesquisadores/subsede1/thiago-antunes-souza.jpg',
        iniciais: 'TS',
        lattes: 'http://lattes.cnpq.br/2333371957286724',
        orcid: 'https://orcid.org/0000-0002-5881-8855'
    },
    {
        id: 'pesquisador-sub1-luciane-goes',
        subsede: 1,
        nome: 'Profa. Dra. Luciane Fernandes Goes',
        foto: 'img/pesquisadores/subsede1/luciane-fernandes-goes.jpeg',
        iniciais: 'LG',
        lattes: 'http://lattes.cnpq.br/0448594654044672',
        orcid: 'https://orcid.org/0000-0002-4334-786X',
    },
    {
        id: 'pesquisador-sub1-paulo-calefi',
        subsede: 1,
        nome: 'Prof. Dr. Paulo Roberto Calefi',
        foto: 'img/pesquisadores/subsede1/paulo-roberto-calefi.gif',
        iniciais: 'PC',
        lattes: 'http://lattes.cnpq.br/9537847478859172',
        orcid: 'https://orcid.org/0000-0002-4455-6030',
    },

    // =========================================================================
    // SUBSEDE 2: USP (Ribeirão Preto) - Centro de Ensino Integrado de Química (CEIQ)
    // =========================================================================
    {
        id: 'pesquisador-sub2-daniela-abreu',
        subsede: 2,
        nome: 'Profa. Dra. Daniela Gonçalves de Abreu Favacho',
        foto: 'img/pesquisadores/subsede2/daniela-goncalves-abreu-favacho.png',
        iniciais: 'AG',
        lattes: 'http://lattes.cnpq.br/1341833254376796',
        orcid: 'https://orcid.org/0000-0003-1533-4647'
    },
    {
        id: 'pesquisador-sub2-glaucia-degreve',
        subsede: 2,
        nome: 'Profa. Dra. Glaucia Maria da Silva Degrève',
        foto: 'img/pesquisadores/glaucia-maria-silva-degreve.jpg',
        iniciais: 'GM',
        lattes: 'http://lattes.cnpq.br/8092801988782660',
        orcid: 'https://orcid.org/0000-0003-3613-3502',
    },
    {
        id: 'pesquisador-sub2-joana-andrade',
        subsede: 2,
        nome: 'Profa. Dra. Joana de Jesus de Andrade',
        foto: 'img/pesquisadores/subsede2/joana-jesus-andrade.png',
        iniciais: 'JJ',
        lattes: 'http://lattes.cnpq.br/1479952244350737',
        orcid: 'https://orcid.org/0000-0002-6161-2209'
    },

    // =========================================================================
    // SUBSEDE 3: UNIFEI (Itajubá e Itabira) - Projeto "Semeando Cientistas"
    // =========================================================================
    {
        id: 'pesquisador-sub3-milady-silva',
        subsede: 3,
        nome: 'Profa. Dra. Milady Renata Apolinário da Silva',
        foto: 'img/pesquisadores/subsede3/milady-renata-apolinario-silva.jpeg',
        iniciais: 'MS',
        lattes: 'http://lattes.cnpq.br/8292109678587891',
        orcid: 'https://orcid.org/0000-0002-0496-2085',
    },
    {
        id: 'pesquisador-sub3-maria-elizabete',
        subsede: 3,
        nome: 'Profa. Dra. Maria Elizabete Villela Santiago',
        foto: 'img/pesquisadores/subsede3/maria-elizabete-villela-santiago.jpeg',
        iniciais: 'ES',
        lattes: 'http://lattes.cnpq.br/5436944715497709',
        orcid: 'https://orcid.org/0000-0001-7404-2914'
    },
    {
        id: 'pesquisador-sub3-ana-paula-pereira',
        subsede: 3,
        nome: 'Profa. Dra. Ana Paula de Paiva Pereira',
        foto: 'img/pesquisadores/subsede3/ana-paula-paiva-pereira.png',
        iniciais: 'AP',
        lattes: 'http://lattes.cnpq.br/5199859493258720',
        orcid: 'https://orcid.org/0000-0001-7433-4319'
    },
    {
        id: 'pesquisador-sub3-silmara-kabayama',
        subsede: 3,
        nome: 'Profa. Dra. Silmara Cristina Baldissera Kabayama',
        foto: 'img/pesquisadores/subsede3/silmara-cristina-baldissera-kabayama.jpeg',
        iniciais: 'SC',
        lattes: 'http://lattes.cnpq.br/9340276749435306',
        orcid: null // Sem ORCID registrado no index original
    },
    {
        id: 'pesquisador-sub3-fischer-ferreira',
        subsede: 3,
        nome: 'Prof. Dr. Fischer Jônatas Ferreira',
        foto: 'img/pesquisadores/subsede3/fischer-jonatas-ferreira.jpg',
        iniciais: 'FF',
        lattes: 'https://lattes.cnpq.br/1412888913678183',
        orcid: 'https://orcid.org/0000-0002-3643-8720'
    },
    {
        id: 'pesquisador-sub3-eduardo-machado',
        subsede: 3,
        nome: 'Eduardo Jabbur Machado',
        foto: 'img/pesquisadores/subsede3/eduardo-jabbur-machado.png',
        iniciais: 'EM',
        lattes: 'http://lattes.cnpq.br/6577201319862337',
        orcid: 'https://orcid.org/0000-0001-5108-8928'
    },
    {
        id: 'pesquisador-sub3-gustavo-gomes',
        subsede: 3,
        nome: 'Gustavo Henrique de Magalhães Gomes',
        foto: 'img/pesquisadores/subsede3/gustavo-henrique-magalhaes-gomes.jpg',
        iniciais: 'GG',
        lattes: 'http://lattes.cnpq.br/4448145503046101',
        orcid: 'https://orcid.org/0000-0002-2944-7039'
    },

    // =========================================================================
    // SUBSEDE 4: UFSCAR (SOROCABA)
    // =========================================================================
    {
        id: 'pesquisador-sub4-elaine-furlan',
        subsede: 4,
        nome: 'Profa. Dra. Elaine Gomes Matheus Furlan',
        foto: 'img/pesquisadores/subsede4/elaine-gomes-matheus-furlan.gif',
        iniciais: 'EF',
        lattes: 'http://lattes.cnpq.br/3179865576965852',
        orcid: 'https://orcid.org/0000-0002-5413-7964',
    },
    {
        id: 'pesquisador-sub4-maria-gebara',
        subsede: 4,
        nome: 'Profa. Dra. Maria José Fontana Gebara',
        foto: 'img/pesquisadores/subsede4/maria-jose-fontana-gebara.gif',
        iniciais: 'MF',
        lattes: 'http://lattes.cnpq.br/6585493065968961',
        orcid: 'https://orcid.org/0000-0002-9459-8167',
    },
    {
        id: 'pesquisador-sub4-marystela-ferreira',
        subsede: 4,
        nome: 'Profa. Dra. Marystela Ferreira',
        foto: 'img/pesquisadores/subsede4/marystela-ferreira.gif',
        iniciais: 'MF',
        lattes: 'http://lattes.cnpq.br/4714185516263478',
        orcid: 'https://orcid.org/0000-0002-9459-8167',
    },
    {
        id: 'pesquisador-sub4-joao-junior',
        subsede: 4,
        nome: 'Dr. João Batista dos Santos Junior',
        foto: 'img/pesquisadores/subsede4/joao-batista-santos-junior.gif',
        iniciais: 'JS',
        lattes: 'http://lattes.cnpq.br/5615071332323472',
        orcid: 'https://orcid.org/0000-0002-1952-2242',
    },
    {
        id: 'pesquisador-sub4-gustavo-gibin',
        subsede: 4,
        nome: 'Dr. Gustavo Bizarria Gibin',
        foto: 'img/pesquisadores/subsede4/gustavo-bizarria-gibin.gif',
        iniciais: 'GG',
        lattes: 'http://lattes.cnpq.br/4695253173194100',
        orcid: 'https://orcid.org/0000-0001-9473-255X',
    }
];

/**
 * Cria a marcação HTML individual de um cartão de pesquisador(a).
 * Garante a preservação de tags de acessibilidade, fallbacks e estilos de cada subsede.
 * 
 * @param {PesquisadorItem} pesquisador - Dados do(a) pesquisador(a)
 * @returns {string} String com a marcação HTML semântica do card
 */
function criarCardPesquisadorHTML(pesquisador) {
    const tema = TEMAS_SUBSEDES[pesquisador.subsede] || TEMAS_SUBSEDES[1];

    // Cor do título (nome)
    const classeTitulo = tema.tituloCor || 'text-memc-roxo-escuro';

    // Estilo do fallback de iniciais
    const classeFallback = tema.avatarFallback;

    // Botão de Currículo Lattes (se fornecido)
    const botaoLattesHTML = pesquisador.lattes ? `
        <a href="${pesquisador.lattes}" target="_blank"
            rel="noopener noreferrer"
            class="w-full inline-flex items-center justify-center gap-2 px-3 py-2 text-xs font-bold text-neutral-700 bg-neutral-100 hover:bg-memc-azul hover:text-white rounded-xl transition-all"
            aria-label="Acessar Currículo Lattes de ${pesquisador.nome}">
            <i class="fa-solid fa-graduation-cap" aria-hidden="true"></i>
            <span>Currículo Lattes</span>
        </a>
    ` : '';

    // Botão de ORCID Oficial (se fornecido)
    const botaoOrcidHTML = pesquisador.orcid ? `
        <a href="${pesquisador.orcid}" target="_blank"
            rel="noopener noreferrer"
            class="w-full inline-flex items-center justify-center gap-2 px-3 py-2 text-xs font-bold text-emerald-800 bg-emerald-50 hover:bg-emerald-600 hover:text-white rounded-xl transition-all border border-emerald-200/60"
            aria-label="Acessar perfil ORCID de ${pesquisador.nome}">
            <i class="fa-brands fa-orcid text-emerald-600 group-hover:text-emerald-600" aria-hidden="true"></i>
            <span>ORCID Oficial</span>
        </a>
    ` : '';

    return `
        <div class="bg-white/95 backdrop-blur-md rounded-3xl p-6 shadow-md border-2 ${tema.bordaPadrao} ${tema.bordaHover} transition-all flex flex-col items-center text-center relative group">
            
            <!-- Container do Avatar com suporte a Imagem ou Fallback de Iniciais -->
            <div class="relative w-24 h-24 mb-4 rounded-full p-1 bg-gradient-to-tr from-memc-roxo-medio to-memc-rosa shadow-sm">
                <img src="${pesquisador.foto}"
                    alt="Foto ${pesquisador.nome}"
                    class="w-full h-full object-cover rounded-full"
                    onerror="this.classList.add('hidden'); this.nextElementSibling.classList.remove('hidden')">
                <div class="w-full h-full rounded-full ${classeFallback} flex items-center justify-center font-bold text-xl shadow-inner hidden">
                    <span>${pesquisador.iniciais}</span>
                </div>
            </div>

            <!-- Nome do(a) Pesquisador(a) -->
            <h3 class="text-base font-bold ${classeTitulo} leading-snug mb-5">
                ${pesquisador.nome}
            </h3>

            <!-- Links Lattes e ORCID -->
            <div class="w-full space-y-2 mt-auto pt-3 border-t border-neutral-100">
                ${botaoLattesHTML}
                ${botaoOrcidHTML}
            </div>
        </div>
    `;
}

/**
 * Renderiza os cartões de pesquisadores de uma determinada subsede dentro de seu container no DOM.
 * 
 * @param {number|string} subsedeNum - Número da subsede (1, 2, 3 ou 4)
 * @param {string} [idContainer] - ID opcional do container no DOM (padrão: "pesquisadores-subsede{subsedeNum}")
 */
function renderizarPesquisadores(subsedeNum, idContainer) {
    const num = parseInt(subsedeNum, 10);
    const containerId = idContainer || `pesquisadores-subsede${num}`;
    const container = document.getElementById(containerId);

    if (!container) return;

    const lista = PESQUISADORES_DATA.filter(p => p.subsede === num);
    container.innerHTML = lista.map(criarCardPesquisadorHTML).join('');
}

/**
 * Renderiza os pesquisadores de todas as subsedes registradas na página.
 */
function renderizarTodasSubsedes() {
    [1, 2, 3, 4].forEach(num => {
        renderizarPesquisadores(num);
    });
}

// Inicialização automática no carregamento do DOM
document.addEventListener('DOMContentLoaded', renderizarTodasSubsedes);
