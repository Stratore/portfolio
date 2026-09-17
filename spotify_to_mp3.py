"""
Spotify Playlist -> MP3 (320 kbps) downloader.

Lit un CSV exporté de Spotify (colonnes "Track Name" / "Artist Name" ou
variantes proches), cherche chaque morceau sur YouTube via yt-dlp, et
télécharge/convertit l'audio en MP3 320 kbps grâce à FFmpeg.

Usage:
    python spotify_to_mp3.py playlist.csv --output ./musiques
"""

import argparse
import csv
import re
import sys
from pathlib import Path

from yt_dlp import YoutubeDL

# Noms de colonnes possibles selon l'export Spotify utilisé (Exportify, etc.)
TRACK_COLUMN_CANDIDATES = ["Track Name", "Track", "Song Name", "Name"]
ARTIST_COLUMN_CANDIDATES = ["Artist Name(s)", "Artist Name", "Artist", "Artists"]

ERROR_LOG_FILENAME = "erreurs_telechargement.txt"


def sanitize_filename(name: str) -> str:
    """Retire les caractères interdits dans un nom de fichier Windows/Mac/Linux."""
    name = re.sub(r'[\\/:*?"<>|]', "", name)
    return name.strip()


def detect_column(fieldnames, candidates):
    """Trouve la première colonne du CSV correspondant à une liste de noms possibles."""
    for candidate in candidates:
        for field in fieldnames:
            if field.strip().lower() == candidate.lower():
                return field
    return None


def read_tracks_from_csv(csv_path: Path):
    """
    Lit le CSV Spotify et retourne une liste de tuples (artiste, titre).
    Gère l'encodage UTF-8 (avec ou sans BOM).
    """
    tracks = []

    # utf-8-sig permet de gérer un éventuel BOM ajouté par Excel/Exportify
    with open(csv_path, "r", encoding="utf-8-sig", newline="") as f:
        reader = csv.DictReader(f)

        if not reader.fieldnames:
            raise ValueError("Le fichier CSV semble vide ou mal formaté.")

        track_col = detect_column(reader.fieldnames, TRACK_COLUMN_CANDIDATES)
        artist_col = detect_column(reader.fieldnames, ARTIST_COLUMN_CANDIDATES)

        if not track_col or not artist_col:
            raise ValueError(
                f"Impossible de trouver les colonnes titre/artiste dans le CSV.\n"
                f"Colonnes détectées : {reader.fieldnames}\n"
                f"Colonnes attendues (une parmi) : {TRACK_COLUMN_CANDIDATES} / {ARTIST_COLUMN_CANDIDATES}"
            )

        for row in reader:
            title = (row.get(track_col) or "").strip()
            artist = (row.get(artist_col) or "").strip()
            if title and artist:
                tracks.append((artist, title))

    return tracks


def build_ydl_options(output_template: str) -> dict:
    """Construit les options yt-dlp : meilleur flux audio + conversion MP3 320 kbps via ffmpeg."""
    return {
        "format": "bestaudio/best",
        "outtmpl": output_template,
        "noplaylist": True,
        "quiet": True,
        "no_warnings": True,
        "default_search": "ytsearch1",
        "postprocessors": [
            {
                "key": "FFmpegExtractAudio",
                "preferredcodec": "mp3",
                "preferredquality": "320",
            }
        ],
    }


def download_track(artist: str, title: str, output_dir: Path) -> bool:
    """
    Télécharge et convertit un morceau en MP3 320 kbps.
    Retourne True en cas de succès, False en cas d'échec.
    """
    filename = sanitize_filename(f"{artist} - {title}")
    final_path = output_dir / f"{filename}.mp3"

    # Vérification des doublons : on ne retélécharge pas un fichier déjà présent
    if final_path.exists():
        print(f"[SKIP] Déjà présent : {final_path.name}")
        return True

    # yt-dlp ajoute lui-même l'extension .mp3 après conversion via le postprocessor
    output_template = str(output_dir / f"{filename}.%(ext)s")
    ydl_opts = build_ydl_options(output_template)

    query = f"ytsearch1:{artist} - {title} audio"

    try:
        with YoutubeDL(ydl_opts) as ydl:
            ydl.download([query])
        print(f"[OK]   Téléchargé : {filename}.mp3")
        return True
    except Exception as exc:
        print(f"[ERREUR] {artist} - {title} : {exc}")
        return False


def log_error(error_log_path: Path, artist: str, title: str) -> None:
    """Ajoute une piste en échec au fichier de log des erreurs."""
    with open(error_log_path, "a", encoding="utf-8") as f:
        f.write(f"{artist} - {title}\n")


def main():
    parser = argparse.ArgumentParser(
        description="Télécharge une playlist Spotify (export CSV) en MP3 320 kbps via YouTube."
    )
    parser.add_argument("csv_file", help="Chemin vers le fichier CSV exporté de Spotify")
    parser.add_argument(
        "--output", "-o", default="./musiques_telechargees",
        help="Dossier de destination des MP3 (créé si absent)"
    )
    args = parser.parse_args()

    csv_path = Path(args.csv_file)
    output_dir = Path(args.output)
    output_dir.mkdir(parents=True, exist_ok=True)

    error_log_path = output_dir / ERROR_LOG_FILENAME
    # On repart d'un log propre à chaque exécution
    if error_log_path.exists():
        error_log_path.unlink()

    if not csv_path.exists():
        print(f"Fichier CSV introuvable : {csv_path}", file=sys.stderr)
        sys.exit(1)

    try:
        tracks = read_tracks_from_csv(csv_path)
    except ValueError as exc:
        print(str(exc), file=sys.stderr)
        sys.exit(1)

    if not tracks:
        print("Aucune piste valide trouvée dans le CSV.", file=sys.stderr)
        sys.exit(1)

    total = len(tracks)
    success_count = 0
    error_count = 0

    print(f"{total} piste(s) à traiter. Destination : {output_dir.resolve()}\n")

    for index, (artist, title) in enumerate(tracks, start=1):
        print(f"[{index}/{total}] {artist} - {title}")
        ok = download_track(artist, title, output_dir)
        if ok:
            success_count += 1
        else:
            error_count += 1
            log_error(error_log_path, artist, title)

    print("\n--- Résumé ---")
    print(f"Réussies : {success_count}/{total}")
    print(f"Échouées : {error_count}/{total}")
    if error_count:
        print(f"Voir le détail dans : {error_log_path.resolve()}")


if __name__ == "__main__":
    main()
