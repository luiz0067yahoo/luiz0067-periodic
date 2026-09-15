/**
 * Frontend initialization for periodic Build Grafics - Gráfico Pizza (Chart.js)
 * Block Name: cms-adm/build-grafics
 *
 * @package Periodic_Build_Grafics
 */

(function ($) {
	'use strict';

	/**
	 * Equalize heights of container legends in rows of 3
	 */
	function adjustHeightContainerLegends() {
		$('.all-grafics-element').each(function () {
			var $block = $(this);
			var containersLegends = [];
			var maxContainerLegendsHeight = 0;

			// Reset previous inline heights to calculate natural heights
			$block.find('.container-legends').css('height', 'auto');

			// Only equalize on desktop/tablet where elements are side-by-side
			if ($(window).width() > 768) {
				var $legends = $block.find('.container-legends');
				$legends.each(function (index) {
					var $item = $(this);
					var itemHeight = $item.outerHeight();
					containersLegends[index % 3] = $item;

					if (itemHeight > maxContainerLegendsHeight) {
						maxContainerLegendsHeight = itemHeight;
					}

					// When reaching end of row or last element
					if (index % 3 === 2 || index === $legends.length - 1) {
						for (var i = 0; i < containersLegends.length; i++) {
							if (containersLegends[i] && maxContainerLegendsHeight > 0) {
								containersLegends[i].outerHeight(maxContainerLegendsHeight);
							}
						}
						containersLegends = [];
						maxContainerLegendsHeight = 0;
					}
				});
			}
		});
	}

	/**
	 * Parse JSON safely with fallback
	 */
	function safeJsonParse(dataStr, fallback) {
		if (!dataStr) {
			return fallback;
		}
		try {
			return JSON.parse(dataStr);
		} catch (err) {
			console.warn('Erro ao converter JSON do gráfico:', err);
			return fallback;
		}
	}

	/**
	 * Initialize all Chart.js pie canvases
	 */
	function initBuildGrafics() {
		if (typeof Chart === 'undefined') {
			console.error('Chart.js não está carregado.');
			return;
		}

		$('.canvas-grafic-pie').each(function () {
			var $canvas = $(this);

			// Avoid double initialization
			if ($canvas.data('chart-initialized')) {
				return;
			}

			var canvasEl = $canvas.get(0);
			if (!canvasEl) {
				return;
			}

			var title = $canvas.attr('title') || '';
			var subTitle = $canvas.attr('subTitle') || '';
			var legends = safeJsonParse($canvas.attr('legend'), []);
			var dataValuesRaw = safeJsonParse($canvas.attr('dataValue'), []);
			var colors = safeJsonParse($canvas.attr('colorItem'), []);

			// Convert data values to numbers
			var dataValues = dataValuesRaw.map(function (v) {
				return parseFloat(v) || 0;
			});

			$canvas.removeClass('grafics-demo');

			try {
				var ctx = canvasEl.getContext('2d');
				new Chart(ctx, {
					type: 'pie',
					data: {
						labels: legends,
						datasets: [{
							label: title || 'Gráfico Pizza',
							data: dataValues,
							backgroundColor: colors,
							borderWidth: 1,
							borderColor: '#ffffff'
						}]
					},
					options: {
						responsive: true,
						maintainAspectRatio: true,
						plugins: {
							legend: {
								display: false // Legendas nativas ocultas em favor dos círculos personalizados
							},
							title: {
								display: false,
								text: title
							},
							subtitle: {
								display: false,
								text: subTitle
							},
							tooltip: {
								callbacks: {
									label: function (context) {
										var label = context.label || '';
										var val = context.raw || 0;
										var dataset = context.dataset;
										var total = dataset.data.reduce(function (a, b) {
											return a + b;
										}, 0);
										var percent = total > 0 ? ((val / total) * 100).toFixed(2) + '%' : '0%';
										return label + ': ' + val + ' (' + percent + ')';
									}
								}
							}
						}
					}
				});

				$canvas.data('chart-initialized', true);
			} catch (e) {
				console.warn('Erro ao inicializar Chart no canvas:', e);
			}
		});

		adjustHeightContainerLegends();
	}

	// Initialize on DOM ready
	$(document).ready(function () {
		initBuildGrafics();

		// Re-adjust heights on window resize with debounce
		var resizeTimeout;
		$(window).on('resize', function () {
			clearTimeout(resizeTimeout);
			resizeTimeout = setTimeout(adjustHeightContainerLegends, 150);
		});
	});

	// Re-run if document is dynamically updated (pjax / ajax content)
	$(document).on('build_grafics_init', initBuildGrafics);

})(jQuery);
