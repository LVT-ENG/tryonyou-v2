================================================================================
README_LEGAL_SYNC.txt
Sincronización de Documentación Legal - TRYONME Patent System
================================================================================

FECHA DE CREACIÓN: 26 de octubre de 2025
VERSIÓN: 1.0
RESPONSABLE: Rubén Espinar Rodríguez (rubensanzburo@gmail.com)

================================================================================
1. PROPÓSITO DE ESTE DOCUMENTO
================================================================================

Este archivo sirve como guía maestra para la sincronización de toda la 
documentación legal relacionada con la propiedad intelectual de TRYONME 
entre los diferentes sistemas y ubicaciones de almacenamiento.

UBICACIONES PRINCIPALES:
- Repositorio GitHub: Tryonme-com/tryon-app
- iCloud: ~/Library/Mobile Documents/com~apple~CloudDocs/TRYONYOU_DEPLOY_EXPRESS_INBOX
- Google Drive: TRYONME_Legal (carpeta compartida)
- Local: ~/TRYONME_LEGAL_BACKUP

================================================================================
2. ARCHIVOS QUE DEBEN SINCRONIZARSE
================================================================================

CATEGORÍA: PATENTES Y PROPIEDAD INTELECTUAL
-------------------------------------------
✓ ISSUE_LEGAL_EPCT_SUPERCLAIMS.md
  - Análisis de superclaims para extensión EPC
  - Última modificación: 26-10-2025
  - Estado: DRAFT
  - Destino: iCloud INBOX + GitHub

✓ docs/tryonme_es.md
  - Descripción técnica de la patente RZMYHVKPAM
  - Última modificación: 01-07-2025
  - Estado: FILED
  - Destino: GitHub + Google Drive

✓ docs/brevet_INPI_FR.md
  - Patente francesa CRAWLER SNAKE
  - Última modificación: [fecha original]
  - Estado: REGISTERED
  - Destino: GitHub + Google Drive

CATEGORÍA: DOCUMENTOS DE MARCA
-------------------------------
✓ AGENTS.md
  - Descripción de agentes y módulos (puede contener IP)
  - Última modificación: [automática]
  - Estado: LIVE
  - Destino: GitHub solamente

✓ agents/brandGuardian.js
  - Lógica de protección de identidad de marca
  - Última modificación: [automática]
  - Estado: LIVE
  - Destino: GitHub + backup local

CATEGORÍA: TÉRMINOS Y CONDICIONES
----------------------------------
□ TERMS_OF_SERVICE.md (PENDIENTE DE CREAR)
  - Términos de uso de la plataforma TRYONME
  - Estado: TODO
  - Destino: GitHub + Web pública

□ PRIVACY_POLICY.md (PENDIENTE DE CREAR)
  - Política de privacidad y tratamiento de datos
  - Estado: TODO
  - Destino: GitHub + Web pública

□ DATA_PROCESSING_AGREEMENT.md (PENDIENTE DE CREAR)
  - Acuerdo de procesamiento de datos (GDPR)
  - Estado: TODO
  - Destino: GitHub + Legal Drive

================================================================================
3. PROTOCOLO DE SINCRONIZACIÓN
================================================================================

FRECUENCIA DE SINCRONIZACIÓN:
- Documentos de patentes: INMEDIATA tras cada modificación
- Documentos de marca: SEMANAL o tras cambios significativos
- Términos legales: INMEDIATA + notificación a usuarios
- Backups locales: DIARIA (automática a las 23:00 UTC)

FLUJO DE SINCRONIZACIÓN:
1. Modificación en GitHub (repositorio master)
   ↓
2. Trigger de GitHub Action (si configurado)
   ↓
3. Copia a iCloud INBOX (para revisión CEO)
   ↓
4. Tras aprobación, copia a Google Drive (archivo definitivo)
   ↓
5. Backup local automático (via BackupMaster agent)

COMANDO MANUAL DE SINCRONIZACIÓN:
$ python scripts/sync_legal_docs.py --check
$ python scripts/sync_legal_docs.py --sync-all
$ python scripts/sync_legal_docs.py --to-icloud ISSUE_LEGAL_EPCT_SUPERCLAIMS.md

ESTRUCTURA DE CARPETAS EN iCloud:
TRYONYOU_DEPLOY_EXPRESS_INBOX/
├── LEGAL/
│   ├── PATENTS/
│   │   ├── ISSUE_LEGAL_EPCT_SUPERCLAIMS.md
│   │   └── Patent_RZMYHVKPAM_Details.pdf
│   ├── TRADEMARKS/
│   │   └── TRYONME_Trademark_Application.pdf
│   └── CONTRACTS/
│       └── (contratos con proveedores, etc.)

================================================================================
4. CONTROL DE VERSIONES
================================================================================

FORMATO DE VERSIONADO:
- Patentes: YYYYMMDD-vX (ej: 20251026-v1)
- Documentos legales: Semantic versioning (1.0, 1.1, 2.0)
- Contratos: Fecha + Nombre_Parte (ej: 20251026_Factory_ABC_NDA)

REGISTRO DE CAMBIOS:
Mantener en cada documento la sección "CHANGELOG" con:
- Fecha de cambio
- Versión
- Descripción del cambio
- Autor del cambio
- Razón del cambio

EJEMPLO:
## CHANGELOG
### [1.1] - 2025-10-26
- Añadido análisis de superclaims
- Refinadas reclamaciones 1-4
- Por: Rubén Espinar
- Razón: Preparación para extensión EPC

================================================================================
5. AGENTES RESPONSABLES
================================================================================

AGENTES AUTOMÁTICOS INVOLUCRADOS:
- BackupMaster: Backup semanal a Google Drive y Dropbox
- ContentSyncBot: Sincronización entre plataformas
- Brand Guardian: Validación de coherencia de marca
- HR Supervisor: Coordinación de agentes de sincronización

AGENTE MANUAL RESPONSABLE:
- Control CEO: Revisión y aprobación de documentos legales antes de publicación

================================================================================
6. SEGURIDAD Y ACCESO
================================================================================

NIVELES DE CONFIDENCIALIDAD:
- PÚBLICO: Términos de servicio, política de privacidad
- INTERNO: Documentación de marca, guías de agentes
- CONFIDENCIAL: Borradores de patentes, análisis de superclaims
- SECRETO: Contratos con proveedores, NDAs, estrategia legal

ACCESO A DOCUMENTOS CONFIDENCIALES:
- GitHub: Solo en rama privada, no en main
- iCloud: Carpeta protegida con contraseña
- Google Drive: Permisos explícitos solo para equipo legal
- Local: Cifrado con GPG o similar

ENCRIPTACIÓN RECOMENDADA:
$ gpg --encrypt --recipient rubensanzburo@gmail.com ISSUE_LEGAL_EPCT_SUPERCLAIMS.md
$ gpg --decrypt ISSUE_LEGAL_EPCT_SUPERCLAIMS.md.gpg > ISSUE_LEGAL_EPCT_SUPERCLAIMS.md

================================================================================
7. CHECKLIST DE SINCRONIZACIÓN LEGAL
================================================================================

ANTES DE MODIFICAR UN DOCUMENTO LEGAL:
□ Crear backup del documento actual
□ Verificar versión y changelog
□ Confirmar que no hay conflictos pendientes
□ Notificar al equipo si es documento crítico

DESPUÉS DE MODIFICAR UN DOCUMENTO LEGAL:
□ Actualizar número de versión
□ Añadir entrada en CHANGELOG
□ Commit con mensaje descriptivo en GitHub
□ Sincronizar a iCloud INBOX
□ Notificar al Control CEO para revisión
□ Tras aprobación, sincronizar a Google Drive
□ Verificar que BackupMaster ha registrado el cambio

PARA DOCUMENTOS DE PATENTES (CRÍTICO):
□ ¡NO publicar en repositorio público sin revisar!
□ Consultar con abogado de patentes antes de cambios mayores
□ Mantener siempre copia en ubicación offline segura
□ Considerar redactar versión pública sin detalles técnicos

================================================================================
8. PROCEDIMIENTO DE EMERGENCIA
================================================================================

EN CASO DE FILTRACIÓN O EXPOSICIÓN NO AUTORIZADA:
1. Inmediatamente eliminar el archivo expuesto
2. Cambiar permisos de repositorio a privado (si es GitHub)
3. Contactar con abogado de propiedad intelectual
4. Evaluar si la divulgación afecta la novedad de patentes pendientes
5. Considerar presentación de patente provisional urgente
6. Documentar el incidente y las acciones tomadas

CONTACTOS DE EMERGENCIA:
- Abogado de patentes: [PENDIENTE DE ASIGNAR]
- Asesor legal: [PENDIENTE DE ASIGNAR]
- Contacto INPI: https://www.inpi.fr
- Contacto EPO: https://www.epo.org

================================================================================
9. RECORDATORIOS Y FECHAS CLAVE
================================================================================

PLAZOS LEGALES IMPORTANTES:
- Extensión EPC: 12 meses desde fecha de prioridad (01-07-2026)
- Renovación marca TRYONME: [PENDIENTE DE REGISTRAR]
- Revisión anual de términos de servicio: Cada 01 de enero
- Auditoría GDPR: Cada 6 meses

PRÓXIMAS ACCIONES LEGALES:
□ 2025-11-15: Consulta con abogado especializado en patentes europeas
□ 2025-12-01: Presentación de reclamaciones refinadas
□ 2026-01-15: Decisión sobre jurisdicciones EPC prioritarias
□ 2026-06-01: Preparación de documentación técnica completa para EPO

================================================================================
10. NOTAS ADICIONALES
================================================================================

CONTEXTO DEL PROYECTO TRYONME:
- Sistema de prueba virtual de ropa con IA emocional
- Patente base RZMYHVKPAM (01-07-2025, Filed)
- Extensión EPC en preparación
- Identificados superclaims que requieren refinamiento
- Web: https://tryonyou.app
- Código: https://github.com/Tryonme-com/tryon-app

RECOMENDACIONES GENERALES:
1. Mantener siempre 3 copias de documentos legales críticos
2. Nunca confiar únicamente en el cloud para documentos de patentes
3. Revisar accesos a carpetas compartidas trimestralmente
4. Usar versionado semántico para facilitar seguimiento
5. Documentar SIEMPRE la razón de cada cambio legal

HERRAMIENTAS ÚTILES:
- GPG para encriptación de documentos sensibles
- Git para control de versiones
- rclone para sincronización automática con clouds
- Makefile targets: make sync-legal, make backup-legal

================================================================================
11. CONTACTO Y SOPORTE
================================================================================

RESPONSABLE PRINCIPAL:
Nombre: Rubén Espinar Rodríguez
Email: rubensanzburo@gmail.com
Web: https://tryonyou.app

EQUIPO LEGAL:
[PENDIENTE DE COMPLETAR]

SOPORTE TÉCNICO (SINCRONIZACIÓN):
Consultar AGENTS.md para detalles de agentes automáticos
Consultar docs/backup_system.md para BackupMaster

================================================================================
12. HISTORIAL DE ESTE DOCUMENTO
================================================================================

[v1.0] - 2025-10-26
- Creación inicial del documento
- Establecido protocolo de sincronización
- Definidas ubicaciones y responsabilidades
- Autor: Rubén Espinar Rodríguez
- Razón: Necesidad de sincronización tras identificación de superclaims EPC

================================================================================
FIN DEL DOCUMENTO
================================================================================

ÚLTIMA ACTUALIZACIÓN: 26 de octubre de 2025
PRÓXIMA REVISIÓN: Tras primera sincronización exitosa
ESTADO: ACTIVO
