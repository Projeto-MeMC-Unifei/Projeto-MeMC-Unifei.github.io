/**
 * Web Component personalizado para cartões de contato e redes sociais da Rede MeMC.
 * Design Pattern: Custom Elements v1 (HTML5 Web Components)
 * Suporta dois formatos de exibição: 'featured' (banner horizontal em destaque) e 'standard' (cartão compacto).
 * Atende aos critérios de reuso de código, responsividade e acessibilidade (WCAG 2.1 AA).
 */
class Contatos extends HTMLElement {
    constructor() {
        super();
    }

    /**
     * Atributos observados reativamente para renderização dinâmica do componente.
     */
    static get observedAttributes() {
        return ['contato-id', 'title', 'info', 'link-href', 'icon-class', 'description', 'button-text', 'badge', 'variant'];
    }

    connectedCallback() {
        // Garante que o Web Component se comporte como um elemento de bloco de altura total no grid/flexbox
        this.classList.add('block', 'h-full');
        this.render();
    }

    attributeChangedCallback() {
        this.render();
    }

    /**
     * Renderiza o cartão de contato de acordo com a variante escolhida ('featured' ou 'standard').
     */
    render() {
        const title = this.getAttribute('title') || 'Contato';
        const info = this.getAttribute('info') || '';
        const linkHref = this.getAttribute('link-href') || '#';
        const iconClass = this.getAttribute('icon-class') || 'fas fa-link';
        const description = this.getAttribute('description') || '';
        const buttonText = this.getAttribute('button-text') || 'Acessar Link';
        const badge = this.getAttribute('badge') || '';
        const variant = this.getAttribute('variant') || 'standard';

        if (variant === 'featured') {
            // VARIANTE EM DESTAQUE: Banner Horizontal Responsivo para o E-mail Institucional no topo
            this.innerHTML = `
                <div class="w-full h-full">
                    <div class="w-full bg-white/95 backdrop-blur-md p-6 sm:p-7 rounded-3xl shadow-lg border-2 border-neutral-200/90 flex flex-col md:flex-row items-center justify-between gap-5 text-left">
                        
                        <div class="flex flex-col sm:flex-row items-center md:items-start gap-4 text-center sm:text-left w-full">
                            <!-- Ícone em Destaque -->
                            <div class="w-14 h-14 sm:w-16 sm:h-16 bg-gradient-to-br from-memc-rosa/20 to-memc-roxo-medio/20 text-memc-rosa rounded-2xl flex items-center justify-center shrink-0 shadow-xs">
                                <i class="${iconClass} text-2xl sm:text-3xl" aria-hidden="true"></i>
                            </div>

                            <!-- Textos e Informações Principais -->
                            <div class="space-y-1 flex-1">
                                ${badge ? `
                                    <span class="inline-block text-[10px] font-extrabold uppercase tracking-wider text-memc-rosa bg-memc-rosa/10 px-2.5 py-0.5 rounded-full mb-0.5">
                                        ${badge}
                                    </span>
                                ` : ''}
                                <h3 class="text-lg sm:text-xl font-black text-memc-roxo-escuro">
                                    ${title}
                                </h3>
                                ${description ? `<p class="text-xs sm:text-sm text-neutral-600 font-medium leading-relaxed max-w-xl">${description}</p>` : ''}
                                <p class="text-sm font-bold text-memc-roxo-medio break-all mt-1 select-all">
                                    <a href="${linkHref}" class="hover:underline hover:text-memc-rosa transition-colors">${info}</a>
                                </p>
                            </div>
                        </div>

                        <!-- Botão de Ação Único Clicável -->
                        <div class="shrink-0 w-full md:w-auto mt-2 md:mt-0">
                            <a href="${linkHref}" 
                               target="_blank" 
                               rel="noopener noreferrer"
                               aria-label="${buttonText} para ${title}"
                               class="w-full md:w-auto inline-flex items-center justify-center gap-2 bg-gradient-to-r from-memc-rosa to-memc-roxo-medio hover:from-memc-rosa/90 hover:to-memc-roxo-medio/90 text-white px-5 py-3 rounded-xl font-bold text-xs sm:text-sm shadow-sm hover:shadow-md hover:scale-105 transition-all duration-300 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-memc-rosa cursor-pointer">
                                <i class="${iconClass}"></i>
                                ${buttonText}
                            </a>
                        </div>
                    </div>
                </div>
            `;
        } else {
            // VARIANTE PADRÃO COMPACTA: Cartão Sleek e Enxuto para Redes Sociais
            this.innerHTML = `
                <div class="w-full h-full flex">
                    <div class="w-full bg-white/95 backdrop-blur-md p-5 sm:p-6 rounded-2xl shadow-md border-2 border-neutral-200/90 flex flex-col items-center justify-between text-center transition-all duration-300 hover:shadow-xl hover:border-memc-rosa/40">
                        
                        <div class="flex flex-col items-center w-full">
                            ${badge ? `
                                <span class="text-[10px] font-extrabold uppercase tracking-wider text-memc-rosa bg-memc-rosa/10 px-2.5 py-0.5 rounded-full mb-2">
                                    ${badge}
                                </span>
                            ` : ''}

                            <div class="w-12 h-12 bg-memc-rosa/15 text-memc-rosa rounded-xl flex items-center justify-center mb-3 shadow-xs">
                                <i class="${iconClass} text-2xl" aria-hidden="true"></i>
                            </div>
                            
                            <h3 class="text-base sm:text-lg font-bold text-memc-roxo-escuro mb-0.5">${title}</h3>
                            <p class="text-xs sm:text-sm font-bold text-memc-roxo-medio mb-2 break-all select-all">
                                <a href="${linkHref}" target="_blank" rel="noopener noreferrer" class="hover:underline hover:text-memc-rosa transition-colors">${info}</a>
                            </p>
                            ${description ? `<p class="text-xs text-neutral-600 font-normal leading-relaxed mb-4 max-w-xs">${description}</p>` : ''}
                        </div>

                        <div class="w-full pt-3 border-t border-neutral-100 mt-2">
                            <a href="${linkHref}" 
                               target="_blank" 
                               rel="noopener noreferrer"
                               aria-label="${buttonText} em ${title}"
                               class="w-full inline-flex items-center justify-center gap-2 bg-neutral-100 hover:bg-memc-rosa text-neutral-700 hover:text-white px-4 py-2.5 rounded-xl font-bold text-xs transition-all duration-300 shadow-xs focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-memc-rosa cursor-pointer">
                                <i class="${iconClass}"></i>
                                ${buttonText}
                            </a>
                        </div>
                    </div>
                </div>
            `;
        }
    }
}

// Registro oficial do Web Component
customElements.define('contatos-component', Contatos);
