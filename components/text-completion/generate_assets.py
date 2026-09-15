"""
Gerador de Assets Visuais Profissionais para o plugin luiz0067-text-completion
Gera screenshots nítidos com ícones vetoriais desenhados diretamente no Pillow.
"""

import os
from PIL import Image, ImageDraw, ImageFont

FONT_REG = "C:/Windows/Fonts/arial.ttf"
FONT_BOLD = "C:/Windows/Fonts/arialbd.ttf"
FONT_CODE = "C:/Windows/Fonts/consola.ttf"

def get_font(path, size):
    try:
        return ImageFont.truetype(path, size)
    except Exception:
        return ImageFont.load_default()

f_title = get_font(FONT_BOLD, 22)
f_h2 = get_font(FONT_BOLD, 18)
f_h3 = get_font(FONT_BOLD, 15)
f_body = get_font(FONT_REG, 14)
f_body_bold = get_font(FONT_BOLD, 14)
f_small = get_font(FONT_REG, 12)
f_small_bold = get_font(FONT_BOLD, 12)
f_code = get_font(FONT_CODE, 14)
f_badge = get_font(FONT_BOLD, 11)

# Helper to draw clean vector checkmark
def draw_check(draw, x, y, size=12, color=(25, 135, 84), width=2):
    draw.line([x, y + size * 0.5, x + size * 0.35, y + size * 0.85], fill=color, width=width)
    draw.line([x + size * 0.35, y + size * 0.85, x + size, y + size * 0.15], fill=color, width=width)

# Helper to draw clean vector X
def draw_x(draw, x, y, size=12, color=(220, 53, 69), width=2):
    draw.line([x, y, x + size, y + size], fill=color, width=width)
    draw.line([x + size, y, x, y + size], fill=color, width=width)

# Helper to draw speaker icon
def draw_speaker(draw, x, y, color=(13, 110, 253)):
    draw.rectangle([x, y + 4, x + 4, y + 10], fill=color)
    draw.polygon([(x + 4, y + 4), (x + 10, y), (x + 10, y + 14), (x + 4, y + 10)], fill=color)
    draw.arc([x + 9, y + 1, x + 15, y + 13], -60, 60, fill=color, width=2)

# Helper to draw edit/pen icon
def draw_pen(draw, x, y, color=(3, 105, 161)):
    draw.line([x + 2, y + 8, x + 8, y + 2], fill=color, width=2)
    draw.line([x + 4, y + 10, x + 10, y + 4], fill=color, width=2)
    draw.polygon([(x, y + 12), (x, y + 9), (x + 3, y + 12)], fill=color)

# =========================================================================
# 1. SCREENSHOT 1: Gutenberg Editor com Live Gap Highlighter & Inspector
# =========================================================================
def generate_screenshot_1():
    W, H = 1280, 800
    img = Image.new("RGB", (W, H), (248, 250, 252))
    draw = ImageDraw.Draw(img)

    # Top WordPress Admin Bar
    draw.rectangle([0, 0, W, 56], fill=(255, 255, 255), outline=(226, 232, 240), width=1)
    # WordPress logo
    draw.rounded_rectangle([16, 12, 48, 44], radius=6, fill=(15, 23, 42))
    draw.text((25, 18), "W", fill=(255, 255, 255), font=f_h2)
    draw.text((64, 19), "WordPress 6.7  |  Editor de Blocos (Gutenberg)", fill=(100, 116, 139), font=f_body)

    # Save & Publish buttons
    draw.rounded_rectangle([W - 270, 12, W - 180, 44], radius=6, fill=(241, 245, 249), outline=(203, 213, 225))
    draw.text((W - 250, 19), "Salvar", fill=(71, 85, 105), font=f_small_bold)
    draw.rounded_rectangle([W - 170, 12, W - 60, 44], radius=6, fill=(13, 110, 253))
    draw.text((W - 148, 19), "Publicar", fill=(255, 255, 255), font=f_small_bold)

    # Main Canvas vs Sidebar
    SIDEBAR_X = 930
    draw.rectangle([0, 56, SIDEBAR_X, H], fill=(241, 245, 249))
    draw.rectangle([SIDEBAR_X, 56, W, H], fill=(255, 255, 255), outline=(226, 232, 240), width=1)

    # --- SIDEBAR ---
    draw.rectangle([SIDEBAR_X, 56, W, 96], fill=(248, 250, 252), outline=(226, 232, 240))
    draw.text((SIDEBAR_X + 24, 68), "Pagina", fill=(100, 116, 139), font=f_body)
    draw.text((SIDEBAR_X + 110, 68), "Bloco", fill=(13, 110, 253), font=f_body_bold)
    draw.rectangle([SIDEBAR_X + 105, 92, SIDEBAR_X + 160, 96], fill=(13, 110, 253))

    # Block header in inspector
    draw.rounded_rectangle([SIDEBAR_X + 20, 110, SIDEBAR_X + 54, 144], radius=6, fill=(238, 242, 255))
    draw.text((SIDEBAR_X + 26, 117), "TC", fill=(79, 70, 229), font=f_h3)
    draw.text((SIDEBAR_X + 66, 114), "luiz0067 Text Completion", fill=(15, 23, 42), font=f_small_bold)
    draw.text((SIDEBAR_X + 66, 131), "Preenchimento de Lacunas e Ditado", fill=(100, 116, 139), font=f_small)

    # Panel 1: Regras de Validacao
    draw.rectangle([SIDEBAR_X, 160, W, 195], fill=(248, 250, 252), outline=(226, 232, 240))
    draw.text((SIDEBAR_X + 20, 170), "Regras de Validacao", fill=(30, 41, 59), font=f_small_bold)

    draw.text((SIDEBAR_X + 20, 212), "Diferenciar Maiusculas/Minusculas", fill=(51, 65, 85), font=f_small)
    draw.rounded_rectangle([SIDEBAR_X + 275, 208, SIDEBAR_X + 315, 226], radius=9, fill=(203, 213, 225))
    draw.ellipse([SIDEBAR_X + 277, 210, SIDEBAR_X + 293, 224], fill=(255, 255, 255))

    draw.text((SIDEBAR_X + 20, 245), "Tolerar Pequenos Erros de Digitacao", fill=(51, 65, 85), font=f_small)
    draw.rounded_rectangle([SIDEBAR_X + 275, 241, SIDEBAR_X + 315, 259], radius=9, fill=(13, 110, 253))
    draw.ellipse([SIDEBAR_X + 297, 243, SIDEBAR_X + 313, 257], fill=(255, 255, 255))

    draw.text((SIDEBAR_X + 20, 278), "Ignorar Acentos e Diacriticos", fill=(51, 65, 85), font=f_small)
    draw.rounded_rectangle([SIDEBAR_X + 275, 274, SIDEBAR_X + 315, 292], radius=9, fill=(13, 110, 253))
    draw.ellipse([SIDEBAR_X + 297, 276, SIDEBAR_X + 313, 290], fill=(255, 255, 255))

    draw.text((SIDEBAR_X + 20, 312), "Limite de Tentativas: 3", fill=(51, 65, 85), font=f_small)
    draw.rectangle([SIDEBAR_X + 20, 336, SIDEBAR_X + 315, 340], fill=(226, 232, 240))
    draw.rectangle([SIDEBAR_X + 20, 336, SIDEBAR_X + 110, 340], fill=(13, 110, 253))
    draw.ellipse([SIDEBAR_X + 104, 332, SIDEBAR_X + 116, 344], fill=(13, 110, 253))

    # Panel 2: Audio Ditado MP3
    draw.rectangle([SIDEBAR_X, 365, W, 400], fill=(248, 250, 252), outline=(226, 232, 240))
    draw.text((SIDEBAR_X + 20, 375), "Audio / Modo Ditado (MP3)", fill=(30, 41, 59), font=f_small_bold)

    draw.rounded_rectangle([SIDEBAR_X + 20, 412, SIDEBAR_X + 325, 465], radius=6, fill=(241, 245, 249), outline=(203, 213, 225))
    draw.text((SIDEBAR_X + 32, 423), "audio-ditado-aula04.mp3", fill=(15, 23, 42), font=f_small_bold)
    draw.text((SIDEBAR_X + 32, 442), "1.4 MB  -  01:15 min  -  Audio Ativo", fill=(100, 116, 139), font=f_small)

    draw.rounded_rectangle([SIDEBAR_X + 20, 478, SIDEBAR_X + 155, 506], radius=4, fill=(255, 255, 255), outline=(203, 213, 225))
    draw.text((SIDEBAR_X + 32, 486), "Substituir Audio", fill=(51, 65, 85), font=f_small)
    draw.rounded_rectangle([SIDEBAR_X + 170, 478, SIDEBAR_X + 295, 506], radius=4, fill=(254, 242, 242), outline=(254, 202, 202))
    draw.text((SIDEBAR_X + 188, 486), "Remover Audio", fill=(220, 38, 38), font=f_small)

    # Panel 3: Aparencia
    draw.rectangle([SIDEBAR_X, 528, W, 563], fill=(248, 250, 252), outline=(226, 232, 240))
    draw.text((SIDEBAR_X + 20, 538), "Aparencia e Opcoes", fill=(30, 41, 59), font=f_small_bold)
    draw.text((SIDEBAR_X + 20, 580), "Cor do Tema: Primary (Bootstrap Azul)", fill=(51, 65, 85), font=f_small)
    draw.text((SIDEBAR_X + 20, 610), "Exibir Banco de Palavras", fill=(51, 65, 85), font=f_small)
    draw.rounded_rectangle([SIDEBAR_X + 275, 606, SIDEBAR_X + 315, 624], radius=9, fill=(13, 110, 253))
    draw.ellipse([SIDEBAR_X + 297, 608, SIDEBAR_X + 313, 622], fill=(255, 255, 255))

    # --- CANVAS BLOCK ---
    CARD_X1, CARD_Y1 = 70, 85
    CARD_X2, CARD_Y2 = 860, 755

    draw.rounded_rectangle([CARD_X1, CARD_Y1, CARD_X2, CARD_Y2], radius=12, fill=(255, 255, 255), outline=(59, 130, 246), width=2)

    # Header
    draw.rounded_rectangle([CARD_X1 + 1, CARD_Y1 + 1, CARD_X2 - 1, CARD_Y1 + 75], radius=10, fill=(248, 250, 252))
    draw.rounded_rectangle([CARD_X1 + 24, CARD_Y1 + 14, CARD_X1 + 190, CARD_Y1 + 38], radius=6, fill=(13, 110, 253))
    draw.text((CARD_X1 + 34, CARD_Y1 + 19), "luiz0067 Text Completion", fill=(255, 255, 255), font=f_badge)

    draw.rounded_rectangle([CARD_X1 + 200, CARD_Y1 + 14, CARD_X1 + 300, CARD_Y1 + 38], radius=6, fill=(254, 226, 226), outline=(252, 165, 165))
    draw.text((CARD_X1 + 212, CARD_Y1 + 19), "[D] Modo Ditado", fill=(220, 38, 38), font=f_badge)

    draw.rounded_rectangle([CARD_X2 - 175, CARD_Y1 + 14, CARD_X2 - 24, CARD_Y1 + 38], radius=6, fill=(241, 245, 249), outline=(203, 213, 225))
    draw.text((CARD_X2 - 160, CARD_Y1 + 19), "4 lacunas detectadas", fill=(71, 85, 105), font=f_badge)

    draw.text((CARD_X1 + 24, CARD_Y1 + 46), "Exercicio de Ditado e Fixacao de Vocabulario", fill=(30, 41, 59), font=f_h3)

    # Audio Banner
    draw.rounded_rectangle([CARD_X1 + 24, CARD_Y1 + 90, CARD_X2 - 24, CARD_Y1 + 145], radius=8, fill=(239, 246, 255), outline=(191, 219, 254))
    draw_speaker(draw, CARD_X1 + 38, CARD_Y1 + 102, (29, 78, 216))
    draw.text((CARD_X1 + 60, CARD_Y1 + 100), "Audio do Ditado Configurado (MP3)", fill=(29, 78, 216), font=f_small_bold)

    # Player bar
    draw.rounded_rectangle([CARD_X1 + 38, CARD_Y1 + 120, CARD_X2 - 38, CARD_Y1 + 138], radius=9, fill=(255, 255, 255), outline=(191, 219, 254))
    draw.polygon([(CARD_X1 + 48, CARD_Y1 + 124), (CARD_X1 + 56, CARD_Y1 + 129), (CARD_X1 + 48, CARD_Y1 + 134)], fill=(29, 78, 216))
    draw.rectangle([CARD_X1 + 70, CARD_Y1 + 127, CARD_X1 + 360, CARD_Y1 + 131], fill=(59, 130, 246))
    draw.rectangle([CARD_X1 + 360, CARD_Y1 + 127, CARD_X2 - 90, CARD_Y1 + 131], fill=(226, 232, 240))
    draw.text((CARD_X2 - 80, CARD_Y1 + 122), "01:15", fill=(100, 116, 139), font=f_small)

    # Raw Textarea
    draw.text((CARD_X1 + 24, CARD_Y1 + 160), "Texto com Marcacoes de Lacunas:", fill=(30, 41, 59), font=f_small_bold)
    draw.text((CARD_X1 + 270, CARD_Y1 + 160), "Use *palavra* ou *[opcao1|opcao2]*", fill=(100, 116, 139), font=f_small)

    draw.rounded_rectangle([CARD_X1 + 24, CARD_Y1 + 182, CARD_X2 - 24, CARD_Y1 + 280], radius=8, fill=(252, 253, 254), outline=(203, 213, 225))
    line1 = "O ceu e *azul* e as aguas do oceano sao *salgadas*."
    line2 = "Na primavera, a paisagem fica *[verdejante|bela]* e as flores desabrocham com *[aroma|perfume]*."
    draw.text((CARD_X1 + 38, CARD_Y1 + 200), line1, fill=(15, 23, 42), font=f_code)
    draw.text((CARD_X1 + 38, CARD_Y1 + 235), line2, fill=(15, 23, 42), font=f_code)

    # Tip banner
    draw.rounded_rectangle([CARD_X1 + 24, CARD_Y1 + 295, CARD_X2 - 24, CARD_Y1 + 342], radius=8, fill=(254, 252, 232), outline=(254, 240, 138))
    draw.text((CARD_X1 + 38, CARD_Y1 + 308), "Dica: *azul* cria lacuna unica. *[verdejante|bela]* aceita ambas como respostas corretas.", fill=(133, 77, 14), font=f_small)

    # Live Visual Gap Highlighter
    draw.rounded_rectangle([CARD_X1 + 24, CARD_Y1 + 355, CARD_X2 - 24, CARD_Y2 - 25], radius=8, fill=(248, 250, 252), outline=(203, 213, 225))
    draw.text((CARD_X1 + 38, CARD_Y1 + 370), "PRE-VISUALIZACAO DAS LACUNAS EM TEMPO REAL", fill=(100, 116, 139), font=f_small_bold)

    y_p1 = CARD_Y1 + 410
    draw.text((CARD_X1 + 38, y_p1), "O ceu e", fill=(30, 41, 59), font=f_body)

    # Badge 1: azul
    draw.rounded_rectangle([CARD_X1 + 95, y_p1 - 4, CARD_X1 + 175, y_p1 + 24], radius=6, fill=(224, 242, 254), outline=(186, 230, 253))
    draw_pen(draw, CARD_X1 + 104, y_p1 + 2)
    draw.text((CARD_X1 + 122, y_p1 + 1), "azul", fill=(3, 105, 161), font=f_small_bold)

    draw.text((CARD_X1 + 185, y_p1), "e as aguas do oceano sao", fill=(30, 41, 59), font=f_body)

    # Badge 2: salgadas
    draw.rounded_rectangle([CARD_X1 + 360, y_p1 - 4, CARD_X1 + 465, y_p1 + 24], radius=6, fill=(224, 242, 254), outline=(186, 230, 253))
    draw_pen(draw, CARD_X1 + 370, y_p1 + 2)
    draw.text((CARD_X1 + 388, y_p1 + 1), "salgadas", fill=(3, 105, 161), font=f_small_bold)
    draw.text((CARD_X1 + 472, y_p1), ".", fill=(30, 41, 59), font=f_body)

    y_p2 = y_p1 + 50
    draw.text((CARD_X1 + 38, y_p2), "Na primavera, a paisagem fica", fill=(30, 41, 59), font=f_body)

    # Badge 3: verdejante | bela
    draw.rounded_rectangle([CARD_X1 + 240, y_p2 - 4, CARD_X1 + 400, y_p2 + 24], radius=6, fill=(224, 242, 254), outline=(186, 230, 253))
    draw_pen(draw, CARD_X1 + 250, y_p2 + 2)
    draw.text((CARD_X1 + 268, y_p2 + 1), "verdejante | bela", fill=(3, 105, 161), font=f_small_bold)

    draw.text((CARD_X1 + 410, y_p2), "e as flores desabrocham com", fill=(30, 41, 59), font=f_body)

    y_p3 = y_p2 + 40
    # Badge 4: aroma | perfume
    draw.rounded_rectangle([CARD_X1 + 38, y_p3 - 4, CARD_X1 + 195, y_p3 + 24], radius=6, fill=(224, 242, 254), outline=(186, 230, 253))
    draw_pen(draw, CARD_X1 + 48, y_p3 + 2)
    draw.text((CARD_X1 + 66, y_p3 + 1), "aroma | perfume", fill=(3, 105, 161), font=f_small_bold)
    draw.text((CARD_X1 + 205, y_p3), ".", fill=(30, 41, 59), font=f_body)

    return img

# =========================================================================
# 2. SCREENSHOT 2: Frontend Bootstrap 5 Interativo com Validação e Áudio
# =========================================================================
def generate_screenshot_2():
    W, H = 1280, 800
    img = Image.new("RGB", (W, H), (241, 245, 249))
    draw = ImageDraw.Draw(img)

    # Browser Bar
    draw.rectangle([0, 0, W, 45], fill=(226, 232, 240))
    draw.ellipse([15, 16, 27, 28], fill=(239, 68, 68))
    draw.ellipse([35, 16, 47, 28], fill=(245, 158, 11))
    draw.ellipse([55, 16, 67, 28], fill=(16, 185, 129))
    draw.rounded_rectangle([120, 8, W - 120, 36], radius=6, fill=(255, 255, 255))
    draw.text((140, 14), "https://meusite.com/exercicios/text-completion-ditado/", fill=(71, 85, 105), font=f_small)

    # Page Header
    draw.text((180, 75), "Curso de Idiomas  -  Unidade 4: Expressoes da Natureza", fill=(100, 116, 139), font=f_small_bold)

    # Card
    CX1, CY1 = 180, 110
    CX2, CY2 = 1100, 735

    draw.rounded_rectangle([CX1 + 4, CY1 + 4, CX2 + 4, CY2 + 4], radius=12, fill=(226, 232, 240))
    draw.rounded_rectangle([CX1, CY1, CX2, CY2], radius=12, fill=(255, 255, 255), outline=(226, 232, 240), width=1)

    # Card Header
    draw.rounded_rectangle([CX1 + 1, CY1 + 1, CX2 - 1, CY1 + 75], radius=10, fill=(248, 250, 252))
    draw.text((CX1 + 30, CY1 + 20), "Complete o Texto (Modo Ditado)", fill=(13, 110, 253), font=f_h2)
    draw.text((CX1 + 30, CY1 + 48), "Ouca com atencao o audio e preencha as lacunas com as palavras corretas.", fill=(100, 116, 139), font=f_small)

    # Header badges
    draw.rounded_rectangle([CX2 - 260, CY1 + 24, CX2 - 145, CY1 + 52], radius=6, fill=(254, 226, 226), outline=(252, 165, 165))
    draw.text((CX2 - 245, CY1 + 30), "[D] Modo Ditado", fill=(220, 38, 38), font=f_badge)
    draw.rounded_rectangle([CX2 - 135, CY1 + 24, CX2 - 30, CY1 + 52], radius=6, fill=(241, 245, 249), outline=(203, 213, 225))
    draw.text((CX2 - 120, CY1 + 30), "4 Lacunas", fill=(71, 85, 105), font=f_badge)

    # Audio Player Box
    draw.rounded_rectangle([CX1 + 30, CY1 + 95, CX2 - 30, CY1 + 175], radius=10, fill=(248, 250, 252), outline=(226, 232, 240))
    draw_speaker(draw, CX1 + 45, CY1 + 110, (13, 110, 253))
    draw.text((CX1 + 68, CY1 + 107), "Ouca o audio para completar o ditado:", fill=(13, 110, 253), font=f_small_bold)

    # Rewind & Speed buttons
    draw.rounded_rectangle([CX2 - 180, CY1 + 103, CX2 - 115, CY1 + 127], radius=4, fill=(255, 255, 255), outline=(203, 213, 225))
    draw.text((CX2 - 165, CY1 + 108), "-5s", fill=(71, 85, 105), font=f_small_bold)
    draw.rounded_rectangle([CX2 - 105, CY1 + 103, CX2 - 50, CY1 + 127], radius=4, fill=(255, 255, 255), outline=(203, 213, 225))
    draw.text((CX2 - 92, CY1 + 108), "1.0x", fill=(71, 85, 105), font=f_small_bold)

    # Native Audio Bar
    draw.rounded_rectangle([CX1 + 45, CY1 + 135, CX2 - 45, CY1 + 163], radius=14, fill=(255, 255, 255), outline=(203, 213, 225))
    draw.polygon([(CX1 + 58, CY1 + 140), (CX1 + 66, CY1 + 145), (CX1 + 58, CY1 + 150)], fill=(13, 110, 253))
    draw.rectangle([CX1 + 80, CY1 + 147, CX1 + 420, CY1 + 151], fill=(13, 110, 253))
    draw.rectangle([CX1 + 420, CY1 + 147, CX2 - 110, CY1 + 151], fill=(226, 232, 240))
    draw.text((CX2 - 100, CY1 + 142), "00:42 / 01:15", fill=(100, 116, 139), font=f_small)

    # Word Bank
    draw.rounded_rectangle([CX1 + 30, CY1 + 190, CX2 - 30, CY1 + 240], radius=8, fill=(241, 245, 249), outline=(226, 232, 240))
    draw.text((CX1 + 45, CY1 + 205), "Banco de Palavras:", fill=(71, 85, 105), font=f_small_bold)

    wb_words = ["salgadas", "anil", "azul", "perfume", "verdejante", "bela"]
    cur_wb_x = CX1 + 180
    for w in wb_words:
        w_len = len(w) * 9 + 20
        draw.rounded_rectangle([cur_wb_x, CY1 + 198, cur_wb_x + w_len, CY1 + 230], radius=16, fill=(255, 255, 255), outline=(203, 213, 225))
        draw.text((cur_wb_x + 10, CY1 + 205), w, fill=(30, 41, 59), font=f_small)
        cur_wb_x += w_len + 10

    # Text Content Area with Inputs
    TEXT_Y = CY1 + 265
    draw.text((CX1 + 40, TEXT_Y), "O ceu e", fill=(15, 23, 42), font=f_h3)

    # INPUT 1 (VALID)
    draw.rounded_rectangle([CX1 + 110, TEXT_Y - 5, CX1 + 225, TEXT_Y + 30], radius=6, fill=(240, 253, 244), outline=(25, 135, 84), width=2)
    draw.text((CX1 + 130, TEXT_Y + 2), "azul", fill=(22, 101, 52), font=f_body_bold)
    draw_check(draw, CX1 + 195, TEXT_Y + 4, size=14)

    draw.text((CX1 + 240, TEXT_Y), "e as aguas do oceano sao", fill=(15, 23, 42), font=f_h3)

    # INPUT 2 (VALID)
    draw.rounded_rectangle([CX1 + 450, TEXT_Y - 5, CX1 + 590, TEXT_Y + 30], radius=6, fill=(240, 253, 244), outline=(25, 135, 84), width=2)
    draw.text((CX1 + 475, TEXT_Y + 2), "salgadas", fill=(22, 101, 52), font=f_body_bold)
    draw_check(draw, CX1 + 560, TEXT_Y + 4, size=14)

    draw.text((CX1 + 600, TEXT_Y), ".", fill=(15, 23, 42), font=f_h3)

    # Second paragraph
    TEXT_Y2 = TEXT_Y + 55
    draw.text((CX1 + 40, TEXT_Y2), "Na primavera, a paisagem fica", fill=(15, 23, 42), font=f_h3)

    # INPUT 3 (VALID VIA MULTI-OPTION)
    draw.rounded_rectangle([CX1 + 285, TEXT_Y2 - 5, CX1 + 415, TEXT_Y2 + 30], radius=6, fill=(240, 253, 244), outline=(25, 135, 84), width=2)
    draw.text((CX1 + 310, TEXT_Y2 + 2), "bela", fill=(22, 101, 52), font=f_body_bold)
    draw_check(draw, CX1 + 385, TEXT_Y2 + 4, size=14)

    draw.text((CX1 + 430, TEXT_Y2), "e as flores desabrocham com", fill=(15, 23, 42), font=f_h3)

    # INPUT 4 (INVALID)
    draw.rounded_rectangle([CX1 + 675, TEXT_Y2 - 5, CX1 + 815, TEXT_Y2 + 30], radius=6, fill=(254, 242, 242), outline=(220, 53, 69), width=2)
    draw.text((CX1 + 700, TEXT_Y2 + 2), "cheiro", fill=(153, 27, 27), font=f_body_bold)
    draw_x(draw, CX1 + 785, TEXT_Y2 + 6, size=12)

    draw.text((CX1 + 825, TEXT_Y2), ".", fill=(15, 23, 42), font=f_h3)

    # Alert Feedback Banner
    ALERT_Y = TEXT_Y2 + 65
    draw.rounded_rectangle([CX1 + 30, ALERT_Y, CX2 - 30, ALERT_Y + 65], radius=8, fill=(254, 243, 199), outline=(245, 158, 11))
    draw.polygon([(CX1 + 50, ALERT_Y + 38), (CX1 + 65, ALERT_Y + 16), (CX1 + 80, ALERT_Y + 38)], fill=(245, 158, 11))
    draw.text((CX1 + 63, ALERT_Y + 20), "!", fill=(255, 255, 255), font=f_small_bold)

    draw.text((CX1 + 95, ALERT_Y + 14), "Voce acertou 3 de 4 lacunas (75%)!", fill=(146, 64, 14), font=f_body_bold)
    draw.text((CX1 + 95, ALERT_Y + 36), "Uma resposta esta incorreta. Voce ainda tem 2 tentativa(s) restantes.", fill=(180, 83, 9), font=f_small)

    # Actions Bar
    ACTIONS_Y = ALERT_Y + 85
    draw.line([CX1 + 30, ACTIONS_Y - 10, CX2 - 30, ACTIONS_Y - 10], fill=(226, 232, 240), width=1)

    # Check button
    draw.rounded_rectangle([CX1 + 30, ACTIONS_Y, CX1 + 220, ACTIONS_Y + 44], radius=6, fill=(13, 110, 253))
    draw_check(draw, CX1 + 45, ACTIONS_Y + 14, size=14, color=(255, 255, 255), width=2)
    draw.text((CX1 + 70, ACTIONS_Y + 13), "Conferir Respostas", fill=(255, 255, 255), font=f_body_bold)

    # Retry button
    draw.rounded_rectangle([CX1 + 235, ACTIONS_Y, CX1 + 400, ACTIONS_Y + 44], radius=6, fill=(241, 245, 249), outline=(203, 213, 225))
    draw.text((CX1 + 255, ACTIONS_Y + 13), "Tentar Novamente", fill=(51, 65, 85), font=f_body_bold)

    # Attempts Badge
    draw.rounded_rectangle([CX2 - 210, ACTIONS_Y, CX2 - 30, ACTIONS_Y + 44], radius=6, fill=(255, 255, 255), outline=(203, 213, 225))
    draw.ellipse([CX2 - 195, ACTIONS_Y + 16, CX2 - 181, ACTIONS_Y + 30], outline=(220, 53, 69), width=2)
    draw.ellipse([CX2 - 190, ACTIONS_Y + 21, CX2 - 186, ACTIONS_Y + 25], fill=(220, 53, 69))
    draw.text((CX2 - 170, ACTIONS_Y + 14), "Tentativas: 2/3", fill=(30, 41, 59), font=f_body_bold)

    return img

if __name__ == "__main__":
    print("Gerando assets visuais com icones vetoriais...")
    os.makedirs("assets", exist_ok=True)

    img1 = generate_screenshot_1()
    img1.save("screenshot-1.png")
    img1.save("screenshot.png")
    img1.save("assets/screenshot-1.png")

    img2 = generate_screenshot_2()
    img2.save("screenshot-2.png")
    img2.save("assets/screenshot-2.png")

    print("Screenshots gerados com sucesso!")
