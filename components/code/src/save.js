/**
 * WordPress dependencies
 */
import { useBlockProps } from '@wordpress/block-editor';

/**
 * Authorial syntax decorator engine
 */
import { decorateCode } from './decorator';

/**
 * Save Component for frontend serialization
 *
 * @param {object} props
 * @param {object} props.attributes Block attributes
 * @return {JSX.Element} Serialized markup
 */
export default function Save({ attributes }) {
	const { code = '', language = 'javascript', theme = 'default' } = attributes;

	const blockProps = useBlockProps.save({
		className: `luiz-code-container theme-${theme}`,
		'data-language': language,
		'data-theme': theme,
	});

	const highlightedHtml = decorateCode(code, language);

	return (
		<div {...blockProps}>
			<div className="luiz-code-header">
				<div className="luiz-code-window-dots" aria-hidden="true">
					<span className="dot dot-red" />
					<span className="dot dot-yellow" />
					<span className="dot dot-green" />
				</div>
				<div className="luiz-code-header-center">
					<span className="luiz-code-language-badge">
						{language ? language.toUpperCase() : 'CODE'}
					</span>
				</div>
				<div className="luiz-code-header-right">
					<button
						type="button"
						className="luiz-code-copy-btn"
						aria-label="Copy code to clipboard"
						title="Copy code"
						data-copied-text="Copied!"
						onClick="navigator.clipboard.writeText(this.closest('.luiz-code-container').querySelector('code').innerText).then(()=>{var b=this,o=b.innerHTML;b.classList.add('copied');b.querySelector('.copy-label').innerText='Copied!';setTimeout(()=>{b.classList.remove('copied');b.innerHTML=o;},2000);})"
					>
						<svg
							xmlns="http://www.w3.org/2000/svg"
							width="14"
							height="14"
							viewBox="0 0 24 24"
							fill="none"
							stroke="currentColor"
							strokeWidth="2"
							strokeLinecap="round"
							strokeLinejoin="round"
							aria-hidden="true"
						>
							<rect x="9" y="9" width="13" height="13" rx="2" ry="2" />
							<path d="M5 15H4a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2h9a2 2 0 0 1 2 2v1" />
						</svg>
						<span className="copy-label">Copy</span>
					</button>
				</div>
			</div>
			<pre className="luiz-code-pre">
				<code
					className={`language-${language}`}
					dangerouslySetInnerHTML={{ __html: highlightedHtml }}
				/>
			</pre>
		</div>
	);
}
