# -*- coding: utf-8 -*-
import os
import json
import struct

domain = "luiz0067-buttons-banner"
languages_dir = r"c:\Users\usuario\Documents\GitHub\luiz0067-buttons-banner\languages"
os.makedirs(languages_dir, exist_ok=True)

# Dicionário de traduções completo para os 4 idiomas
translations_data = {
    "Verde Institucional": {
        "pt_BR": "Verde Institucional",
        "en_US": "Institutional Green",
        "es_ES": "Verde Institucional",
        "it_IT": "Verde Istituzionale"
    },
    "Azul Institucional": {
        "pt_BR": "Azul Institucional",
        "en_US": "Institutional Blue",
        "es_ES": "Azul Institucional",
        "it_IT": "Blu Istituzionale"
    },
    "Azul Escuro": {
        "pt_BR": "Azul Escuro",
        "en_US": "Dark Blue",
        "es_ES": "Azul Oscuro",
        "it_IT": "Blu Scuro"
    },
    "Coral / Vermelho": {
        "pt_BR": "Coral / Vermelho",
        "en_US": "Coral / Red",
        "es_ES": "Coral / Rojo",
        "it_IT": "Corallo / Rosso"
    },
    "Dourado / Amarelo": {
        "pt_BR": "Dourado / Amarelo",
        "en_US": "Gold / Yellow",
        "es_ES": "Dorado / Amarillo",
        "it_IT": "Oro / Giallo"
    },
    "Grafite Escuro": {
        "pt_BR": "Grafite Escuro",
        "en_US": "Dark Graphite",
        "es_ES": "Grafito Oscuro",
        "it_IT": "Grafite Scuro"
    },
    "Preto": {
        "pt_BR": "Preto",
        "en_US": "Black",
        "es_ES": "Negro",
        "it_IT": "Nero"
    },
    "Cinza Claro": {
        "pt_BR": "Cinza Claro",
        "en_US": "Light Gray",
        "es_ES": "Gris Claro",
        "it_IT": "Grigio Chiaro"
    },
    "Branco": {
        "pt_BR": "Branco",
        "en_US": "White",
        "es_ES": "Blanco",
        "it_IT": "Bianco"
    },
    "SAÚDE": {
        "pt_BR": "SAÚDE",
        "en_US": "HEALTH",
        "es_ES": "SALUD",
        "it_IT": "SALUTE"
    },
    "EDUCAÇÃO": {
        "pt_BR": "EDUCAÇÃO",
        "en_US": "EDUCATION",
        "es_ES": "EDUCACIÓN",
        "it_IT": "EDUCAZIONE"
    },
    "SERVIÇOS": {
        "pt_BR": "SERVIÇOS",
        "en_US": "SERVICES",
        "es_ES": "SERVICIOS",
        "it_IT": "SERVIZI"
    },
    "TRIBUTOS": {
        "pt_BR": "TRIBUTOS",
        "en_US": "TAXES",
        "es_ES": "TRIBUTOS",
        "it_IT": "TRIBUTI"
    },
    "NOTÍCIAS": {
        "pt_BR": "NOTÍCIAS",
        "en_US": "NEWS",
        "es_ES": "NOTICIAS",
        "it_IT": "NOTIZIE"
    },
    "Agendamentos e consultas": {
        "pt_BR": "Agendamentos e consultas",
        "en_US": "Appointments and consultations",
        "es_ES": "Citas y consultas",
        "it_IT": "Appuntamenti e visite"
    },
    "Matrículas e escolas": {
        "pt_BR": "Matrículas e escolas",
        "en_US": "Enrollment and schools",
        "es_ES": "Matrículas y escuelas",
        "it_IT": "Iscrizioni e scuole"
    },
    "Atendimento ao cidadão": {
        "pt_BR": "Atendimento ao cidadão",
        "en_US": "Citizen service",
        "es_ES": "Atención al ciudadano",
        "it_IT": "Assistenza ai cittadini"
    },
    "Certidões e IPTU": {
        "pt_BR": "Certidões e IPTU",
        "en_US": "Certificates and Property Tax",
        "es_ES": "Certificados e impuestos",
        "it_IT": "Certificati e tasse locali"
    },
    "Últimos comunicados": {
        "pt_BR": "Últimos comunicados",
        "en_US": "Latest announcements",
        "es_ES": "Últimos comunicados",
        "it_IT": "Ultimi comunicati"
    },
    "Botões Banner": {
        "pt_BR": "Botões Banner",
        "en_US": "Buttons Banner",
        "es_ES": "Botones Banner",
        "it_IT": "Banner Pulsanti"
    },
    "Quantidade de até 5 botões por linha com logos, descrições ricas e links personalizáveis.": {
        "pt_BR": "Quantidade de até 5 botões por linha com logos, descrições ricas e links personalizáveis.",
        "en_US": "Up to 5 buttons per row with logos, rich descriptions, and customizable links.",
        "es_ES": "Cantidad de hasta 5 botones por fila con logotipos, descripciones enriquecidas y enlaces personalizables.",
        "it_IT": "Fino a 5 pulsanti per riga con loghi, descrizioni avanzate e link personalizzabili."
    },
    "botões": {
        "pt_BR": "botões",
        "en_US": "buttons",
        "es_ES": "botones",
        "it_IT": "pulsanti"
    },
    "banner": {
        "pt_BR": "banner",
        "en_US": "banner",
        "es_ES": "banner",
        "it_IT": "banner"
    },
    "buttons": {
        "pt_BR": "buttons",
        "en_US": "buttons",
        "es_ES": "botones",
        "it_IT": "pulsanti"
    },
    "links": {
        "pt_BR": "links",
        "en_US": "links",
        "es_ES": "enlaces",
        "it_IT": "collegamenti"
    },
    "prefeitura": {
        "pt_BR": "prefeitura",
        "en_US": "city hall",
        "es_ES": "ayuntamiento",
        "it_IT": "municipio"
    },
    "custom adm": {
        "pt_BR": "custom adm",
        "en_US": "custom adm",
        "es_ES": "custom adm",
        "it_IT": "custom adm"
    },
    "Portal da Saúde": {
        "pt_BR": "Portal da Saúde",
        "en_US": "Health Portal",
        "es_ES": "Portal de Salud",
        "it_IT": "Portale della Salute"
    },
    "Escolas e Alunos": {
        "pt_BR": "Escolas e Alunos",
        "en_US": "Schools and Students",
        "es_ES": "Escuelas y Alumnos",
        "it_IT": "Scuole e Studenti"
    },
    "Atendimento Online": {
        "pt_BR": "Atendimento Online",
        "en_US": "Online Support",
        "es_ES": "Atención Online",
        "it_IT": "Supporto Online"
    },
    "Selecione o logotipo do botão": {
        "pt_BR": "Selecione o logotipo do botão",
        "en_US": "Select button logo",
        "es_ES": "Seleccione el logotipo del botón",
        "it_IT": "Seleziona il logo del pulsante"
    },
    "Utilizar como logotipo": {
        "pt_BR": "Utilizar como logotipo",
        "en_US": "Use as logo",
        "es_ES": "Utilizar como logotipo",
        "it_IT": "Usa come logo"
    },
    "Limite máximo recomendado atingido.": {
        "pt_BR": "Limite máximo recomendado atingido.",
        "en_US": "Maximum recommended limit reached.",
        "es_ES": "Límite máximo recomendado alcanzado.",
        "it_IT": "Limite massimo consigliato raggiunto."
    },
    "NOVO BOTÃO": {
        "pt_BR": "NOVO BOTÃO",
        "en_US": "NEW BUTTON",
        "es_ES": "NUEVO BOTÓN",
        "it_IT": "NUOVO PULSANTE"
    },
    "Descrição do serviço": {
        "pt_BR": "Descrição do serviço",
        "en_US": "Service description",
        "es_ES": "Descripción del servicio",
        "it_IT": "Descrizione del servizio"
    },
    "Deve haver pelo menos 1 botão no bloco.": {
        "pt_BR": "Deve haver pelo menos 1 botão no bloco.",
        "en_US": "There must be at least 1 button in the block.",
        "es_ES": "Debe haber al menos 1 botón en el bloque.",
        "it_IT": "Deve esserci almeno 1 pulsante nel blocco."
    },
    "Colunas por Linha": {
        "pt_BR": "Colunas por Linha",
        "en_US": "Columns per Row",
        "es_ES": "Columnas por Fila",
        "it_IT": "Colonne per Riga"
    },
    "Alinhamento": {
        "pt_BR": "Alinhamento",
        "en_US": "Alignment",
        "es_ES": "Alineación",
        "it_IT": "Allineamento"
    },
    "Centralizado": {
        "pt_BR": "Centralizado",
        "en_US": "Center",
        "es_ES": "Centrado",
        "it_IT": "Centrato"
    },
    "Esquerda": {
        "pt_BR": "Esquerda",
        "en_US": "Left",
        "es_ES": "Izquierda",
        "it_IT": "Sinistra"
    },
    "Direita": {
        "pt_BR": "Direita",
        "en_US": "Right",
        "es_ES": "Derecha",
        "it_IT": "Destra"
    },
    "Estilo Visual": {
        "pt_BR": "Estilo Visual",
        "en_US": "Visual Style",
        "es_ES": "Estilo Visual",
        "it_IT": "Stile Visivo"
    },
    "Padrão Prefeitura (Gradiente Verde/Azul)": {
        "pt_BR": "Padrão Prefeitura (Gradiente Verde/Azul)",
        "en_US": "City Hall Default (Green/Blue Gradient)",
        "es_ES": "Estándar Ayuntamiento (Gradiente Verde/Azul)",
        "it_IT": "Predefinito Municipio (Gradiente Verde/Blu)"
    },
    "Azul Corporativo": {
        "pt_BR": "Azul Corporativo",
        "en_US": "Corporate Blue",
        "es_ES": "Azul Corporativo",
        "it_IT": "Blu Aziendale"
    },
    "Escuro / Dark Mode": {
        "pt_BR": "Escuro / Dark Mode",
        "en_US": "Dark / Dark Mode",
        "es_ES": "Oscuro / Dark Mode",
        "it_IT": "Scuro / Modalità Scura"
    },
    "Contorno / Outline": {
        "pt_BR": "Contorno / Outline",
        "en_US": "Outline",
        "es_ES": "Contorno / Outline",
        "it_IT": "Contorno / Tratteggio"
    },
    "Configurações de Layout e Estilo": {
        "pt_BR": "Configurações de Layout e Estilo",
        "en_US": "Layout and Style Settings",
        "es_ES": "Configuraciones de Diseño y Estilo",
        "it_IT": "Impostazioni di Layout e Stile"
    },
    "Botão #": {
        "pt_BR": "Botão #",
        "en_US": "Button #",
        "es_ES": "Botón #",
        "it_IT": "Pulsante #"
    },
    "Sem título": {
        "pt_BR": "Sem título",
        "en_US": "Untitled",
        "es_ES": "Sin título",
        "it_IT": "Senza titolo"
    },
    "Título / Sigla": {
        "pt_BR": "Título / Sigla",
        "en_US": "Title / Acronym",
        "es_ES": "Título / Sigla",
        "it_IT": "Titolo / Sigla"
    },
    "Link de Destino (URL)": {
        "pt_BR": "Link de Destino (URL)",
        "en_US": "Target Link (URL)",
        "es_ES": "Enlace de Destino (URL)",
        "it_IT": "Collegamento di Destinazione (URL)"
    },
    "Abrir em Nova Aba (_blank)": {
        "pt_BR": "Abrir em Nova Aba (_blank)",
        "en_US": "Open in New Tab (_blank)",
        "es_ES": "Abrir en nueva pestaña (_blank)",
        "it_IT": "Apri in una nuova scheda (_blank)"
    },
    "Logotipo / Ícone:": {
        "pt_BR": "Logotipo / Ícone:",
        "en_US": "Logo / Icon:",
        "es_ES": "Logotipo / Icono:",
        "it_IT": "Logo / Icona:"
    },
    "Alterar Logotipo": {
        "pt_BR": "Alterar Logotipo",
        "en_US": "Change Logo",
        "es_ES": "Cambiar Logotipo",
        "it_IT": "Modifica Logo"
    },
    "Enviar Logotipo": {
        "pt_BR": "Enviar Logotipo",
        "en_US": "Upload Logo",
        "es_ES": "Subir Logotipo",
        "it_IT": "Carica Logo"
    },
    "Remover": {
        "pt_BR": "Remover",
        "en_US": "Remove",
        "es_ES": "Eliminar",
        "it_IT": "Rimuovi"
    },
    "Gerenciador de Botões (": {
        "pt_BR": "Gerenciador de Botões (",
        "en_US": "Button Manager (",
        "es_ES": "Gestor de Botones (",
        "it_IT": "Gestione Pulsanti ("
    },
    "Cores Personalizadas": {
        "pt_BR": "Cores Personalizadas",
        "en_US": "Custom Colors",
        "es_ES": "Colores Personalizados",
        "it_IT": "Colori Personalizzati"
    },
    "Cor do Destaque / Fundo": {
        "pt_BR": "Cor do Destaque / Fundo",
        "en_US": "Highlight / Background Color",
        "es_ES": "Color de Resalte / Fondo",
        "it_IT": "Colore di Evidenziazione / Sfondo"
    },
    "Clique para enviar ou alterar o logotipo": {
        "pt_BR": "Clique para enviar ou alterar o logotipo",
        "en_US": "Click to upload or change logo",
        "es_ES": "Haga clic para subir o cambiar el logotipo",
        "it_IT": "Clicca per caricare o modificare il logo"
    },
    "Coloque seu texto aqui...": {
        "pt_BR": "Coloque seu texto aqui...",
        "en_US": "Place your text here...",
        "es_ES": "Coloque su texto aquí...",
        "it_IT": "Inserisci il tuo testo qui..."
    },
    "Coloque titulo aqui...": {
        "pt_BR": "Coloque titulo aqui...",
        "en_US": "Place title here...",
        "es_ES": "Coloque el título aquí...",
        "it_IT": "Inserisci il titolo qui..."
    },
    "Remover Linha": {
        "pt_BR": "Remover Linha",
        "en_US": "Remove Row",
        "es_ES": "Eliminar Fila",
        "it_IT": "Rimuovi Riga"
    },
    "Remover Botão": {
        "pt_BR": "Remover Botão",
        "en_US": "Remove Button",
        "es_ES": "Eliminar Botón",
        "it_IT": "Rimuovi Pulsante"
    },
    "Adiciona Linha": {
        "pt_BR": "Adiciona Linha",
        "en_US": "Add Row",
        "es_ES": "Añadir Fila",
        "it_IT": "Aggiungi Riga"
    },
    "Adicionar Botão": {
        "pt_BR": "Adicionar Botão",
        "en_US": "Add Button",
        "es_ES": "Añadir Botón",
        "it_IT": "Aggiungi Pulsante"
    },
    "Coloque seu Link aqui...": {
        "pt_BR": "Coloque seu Link aqui...",
        "en_US": "Place your Link here...",
        "es_ES": "Coloque su Enlace aquí...",
        "it_IT": "Inserisci il tuo Link qui..."
    },
    "Link de destino": {
        "pt_BR": "Link de destino",
        "en_US": "Target link",
        "es_ES": "Enlace de destino",
        "it_IT": "Collegamento di destinazione"
    }
}

# 1. Gerar .pot (Template)
pot_content = '''# Translation of luiz0067 Buttons Banner in English (US)
# Copyright (C) 2026 Luiz Fernando Brogliatto Ferreira
# This file is distributed under the GPL-2.0-or-later.
msgid ""
msgstr ""
"Project-Id-Version: luiz0067 Buttons Banner 1.0.0\\n"
"Report-Msgid-Bugs-To: https://wordpress.org/support/plugin/luiz0067-buttons-banner\\n"
"Last-Translator: Luiz Fernando Brogliatto Ferreira\\n"
"Language-Team: Portuguese (Brazil)\\n"
"MIME-Version: 1.0\\n"
"Content-Type: text/plain; charset=UTF-8\\n"
"Content-Transfer-Encoding: 8bit\\n"
"POT-Creation-Date: 2026-09-11T20:30:00+00:00\\n"
"PO-Revision-Date: 2026-09-11T20:30:00+00:00\\n"
"X-Generator: Python i18n Builder\\n"
"X-Domain: luiz0067-buttons-banner\\n"

'''

for msgid in sorted(translations_data.keys()):
    pot_content += f'#: assets/js/buttons-banner.js\nmsgid "{msgid}"\nmsgstr ""\n\n'

pot_path = os.path.join(languages_dir, f"{domain}.pot")
with open(pot_path, "w", encoding="utf-8") as f:
    f.write(pot_content)
print(f"Generated: {pot_path}")

# Função para compilar arquivo .mo binário compatível com GNU gettext
def create_mo_file(translations, mo_path):
    # Dicionário msgid -> msgstr incluindo o cabeçalho vazio "" -> header
    items = sorted(translations.items())
    
    # IDs e STRs em UTF-8 com terminação null
    ids = []
    strs = []
    for k, v in items:
        ids.append(k.encode('utf-8') + b'\x00')
        strs.append(v.encode('utf-8') + b'\x00')
    
    count = len(items)
    # Magic number: 0x950412de (little-endian: 0xde120495)
    magic = 0x950412de
    format_revision = 0
    
    # Tabela de offsets: 
    # Cabeçalho: 7 inteiros de 4 bytes = 28 bytes
    # Tabela de originais: 2 * count inteiros de 4 bytes = 8 * count bytes
    # Tabela de traduções: 2 * count inteiros de 4 bytes = 8 * count bytes
    offset_orig = 28
    offset_trans = 28 + (8 * count)
    data_start = 28 + (16 * count)
    
    orig_table = []
    trans_table = []
    
    current_data_offset = data_start
    # Primeiro os IDs
    for b in ids:
        length = len(b) - 1 # sem o nulo
        orig_table.append((length, current_data_offset))
        current_data_offset += len(b)
        
    for b in strs:
        length = len(b) - 1
        trans_table.append((length, current_data_offset))
        current_data_offset += len(b)
        
    with open(mo_path, 'wb') as f:
        # Header: magic, rev, count, offset_orig, offset_trans, hash_size, hash_offset
        f.write(struct.pack('<7I', magic, format_revision, count, offset_orig, offset_trans, 0, 0))
        for length, offset in orig_table:
            f.write(struct.pack('<2I', length, offset))
        for length, offset in trans_table:
            f.write(struct.pack('<2I', length, offset))
        for b in ids:
            f.write(b)
        for b in strs:
            f.write(b)

locales = {
    "pt_BR": "Portuguese (Brazil)",
    "en_US": "English (US)",
    "es_ES": "Spanish (Spain)",
    "it_IT": "Italian (Italy)"
}

for loc, loc_name in locales.items():
    po_header = f'''# Translation of luiz0067 Buttons Banner in {loc_name}
# Copyright (C) 2026 Luiz Fernando Brogliatto Ferreira
# This file is distributed under the GPL-2.0-or-later.
msgid ""
msgstr ""
"Project-Id-Version: luiz0067 Buttons Banner 1.0.0\\n"
"Report-Msgid-Bugs-To: https://wordpress.org/support/plugin/luiz0067-buttons-banner\\n"
"Last-Translator: Luiz Fernando Brogliatto Ferreira\\n"
"Language-Team: {loc_name}\\n"
"Language: {loc}\\n"
"MIME-Version: 1.0\\n"
"Content-Type: text/plain; charset=UTF-8\\n"
"Content-Transfer-Encoding: 8bit\\n"
"PO-Revision-Date: 2026-09-11T20:30:00+00:00\\n"
"X-Generator: Python i18n Builder\\n"
"X-Domain: {domain}\\n"

'''
    mo_translations = {
        "": (
            f"Project-Id-Version: luiz0067 Buttons Banner 1.0.0\n"
            f"Language: {loc}\n"
            f"MIME-Version: 1.0\n"
            f"Content-Type: text/plain; charset=UTF-8\n"
            f"Content-Transfer-Encoding: 8bit\n"
        )
    }
    
    jed_messages = {
        "": {
            "domain": domain,
            "lang": loc,
            "plural-forms": "nplurals=2; plural=(n != 1);"
        }
    }
    
    po_body = ""
    for msgid, translations in sorted(translations_data.items()):
        msgstr = translations.get(loc, msgid)
        po_body += f'#: assets/js/buttons-banner.js\nmsgid "{msgid}"\nmsgstr "{msgstr}"\n\n'
        mo_translations[msgid] = msgstr
        jed_messages[msgid] = [msgstr]
        
    po_path = os.path.join(languages_dir, f"{domain}-{loc}.po")
    with open(po_path, "w", encoding="utf-8") as f:
        f.write(po_header + po_body)
    print(f"Generated: {po_path}")
    
    mo_path = os.path.join(languages_dir, f"{domain}-{loc}.mo")
    create_mo_file(mo_translations, mo_path)
    print(f"Compiled MO: {mo_path}")
    
    # Gutenberg wp_set_script_translations JSON (JED 1.x)
    jed_data = {
        "translation-revision-date": "2026-09-11 20:30:00+0000",
        "generator": "wp-cli/python",
        "source": "assets/js/buttons-banner.js",
        "domain": domain,
        "locale_data": {
            domain: jed_messages
        }
    }
    
    # WordPress gera nomes no formato: {domain}-{locale}-{handle}.json ou {domain}-{locale}.json
    json_path1 = os.path.join(languages_dir, f"{domain}-{loc}-luiz0067-buttons-banner-block-js.json")
    json_path2 = os.path.join(languages_dir, f"{domain}-{loc}.json")
    
    with open(json_path1, "w", encoding="utf-8") as f:
        json.dump(jed_data, f, ensure_ascii=False, indent=2)
    with open(json_path2, "w", encoding="utf-8") as f:
        json.dump(jed_data, f, ensure_ascii=False, indent=2)
    print(f"Generated JED JSON: {json_path1}")

print("i18n generation completed successfully!")
