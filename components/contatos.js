class Contatos extends HTMLElement {
    constructor() {
        super();
    }

    static get observedAttributes() {
        return ['contato-id', 'title', 'info', 'link-href', 'icon-class'];
    }

    connectedCallback() {
        this.render();
    }

    attributeChangedCallback() {
        this.render();
    }

    render() {
        const id = this.getAttribute('contato-id') || 'contato_padrao';
        const title = this.getAttribute('title') || 'Contato';
        const info = this.getAttribute('info') || 'Clique para acessar';
        const linkHref = this.getAttribute('link-href') || '#';
        const iconClass = this.getAttribute('icon-class') || 'fas fa-link';

        this.innerHTML = `
            <div class="max-w-sm mx-auto w-full h-full contents">
                <a href="${linkHref}" target="_blank" class="bg-white p-8 rounded-2xl shadow-sm hover:shadow-md transition-shadow border border-neutral-200 flex flex-col items-center text-center group h-full">
                    
                    <div class="w-16 h-16 bg-memc-rosa/10 text-memc-rosa rounded-full flex items-center justify-center mb-4 group-hover:scale-110 transition-transform">
                        
                        <i class="${iconClass} text-3xl"></i>
                        
                    </div>
                    
                    <h3 class="text-lg font-bold text-memc-roxo-escuro mb-2">${title}</h3>
                    <p class="text-sm text-neutral-500">${info}</p>
                </a>
            </div>
        `;
    }
}

customElements.define('contatos-component', Contatos);
