# Backup System Configuration

The following JSON snippet defines the automated backup workflow for Tryon. It is designed for Codex integration and includes retention, restore commands and failover.

```json
{
  "backup_system": {
    "enabled": true,
    "interval": "daily",
    "retention": 7,
    "snapshot_format": "timestamped-zip",
    "storage": "https://storage.tryonyou.app/backups",
    "webhook_on_backup": "https://api.tryonyou.app/webhooks/backup_complete"
  },
  "restore": {
    "enabled": true,
    "token_required": true,
    "validation": "SHA256+TIMESTAMP",
    "logs": "https://api.tryonyou.app/logs/restore",
    "command": "curl -X POST https://api.tryonyou.app/restore --data '{\"token\":\"TRYONME_MASTER_TOKEN_6789\",\"timestamp\":1690453200,\"restore\":\"latest\"}'"
  },
  "log_tracking": {
    "enabled": true,
    "send_to_google_sheets": true,
    "sheet_id": "1r7nBfTryonSheet0",
    "auth": "GOOGLE_API_KEY_SECURE"
  },
  "diagnostics": {
    "mode": "remote",
    "url": "https://diagnostics.tryonyou.app/status?token=TRYONME_MASTER_TOKEN_6789"
  },
  "failover": {
    "trigger": "restore",
    "fallback_version": "v1.0.0"
  },
  "version_map": {
    "current": "v1.2.3",
    "previous": "v1.2.2",
    "snapshot": "2025-07-25T00:00:00Z"
  },
  "security": {
    "token": "TRYONME_MASTER_TOKEN_6789",
    "hash_function": "SHA256",
    "time_window": 300
  }
}
```

Este bloque se debe conservar intacto para asegurar su funcionamiento. Permite controlar backups automáticos, restauraciones verificadas y notificaciones en caso de fallo crítico.

## BackupMaster – Weekly Google Drive Backup

The `BackupMaster` utility compresses designated project folders and uploads the archive to a private Google Drive folder using a service account. Configuration resides in `backup_master_config.json` and the script lives at `scripts/backup_master.py`.

Run the backup manually:

```bash
python scripts/backup_master.py
```

Schedule it with cron to execute on a weekly basis. Ensure the service account credentials in the configuration file are valid and have access to the destination Drive folder.
