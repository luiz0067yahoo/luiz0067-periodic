/**
 * WordPress dependencies
 */
import { useBlockProps, RichText } from '@wordpress/block-editor';

/**
 * Componente de renderização no Frontend (HTML estático limpo)
 *
 * @param {Object} props            Propriedades do bloco.
 * @param {Object} props.attributes Atributos do bloco.
 * @return {JSX.Element} Elemento HTML salvo para o frontend.
 */
export default function save( { attributes } ) {
	const {
		headers = [],
		rows = [],
		isStriped = true,
		isHoverable = true,
		isBordered = true,
		headerTheme = 'table-dark',
	} = attributes;

	// Classes dinâmicas do Bootstrap 5 para a tag table
	const tableClasses = [
		'table',
		isStriped ? 'table-striped' : '',
		isHoverable ? 'table-hover' : '',
		isBordered ? 'table-bordered' : '',
		'align-middle',
	]
		.filter( Boolean )
		.join( ' ' );

	const headerThemeClasses =
		headerTheme !== 'default' ? headerTheme : undefined;

	const blockProps = useBlockProps.save( {
		className: 'table-responsive periodic-table-responsive-block',
	} );

	return (
		<div { ...blockProps }>
			<table className={ tableClasses }>
				{ headers.length > 0 && (
					<thead className={ headerThemeClasses }>
						<tr>
							{ headers.map( ( headerText, colIndex ) => (
								<th key={ `th-${ colIndex }` } scope="col">
									<RichText.Content value={ headerText } />
								</th>
							) ) }
						</tr>
					</thead>
				) }
				<tbody>
					{ rows.map( ( row, rowIndex ) => (
						<tr key={ `row-${ rowIndex }` }>
							{ row.map( ( cellText, colIndex ) => (
								<td key={ `cell-${ rowIndex }-${ colIndex }` }>
									<RichText.Content value={ cellText } />
								</td>
							) ) }
						</tr>
					) ) }
				</tbody>
			</table>
		</div>
	);
}
