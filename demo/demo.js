/**
 * @fileoverview Periodic Showroom & Demo Controller
 * @module Periodic.Demo
 */

document.addEventListener('DOMContentLoaded', async () => {
    // 1. Initialize i18n
    if (window.Periodic && window.Periodic.i18n) {
        await window.Periodic.i18n.init(null, '../core/i18n/');
        updateLangLabel(window.Periodic.i18n.currentLocale);
    }

    // 2. Language switcher buttons
    const langLabels = {
        'pt-br': '🇧🇷 Português (BR)',
        'en-us': '🇺🇸 English (US)',
        'es': '🇪🇸 Español',
        'it': '🇮🇹 Italiano'
    };

    function updateLangLabel(loc) {
        const lbl = document.getElementById('currentLangLabel');
        if (lbl && langLabels[loc]) {
            lbl.textContent = langLabels[loc];
        }
    }

    document.querySelectorAll('.lang-opt').forEach(opt => {
        opt.addEventListener('click', (e) => {
            e.preventDefault();
            const chosen = opt.getAttribute('data-lang');
            if (window.Periodic && window.Periodic.i18n) {
                window.Periodic.i18n.setLocale(chosen);
                updateLangLabel(chosen);
            }
        });
    });

    // 3. Category Filter
    const filterButtons = document.querySelectorAll('.filter-btn');
    const compCards = document.querySelectorAll('.comp-card-wrapper');

    filterButtons.forEach(btn => {
        btn.addEventListener('click', () => {
            filterButtons.forEach(b => {
                b.classList.remove('btn-primary', 'active');
                b.classList.add('btn-outline-secondary');
            });
            btn.classList.add('btn-primary', 'active');
            btn.classList.remove('btn-outline-secondary');

            const cat = btn.getAttribute('data-cat');
            applyFilters();
        });
    });

    // 4. Instant Search
    const searchInput = document.getElementById('componentSearch');
    if (searchInput) {
        searchInput.addEventListener('input', () => {
            applyFilters();
        });
    }

    function applyFilters() {
        const activeCat = document.querySelector('.filter-btn.active')?.getAttribute('data-cat') || 'all';
        const query = searchInput ? searchInput.value.toLowerCase().trim() : '';

        compCards.forEach(card => {
            const cardCat = card.getAttribute('data-category');
            const cardSlug = card.getAttribute('data-slug');
            const cardTitle = card.querySelector('h2')?.textContent.toLowerCase() || '';
            const cardDesc = card.querySelector('p')?.textContent.toLowerCase() || '';

            const matchesCat = (activeCat === 'all' || cardCat === activeCat);
            const matchesQuery = !query || cardSlug.includes(query) || cardTitle.includes(query) || cardDesc.includes(query);

            if (matchesCat && matchesQuery) {
                card.classList.remove('is-hidden');
            } else {
                card.classList.add('is-hidden');
            }
        });
    }

    // 5. Dark / Light Theme Toggle
    const themeBtn = document.getElementById('themeToggle');
    const themeIcon = document.getElementById('themeIcon');
    let isDark = localStorage.getItem('periodic_theme') === 'dark';

    function setTheme(dark) {
        isDark = dark;
        if (dark) {
            document.documentElement.setAttribute('data-theme', 'dark');
            themeIcon.classList.remove('fa-moon');
            themeIcon.classList.add('fa-sun');
            localStorage.setItem('periodic_theme', 'dark');
        } else {
            document.documentElement.removeAttribute('data-theme');
            themeIcon.classList.remove('fa-sun');
            themeIcon.classList.add('fa-moon');
            localStorage.setItem('periodic_theme', 'light');
        }
    }

    if (isDark) setTheme(true);

    if (themeBtn) {
        themeBtn.addEventListener('click', () => {
            setTheme(!isDark);
        });
    }

    // 6. Preview Modal Handler
    const previewModalEl = document.getElementById('previewModal');
    const previewModalBody = document.getElementById('previewModalBody');
    const previewModalTitle = document.getElementById('previewModalLabel');
    const previewModalSlug = document.getElementById('previewModalSlug');
    let previewModal = null;

    if (window.bootstrap && previewModalEl) {
        previewModal = new window.bootstrap.Modal(previewModalEl);
    }

    document.querySelectorAll('.open-preview-btn').forEach(btn => {
        btn.addEventListener('click', () => {
            const slug = btn.getAttribute('data-slug');
            const title = btn.getAttribute('data-title');

            if (previewModalTitle) previewModalTitle.textContent = title;
            if (previewModalSlug) previewModalSlug.textContent = `.periodic-${slug}`;

            renderComponentPreview(slug, previewModalBody);

            if (previewModal) {
                previewModal.show();
            }
        });
    });

    function renderComponentPreview(slug, container) {
        container.innerHTML = '';
        const wrapper = document.createElement('div');
        wrapper.className = 'p-3';

        switch (slug) {
            case 'breadcrumbs':
                wrapper.innerHTML = `
                    <div id="demoBreadcrumb"></div>
                    <div class="mt-4"><small class="text-muted">Exemplo com microdados Schema.org ativos.</small></div>
                `;
                container.appendChild(wrapper);
                new window.PeriodicBreadcrumbs('#demoBreadcrumb', [
                    { label: 'Início', url: '#' },
                    { label: 'Componentes', url: '#' },
                    { label: 'Navegação Estruturada', active: true }
                ]);
                break;

            case 'ad-banner':
                wrapper.innerHTML = `
                    <div class="periodic-ad-banner">
                        <div>
                            <div class="periodic-ad-banner__title">🎉 Lançamento da Suíte Periodic v2.0</div>
                            <div class="periodic-ad-banner__text">Consolidação de 61 módulos com alto desempenho e suporte a 4 idiomas.</div>
                        </div>
                        <div class="d-flex align-items-center gap-2">
                            <a href="#" class="periodic-ad-banner__action">Acessar Docs</a>
                            <button class="periodic-ad-banner__close" title="Fechar">&times;</button>
                        </div>
                    </div>
                `;
                container.appendChild(wrapper);
                new window.PeriodicAdBanner(wrapper.querySelector('.periodic-ad-banner'));
                break;

            case 'counter-stats':
                wrapper.innerHTML = `
                    <div class="d-flex justify-content-around flex-wrap gap-4">
                        <div class="periodic-counter-stats">
                            <div class="periodic-counter-stats__number" data-periodic-target="61" data-periodic-suffix=" Módulos">0</div>
                            <div class="periodic-counter-stats__label">Consolidados</div>
                        </div>
                        <div class="periodic-counter-stats">
                            <div class="periodic-counter-stats__number" data-periodic-target="100" data-periodic-suffix="%">0</div>
                            <div class="periodic-counter-stats__label">Cobertura i18n</div>
                        </div>
                        <div class="periodic-counter-stats">
                            <div class="periodic-counter-stats__number" data-periodic-target="4" data-periodic-suffix=" Idiomas">0</div>
                            <div class="periodic-counter-stats__label">pt-br / en / es / it</div>
                        </div>
                    </div>
                `;
                container.appendChild(wrapper);
                wrapper.querySelectorAll('.periodic-counter-stats__number').forEach(el => new window.PeriodicCounterStats(el));
                break;

            case 'form-builder':
                const fbContainer = document.createElement('div');
                wrapper.appendChild(fbContainer);
                container.appendChild(wrapper);
                new window.PeriodicFormBuilder(fbContainer, {
                    title: 'Contato & Demonstração',
                    fields: [
                        { name: 'name', label: 'Nome Completo', placeholder: 'Digite seu nome', required: true },
                        { name: 'email', label: 'E-mail', type: 'email', placeholder: 'seu@email.com', required: true },
                        { name: 'message', label: 'Mensagem', type: 'textarea', placeholder: 'Conte-nos sobre o seu projeto...', required: true }
                    ],
                    submitText: 'Enviar Mensagem',
                    onSubmit: (data) => console.log('Form data:', data)
                });
                break;

            case 'word-games':
                const wgContainer = document.createElement('div');
                wrapper.appendChild(wgContainer);
                container.appendChild(wrapper);
                new window.PeriodicWordGames(wgContainer, {
                    word: 'PERIODIC',
                    hint: 'Suíte modular unificada de componentes frontend'
                });
                break;

            case 'accordion':
                wrapper.innerHTML = `
                    <div class="accordion" id="accordionPreview">
                        <div class="accordion-item">
                            <h2 class="accordion-header" id="headingOne">
                                <button class="accordion-button" type="button" data-bs-toggle="collapse" data-bs-target="#collapseOne" aria-expanded="true">
                                    O que é a Suíte Periodic?
                                </button>
                            </h2>
                            <div id="collapseOne" class="accordion-collapse collapse show" data-bs-parent="#accordionPreview">
                                <div class="accordion-body">
                                    A Suíte Periodic unifica 61 repositórios de componentes em um monorepo modular e desacoplado.
                                </div>
                            </div>
                        </div>
                        <div class="accordion-item">
                            <h2 class="accordion-header" id="headingTwo">
                                <button class="accordion-button collapsed" type="button" data-bs-toggle="collapse" data-bs-target="#collapseTwo" aria-expanded="false">
                                    Como funciona a internacionalização?
                                </button>
                            </h2>
                            <div id="collapseTwo" class="accordion-collapse collapse" data-bs-parent="#accordionPreview">
                                <div class="accordion-body">
                                    Suporta 4 idiomas simétricos: pt-br, en-us, es e it, com alternância em tempo de execução sem recarregar a página.
                                </div>
                            </div>
                        </div>
                    </div>
                `;
                container.appendChild(wrapper);
                break;

            default:
                wrapper.innerHTML = `
                    <div class="preview-container text-center">
                        <div>
                            <div class="fs-1 text-primary mb-3"><i class="fa-solid fa-cube"></i></div>
                            <h4 class="fw-bold mb-2">Módulo: periodic-${slug}</h4>
                            <p class="text-muted mb-3">Componente integrado pronto para uso em aplicações web e no WordPress.</p>
                            <a href="../docs/${slug}.md" target="_blank" class="btn btn-outline-primary">
                                <i class="fa-regular fa-file-code me-1"></i> Abrir Especificações em /docs/${slug}.md
                            </a>
                        </div>
                    </div>
                `;
                container.appendChild(wrapper);
                break;
        }
    }
});
