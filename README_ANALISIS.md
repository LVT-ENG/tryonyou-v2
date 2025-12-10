# Analizador de Commits - Generador de Reportes Excel

Este proyecto contiene scripts para analizar cambios en commits específicos y generar reportes detallados en formato Excel con problemas potenciales y propuestas de solución.

## 📋 Descripción

El sistema analiza el commit [0fc6d57d9e52944629c05e2febb1aa0e6a870fba](https://github.com/LVT-ENG/tryon-app/commit/0fc6d57d9e52944629c05e2febb1aa0e6a870fba) que implementó la simplificación de la demo web con Vite, identificando problemas potenciales en los cambios realizados.

### ✨ Características

- **Análisis automático** de diffs de commits
- **Identificación de problemas** específicos por tipo de archivo
- **Propuestas de solución** detalladas para cada problema
- **Exclusión automática** de archivos como `package-lock.json`
- **Formato Excel** profesional con columnas organizadas
- **Validación completa** con tests automatizados

## 🗂️ Archivos Analizados

| Archivo | Cambios | Problemas Identificados |
|---------|---------|-------------------------|
| `index.html` | Simplificación del diseño | 8 problemas |
| `package.json` | Migración a scripts Vite | 5 problemas |
| `script.js` | Refactorización modular | 6 problemas |
| `vite.config.js` | Nueva configuración | 3 problemas |

**Total: 22 problemas identificados**

## 📊 Estructura del Reporte Excel

El archivo Excel generado contiene las siguientes columnas:

1. **Archivo afectado**: Nombre del archivo modificado
2. **Línea(s) modificadas**: Número de línea específico del cambio
3. **Descripción del problema**: Explicación detallada del problema potencial
4. **Propuesta de solución**: Recomendación específica para resolver el problema

## 🚀 Instalación y Uso

### Prerequisitos

```bash
# Instalar dependencias Python
pip3 install pandas openpyxl

# Instalar dependencias Node.js (opcional)
npm install
```

### Ejecución

```bash
# Generar reporte Excel
python3 analyze_commit.py

# Ejecutar tests de validación
python3 test_analyzer.py
```

### Salida

El script genera un archivo Excel con nombre formato:
```
analisis_commit_0fc6d57d_YYYYMMDD_HHMMSS.xlsx
```

## 🔍 Tipos de Problemas Identificados

### HTML (`index.html`)
- ❌ Eliminación de meta theme-color (afecta móviles)
- ❌ Pérdida de CSS externo (organización)
- ❌ Eliminación de manifest PWA
- ❌ Pérdida de enlaces de accesibilidad
- ❌ Eliminación de navegación principal
- ⚠️ Estilos inline (mantenibilidad)
- ⚠️ Módulos ES6 sin compatibilidad legacy

### JavaScript (`script.js`)
- ❌ Eliminación de datos de productos por defecto
- ❌ Pérdida de carga dinámica de contenido
- ❌ Eliminación de renderizado de productos
- ⚠️ Console.log sin funcionalidad real
- ⚠️ Exports sin configuración de módulos
- ⚠️ navigator.language sin fallbacks

### Package.json
- ❌ Eliminación de scripts de testing
- ❌ Pérdida de script de deploy
- ❌ Eliminación de especificación Node.js
- ❌ Pérdida de "type": "module"
- ⚠️ Dependencia Vite sin versión específica

### Vite Config (`vite.config.js`)
- ⚠️ Configuración básica sin optimizaciones
- ⚠️ Puerto fijo (posibles conflictos)
- ⚠️ Auto-apertura de navegador

## 🧪 Tests

El script `test_analyzer.py` valida:

- ✅ Generación correcta del archivo Excel
- ✅ Estructura de columnas adecuada
- ✅ Exclusión de `package-lock.json`
- ✅ Análisis de todos los archivos esperados
- ✅ Ausencia de celdas vacías
- ✅ Distribución correcta de problemas por archivo

## 📈 Estadísticas del Análisis

```
Commit: 0fc6d57d9e52944629c05e2febb1aa0e6a870fba
Mensaje: Simplify web demo with Vite
Archivos modificados: 5 (4 analizados)
Problemas identificados: 22
Soluciones propuestas: 22
```

### Distribución por severidad:
- 🔴 **Críticos**: 11 problemas (pérdida de funcionalidad)
- 🟡 **Advertencias**: 11 problemas (mejoras recomendadas)

## 🛠️ Extensibilidad

Para analizar otros commits, modificar la variable `COMMIT_DATA` en `analyze_commit.py` con:

- SHA del commit
- Mensaje del commit  
- Datos de archivos y patches del GitHub API

## 📝 Notas Técnicas

- **Formato de diff**: Parser compatible con formato unified diff de Git
- **Numeración de líneas**: Basada en la posición post-cambio
- **Exclusiones**: `package-lock.json` excluido automáticamente
- **Formato Excel**: Optimizado con ajuste de columnas y colores