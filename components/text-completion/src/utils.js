/**
 * Utility functions for periodic-text-completion
 */

/**
 * Normalizes text for comparison based on configuration
 *
 * @param {string} str
 * @param {boolean} ignoreAccents
 * @param {boolean} caseSensitive
 * @returns {string}
 */
export function normalizeText( str, ignoreAccents = true, caseSensitive = false ) {
	if ( ! str ) return '';
	let result = str.trim();

	if ( ! caseSensitive ) {
		result = result.toLowerCase();
	}

	if ( ignoreAccents ) {
		result = result.normalize( 'NFD' ).replace( /[\u0300-\u036f]/g, '' );
	}

	return result;
}

/**
 * Calculates Levenshtein distance between two strings
 *
 * @param {string} a
 * @param {string} b
 * @returns {number}
 */
export function levenshteinDistance( a, b ) {
	if ( a.length === 0 ) return b.length;
	if ( b.length === 0 ) return a.length;

	const matrix = [];

	for ( let i = 0; i <= b.length; i++ ) {
		matrix[ i ] = [ i ];
	}

	for ( let j = 0; j <= a.length; j++ ) {
		matrix[ 0 ][ j ] = j;
	}

	for ( let i = 1; i <= b.length; i++ ) {
		for ( let j = 1; j <= a.length; j++ ) {
			if ( b.charAt( i - 1 ) === a.charAt( j - 1 ) ) {
				matrix[ i ][ j ] = matrix[ i - 1 ][ j - 1 ];
			} else {
				matrix[ i ][ j ] = Math.min(
					matrix[ i - 1 ][ j - 1 ] + 1, // substitution
					matrix[ i ][ j - 1 ] + 1,     // insertion
					matrix[ i - 1 ][ j ] + 1      // deletion
				);
			}
		}
	}

	return matrix[ b.length ][ a.length ];
}

/**
 * Parses raw text and extracts all gaps
 * Supports both *word* and *[opt1|opt2]* or *opt1|opt2*
 *
 * @param {string} text
 * @returns {Array<{raw: string, options: string[], canonical: string}>}
 */
export function extractGaps( text ) {
	if ( ! text ) return [];

	const regex = /\*([^*]+)\*/g;
	const gaps = [];
	let match;

	while ( ( match = regex.exec( text ) ) !== null ) {
		let inner = match[ 1 ].trim();

		// Remove brackets if present: *[opt1|opt2]* -> opt1|opt2
		if ( inner.startsWith( '[' ) && inner.endsWith( ']' ) ) {
			inner = inner.slice( 1, -1 ).trim();
		}

		// Split options by pipe '|'
		const options = inner
			.split( '|' )
			.map( ( opt ) => opt.trim() )
			.filter( Boolean );

		const validOptions = options.length > 0 ? options : [ inner ];

		gaps.push( {
			raw: match[ 0 ],
			options: validOptions,
			canonical: validOptions[ 0 ],
		} );
	}

	return gaps;
}

/**
 * Checks if user answer is considered valid against allowed options
 *
 * @param {string} userInput
 * @param {string[]} options
 * @param {{caseSensitive?: boolean, acceptTypos?: boolean, ignoreAccents?: boolean}} config
 * @returns {{isValid: boolean, isTypo: boolean, matchedOption: string|null}}
 */
export function validateAnswer( userInput, options, config = {} ) {
	const {
		caseSensitive = false,
		acceptTypos = true,
		ignoreAccents = false,
	} = config;

	const normalizedUser = normalizeText( userInput, ignoreAccents, caseSensitive );
	if ( ! normalizedUser ) {
		return { isValid: false, isTypo: false, matchedOption: null };
	}

	// 1. Exact or normalized match
	for ( const opt of options ) {
		const normalizedOpt = normalizeText( opt, ignoreAccents, caseSensitive );
		if ( normalizedUser === normalizedOpt ) {
			return { isValid: true, isTypo: false, matchedOption: opt };
		}
	}

	// 2. Typo tolerance (Levenshtein distance <= 1 for words with 4 or more characters)
	if ( acceptTypos ) {
		for ( const opt of options ) {
			const normalizedOpt = normalizeText( opt, ignoreAccents, caseSensitive );
			if ( normalizedOpt.length >= 4 ) {
				const dist = levenshteinDistance( normalizedUser, normalizedOpt );
				if ( dist === 1 ) {
					return { isValid: true, isTypo: true, matchedOption: opt };
				}
			}
		}
	}

	return { isValid: false, isTypo: false, matchedOption: null };
}
