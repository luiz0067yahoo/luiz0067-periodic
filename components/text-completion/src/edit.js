/**
 * WordPress dependencies
 */
import { __ } from '@wordpress/i18n';
import { useBlockProps, InspectorControls, MediaUpload, MediaUploadCheck } from '@wordpress/block-editor';
import {
	PanelBody,
	ToggleControl,
	RangeControl,
	SelectControl,
	Button,
	TextareaControl,
	TextControl,
	Notice,
} from '@wordpress/components';
import { useMemo } from '@wordpress/element';

/**
 * Internal dependencies
 */
import { extractGaps } from './utils';

/**
 * Edit component for periodic-text-completion
 */
export default function Edit( { attributes, setAttributes } ) {
	const {
		title,
		instruction,
		rawText,
		audioUrl,
		audioId,
		caseSensitive,
		acceptTypos,
		ignoreAccents,
		attempts,
		themeColor,
		showWordBank,
	} = attributes;

	const blockProps = useBlockProps( {
		className: 'periodic-text-completion-editor-wrapper',
	} );

	// Parse detected gaps in real-time
	const detectedGaps = useMemo( () => extractGaps( rawText ), [ rawText ] );

	const onSelectAudio = ( media ) => {
		if ( media && media.url ) {
			setAttributes( {
				audioUrl: media.url,
				audioId: media.id || 0,
			} );
		}
	};

	const onRemoveAudio = () => {
		setAttributes( {
			audioUrl: '',
			audioId: 0,
		} );
	};

	// Render preview representation of rawText with badges
	const renderInteractivePreview = () => {
		if ( ! rawText ) return null;

		const paragraphs = rawText.split( /\n+/ ).filter( Boolean );
		const regex = /\*([^*]+)\*/g;

		return paragraphs.map( ( para, pIdx ) => {
			const parts = [];
			let lastIndex = 0;
			let match;

			regex.lastIndex = 0;
			while ( ( match = regex.exec( para ) ) !== null ) {
				if ( match.index > lastIndex ) {
					parts.push( para.substring( lastIndex, match.index ) );
				}

				let inner = match[ 1 ].trim();
				if ( inner.startsWith( '[' ) && inner.endsWith( ']' ) ) {
					inner = inner.slice( 1, -1 ).trim();
				}
				const options = inner.split( '|' ).map( ( s ) => s.trim() ).filter( Boolean );
				const displayWord = options.join( ' | ' );

				parts.push(
					<span
						key={ `gap-${ pIdx }-${ match.index }` }
						className="preview-gap-badge shadow-sm"
						title={ __( 'Lacuna editável para o aluno', 'periodic-text-completion' ) }
					>
						<i className="fa-solid fa-pen-to-square me-1" style={ { fontSize: '0.75rem' } }></i>
						<span className="gap-options">{ displayWord }</span>
					</span>
				);

				lastIndex = regex.lastIndex;
			}

			if ( lastIndex < para.length ) {
				parts.push( para.substring( lastIndex ) );
			}

			return (
				<p key={ `p-${ pIdx }` } className="mb-2" style={ { lineHeight: '2.2' } }>
					{ parts }
				</p>
			);
		} );
	};

	return (
		<>
			<InspectorControls>
				{ /* Validation rules */ }
				<PanelBody
					title={ __( 'Regras de Validação', 'periodic-text-completion' ) }
					initialOpen={ true }
				>
					<ToggleControl
						label={ __( 'Diferenciar Maiúsculas/Minúsculas', 'periodic-text-completion' ) }
						help={
							caseSensitive
								? __( 'Ativado: "Azul" e "azul" serão tratados como diferentes.', 'periodic-text-completion' )
								: __( 'Desativado: Ignora maiúsculas e minúsculas.', 'periodic-text-completion' )
						}
						checked={ caseSensitive }
						onChange={ ( val ) => setAttributes( { caseSensitive: val } ) }
					/>
					<ToggleControl
						label={ __( 'Tolerar Pequenos Erros de Digitação', 'periodic-text-completion' ) }
						help={
							acceptTypos
								? __( 'Aceita variação de 1 caractere em palavras com 4+ letras.', 'periodic-text-completion' )
								: __( 'Exige grafia exata.', 'periodic-text-completion' )
						}
						checked={ acceptTypos }
						onChange={ ( val ) => setAttributes( { acceptTypos: val } ) }
					/>
					<ToggleControl
						label={ __( 'Ignorar Acentos e Diacríticos', 'periodic-text-completion' ) }
						help={
							ignoreAccents
								? __( 'Considera "água" e "agua" equivalentes.', 'periodic-text-completion' )
								: __( 'Acentuação estrita necessária.', 'periodic-text-completion' )
						}
						checked={ ignoreAccents }
						onChange={ ( val ) => setAttributes( { ignoreAccents: val } ) }
					/>
					<RangeControl
						label={ __( 'Limite de Tentativas', 'periodic-text-completion' ) }
						help={
							attempts === 0
								? __( 'Tentativas ilimitadas.', 'periodic-text-completion' )
								: `${ attempts } ${ __( 'tentativa(s) permitida(s).', 'periodic-text-completion' ) }`
						}
						value={ attempts }
						onChange={ ( val ) => setAttributes( { attempts: val } ) }
						min={ 0 }
						max={ 10 }
						step={ 1 }
					/>
				</PanelBody>

				{ /* Audio & Dictation mode */ }
				<PanelBody
					title={ __( 'Áudio / Modo Ditado (MP3)', 'periodic-text-completion' ) }
					initialOpen={ true }
				>
					<p className="description" style={ { fontSize: '0.85rem', color: '#64748b' } }>
						{ __(
							'Adicione uma faixa de áudio MP3 para criar uma atividade de ditado e audição.',
							'periodic-text-completion'
						) }
					</p>
					{ audioUrl ? (
						<div className="mb-3">
							<audio controls src={ audioUrl } className="w-100 mb-2" />
							<div className="d-flex gap-2">
								<MediaUploadCheck>
									<MediaUpload
										onSelect={ onSelectAudio }
										allowedTypes={ [ 'audio' ] }
										value={ audioId }
										render={ ( { open } ) => (
											<Button
												variant="secondary"
												isSmall
												onClick={ open }
											>
												{ __( 'Substituir Áudio', 'periodic-text-completion' ) }
											</Button>
										) }
									/>
								</MediaUploadCheck>
								<Button
									isDestructive
									isSmall
									onClick={ onRemoveAudio }
								>
									{ __( 'Remover Áudio', 'periodic-text-completion' ) }
								</Button>
							</div>
						</div>
					) : (
						<MediaUploadCheck>
							<MediaUpload
								onSelect={ onSelectAudio }
								allowedTypes={ [ 'audio' ] }
								value={ audioId }
								render={ ( { open } ) => (
									<Button
										variant="primary"
										className="w-100 justify-content-center"
										onClick={ open }
									>
										<i className="fa-solid fa-file-audio me-2"></i>
										{ __( 'Selecionar Áudio MP3', 'periodic-text-completion' ) }
									</Button>
								) }
							/>
						</MediaUploadCheck>
					) }
				</PanelBody>

				{ /* Appearance & general settings */ }
				<PanelBody
					title={ __( 'Aparência e Opções', 'periodic-text-completion' ) }
					initialOpen={ false }
				>
					<SelectControl
						label={ __( 'Cor do Tema Bootstrap', 'periodic-text-completion' ) }
						value={ themeColor }
						options={ [
							{ label: 'Primary (Azul)', value: 'primary' },
							{ label: 'Success (Verde)', value: 'success' },
							{ label: 'Info (Ciano)', value: 'info' },
							{ label: 'Warning (Amarelo)', value: 'warning' },
							{ label: 'Danger (Vermelho)', value: 'danger' },
							{ label: 'Dark (Escuro)', value: 'dark' },
						] }
						onChange={ ( val ) => setAttributes( { themeColor: val } ) }
					/>
					<ToggleControl
						label={ __( 'Exibir Banco de Palavras', 'periodic-text-completion' ) }
						help={ __(
							'Exibe chips com todas as palavras corretas embaralhadas para apoiar os alunos.',
							'periodic-text-completion'
						) }
						checked={ showWordBank }
						onChange={ ( val ) => setAttributes( { showWordBank: val } ) }
					/>
				</PanelBody>
			</InspectorControls>

			<div { ...blockProps }>
				<div className="text-completion-editor-card">
					{ /* Header */ }
					<div className="text-completion-header">
						<div className="d-flex align-items-center justify-content-between mb-2">
							<div className="d-flex align-items-center gap-2">
								<span className={ `badge bg-${ themeColor }` }>
									<i className="fa-solid fa-spell-check me-1"></i>
									periodic Text Completion
								</span>
								{ audioUrl && (
									<span className="badge bg-danger-subtle text-danger border border-danger-subtle">
										<i className="fa-solid fa-headphones me-1"></i>
										{ __( 'Modo Ditado', 'periodic-text-completion' ) }
									</span>
								) }
							</div>
							<span className="badge bg-light text-secondary border">
								{ detectedGaps.length }{ ' ' }
								{ __( 'lacuna(s) detectada(s)', 'periodic-text-completion' ) }
							</span>
						</div>

						<TextControl
							label={ __( 'Título da Atividade', 'periodic-text-completion' ) }
							value={ title }
							onChange={ ( val ) => setAttributes( { title: val } ) }
							placeholder={ __( 'Ex: Complete as Lacunas', 'periodic-text-completion' ) }
							className="mb-2 fw-bold"
						/>

						<TextControl
							label={ __( 'Instrução para os Alunos', 'periodic-text-completion' ) }
							value={ instruction }
							onChange={ ( val ) => setAttributes( { instruction: val } ) }
							placeholder={ __( 'Ex: Preencha os espaços em branco...', 'periodic-text-completion' ) }
						/>
					</div>

					{ /* Body */ }
					<div className="p-4">
						{ /* Audio bar if configured */ }
						{ audioUrl && (
							<div className="audio-dictation-banner">
								<i className="fa-solid fa-volume-high fs-4 text-primary"></i>
								<div className="flex-grow-1">
									<div className="small fw-semibold text-primary mb-1">
										<i className="fa-solid fa-music me-1"></i>
										{ __( 'Áudio do Ditado Configurado', 'periodic-text-completion' ) }
									</div>
									<audio controls src={ audioUrl } className="w-100" />
								</div>
							</div>
						) }

						{ /* Raw Text Textarea */ }
						<div className="mb-3">
							<label className="form-label fw-semibold text-dark d-flex align-items-center justify-content-between">
								<span>
									<i className="fa-solid fa-file-pen me-2 text-primary"></i>
									{ __( 'Texto com Marcações de Lacunas', 'periodic-text-completion' ) }
								</span>
								<small className="text-muted fw-normal">
									{ __( 'Use *palavra* ou *[opcao1|opcao2]*', 'periodic-text-completion' ) }
								</small>
							</label>

							<TextareaControl
								value={ rawText }
								onChange={ ( val ) => setAttributes( { rawText: val } ) }
								rows={ 4 }
								className="editor-raw-textarea"
								placeholder={ __(
									'Ex: O céu é *azul* e o mar é *[salgado|amargo]*.',
									'periodic-text-completion'
								) }
							/>
						</div>

						{ /* Syntax guide tip */ }
						<div className="syntax-guide-alert mb-3">
							<i className="fa-solid fa-circle-info me-2"></i>
							<strong>{ __( 'Como marcar as lacunas:', 'periodic-text-completion' ) }</strong>
							<ul className="mb-0 mt-1 ps-3">
								<li>
									{ __( 'Lacuna simples:', 'periodic-text-completion' ) }{ ' ' }
									<code>*azul*</code> { __( '-> O aluno deve digitar "azul"', 'periodic-text-completion' ) }
								</li>
								<li>
									{ __( 'Múltiplas opções:', 'periodic-text-completion' ) }{ ' ' }
									<code>*[azul|anil]*</code> { __( '-> Aceita tanto "azul" quanto "anil"', 'periodic-text-completion' ) }
								</li>
							</ul>
						</div>

						{ /* Live interactive visual preview */ }
						<div className="live-preview-box">
							<div className="d-flex align-items-center justify-content-between mb-3 border-bottom pb-2">
								<span className="fw-semibold text-secondary small text-uppercase tracking-wider">
									<i className="fa-solid fa-eye me-1"></i>
									{ __( 'Pré-visualização do Exercício', 'periodic-text-completion' ) }
								</span>
								{ showWordBank && detectedGaps.length > 0 && (
									<span className="badge bg-secondary-subtle text-secondary">
										<i className="fa-solid fa-list-check me-1"></i>
										{ __( 'Banco de palavras ativo', 'periodic-text-completion' ) }
									</span>
								) }
							</div>

							{ detectedGaps.length === 0 ? (
								<Notice status="warning" isDismissible={ false }>
									{ __(
										'Nenhuma lacuna detectada ainda. Coloque asteriscos ao redor das palavras que deseja transformar em lacunas, por exemplo: *resposta*.',
										'periodic-text-completion'
									) }
								</Notice>
							) : (
								renderInteractivePreview()
							) }
						</div>
					</div>
				</div>
			</div>
		</>
	);
}
