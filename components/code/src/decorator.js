/**
 * Luiz Highlighter & Text Decorator Engine
 * 
 * Lightweight, zero-dependency authorial syntax highlighter.
 * Created by Luiz (periodic).
 * License: GPL-2.0-or-later
 */

/**
 * Safely escapes HTML special characters.
 *
 * @param {string} text
 * @return {string}
 */
export function escapeHtml(text) {
	if (!text) return '';
	return text
		.replace(/&/g, '&amp;')
		.replace(/</g, '&lt;')
		.replace(/>/g, '&gt;')
		.replace(/"/g, '&quot;')
		.replace(/'/g, '&#039;');
}

/**
 * Language syntax definition rules
 */
const RULES = {
	javascript: [
		{ type: 'comment', regex: /\/\/[^\n]*|\/\*[\s\S]*?\*\//g },
		{ type: 'string', regex: /"(?:\\.|[^"\\])*"|'(?:\\.|[^'\\])*'|`(?:\\.|[^`\\])*`/g },
		{ type: 'number', regex: /\b\d+(?:\.\d+)?(?:e[+-]?\d+)?\b/gi },
		{
			type: 'keyword',
			regex: /\b(?:async|await|break|case|catch|class|const|continue|debugger|default|delete|do|else|export|extends|finally|for|function|if|import|in|instanceof|let|new|null|of|return|static|super|switch|this|throw|true|false|try|typeof|undefined|var|void|while|with|yield)\b/g,
		},
		{ type: 'func', regex: /\b([a-zA-Z_$][a-zA-Z0-9_$]*)(?=\s*\()/g },
		{ type: 'operator', regex: /=>|===|!==|==|!=|<=|>=|\+\+|--|&&|\|\||[+\-*\/%&|^~!=<>?:]/g },
		{ type: 'tag', regex: /<\/?[a-zA-Z][a-zA-Z0-9-]*(?:\s|>|\/)/g },
	],
	python: [
		{ type: 'comment', regex: /#[^\n]*/g },
		{ type: 'string', regex: /"""[\s\S]*?"""|'''[\s\S]*?'''|"(?:\\.|[^"\\])*"|'(?:\\.|[^'\\])*'/g },
		{ type: 'number', regex: /\b\d+(?:\.\d+)?\b/g },
		{
			type: 'keyword',
			regex: /\b(?:and|as|assert|async|await|break|class|continue|def|del|elif|else|except|finally|for|from|global|if|import|in|is|lambda|nonlocal|not|or|pass|raise|return|try|while|with|yield|True|False|None|self)\b/g,
		},
		{ type: 'decorator', regex: /@[a-zA-Z_]\w*/g },
		{ type: 'func', regex: /\bdef\s+([a-zA-Z_]\w*)|([a-zA-Z_]\w*)(?=\s*\()/g },
		{ type: 'operator', regex: /==|!=|<=|>=|\/\/|\*\*|[+\-*\/%&|^~!=<>]/g },
	],
	php: [
		{ type: 'comment', regex: /\/\/[^\n]*|\/\*[\s\S]*?\*\/|#[^\n]*/g },
		{ type: 'string', regex: /"(?:\\.|[^"\\])*"|'(?:\\.|[^'\\])*'/g },
		{ type: 'variable', regex: /\$[a-zA-Z_\x7f-\xff][a-zA-Z0-9_\x7f-\xff]*/g },
		{ type: 'number', regex: /\b\d+(?:\.\d+)?\b/g },
		{
			type: 'keyword',
			regex: /\b(?:abstract|and|array|as|break|callable|case|catch|class|clone|const|continue|declare|default|die|do|echo|else|elseif|empty|enddeclare|endfor|endforeach|endif|endswitch|endwhile|eval|exit|extends|final|finally|fn|for|foreach|function|global|goto|if|implements|include|include_once|instanceof|insteadof|interface|isset|list|match|namespace|new|or|print|private|protected|public|readonly|require|require_once|return|static|switch|throw|trait|try|unset|use|var|while|xor|yield|true|false|null)\b/gi,
		},
		{ type: 'func', regex: /\bfunction\s+([a-zA-Z_]\w*)|([a-zA-Z_]\w*)(?=\s*\()/gi },
		{ type: 'operator', regex: /=>|->|\?\?|===|!==|==|!=|<=|>=|[+\-*\/%&|^~!=<>?:]/g },
	],
	html: [
		{ type: 'comment', regex: /<!--[\s\S]*?-->/g },
		{ type: 'doctype', regex: /<!DOCTYPE[\s\S]*?>/gi },
		{ type: 'tag', regex: /<\/?[a-zA-Z0-9:-]+/g },
		{ type: 'attr', regex: /\b[a-zA-Z0-9_:-]+(?=\s*=)/g },
		{ type: 'string', regex: /"(?:\\.|[^"\\])*"|'(?:\\.|[^'\\])*'/g },
	],
	css: [
		{ type: 'comment', regex: /\/\*[\s\S]*?\*\//g },
		{ type: 'string', regex: /"(?:\\.|[^"\\])*"|'(?:\\.|[^'\\])*'/g },
		{ type: 'number', regex: /#[0-9a-fA-F]{3,8}\b|\b\d+(?:\.\d+)?(?:px|em|rem|%|vh|vw|s|ms|deg|fr)?\b/g },
		{ type: 'keyword', regex: /@[a-zA-Z-]+|\b(?:important|inherit|initial|unset|auto|none)\b/gi },
		{ type: 'property', regex: /\b[a-zA-Z-]+(?=\s*:)/g },
		{ type: 'selector', regex: /(?:^|[{};])\s*([^{};]+)(?=\{)/g },
	],
	sql: [
		{ type: 'comment', regex: /--[^\n]*|\/\*[\s\S]*?\*\//g },
		{ type: 'string', regex: /'(?:''|[^'])*'/g },
		{ type: 'number', regex: /\b\d+(?:\.\d+)?\b/g },
		{
			type: 'keyword',
			regex: /\b(?:SELECT|FROM|WHERE|INSERT|INTO|UPDATE|DELETE|CREATE|TABLE|DROP|ALTER|JOIN|INNER|LEFT|RIGHT|FULL|OUTER|CROSS|ON|GROUP|BY|ORDER|HAVING|LIMIT|OFFSET|AND|OR|NOT|IN|IS|NULL|AS|DISTINCT|UNION|ALL|VIEW|INDEX|PRIMARY|KEY|FOREIGN|REFERENCES|DATABASE|SET|VALUES|LIKE|ILIKE|BETWEEN|EXISTS|CASE|WHEN|THEN|ELSE|END|ASC|DESC|DEFAULT)\b/gi,
		},
		{ type: 'func', regex: /\b(?:COUNT|SUM|AVG|MAX|MIN|COALESCE|NOW|CONCAT|SUBSTRING|TRIM|ROUND)(?=\s*\()/gi },
	],
	markdown: [
		{ type: 'heading', regex: /^#{1,6}[ \t]+[^\n]+/gm },
		{ type: 'string', regex: /`[^`\n]+`/g },
		{ type: 'keyword', regex: /\*\*[^*\n]+\*\*|__[^_\n]+__/g },
		{ type: 'comment', regex: /<!--[\s\S]*?-->/g },
		{ type: 'link', regex: /\[[^\]\n]+\]\([^)\n]+\)/g },
		{ type: 'list', regex: /^[ \t]*[-*+][ \t]+|^[ \t]*\d+\.[ \t]+/gm },
	],
};

/**
 * Decorates source code and returns high-performance syntax highlighted HTML.
 *
 * @param {string} code Raw source code
 * @param {string} lang Language identifier
 * @return {string} HTML string with token span tags
 */
export function decorateCode(code, lang) {
	if (!code) {
		return '';
	}

	const languageRules = RULES[lang] || RULES.javascript;
	const matches = [];

	// Collect matches for all rules in this language
	for (const rule of languageRules) {
		const regex = new RegExp(rule.regex);
		let match;
		while ((match = regex.exec(code)) !== null) {
			matches.push({
				start: match.index,
				end: match.index + match[0].length,
				type: rule.type,
				text: match[0],
			});
		}
	}

	// Sort matches by start position, longer matches win in case of collision
	matches.sort((a, b) => a.start - b.start || b.end - a.end);

	// Filter out overlapping matches
	const nonOverlapping = [];
	let lastEnd = 0;
	for (const match of matches) {
		if (match.start >= lastEnd) {
			nonOverlapping.push(match);
			lastEnd = match.end;
		}
	}

	// Assemble final HTML
	let html = '';
	let cursor = 0;

	for (const token of nonOverlapping) {
		if (token.start > cursor) {
			html += escapeHtml(code.slice(cursor, token.start));
		}
		html += `<span class="tok-${token.type}">${escapeHtml(token.text)}</span>`;
		cursor = token.end;
	}

	if (cursor < code.length) {
		html += escapeHtml(code.slice(cursor));
	}

	return html;
}
