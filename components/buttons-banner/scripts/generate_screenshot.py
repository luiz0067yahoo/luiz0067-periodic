# -*- coding: utf-8 -*-
"""
Gerador de Screenshot Oficial (1200x900px) para luiz0067 Buttons Banner
Gera a imagem para a página oficial do plugin no repositório do WordPress.
"""

import os
from PIL import Image, ImageDraw, ImageFont

WIDTH = 1200
HEIGHT = 900

# Criação da imagem base com fundo moderno e limpo
img = Image.new("RGBA", (WIDTH, HEIGHT), (245, 247, 250, 255))
draw = ImageDraw.Draw(img)

# 1. Cabeçalho / Barra Superior do Banner
# Gradiente de fundo sutil ou card elevado
draw.rectangle([0, 0, WIDTH, 130], fill=(255, 255, 255, 255))
draw.line([(0, 130), (WIDTH, 130)], fill=(226, 232, 240, 255), width=2)

# Tenta carregar fontes do sistema Windows (Segoe UI / Arial)
try:
    font_title = ImageFont.truetype("segoeui.ttf", 36)
    font_subtitle = ImageFont.truetype("segoeui.ttf", 18)
    font_badge = ImageFont.truetype("segoeuib.ttf", 13)
    font_card_desc = ImageFont.truetype("segoeuib.ttf", 19)
    font_card_sigla = ImageFont.truetype("segoeuib.ttf", 14)
    font_sec_title = ImageFont.truetype("segoeuib.ttf", 22)
    font_sec_sub = ImageFont.truetype("segoeui.ttf", 14)
except Exception:
    font_title = font_subtitle = font_badge = font_card_desc = font_card_sigla = font_sec_title = font_sec_sub = ImageFont.load_default()

# Ícone da Marca (Quadrado com gradiente verde/azul)
icon_x, icon_y = 50, 32
draw.rounded_rectangle([icon_x, icon_y, icon_x + 64, icon_y + 64], radius=14, fill=(1, 145, 58, 255))
# Detalhes dentro do ícone
draw.rectangle([icon_x + 12, icon_y + 16, icon_x + 52, icon_y + 24], fill=(255, 255, 255, 255))
draw.rectangle([icon_x + 12, icon_y + 28, icon_x + 36, icon_y + 34], fill=(255, 255, 255, 200))
draw.rectangle([icon_x + 12, icon_y + 40, icon_x + 52, icon_y + 48], fill=(35, 62, 149, 255))

# Título do Plugin
draw.text((130, 32), "luiz0067 Buttons Banner", fill=(15, 23, 42, 255), font=font_title)
draw.text((130, 78), "Bloco Gutenberg Customizado • Padrão Prefeitura • 1 a 5 Colunas Responsivas", fill=(100, 116, 139, 255), font=font_subtitle)

# Badges no canto superior direito
badges = [
    ("Gutenberg Native", (224, 231, 255, 255), (55, 48, 163, 255)),
    ("ES5 / Vanilla JS", (240, 253, 244, 255), (22, 101, 52, 255)),
    ("i18n Multi-idiomas", (254, 243, 199, 255), (146, 64, 14, 255)),
    ("v1.0.0", (241, 245, 249, 255), (71, 85, 105, 255)),
]
bx = WIDTH - 50
for text, bg_col, txt_col in reversed(badges):
    bbox = font_badge.getbbox(text)
    w = bbox[2] - bbox[0] + 20
    h = 30
    bx -= w
    draw.rounded_rectangle([bx, 50, bx + w, 50 + h], radius=15, fill=bg_col)
    draw.text((bx + 10, 56), text, fill=txt_col, font=font_badge)
    bx -= 10

# 2. Seção 1: Preview de Linha Completa com 5 Botões (Padrão Clássico Prefeitura)
draw.text((50, 160), "1. Exibição em Linha Completa (5 Botões - Padrão Prefeitura)", fill=(30, 41, 59, 255), font=font_sec_title)
draw.text((50, 192), "Cores em gradiente oficial (#01913a e #233e95), logos em alta nitidez, descrição rica e sigla em caixa alta", fill=(100, 116, 139, 255), font=font_sec_sub)

buttons_data = [
    {"sigla": "SAÚDE", "desc": "Consultas &\nAgendamentos", "color1": (1, 145, 58), "color2": (0, 112, 44), "icon": "cross"},
    {"sigla": "EDUCAÇÃO", "desc": "Matrículas &\nEscolas Municipais", "color1": (1, 145, 58), "color2": (35, 62, 149), "icon": "book"},
    {"sigla": "SERVIÇOS", "desc": "Atendimento ao\nCidadão Online", "color1": (35, 62, 149), "color2": (23, 42, 107), "icon": "gear"},
    {"sigla": "TRIBUTOS", "desc": "Emissão IPTU &\nCertidões Rápidas", "color1": (1, 145, 58), "color2": (35, 62, 149), "icon": "file"},
    {"sigla": "NOTÍCIAS", "desc": "Comunicados e\nDiário Oficial", "color1": (35, 62, 149), "color2": (15, 39, 68), "icon": "bell"}
]

card_w = 206
card_h = 136
start_x = 50
gap = 17
y_pos = 225

for i, b in enumerate(buttons_data):
    cx = start_x + i * (card_w + gap)
    cy = y_pos
    
    # Sombra sutil do card
    draw.rounded_rectangle([cx + 2, cy + 5, cx + card_w + 2, cy + card_h + 5], radius=10, fill=(0, 0, 0, 25))
    draw.rounded_rectangle([cx, cy + 2, cx + card_w, cy + card_h + 2], radius=10, fill=(0, 0, 0, 35))
    
    # Fundo em gradiente suave simulado
    draw.rounded_rectangle([cx, cy, cx + card_w, cy + card_h], radius=10, fill=b["color1"])
    # Faixa lateral esquerda de acento
    draw.rounded_rectangle([cx, cy, cx + 5, cy + card_h], radius=3, fill=(255, 255, 255, 180))
    
    # Ícone representativo (círculo branco com glifo)
    draw.ellipse([cx + 14, cy + 16, cx + 54, cy + 56], fill=(255, 255, 255, 45))
    draw.ellipse([cx + 18, cy + 20, cx + 50, cy + 52], fill=(255, 255, 255, 220))
    
    # Glifos simplificados de exemplo
    if b["icon"] == "cross":
        draw.rectangle([cx + 31, cy + 25, cx + 37, cy + 47], fill=b["color1"])
        draw.rectangle([cx + 23, cy + 33, cx + 45, cy + 39], fill=b["color1"])
    elif b["icon"] == "book":
        draw.rectangle([cx + 25, cy + 27, cx + 43, cy + 45], fill=b["color1"])
        draw.line([(cx + 34, cy + 27), (cx + 34, cy + 45)], fill=(255, 255, 255), width=2)
    elif b["icon"] == "gear":
        draw.ellipse([cx + 26, cy + 28, cx + 42, cy + 44], fill=b["color1"])
        draw.ellipse([cx + 31, cy + 33, cx + 37, cy + 39], fill=(255, 255, 255))
    elif b["icon"] == "file":
        draw.rectangle([cx + 27, cy + 26, cx + 41, cy + 46], fill=b["color1"])
        draw.line([(cx + 29, cy + 32), (cx + 39, cy + 32)], fill=(255, 255, 255), width=1)
        draw.line([(cx + 29, cy + 36), (cx + 39, cy + 36)], fill=(255, 255, 255), width=1)
    else:
        draw.ellipse([cx + 28, cy + 28, cx + 40, cy + 40], fill=b["color1"])
        draw.rectangle([cx + 27, cy + 38, cx + 41, cy + 43], fill=b["color1"])

    # Descrição do Card
    draw.text((cx + 62, cy + 16), b["desc"], fill=(255, 255, 255, 255), font=font_card_desc)
    
    # Barra de Sigla inferior (Branco / Alto contraste)
    sigla_box_y = cy + card_h - 38
    draw.rounded_rectangle([cx + 10, sigla_box_y, cx + card_w - 10, sigla_box_y + 26], radius=4, fill=(255, 255, 255, 240))
    s_bbox = font_card_sigla.getbbox(b["sigla"])
    s_w = s_bbox[2] - s_bbox[0]
    s_x = cx + 10 + ((card_w - 20) - s_w) // 2
    draw.text((s_x, sigla_box_y + 3), b["sigla"], fill=(26, 51, 101, 255), font=font_card_sigla)

# 3. Seção 2: Layout com 3 Botões em Destaque e Temas Especiais
draw.text((50, 400), "2. Variações de Temas Visuais & Colunas Flexíveis", fill=(30, 41, 59, 255), font=font_sec_title)
draw.text((50, 432), "Suporte a Verde Institucional, Azul Corporativo, Dark Mode e estilo Contorno (Outline)", fill=(100, 116, 139, 255), font=font_sec_sub)

themes_data = [
    {
        "title": "Verde Institucional",
        "sigla": "PORTAL DA TRANSPARÊNCIA",
        "desc": "Receitas, Despesas\ne Contratos Públicos",
        "bg": (1, 145, 58),
        "sigla_bg": (255, 255, 255),
        "sigla_txt": (1, 145, 58),
        "border": None
    },
    {
        "title": "Dark Mode Refinado",
        "sigla": "OUVIDORIA MUNICIPAL",
        "desc": "Envie sugestões,\nelogios e solicitações",
        "bg": (44, 62, 80),
        "sigla_bg": (52, 73, 94),
        "sigla_txt": (236, 240, 241),
        "border": None
    },
    {
        "title": "Estilo Outline",
        "sigla": "SERVIÇO SOCIAL",
        "desc": "Assistência às famílias\ne programas sociais",
        "bg": (255, 255, 255),
        "sigla_bg": (1, 145, 58),
        "sigla_txt": (255, 255, 255),
        "border": (1, 145, 58)
    }
]

card_w3 = 354
card_h3 = 142
y_pos3 = 465

for i, t in enumerate(themes_data):
    cx = start_x + i * (card_w3 + 19)
    cy = y_pos3
    
    draw.rounded_rectangle([cx + 2, cy + 4, cx + card_w3 + 2, cy + card_h3 + 4], radius=10, fill=(0, 0, 0, 20))
    if t["border"]:
        draw.rounded_rectangle([cx, cy, cx + card_w3, cy + card_h3], radius=10, fill=t["bg"], outline=t["border"], width=2)
    else:
        draw.rounded_rectangle([cx, cy, cx + card_w3, cy + card_h3], radius=10, fill=t["bg"])
        draw.rounded_rectangle([cx, cy, cx + 6, cy + card_h3], radius=3, fill=(1, 145, 58) if t["bg"] == (44, 62, 80) else (255, 255, 255, 200))
        
    # Ícone circular
    icon_bg = (1, 145, 58, 30) if t["border"] else (255, 255, 255, 45)
    draw.ellipse([cx + 18, cy + 18, cx + 64, cy + 64], fill=icon_bg)
    draw.ellipse([cx + 22, cy + 22, cx + 60, cy + 60], fill=(1, 145, 58) if t["border"] else (255, 255, 255, 230))
    
    desc_color = (15, 23, 42, 255) if t["border"] else (255, 255, 255, 255)
    draw.text((cx + 78, cy + 20), t["desc"], fill=desc_color, font=font_card_desc)
    
    sigla_y = cy + card_h3 - 42
    draw.rounded_rectangle([cx + 16, sigla_y, cx + card_w3 - 16, sigla_y + 28], radius=5, fill=t["sigla_bg"])
    sb = font_card_sigla.getbbox(t["sigla"])
    sw = sb[2] - sb[0]
    sx = cx + 16 + ((card_w3 - 32) - sw) // 2
    draw.text((sx, sigla_y + 4), t["sigla"], fill=t["sigla_txt"], font=font_card_sigla)

# 4. Seção 3: Painel de Recursos & Arquitetura Gutenberg (Rodapé informativo)
panel_y = 645
panel_h = 210
draw.rounded_rectangle([50, panel_y, WIDTH - 50, panel_y + panel_h], radius=12, fill=(255, 255, 255, 255), outline=(226, 232, 240, 255), width=2)

features = [
    ("Vanilla ES5 / Sem Build Step", "Compatível com qualquer instalação WordPress, sem dependência de Babel, Webpack ou Node.js em produção."),
    ("InspectorControls Completo", "Configuração de 1 a 5 colunas, alinhamento, links externos (_blank), cores personalizadas e upload de logos."),
    ("Internacionalização (i18n)", "Tradução completa em 4 idiomas: Português (pt_BR), Inglês (en_US), Espanhol (es_ES) e Italiano (it_IT)."),
    ("Retrocompatibilidade Total", "Suporte nativo ao namespace clássico cms-adm/buttons-banner sem perda de conteúdo legado.")
]

for idx, (ftitle, fdesc) in enumerate(features):
    fx = 75 + (idx % 2) * 550
    fy = panel_y + 24 + (idx // 2) * 88
    
    draw.ellipse([fx, fy + 4, fx + 14, fy + 18], fill=(1, 145, 58, 255))
    draw.text((fx + 26, fy), ftitle, fill=(15, 23, 42, 255), font=font_sec_title)
    draw.text((fx + 26, fy + 32), fdesc, fill=(100, 116, 139, 255), font=font_sec_sub)

# Salva a imagem screenshot.png na raiz do projeto
output_path = os.path.join(r"c:\Users\usuario\Documents\GitHub\luiz0067-buttons-banner", "screenshot.png")
img.save(output_path, format="PNG", optimize=True)
print(f"Screenshot gerada com sucesso em: {output_path} (Tamanho: {WIDTH}x{HEIGHT}px)")
