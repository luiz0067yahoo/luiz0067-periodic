import { __ } from '@wordpress/i18n';
import {
	useBlockProps,
	InspectorControls,
	RichText,
	PanelColorSettings,
} from '@wordpress/block-editor';
import {
	PanelBody,
	Button,
	ToggleControl,
	SelectControl,
	TabPanel,
	Notice,
	Tooltip,
} from '@wordpress/components';
import { useEffect, useState } from '@wordpress/element';

/**
 * Remove tags HTML do texto para visualização limpa de schema.
 *
 * @param {string} html
 * @return {string}
 */
function stripHtml(html) {
	if (!html) return '';
	return html.replace(/<[^>]*>?/gm, '').trim();
}

export default function Edit({ attributes, setAttributes, clientId }) {
	const {
		accordionId,
		faqs,
		schemaEnabled,
		flush,
		alwaysOpen,
		headerTag,
		iconType,
		customAccentColor,
	} = attributes;

	// Estado local para colapsar/expandir itens no editor WYSIWYG
	const [activeEditorItems, setActiveEditorItems] = useState({});

	// Inicializa um ID único caso não exista
	useEffect(() => {
		if (!accordionId) {
			setAttributes({
				accordionId: `faq-accordion-${clientId.slice(0, 8)}`,
			});
		}

		// Sincroniza estado de abertura inicial com isOpenByDefault
		const initialActive = {};
		faqs.forEach((faq, index) => {
			initialActive[faq.id || index] = !!faq.isOpenByDefault;
		});
		setActiveEditorItems(initialActive);
	}, [clientId, accordionId]);

	/**
	 * Alterna abertura de item no editor.
	 */
	const toggleItemOpen = (id) => {
		setActiveEditorItems((prev) => ({
			...prev,
			[id]: !prev[id],
		}));
	};

	/**
	 * Atualiza campo de uma FAQ específica.
	 */
	const updateFaq = (index, key, value) => {
		const updatedFaqs = [...faqs];
		updatedFaqs[index] = {
			...updatedFaqs[index],
			[key]: value,
		};
		setAttributes({ faqs: updatedFaqs });
	};

	/**
	 * Adiciona nova pergunta à lista.
	 */
	const addFaq = () => {
		const newId = `faq-${Date.now()}`;
		const newFaqs = [
			...faqs,
			{
				id: newId,
				question: '',
				answer: '',
				isOpenByDefault: false,
			},
		];
		setAttributes({ faqs: newFaqs });
		setActiveEditorItems((prev) => ({
			...prev,
			[newId]: true,
		}));
	};

	/**
	 * Remove uma pergunta pelo índice.
	 */
	const removeFaq = (index) => {
		if (faqs.length <= 1) {
			alert(
				__(
					'O accordion deve conter pelo menos uma pergunta.',
					'periodic-faq-schema'
				)
			);
			return;
		}
		const updatedFaqs = faqs.filter((_, i) => i !== index);
		setAttributes({ faqs: updatedFaqs });
	};

	/**
	 * Move item para cima na ordenação.
	 */
	const moveFaqUp = (index) => {
		if (index === 0) return;
		const updatedFaqs = [...faqs];
		const item = updatedFaqs.splice(index, 1)[0];
		updatedFaqs.splice(index - 1, 0, item);
		setAttributes({ faqs: updatedFaqs });
	};

	/**
	 * Move item para baixo na ordenação.
	 */
	const moveFaqDown = (index) => {
		if (index === faqs.length - 1) return;
		const updatedFaqs = [...faqs];
		const item = updatedFaqs.splice(index, 1)[0];
		updatedFaqs.splice(index + 1, 0, item);
		setAttributes({ faqs: updatedFaqs });
	};

	// Gera a estrutura JSON-LD Schema.org para exibição prévia no Inspector
	const schemaPreview = {
		'@context': 'https://schema.org',
		'@type': 'FAQPage',
		mainEntity: faqs
			.filter((faq) => faq.question && faq.answer)
			.map((faq) => ({
				'@type': 'Question',
				name: stripHtml(faq.question),
				acceptedAnswer: {
					'@type': 'Answer',
					text: faq.answer,
				},
			})),
	};

	const HeaderTag = headerTag || 'h3';

	const blockProps = useBlockProps({
		className: `periodic-faq-wrapper ${flush ? 'is-flush' : ''}`,
		style: customAccentColor
			? {
					'--faq-accent-color': customAccentColor,
			  }
			: undefined,
	});

	return (
		<>
			<InspectorControls>
				<TabPanel
					className="periodic-faq-inspector-tabs"
					activeClass="is-active"
					tabs={[
						{
							name: 'faqs',
							title: __(
								'Perguntas e Respostas',
								'periodic-faq-schema'
							),
							className: 'tab-faqs',
						},
						{
							name: 'seo',
							title: __(
								'Configurações de SEO',
								'periodic-faq-schema'
							),
							className: 'tab-seo',
						},
						{
							name: 'style',
							title: __(
								'Estilo do Accordion',
								'periodic-faq-schema'
							),
							className: 'tab-style',
						},
					]}
				>
					{(tab) => {
						if (tab.name === 'faqs') {
							return (
								<PanelBody
									title={__(
										'Gerenciador de Perguntas',
										'periodic-faq-schema'
									)}
									initialOpen={true}
								>
									<p className="components-base-control__help">
										{__(
											'Organize a ordem, status inicial e itens das perguntas frequentes.',
											'periodic-faq-schema'
										)}
									</p>
									<div className="periodic-faq-sidebar-list">
										{faqs.map((faq, index) => (
											<div
												key={faq.id || index}
												className="periodic-faq-sidebar-item"
											>
												<div className="periodic-faq-sidebar-item-header">
													<span className="periodic-faq-sidebar-item-index">
														#{index + 1}
													</span>
													<strong className="periodic-faq-sidebar-item-title">
														{stripHtml(
															faq.question
														) ||
															__(
																'(Pergunta sem título)',
																'periodic-faq-schema'
															)}
													</strong>
												</div>
												<div className="periodic-faq-sidebar-item-actions">
													<Button
														icon="arrow-up-alt2"
														isSmall
														disabled={index === 0}
														onClick={() =>
															moveFaqUp(index)
														}
														label={__(
															'Mover para cima',
															'periodic-faq-schema'
														)}
													/>
													<Button
														icon="arrow-down-alt2"
														isSmall
														disabled={
															index ===
															faqs.length - 1
														}
														onClick={() =>
															moveFaqDown(index)
														}
														label={__(
															'Mover para baixo',
															'periodic-faq-schema'
														)}
													/>
													<Button
														icon="trash"
														isDestructive
														isSmall
														onClick={() =>
															removeFaq(index)
														}
														label={__(
															'Excluir pergunta',
															'periodic-faq-schema'
														)}
													/>
												</div>
												<ToggleControl
													label={__(
														'Aberto inicialmente por padrão',
														'periodic-faq-schema'
													)}
													checked={
														!!faq.isOpenByDefault
													}
													onChange={(checked) =>
														updateFaq(
															index,
															'isOpenByDefault',
															checked
														)
													}
												/>
											</div>
										))}
									</div>
									<Button
										variant="primary"
										icon="plus"
										onClick={addFaq}
										className="periodic-btn-add-faq"
									>
										{__(
											'Adicionar Nova Pergunta',
											'periodic-faq-schema'
										)}
									</Button>
								</PanelBody>
							);
						}

						if (tab.name === 'seo') {
							return (
								<PanelBody
									title={__(
										'Marcação Schema.org FAQPage',
										'periodic-faq-schema'
									)}
									initialOpen={true}
								>
									<ToggleControl
										label={__(
											'Ativar Schema.org FAQPage (JSON-LD)',
											'periodic-faq-schema'
										)}
										help={
											schemaEnabled
												? __(
														'A marcação JSON-LD será injetada no HTML da página para leitura dos robôs de busca (Googlebot).',
														'periodic-faq-schema'
												  )
												: __(
														'Injeção desativada. O accordion será exibido sem dados estruturados de SEO.',
														'periodic-faq-schema'
												  )
										}
										checked={schemaEnabled}
										onChange={(val) =>
											setAttributes({
												schemaEnabled: val,
											})
										}
									/>

									{schemaEnabled && (
										<>
											<Notice
												status="success"
												isDismissible={false}
											>
												<p>
													<strong>
														{__(
															'Diretrizes do Google Rich Results:',
															'periodic-faq-schema'
														)}
													</strong>
													<br />
													{__(
														'O conteúdo das perguntas e respostas deve corresponder exatamente ao visível para o usuário.',
														'periodic-faq-schema'
													)}
												</p>
											</Notice>

											<div className="periodic-faq-schema-preview-box">
												<label className="components-base-control__label">
													{__(
														'Prévia dos Dados Estruturados (JSON-LD):',
														'periodic-faq-schema'
													)}
												</label>
												<pre className="periodic-faq-schema-code">
													{JSON.stringify(
														schemaPreview,
														null,
														2
													)}
												</pre>
											</div>
										</>
									)}
								</PanelBody>
							);
						}

						if (tab.name === 'style') {
							return (
								<>
									<PanelBody
										title={__(
											'Estrutura e Comportamento',
											'periodic-faq-schema'
										)}
										initialOpen={true}
									>
										<ToggleControl
											label={__(
												'Estilo Flush (sem bordas externas)',
												'periodic-faq-schema'
											)}
											help={__(
												'Remove bordas e cantos arredondados externos conforme padrão Bootstrap 5.',
												'periodic-faq-schema'
											)}
											checked={flush}
											onChange={(val) =>
												setAttributes({ flush: val })
											}
										/>

										<ToggleControl
											label={__(
												'Permitir múltiplos itens abertos',
												'periodic-faq-schema'
											)}
											help={__(
												'Mantém outros itens abertos quando o usuário clica em uma nova pergunta.',
												'periodic-faq-schema'
											)}
											checked={alwaysOpen}
											onChange={(val) =>
												setAttributes({
													alwaysOpen: val,
												})
											}
										/>

										<SelectControl
											label={__(
												'Tag Semântica do Cabeçalho',
												'periodic-faq-schema'
											)}
											help={__(
												'Define a hierarquia de títulos HTML para acessibilidade e SEO.',
												'periodic-faq-schema'
											)}
											value={headerTag}
											options={[
												{ label: 'H2', value: 'h2' },
												{ label: 'H3 (Padrão)', value: 'h3' },
												{ label: 'H4', value: 'h4' },
												{ label: 'H5', value: 'h5' },
												{ label: 'H6', value: 'h6' },
												{ label: 'DIV', value: 'div' },
											]}
											onChange={(val) =>
												setAttributes({ headerTag: val })
											}
										/>

										<SelectControl
											label={__(
												'Estilo do Ícone Indicador',
												'periodic-faq-schema'
											)}
											value={iconType}
											options={[
												{
													label: __(
														'Font Awesome 6 (Chevron)',
														'periodic-faq-schema'
													),
													value: 'fontawesome-chevron',
												},
												{
													label: __(
														'Font Awesome 6 (Mais / Menos)',
														'periodic-faq-schema'
													),
													value: 'fontawesome-plus',
												},
												{
													label: __(
														'Bootstrap 5 Padrão (SVG)',
														'periodic-faq-schema'
													),
													value: 'bootstrap',
												},
												{
													label: __(
														'Nenhum (Sem Ícone)',
														'periodic-faq-schema'
													),
													value: 'none',
												},
											]}
											onChange={(val) =>
												setAttributes({ iconType: val })
											}
										/>
									</PanelBody>

									<PanelColorSettings
										title={__(
											'Cores Personalizadas',
											'periodic-faq-schema'
										)}
										initialOpen={false}
										colorSettings={[
											{
												value: customAccentColor,
												onChange: (color) =>
													setAttributes({
														customAccentColor: color || '',
													}),
												label: __(
													'Cor de Destaque / Ativo',
													'periodic-faq-schema'
												),
											},
										]}
									/>
								</>
							);
						}

						return null;
					}}
				</TabPanel>
			</InspectorControls>

			<div {...blockProps}>
				{/* Selo Visual de SEO Schema */}
				<div className="periodic-faq-badge-container">
					{schemaEnabled ? (
						<div className="periodic-faq-badge is-active">
							<span className="periodic-faq-badge-dot"></span>
							<i className="fa-solid fa-square-check" aria-hidden="true"></i>
							<span>
								{__(
									'SEO Schema Ativo: schema.org/FAQPage JSON-LD habilitado',
									'periodic-faq-schema'
								)}
							</span>
						</div>
					) : (
						<div className="periodic-faq-badge is-inactive">
							<i className="fa-solid fa-triangle-exclamation" aria-hidden="true"></i>
							<span>
								{__(
									'SEO Schema Desativado',
									'periodic-faq-schema'
								)}
							</span>
						</div>
					)}
					<span className="periodic-faq-badge-info">
						{__(
							'Bootstrap 5 + Font Awesome 6',
							'periodic-faq-schema'
						)}
					</span>
				</div>

				{/* Accordion WYSIWYG no Editor */}
				<div
					className={`accordion ${flush ? 'accordion-flush' : ''} periodic-faq-accordion`}
					id={accordionId}
					data-icon-type={iconType}
				>
					{faqs.map((faq, index) => {
						const faqId = faq.id || `faq-${index}`;
						const isOpen = !!activeEditorItems[faqId];

						return (
							<div
								key={faqId}
								className={`accordion-item periodic-faq-editor-item ${
									isOpen ? 'is-open' : 'is-collapsed'
								}`}
							>
								<HeaderTag className="accordion-header">
									<div
										className={`accordion-button ${
											isOpen ? '' : 'collapsed'
										}`}
										onClick={() => toggleItemOpen(faqId)}
										role="button"
										tabIndex={0}
										onKeyDown={(e) => {
											if (
												e.key === 'Enter' ||
												e.key === ' '
											) {
												e.preventDefault();
												toggleItemOpen(faqId);
											}
										}}
									>
										<div className="periodic-faq-header-content">
											<span className="periodic-faq-question-num">
												Q{index + 1}.
											</span>
											<RichText
												tagName="span"
												className="periodic-faq-question-text"
												value={faq.question}
												onChange={(value) =>
													updateFaq(
														index,
														'question',
														value
													)
												}
												placeholder={__(
													'Digite a pergunta frequente...',
													'periodic-faq-schema'
												)}
												allowedFormats={[
													'core/bold',
													'core/italic',
												]}
												onClick={(e) =>
													e.stopPropagation()
												}
											/>
										</div>

										<div
											className="periodic-faq-item-toolbar"
											onClick={(e) => e.stopPropagation()}
										>
											{faq.isOpenByDefault && (
												<Tooltip
													text={__(
														'Abre expandido por padrão no carregamento',
														'periodic-faq-schema'
													)}
												>
													<span className="periodic-badge-default-open">
														{__(
															'Aberto por padrão',
															'periodic-faq-schema'
														)}
													</span>
												</Tooltip>
											)}
											<Button
												icon="arrow-up-alt2"
												isSmall
												disabled={index === 0}
												onClick={() => moveFaqUp(index)}
												label={__(
													'Mover para cima',
													'periodic-faq-schema'
												)}
											/>
											<Button
												icon="arrow-down-alt2"
												isSmall
												disabled={
													index === faqs.length - 1
												}
												onClick={() =>
													moveFaqDown(index)
												}
												label={__(
													'Mover para baixo',
													'periodic-faq-schema'
												)}
											/>
											<Button
												icon="trash"
												isDestructive
												isSmall
												onClick={() => removeFaq(index)}
												label={__(
													'Excluir',
													'periodic-faq-schema'
												)}
											/>
										</div>

										{/* Renderização do Ícone */}
										{iconType === 'fontawesome-chevron' && (
											<span className="periodic-faq-icon fa-icon-chevron">
												<i
													className="fa-solid fa-chevron-down"
													aria-hidden="true"
												></i>
											</span>
										)}
										{iconType === 'fontawesome-plus' && (
											<span className="periodic-faq-icon fa-icon-plus">
												<i
													className={`fa-solid ${
														isOpen
															? 'fa-minus'
															: 'fa-plus'
													}`}
													aria-hidden="true"
												></i>
											</span>
										)}
									</div>
								</HeaderTag>

								{isOpen && (
									<div className="accordion-collapse collapse show">
										<div className="accordion-body">
											<div className="periodic-faq-answer-label">
												<i
													className="fa-solid fa-comment-dots"
													aria-hidden="true"
												></i>
												<span>
													{__(
														'Resposta (suporta formatação, links e listas):',
														'periodic-faq-schema'
													)}
												</span>
											</div>
											<RichText
												tagName="div"
												multiline="p"
												className="periodic-faq-answer-text"
												value={faq.answer}
												onChange={(value) =>
													updateFaq(
														index,
														'answer',
														value
													)
												}
												placeholder={__(
													'Digite aqui a resposta detalhada...',
													'periodic-faq-schema'
												)}
												allowedFormats={[
													'core/bold',
													'core/italic',
													'core/link',
													'core/underline',
													'core/strikethrough',
												]}
											/>
										</div>
									</div>
								)}
							</div>
						);
					})}
				</div>

				{/* Botão de Adição Rápida no Canvas */}
				<div className="periodic-faq-canvas-add">
					<Button
						variant="secondary"
						icon="plus-alt2"
						onClick={addFaq}
						className="periodic-btn-add-canvas"
					>
						{__('Adicionar Pergunta', 'periodic-faq-schema')}
					</Button>
				</div>
			</div>
		</>
	);
}
