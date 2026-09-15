/**
 * Frontend script para interação do Accordion de FAQ Periodic.
 * Garante funcionamento autônomo com suporte ao Bootstrap 5 e fallback nativo.
 */
document.addEventListener('DOMContentLoaded', () => {
	const accordions = document.querySelectorAll('.periodic-faq-accordion');
	if (!accordions.length) return;

	accordions.forEach((accordion) => {
		const buttons = accordion.querySelectorAll('.accordion-button');

		buttons.forEach((btn) => {
			btn.addEventListener('click', (e) => {
				const targetSelector = btn.getAttribute('data-bs-target');
				if (!targetSelector) return;

				const targetCollapse = accordion.querySelector(targetSelector);
				if (!targetCollapse) return;

				// Se o Bootstrap nativo já gerencia o collapse, atualiza apenas ícones Font Awesome
				const hasNativeBootstrap =
					typeof window.bootstrap !== 'undefined' &&
					typeof window.bootstrap.Collapse !== 'undefined';

				if (!hasNativeBootstrap) {
					e.preventDefault();

					const isCurrentlyExpanded =
						btn.getAttribute('aria-expanded') === 'true';
					const parentSelector =
						targetCollapse.getAttribute('data-bs-parent');

					// Se data-bs-parent existe (alwaysOpen desativado), fecha os irmãos
					if (parentSelector && !isCurrentlyExpanded) {
						const parentEl = document.querySelector(parentSelector);
						if (parentEl) {
							const openCollapses =
								parentEl.querySelectorAll(
									'.accordion-collapse.show'
								);
							openCollapses.forEach((openCol) => {
								if (openCol !== targetCollapse) {
									openCol.classList.remove('show');
									const triggerBtn =
										parentEl.querySelector(
											`[data-bs-target="#${openCol.id}"]`
										);
									if (triggerBtn) {
										triggerBtn.classList.add('collapsed');
										triggerBtn.setAttribute(
											'aria-expanded',
											'false'
										);
										updateFaqIcons(triggerBtn, false);
									}
								}
							});
						}
					}

					// Alterna o estado do item atual
					if (isCurrentlyExpanded) {
						targetCollapse.classList.remove('show');
						btn.classList.add('collapsed');
						btn.setAttribute('aria-expanded', 'false');
						updateFaqIcons(btn, false);
					} else {
						targetCollapse.classList.add('show');
						btn.classList.remove('collapsed');
						btn.setAttribute('aria-expanded', 'true');
						updateFaqIcons(btn, true);
					}
				} else {
					// Quando o Bootstrap 5 nativo está ativo, sincroniza ícones após evento
					setTimeout(() => {
						const isExpanded =
							btn.getAttribute('aria-expanded') === 'true';
						updateFaqIcons(btn, isExpanded);
					}, 150);
				}
			});
		});
	});

	/**
	 * Atualiza ícones Font Awesome dinamicamente caso o tipo selecionado seja plus/minus.
	 */
	function updateFaqIcons(button, isExpanded) {
		const plusIcon = button.querySelector('.fa-icon-plus i');
		if (plusIcon) {
			if (isExpanded) {
				plusIcon.classList.remove('fa-plus');
				plusIcon.classList.add('fa-minus');
			} else {
				plusIcon.classList.remove('fa-minus');
				plusIcon.classList.add('fa-plus');
			}
		}
	}
});
