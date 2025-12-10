# 🤖 AGENTS.md – TRYONME SYSTEM AGENTS

Este documento enumera los agentes activos en el sistema TRYONME y sus funciones principales.

## 🧠 Agentes Activos

### 1. 🔧 DEPLOY_AGENT_VERCEL
- **Función**: Automatiza despliegues en Vercel.
- **Tecnología**: Python + Vercel CLI
- **Token embebido**: ✅
- **Autenticación**: `verceltoken_v1_bfM3C0lY4LKeZjXXXXXXXXXXXX` (puede
  sobreescribirse con la variable `VERCEL_TOKEN`)
- **Ruta asociada**: `codex.deploy_vercel.py`
- **Activación**: Manual o desde CI/CD con confirmación previa

### 2. 📦 SHOPIFY_DOMAIN_LINKER
- **Función**: Conecta el dominio `tryonyou.app` con la tienda Shopify.
- **Script**: `codex.deploy_shopify.py`
- **Variables**: `.env` o embebidas
- **API_VERSION**: 2023-10

### 3. 🧭 PROJECT_STRUCTURE_MANAGER
- **Función**: Verifica la estructura del repositorio y la presencia de archivos clave.
- **Acción actual**: Subida automática de `AGENTS.md` a la raíz.
- **Resultado**: `AGENTS.md` detectado correctamente.

---

### 8. 🛡️ CODEX_HEALTH_MONITOR
- **Función**: Revisa todo el sistema Codex automáticamente.
- **Detecta**:
  - Scripts rotos o incompletos
  - Archivos esenciales faltantes (`vercel.json`, `AGENTS.md`, `README`)
  - Variables mal formateadas o caducadas
  - Conexiones entre scripts perdidas
- **Repara**:
  - Crea archivos base
  - Corrige estructuras
  - Invoca a `CODEX_UPDATER` para registrar cambios

### 9. 📦 ZIP_BUILDER_BOT
- **Función**: Empaqueta todo el entorno en un `.zip` listo para subir o descargar.
- **Incluye automáticamente**:
  - `codex.deploy_vercel.py`
  - `codex.deploy_shopify.py`
  - `vercel.json`
  - `AGENTS.md`
  - `.env.example`
  - `requirements.txt`
  - `README.md` (lo genera si falta)
- **Actúa** cuando cambia la raíz o tras un despliegue.

### 10. 🔁 GITHUB_DEPLOY_AUTOMATOR
- **Función**: Crea un workflow de GitHub Actions (`deploy.yml`) que despliega al hacer push a `main`.
- **Incluye pasos para**:
  - Instalar dependencias
  - Autenticar con el token de Vercel
  - Ejecutar `codex.deploy_vercel.py`

