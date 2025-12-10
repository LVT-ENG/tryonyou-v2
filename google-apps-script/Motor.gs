/**
 * Motor.gs - TryOnMe / TryOnYou Central Engine
 * 
 * Este script crea el prototipo funcional del motor de recomendaciones
 * en Google Sheets. Incluye tablas para usuarios, medidas, tendencias,
 * reglas y recomendaciones finales.
 * 
 * Para ejecutar: Abre Google Sheets > Extensiones > Apps Script
 * Pega este código y ejecuta la función initTryOnMe()
 */

/**
 * Función auxiliar para agregar validación de lista a un rango
 * @param {Sheet} sheet - La hoja donde aplicar la validación
 * @param {string} range - El rango en notación A1 (ej: "D2:D1000")
 * @param {string} sourceRange - El rango fuente de los valores (ej: "Lists!E2:E100")
 */
function addListValidation(sheet, range, sourceRange) {
  const rule = SpreadsheetApp.newDataValidation()
    .requireValueInRange(SpreadsheetApp.getActiveSpreadsheet().getRange(sourceRange))
    .setAllowInvalid(false)
    .build();
  sheet.getRange(range).setDataValidation(rule);
}

/**
 * Función principal: Inicializa el motor TryOnMe en Google Sheets
 * Crea todas las hojas necesarias con datos de ejemplo
 */
function initTryOnMe() {
  const ss = SpreadsheetApp.getActiveSpreadsheet();
  // Borra hojas existentes excepto la primera
  ss.getSheets().forEach((sh, idx) => { if (ss.getSheets().length > 1) ss.deleteSheet(sh); });
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
    "user_id","prenda_id","tipo_prenda","color","estilo","talla_recomendada",
    "bucket","precio_eur","imagen_url","match_score","match_preferencias",
    "match_tendencias","match_fitting","temporada","clima","fecha_generada","notas"
  ];
  recomendaciones.getRange(1,1,1,recomendacionesHeaders.length).setValues([recomendacionesHeaders]).setFontWeight("bold").setBackground("#eeeeee");
  recomendaciones.setFrozenRows(1);
  recomendaciones.setColumnWidths(1, recomendacionesHeaders.length, 160);
  
  // Datos de ejemplo para Recomendaciones
  const recomendacionesData = [
    ["u_0001","pr_001","Chaqueta","Negro","Elegante / Chic","M","Personalizada",89.90,"https://ejemplo.com/img1.jpg",0.87,0.92,0.78,0.91,"Otoño","Templado",new Date(),"Alta coincidencia"],
    ["u_0001","pr_002","Pantalón","Negro","Minimalista","M","Live 'it",69.90,"https://ejemplo.com/img2.jpg",0.85,0.88,0.80,0.87,"Todo el año","Templado",new Date(),"Versátil"],
    ["u_0001","pr_003","Camisa","Blanco","Casual / Informal","M","Vvl",45.00,"https://ejemplo.com/img3.jpg",0.82,0.85,0.75,0.86,"Primavera","Templado",new Date(),"Básico esencial"]
  ];
  recomendaciones.getRange(2,1,recomendacionesData.length,recomendacionesHeaders.length).setValues(recomendacionesData);

  // Validaciones en Recomendaciones
  addListValidation(recomendaciones, "C2:C1000", "Lists!C2:C100");   // tipo_prenda
  addListValidation(recomendaciones, "D2:D1000", "Lists!B2:B100");   // color
  addListValidation(recomendaciones, "E2:E1000", "Lists!A2:A100");   // estilo
  addListValidation(recomendaciones, "G2:G1000", "Lists!F2:F100");   // bucket
  addListValidation(recomendaciones, "N2:N1000", "Lists!H2:H100");   // temporada
  addListValidation(recomendaciones, "O2:O1000", "Lists!G2:G100");   // clima

  // Mensaje final
  SpreadsheetApp.getUi().alert(
    "Motor TryOnMe inicializado correctamente",
    "Se han creado las siguientes hojas:\n\n" +
    "• README - Información general\n" +
    "• Lists - Catálogos de valores\n" +
    "• Usuarios - Datos y preferencias de usuarios\n" +
    "• Medidas - Medidas corporales\n" +
    "• Tendencias - Top tendencias de moda\n" +
    "• Reglas - Pesos y cuotas del motor\n" +
    "• Recomendaciones - Resultados finales\n\n" +
    "Puedes empezar a agregar datos o conectar con la API.",
    SpreadsheetApp.getUi().ButtonSet.OK
  );
}

/**
 * Crea un menú personalizado en Google Sheets para facilitar la ejecución
 */
function onOpen() {
  const ui = SpreadsheetApp.getUi();
  ui.createMenu('TryOnMe Motor')
    .addItem('Inicializar Motor', 'initTryOnMe')
    .addSeparator()
    .addItem('Exportar Usuarios a JSON', 'exportUsuariosJSON')
    .addItem('Exportar Recomendaciones a JSON', 'exportRecomendacionesJSON')
    .addToUi();
}

/**
 * Exporta la tabla de Usuarios a formato JSON
 */
function exportUsuariosJSON() {
  const ss = SpreadsheetApp.getActiveSpreadsheet();
  const sheet = ss.getSheetByName('Usuarios');
  
  if (!sheet) {
    SpreadsheetApp.getUi().alert('La hoja "Usuarios" no existe. Ejecuta primero "Inicializar Motor".');
    return;
  }
  
  const data = sheet.getDataRange().getValues();
  const headers = data[0];
  const rows = data.slice(1);
  
  const jsonData = rows.map(row => {
    const obj = {};
    headers.forEach((header, index) => {
      obj[header] = row[index];
    });
    return obj;
  });
  
  const json = JSON.stringify(jsonData, null, 2);
  const ui = SpreadsheetApp.getUi();
  ui.alert(
    'JSON generado',
    'Copia el JSON desde el log (Ver > Registros)\n\nTotal de usuarios: ' + jsonData.length,
    ui.ButtonSet.OK
  );
  Logger.log(json);
}

/**
 * Exporta la tabla de Recomendaciones a formato JSON
 */
function exportRecomendacionesJSON() {
  const ss = SpreadsheetApp.getActiveSpreadsheet();
  const sheet = ss.getSheetByName('Recomendaciones');
  
  if (!sheet) {
    SpreadsheetApp.getUi().alert('La hoja "Recomendaciones" no existe. Ejecuta primero "Inicializar Motor".');
    return;
  }
  
  const data = sheet.getDataRange().getValues();
  const headers = data[0];
  const rows = data.slice(1);
  
  const jsonData = rows.map(row => {
    const obj = {};
    headers.forEach((header, index) => {
      obj[header] = row[index];
    });
    return obj;
  });
  
  const json = JSON.stringify(jsonData, null, 2);
  const ui = SpreadsheetApp.getUi();
  ui.alert(
    'JSON generado',
    'Copia el JSON desde el log (Ver > Registros)\n\nTotal de recomendaciones: ' + jsonData.length,
    ui.ButtonSet.OK
  );
  Logger.log(json);
}
