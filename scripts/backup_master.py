import os
import json
import zipfile
from datetime import datetime
from pathlib import Path

from google.oauth2 import service_account
from googleapiclient.discovery import build
from googleapiclient.http import MediaFileUpload


CONFIG_PATH = Path('backup_master_config.json')


def create_zip(folders, output_path):
    """Compress given folders into a zip file."""
    with zipfile.ZipFile(output_path, 'w', zipfile.ZIP_DEFLATED) as zipf:
        for folder in folders:
            folder_path = Path(folder)
            if not folder_path.exists():
                continue
            for root, _dirs, files in os.walk(folder_path):
                for file in files:
                    file_path = Path(root) / file
                    arcname = folder_path.name / file_path.relative_to(folder_path)
                    zipf.write(file_path, arcname)


def upload_to_drive(file_path, config):
    dest = config['destinos'][0]
    creds_info = {
        'type': 'service_account',
        'client_email': dest['autenticación']['client_email'],
        'private_key': dest['autenticación']['private_key'].replace('\\n', '\n')
    }
    credentials = service_account.Credentials.from_service_account_info(
        creds_info,
        scopes=['https://www.googleapis.com/auth/drive.file']
    )
    service = build('drive', 'v3', credentials=credentials)

    folder_name = dest['carpeta_destino_drive']
    query = (
        f"name='{folder_name}' and mimeType='application/vnd.google-apps.folder' and trashed=false"
    )
    results = service.files().list(q=query, spaces='drive', fields='files(id)').execute()
    items = results.get('files', [])
    if items:
        folder_id = items[0]['id']
    else:
        metadata = {'name': folder_name, 'mimeType': 'application/vnd.google-apps.folder'}
        folder = service.files().create(body=metadata, fields='id').execute()
        folder_id = folder['id']

    file_metadata = {'name': file_path.name, 'parents': [folder_id]}
    media = MediaFileUpload(file_path, mimetype='application/zip')
    uploaded = service.files().create(body=file_metadata, media_body=media, fields='id').execute()
    return uploaded.get('id')


def main():
    with CONFIG_PATH.open(encoding='utf-8') as f:
        config = json.load(f)

    timestamp = datetime.utcnow().strftime('%Y%m%d%H%M%S')
    zip_name = Path(f"backup_{timestamp}.zip")
    create_zip(config['carpetas_origen'], zip_name)
    file_id = upload_to_drive(zip_name, config)
    print(f"Backup uploaded with file ID: {file_id}")


if __name__ == '__main__':
    main()
