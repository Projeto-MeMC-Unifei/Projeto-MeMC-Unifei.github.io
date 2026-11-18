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
        tipo: "Artigo",
        dataLocal: "2027",
        titulo: "Meninas e Mulheres Cientistas: Discussão de gênero na Educação Científica para a Cidadania",
        autores: "Luciane Fernandes Goes, Thiago Antunes-Souza e Elaine Gomes Furlan",
        link: ""
    },
    {
        tipo: "Artigo",
        dataLocal: "Novembro 2026",
        titulo: "Mulheres na Ciência: Caminhos Formativos Para Transformação",
        autores: "Elaine Gomes Matheus Furlan, Talita Martins de Oliveira",
        link: "https://www.even3.com.br/anais/cbe2026/1611448-mulheres-na-ciencia--caminhos-formativos-para-transformacao/"
    },
    {
        tipo: "Artigo",
        dataLocal: "Novembro 2026",
        titulo: "Contribuições da Iniciação Científica Júnior Para a Formação de Meninas na Ciência",
        autores: "Renan Vilela Bertolin, Elaine Gomes Matheus Furlan",
        link: "https://www.even3.com.br/anais/cbe2026/1610654-contribuicoes-da-iniciacao-cientifica-junior-para-a-formacao-de-meninas-na-ciencia/"
    },
    {
        tipo: "Artigo",
        dataLocal: "Setembro 2026",
        titulo: "Preconceitos e questões de gênero na Ciência: Impactos para as estudantes do Ensino Médio",
        autores: "Beatriz Lisboa Pereira, Anny Beatriz Virginio e Elaine Gomes Matheus Furlan",
        link: "https://epf.unesp.br/pepe/index.php/pepe/article/view/144"
    },
    {
        tipo: "Ensaio",
        dataLocal: "Agosto 2026",
        titulo: "Quando ensinar Ciências também significa construir pertencimento - Professora, a gente pode estar aqui?",
        autores: "Dra. Luciane Fernandes Goes",
        link: "https://sites.usp.br/revistabalburdia/quando-ensinar-ciencias-tambem-significa-construir-pertencimento/"
    },
    {
        tipo: "Artigo",
        dataLocal: "Dezembro 2025",
        titulo: "Professoras Mulheres na Engenharia: Representatividade na Docência",
        autores: "Beatriz Lisboa Pereira, Sabrina de Marchi Gasparini, Elaine Gomes Matheus Furlan",
        link: "https://educacaopublica.cecierj.edu.br/divulgacao-cientifica/index.php/educacaopublica/article/view/335"
    },
    {
        tipo: "Artigo",
        dataLocal: "Novembro 2025",
        titulo: "Entre o apagamento histórico e os desafios atuais: A participação de mulheres nas Ciências Exatas, Engenharias e Computação",
        autores: "Elisa Maria Costa Silva e Luciane Fernandes Goes",
        link: "https://educacaopublica.cecierj.edu.br/divulgacao-cientifica/index.php/educacaopublica/article/view/362/233"
    },
    {
        tipo: "Artigo",
        dataLocal: "Outubro 2022",
        titulo: "Percepções de estudantes do 9º ano do EnsinoFundamental sobre a Participação Feminina nas Ciências",
        autores: "Talita Martins Oliveira de Souza, Elaine Gomes Matheus Furlan, Thiago Antunes Souza",
        link: "https://rsdjournal.org/index.php/rsd/article/view/36312"
    },
];

/**
 * Gera a marcação HTML individual de um card de publicação.
 * Caso a publicação possua `link` preenchido, renderiza um card clicável (`<a>`) com botão de acesso.
 * Caso `link` esteja vazio, renderiza um container estático (`<div>`) destacando a previsão de publicação
 * no topo (em formato de badge da paleta MeMC) e um selo informativo desabilitado no rodapé.
 *
 * @param {Object} pub - Objeto contendo os dados da publicação (tipo, dataLocal, titulo, autores, resumo, link).
 * @returns {string} String HTML correspondente ao card da publicação.
 */
function criarCardPublicacaoHTML(pub) {
    const cores = obterCoresTipo(pub.tipo);
    const possuiLink = Boolean(pub.link && pub.link.trim() !== '');

    // Define a tag estrutural principal e classes de interatividade conforme disponibilidade de link
    const tagabertura = possuiLink
        ? `<a href="${pub.link}" target="_blank" rel="noopener noreferrer" class="bg-white p-6 md:p-8 rounded-3xl border border-neutral-200 shadow-sm flex flex-col justify-between group hover:-translate-y-1 hover:shadow-lg transition-all duration-300">`
        : `<div class="bg-white p-6 md:p-8 rounded-3xl border border-neutral-200 shadow-sm flex flex-col justify-between transition-all duration-300">`;

    const tagFechamento = possuiLink ? `</a>` : `</div>`;

    // Renderiza a data padrão ou o mini-card/badge de destaque para publicação futura no topo direito
    const indicadorDataHTML = possuiLink
        ? `<span class="text-xs text-neutral-400 font-semibold">
               ${pub.dataLocal}
           </span>`
        : `<span class="inline-flex items-center gap-1.5 text-xs font-bold text-memc-rosa bg-memc-rosa/10 border border-memc-rosa/30 px-3 py-1 rounded-full uppercase tracking-wide">
               <i class="fa-regular fa-calendar" aria-hidden="true"></i>
               Previsto para ${pub.dataLocal}
           </span>`;

    // Renderiza o botão ativo de acesso ou o selo informativo inativo no rodapé
    const acaoRodapeHTML = possuiLink
        ? `<span class="inline-flex items-center justify-center px-6 py-2.5 text-sm font-bold text-white ${cores.botao} rounded-full shadow-md transition-all duration-300">
               Acessar Publicação
               <i class="fa-solid fa-arrow-up-right-from-square ml-2 group-hover:translate-x-1 group-hover:-translate-y-1 transition-transform" aria-hidden="true"></i>
           </span>`
        : `<span class="inline-flex items-center justify-center px-6 py-2.5 text-sm font-bold text-memc-cinza-escuro bg-neutral-100 border border-neutral-200 rounded-full cursor-default select-none">
               <i class="fa-regular fa-clock mr-2 text-memc-rosa" aria-hidden="true"></i>
               Disponível em ${pub.dataLocal}
           </span>`;

    return `
        ${tagabertura}
          <div>
            <div class="flex items-center justify-between gap-2 flex-wrap mb-4">

                <!-- Tag de tipo de publicação com a regra de cores MeMC -->
                <span class="text-xs font-bold ${cores.tag} px-3 py-1 rounded-full uppercase tracking-wide">
                    ${pub.tipo}
                </span>

                <!-- Data da publicação ou badge de destaque para publicação prevista -->
                ${indicadorDataHTML}
            </div>

            <h3 class="text-xl md:text-2xl font-bold text-neutral-800 mb-2 leading-snug ${possuiLink ? 'group-hover:text-memc-roxo-medio transition-colors' : ''}">
              ${pub.titulo}
            </h3>
            
            <p class="text-sm text-neutral-500 font-light mt-3 mb-0">
              ${pub.autores}
            </p>

            ${pub.resumo ? `<p class="text-sm text-neutral-600 leading-relaxed line-clamp-3">${pub.resumo}</p>` : ''}
          </div>

          <div class="mt-5 pt-4 border-t border-neutral-100 flex flex-wrap justify-start items-center gap-4">
            ${acaoRodapeHTML}
          </div>
        ${tagFechamento}
    `;
}

/**
 * Renderiza todos os cards da lista de publicações dentro do container `#lista-publicacoes`.
 */
function renderizarPublicacoes() {
    const container = document.getElementById('lista-publicacoes');
    if (!container) return;

    container.innerHTML = publicacoes.map(criarCardPublicacaoHTML).join('');
}

document.addEventListener('DOMContentLoaded', renderizarPublicacoes);


