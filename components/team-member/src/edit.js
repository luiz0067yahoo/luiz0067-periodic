import { __ } from '@wordpress/i18n';
import {
	useBlockProps,
	InspectorControls,
	MediaUpload,
	MediaUploadCheck,
	RichText,
} from '@wordpress/block-editor';
import {
	PanelBody,
	TabPanel,
	Button,
	TextControl,
	TextareaControl,
	SelectControl,
	RangeControl,
	Card,
	CardBody,
	CardHeader,
	Flex,
	FlexItem,
	Notice,
} from '@wordpress/components';
import { useState } from '@wordpress/element';

/**
 * Opções padrão de redes sociais com ícones Font Awesome 6.
 */
const PRESET_SOCIAL_NETWORKS = [
	{ label: 'LinkedIn', iconClass: 'fa-brands fa-linkedin-in', defaultUrl: 'https://www.linkedin.com/' },
	{ label: 'GitHub', iconClass: 'fa-brands fa-github', defaultUrl: 'https://github.com/' },
	{ label: 'Twitter / X', iconClass: 'fa-brands fa-x-twitter', defaultUrl: 'https://x.com/' },
	{ label: 'Instagram', iconClass: 'fa-brands fa-instagram', defaultUrl: 'https://instagram.com/' },
	{ label: 'Website / Portfólio', iconClass: 'fa-solid fa-globe', defaultUrl: 'https://' },
	{ label: 'E-mail', iconClass: 'fa-solid fa-envelope', defaultUrl: 'mailto:' },
	{ label: 'WhatsApp', iconClass: 'fa-brands fa-whatsapp', defaultUrl: 'https://wa.me/' },
	{ label: 'YouTube', iconClass: 'fa-brands fa-youtube', defaultUrl: 'https://youtube.com/' },
];

export default function Edit( { attributes, setAttributes } ) {
	const { members = [], columns = 3, imageShape = 'rounded-circle', cardStyle = 'shadow-sm', alignment = 'center', imageSize = 140 } = attributes;
	const [ selectedMemberIndex, setSelectedMemberIndex ] = useState( 0 );

	const blockProps = useBlockProps( {
		className: 'periodic-team-members-block-editor',
	} );

	// Atualiza um membro específico
	const updateMember = ( index, field, value ) => {
		const newMembers = [ ...members ];
		newMembers[ index ] = {
			...newMembers[ index ],
			[ field ]: value,
		};
		setAttributes( { members: newMembers } );
	};

	// Adiciona um novo membro à lista
	const addMember = () => {
		const newMember = {
			id: Date.now(),
			photoUrl: '',
			photoId: 0,
			photoAlt: '',
			name: __( 'Novo Membro', 'periodic-team-member' ),
			role: __( 'Especialidade / Cargo', 'periodic-team-member' ),
			bio: __( 'Breve resumo biográfico destacando competências e histórico de atuação do profissional.', 'periodic-team-member' ),
			socialLinks: [
				{
					platform: 'LinkedIn',
					url: 'https://www.linkedin.com/',
					iconClass: 'fa-brands fa-linkedin-in',
				},
				{
					platform: 'GitHub',
					url: 'https://github.com/',
					iconClass: 'fa-brands fa-github',
				},
				{
					platform: 'E-mail',
					url: 'mailto:contato@exemplo.com',
					iconClass: 'fa-solid fa-envelope',
				},
			],
		};
		const updated = [ ...members, newMember ];
		setAttributes( { members: updated } );
		setSelectedMemberIndex( updated.length - 1 );
	};

	// Remove um membro da lista
	const removeMember = ( indexToRemove ) => {
		const updated = members.filter( ( _, idx ) => idx !== indexToRemove );
		setAttributes( { members: updated } );
		if ( selectedMemberIndex >= updated.length ) {
			setSelectedMemberIndex( Math.max( 0, updated.length - 1 ) );
		}
	};

	// Move membro para cima/baixo
	const moveMember = ( fromIndex, toIndex ) => {
		if ( toIndex < 0 || toIndex >= members.length ) return;
		const updated = [ ...members ];
		const [ movedItem ] = updated.splice( fromIndex, 1 );
		updated.splice( toIndex, 0, movedItem );
		setAttributes( { members: updated } );
		setSelectedMemberIndex( toIndex );
	};

	// Gerenciamento de redes sociais para o membro selecionado
	const addSocialLink = ( memberIndex, preset ) => {
		const member = members[ memberIndex ];
		const links = member.socialLinks ? [ ...member.socialLinks ] : [];
		links.push( {
			platform: preset.label,
			url: preset.defaultUrl,
			iconClass: preset.iconClass,
		} );
		updateMember( memberIndex, 'socialLinks', links );
	};

	const updateSocialLink = ( memberIndex, linkIndex, field, value ) => {
		const member = members[ memberIndex ];
		const links = [ ...member.socialLinks ];
		links[ linkIndex ] = {
			...links[ linkIndex ],
			[ field ]: value,
		};
		updateMember( memberIndex, 'socialLinks', links );
	};

	const removeSocialLink = ( memberIndex, linkIndex ) => {
		const member = members[ memberIndex ];
		const links = member.socialLinks.filter( ( _, idx ) => idx !== linkIndex );
		updateMember( memberIndex, 'socialLinks', links );
	};

	// Classes do grid Bootstrap
	const getColumnClass = () => {
		switch ( columns ) {
			case 1:
				return 'col-12';
			case 2:
				return 'col-12 col-md-6';
			case 4:
				return 'col-12 col-md-6 col-lg-3';
			case 3:
			default:
				return 'col-12 col-md-6 col-lg-4';
		}
	};

	// Classes de estilo do cartão
	const getCardClass = () => {
		let styleClass = 'shadow-sm border-0';
		if ( cardStyle === 'border' ) {
			styleClass = 'border';
		} else if ( cardStyle === 'flat' ) {
			styleClass = 'border-0 bg-transparent';
		}
		return `card h-100 text-${ alignment } ${ styleClass } periodic-member-card`;
	};

	const currentActiveMember = members[ selectedMemberIndex ] || members[ 0 ];

	return (
		<>
			<InspectorControls>
				<TabPanel
					className="periodic-inspector-tabs"
					activeClass="is-active"
					tabs={ [
						{
							name: 'members',
							title: __( 'Membros', 'periodic-team-member' ),
							className: 'tab-members',
						},
						{
							name: 'social',
							title: __( 'Redes Sociais', 'periodic-team-member' ),
							className: 'tab-social',
						},
						{
							name: 'style',
							title: __( 'Estilo da Foto e Cartão', 'periodic-team-member' ),
							className: 'tab-style',
						},
					] }
				>
					{ ( tab ) => {
						if ( tab.name === 'members' ) {
							return (
								<PanelBody title={ __( 'Gerenciar Membros da Equipe', 'periodic-team-member' ) } initialOpen={ true }>
									<p className="description">
										{ __( 'Adicione os membros, defina fotos de perfil e preencha os dados institucionais.', 'periodic-team-member' ) }
									</p>

									{ members.map( ( member, idx ) => (
										<Card key={ member.id || idx } className="mb-3 periodic-panel-member-card">
											<CardHeader>
												<Flex justify="space-between" align="center">
													<FlexItem>
														<strong>
															{ idx + 1 }. { member.name || __( '(Sem Nome)', 'periodic-team-member' ) }
														</strong>
													</FlexItem>
													<FlexItem>
														<Button
															isSmall
															icon="arrow-up"
															disabled={ idx === 0 }
															onClick={ () => moveMember( idx, idx - 1 ) }
															label={ __( 'Mover para cima', 'periodic-team-member' ) }
														/>
														<Button
															isSmall
															icon="arrow-down"
															disabled={ idx === members.length - 1 }
															onClick={ () => moveMember( idx, idx + 1 ) }
															label={ __( 'Mover para baixo', 'periodic-team-member' ) }
														/>
														<Button
															isSmall
															isDestructive
															icon="trash"
															onClick={ () => removeMember( idx ) }
															label={ __( 'Remover membro', 'periodic-team-member' ) }
														/>
													</FlexItem>
												</Flex>
											</CardHeader>
											<CardBody>
												{ /* Upload de Foto */ }
												<div className="periodic-media-upload-wrapper mb-3">
													<MediaUploadCheck>
														<MediaUpload
															onSelect={ ( media ) => {
																updateMember( idx, 'photoUrl', media.url );
																updateMember( idx, 'photoId', media.id );
																updateMember( idx, 'photoAlt', media.alt || member.name );
															} }
															allowedTypes={ [ 'image' ] }
															value={ member.photoId }
															render={ ( { open } ) => (
																<div className="d-flex align-items-center gap-3">
																	{ member.photoUrl ? (
																		<img
																			src={ member.photoUrl }
																			alt={ member.photoAlt || member.name }
																			className="periodic-preview-thumb rounded-circle"
																			style={ { width: '56px', height: '56px', objectFit: 'cover' } }
																		/>
																	) : (
																		<div className="periodic-preview-thumb-placeholder rounded-circle d-flex align-items-center justify-content-center bg-light text-secondary" style={ { width: '56px', height: '56px' } }>
																			<i className="fa-solid fa-user"></i>
																		</div>
																	)}
																	<div>
																		<Button isSecondary isSmall onClick={ open } className="me-2">
																			{ member.photoUrl ? __( 'Trocar Foto', 'periodic-team-member' ) : __( 'Enviar Foto', 'periodic-team-member' ) }
																		</Button>
																		{ member.photoUrl && (
																			<Button
																				isDestructive
																				isLink
																				isSmall
																				onClick={ () => {
																					updateMember( idx, 'photoUrl', '' );
																					updateMember( idx, 'photoId', 0 );
																				} }
																			>
																				{ __( 'Remover', 'periodic-team-member' ) }
																			</Button>
																		) }
																	</div>
																</div>
															) }
														/>
													</MediaUploadCheck>
												</div>

												<TextControl
													label={ __( 'Nome Completo', 'periodic-team-member' ) }
													value={ member.name || '' }
													onChange={ ( val ) => updateMember( idx, 'name', val ) }
													placeholder={ __( 'Ex: Prof. Dr. Silva', 'periodic-team-member' ) }
												/>

												<TextControl
													label={ __( 'Especialidade / Cargo', 'periodic-team-member' ) }
													value={ member.role || '' }
													onChange={ ( val ) => updateMember( idx, 'role', val ) }
													placeholder={ __( 'Ex: Engenheiro de Software Sênior', 'periodic-team-member' ) }
												/>

												<TextareaControl
													label={ __( 'Resumo Biográfico', 'periodic-team-member' ) }
													value={ member.bio || '' }
													onChange={ ( val ) => updateMember( idx, 'bio', val ) }
													rows={ 3 }
													placeholder={ __( 'Destaque a formação, conquistas ou histórico de carreira...', 'periodic-team-member' ) }
												/>
											</CardBody>
										</Card>
									) ) }

									<Button isPrimary className="w-100 mt-2" icon="plus" onClick={ addMember }>
										{ __( 'Adicionar Novo Membro', 'periodic-team-member' ) }
									</Button>
								</PanelBody>
							);
						}

						if ( tab.name === 'social' ) {
							return (
								<PanelBody title={ __( 'Links de Redes Sociais', 'periodic-team-member' ) } initialOpen={ true }>
									{ members.length === 0 ? (
										<Notice status="warning" isDismissible={ false }>
											{ __( 'Adicione membros na aba "Membros" antes de configurar redes sociais.', 'periodic-team-member' ) }
										</Notice>
									) : (
										<>
											<SelectControl
												label={ __( 'Selecionar Membro para Configurar Redes', 'periodic-team-member' ) }
												value={ selectedMemberIndex }
												options={ members.map( ( m, index ) => ( {
													label: `${ index + 1 }. ${ m.name || __( 'Sem nome', 'periodic-team-member' ) }`,
													value: index,
												} ) ) }
												onChange={ ( val ) => setSelectedMemberIndex( parseInt( val, 10 ) ) }
											/>

											{ currentActiveMember && (
												<div className="periodic-active-member-socials mt-3">
													<h4 className="mb-2">
														{ __( 'Redes de:', 'periodic-team-member' ) } <strong>{ currentActiveMember.name }</strong>
													</h4>

													<div className="periodic-social-links-list">
														{ ( currentActiveMember.socialLinks || [] ).map( ( link, linkIdx ) => (
															<div key={ linkIdx } className="periodic-social-link-item p-2 mb-2 border rounded bg-white">
																<Flex justify="space-between" align="center" className="mb-2">
																	<FlexItem>
																		<i className={ `${ link.iconClass } me-2 text-primary` }></i>
																		<strong>{ link.platform || __( 'Rede Social', 'periodic-team-member' ) }</strong>
																	</FlexItem>
																	<FlexItem>
																		<Button
																			isDestructive
																			isSmall
																			icon="trash"
																			onClick={ () => removeSocialLink( selectedMemberIndex, linkIdx ) }
																			label={ __( 'Excluir link', 'periodic-team-member' ) }
																		/>
																	</FlexItem>
																</Flex>

																<TextControl
																	label={ __( 'URL / Link de Perfil', 'periodic-team-member' ) }
																	value={ link.url }
																	onChange={ ( val ) => updateSocialLink( selectedMemberIndex, linkIdx, 'url', val ) }
																	placeholder="https://..."
																/>

																<TextControl
																	label={ __( 'Classe do Ícone Font Awesome', 'periodic-team-member' ) }
																	value={ link.iconClass }
																	onChange={ ( val ) => updateSocialLink( selectedMemberIndex, linkIdx, 'iconClass', val ) }
																	help={ __( 'Exemplo: fa-brands fa-linkedin-in, fa-brands fa-github', 'periodic-team-member' ) }
																/>
															</div>
														) ) }
													</div>

													<div className="periodic-add-social-preset mt-3">
														<p className="description mb-2">
															<strong>{ __( 'Adicionar Rede Rápida:', 'periodic-team-member' ) }</strong>
														</p>
														<div className="d-flex flex-wrap gap-1">
															{ PRESET_SOCIAL_NETWORKS.map( ( preset, pIdx ) => (
																<Button
																	key={ pIdx }
																	isSecondary
																	isSmall
																	onClick={ () => addSocialLink( selectedMemberIndex, preset ) }
																>
																	<i className={ `${ preset.iconClass } me-1` }></i> { preset.label }
																</Button>
															) ) }
														</div>
													</div>
												</div>
											)}
										</>
									) }
								</PanelBody>
							);
						}

						if ( tab.name === 'style' ) {
							return (
								<PanelBody title={ __( 'Estilo da Foto e Cartão', 'periodic-team-member' ) } initialOpen={ true }>
									<RangeControl
										label={ __( 'Número de Colunas (Grid)', 'periodic-team-member' ) }
										value={ columns }
										onChange={ ( val ) => setAttributes( { columns: val } ) }
										min={ 1 }
										max={ 4 }
										help={ __( 'Escolha de 1 a 4 colunas para a exibição dos membros em telas grandes.', 'periodic-team-member' ) }
									/>

									<SelectControl
										label={ __( 'Formato da Foto', 'periodic-team-member' ) }
										value={ imageShape }
										options={ [
											{ label: __( 'Circular (rounded-circle)', 'periodic-team-member' ), value: 'rounded-circle' },
											{ label: __( 'Cantos Arredondados (rounded)', 'periodic-team-member' ), value: 'rounded' },
											{ label: __( 'Moldura com Borda (img-thumbnail)', 'periodic-team-member' ), value: 'img-thumbnail' },
										] }
										onChange={ ( val ) => setAttributes( { imageShape: val } ) }
									/>

									<RangeControl
										label={ __( 'Tamanho da Foto (px)', 'periodic-team-member' ) }
										value={ imageSize }
										onChange={ ( val ) => setAttributes( { imageSize: val } ) }
										min={ 80 }
										max={ 260 }
										step={ 10 }
										help={ __( 'Diâmetro ou largura da foto em pixels.', 'periodic-team-member' ) }
									/>

									<SelectControl
										label={ __( 'Estilo de Cartão (Bootstrap 5)', 'periodic-team-member' ) }
										value={ cardStyle }
										options={ [
											{ label: __( 'Sombra Suave (shadow-sm)', 'periodic-team-member' ), value: 'shadow-sm' },
											{ label: __( 'Borda Delicada (border)', 'periodic-team-member' ), value: 'border' },
											{ label: __( 'Plano / Sem Borda (flat)', 'periodic-team-member' ), value: 'flat' },
										] }
										onChange={ ( val ) => setAttributes( { cardStyle: val } ) }
									/>

									<SelectControl
										label={ __( 'Alinhamento do Conteúdo', 'periodic-team-member' ) }
										value={ alignment }
										options={ [
											{ label: __( 'Centralizado', 'periodic-team-member' ), value: 'center' },
											{ label: __( 'Alinhado à Esquerda', 'periodic-team-member' ), value: 'start' },
										] }
										onChange={ ( val ) => setAttributes( { alignment: val } ) }
									/>
								</PanelBody>
							);
						}

						return null;
					} }
				</TabPanel>
			</InspectorControls>

			<div { ...blockProps }>
				<div className="periodic-team-member-container container-fluid p-0">
					{ members.length === 0 ? (
						<div className="text-center p-5 border border-dashed rounded bg-light">
							<i className="fa-solid fa-users fa-3x text-muted mb-3"></i>
							<h5>{ __( 'Nenhum membro configurado', 'periodic-team-member' ) }</h5>
							<p className="text-secondary">{ __( 'Clique no botão abaixo para adicionar o primeiro membro de equipe.', 'periodic-team-member' ) }</p>
							<Button isPrimary icon="plus" onClick={ addMember }>
								{ __( 'Adicionar Membro', 'periodic-team-member' ) }
							</Button>
						</div>
					) : (
						<div className="row g-4">
							{ members.map( ( member, idx ) => (
								<div key={ member.id || idx } className={ getColumnClass() }>
									<div className={ getCardClass() }>
										<div className="card-body p-4 d-flex flex-column">
											{ /* Foto com upload direto WYSIWYG */ }
											<div className="periodic-member-photo-container mb-3 text-center">
												<MediaUploadCheck>
													<MediaUpload
														onSelect={ ( media ) => {
															updateMember( idx, 'photoUrl', media.url );
															updateMember( idx, 'photoId', media.id );
															updateMember( idx, 'photoAlt', media.alt || member.name );
														} }
														allowedTypes={ [ 'image' ] }
														value={ member.photoId }
														render={ ( { open } ) => (
															<div
																className="periodic-avatar-wrapper position-relative d-inline-block cursor-pointer"
																onClick={ open }
																role="button"
																tabIndex={ 0 }
																onKeyDown={ ( e ) => { if ( e.key === 'Enter' ) open(); } }
																title={ __( 'Clique para alterar a foto', 'periodic-team-member' ) }
															>
																{ member.photoUrl ? (
																	<img
																		src={ member.photoUrl }
																		alt={ member.photoAlt || member.name }
																		className={ `periodic-member-photo ${ imageShape }` }
																		style={ {
																			width: `${ imageSize }px`,
																			height: `${ imageSize }px`,
																			objectFit: 'cover',
																		} }
																	/>
																) : (
																	<div
																		className={ `periodic-member-photo-placeholder ${ imageShape } d-flex align-items-center justify-content-center bg-light text-secondary border` }
																		style={ {
																			width: `${ imageSize }px`,
																			height: `${ imageSize }px`,
																		} }
																	>
																		<i className="fa-solid fa-camera fa-2x"></i>
																	</div>
																)}
																<span className="periodic-avatar-badge position-absolute bottom-0 end-0 bg-primary text-white rounded-circle p-1 shadow-sm">
																	<i className="fa-solid fa-pen fa-xs"></i>
																</span>
															</div>
														) }
													/>
												</MediaUploadCheck>
											</div>

											{ /* Nome editável via RichText */ }
											<RichText
												tagName="h5"
												className="card-title fw-bold text-dark mb-1"
												value={ member.name }
												onChange={ ( val ) => updateMember( idx, 'name', val ) }
												placeholder={ __( 'Nome do Membro', 'periodic-team-member' ) }
											/>

											{ /* Cargo/Especialidade */ }
											<RichText
												tagName="h6"
												className="card-subtitle mb-3 text-primary fw-semibold"
												value={ member.role }
												onChange={ ( val ) => updateMember( idx, 'role', val ) }
												placeholder={ __( 'Especialidade / Cargo', 'periodic-team-member' ) }
											/>

											{ /* Resumo Biográfico */ }
											<RichText
												tagName="p"
												className="card-text text-secondary mb-4 flex-grow-1"
												value={ member.bio }
												onChange={ ( val ) => updateMember( idx, 'bio', val ) }
												placeholder={ __( 'Biografia do membro...', 'periodic-team-member' ) }
											/>

											{ /* Links de Redes Sociais */ }
											<div className="periodic-social-links d-flex justify-content-center flex-wrap gap-2 pt-2 border-top">
												{ member.socialLinks && member.socialLinks.length > 0 ? (
													member.socialLinks.map( ( social, sIdx ) => (
														<a
															key={ sIdx }
															href={ social.url || '#' }
															onClick={ ( e ) => e.preventDefault() }
															className="btn btn-sm btn-outline-secondary rounded-circle periodic-social-btn"
															title={ social.platform || 'Social' }
														>
															<i className={ social.iconClass || 'fa-solid fa-link' }></i>
														</a>
													) )
												) : (
													<small className="text-muted fst-italic">
														{ __( 'Nenhuma rede social configurada', 'periodic-team-member' ) }
													</small>
												) }
											</div>

											{ /* Barra de ações rápidas no card para o editor */ }
											<div className="periodic-card-editor-actions mt-3 pt-2 text-center border-top">
												<Button
													isSmall
													isSecondary
													className="me-1"
													onClick={ () => {
														setSelectedMemberIndex( idx );
													} }
												>
													<i className="fa-solid fa-sliders me-1"></i> { __( 'Editar no Painel', 'periodic-team-member' ) }
												</Button>
												<Button
													isSmall
													isDestructive
													icon="trash"
													onClick={ () => removeMember( idx ) }
													label={ __( 'Remover', 'periodic-team-member' ) }
												/>
											</div>
										</div>
									</div>
								</div>
							) ) }
						</div>
					) }

					{ members.length > 0 && (
						<div className="text-center mt-4">
							<Button isSecondary icon="plus" onClick={ addMember }>
								{ __( 'Adicionar Outro Membro', 'periodic-team-member' ) }
							</Button>
						</div>
					) }
				</div>
			</div>
		</>
	);
}
