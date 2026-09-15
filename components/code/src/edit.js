/**
 * WordPress dependencies
 */
import { __ } from '@wordpress/i18n';
import { useBlockProps, InspectorControls } from '@wordpress/block-editor';
import { PanelBody, SelectControl, PanelRow } from '@wordpress/components';
import { useRef, useMemo } from '@wordpress/element';

/**
 * Authorial syntax decorator engine
 */
import { decorateCode } from './decorator';

/**
 * Available languages list
 */
const LANGUAGE_OPTIONS = [
	{ label: 'JavaScript (ECMAScript, JSX)', value: 'javascript' },
	{ label: 'Python', value: 'python' },
	{ label: 'PHP', value: 'php' },
	{ label: 'HTML / XML', value: 'html' },
	{ label: 'CSS', value: 'css' },
	{ label: 'SQL', value: 'sql' },
	{ label: 'Markdown', value: 'markdown' },
];

/**
 * Available themes list
 */
const THEME_OPTIONS = [
	{ label: 'Default (Clean Light)', value: 'default' },
	{ label: 'One Dark', value: 'one-dark' },
	{ label: 'Dracula', value: 'dracula' },
	{ label: 'Solarized Dark', value: 'solarized' },
	{ label: 'Nord (Arctic Frost)', value: 'nord' },
];

export default function Edit({ attributes, setAttributes }) {
	const { code = '', language = 'javascript', theme = 'default' } = attributes;
	const textareaRef = useRef(null);
	const preRef = useRef(null);
	const lineNumbersRef = useRef(null);

	// Real-time syntax decoration using our authorial engine
	const highlightedHtml = useMemo(() => {
		return decorateCode(code, language);
	}, [code, language]);

	// Calculate line numbers
	const lines = useMemo(() => {
		const count = (code || '').split('\n').length;
		return Array.from({ length: Math.max(count, 1) }, (_, i) => i + 1);
	}, [code]);

	// Synchronize scroll between textarea, highlighter, and line numbers
	const handleScroll = (e) => {
		const { scrollTop, scrollLeft } = e.target;
		if (preRef.current) {
			preRef.current.scrollTop = scrollTop;
			preRef.current.scrollLeft = scrollLeft;
		}
		if (lineNumbersRef.current) {
			lineNumbersRef.current.scrollTop = scrollTop;
		}
	};

	// Tab key handling for code indentation
	const handleKeyDown = (e) => {
		if (e.key === 'Tab') {
			e.preventDefault();
			const textarea = textareaRef.current;
			if (!textarea) return;

			const start = textarea.selectionStart;
			const end = textarea.selectionEnd;
			const indent = '    '; // 4 spaces

			const newCode = code.substring(0, start) + indent + code.substring(end);
			setAttributes({ code: newCode });

			// Restore cursor position after state update
			setTimeout(() => {
				textarea.selectionStart = textarea.selectionEnd = start + indent.length;
			}, 0);
		}
	};

	const blockProps = useBlockProps({
		className: `luiz-code-container theme-${theme}`,
	});

	const lineCount = lines.length;
	const charCount = (code || '').length;

	return (
		<div {...blockProps}>
			<InspectorControls>
				<PanelBody
					title={__('Configurações do Código', 'periodic-code')}
					initialOpen={true}
				>
					<SelectControl
						label={__('Selecione a linguagem', 'periodic-code')}
						help={__(
							'Define a sintaxe e o realce de cores correspondente ao código inserido.',
							'periodic-code'
						)}
						value={language}
						options={LANGUAGE_OPTIONS}
						onChange={(newLang) => setAttributes({ language: newLang })}
					/>
					<SelectControl
						label={__('Tema de formatação', 'periodic-code')}
						help={__(
							'Escolha o esquema de cores para o editor e a exibição no site.',
							'periodic-code'
						)}
						value={theme}
						options={THEME_OPTIONS}
						onChange={(newTheme) => setAttributes({ theme: newTheme })}
					/>
					<PanelRow className="luiz-code-meta-row">
						<span className="components-base-control__label">
							{__('Estatísticas:', 'periodic-code')}
						</span>
						<span className="luiz-code-stats-badge">
							{lineCount} {lineCount === 1 ? 'linha' : 'linhas'} | {charCount} chars
						</span>
					</PanelRow>
				</PanelBody>
			</InspectorControls>

			{/* Terminal window header */}
			<div className="luiz-code-header">
				<div className="luiz-code-window-dots" aria-hidden="true">
					<span className="dot dot-red" />
					<span className="dot dot-yellow" />
					<span className="dot dot-green" />
				</div>
				<div className="luiz-code-header-center">
					<span className="luiz-code-title">Periodic Code</span>
				</div>
				<div className="luiz-code-header-right">
					<span className="luiz-code-language-badge">
						{language.toUpperCase()}
					</span>
					<span className="luiz-code-theme-badge">
						{theme}
					</span>
				</div>
			</div>

			{/* Interactive editor workspace */}
			<div className="luiz-code-workspace">
				{/* Line numbers column */}
				<div className="luiz-line-numbers" ref={lineNumbersRef} aria-hidden="true">
					{lines.map((num) => (
						<div key={num} className="line-num">{num}</div>
					))}
				</div>

				{/* Code input & syntax highlight stack */}
				<div className="luiz-code-area">
					{/* Syntax highlighted background layer */}
					<pre
						className="luiz-highlight-layer"
						ref={preRef}
						aria-hidden="true"
					>
						<code
							dangerouslySetInnerHTML={{
								__html: highlightedHtml + (code.endsWith('\n') ? ' ' : ''),
							}}
						/>
					</pre>

					{/* Transparent interactive textarea for typing */}
					<textarea
						ref={textareaRef}
						className="luiz-code-textarea"
						value={code}
						placeholder={__(
							'Digite ou cole seu código aqui...',
							'periodic-code'
						)}
						onChange={(e) => setAttributes({ code: e.target.value })}
						onScroll={handleScroll}
						onKeyDown={handleKeyDown}
						spellCheck={false}
						autoCapitalize="off"
						autoComplete="off"
						autoCorrect="off"
					/>
				</div>
			</div>
		</div>
	);
}
