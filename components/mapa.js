document.addEventListener('DOMContentLoaded', () => {
    const mapContainer = document.getElementById('map');
    const infoPanel = document.getElementById('map-info-panel');
    if (!mapContainer) return;

    let initialBounds = null; // Armazena o enquadramento inicial dos estados ativos (SP & MG)

    // 1. Inicializar o Mapa no Container Claro
    const map = L.map('map', {
        zoomControl: false,
        minZoom: 3,
        maxZoom: 10,
        attributionControl: false
    }).setView([-21.5, -47.0], 6);

    L.control.zoom({ position: 'bottomright' }).addTo(map);

    // Paleta oficial das Subsedes (Mapeada diretamente de colors:instituicoes)
    const coresSubsedes = {
        "SUBSEDE 1": "#b4a7d6", // Lilás / Roxo suave pastel (UNIFESP Diadema / IFSP)
        "SUBSEDE 2": "#d5a6bd", // Rosa queimado / Mauve suave pastel (USP Ribeirão Preto)
        "SUBSEDE 3": "#f9cb9c", // Pêssego / Laranja suave pastel (UNIFEI Itajubá / Itabira)
        "SUBSEDE 4": "#ffe599"  // Amarelo suave pastel (UFSCar São Carlos)
    };

    // 2. Renderização do Painel Lateral e Redefinição do Zoom ao Voltar
    function renderGenericInfo() {
        // Redefinir o zoom do mapa para o enquadramento inicial (SP e MG) ao voltar
        if (initialBounds && map) {
            map.flyToBounds(initialBounds, { padding: [25, 25], duration: 1.2 });
        }

        if (!infoPanel) return;
        infoPanel.innerHTML = `
            <div class="space-y-4 animate-fade-in">
                <div class="flex items-center gap-2">
                    <span class="bg-memc-rosa/15 text-memc-rosa text-xs font-bold px-3 py-1 rounded-full uppercase tracking-wider border border-memc-rosa/30">
                        Rede MeMC
                    </span>
                    <span class="bg-memc-roxo-medio/15 text-memc-roxo-medio text-xs font-bold px-3 py-1 rounded-full uppercase tracking-wider">
                        SP & MG
                    </span>
                </div>

                <h3 class="text-2xl md:text-3xl font-extrabold text-memc-roxo-medio leading-tight">
                    Mapeamento da Rede
                </h3>

                <p class="text-base text-neutral-700 leading-relaxed">
                    A Rede Meninas e Mulheres Cientistas é formada por 20 instituições parceiras articuladas em quatro subsedes principais. Conectamos universidades, escolas públicas e comunidades para ampliar a participação de meninas e mulheres nas ciências (CTEM).
                </p>

                <div class="grid grid-cols-2 gap-3 my-4">
                    <div class="bg-neutral-100/90 p-3.5 rounded-xl border border-neutral-200 shadow-sm">
                        <div class="text-2xl font-black text-memc-rosa mb-1">20</div>
                        <div class="text-xs font-semibold text-neutral-700">Instituições Conectadas</div>
                    </div>
                    <div class="bg-neutral-100/90 p-3.5 rounded-xl border border-neutral-200 shadow-sm">
                        <div class="text-2xl font-black text-memc-roxo-medio mb-1">4</div>
                        <div class="text-xs font-semibold text-neutral-700">Subsedes de Pesquisa</div>
                    </div>
                </div>

                <div class="bg-memc-rosa/10 rounded-xl p-4 border border-memc-rosa/30 text-sm text-neutral-800 space-y-2">
                    <p class="flex items-center gap-2 font-medium">
                        <i class="fa-solid fa-hand-pointer text-memc-rosa animate-bounce"></i>
                        <span>Clique nos marcadores ou estados no mapa para ver as instituições vinculadas.</span>
                    </p>
                </div>
            </div>
        `;
    }

    // Dicionário dos projetos das Subsedes com seus respectivos Polos Principais
    const projetosSubsedes = {
        "SUBSEDE 1": {
            nome: "Projeto Cientista por um Dia",
            polo: "UNIFESP Diadema"
        },
        "SUBSEDE 2": {
            nome: "Centro de Ensino Integrado de Química (CEIQ)",
            polo: "USP Ribeirão Preto"
        },
        "SUBSEDE 3": {
            nome: "Semeando Cientistas",
            polo: "UNIFEI Itajubá"
        },
        "SUBSEDE 4": {
            nome: "Pequenas Cientistas",
            polo: "UFSCar São Carlos"
        }
    };

    function renderInstitutionInfo(inst) {
        if (!infoPanel) return;

        const corSubsede = coresSubsedes[inst.grupo] || "#E1267A";
        const isPolo = inst.isPolo;
        const projeto = projetosSubsedes[inst.grupo] || { nome: "Projeto MeMC", polo: "Polo da Rede" };

        // Identifica se a instituição é Universidade / Ensino Superior ou Escola Pública de Educação Básica
        const isUniversidade = inst.isUniversidade !== undefined
            ? inst.isUniversidade
            : (inst.isPolo || inst.titulo.includes("UNIFESP") || inst.titulo.includes("USP") || inst.titulo.includes("UNIFEI") || inst.titulo.includes("UFSCar") || inst.titulo.includes("UFABC") || inst.titulo.includes("UNESP") || inst.titulo.includes("Instituto Federal") || inst.titulo.includes("IFSP") || inst.titulo.toLowerCase().includes("universidade") || inst.titulo.toLowerCase().includes("faculdade"));

        infoPanel.innerHTML = `
            <div class="space-y-4 animate-fade-in">
                <div class="flex items-center justify-between gap-2 flex-wrap">
                    <div class="flex items-center gap-2">
                        <span class="text-xs font-black px-3 py-1 rounded-full uppercase tracking-wider text-neutral-900 border border-neutral-300 shadow-xs" style="background-color: ${corSubsede}">
                            ${inst.grupo}
                        </span>
                        ${isPolo
                ? '<span class="bg-amber-100 text-amber-950 font-extrabold border border-amber-300 text-[11px] px-2.5 py-0.5 rounded-full flex items-center gap-1">✪ Polo Principal</span>'
                : (isUniversidade
                    ? '<span class="bg-blue-50 text-blue-900 font-bold border border-blue-200 text-[11px] px-2.5 py-0.5 rounded-full flex items-center gap-1">🎓 Ensino Superior</span>'
                    : '<span class="bg-emerald-50 text-emerald-900 font-bold border border-emerald-200 text-[11px] px-2.5 py-0.5 rounded-full flex items-center gap-1">🏫 Escola Pública Parceira</span>'
                )
            }
                    </div>
                    <button id="btn-voltar-generico" 
                            type="button"
                            aria-label="Voltar para a visão geral do mapa e redefinir zoom"
                            class="text-xs font-bold text-neutral-600 hover:text-memc-rosa transition-colors flex items-center gap-1.5 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-memc-rosa rounded px-2 py-1">
                        <i class="fa-solid fa-arrow-left"></i> Voltar
                    </button>
                </div>

                <h3 class="text-2xl font-bold text-neutral-900 leading-tight">
                    ${inst.titulo}
                </h3>

                <p class="text-xs text-neutral-600 flex items-start gap-1.5 leading-relaxed font-medium">
                    <i class="fa-solid fa-location-dot mt-0.5 shrink-0" style="color: ${corSubsede}"></i>
                    <span>${inst.endereco}</span>
                </p>

                <!-- FOTO / LOGO EXIBIDO APENAS SE FOR UNIVERSIDADE / ENSINO SUPERIOR (FUNDO CLARO BG-WHITE) -->
                ${isUniversidade && inst.imagem ? `
                <div class="relative h-36 sm:h-44 w-full rounded-2xl overflow-hidden shadow-xs border border-neutral-200/90 bg-white p-3 flex items-center justify-center my-2">
                    <img src="${inst.imagem}" alt="Imagem/Logo da instituição ${inst.titulo}" class="max-h-full max-w-full object-contain mx-auto transition-transform hover:scale-105">
                </div>
                ` : ''}

                <!-- SE NÃO FOR UNIVERSIDADE (ESCOLAS PÚBLICAS), EXIBE O BLOCO DO PROJETO EM QUE PARTICIPA -->
                ${!isUniversidade ? `
                <div class="bg-gradient-to-r from-memc-roxo-medio/10 via-memc-rosa/5 to-slate-50 rounded-2xl p-4 border-2 border-memc-roxo-medio/30 shadow-xs space-y-2">
                    <div class="flex items-center justify-between">
                        <span class="text-xs font-bold text-memc-roxo-escuro uppercase tracking-wider flex items-center gap-1.5">
                            <i class="fa-solid fa-diagram-project text-memc-rosa"></i> Projeto da Rede Vinculado
                        </span>
                        <span class="text-[10px] font-bold px-2 py-0.5 rounded-full text-white shadow-2xs" style="background-color: ${corSubsede}">
                            ${inst.grupo}
                        </span>
                    </div>
                    <div class="text-base font-extrabold text-neutral-900 leading-snug">
                        ${projeto.nome}
                    </div>
                    <p class="text-xs text-neutral-600 font-medium leading-relaxed flex items-center gap-1.5">
                        <i class="fa-solid fa-building-columns text-memc-roxo-medio shrink-0"></i>
                        <span>Polo Responsável: <strong class="text-neutral-800">${projeto.polo}</strong></span>
                    </p>
                </div>
                ` : `
                <!-- UNIVERSIDADES TAMBÉM EXIBEM O PROJETO CORRESPONDENTE -->
                <div class="bg-slate-50 rounded-xl p-3 border border-neutral-200 text-xs text-neutral-700 flex items-center justify-between gap-2">
                    <span class="font-bold text-neutral-900 flex items-center gap-1.5">
                        <i class="fa-solid fa-flask text-memc-rosa"></i> Projeto: ${projeto.nome}
                    </span>
                </div>
                `}

                <div class="bg-neutral-50 rounded-xl p-4 border border-neutral-200 text-sm text-neutral-800 leading-relaxed">
                    <p class="font-bold text-neutral-900 mb-1">Resumo da Atuação:</p>
                    ${inst.resumo}
                </div>

                ${inst.relevante ? `
                <div class="bg-amber-50 rounded-xl p-3 border border-amber-300 text-xs text-amber-950 font-medium">
                    <strong class="text-amber-900 font-bold">Destaque:</strong> ${inst.relevante}
                </div>
                ` : ''}
            </div>
        `;

        const btnVoltar = document.getElementById('btn-voltar-generico');
        if (btnVoltar) {
            btnVoltar.addEventListener('click', renderGenericInfo);
            btnVoltar.focus();
        }
    }

    /**
     * Renderiza no painel lateral a lista de instituições presentes no estado clicado (SP ou MG).
     * @param {string} stateName - Nome do estado ("São Paulo" ou "Minas Gerais").
     */
    function renderStateInstitutionsInfo(stateName) {
        if (!infoPanel) return;

        const isSP = stateName === "São Paulo";
        const instDoEstado = instituicoes.filter(i => {
            if (isSP) return i.endereco.includes("SP") || i.titulo.includes("SP");
            return i.endereco.includes("MG") || i.titulo.includes("MG");
        });

        const listHtml = instDoEstado.map(inst => `
            <button type="button"
                    onclick="selecionarInstituicaoDirect('${inst.titulo.replace(/'/g, "\\'")}')"
                    class="w-full text-left p-3 rounded-xl bg-white hover:bg-neutral-100 border border-neutral-200/80 hover:border-memc-rosa transition-all flex items-center justify-between group shadow-xs cursor-pointer focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-memc-rosa">
                <div class="flex items-center gap-2.5 pr-2">
                    <span class="w-4 h-4 rounded-full shrink-0 flex items-center justify-center text-[9px] text-neutral-900 font-black shadow-xs" style="background-color: ${inst.cor}">
                        ${inst.isPolo ? '✪' : '📍'}
                    </span>
                    <span class="text-sm font-bold text-neutral-800 group-hover:text-memc-rosa transition-colors">
                        ${inst.titulo}
                    </span>
                </div>
                <span class="text-[10px] font-black px-2 py-0.5 rounded-full text-neutral-900 shrink-0 shadow-xs border border-neutral-300" style="background-color: ${inst.cor}">
                    ${inst.grupo}
                </span>
            </button>
        `).join('');

        infoPanel.innerHTML = `
            <div class="space-y-4 animate-fade-in">
                <div class="flex items-center justify-between">
                    <span class="bg-memc-roxo-medio/15 text-memc-roxo-medio text-xs font-bold px-3 py-1 rounded-full uppercase tracking-wider border border-memc-roxo-medio/30">
                        ${instDoEstado.length} Instituições em ${stateName}
                    </span>
                    <button id="btn-voltar-generico" 
                            type="button"
                            aria-label="Voltar para a visão geral"
                            class="text-xs font-bold text-neutral-600 hover:text-memc-rosa transition-colors flex items-center gap-1.5 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-memc-rosa rounded px-2 py-1">
                        <i class="fa-solid fa-arrow-left"></i> Voltar
                    </button>
                </div>

                <h3 class="text-2xl font-bold text-neutral-900 leading-tight">
                    Instituições de ${stateName}
                </h3>

                <p class="text-xs text-neutral-600 font-medium leading-relaxed">
                    Selecione uma instituição abaixo para abrir suas informações detalhadas:
                </p>

                <div class="space-y-2 mt-2 max-h-[300px] overflow-y-auto custom-scrollbar pr-1">
                    ${listHtml}
                </div>
            </div>
        `;

        const btnVoltar = document.getElementById('btn-voltar-generico');
        if (btnVoltar) {
            btnVoltar.addEventListener('click', renderGenericInfo);
            btnVoltar.focus();
        }
    }

    // Função auxiliar global para acionamento direto via clique na lista
    window.selecionarInstituicaoDirect = function (titulo) {
        const inst = instituicoes.find(i => i.titulo === titulo);
        if (inst) {
            renderInstitutionInfo(inst);
            map.flyTo([inst.geo.lat, inst.geo.lng], 8.5, { duration: 1.2 });
        }
    };

    // Inicializar o painel com informação genérica
    renderGenericInfo();

    // 3. Carregar GeoJSON dos Estados com Estilo Claro e Zoom nos Estados Ativos
    const geoJsonUrl = 'data/brazil-states.geojson';
    const fallbackGeoJsonUrl = 'https://raw.githubusercontent.com/codeforamerica/click_that_hood/master/public/data/brazil-states.geojson';

    function loadGeoJSON(url) {
        return fetch(url).then(response => {
            if (!response.ok) throw new Error('Falha ao carregar GeoJSON local');
            return response.json();
        });
    }

    loadGeoJSON(geoJsonUrl)
        .catch(() => loadGeoJSON(fallbackGeoJsonUrl))
        .then(data => {
            const estadosAtivos = ["Minas Gerais", "São Paulo"];

            L.geoJSON(data, {
                style: function (feature) {
                    const isActive = estadosAtivos.includes(feature.properties.name);
                    return {
                        // ESTILO CLARO, SUAVE E ELEGANTE (SEM TONS ESCUROS PESADOS)
                        color: isActive ? '#58288E' : '#CBD5E1',
                        weight: isActive ? 2.2 : 0.8,
                        opacity: isActive ? 0.9 : 0.4,
                        fillColor: isActive ? '#58288E' : '#F8FAFC',
                        fillOpacity: isActive ? 0.14 : 0.04,
                        interactive: isActive // ESTADOS SEM INSTITUIÇÕES NÃO SÃO CLICÁVEIS!
                    };
                },
                onEachFeature: function (feature, layer) {
                    const isActive = estadosAtivos.includes(feature.properties.name);
                    const stateName = feature.properties.name;

                    if (isActive) {
                        layer.on('mouseover', function () {
                            this.setStyle({
                                fillOpacity: 0.28,
                                weight: 2.8,
                                color: '#E1267A'
                            });
                        });

                        layer.on('mouseout', function () {
                            this.setStyle({
                                fillOpacity: 0.14,
                                weight: 2.2,
                                color: '#58288E'
                            });
                        });

                        layer.on('click', function (e) {
                            L.DomEvent.stopPropagation(e);
                            renderStateInstitutionsInfo(stateName);
                        });
                    }
                }
            }).addTo(map);

            // Armazena e ajusta o zoom inicial nos estados ativos (SP e MG)
            const activeFeatures = data.features.filter(f => estadosAtivos.includes(f.properties.name));
            if (activeFeatures.length > 0) {
                const activeGeoGroup = L.geoJSON({ type: "FeatureCollection", features: activeFeatures });
                initialBounds = activeGeoGroup.getBounds();
                map.fitBounds(initialBounds, { padding: [25, 25] });
            }
        })
        .catch(err => console.error("Erro ao carregar os estados do Brasil:", err));

    map.on('click', () => {
        renderGenericInfo();
    });

    // 4. Lista Completa das 20 Instituições (Paleta do Projeto)
    const instituicoes = [
        // SUBSEDE 1 (Rosa #E1267A) - 6 Instituições
        {
            "titulo": "UNIFESP Diadema - Prédio de Acesso",
            "endereco": "Rua São Nicolau, 210 - Centro, Diadema - SP, 09913-030",
            "geo": { "lat": -23.6823, "lng": -46.6190 },
            "resumo": "Polo principal da Subsede 1 da Rede MeMC. Campus da UNIFESP focado em ciências exatas, biológicas e ambientais (Projeto Cientista por um Dia).",
            "relevante": "Polo da Subsede 1: Projeto Cientista por um Dia.",
            "imagem": "img/logos_universidades/UNIFESP/logo-unifesp.png",
            "grupo": "SUBSEDE 1",
            "isPolo": true,
            "cor": "#b4a7d6"
        },
        {
            "titulo": "UFABC",
            "endereco": "Av. dos Estados, 5001 - Bangu, Santo André - SP, 09210-580",
            "geo": { "lat": -23.6438, "lng": -46.5284 },
            "resumo": "Universidade Federal do ABC, conhecida pelo seu projeto pedagógico inovador e interdisciplinar.",
            "imagem": "img/logos_universidades/UNIFEI/logo-unifei-meio.png",
            "grupo": "SUBSEDE 1",
            "isPolo": false,
            "cor": "#b4a7d6"
        },
        {
            "titulo": "CeLin IFSP Sertãozinho",
            "endereco": "R. Américo Ambrósio, 269 - Sertãozinho - SP",
            "geo": { "lat": -21.1215, "lng": -47.9868 },
            "resumo": "Centro de Línguas e unidade do Instituto Federal de São Paulo focada em ensino técnico e superior tecnológico.",
            "grupo": "SUBSEDE 1",
            "isPolo": false,
            "cor": "#b4a7d6"
        },
        {
            "titulo": "Ee Paulo Luiz Valerio",
            "endereco": "Piracicaba - SP",
            "geo": { "lat": -22.7303, "lng": -47.6496 },
            "resumo": "Instituição pública de ensino estadual focada nos anos finais do ensino fundamental e médio.",
            "grupo": "SUBSEDE 1",
            "isPolo": false,
            "cor": "#b4a7d6"
        },
        {
            "titulo": "E.E Barão de Jundiaí",
            "endereco": "R. Barão de Jundiaí, Centro, Jundiaí - SP",
            "geo": { "lat": -23.1870, "lng": -46.8837 },
            "resumo": "Tradicional escola estadual da rede pública paulista localizada no centro de Jundiaí.",
            "grupo": "SUBSEDE 1",
            "isPolo": false,
            "cor": "#b4a7d6"
        },
        {
            "titulo": "E. E. PEI Dr. Antônio Furlan Júnior",
            "endereco": "Sertãozinho - SP",
            "geo": { "lat": -21.1350, "lng": -47.9890 },
            "resumo": "Escola Estadual pertencente ao Programa de Ensino Integral (PEI).",
            "grupo": "SUBSEDE 1",
            "isPolo": false,
            "cor": "#b4a7d6"
        },

        // SUBSEDE 2 (Roxo Médio #58288E) - 4 Instituições
        {
            "titulo": "USP Campus de Ribeirão Preto",
            "endereco": "Av. Bandeirantes, 3900 - Ribeirão Preto - SP, 14040-900",
            "geo": { "lat": -21.1638, "lng": -47.8541 },
            "resumo": "Polo principal da Subsede 2 da Rede MeMC. Centro de Ensino Integrado de Química (CEIQ) da USP Ribeirão Preto.",
            "relevante": "Polo da Subsede 2: Centro de Ensino Integrado de Química (CEIQ).",
            "imagem": "img/logos_universidades/USP/logo-usp.jpg",
            "grupo": "SUBSEDE 2",
            "isPolo": true,
            "cor": "#d5a6bd"
        },
        {
            "titulo": "Escola Estadual Eugenia Vilhena de Morais",
            "endereco": "Ribeirão Preto - SP",
            "geo": { "lat": -21.1812, "lng": -47.8105 },
            "resumo": "Instituição estadual de ensino de Ribeirão Preto, oferecendo educação básica à comunidade.",
            "grupo": "SUBSEDE 2",
            "isPolo": false,
            "cor": "#d5a6bd"
        },
        {
            "titulo": "EMEF Antônio Palocci - CAIC",
            "endereco": "Complexo CAIC, Ribeirão Preto - SP",
            "geo": { "lat": -21.1550, "lng": -47.8200 },
            "resumo": "Escola Municipal de Ensino Fundamental inserida no contexto dos Centros de Atenção Integral à Criança.",
            "grupo": "SUBSEDE 2",
            "isPolo": false,
            "cor": "#d5a6bd"
        },
        {
            "titulo": "E.E Bairro Francisco Castilho",
            "endereco": "Cravinhos - SP",
            "geo": { "lat": -21.3400, "lng": -47.7300 },
            "resumo": "Escola pública estadual localizada no município de Cravinhos, vizinha a Ribeirão Preto.",
            "grupo": "SUBSEDE 2",
            "isPolo": false,
            "cor": "#d5a6bd"
        },

        // SUBSEDE 3 (Azul #2F75E3) - 5 Instituições
        {
            "titulo": "Universidade Federal de Itajubá, Campus Principal",
            "endereco": "Av. BPS, 1303 - Pinheirinho, Itajubá - MG, 37500-903",
            "geo": { "lat": -22.418249, "lng": -45.4515553 },
            "resumo": "Polo principal da Subsede 3. Universidade Federal de Itajubá (UNIFEI), base do projeto Semeando Cientistas.",
            "relevante": "Polo da Subsede 3: Projeto Semeando Cientistas e Sede Geral MeMC.",
            "imagem": "img/logos_universidades/UNIFEI/logo-unifei-meio.png",
            "grupo": "SUBSEDE 3",
            "isPolo": true,
            "cor": "#f9cb9c"
        },
        {
            "titulo": "Universidade Federal de Itajubá - UNIFEI - Campus Itabira",
            "endereco": "R. Irmã Ivone Drumond, 200 - Itabira - MG",
            "geo": { "lat": -19.6420, "lng": -43.2355 },
            "resumo": "Campus de expansão da UNIFEI em Minas Gerais com foco em mobilidade, saúde e engenharias aplicadas.",
            "imagem": "img/logos_universidades/UNIFEI/logo-unifei-meio.png",
            "grupo": "SUBSEDE 3",
            "isPolo": false,
            "cor": "#f9cb9c"
        },
        {
            "titulo": "Escola Estadual Major João Pereira",
            "endereco": "Itajubá - MG",
            "geo": { "lat": -22.4260, "lng": -45.4530 },
            "resumo": "Instituição de ensino estadual localizada no município de Itajubá.",
            "grupo": "SUBSEDE 3",
            "isPolo": false,
            "cor": "#f9cb9c"
        },
        {
            "titulo": "Escola Estadual Wenceslau Braz",
            "endereco": "Itajubá - MG",
            "geo": { "lat": -22.4220, "lng": -45.4570 },
            "resumo": "Escola estadual pública parceira das ações de difusão científica em Itajubá.",
            "grupo": "SUBSEDE 3",
            "isPolo": false,
            "cor": "#f9cb9c"
        },
        {
            "titulo": "EE Antônio Eufrásio De Toledo",
            "endereco": "Paraisópolis - MG",
            "geo": { "lat": -22.5540, "lng": -45.7760 },
            "resumo": "Tradicional escola da rede pública estadual mineira no município de Paraisópolis.",
            "grupo": "SUBSEDE 3",
            "isPolo": false,
            "cor": "#f9cb9c"
        },

        // SUBSEDE 4 (Verde #29A962) - 5 Instituições
        {
            "titulo": "UFSCar - Universidade Federal de São Carlos",
            "endereco": "Rod. Washington Luís, km 235 - São Carlos - SP, 13565-905",
            "geo": { "lat": -21.9806, "lng": -47.8814 },
            "resumo": "Polo principal da Subsede 4 da Rede MeMC. Universidade Federal de São Carlos, sede do projeto Pequenas Cientistas.",
            "relevante": "Polo da Subsede 4: Projeto Pequenas Cientistas.",
            "imagem": "img/logos_universidades/UFSCAR/UFSCar-sigla-preto.svg",
            "grupo": "SUBSEDE 4",
            "isPolo": true,
            "cor": "#ffe599"
        },
        {
            "titulo": "UFSCar - Campus Araras",
            "endereco": "Araras - SP",
            "geo": { "lat": -22.3117, "lng": -47.3789 },
            "resumo": "Campus da UFSCar especializado em ciências agrárias e biotecnologia em Araras.",
            "imagem": "img/logos_universidades/UFSCAR/UFSCar-sigla-preto.svg",
            "grupo": "SUBSEDE 4",
            "isPolo": false,
            "cor": "#ffe599"
        },
        {
            "titulo": "UFSCar - Campus Sorocaba",
            "endereco": "Sorocaba - SP",
            "geo": { "lat": -23.5855, "lng": -47.5226 },
            "resumo": "Campus da UFSCar especializado em biologia, sustentabilidade e engenharias em Sorocaba.",
            "imagem": "img/logos_universidades/UFSCAR/UFSCar-sigla-preto.svg",
            "grupo": "SUBSEDE 4",
            "isPolo": false,
            "cor": "#ffe599"
        },
        {
            "titulo": "Unesp - Faculdade de Ciências e Tecnologia (Campus Presidente Prudente)",
            "endereco": "Pres. Prudente - SP",
            "geo": { "lat": -22.1205, "lng": -51.4087 },
            "resumo": "Faculdade de Ciências e Tecnologia da UNESP, atuando no oeste paulista.",
            "imagem": "img/logos_universidades/UNESP/logo-unesp2.svg",
            "grupo": "SUBSEDE 4",
            "isPolo": true,
            "cor": "#ffe599"
        },
        {
            "titulo": "Instituto Federal de Educação, Ciência e Tecnologia (IFSP Campus Tupã)",
            "endereco": "Av. dos Universitários, 145 - Tupã - SP, 17602-496",
            "geo": { "lat": -21.9333, "lng": -50.5140 },
            "resumo": "Unidade do Instituto Federal de Educação, Ciência e Tecnologia de São Paulo em Tupã.",
            "imagem": "img/logos_universidades/IFSP/logo-ifsp-tapua.png",
            "grupo": "SUBSEDE 4",
            "isPolo": false,
            "cor": "#ffe599"
        }
    ];

    // 5. Curva de Bezier para conexões estéticas
    function getCurvePoints(latlng1, latlng2, numPoints = 50) {
        const points = [];
        const offsetX = (latlng2[1] - latlng1[1]) * 0.25;
        const offsetY = (latlng2[0] - latlng1[0]) * -0.25;
        const controlPoint = [
            (latlng1[0] + latlng2[0]) / 2 + offsetY,
            (latlng1[1] + latlng2[1]) / 2 + offsetX
        ];

        for (let i = 0; i <= numPoints; i++) {
            const t = i / numPoints;
            const lat = Math.pow(1 - t, 2) * latlng1[0] + 2 * (1 - t) * t * controlPoint[0] + Math.pow(t, 2) * latlng2[0];
            const lng = Math.pow(1 - t, 2) * latlng1[1] + 2 * (1 - t) * t * controlPoint[1] + Math.pow(t, 2) * latlng2[1];
            points.push([lat, lng]);
        }
        return points;
    }

    // Polos Principais das Subsedes
    const polos = {
        "SUBSEDE 1": instituicoes.find(i => i.isPolo && i.grupo === "SUBSEDE 1"),
        "SUBSEDE 2": instituicoes.find(i => i.isPolo && i.grupo === "SUBSEDE 2"),
        "SUBSEDE 3": instituicoes.find(i => i.isPolo && i.grupo === "SUBSEDE 3"),
        "SUBSEDE 4": instituicoes.find(i => i.isPolo && i.grupo === "SUBSEDE 4")
    };

    const arrPolos = Object.values(polos).filter(Boolean);

    // 6. Conexões Inter-Polos (Entre os 4 Polos Principais das Subsedes)
    for (let i = 0; i < arrPolos.length; i++) {
        for (let j = i + 1; j < arrPolos.length; j++) {
            const curve = getCurvePoints(
                [arrPolos[i].geo.lat, arrPolos[i].geo.lng],
                [arrPolos[j].geo.lat, arrPolos[j].geo.lng]
            );

            L.polyline(curve, {
                color: "#2F75E3",
                weight: 2,
                opacity: 0.35
            }).addTo(map);

            L.polyline(curve, {
                color: "#E1267A",
                weight: 2,
                opacity: 0.85,
                className: 'conexao-animada'
            }).addTo(map);
        }
    }

    // 7. Renderização dos Marcadores por Subsede (Paleta Oficial do Projeto)
    instituicoes.forEach(inst => {
        const polo = polos[inst.grupo];
        const isPolo = inst.isPolo;
        const corSubsede = inst.cor || "#E1267A";

        let displayLat = inst.geo.lat;
        let displayLng = inst.geo.lng;
        let isMuitoPerto = false;

        if (polo && !isPolo) {
            const distToHub = Math.hypot(inst.geo.lat - polo.geo.lat, inst.geo.lng - polo.geo.lng);

            if (distToHub < 0.25) {
                isMuitoPerto = true;
                if (distToHub < 0.02) {
                    displayLat += 0.008;
                    displayLng += 0.008;
                }
            }

            const connectionPoints = isMuitoPerto
                ? [[displayLat, displayLng], [polo.geo.lat, polo.geo.lng]]
                : getCurvePoints([polo.geo.lat, polo.geo.lng], [displayLat, displayLng]);

            L.polyline(connectionPoints, {
                color: corSubsede,
                weight: isMuitoPerto ? 1.8 : 1.4,
                opacity: isMuitoPerto ? 0.9 : 0.65,
                dashArray: isMuitoPerto ? '3, 4' : '4, 6'
            }).addTo(map);
        }

        let markerHtml = '';
        let markerSize = [32, 32];
        let iconAnchor = [16, 16];

        if (isPolo) {
            markerHtml = `
                <div class="custom-marker-wrapper relative cursor-pointer group flex items-center justify-center">
                    <div class="pulse-ring" style="background-color: ${corSubsede}"></div>
                    <div class="relative w-9 h-9 rounded-full border-2 border-white shadow-lg flex items-center justify-center z-30 hover:scale-125 transition-transform" style="background-color: ${corSubsede}">
                        <i class="fa-solid fa-star text-white text-xs"></i>
                    </div>
                    <div class="absolute -bottom-9 left-1/2 -translate-x-1/2 whitespace-nowrap bg-neutral-900 text-white text-xs font-bold px-3 py-1.5 rounded-full opacity-0 group-hover:opacity-100 transition-opacity border shadow-xl z-50 pointer-events-none" style="border-color: ${corSubsede}">
                        ✪ ${inst.titulo} (Polo ${inst.grupo})
                    </div>
                </div>
            `;
            markerSize = [36, 36];
            iconAnchor = [18, 18];
        } else {
            const nodeSizeClass = isMuitoPerto ? 'w-5 h-5' : 'w-7 h-7';
            const iconSizeClass = isMuitoPerto ? 'text-[9px]' : 'text-xs';

            markerHtml = `
                <div class="custom-marker-wrapper relative cursor-pointer group flex items-center justify-center">
                    <div class="relative ${nodeSizeClass} rounded-full border-2 border-white shadow-md flex items-center justify-center z-20 hover:scale-135 transition-transform" style="background-color: ${corSubsede}">
                        <i class="fa-solid fa-location-dot text-white ${iconSizeClass}"></i>
                    </div>
                    <div class="absolute -bottom-8 left-1/2 -translate-x-1/2 whitespace-nowrap bg-neutral-900 text-white text-xs font-semibold px-2.5 py-1 rounded-md opacity-0 group-hover:opacity-100 transition-opacity border border-neutral-700 shadow-lg z-50 pointer-events-none">
                        📍 ${inst.titulo}
                    </div>
                </div>
            `;
            markerSize = isMuitoPerto ? [20, 20] : [28, 28];
            iconAnchor = isMuitoPerto ? [10, 10] : [14, 14];
        }

        const customIcon = L.divIcon({
            className: 'bg-transparent border-none',
            html: markerHtml,
            iconSize: markerSize,
            iconAnchor: iconAnchor
        });

        const marker = L.marker([displayLat, displayLng], { icon: customIcon }).addTo(map);

        marker.on('click', (e) => {
            L.DomEvent.stopPropagation(e);
            renderInstitutionInfo(inst);
        });
    });
});
