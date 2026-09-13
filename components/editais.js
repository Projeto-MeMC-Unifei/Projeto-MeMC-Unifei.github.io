/**
 * Web Component personalizado para renderizar cartões de Editais da Rede MeMC.
 * Segue o padrão HTML5 Custom Elements nativo, promovendo reuso de código e encapsulamento.
 */
class Editais extends HTMLElement {
    constructor() {
        super();
    }

    /**
     * Define os atributos observados pelo navegador para atualizar o componente dinamicamente.
     */
    static get observedAttributes() {
        return ['edital-id', 'title', 'deadline', 'pdf-href', 'status', 'description'];
    }

    connectedCallback() {
        this.render();
    }

    attributeChangedCallback() {
        this.render();
    }

    /**
     * Renderiza o HTML do cartão de edital aplicando estilos utilitários do Tailwind CSS e regras de acessibilidade.
     */
    render() {
        const id = this.getAttribute('edital-id') || 'edital_padrao';
        const title = this.getAttribute('title') || 'Edital de Seleção';
        const deadline = this.getAttribute('deadline') || 'Indefinido';
        const pdf = this.getAttribute('pdf-href') || '#';
        const status = this.getAttribute('status') || 'INSCRIÇÕES ENCERRADAS';
        const description = this.getAttribute('description') || 'Consulte os requisitos oficiais.';

        let cor_tag_bg = 'bg-neutral-200';
        let cor_tag_texto = 'text-neutral-800';
        let cor_botao = 'bg-neutral-600 hover:bg-neutral-800 text-white';
        let texto_botao = 'Baixar PDF';
        let borda_cartao = 'border-neutral-400';
        let display_tag = 'inline-block';
        let classes_tag_espaçamento = 'px-4 py-1.5 rounded-full mb-4';
        let html_pdf = '<span class="flex items-center gap-1 font-semibold"><i class="fa-solid fa-file-pdf text-memc-rosa" aria-hidden="true"></i> PDF</span>';
        let texto_tag = status.toUpperCase();
        let html_botao = '';

        if (['INSCRIÇÕES ABERTAS', 'NOVO'].includes(status.toUpperCase())) {
            cor_tag_bg = 'bg-memc-amarelo';
            cor_tag_texto = 'text-memc-roxo-escuro';
            cor_botao = 'bg-memc-verde hover:opacity-90 text-white';
            texto_botao = 'Baixar Edital';
            borda_cartao = 'border-memc-rosa';
        }
        else if (status.toUpperCase() === 'RESULTADO') {
            cor_botao = 'bg-memc-verde hover:opacity-90 text-white';
            texto_botao = 'Baixar Resultado';
            borda_cartao = 'border-memc-rosa';
            display_tag = 'hidden';
            classes_tag_espaçamento = '';
        }
        else if (status.toUpperCase().includes('INSCRIÇÕES EM BREVE')) {
            cor_tag_bg = 'bg-memc-azul';
            cor_tag_texto = 'text-white';
            cor_botao = 'bg-memc-rosa text-white cursor-default opacity-85';
            texto_botao = 'Em breve';
            borda_cartao = 'border-memc-rosa';
            html_pdf = '';
            texto_tag = status.toUpperCase();
            html_botao = `<div class="block w-full text-center px-6 py-3 ${cor_botao} font-semibold rounded-xl shadow-sm">${texto_botao}</div>`;
        }

        if (!html_botao) {
            html_botao = `<a href="${pdf}" 
                             target="_blank" 
                             rel="noopener noreferrer"
                             aria-label="Baixar documento em PDF para ${title}"
                             class="block w-full text-center px-6 py-3 ${cor_botao} font-semibold rounded-xl transition-all duration-200 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-memc-rosa shadow-sm hover:shadow-md">
                            ${texto_botao}
                          </a>`;
        }

        this.innerHTML = `
            <article class="bg-white p-6 rounded-2xl shadow-sm border-t-[6px] ${borda_cartao} border-x border-b border-neutral-200/80 snap-center shrink-0 w-[340px] flex flex-col h-full hover:shadow-xl hover:-translate-y-1 transition-all duration-300 text-left">
                
                <div class="flex-1">
                    <span class="${display_tag} ${classes_tag_espaçamento} text-xs font-bold ${cor_tag_bg} ${cor_tag_texto} shadow-xs">
                        ${texto_tag}
                    </span>
                    
                    <h3 class="text-2xl font-bold text-memc-roxo-escuro mb-4 leading-tight">${title}</h3>
                    <p class="text-sm text-neutral-600 mb-6 leading-relaxed">${description}</p>
                </div>
                
                <div>
                    <div class="flex items-center justify-between text-sm font-medium text-memc-azul mb-6 bg-neutral-50 p-3 rounded-xl border border-neutral-200/60">
                        <span class="flex items-center gap-1.5 text-neutral-700 font-semibold">
                            <i class="fa-regular fa-calendar-days text-memc-rosa" aria-hidden="true"></i> 
                            Prazo: ${deadline}
                        </span>
                        ${html_pdf}
                    </div>
                    
                    ${html_botao}
                </div>
                
            </article>
        `;
    }
}

// Registro oficial do Web Component
customElements.define('editais-component', Editais);