/**
 * GoogleSheetsMotor.js
 * 
 * Cliente de Node.js para conectar con el Motor TryOnMe en Google Sheets
 * Requiere: googleapis, dotenv
 * 
 * Instalación:
 *   npm install googleapis dotenv
 * 
 * Configuración:
 *   1. Crear un proyecto en Google Cloud Console
 *   2. Habilitar Google Sheets API
 *   3. Crear credenciales de cuenta de servicio
 *   4. Descargar el archivo JSON de credenciales
 *   5. Agregar el email de la cuenta de servicio como editor de la hoja
 *   6. Configurar variables de entorno en .env
 */

const { google } = require('googleapis');
const path = require('path');
require('dotenv').config();

class GoogleSheetsMotor {
  constructor(spreadsheetId, credentialsPath) {
    this.spreadsheetId = spreadsheetId || process.env.MOTOR_SPREADSHEET_ID;
    this.credentialsPath = credentialsPath || process.env.GOOGLE_CREDENTIALS_PATH;
    this.sheets = null;
    this.auth = null;
  }

  /**
   * Inicializa la autenticación con Google Sheets API
   */
  async initialize() {
    try {
      const credentials = require(path.resolve(this.credentialsPath));
      
      this.auth = new google.auth.GoogleAuth({
        credentials,
        scopes: ['https://www.googleapis.com/auth/spreadsheets'],
      });

      const authClient = await this.auth.getClient();
      this.sheets = google.sheets({ version: 'v4', auth: authClient });
      
      console.log('✓ Google Sheets Motor conectado correctamente');
      return true;
    } catch (error) {
      console.error('✗ Error al conectar con Google Sheets Motor:', error.message);
      throw error;
    }
  }

  /**
   * Lee todos los usuarios de la hoja
   * @returns {Array} Lista de usuarios
   */
  async leerUsuarios() {
    try {
      const response = await this.sheets.spreadsheets.values.get({
        spreadsheetId: this.spreadsheetId,
        range: 'Usuarios!A2:T',
      });

      const rows = response.data.values || [];
      const headers = ['user_id', 'nombre', 'email', 'sexo', 'edad', 'altura_cm', 'peso_kg',
                       'ciudad', 'pais', 'clima', 'estilo_1', 'estilo_2', 'estilo_3',
                       'color_1', 'color_2', 'prenda_1', 'prenda_2', 'ajuste_preferido',
                       'consentimiento_datos', 'fecha_alta'];

      return rows.map(row => {
        const usuario = {};
        headers.forEach((header, index) => {
          usuario[header] = row[index] || null;
        });
        return usuario;
      });
    } catch (error) {
      console.error('Error al leer usuarios:', error.message);
      throw error;
    }
  }

  /**
   * Busca un usuario por ID
   * @param {string} userId - ID del usuario
   * @returns {Object|null} Objeto usuario o null
   */
  async buscarUsuario(userId) {
    const usuarios = await this.leerUsuarios();
    return usuarios.find(u => u.user_id === userId) || null;
  }

  /**
   * Agrega un nuevo usuario
   * @param {Object} usuario - Datos del usuario
   * @returns {boolean} True si se agregó correctamente
   */
  async agregarUsuario(usuario) {
    try {
      const row = [
        usuario.user_id,
        usuario.nombre,
        usuario.email,
        usuario.sexo,
        usuario.edad,
        usuario.altura_cm,
        usuario.peso_kg,
        usuario.ciudad,
        usuario.pais,
        usuario.clima,
        usuario.estilo_1,
        usuario.estilo_2,
        usuario.estilo_3,
        usuario.color_1,
        usuario.color_2,
        usuario.prenda_1,
        usuario.prenda_2,
        usuario.ajuste_preferido,
        usuario.consentimiento_datos || 'No',
        new Date().toISOString()
      ];

      await this.sheets.spreadsheets.values.append({
        spreadsheetId: this.spreadsheetId,
        range: 'Usuarios!A:T',
        valueInputOption: 'USER_ENTERED',
        resource: {
          values: [row],
        },
      });

      console.log(`✓ Usuario ${usuario.user_id} agregado correctamente`);
      return true;
    } catch (error) {
      console.error('Error al agregar usuario:', error.message);
      throw error;
    }
  }

  /**
   * Lee las medidas de un usuario
   * @param {string} userId - ID del usuario
   * @returns {Array} Lista de medidas del usuario
   */
  async leerMedidas(userId) {
    try {
      const response = await this.sheets.spreadsheets.values.get({
        spreadsheetId: this.spreadsheetId,
        range: 'Medidas!A2:J',
      });

      const rows = response.data.values || [];
      const headers = ['user_id', 'fecha_medida', 'pecho_cm', 'cintura_cm', 'cadera_cm',
                       'largo_pierna_cm', 'largo_brazo_cm', 'hombros_cm', 'talla_habitual', 'notas'];

      return rows
        .filter(row => row[0] === userId)
        .map(row => {
          const medida = {};
          headers.forEach((header, index) => {
            medida[header] = row[index] || null;
          });
          return medida;
        });
    } catch (error) {
      console.error('Error al leer medidas:', error.message);
      throw error;
    }
  }

  /**
   * Agrega nuevas medidas para un usuario
   * @param {Object} medidas - Datos de medidas
   * @returns {boolean} True si se agregó correctamente
   */
  async agregarMedidas(medidas) {
    try {
      const row = [
        medidas.user_id,
        new Date().toISOString(),
        medidas.pecho_cm,
        medidas.cintura_cm,
        medidas.cadera_cm,
        medidas.largo_pierna_cm,
        medidas.largo_brazo_cm,
        medidas.hombros_cm,
        medidas.talla_habitual,
        medidas.notas || ''
      ];

      await this.sheets.spreadsheets.values.append({
        spreadsheetId: this.spreadsheetId,
        range: 'Medidas!A:J',
        valueInputOption: 'USER_ENTERED',
        resource: {
          values: [row],
        },
      });

      console.log(`✓ Medidas para usuario ${medidas.user_id} agregadas correctamente`);
      return true;
    } catch (error) {
      console.error('Error al agregar medidas:', error.message);
      throw error;
    }
  }

  /**
   * Lee las recomendaciones de un usuario
   * @param {string} userId - ID del usuario
   * @returns {Array} Lista de recomendaciones
   */
  async leerRecomendaciones(userId) {
    try {
      const response = await this.sheets.spreadsheets.values.get({
        spreadsheetId: this.spreadsheetId,
        range: 'Recomendaciones!A2:Q',
      });

      const rows = response.data.values || [];
      const headers = ['user_id', 'prenda_id', 'tipo_prenda', 'color', 'estilo', 'talla_recomendada',
                       'bucket', 'precio_eur', 'imagen_url', 'match_score', 'match_preferencias',
                       'match_tendencias', 'match_fitting', 'temporada', 'clima', 'fecha_generada', 'notas'];

      return rows
        .filter(row => row[0] === userId)
        .map(row => {
          const recomendacion = {};
          headers.forEach((header, index) => {
            recomendacion[header] = row[index] || null;
          });
          return recomendacion;
        });
    } catch (error) {
      console.error('Error al leer recomendaciones:', error.message);
      throw error;
    }
  }

  /**
   * Agrega una nueva recomendación
   * @param {Object} recomendacion - Datos de la recomendación
   * @returns {boolean} True si se agregó correctamente
   */
  async agregarRecomendacion(recomendacion) {
    try {
      const row = [
        recomendacion.user_id,
        recomendacion.prenda_id,
        recomendacion.tipo_prenda,
        recomendacion.color,
        recomendacion.estilo,
        recomendacion.talla_recomendada,
        recomendacion.bucket,
        recomendacion.precio_eur,
        recomendacion.imagen_url,
        recomendacion.match_score,
        recomendacion.match_preferencias,
        recomendacion.match_tendencias,
        recomendacion.match_fitting,
        recomendacion.temporada,
        recomendacion.clima,
        new Date().toISOString(),
        recomendacion.notas || ''
      ];

      await this.sheets.spreadsheets.values.append({
        spreadsheetId: this.spreadsheetId,
        range: 'Recomendaciones!A:Q',
        valueInputOption: 'USER_ENTERED',
        resource: {
          values: [row],
        },
      });

      console.log(`✓ Recomendación ${recomendacion.prenda_id} agregada para usuario ${recomendacion.user_id}`);
      return true;
    } catch (error) {
      console.error('Error al agregar recomendación:', error.message);
      throw error;
    }
  }

  /**
   * Lee las reglas del motor
   * @returns {Object} Objeto con las reglas como pares clave-valor
   */
  async leerReglas() {
    try {
      const response = await this.sheets.spreadsheets.values.get({
        spreadsheetId: this.spreadsheetId,
        range: 'Reglas!A2:B',
      });

      const rows = response.data.values || [];
      const reglas = {};
      
      rows.forEach(row => {
        const [parametro, valor] = row;
        reglas[parametro] = parseFloat(valor) || valor;
      });

      return reglas;
    } catch (error) {
      console.error('Error al leer reglas:', error.message);
      throw error;
    }
  }

  /**
   * Lee las tendencias actuales
   * @param {number} limit - Número máximo de tendencias a devolver
   * @returns {Array} Lista de tendencias
   */
  async leerTendencias(limit = 20) {
    try {
      const response = await this.sheets.spreadsheets.values.get({
        spreadsheetId: this.spreadsheetId,
        range: 'Tendencias!A2:I',
      });

      const rows = response.data.values || [];
      const headers = ['fecha', 'keyword', 'etiqueta_normalizada', 'fuente_url', 'dominio',
                       'posicion_rank', 'repeticiones', 'volumen_busqueda', 'nota'];

      const tendencias = rows.map(row => {
        const tendencia = {};
        headers.forEach((header, index) => {
          tendencia[header] = row[index] || null;
        });
        return tendencia;
      });

      // Ordenar por posición rank y limitar
      return tendencias
        .sort((a, b) => (parseInt(a.posicion_rank) || 999) - (parseInt(b.posicion_rank) || 999))
        .slice(0, limit);
    } catch (error) {
      console.error('Error al leer tendencias:', error.message);
      throw error;
    }
  }

  /**
   * Lee los catálogos de valores (Lists)
   * @returns {Object} Objeto con todos los catálogos
   */
  async leerCatalogos() {
    try {
      const catalogos = {};
      const rangos = {
        styles: 'Lists!A2:A',
        colors: 'Lists!B2:B',
        garmentTypes: 'Lists!C2:C',
        fitPreferences: 'Lists!D2:D',
        sex: 'Lists!E2:E',
        outputBuckets: 'Lists!F2:F',
        climate: 'Lists!G2:G',
        seasons: 'Lists!H2:H'
      };

      for (const [key, range] of Object.entries(rangos)) {
        const response = await this.sheets.spreadsheets.values.get({
          spreadsheetId: this.spreadsheetId,
          range: range,
        });
        catalogos[key] = (response.data.values || []).flat();
      }

      return catalogos;
    } catch (error) {
      console.error('Error al leer catálogos:', error.message);
      throw error;
    }
  }
}

// Exportar la clase
module.exports = GoogleSheetsMotor;

// Ejemplo de uso
if (require.main === module) {
  (async () => {
    try {
      const motor = new GoogleSheetsMotor();
      await motor.initialize();

      console.log('\n--- Usuarios ---');
      const usuarios = await motor.leerUsuarios();
      console.log(`Total: ${usuarios.length}`);
      console.log(usuarios[0]);

      console.log('\n--- Reglas ---');
      const reglas = await motor.leerReglas();
      console.log(reglas);

      console.log('\n--- Catálogos ---');
      const catalogos = await motor.leerCatalogos();
      console.log('Estilos disponibles:', catalogos.styles.length);
      console.log('Colores disponibles:', catalogos.colors.length);

      console.log('\n--- Tendencias ---');
      const tendencias = await motor.leerTendencias(5);
      console.log(`Top 5 tendencias:`);
      tendencias.forEach(t => console.log(`  - ${t.keyword} (rank: ${t.posicion_rank})`));

    } catch (error) {
      console.error('Error en el ejemplo:', error.message);
      process.exit(1);
    }
  })();
}
