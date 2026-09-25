// components/publicacoes.js

/**
 * Mapeamento reutilizável de cores por tipo de publicação utilizando a paleta da Rede MeMC.
 * Segue o padrão de projeto Strategy (Lookup Map):
 * - Artigo: Tag e Botão em Azul MeMC (bg-memc-azul) com hover Roxo Médio
 * - Ensaio: Tag e Botão em Roxo Médio MeMC (bg-memc-roxo-medio) com hover Rosa
 * - Padrão / Outros: Tag e Botão em Rosa MeMC (bg-memc-rosa) com hover Roxo Médio
 */
const CORES_TIPO_PUBLICACAO = {
    'ARTIGO': {
        tag: 'text-memc-azul bg-memc-azul/10',
        botao: 'bg-memc-azul group-hover:bg-memc-rosa'
    },
    'ENSAIO': {
        tag: 'text-memc-roxo-medio bg-memc-roxo-medio/10',
        botao: 'bg-memc-roxo-medio group-hover:bg-memc-rosa'
    },
    'DEFAULT': {
        tag: 'text-memc-rosa bg-memc-rosa/10',
        botao: 'bg-memc-rosa group-hover:bg-memc-roxo-medio'
    }
};

/**
 * Retorna as classes CSS Tailwind de cor (tag e botão) conforme o tipo de publicação.
 * 
 * @param {string} tipo - O tipo da publicação (ex: "Artigo", "Ensaio").
 * @returns {Object} Objeto contendo as classes CSS para tag e botão.
 */
function obterCoresTipo(tipo) {
    if (!tipo || typeof tipo !== 'string') {
        return CORES_TIPO_PUBLICACAO['DEFAULT'];
    }
    const chaveUpper = tipo.trim().toUpperCase();
    return CORES_TIPO_PUBLICACAO[chaveUpper] || CORES_TIPO_PUBLICACAO['DEFAULT'];
}

const publicacoes = [
    {
        tipo: "Ensaio",
        dataLocal: "Agosto 2026",
        titulo: "Quando ensinar Ciências também significa construir pertencimento - Professora, a gente pode estar aqui?",
        autores: "Dra. Luciane Fernandes Goes",
        link: "https://sites.usp.br/revistabalburdia/quando-ensinar-ciencias-tambem-significa-construir-pertencimento/"
    },
    {
        tipo: "Artigo",
        dataLocal: "Novembro 2025",
        titulo: "Entre o Apagamento Histórico e os Desafios Atuais: A Participação de Mulheres nas Ciências Exatas, Engenharias e Computação",
        autores: "Elisa Maria Costa Silva e Luciane Fernandes Goes",
        link: "https://educacaopublica.cecierj.edu.br/divulgacao-cientifica/index.php/educacaopublica/article/view/362/233"
    }
];

function renderizarPublicacoes() {
    const container = document.getElementById('lista-publicacoes');
    if (!container) return;

    container.innerHTML = publicacoes.map(pub => {
        const cores = obterCoresTipo(pub.tipo);

        return `
        <a href="${pub.link}" target="_blank" 
           class="bg-white p-6 md:p-8 rounded-3xl border border-neutral-200 shadow-sm flex flex-col justify-between group hover:-translate-y-1 hover:shadow-lg transition-all duration-300">
          
          <div>
            <div class="flex items-center justify-between mb-4">

                <!-- Tag de tipo de publicação com a regra de cores MeMC -->
                <span class="text-xs font-bold ${cores.tag} px-3 py-1 rounded-full uppercase tracking-wide">
                    ${pub.tipo}
                </span>

                <span class="text-xs text-neutral-400 font-semibold">
                    ${pub.dataLocal}
                </span>
            </div>

            <h3 class="text-xl md:text-2xl font-bold text-neutral-800 mb-2 leading-snug group-hover:text-memc-roxo-medio transition-colors">
              ${pub.titulo}
            </h3>
            
            <p class="text-sm text-neutral-500 font-light mt-3 mb-0">
              ${pub.autores}
            </p>

            ${pub.resumo ? `<p class="text-sm text-neutral-600 leading-relaxed line-clamp-3">${pub.resumo}</p>` : ''}
          </div>

          <div class="mt-5 pt-4 border-t border-neutral-100 flex flex-wrap justify-start items-center gap-4">
            <span class="inline-flex items-center justify-center px-6 py-2.5 text-sm font-bold text-white ${cores.botao} rounded-full shadow-md transition-all duration-300">
                Acessar Publicação
                <i class="fa-solid fa-arrow-up-right-from-square ml-2 group-hover:translate-x-1 group-hover:-translate-y-1 transition-transform"></i>
            </span>
          </div>
        </a>
    `;
    }).join('');
}

document.addEventListener('DOMContentLoaded', renderizarPublicacoes);


