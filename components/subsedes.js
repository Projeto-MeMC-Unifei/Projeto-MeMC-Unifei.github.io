/**
 * @file components/subsedes.js
 * @description Componente modular e reutilizável para renderização dos cartões das 4 subsedes da Rede Meninas e Mulheres Cientistas (MeMC).
 */

/**
 * @typedef {Object} SubsedeItem
 * @property {string} id - Identificador exclusivo do elemento no DOM
 * @property {string} idSecao - ID da seção HTML que será exibida ao clicar
 * @property {string} instituicao - Sigla da instituição em destaque
 * @property {string} nome - Nome do projeto da subsede
 * @property {string} cidade - Cidade / campus de atuação
 * @property {string} bgTopo - Classe CSS para o fundo do cabeçalho colorido do card
 * @property {string} bordaCor - Classe CSS para a cor da borda
 * @property {string} bgBadge - Classe CSS para a tag/badge da instituição
 * @property {string} bgIcone - Classe CSS para o container circular do ícone
 * @property {string} svgIcone - Marcação SVG do ícone temático
 */

/**
 * Matriz de dados contendo as quatro subsedes institucionais da Rede MeMC.
 * 
 * @type {SubsedeItem[]}
 */
const SUBSEDES_DATA = [
    {
        id: 'card-subsede-unifesp',
        idSecao: 'subsede1',
        instituicao: 'UNIFESP',
        nome: 'Cientista por um Dia',
        cidade: 'Diadema',
        bgTopo: 'bg-gradient-to-br from-instituicoes-subsede1/35 via-white to-instituicoes-subsede1/15',
        bordaCor: 'border-instituicoes-subsede1 hover:border-instituicoes-subsede1/80',
        bgBadge: 'bg-instituicoes-subsede1 text-neutral-900',
        bgIcone: 'bg-instituicoes-subsede1 text-neutral-900',
        svgIcone: '<svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M6 18h8"/><path d="M3 22h18"/><path d="M14 22a7 7 0 1 0 0-14h-1"/><path d="M9 14h2"/><path d="M9 12a2 2 0 0 1-2-2V6h6v4a2 2 0 0 1-2 2Z"/><path d="M12 6V3a1 1 0 0 0-1-1H9a1 1 0 0 0-1 1v3"/></svg>'
    },
    {
        id: 'card-subsede-usp',
        idSecao: 'subsede2',
        instituicao: 'USP',
        nome: 'Centro de Ensino Integrado de Química - CEIQ',
        cidade: 'Ribeirão Preto',
        bgTopo: 'bg-gradient-to-br from-instituicoes-subsede2/35 via-white to-instituicoes-subsede2/15',
        bordaCor: 'border-instituicoes-subsede2 hover:border-instituicoes-subsede2/80',
        bgBadge: 'bg-instituicoes-subsede2 text-neutral-900',
        bgIcone: 'bg-instituicoes-subsede2 text-neutral-900',
        svgIcone: '<svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M10 2v7.31"/><path d="M14 9.3V2"/><path d="M8.5 2h7"/><path d="M14 9.3a6.5 6.5 0 1 1-4 0"/><path d="M5.52 16h12.96"/></svg>'
    },
    {
        id: 'card-subsede-unifei',
        idSecao: 'subsede3',
        instituicao: 'UNIFEI',
        nome: 'Semeando Cientistas',
        cidade: 'Itajubá',
        bgTopo: 'bg-gradient-to-br from-instituicoes-subsede3/35 via-white to-instituicoes-subsede3/15',
        bordaCor: 'border-instituicoes-subsede3 hover:border-instituicoes-subsede3/80',
        bgBadge: 'bg-instituicoes-subsede3 text-neutral-900',
        bgIcone: 'bg-instituicoes-subsede3 text-neutral-900',
        svgIcone: '<svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M11 20A7 7 0 0 1 9.8 6.1C15.5 5 17 4.48 19 2c1 2 2 4.18 2 8 0 5.5-4.78 10-10 10Z"/><path d="M2 21c0-3 1.85-5.36 5.08-6C9.5 14.52 12 13 13 12"/></svg>'
    },
    {
        id: 'card-subsede-ufscar',
        idSecao: 'subsede4',
        instituicao: 'UFSCar',
        nome: 'Pequenas Cientistas',
        cidade: 'São Carlos',
        bgTopo: 'bg-gradient-to-br from-instituicoes-subsede4/35 via-white to-instituicoes-subsede4/15',
        bordaCor: 'border-instituicoes-subsede4 hover:border-instituicoes-subsede4/80',
        bgBadge: 'bg-instituicoes-subsede4 text-neutral-900',
        bgIcone: 'bg-instituicoes-subsede4 text-neutral-900',
        svgIcone: '<svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><circle cx="11" cy="11" r="8"/><path d="m21 21-4.3-4.3"/></svg>'
    }
];

/**
 * Cria e retorna a marcação HTML de um cartão individual de subsede.
 * 
 * @param {SubsedeItem} subsede - Objeto com os metadados da subsede
 * @returns {string} Fragmento HTML semântico do cartão
 */
function criarCardSubsedeHTML(subsede) {
    return `
        <a href="#${subsede.idSecao}" onclick="abrirAbaCard(event, '${subsede.idSecao}')" class="${subsede.bgTopo} border-2 ${subsede.bordaCor} p-5 rounded-2xl hover:shadow-lg transition-all flex flex-col justify-between group h-full cursor-pointer block text-left">
            
            <div class="flex items-start justify-between mb-8">
                <!-- Tag Superior -->
                <span class="${subsede.bgBadge} font-black text-xs px-4 py-1.5 rounded-full uppercase tracking-wider shadow-xs">
                    ${subsede.instituicao}
                </span>
                
                <!-- Ícone -->
                <div class="w-10 h-10 rounded-xl ${subsede.bgIcone} flex items-center justify-center shadow-xs group-hover:scale-110 transition-transform">
                    ${subsede.svgIcone}
                </div>
            </div>
            
            <!-- Conteúdo de Texto -->
            <div>
                <h4 class="text-base font-bold text-neutral-900 mb-2">${subsede.nome}</h4>
                <p class="text-xs text-neutral-600 leading-relaxed font-medium">${subsede.cidade}</p>
            </div>
            
        </a>
    `;
}

/**
 * Função responsável por trocar as abas ativas e rolar até o conteúdo
 */
function abrirAbaCard(event, idDaSecao) {
    event.preventDefault();

    // Esconde todas as outras abas
    const todasAsAbas = document.querySelectorAll('.aba-conteudo');
    todasAsAbas.forEach(aba => {
        aba.classList.add('hidden');
    });

    // Encontra a seção correspondente e remove o 'hidden' para ela aparecer
    const abaDestino = document.getElementById(idDaSecao);
    if (abaDestino) {
        abaDestino.classList.remove('hidden');

        // Rola a página suavemente até o topo da seção
        window.scrollTo({
            top: 0,
            behavior: 'smooth'
        });
    }
}

/**
 * Renderiza dinamicamente a grade de cartões de subsedes no container alvo do DOM.
 * 
 * @param {string} [containerId='grid-subsedes'] - O ID do container onde os cartões serão injetados
 */
function renderizarSubsedes(containerId = 'grid-subsedes') {
    const container = document.getElementById(containerId);
    if (!container) {
        return;
    }

    container.innerHTML = SUBSEDES_DATA.map(criarCardSubsedeHTML).join('');
}

// Inicialização automática após o carregamento estrutural do DOM
document.addEventListener('DOMContentLoaded', () => {
    renderizarSubsedes();
});