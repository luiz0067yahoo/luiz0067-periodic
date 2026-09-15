"""
Gerador de Assets Visuais para o plugin Luiz0067 - Audio Embed
Gera banner-772x250.png, screenshot-1.png e screenshot-2.png com alta fidelidade visual.
"""

import os
import math
from PIL import Image, ImageDraw, ImageFont, ImageFilter

FONT_REG = "C:/Windows/Fonts/segoeui.ttf"
FONT_BOLD = "C:/Windows/Fonts/segoeuib.ttf"
FONT_SEMIBOLD = "C:/Windows/Fonts/segoeuisb.ttf"
FONT_ITALIC = "C:/Windows/Fonts/segoeuii.ttf"

if not os.path.exists(FONT_REG):
    FONT_REG = "C:/Windows/Fonts/arial.ttf"
    FONT_BOLD = "C:/Windows/Fonts/arialbd.ttf"
    FONT_SEMIBOLD = "C:/Windows/Fonts/arialbd.ttf"
    FONT_ITALIC = "C:/Windows/Fonts/ariali.ttf"

def get_font(font_path, size):
    try:
        return ImageFont.truetype(font_path, size)
    except Exception:
        return ImageFont.load_default()

def draw_rounded_rect(draw, bbox, radius, fill=None, outline=None, width=1):
    draw.rounded_rectangle(bbox, radius=radius, fill=fill, outline=outline, width=width)

# ==========================================
# 1. BANNER (772 x 250 px)
# ==========================================
def create_banner():
    W, H = 772, 250
    img = Image.new("RGBA", (W, H), (15, 23, 42, 255)) # Dark slate base
    draw = ImageDraw.Draw(img)

    # Background gradient
    for y in range(H):
        r = int(15 + (y / H) * 15)
        g = int(23 + (y / H) * 25)
        b = int(42 + (y / H) * 45)
        draw.line([(0, y), (W, y)], fill=(r, g, b))

    # Ambient glow on the right
    glow = Image.new("RGBA", (W, H), (0, 0, 0, 0))
    g_draw = ImageDraw.Draw(glow)
    g_draw.ellipse([W - 320, -50, W + 100, H + 80], fill=(2, 132, 199, 45))
    g_draw.ellipse([W - 180, 20, W + 40, H - 20], fill=(14, 165, 233, 50))
    glow = glow.filter(ImageFilter.GaussianBlur(40))
    img = Image.alpha_composite(img, glow)
    draw = ImageDraw.Draw(img)

    # Soundwave graphic on the right
    wave_cx = W - 140
    wave_cy = H // 2
    heights = [18, 36, 64, 92, 130, 85, 120, 150, 95, 135, 75, 110, 50, 25]
    for i, h in enumerate(heights):
        bx = wave_cx - 110 + (i * 17)
        top = wave_cy - h // 2
        bot = wave_cy + h // 2
        # Gradient color for bars
        color = (14, 165, 233) if i % 2 == 0 else (56, 189, 248)
        draw.line([(bx, top), (bx, bot)], fill=color, width=6)
        draw.ellipse([bx - 3, top - 3, bx + 3, top + 3], fill=color)
        draw.ellipse([bx - 3, bot - 3, bx + 3, bot + 3], fill=color)

    # Left content
    # Badge
    draw_rounded_rect(draw, (45, 30, 165, 54), 12, fill=(2, 132, 199, 240))
    draw.text((58, 35), "LUIZ0067", font=get_font(FONT_BOLD, 12), fill=(255, 255, 255))
    draw.text((122, 35), "BLOCK", font=get_font(FONT_REG, 11), fill=(224, 242, 254))

    # Title
    draw.text((45, 68), "AUDIO EMBED", font=get_font(FONT_BOLD, 36), fill=(255, 255, 255))
    draw.text((45, 116), "Player de Áudio & Podcast com Upload Nativo e Embed", font=get_font(FONT_SEMIBOLD, 15), fill=(148, 163, 184))

    # Feature tags
    tags = ["Upload Direto", "MP3 / WAV / OGG", "Capa Personalizada", "Botão Download", "100% Responsivo"]
    tx = 45
    ty = 160
    for tag in tags:
        bbox = draw.textbbox((0, 0), tag, font=get_font(FONT_SEMIBOLD, 11))
        tw = bbox[2] - bbox[0] + 20
        draw_rounded_rect(draw, (tx, ty, tx + tw, ty + 28), 14, fill=(30, 41, 59), outline=(51, 65, 85), width=1)
        draw.text((tx + 10, ty + 6), tag, font=get_font(FONT_SEMIBOLD, 11), fill=(224, 242, 254))
        tx += tw + 10

    # Subtext footer
    draw.text((45, 208), "Gutenberg Native Block API  •  Vanilla JavaScript (ES5)  •  GPL-2.0 License", font=get_font(FONT_REG, 11), fill=(100, 116, 139))

    img.convert("RGB").save("banner-772x250.png", quality=95)
    print("banner-772x250.png generated successfully!")

# Helper to draw an audio cover art
def draw_cover_art(draw, box):
    x1, y1, x2, y2 = box
    w = x2 - x1
    h = y2 - y1
    # Background gradient
    for y in range(int(y1), int(y2)):
        prog = (y - y1) / h
        r = int(2 + prog * 10)
        g = int(132 - prog * 40)
        b = int(199 - prog * 20)
        draw.line([(x1, y), (x2, y)], fill=(r, g, b))
    # Soundwaves in cover
    cx = (x1 + x2) // 2
    cy = (y1 + y2) // 2
    draw.ellipse([cx - 30, cy - 30, cx + 30, cy + 30], fill=(255, 255, 255, 40))
    # Equalizer in cover
    for i, bh in enumerate([10, 18, 30, 42, 24, 38, 16]):
        bx = cx - 24 + (i * 8)
        draw.line([(bx, cy - bh // 2), (bx, cy + bh // 2)], fill=(255, 255, 255), width=3)
    draw.text((x1 + 8, y2 - 22), "TECH WAVE", font=get_font(FONT_BOLD, 9), fill=(255, 255, 255))
    draw.text((x2 - 34, y2 - 22), "EP. 42", font=get_font(FONT_BOLD, 9), fill=(186, 230, 253))

# ==========================================
# 2. SCREENSHOT-1 (Gutenberg Editor: 1200 x 900)
# ==========================================
def create_screenshot_1():
    W, H = 1200, 900
    img = Image.new("RGBA", (W, H), (241, 245, 249, 255))
    draw = ImageDraw.Draw(img)

    # 1. WordPress Gutenberg Header Bar
    draw.rectangle([0, 0, W, 60], fill=(255, 255, 255), outline=(226, 232, 240), width=1)
    # WP logo circle
    draw.ellipse([18, 14, 50, 46], fill=(15, 23, 42))
    draw.text((27, 18), "W", font=get_font(FONT_BOLD, 18), fill=(255, 255, 255))
    # Inserter (+) button
    draw_rounded_rect(draw, (64, 14, 96, 46), 6, fill=(2, 132, 199))
    draw.text((75, 17), "+", font=get_font(FONT_BOLD, 20), fill=(255, 255, 255))
    # Tools icons (Undo, Redo, List)
    draw.text((115, 20), "↩   ↪   ≡", font=get_font(FONT_REG, 16), fill=(100, 116, 139))

    # Doc title in header
    draw.text((220, 21), "Episódio 42 - A Revolução do Som Digital — Editando", font=get_font(FONT_SEMIBOLD, 14), fill=(30, 41, 59))

    # Right header buttons
    draw_rounded_rect(draw, (W - 250, 14, W - 170, 46), 6, fill=(255, 255, 255), outline=(203, 213, 225), width=1)
    draw.text((W - 235, 22), "Salvar", font=get_font(FONT_SEMIBOLD, 13), fill=(71, 85, 105))

    draw_rounded_rect(draw, (W - 155, 14, W - 60, 46), 6, fill=(2, 132, 199))
    draw.text((W - 138, 22), "Publicar", font=get_font(FONT_BOLD, 13), fill=(255, 255, 255))

    # Cog settings button
    draw.text((W - 40, 20), "⚙", font=get_font(FONT_BOLD, 18), fill=(2, 132, 199))

    # 2. Main Content Canvas & Sidebar Partition
    sidebar_w = 340
    sidebar_x = W - sidebar_w
    canvas_w = sidebar_x

    # Sidebar background
    draw.rectangle([sidebar_x, 60, W, H], fill=(255, 255, 255), outline=(226, 232, 240), width=1)

    # Canvas Area
    # Post Title
    cy = 105
    cx = 60
    draw.text((cx, cy), "Episódio 42 - A Revolução do Som Digital", font=get_font(FONT_BOLD, 30), fill=(15, 23, 42))

    # Selected Block Toolbar
    cy += 65
    block_x = cx
    block_w = canvas_w - 120
    draw_rounded_rect(draw, (block_x, cy - 42, block_x + 290, cy - 8), 6, fill=(255, 255, 255), outline=(203, 213, 225), width=1)
    draw.text((block_x + 12, cy - 34), "🎧  Luiz0067 Audio Embed  |  ≡  ⋮", font=get_font(FONT_SEMIBOLD, 12), fill=(15, 23, 42))

    # Block Outline (Selected)
    card_h = 160
    draw_rounded_rect(draw, (block_x - 3, cy - 3, block_x + block_w + 3, cy + card_h + 3), 16, outline=(2, 132, 199), width=2)

    # The Block Card
    draw_rounded_rect(draw, (block_x, cy, block_x + block_w, cy + card_h), 14, fill=(255, 255, 255), outline=(226, 232, 240), width=1)

    # Card Cover Art
    cover_size = 120
    cover_box = (block_x + 20, cy + 20, block_x + 20 + cover_size, cy + 20 + cover_size)
    draw_cover_art(draw, cover_box)
    # Camera edit overlay badge
    draw.ellipse([block_x + 20 + cover_size - 24, cy + 20 + cover_size - 24, block_x + 20 + cover_size - 4, cy + 20 + cover_size - 4], fill=(2, 132, 199))
    draw.text((block_x + 20 + cover_size - 19, cy + 20 + cover_size - 22), "📷", font=get_font(FONT_REG, 10), fill=(255, 255, 255))

    # Card Info: Title and Artist
    content_x = block_x + 20 + cover_size + 24
    draw.text((content_x, cy + 22), "Episódio 42: O Futuro da Computação e Som Espacial", font=get_font(FONT_BOLD, 17), fill=(15, 23, 42))
    draw.text((content_x, cy + 48), "Tecnologia Sem Fronteiras com Luiz • Podcast Semanal", font=get_font(FONT_REG, 13), fill=(100, 116, 139))

    # Audio Player Bar
    player_y = cy + 78
    player_w = block_w - (content_x - block_x) - 20
    draw_rounded_rect(draw, (content_x, player_y, content_x + player_w, player_y + 36), 18, fill=(241, 245, 249), outline=(226, 232, 240), width=1)
    # Play icon
    draw.text((content_x + 14, player_y + 8), "▶", font=get_font(FONT_BOLD, 14), fill=(2, 132, 199))
    # Time
    draw.text((content_x + 36, player_y + 10), "18:45", font=get_font(FONT_REG, 11), fill=(100, 116, 139))
    # Progress slider
    prog_start = content_x + 80
    prog_end = content_x + player_w - 95
    draw.line([(prog_start, player_y + 18), (prog_end, player_y + 18)], fill=(203, 213, 225), width=4)
    prog_curr = prog_start + int((prog_end - prog_start) * 0.44)
    draw.line([(prog_start, player_y + 18), (prog_curr, player_y + 18)], fill=(2, 132, 199), width=4)
    draw.ellipse([prog_curr - 6, player_y + 18 - 6, prog_curr + 6, player_y + 18 + 6], fill=(2, 132, 199))
    # Total time
    draw.text((prog_end + 12, player_y + 10), "42:10", font=get_font(FONT_REG, 11), fill=(100, 116, 139))
    # Volume icon
    draw.text((prog_end + 54, player_y + 9), "🔊", font=get_font(FONT_REG, 12), fill=(100, 116, 139))

    # Actions: Download and Change file
    action_y = cy + 124
    draw_rounded_rect(draw, (content_x + player_w - 130, action_y, content_x + player_w, action_y + 26), 13, fill=(240, 249, 255), outline=(186, 230, 253), width=1)
    draw.text((content_x + player_w - 118, action_y + 5), "⬇  Baixar Áudio", font=get_font(FONT_SEMIBOLD, 11), fill=(2, 132, 199))
    draw.text((content_x, action_y + 6), "Trocar arquivo", font=get_font(FONT_REG, 11), fill=(100, 116, 139))

    # Second block in canvas (Placeholder / Upload dropzone preview)
    py2 = cy + card_h + 40
    draw.text((block_x, py2), "Segundo Bloco (Exemplo de Inserção):", font=get_font(FONT_SEMIBOLD, 13), fill=(100, 116, 139))
    py2 += 24
    draw_rounded_rect(draw, (block_x, py2, block_x + block_w, py2 + 180), 12, fill=(255, 255, 255), outline=(203, 213, 225), width=2)
    # Dashed effect simulated
    p_mid = block_x + block_w // 2
    draw.text((p_mid - 18, py2 + 25), "🎧", font=get_font(FONT_REG, 28), fill=(2, 132, 199))
    draw.text((p_mid - 160, py2 + 65), "Luiz0067 - Bloco de Áudio com Upload e Embed", font=get_font(FONT_BOLD, 14), fill=(15, 23, 42))
    draw.text((p_mid - 210, py2 + 88), "Envie um arquivo de áudio (MP3, WAV, OGG, M4A) da biblioteca ou insira uma URL direta.", font=get_font(FONT_REG, 11), fill=(100, 116, 139))

    draw_rounded_rect(draw, (p_mid - 105, py2 + 118, p_mid + 105, py2 + 152), 6, fill=(2, 132, 199))
    draw.text((p_mid - 85, py2 + 126), "📤  Enviar / Selecionar Áudio", font=get_font(FONT_BOLD, 11), fill=(255, 255, 255))

    # 3. Sidebar (InspectorControls)
    # Header of sidebar
    draw.rectangle([sidebar_x, 60, W, 108], fill=(255, 255, 255), outline=(226, 232, 240), width=1)
    draw.text((sidebar_x + 30, 78), "Documento", font=get_font(FONT_REG, 13), fill=(100, 116, 139))
    draw.text((sidebar_x + 135, 78), "Bloco", font=get_font(FONT_BOLD, 13), fill=(2, 132, 199))
    draw.line([(sidebar_x + 125, 106), (sidebar_x + 190, 106)], fill=(2, 132, 199), width=2)

    # Panel 1: Configurações de Áudio
    sy = 120
    draw.rectangle([sidebar_x, sy, W, sy + 38], fill=(248, 250, 252))
    draw.text((sidebar_x + 20, sy + 10), "Configurações de Áudio", font=get_font(FONT_BOLD, 13), fill=(15, 23, 42))
    draw.text((W - 35, sy + 10), "▲", font=get_font(FONT_REG, 11), fill=(100, 116, 139))

    # Field: URL do Áudio
    sy += 50
    draw.text((sidebar_x + 20, sy), "URL do Arquivo de Áudio", font=get_font(FONT_SEMIBOLD, 11), fill=(51, 65, 85))
    sy += 20
    draw_rounded_rect(draw, (sidebar_x + 20, sy, W - 20, sy + 32), 4, fill=(255, 255, 255), outline=(203, 213, 225), width=1)
    draw.text((sidebar_x + 28, sy + 8), "https://site.com/uploads/ep42.mp3", font=get_font(FONT_REG, 11), fill=(15, 23, 42))

    # Replace Audio button
    sy += 42
    draw_rounded_rect(draw, (sidebar_x + 20, sy, W - 20, sy + 32), 4, fill=(248, 250, 252), outline=(203, 213, 225), width=1)
    draw.text((sidebar_x + 65, sy + 8), "Substituir Arquivo de Áudio", font=get_font(FONT_SEMIBOLD, 11), fill=(51, 65, 85))
    sy += 38
    draw.text((sidebar_x + 120, sy), "Remover Áudio", font=get_font(FONT_REG, 11), fill=(239, 68, 68))

    # Cover image setting
    sy += 25
    draw.line([(sidebar_x + 20, sy), (W - 20, sy)], fill=(241, 245, 249), width=1)
    sy += 15
    draw.text((sidebar_x + 20, sy), "Capa do Áudio / Álbum", font=get_font(FONT_SEMIBOLD, 11), fill=(51, 65, 85))
    sy += 22
    # Small preview
    draw_cover_art(draw, (sidebar_x + 120, sy, sidebar_x + 200, sy + 80))
    sy += 90
    draw_rounded_rect(draw, (sidebar_x + 20, sy, W - 20, sy + 30), 4, fill=(248, 250, 252), outline=(203, 213, 225), width=1)
    draw.text((sidebar_x + 65, sy + 7), "Substituir Imagem de Capa", font=get_font(FONT_SEMIBOLD, 11), fill=(51, 65, 85))

    # Toggle Download
    sy += 45
    draw.text((sidebar_x + 20, sy), "Exibir Botão de Download", font=get_font(FONT_SEMIBOLD, 11), fill=(51, 65, 85))
    draw_rounded_rect(draw, (W - 65, sy - 2, W - 20, sy + 18), 10, fill=(2, 132, 199))
    draw.ellipse([W - 42, sy, W - 24, sy + 16], fill=(255, 255, 255))
    sy += 22
    draw.text((sidebar_x + 20, sy), "Permite download direto da faixa.", font=get_font(FONT_REG, 10), fill=(148, 163, 184))

    # Toggle Loop
    sy += 35
    draw.text((sidebar_x + 20, sy), "Repetição Contínua (Loop)", font=get_font(FONT_SEMIBOLD, 11), fill=(51, 65, 85))
    draw_rounded_rect(draw, (W - 65, sy - 2, W - 20, sy + 18), 10, fill=(203, 213, 225))
    draw.ellipse([W - 63, sy, W - 45, sy + 16], fill=(255, 255, 255))
    sy += 22
    draw.text((sidebar_x + 20, sy), "Reprodução única normal.", font=get_font(FONT_REG, 10), fill=(148, 163, 184))

    # Preload Select
    sy += 35
    draw.text((sidebar_x + 20, sy), "Pré-carregamento (Preload)", font=get_font(FONT_SEMIBOLD, 11), fill=(51, 65, 85))
    sy += 20
    draw_rounded_rect(draw, (sidebar_x + 20, sy, W - 20, sy + 32), 4, fill=(255, 255, 255), outline=(203, 213, 225), width=1)
    draw.text((sidebar_x + 28, sy + 8), "Metadados apenas (Padrão)", font=get_font(FONT_REG, 11), fill=(15, 23, 42))
    draw.text((W - 40, sy + 8), "▼", font=get_font(FONT_REG, 9), fill=(100, 116, 139))

    # Panel 2: Cores e Aparência
    sy += 48
    draw.rectangle([sidebar_x, sy, W, sy + 38], fill=(248, 250, 252))
    draw.text((sidebar_x + 20, sy + 10), "Cores e Aparência", font=get_font(FONT_BOLD, 13), fill=(15, 23, 42))
    draw.text((W - 35, sy + 10), "▼", font=get_font(FONT_REG, 11), fill=(100, 116, 139))

    img.convert("RGB").save("screenshot-1.png", quality=95)
    print("screenshot-1.png generated successfully!")

# ==========================================
# 3. SCREENSHOT-2 (Frontend Public: 1200 x 900)
# ==========================================
def create_screenshot_2():
    W, H = 1200, 900
    img = Image.new("RGBA", (W, H), (255, 255, 255, 255))
    draw = ImageDraw.Draw(img)

    # 1. Site Header
    draw.rectangle([0, 0, W, 80], fill=(255, 255, 255), outline=(241, 245, 249), width=1)
    # Site Logo / Title
    draw.text((120, 26), "AUDIO JOURNAL", font=get_font(FONT_BOLD, 18), fill=(15, 23, 42))
    draw.text((310, 28), "•  Revista de Áudio, Música e Podcast", font=get_font(FONT_REG, 14), fill=(148, 163, 184))
    # Nav links
    navs = ["Início", "Podcasts", "Música", "Sobre", "Contato"]
    nx = 650
    for n in navs:
        draw.text((nx, 29), n, font=get_font(FONT_REG, 14), fill=(71, 85, 105))
        nx += 95

    # 2. Article Container (Centered, width ~820px)
    cx = (W - 820) // 2
    ay = 130

    # Category Pill
    draw_rounded_rect(draw, (cx, ay, cx + 175, ay + 26), 13, fill=(240, 249, 255), outline=(186, 230, 253), width=1)
    draw.text((cx + 14, ay + 5), "PODCAST EM DESTAQUE", font=get_font(FONT_BOLD, 10), fill=(2, 132, 199))

    # Article Title (H1)
    ay += 42
    draw.text((cx, ay), "Episódio 42: A Revolução do Som Digital e Podcasts", font=get_font(FONT_BOLD, 32), fill=(15, 23, 42))

    # Meta (Author, date, duration)
    ay += 52
    draw.ellipse([cx, ay, cx + 32, ay + 32], fill=(2, 132, 199))
    draw.text((cx + 10, ay + 6), "L", font=get_font(FONT_BOLD, 15), fill=(255, 255, 255))
    draw.text((cx + 42, ay + 7), "Por Luiz  •  12 de Setembro de 2026  •  42 min de áudio", font=get_font(FONT_REG, 13), fill=(100, 116, 139))

    # Intro Paragraph
    ay += 55
    p1 = "Neste episódio especial, exploramos a transição das ondas analógicas para os formatos digitais de alta"
    p2 = "fidelidade, a popularização global do formato podcast e como as novas ferramentas de áudio para a web"
    p3 = "estão transformando a forma como produtores e ouvintes se conectam online."
    draw.text((cx, ay), p1, font=get_font(FONT_REG, 16), fill=(51, 65, 85))
    draw.text((cx, ay + 26), p2, font=get_font(FONT_REG, 16), fill=(51, 65, 85))
    draw.text((cx, ay + 52), p3, font=get_font(FONT_REG, 16), fill=(51, 65, 85))

    # 3. Audio Embed Block (Rendered Frontend Output)
    bw, bh = 800, 160
    bx = (W - bw) // 2
    by = ay + 105

    # Realistic Drop Shadow
    shadow_img = Image.new("RGBA", (W, H), (0, 0, 0, 0))
    s_draw = ImageDraw.Draw(shadow_img)
    draw_rounded_rect(s_draw, (bx + 4, by + 10, bx + bw - 4, by + bh + 14), 16, fill=(15, 23, 42, 35))
    shadow_img = shadow_img.filter(ImageFilter.GaussianBlur(16))
    img = Image.alpha_composite(img, shadow_img)
    draw = ImageDraw.Draw(img)

    # Main Card
    draw_rounded_rect(draw, (bx, by, bx + bw, by + bh), 14, fill=(255, 255, 255), outline=(226, 232, 240), width=1)

    # Album / Podcast Cover
    cover_size = 120
    cover_box = (bx + 20, by + 20, bx + 20 + cover_size, by + 20 + cover_size)
    draw_cover_art(draw, cover_box)

    # Info & Player
    content_x = bx + 20 + cover_size + 24
    draw.text((content_x, by + 22), "Episódio 42: O Futuro da Computação e Som Espacial", font=get_font(FONT_BOLD, 18), fill=(15, 23, 42))
    draw.text((content_x, by + 48), "Tecnologia Sem Fronteiras com Luiz", font=get_font(FONT_SEMIBOLD, 13), fill=(100, 116, 139))

    # Player bar
    player_y = by + 78
    player_w = bw - (content_x - bx) - 24
    draw_rounded_rect(draw, (content_x, player_y, content_x + player_w, player_y + 36), 18, fill=(248, 250, 252), outline=(226, 232, 240), width=1)
    # Play icon
    draw.text((content_x + 14, player_y + 8), "▶", font=get_font(FONT_BOLD, 14), fill=(2, 132, 199))
    # Time
    draw.text((content_x + 36, player_y + 10), "00:00", font=get_font(FONT_REG, 11), fill=(100, 116, 139))
    # Progress track
    prog_start = content_x + 80
    prog_end = content_x + player_w - 95
    draw.line([(prog_start, player_y + 18), (prog_end, player_y + 18)], fill=(203, 213, 225), width=4)
    # Total time
    draw.text((prog_end + 12, player_y + 10), "42:10", font=get_font(FONT_REG, 11), fill=(100, 116, 139))
    # Volume
    draw.text((prog_end + 54, player_y + 9), "🔊", font=get_font(FONT_REG, 12), fill=(100, 116, 139))

    # Actions: Download button
    action_y = by + 124
    draw_rounded_rect(draw, (content_x + player_w - 140, action_y, content_x + player_w, action_y + 26), 13, fill=(240, 249, 255), outline=(186, 230, 253), width=1)
    draw.text((content_x + player_w - 128, action_y + 5), "⬇  Baixar Áudio", font=get_font(FONT_BOLD, 11), fill=(2, 132, 199))

    # Show Notes section below player
    ny = by + bh + 45
    draw.text((cx, ny), "Notas do Episódio e Tópicos Discutidos", font=get_font(FONT_BOLD, 20), fill=(15, 23, 42))
    topics = [
        "01:15 - A evolução histórica dos formatos de compressão de áudio (MP3, AAC e Opus)",
        "12:30 - Arquiteturas modernas para streaming e áudio sob demanda na web",
        "25:40 - Áudio espacial e binaural: o que muda para o ouvinte comum",
        "38:20 - Dicas práticas de produção e publicação independente de podcasts"
    ]
    ty = ny + 35
    for t in topics:
        draw.text((cx + 10, ty), "•  " + t, font=get_font(FONT_REG, 14), fill=(71, 85, 105))
        ty += 28

    img.convert("RGB").save("screenshot-2.png", quality=95)
    print("screenshot-2.png generated successfully!")

if __name__ == "__main__":
    create_banner()
    create_screenshot_1()
    create_screenshot_2()
