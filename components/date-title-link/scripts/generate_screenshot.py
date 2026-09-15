#!/usr/bin/env python3
"""
generate_screenshot.py
Gera as imagens de divulgação oficiais screenshot-1.png e screenshot.png
no tamanho oficial de 1200x900px, com layout institucional premium de alta definição.
"""

import os
from PIL import Image, ImageDraw, ImageFont

WIDTH = 1200
HEIGHT = 900

BASE_DIR = os.path.dirname(os.path.dirname(os.path.abspath(__file__)))

# Cria imagem com fundo neutro moderno
img = Image.new("RGBA", (WIDTH, HEIGHT), (248, 250, 252, 255))
draw = ImageDraw.Draw(img)

# Seleção de fontes disponíveis no sistema Windows
font_family = "segoeui.ttf"
font_family_bold = "segoeuib.ttf"
font_family_semib = "segoeuisl.ttf"

def get_font(name, size):
    try:
        return ImageFont.truetype(name, size)
    except IOError:
        try:
            return ImageFont.truetype("arial.ttf", size)
        except IOError:
            return ImageFont.load_default()

font_header_tag = get_font("segoeuib.ttf", 13)
font_title = get_font("segoeuib.ttf", 26)
font_subtitle = get_font("segoeui.ttf", 14)
font_badge = get_font("segoeuib.ttf", 11)

font_sec_title = get_font("segoeuib.ttf", 17)
font_sec_sub = get_font("segoeui.ttf", 12)

font_item_date = get_font("segoeuib.ttf", 12)
font_item_title = get_font("segoeuib.ttf", 15)
font_item_url = get_font("segoeui.ttf", 11)

font_panel_title = get_font("segoeuib.ttf", 13)
font_panel_label = get_font("segoeuib.ttf", 12)
font_panel_val = get_font("segoeui.ttf", 12)
font_panel_help = get_font("segoeui.ttf", 10)

font_card_head = get_font("segoeuib.ttf", 13)
font_card_desc = get_font("segoeui.ttf", 11)

# ==========================================
# 1. CABEÇALHO HERO (0 a 130px)
# ==========================================
draw.rectangle([0, 0, WIDTH, 128], fill=(255, 255, 255, 255))
draw.line([(0, 128), (WIDTH, 128)], fill=(226, 232, 240, 255), width=1)

# Faixa de acento verde institucional no topo
draw.rectangle([0, 0, WIDTH, 5], fill=(1, 145, 58, 255))

# Tag superior
draw.rounded_rectangle([50, 22, 175, 42], radius=4, fill=(230, 244, 234, 255))
draw.text((62, 25), "WORDPRESS GUTENBERG", fill=(1, 145, 58, 255), font=font_header_tag)

# Título do Bloco
draw.text((50, 48), "Date Title Link", fill=(15, 23, 42, 255), font=font_title)
draw.text((255, 54), "— Bloco de Editais, Notícias e Publicações Oficiais", fill=(100, 116, 139, 255), font=font_subtitle)
draw.text((50, 88), "Padrão arquitetural customADM / luiz0067 • Sem build step (Vanilla ES5) • Suporte a 4 idiomas", fill=(71, 85, 105, 255), font=font_subtitle)

# Badges no canto superior direito
badges = [
    ("Vanilla ES5", (241, 245, 249, 255), (30, 41, 59, 255)),
    ("Gutenberg 6.0+", (241, 245, 249, 255), (30, 41, 59, 255)),
    ("PT • EN • ES • IT", (230, 244, 234, 255), (0, 104, 40, 255)),
    ("custom-adm", (239, 246, 255, 255), (30, 64, 175, 255))
]

bx = WIDTH - 50
for text, bg_col, txt_col in reversed(badges):
    bbox = font_badge.getbbox(text)
    w = bbox[2] - bbox[0] + 20
    h = 28
    bx -= w
    draw.rounded_rectangle([bx, 48, bx + w, 48 + h], radius=14, fill=bg_col)
    draw.text((bx + 10, 54), text, fill=txt_col, font=font_badge)
    bx -= 8

# ==========================================
# 2. SEÇÃO ESQUERDA: LISTAGEM VISUAL (FRONTEND)
# ==========================================
draw.text((50, 150), "1. Exibição Frontend Semântica & Responsiva", fill=(30, 41, 59, 255), font=font_sec_title)
draw.text((50, 175), "Apresentação estruturada com tag <time>, microinterações fluidas e suporte a links externos", fill=(100, 116, 139, 255), font=font_sec_sub)

items_data = [
    {
        "date": "11/09/2026",
        "title": "Edital de Concurso Público Nº 04/2026 - Convocação para Provas Objetivas",
        "url": "https://prefeitura.sp.gov.br/concursos/edital-04-2026",
        "targetBlank": True
    },
    {
        "date": "08/09/2026",
        "title": "Decreto Municipal Nº 62.145 - Regulamentação do Programa de Mobilidade Verde",
        "url": "https://prefeitura.sp.gov.br/legislacao/decreto-62145",
        "targetBlank": False
    },
    {
        "date": "01/09/2026",
        "title": "Chamamento Público Nº 18/2026 - Seleção de Projetos Culturais e Artísticos",
        "url": "https://prefeitura.sp.gov.br/cultura/chamamento-18",
        "targetBlank": True
    },
    {
        "date": "28/08/2026",
        "title": "Relatório de Gestão Fiscal e Execução Orçamentária - 2º Quadrimestre de 2026",
        "url": "https://prefeitura.sp.gov.br/transparencia/rgf-2026-q2",
        "targetBlank": True
    }
]

item_x = 50
item_w = 690
item_h = 76
start_y = 205
gap_y = 14

for i, item in enumerate(items_data):
    iy = start_y + i * (item_h + gap_y)

    # Sombra do card
    draw.rounded_rectangle([item_x + 1, iy + 2, item_x + item_w + 1, iy + item_h + 2], radius=8, fill=(0, 0, 0, 10))
    # Card de fundo
    draw.rounded_rectangle([item_x, iy, item_x + item_w, iy + item_h], radius=8, fill=(255, 255, 255, 255), outline=(226, 232, 240, 255), width=1)
    # Borda esquerda verde institucional
    draw.rounded_rectangle([item_x, iy, item_x + 4, iy + item_h], radius=2, fill=(1, 145, 58, 255))

    # Badge de data (<time>)
    badge_w = 95
    badge_h = 24
    draw.rounded_rectangle([item_x + 18, iy + 14, item_x + 18 + badge_w, iy + 14 + badge_h], radius=4, fill=(230, 244, 234, 255), outline=(183, 225, 205, 255), width=1)
    draw.text((item_x + 28, iy + 18), item["date"], fill=(0, 104, 40, 255), font=font_item_date)

    # Título do Item
    draw.text((item_x + 125, iy + 16), item["title"], fill=(15, 23, 42, 255), font=font_item_title)

    # URL / Meta
    draw.text((item_x + 125, iy + 44), item["url"], fill=(100, 116, 139, 255), font=font_item_url)
    if item["targetBlank"]:
        tb_box_x = item_x + 125 + int(font_item_url.getlength(item["url"])) + 8
        draw.rounded_rectangle([tb_box_x, iy + 43, tb_box_x + 45, iy + 58], radius=3, fill=(239, 246, 255, 255))
        draw.text((tb_box_x + 5, iy + 45), "_blank", fill=(30, 64, 175, 255), font=font_panel_help)

    # Círculo com ícone de ação na direita
    icon_cx = item_x + item_w - 42
    icon_cy = iy + item_h // 2
    draw.ellipse([icon_cx - 15, icon_cy - 15, icon_cx + 15, icon_cy + 15], fill=(241, 245, 249, 255))

    # Seta
    if item["targetBlank"]:
        # Ícone de link externo
        draw.rectangle([icon_cx - 6, icon_cy - 2, icon_cx + 2, icon_cy + 6], outline=(100, 116, 139, 255), width=1)
        draw.line([(icon_cx, icon_cy - 4), (icon_cx + 6, icon_cy - 4)], fill=(100, 116, 139, 255), width=2)
        draw.line([(icon_cx + 6, icon_cy - 4), (icon_cx + 6, icon_cy + 2)], fill=(100, 116, 139, 255), width=2)
        draw.line([(icon_cx - 1, icon_cy + 1), (icon_cx + 6, icon_cy - 4)], fill=(100, 116, 139, 255), width=2)
    else:
        # Seta direita
        draw.line([(icon_cx - 5, icon_cy), (icon_cx + 4, icon_cy)], fill=(100, 116, 139, 255), width=2)
        draw.line([(icon_cx + 1, icon_cy - 4), (icon_cx + 5, icon_cy)], fill=(100, 116, 139, 255), width=2)
        draw.line([(icon_cx + 1, icon_cy + 4), (icon_cx + 5, icon_cy)], fill=(100, 116, 139, 255), width=2)


# ==========================================
# 3. SEÇÃO DIREITA: INSPECTOR CONTROLS DO GUTENBERG
# ==========================================
panel_x = 765
panel_w = 385
panel_h = 350
panel_y = 205

# Moldura do Painel Lateral Gutenberg
draw.rounded_rectangle([panel_x, panel_y, panel_x + panel_w, panel_y + panel_h], radius=8, fill=(255, 255, 255, 255), outline=(226, 232, 240, 255), width=1)

# Cabeçalho do Painel Lateral
draw.rectangle([panel_x, panel_y, panel_x + panel_w, panel_y + 44], fill=(248, 250, 252, 255))
draw.line([(panel_x, panel_y + 44), (panel_x + panel_w, panel_y + 44)], fill=(226, 232, 240, 255), width=1)
draw.text((panel_x + 16, panel_y + 14), "Configurações do Bloco (Inspector)", fill=(15, 23, 42, 255), font=font_panel_title)

# Linha colapsável: Configurações do Link
draw.text((panel_x + 16, panel_y + 60), "CONFIGURAÇÕES DO LINK E PUBLICAÇÃO", fill=(100, 116, 139, 255), font=font_panel_help)

# Campo 1: URL de Redirecionamento
draw.text((panel_x + 16, panel_y + 82), "URL de Redirecionamento", fill=(30, 41, 59, 255), font=font_panel_label)
draw.rounded_rectangle([panel_x + 16, panel_y + 102, panel_x + panel_w - 16, panel_y + 134], radius=4, fill=(255, 255, 255, 255), outline=(1, 145, 58, 255), width=1)
draw.text((panel_x + 24, panel_y + 110), "https://prefeitura.sp.gov.br/concursos/...", fill=(15, 23, 42, 255), font=font_panel_val)
draw.text((panel_x + 16, panel_y + 140), "Endereço para onde o usuário será direcionado.", fill=(100, 116, 139, 255), font=font_panel_help)

# Campo 2: Toggle Abrir em Nova Aba
draw.text((panel_x + 16, panel_y + 166), "Abrir link em nova aba (_blank)", fill=(30, 41, 59, 255), font=font_panel_label)
# Chave toggle ativada (verde)
toggle_x = panel_x + panel_w - 56
toggle_y = panel_y + 166
draw.rounded_rectangle([toggle_x, toggle_y, toggle_x + 36, toggle_y + 18], radius=9, fill=(1, 145, 58, 255))
draw.ellipse([toggle_x + 18, toggle_y + 1, toggle_x + 34, toggle_y + 17], fill=(255, 255, 255, 255))
draw.text((panel_x + 16, panel_y + 188), "O link será aberto em uma nova guia do navegador.", fill=(100, 116, 139, 255), font=font_panel_help)

# Linha divisória
draw.line([(panel_x + 16, panel_y + 214), (panel_x + panel_w - 16, panel_y + 214)], fill=(241, 245, 249, 255), width=1)

# Campo 3: Data do Item
draw.text((panel_x + 16, panel_y + 228), "Data da Publicação / Evento", fill=(30, 41, 59, 255), font=font_panel_label)
draw.rounded_rectangle([panel_x + 16, panel_y + 248, panel_x + panel_w - 16, panel_y + 280], radius=4, fill=(255, 255, 255, 255), outline=(203, 213, 225, 255), width=1)
draw.text((panel_x + 24, panel_y + 256), "11/09/2026", fill=(15, 23, 42, 255), font=font_panel_val)
draw.text((panel_x + 16, panel_y + 286), "Você também pode editar a data diretamente no canvas.", fill=(100, 116, 139, 255), font=font_panel_help)

# Status Badge no rodapé do Inspector
draw.rounded_rectangle([panel_x + 16, panel_y + 308, panel_x + panel_w - 16, panel_y + 336], radius=4, fill=(240, 253, 244, 255))
draw.text((panel_x + 28, panel_y + 316), "✔ Bloco Válido & Pronto para Publicação", fill=(22, 101, 52, 255), font=font_panel_help)


# ==========================================
# 4. RODAPÉ DE RECURSOS ARQUITETURAIS (580 a 860px)
# ==========================================
footer_y = 580
footer_h = 270

draw.rounded_rectangle([50, footer_y, WIDTH - 50, footer_y + footer_h], radius=10, fill=(255, 255, 255, 255), outline=(226, 232, 240, 255), width=1)

cards = [
    {
        "icon": "⚡",
        "title": "Vanilla ES5 Puro",
        "desc": "Execução nativa no Gutenberg sem Babel, sem Webpack e sem necessidade de compilação em produção."
    },
    {
        "icon": "🏷️",
        "title": "HTML5 Semântico",
        "desc": "Marcação acessível com tag <time>, suporte a leitores de tela, target='_blank' e rel='noopener noreferrer'."
    },
    {
        "icon": "🌍",
        "title": "Multilíngue (i18n)",
        "desc": "Tradução completa em 4 idiomas: Português (pt_BR), Inglês (en_US), Espanhol (es_ES) e Italiano (it_IT)."
    },
    {
        "icon": "🔄",
        "title": "Compatibilidade Total",
        "desc": "Namespaces custom-adm e luiz0067 registrados simultaneamente, preservando conteúdo legado da prefeitura."
    }
]

draw.text((75, footer_y + 20), "Destaques Técnicos & Padrão de Engenharia", fill=(15, 23, 42, 255), font=font_sec_title)

for idx, card in enumerate(cards):
    col = idx % 2
    row = idx // 2
    cx = 75 + col * 540
    cy = footer_y + 60 + row * 98

    # Ícone quadrado
    draw.rounded_rectangle([cx, cy, cx + 38, cy + 38], radius=8, fill=(230, 244, 234, 255))
    draw.text((cx + 10, cy + 8), card["icon"], fill=(1, 145, 58, 255), font=font_card_head)

    draw.text((cx + 50, cy + 2), card["title"], fill=(15, 23, 42, 255), font=font_card_head)
    draw.text((cx + 50, cy + 24), card["desc"], fill=(100, 116, 139, 255), font=font_card_desc)

# Salva screenshot-1.png e screenshot.png
output_1 = os.path.join(BASE_DIR, "screenshot-1.png")
output_root = os.path.join(BASE_DIR, "screenshot.png")

img_rgb = img.convert("RGB")
img_rgb.save(output_1, format="PNG", optimize=True)
img_rgb.save(output_root, format="PNG", optimize=True)

print(f"[OK] Screenshot gerada com sucesso: {output_1} ({WIDTH}x{HEIGHT}px)")
print(f"[OK] Screenshot gerada com sucesso: {output_root} ({WIDTH}x{HEIGHT}px)")
