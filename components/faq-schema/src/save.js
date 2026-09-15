import { useBlockProps, RichText } from '@wordpress/block-editor';

/**
 * Remove todas as tags HTML para uso no nome da pergunta Schema.org.
 *
 * @param {string} html
 * @return {string}
 */
function cleanQuestionText(html) {
	if (!html) return '';
	return html.replace(/<[^>]*>?/gm, '').trim();
}

/**
 * Limpa e formata a resposta permitindo apenas tags suportadas pelo Google.
 *
 * @param {string} html
 * @return {string}
 */
function sanitizeSchemaAnswer(html) {
	if (!html) return '';
	return html.trim();
}

export default function save({ attributes }) {
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

	const HeaderTag = headerTag || 'h3';
	const baseId = accordionId || 'faq-accordion';

	// Gera o payload Schema.org FAQPage
	const validFaqs = faqs.filter(
		(faq) => faq && faq.question && faq.answer
	);

	const schemaData = {
		'@context': 'https://schema.org',
		'@type': 'FAQPage',
		mainEntity: validFaqs.map((faq) => ({
			'@type': 'Question',
			name: cleanQuestionText(faq.question),
			acceptedAnswer: {
				'@type': 'Answer',
				text: sanitizeSchemaAnswer(faq.answer),
			},
		})),
	};

	const blockProps = useBlockProps.save({
		className: `accordion ${flush ? 'accordion-flush' : ''} periodic-faq-accordion`,
		id: baseId,
		style: customAccentColor
			? {
					'--faq-accent-color': customAccentColor,
			  }
			: undefined,
	});

	return (
		<div {...blockProps} data-icon-type={iconType}>
			{faqs.map((faq, index) => {
				const headingId = `${baseId}-heading-${index}`;
				const collapseId = `${baseId}-collapse-${index}`;
				const isOpen = !!faq.isOpenByDefault;

				return (
					<div className="accordion-item" key={faq.id || index}>
						<HeaderTag className="accordion-header" id={headingId}>
							<button
								className={`accordion-button ${
									isOpen ? '' : 'collapsed'
								}`}
								type="button"
								data-bs-toggle="collapse"
								data-bs-target={`#${collapseId}`}
								aria-expanded={isOpen ? 'true' : 'false'}
								aria-controls={collapseId}
							>
								<RichText.Content
									tagName="span"
									className="periodic-faq-question-text"
									value={faq.question}
								/>

								{iconType === 'fontawesome-chevron' && (
									<span
										className="periodic-faq-icon fa-icon-chevron"
										aria-hidden="true"
									>
										<i className="fa-solid fa-chevron-down"></i>
									</span>
								)}
								{iconType === 'fontawesome-plus' && (
									<span
										className="periodic-faq-icon fa-icon-plus"
										aria-hidden="true"
									>
										<i
											className={`fa-solid ${
												isOpen
													? 'fa-minus'
													: 'fa-plus'
											}`}
										></i>
									</span>
								)}
							</button>
						</HeaderTag>

						<div
							id={collapseId}
							className={`accordion-collapse collapse ${
								isOpen ? 'show' : ''
							}`}
							aria-labelledby={headingId}
							{...(!alwaysOpen
								? { 'data-bs-parent': `#${baseId}` }
								: {})}
						>
							<div className="accordion-body">
								<RichText.Content
									tagName="div"
									className="periodic-faq-answer-content"
									value={faq.answer}
								/>
							</div>
						</div>
					</div>
				);
			})}

			{schemaEnabled && validFaqs.length > 0 && (
				<script
					type="application/ld+json"
					dangerouslySetInnerHTML={{
						__html: JSON.stringify(schemaData),
					}}
				/>
			)}
		</div>
	);
}
