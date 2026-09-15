import { useBlockProps } from '@wordpress/block-editor';

/**
 * Função save do bloco Gutenberg periodic/scroll-top.
 * Renderiza o botão flutuante acessível no HTML estático com atributos de dados para o view.js.
 */
export default function save( { attributes } ) {
	const {
		iconClass = 'fas fa-chevron-up',
		position = 'bottom-right',
		scrollOffset = 300,
		buttonShape = 'circle',
		bgColor = '#0d6efd',
		iconColor = '#ffffff',
		buttonSize = 48,
		offsetX = 24,
		offsetY = 24,
		zIndex = 9999,
		ariaLabel = 'Voltar ao topo',
	} = attributes;

	// Determinação do formato de borda
	const getBorderRadius = () => {
		if ( buttonShape === 'circle' ) {
			return '50%';
		}
		if ( buttonShape === 'rounded' ) {
			return '0.65rem';
		}
		return '0';
	};

	// Estilos computados inline para posicionamento fixo preciso e estilização
	const buttonStyles = {
		backgroundColor: bgColor,
		color: iconColor,
		width: `${ buttonSize }px`,
		height: `${ buttonSize }px`,
		fontSize: `${ Math.round( buttonSize * 0.42 ) }px`,
		borderRadius: getBorderRadius(),
		bottom: `${ offsetY }px`,
		...( position === 'bottom-right'
			? { right: `${ offsetX }px` }
			: { left: `${ offsetX }px` } ),
		zIndex,
	};

	const blockProps = useBlockProps.save( {
		className: `periodic-scroll-top-btn btn position-fixed d-flex align-items-center justify-content-center shadow periodic-pos-${ position } periodic-shape-${ buttonShape }`,
		style: buttonStyles,
		'data-scroll-offset': scrollOffset,
		'data-behavior': 'smooth',
		'aria-label': ariaLabel,
		type: 'button',
	} );

	return (
		<button { ...blockProps }>
			<i className={ `${ iconClass } fa-fw` } aria-hidden="true"></i>
		</button>
	);
}
