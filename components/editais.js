class Editais extends HTMLElement {
    constructor() {
        super();
    }

    static get observedAttributes() {
        return ['edital-id', 'title', 'deadline', 'pdf-href', 'status', 'description'];
    }

    connectedCallback() {
        this.render();
    }

    attributeChangedCallback() {
        this.render();
    }

    render() {
        const id = this.getAttribute('edital-id') || 'edital_padrao';
        const title = this.getAttribute('title') || 'Edital de Seleção';
        const deadline = this.getAttribute('deadline') || 'Indefinido';
        const pdf = this.getAttribute('pdf-href') || '#';
        const status = this.getAttribute('status') || 'INSCRIÇÕES ENCERRADAS';
        const description = this.getAttribute('description') || 'Consulte os requisitos oficiais.';

        let cor_tag_bg = 'bg-memc-cinza-claro';
        let cor_tag_texto = 'text-white';
        let cor_botao = 'bg-memc-cinza-claro hover:bg-memc-cinza-escuro text-white';
        let texto_botao = 'Baixar PDF';
        let borda_cartao = 'border-memc-cinza-claro';
        let display_tag = 'inline-block';
        let classes_tag_espaçamento = 'px-4 py-1.5 rounded-full mb-4';
        let html_pdf = '<span class="flex items-center gap-1">📄 PDF</span>';
        let texto_tag = status.toUpperCase();
        let html_botao = '';

        console.log("Renderizando edital:", title, " | Status:", status);

        if (status.toUpperCase() === 'INSCRIÇÕES ABERTAS') {
            cor_tag_bg = 'bg-memc-amarelo';
            cor_tag_texto = 'text-memc-roxo-escuro';
            cor_botao = 'bg-memc-verde hover:opacity-90 text-white';
            texto_botao = 'Baixar Edital';
            borda_cartao = 'border-memc-rosa';
        }

        else if (status.toUpperCase() === 'RESULTADO') {
            cor_botao = 'bg-memc-verde hover:opacity-90 text-white';
            texto_botao = 'Baixar PDF';
            borda_cartao = 'border-memc-rosa';
            display_tag = 'hidden';
            classes_tag_espaçamento = '';
        }

        else if (status.toUpperCase().includes('INSCRIÇÕES EM BREVE')) {
            cor_tag_bg = 'bg-memc-azul';
            cor_tag_texto = 'text-white';
            cor_botao = 'bg-memc-rosa text-white cursor-default';
            texto_botao = 'Em breve';
            borda_cartao = 'border-memc-rosa';
            html_pdf = '';
            texto_tag = status.toUpperCase();
            html_botao = `<div class="block w-full text-center px-6 py-3 ${cor_botao} font-semibold rounded-lg">${texto_botao}</div>`;
        }

        if (!html_botao) {
            html_botao = `<a href="${pdf}" target="_blank" class="block w-full text-center px-6 py-3 ${cor_botao} font-semibold rounded-lg transition-opacity">${texto_botao}</a>`;
        }

        this.innerHTML = `
            <div class="bg-white p-6 rounded-2xl shadow-md border-t-[6px] ${borda_cartao} snap-center shrink-0 w-[340px] flex flex-col h-full hover:shadow-lg transition-shadow text-left">
                
                <div class="flex-1">
                    <span class="${display_tag} ${classes_tag_espaçamento} text-xs font-bold ${cor_tag_bg} ${cor_tag_texto}">
                        ${texto_tag}
                    </span>
                    
                    <h3 class="text-2xl font-bold text-memc-roxo-escuro mb-6">${title}</h3>
                </div>
                
                <div>
                    <div class="flex gap-4 text-sm font-medium text-memc-azul mb-6">
                        <span class="flex items-center gap-1">📅 Prazo: ${deadline}</span>
                        ${html_pdf}
                    </div>
                    
                    ${html_botao}
                </div>
                
            </div>
        `;
    }
}

customElements.define('editais-component', Editais);