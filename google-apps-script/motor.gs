/**
 * TryOnMe / TryOnYou – Motor central (Prototipo en Google Sheets)
 * 
 * Este script crea y configura un sistema de recomendación de prendas
 * basado en Google Sheets que incluye:
 * - Gestión de usuarios y preferencias
 * - Medidas corporales
 * - Tendencias de moda
 * - Reglas de recomendación
 * - Generación de recomendaciones personalizadas
 */

/**
 * Función principal que inicializa todas las hojas del Motor TryOnMe
 */
function initTryOnMe() {
  const ss = SpreadsheetApp.getActiveSpreadsheet();
  // Borra hojas existentes excepto la primera
  const sheets = ss.getSheets();
  for (let i = sheets.length - 1; i > 0; i--) {
    ss.deleteSheet(sheets[i]);
  }
  const first = ss.getSheets()[0];
  first.setName('README');

  // ===== README =====
  const readme = first;
  readme.clear();
  readme.getRange("A1").setValue("TryOnMe / TryOnYou – Motor central (Prototipo en Google Sheets)").setFontWeight("bold").setFontSize(14);
  readme.getRange("A3").setValue("Pestañas incluidas:");
  readme.getRange("A4").setValue("1) Usuarios – Datos del formulario inicial y preferencias");
  readme.getRange("A5").setValue("2) Medidas – Medidas corporales capturadas en TryOn");
  readme.getRange("A6").setValue("3) Tendencias – Top 20 de Google/FTT y etiquetas normalizadas");
  readme.getRange("A7").setValue("4) Reglas – Pesos y cuotas para generar outputs");
  readme.getRange("A8").setValue("5) Recomendaciones – 20 resultados finales por usuario");
  readme.getRange("A10").setValue("Lists – Catálogos para desplegables (estilos, colores, etc.)");
  readme.getRange("A12").setValue("Nota: Este archivo sirve como prototipo funcional. Una vez validado, migrar a BD + dashboard web.");
  readme.setColumnWidths(1, 6, 300);

  // ===== Lists =====
  const lists = ss.insertSheet('Lists');
  const styles = [
    "Clásico / Formal","Casual / Informal","Deportivo / Athleisure","Elegante / Chic",
    "Bohemio / Boho","Romántico","Minimalista","Streetwear / Urbano",
    "Punk / Rock","Vintage / Retro","Vanguardista / Experimental","Étnico / Cultural"
  ];
  const colors = ["Negro","Blanco","Gris","Beige","Azul marino","Azul claro","Rojo","Verde","Amarillo","Rosa","Marrón","Morado"];
  const garments = ["Chaqueta","Camiseta","Camisa","Vestido","Falda","Pantalón","Jeans","Sudadera","Blazer","Abrigo","Jersey","Leggings","Zapatos","Zapatillas"];
  const fits = ["Oversize","Slim","Regular","Con caída","Con vuelo","Entallado","Recto"];
  const sexes = ["Mujer","Hombre","No binario","Otro","Prefiero no decirlo"];
  const buckets = ["Personalizada","Live 'it","Vvl","TryOn (Dropset)","Externa (E-commerce)"];
  const climates = ["Frío","Templado","Cálido"];
  const seasons = ["Invierno","Primavera","Verano","Otoño"];

  lists.getRange(1,1).setValue("Styles");
  lists.getRange(2,1,styles.length,1).setValues(styles.map(s=>[s]));
  lists.getRange(1,2).setValue("Colors");
  lists.getRange(2,2,colors.length,1).setValues(colors.map(s=>[s]));
  lists.getRange(1,3).setValue("GarmentTypes");
  lists.getRange(2,3,garments.length,1).setValues(garments.map(s=>[s]));
  lists.getRange(1,4).setValue("FitPreferences");
  lists.getRange(2,4,fits.length,1).setValues(fits.map(s=>[s]));
  lists.getRange(1,5).setValue("Sex");
  lists.getRange(2,5,sexes.length,1).setValues(sexes.map(s=>[s]));
  lists.getRange(1,6).setValue("OutputBuckets");
  lists.getRange(2,6,buckets.length,1).setValues(buckets.map(s=>[s]));
  lists.getRange(1,7).setValue("Climate");
  lists.getRange(2,7,climates.length,1).setValues(climates.map(s=>[s]));
  lists.getRange(1,8).setValue("Seasons");
  lists.getRange(2,8,seasons.length,1).setValues(seasons.map(s=>[s]));
  lists.setFrozenRows(1);

  // ===== Usuarios =====
  const usuarios = ss.insertSheet('Usuarios');
  const usuariosHeaders = [
    "user_id","nombre","email","sexo","edad","altura_cm","peso_kg",
    "ciudad","pais","clima","estilo_1","estilo_2","estilo_3",
    "color_1","color_2","prenda_1","prenda_2","ajuste_preferido",
    "consentimiento_datos","fecha_alta"
  ];
  usuarios.getRange(1,1,1,usuariosHeaders.length).setValues([usuariosHeaders]).setFontWeight("bold").setBackground("#eeeeee");
  usuarios.setFrozenRows(1);
  usuarios.setColumnWidths(1, usuariosHeaders.length, 160);
  usuarios.getRange("A2:T2").setValues([[
    "u_0001","Ejemplo Nombre","email@dominio.com","Mujer",28,168,60,
    "París","Francia","Templado","Elegante / Chic","Minimalista","Casual / Informal",
    "Negro","Blanco","Chaqueta","Pantalón","Slim",
    "Sí", new Date()
  ]]);

  // Validaciones en Usuarios
  addListValidation(usuarios, "D2:D1000", "Lists!E2:E100");   // sexo
  addListValidation(usuarios, "J2:J1000", "Lists!G2:G100");   // clima
  addListValidation(usuarios, "K2:K1000", "Lists!A2:A100");   // estilos
  addListValidation(usuarios, "L2:L1000", "Lists!A2:A100");
  addListValidation(usuarios, "M2:M1000", "Lists!A2:A100");
  addListValidation(usuarios, "N2:N1000", "Lists!B2:B100");   // colores
  addListValidation(usuarios, "O2:O1000", "Lists!B2:B100");
  addListValidation(usuarios, "P2:P1000", "Lists!C2:C100");   // prendas
  addListValidation(usuarios, "Q2:Q1000", "Lists!C2:C100");
  addListValidation(usuarios, "R2:R1000", "Lists!D2:D100");   // ajuste

  // ===== Medidas =====
  const medidas = ss.insertSheet('Medidas');
  const medidasHeaders = [
    "user_id","fecha_medida","pecho_cm","cintura_cm","cadera_cm",
    "largo_pierna_cm","largo_brazo_cm","hombros_cm","talla_habitual","notas"
  ];
  medidas.getRange(1,1,1,medidasHeaders.length).setValues([medidasHeaders]).setFontWeight("bold").setBackground("#eeeeee");
  medidas.setFrozenRows(1);
  medidas.setColumnWidths(1, medidasHeaders.length, 160);
  medidas.getRange("A2:J2").setValues([["u_0001", new Date(), 88, 68, 95, 100, 58, 40, "M", "scanner móvil"]]);

  // ===== Tendencias =====
  const tendencias = ss.insertSheet('Tendencias');
  const tendenciasHeaders = [
    "fecha","keyword","etiqueta_normalizada","fuente_url","dominio",
    "posicion_rank","repeticiones","volumen_busqueda","nota"
  ];
  tendencias.getRange(1,1,1,tendenciasHeaders.length).setValues([tendenciasHeaders]).setFontWeight("bold").setBackground("#eeeeee");
  tendencias.setFrozenRows(1);
  tendencias.setColumnWidths(1, tendenciasHeaders.length, 200);
  tendencias.getRange("A2:I2").setValues([[new Date(),"chaqueta oversize mujer 2025","oversize jackets","https://ejemplo.com/articulo1","ejemplo.com",1,6,12000,"seed"]]);

  // ===== Reglas =====
  const reglas = ss.insertSheet('Reglas');
  const reglasHeaders = ["parametro","valor","descripcion"];
  reglas.getRange(1,1,1,reglasHeaders.length).setValues([reglasHeaders]).setFontWeight("bold").setBackground("#eeeeee");
  reglas.setFrozenRows(1);
  reglas.setColumnWidths(1, reglasHeaders.length, 260);
  const reglasRows = [
    ["peso_preferencias", 0.5, "Peso del match con gustos personales (0–1)"],
    ["peso_tendencias", 0.3, "Peso del match con tendencias externas (0–1)"],
    ["peso_fitting", 0.2, "Peso del match por medidas y talla (0–1)"],
    ["quota_personalizada", 5, "Número de resultados personalizados"],
    ["quota_liveit", 5, "Número de resultados Live 'it"],
    ["quota_vvl", 2, "Número de resultados Vvl"],
    ["quota_tryon", 3, "Número de resultados TryOn (Dropset)"],
    ["quota_externa", 5, "Número de resultados Externa (E-commerce)"]
  ];
  reglas.getRange(2,1,reglasRows.length,3).setValues(reglasRows);

  // ===== Recomendaciones =====
  const recomendaciones = ss.insertSheet('Recomendaciones');
  const recomendacionesHeaders = [
    "user_id","rank","prenda_id","marca","nombre_prenda","tipo_prenda",
    "color_principal","talla_sugerida","precio","url_producto",
    "url_imagen","bucket","score_total","score_preferencias",
    "score_tendencias","score_fitting","fecha_generada","notas"
  ];
  recomendaciones.getRange(1,1,1,recomendacionesHeaders.length).setValues([recomendacionesHeaders]).setFontWeight("bold").setBackground("#eeeeee");
  recomendaciones.setFrozenRows(1);
  recomendaciones.setColumnWidths(1, recomendacionesHeaders.length, 160);
  
  // Ejemplo de recomendación
  recomendaciones.getRange("A2:R2").setValues([[
    "u_0001", 1, "prod_001", "Live 'it", "Chaqueta Elegante Negra", "Chaqueta",
    "Negro", "M", 89.90, "https://ejemplo.com/prod_001",
    "https://ejemplo.com/img/prod_001.jpg", "Personalizada", 0.85, 0.45,
    0.25, 0.15, new Date(), "Match perfecto con estilo y medidas"
  ]]);

  // Agregar validación de buckets
  addListValidation(recomendaciones, "L2:L1000", "Lists!F2:F100");   // bucket

  // Mensaje final
  SpreadsheetApp.getUi().alert(
    "Motor TryOnMe inicializado",
    "Se han creado 7 hojas:\n" +
    "- README (información)\n" +
    "- Lists (catálogos)\n" +
    "- Usuarios (datos de usuarios)\n" +
    "- Medidas (datos corporales)\n" +
    "- Tendencias (keywords y análisis)\n" +
    "- Reglas (configuración del motor)\n" +
    "- Recomendaciones (resultados finales)\n\n" +
    "Puedes empezar a añadir datos o conectar con formularios.",
    SpreadsheetApp.getUi().ButtonSet.OK
  );
}

/**
 * Función auxiliar para agregar validación de listas desplegables
 * @param {Sheet} sheet - Hoja donde aplicar la validación
 * @param {string} range - Rango de celdas (ej: "A2:A1000")
 * @param {string} sourceRange - Rango fuente de datos (ej: "Lists!A2:A100")
 */
function addListValidation(sheet, range, sourceRange) {
  const ss = SpreadsheetApp.getActiveSpreadsheet();
  const sourceSheet = ss.getSheetByName(sourceRange.split('!')[0]);
  const sourceRangeString = sourceRange.split('!')[1];
  const sourceData = sourceSheet.getRange(sourceRangeString);
  
  const rule = SpreadsheetApp.newDataValidation()
    .requireValueInRange(sourceData, true)
    .setAllowInvalid(false)
    .setHelpText("Selecciona un valor de la lista")
    .build();
  
  sheet.getRange(range).setDataValidation(rule);
}

/**
 * Función para generar recomendaciones basadas en reglas
 * Esta es una función auxiliar que puede ser llamada manualmente
 * o desde un trigger para generar recomendaciones automáticamente
 */
function generarRecomendaciones() {
  const ss = SpreadsheetApp.getActiveSpreadsheet();
  const usuarios = ss.getSheetByName('Usuarios');
  const medidas = ss.getSheetByName('Medidas');
  const tendencias = ss.getSheetByName('Tendencias');
  const reglas = ss.getSheetByName('Reglas');
  const recomendaciones = ss.getSheetByName('Recomendaciones');
  
  // Obtener parámetros de reglas
  const lastRow = reglas.getLastRow();
  if (lastRow > 1) {
    const reglasData = reglas.getRange(2, 1, lastRow - 1, 3).getValues();
    const params = {};
    reglasData.forEach(row => {
      params[row[0]] = row[1];
    });
  }
  
  // Aquí se implementaría la lógica de generación de recomendaciones
  // Este es un placeholder para la implementación futura
  SpreadsheetApp.getUi().alert(
    "Función en desarrollo",
    "La generación automática de recomendaciones se implementará en una futura versión.\n" +
    "Por ahora, puedes agregar recomendaciones manualmente en la hoja 'Recomendaciones'.",
    SpreadsheetApp.getUi().ButtonSet.OK
  );
}

/**
 * Función para crear menú personalizado al abrir el documento
 */
function onOpen() {
  const ui = SpreadsheetApp.getUi();
  ui.createMenu('Motor TryOnMe')
    .addItem('Inicializar Motor', 'initTryOnMe')
    .addSeparator()
    .addItem('Generar Recomendaciones', 'generarRecomendaciones')
    .addToUi();
}
