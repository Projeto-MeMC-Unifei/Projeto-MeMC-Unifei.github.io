/**
 * @file components/subsedes.js
 * @description Componente modular e reutilizável para renderização dos cartões das 4 subsedes da Rede Meninas e Mulheres Cientistas (MeMC).
 */

/**
 * @typedef {Object} SubsedeItem
 * @property {string} id - Identificador exclusivo do elemento no DOM
 * @property {string} instituicao - Sigla da instituição em destaque
 * @property {string} nome - Nome do projeto da subsede
 * @property {string} cidade - Cidade / campus de atuação
 * @property {string} bgTopo - Classe CSS para o fundo do cabeçalho colorido do card
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
        instituicao: 'UNIFESP',
        nome: 'Cientista por um Dia',
        cidade: 'Diadema',
        bgTopo: 'bg-purple-100',
        bgBadge: 'bg-purple-200/80 text-purple-900',
        bgIcone: 'bg-purple-600',
        svgIcone: '<svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M6 18h8"/><path d="M3 22h18"/><path d="M14 22a7 7 0 1 0 0-14h-1"/><path d="M9 14h2"/><path d="M9 12a2 2 0 0 1-2-2V6h6v4a2 2 0 0 1-2 2Z"/><path d="M12 6V3a1 1 0 0 0-1-1H9a1 1 0 0 0-1 1v3"/></svg>'
    },
    {
        id: 'card-subsede-usp',
        instituicao: 'USP',
        nome: 'Centro de Ensino Integrado de Química - CEIQ',
        cidade: 'Ribeirão Preto',
        bgTopo: 'bg-pink-100',
        bgBadge: 'bg-pink-200/80 text-pink-900',
        bgIcone: 'bg-pink-700',
        svgIcone: '<svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M10 2v7.31"/><path d="M14 9.3V2"/><path d="M8.5 2h7"/><path d="M14 9.3a6.5 6.5 0 1 1-4 0"/><path d="M5.52 16h12.96"/></svg>'
    },
    {
        id: 'card-subsede-unifei',
        instituicao: 'UNIFEI',
        nome: 'Semeando Cientistas',
        cidade: 'Itajubá',
        bgTopo: 'bg-orange-100',
        bgBadge: 'bg-orange-200/80 text-orange-900',
        bgIcone: 'bg-orange-700',
        svgIcone: '<svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M11 20A7 7 0 0 1 9.8 6.1C15.5 5 17 4.48 19 2c1 2 2 4.18 2 8 0 5.5-4.78 10-10 10Z"/><path d="M2 21c0-3 1.85-5.36 5.08-6C9.5 14.52 12 13 13 12"/></svg>'
    },
    {
        id: 'card-subsede-ufscar',
        instituicao: 'UFSCar',
        nome: 'Pequenas Cientistas',
        cidade: 'São Carlos',
        bgTopo: 'bg-yellow-100',
        bgBadge: 'bg-yellow-200/80 text-yellow-900',
        bgIcone: 'bg-yellow-600',
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
        <article class="bg-white rounded-2xl shadow-[0_4px_20px_rgba(0,0,0,0.03)] border border-slate-100 flex flex-col overflow-hidden transition-all duration-300 hover:-translate-y-1 hover:shadow-[0_10px_30px_rgba(0,0,0,0.08)]">
            <!-- Topo Colorido -->
            <div class="${subsede.bgTopo} p-5 flex justify-between items-start">
                <span class="${subsede.bgBadge} font-bold text-xs py-1.5 px-3 rounded-md uppercase tracking-wide">${subsede.instituicao}</span>
                <div class="w-10 h-10 rounded-full ${subsede.bgIcone} flex items-center justify-center text-white shadow-sm shrink-0">
                    ${subsede.svgIcone}
                </div>
            </div>
            <!-- Corpo de Texto -->
            <div class="p-6 flex flex-col flex-grow">
                <h3 class="text-xl font-bold text-slate-900 leading-tight mb-4">${subsede.nome}</h3>
                <p class="text-slate-600 text-sm mt-auto">${subsede.cidade}</p>
            </div>
        </article>
    `;
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
