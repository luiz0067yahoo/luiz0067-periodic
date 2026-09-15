#!/usr/bin/env python3
"""
compile_translations.py
Gera e compila todos os arquivos de internacionalização (POT, PO, MO e JSON para Gutenberg)
para os idiomas: pt_BR, en_US, es_ES e it_IT.
"""

import os
import json
import struct
import hashlib

BASE_DIR = os.path.dirname(os.path.dirname(os.path.abspath(__file__)))
LANG_DIR = os.path.join(BASE_DIR, "languages")
os.makedirs(LANG_DIR, exist_ok=True)

DOMAIN = "custom-adm"
SCRIPT_HANDLE = "custom-adm-date-title-link-js"
REL_PATH = "js/blocks/date-title-link.js"
FILE_HASH = hashlib.md5(REL_PATH.encode("utf-8")).hexdigest()

TRANSLATIONS = {
    "pt_BR": {
        "name": "Português do Brasil",
        "locale": "pt_BR",
        "strings": {
            "Data, Título e Link": "Data, Título e Link",
            "Exibe publicações oficiais, editais ou notícias com data, título descritivo e URL de redirecionamento.": "Exibe publicações oficiais, editais ou notícias com data, título descritivo e URL de redirecionamento.",
            "data": "data",
            "título": "título",
            "link": "link",
            "edital": "edital",
            "notícia": "notícia",
            "Edital de Concurso Público Nº 04/2026 - Convocação para Provas Objetivas": "Edital de Concurso Público Nº 04/2026 - Convocação para Provas Objetivas",
            "Configurações do Link e Publicação": "Configurações do Link e Publicação",
            "URL de Redirecionamento": "URL de Redirecionamento",
            "Endereço para onde o usuário será direcionado ao clicar no item.": "Endereço para onde o usuário será direcionado ao clicar no item.",
            "Abrir link em nova aba (_blank)": "Abrir link em nova aba (_blank)",
            "O link será aberto em uma nova guia do navegador.": "O link será aberto em uma nova guia do navegador.",
            "O link será aberto na mesma página.": "O link será aberto na mesma página.",
            "Data da Publicação / Evento": "Data da Publicação / Evento",
            "Ex: 11/09/2026 ou 11 de Setembro": "Ex: 11/09/2026 ou 11 de Setembro",
            "Você também pode editar a data diretamente no bloco.": "Você também pode editar a data diretamente no bloco.",
            "Data (ex: 11/09/2026)": "Data (ex: 11/09/2026)",
            "Digite o título descritivo do edital, notícia ou publicação oficial...": "Digite o título descritivo do edital, notícia ou publicação oficial...",
            "URL não informada (clique para definir na barra lateral)": "URL não informada (clique para definir na barra lateral)"
        }
    },
    "en_US": {
        "name": "English (United States)",
        "locale": "en_US",
        "strings": {
            "Data, Título e Link": "Date, Title and Link",
            "Exibe publicações oficiais, editais ou notícias com data, título descritivo e URL de redirecionamento.": "Displays official notices, announcements, or news with date, descriptive title, and redirection URL.",
            "data": "date",
            "título": "title",
            "link": "link",
            "edital": "notice",
            "notícia": "news",
            "Edital de Concurso Público Nº 04/2026 - Convocação para Provas Objetivas": "Public Notice No. 04/2026 - Examination Call and Results",
            "Configurações do Link e Publicação": "Link and Publication Settings",
            "URL de Redirecionamento": "Redirection URL",
            "Endereço para onde o usuário será direcionado ao clicar no item.": "Address where the user will be redirected when clicking the item.",
            "Abrir link em nova aba (_blank)": "Open link in new tab (_blank)",
            "O link será aberto em uma nova guia do navegador.": "The link will open in a new browser tab.",
            "O link será aberto na mesma página.": "The link will open on the same page.",
            "Data da Publicação / Evento": "Publication / Event Date",
            "Ex: 11/09/2026 ou 11 de Setembro": "E.g.: 2026-09-11 or September 11",
            "Você também pode editar a data diretamente no bloco.": "You can also edit the date directly within the block.",
            "Data (ex: 11/09/2026)": "Date (e.g.: 2026-09-11)",
            "Digite o título descritivo do edital, notícia ou publicação oficial...": "Enter the descriptive title of the notice, news, or publication...",
            "URL não informada (clique para definir na barra lateral)": "URL not set (click to configure in sidebar)"
        }
    },
    "es_ES": {
        "name": "Español",
        "locale": "es_ES",
        "strings": {
            "Data, Título e Link": "Fecha, Título y Enlace",
            "Exibe publicações oficiais, editais ou notícias com data, título descritivo e URL de redirecionamento.": "Muestra publicaciones oficiales, convocatorias o noticias con fecha, título descriptivo y URL de redirección.",
            "data": "fecha",
            "título": "título",
            "link": "enlace",
            "edital": "convocatoria",
            "notícia": "noticia",
            "Edital de Concurso Público Nº 04/2026 - Convocação para Provas Objetivas": "Convocatoria de Oposición Pública Nº 04/2026 - Llamamiento a Pruebas",
            "Configurações do Link e Publicação": "Configuración del Enlace y Publicación",
            "URL de Redirecionamento": "URL de Redirección",
            "Endereço para onde o usuário será direcionado ao clicar no item.": "Dirección a la que se dirigirá al usuario al hacer clic en el elemento.",
            "Abrir link em nova aba (_blank)": "Abrir enlace en una nueva pestaña (_blank)",
            "O link será aberto em uma nova guia do navegador.": "El enlace se abrirá en una nueva pestaña del navegador.",
            "O link será aberto na mesma página.": "El enlace se abrirá en la misma página.",
            "Data da Publicação / Evento": "Fecha de Publicación / Evento",
            "Ex: 11/09/2026 ou 11 de Setembro": "Ej: 11/09/2026 o 11 de Septiembre",
            "Você também pode editar a data diretamente no bloco.": "También puede editar la fecha directamente en el bloque.",
            "Data (ex: 11/09/2026)": "Fecha (ej: 11/09/2026)",
            "Digite o título descritivo do edital, notícia ou publicação oficial...": "Escriba el título descriptivo de la convocatoria, noticia o publicación...",
            "URL não informada (clique para definir na barra lateral)": "URL no definida (haga clic para configurar en la barra lateral)"
        }
    },
    "it_IT": {
        "name": "Italiano",
        "locale": "it_IT",
        "strings": {
            "Data, Título e Link": "Data, Titolo e Link",
            "Exibe publicações oficiais, editais ou notícias com data, título descritivo e URL de redirecionamento.": "Mostra bandi ufficiali, avvisi o notizie con data, titolo descrittivo e URL di reindirizzamento.",
            "data": "data",
            "título": "titolo",
            "link": "link",
            "edital": "bando",
            "notícia": "notizia",
            "Edital de Concurso Público Nº 04/2026 - Convocação para Provas Objetivas": "Bando di Concorso Pubblico N. 04/2026 - Convocazione alle Prove",
            "Configurações do Link e Publicação": "Impostazioni del Link e Pubblicazione",
            "URL de Redirecionamento": "URL di Reindirizzamento",
            "Endereço para onde o usuário será direcionado ao clicar no item.": "Indirizzo a cui l'utente verrà reindirizzato facendo clic sull'elemento.",
            "Abrir link em nova aba (_blank)": "Apri link in una nuova scheda (_blank)",
            "O link será aberto em uma nova guia do navegador.": "Il link verrà aperto in una nuova scheda del browser.",
            "O link será aberto na mesma página.": "Il link verrà aperto nella stessa pagina.",
            "Data da Publicação / Evento": "Data di Pubblicazione / Evento",
            "Ex: 11/09/2026 ou 11 de Setembro": "Es: 11/09/2026 o 11 Settembre",
            "Você também pode editar a data diretamente no bloco.": "È inoltre possibile modificare la data direttamente nel blocco.",
            "Data (ex: 11/09/2026)": "Data (es: 11/09/2026)",
            "Digite o título descritivo do edital, notícia ou publicação oficial...": "Inserisci il titolo descrittivo del bando, notizia o pubblicazione...",
            "URL não informada (clique para definir na barra lateral)": "URL non impostato (fai clic per configurare nella barra laterale)"
        }
    }
}

def generate_mo(entries, mo_path):
    """Compila pares msgid/msgstr no formato binário padrão GNU gettext MO."""
    # Adiciona cabeçalho vazio
    header_id = b""
    header_str = (
        b"Project-Id-Version: Date Title Link 1.0.0\n"
        b"Report-Msgid-Bugs-To: \n"
        b"POT-Creation-Date: 2026-09-11 21:00-0300\n"
        b"PO-Revision-Date: 2026-09-11 21:00-0300\n"
        b"Last-Translator: \n"
        b"Language-Team: \n"
        b"MIME-Version: 1.0\n"
        b"Content-Type: text/plain; charset=UTF-8\n"
        b"Content-Transfer-Encoding: 8bit\n"
    )

    all_entries = [(header_id, header_str)]
    for msgid, msgstr in entries.items():
        all_entries.append((msgid.encode("utf-8"), msgstr.encode("utf-8")))

    all_entries.sort(key=lambda x: x[0])
    count = len(all_entries)

    ids_offsets = []
    strs_offsets = []
    ids_data = bytearray()
    strs_data = bytearray()

    for orig, trans in all_entries:
        ids_offsets.append((len(orig), len(ids_data)))
        ids_data.extend(orig + b"\x00")
        strs_offsets.append((len(trans), len(strs_data)))
        strs_data.extend(trans + b"\x00")

    header_size = 7 * 4
    orig_table_offset = header_size
    trans_table_offset = orig_table_offset + count * 8
    data_start = trans_table_offset + count * 8

    # Ajusta offsets reais
    adjusted_ids = [(length, offset + data_start) for length, offset in ids_offsets]
    adjusted_strs = [(length, offset + data_start + len(ids_data)) for length, offset in strs_offsets]

    with open(mo_path, "wb") as f:
        # Magic number gettext
        f.write(struct.pack("I", 0x950412de))
        f.write(struct.pack("I", 0))  # Version
        f.write(struct.pack("I", count))  # Number of pairs
        f.write(struct.pack("I", orig_table_offset))
        f.write(struct.pack("I", trans_table_offset))
        f.write(struct.pack("I", 0))  # Hash table size
        f.write(struct.pack("I", 0))  # Hash table offset

        for length, offset in adjusted_ids:
            f.write(struct.pack("II", length, offset))
        for length, offset in adjusted_strs:
            f.write(struct.pack("II", length, offset))

        f.write(ids_data)
        f.write(strs_data)

def main():
    # 1. Gera POT mestre
    pot_path = os.path.join(LANG_DIR, f"{DOMAIN}.pot")
    with open(pot_path, "w", encoding="utf-8") as f:
        f.write('# Copyright (C) 2026 Luiz Fernando Brogliatto Ferreira\n')
        f.write('# This file is distributed under the GPL-2.0-or-later.\n')
        f.write('msgid ""\nmsgstr ""\n')
        f.write('"Project-Id-Version: Date Title Link 1.0.0\\n"\n')
        f.write('"Report-Msgid-Bugs-To: https://wordpress.org/support/plugin/date-title-link\\n"\n')
        f.write('"MIME-Version: 1.0\\n"\n')
        f.write('"Content-Type: text/plain; charset=UTF-8\\n"\n')
        f.write('"Content-Transfer-Encoding: 8bit\\n"\n')
        f.write('"X-Domain: custom-adm\\n"\n\n')

        sample_keys = list(TRANSLATIONS["pt_BR"]["strings"].keys())
        for key in sample_keys:
            f.write(f'#: js/blocks/date-title-link.js\n')
            f.write(f'msgid "{key}"\n')
            f.write('msgstr ""\n\n')
    print(f"[OK] Gerado: {pot_path}")

    # 2. Gera PO, MO e JSONs para cada idioma
    for lang_code, data in TRANSLATIONS.items():
        locale = data["locale"]
        strings = data["strings"]

        # 2.1 Arquivo .po
        po_path = os.path.join(LANG_DIR, f"{DOMAIN}-{locale}.po")
        with open(po_path, "w", encoding="utf-8") as f:
            f.write(f'# Translation of Date Title Link in {data["name"]}\n')
            f.write('msgid ""\nmsgstr ""\n')
            f.write('"Project-Id-Version: Date Title Link 1.0.0\\n"\n')
            f.write(f'"Language: {locale}\\n"\n')
            f.write('"MIME-Version: 1.0\\n"\n')
            f.write('"Content-Type: text/plain; charset=UTF-8\\n"\n')
            f.write('"Content-Transfer-Encoding: 8bit\\n"\n')
            f.write(f'"X-Domain: {DOMAIN}\\n"\n\n')

            for k, v in strings.items():
                f.write(f'#: js/blocks/date-title-link.js\n')
                f.write(f'msgid "{k}"\n')
                f.write(f'msgstr "{v}"\n\n')
        print(f"[OK] Gerado PO: {po_path}")

        # 2.2 Arquivo binário .mo
        mo_path = os.path.join(LANG_DIR, f"{DOMAIN}-{locale}.mo")
        generate_mo(strings, mo_path)
        print(f"[OK] Compilado MO: {mo_path}")

        # 2.3 JSON para Gutenberg (formato padrão WordPress wp_set_script_translations)
        # Formato: { "translation-revision-date": "...", "generator": "WP-CLI", "source": "js/blocks/date-title-link.js", "domain": "custom-adm", "locale_data": { "custom-adm": { "": { "domain": "custom-adm", "lang": locale }, ... } } }
        messages = {
            "": {
                "domain": DOMAIN,
                "lang": locale,
                "plural_forms": "nplurals=2; plural=(n != 1);"
            }
        }
        for k, v in strings.items():
            messages[k] = [v]

        gutenberg_json = {
            "translation-revision-date": "2026-09-11 21:00:00-0300",
            "generator": "WP-CLI/2.8.1",
            "source": "js/blocks/date-title-link.js",
            "domain": DOMAIN,
            "locale_data": {
                DOMAIN: messages
            }
        }

        # Salva variações de nome suportadas pelo WordPress para script translations
        json_filenames = [
            f"{DOMAIN}-{locale}-{FILE_HASH}.json",
            f"{DOMAIN}-{locale}-{SCRIPT_HANDLE}.json",
            f"{DOMAIN}-{locale}.json"
        ]
        for jname in json_filenames:
            jpath = os.path.join(LANG_DIR, jname)
            with open(jpath, "w", encoding="utf-8") as f:
                json.dump(gutenberg_json, f, ensure_ascii=False, indent=2)
            print(f"[OK] Gerado JSON Gutenberg: {jname}")

        # 2.4 JSON simples para injeção via wp_localize_script
        simple_json_path = os.path.join(LANG_DIR, f"{locale}.json")
        with open(simple_json_path, "w", encoding="utf-8") as f:
            json.dump(strings, f, ensure_ascii=False, indent=2)
        print(f"[OK] Gerado JSON direto: {locale}.json")

    print("\nTodos os arquivos de tradução foram gerados e compilados com sucesso!")

if __name__ == "__main__":
    main()
