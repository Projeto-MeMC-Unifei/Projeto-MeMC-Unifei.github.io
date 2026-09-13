/**
 * Web Component personalizado para cartões de contato e redes sociais da Rede MeMC.
 * Promove código modular, reutilizável e com suporte completo a acessibilidade (WCAG 2.1 AA).
 */
class Contatos extends HTMLElement {
    constructor() {
        super();
    }

    /**
     * Atributos observados dinamicamente para renderização do cartão.
     */
    static get observedAttributes() {
        return ['contato-id', 'title', 'info', 'link-href', 'icon-class'];
    }

    connectedCallback() {
        this.render();
    }

    attributeChangedCallback() {
        this.render();
    }

    /**
     * Renderiza o cartão de contato com anel de foco por teclado e suporte a leitores de tela.
     */
    render() {
        const id = this.getAttribute('contato-id') || 'contato_padrao';
        const title = this.getAttribute('title') || 'Contato';
        const info = this.getAttribute('info') || 'Clique para acessar';
        const linkHref = this.getAttribute('link-href') || '#';
        const iconClass = this.getAttribute('icon-class') || 'fas fa-link';

        this.innerHTML = `
            <div class="max-w-sm mx-auto w-full h-full">
                <a href="${linkHref}" 
                   target="_blank" 
                   rel="noopener noreferrer"
                   aria-label="Abrir link de ${title}: ${info}"
                   class="bg-white p-8 rounded-2xl shadow-sm hover:shadow-xl hover:-translate-y-1 transition-all duration-300 border border-neutral-200/80 flex flex-col items-center text-center group h-full focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-memc-rosa">
                    
                    <div class="w-16 h-16 bg-memc-rosa/15 text-memc-rosa rounded-2xl flex items-center justify-center mb-4 group-hover:scale-110 group-hover:bg-memc-rosa group-hover:text-white transition-all duration-300 shadow-xs">
                        <i class="${iconClass} text-3xl" aria-hidden="true"></i>
                    </div>
                    
                    <h3 class="text-xl font-bold text-memc-roxo-escuro mb-2 group-hover:text-memc-rosa transition-colors">${title}</h3>
                    <p class="text-sm font-medium text-neutral-600 leading-relaxed">${info}</p>
                </a>
            </div>
        `;
    }
}

// Registro oficial do Web Component
customElements.define('contatos-component', Contatos);

